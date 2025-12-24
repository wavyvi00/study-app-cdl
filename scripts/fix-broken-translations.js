/**
 * Fix Broken Translation Options
 * 
 * This script finds and fixes questions where the option arrays got broken
 * during translation (e.g., comma-separated values split into multiple array items).
 * 
 * It compares English originals with translations and only fixes mismatched questions.
 */

const fs = require('fs');
const path = require('path');

// Translation library
let translatte;
try {
    translatte = require('translatte');
} catch (e) {
    console.error('Please install translatte: npm install translatte');
    process.exit(1);
}

const DELAY_MS = 500; // Rate limit delay between translations
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Map of English files to their translation directories
const FILES_TO_CHECK = [
    { en: 'questions_part1.ts', topic: 'GK_QUESTIONS_PART1' },
    { en: 'questions_part2.ts', topic: 'GK_QUESTIONS_PART2' },
    { en: 'questions_part3.ts', topic: 'GK_QUESTIONS_PART3' },
    { en: 'questions_part4.ts', topic: 'GK_QUESTIONS_PART4' },
    { en: 'questions_part5.ts', topic: 'GK_QUESTIONS_PART5' },
    { en: 'questions_combination.ts', topic: 'COMBINATION_QUESTIONS' },
    { en: 'questions_air_brakes.ts', topic: 'AIR_BRAKES_QUESTIONS' },
    { en: 'questions_hazmat.ts', topic: 'HAZMAT_QUESTIONS' },
    { en: 'questions_passenger.ts', topic: 'PASSENGER_QUESTIONS' },
    { en: 'questions_doubles_triples.ts', topic: 'DOUBLES_TRIPLES_QUESTIONS' },
    { en: 'questions_tanks.ts', topic: 'TANKS_QUESTIONS' },
    { en: 'questions_school_bus.ts', topic: 'SCHOOL_BUS_QUESTIONS' },
];

const LOCALES = [
    { code: 'es', name: 'Spanish' },
    { code: 'ru', name: 'Russian' }
];

// Parse TypeScript file to extract questions
function parseQuestionsFromFile(filePath) {
    if (!fs.existsSync(filePath)) {
        return null;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const questions = [];

    // Match each question object
    const regex = /\{\s*id:\s*'([^']+)',\s*text:\s*'([^']*(?:\\'[^']*)*)',\s*options:\s*\[([\s\S]*?)\],\s*correctIndex:\s*(\d+),\s*explanation:\s*'([^']*(?:\\'[^']*)*)'\s*\}/g;

    let match;
    while ((match = regex.exec(content)) !== null) {
        const optionsStr = match[3];
        const options = [];

        // Parse options array
        const optionRegex = /'([^']*(?:\\'[^']*)*)'/g;
        let optMatch;
        while ((optMatch = optionRegex.exec(optionsStr)) !== null) {
            options.push(optMatch[1]);
        }

        questions.push({
            id: match[1],
            text: match[2],
            options: options,
            correctIndex: parseInt(match[4]),
            explanation: match[5]
        });
    }

    return questions;
}

// Translate text
async function translate(text, targetLang) {
    if (!text || text.trim() === '') return text;

    try {
        const result = await translatte(text, { to: targetLang });
        return result.text;
    } catch (error) {
        console.error(`Translation error: ${error.message}`);
        return text; // Return original on error
    }
}

// Translate a question while preserving structure
async function translateQuestion(enQuestion, targetLang) {
    const translatedText = await translate(enQuestion.text, targetLang);
    await sleep(DELAY_MS);

    const translatedOptions = [];
    for (const opt of enQuestion.options) {
        const translatedOpt = await translate(opt, targetLang);
        translatedOptions.push(translatedOpt);
        await sleep(DELAY_MS);
    }

    const translatedExplanation = await translate(enQuestion.explanation, targetLang);
    await sleep(DELAY_MS);

    return {
        id: enQuestion.id,
        text: translatedText,
        options: translatedOptions,
        correctIndex: enQuestion.correctIndex,
        explanation: translatedExplanation
    };
}

// Format question as TypeScript
function formatQuestion(q) {
    const escapedText = q.text.replace(/'/g, "\\'");
    const escapedOptions = q.options.map(o => `'${o.replace(/'/g, "\\'")}'`).join(', ');
    const escapedExplanation = q.explanation.replace(/'/g, "\\'");

    return `    { id: '${q.id}', text: '${escapedText}', options: [${escapedOptions}], correctIndex: ${q.correctIndex}, explanation: '${escapedExplanation}' }`;
}

// Main function
async function main() {
    const dataDir = path.join(__dirname, '..', 'data');

    let totalFixed = 0;
    let totalBroken = 0;

    for (const locale of LOCALES) {
        console.log(`\n=== Processing ${locale.name} (${locale.code}) ===\n`);

        for (const fileInfo of FILES_TO_CHECK) {
            const enPath = path.join(dataDir, fileInfo.en);
            const translatedPath = path.join(dataDir, 'questions', locale.code, fileInfo.en);

            if (!fs.existsSync(enPath) || !fs.existsSync(translatedPath)) {
                console.log(`Skipping ${fileInfo.en} - files not found`);
                continue;
            }

            console.log(`Checking ${fileInfo.en}...`);

            const enQuestions = parseQuestionsFromFile(enPath);
            const translatedQuestions = parseQuestionsFromFile(translatedPath);

            if (!enQuestions || !translatedQuestions) {
                console.log(`  Could not parse questions`);
                continue;
            }

            // Find broken questions (option count mismatch)
            const brokenQuestions = [];
            for (let i = 0; i < enQuestions.length; i++) {
                const enQ = enQuestions[i];
                const trQ = translatedQuestions.find(q => q.id === enQ.id);

                if (!trQ) continue;

                if (enQ.options.length !== trQ.options.length) {
                    brokenQuestions.push({
                        index: i,
                        enQuestion: enQ,
                        translatedQuestion: trQ
                    });
                }
            }

            if (brokenQuestions.length === 0) {
                console.log(`  ✓ All questions OK (${enQuestions.length} questions)`);
                continue;
            }

            console.log(`  Found ${brokenQuestions.length} broken questions - fixing...`);
            totalBroken += brokenQuestions.length;

            // Read the original translated file
            let fileContent = fs.readFileSync(translatedPath, 'utf8');

            // Fix each broken question
            for (const broken of brokenQuestions) {
                console.log(`    Fixing ${broken.enQuestion.id}...`);

                // Re-translate this question properly
                const fixed = await translateQuestion(broken.enQuestion, locale.code);

                // Find and replace in file content
                const oldLine = formatQuestion(broken.translatedQuestion);
                const newLine = formatQuestion(fixed);

                // Use a regex to find and replace the question by ID
                const idRegex = new RegExp(
                    `\\{\\s*id:\\s*'${broken.enQuestion.id}'[^}]+\\}`,
                    'g'
                );

                fileContent = fileContent.replace(idRegex, () => {
                    return `{ id: '${fixed.id}', text: '${fixed.text.replace(/'/g, "\\'")}', options: [${fixed.options.map(o => `'${o.replace(/'/g, "\\'")}'`).join(', ')}], correctIndex: ${fixed.correctIndex}, explanation: '${fixed.explanation.replace(/'/g, "\\'")}' }`;
                });

                totalFixed++;
            }

            // Write fixed file
            fs.writeFileSync(translatedPath, fileContent, 'utf8');
            console.log(`  ✓ Fixed ${brokenQuestions.length} questions`);
        }
    }

    console.log(`\n=== Complete ===`);
    console.log(`Total broken questions found: ${totalBroken}`);
    console.log(`Total questions fixed: ${totalFixed}`);
}

main().catch(console.error);
