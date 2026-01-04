/**
 * Translate Study Guide Content
 * 
 * Reads data/study_content.ts, extracts the study guide data,
 * and generates Spanish/Russian versions.
 */

const fs = require('fs');
const path = require('path');

// Translation library
let googleTranslate;
try {
    const api = require('@vitalets/google-translate-api');
    googleTranslate = api.translate;
} catch (e) {
    console.error('Please install @vitalets/google-translate-api: npm install @vitalets/google-translate-api');
    process.exit(1);
}

const DELAY_MS = 6000; // Rate limit increased to 6s per user suggestion
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const DATA_FILE = path.join(__dirname, '..', 'data', 'study_content.ts');

// Helper to translate text
async function translate(text, targetLang) {
    if (!text || text.trim() === '') return text;
    try {
        const result = await googleTranslate(text, { to: targetLang });
        return result.text;
    } catch (error) {
        console.error(`Translation error for "${text.substring(0, 20)}...": ${error.message}`);
        if (error.statusCode === 429) {
            console.log('Rate limited. Waiting 10s...');
            await sleep(10000);
            return translate(text, targetLang); // Retry once
        }
        await sleep(1000);
        return text; // Fallback to original
    }
}

// Helper to translate an array of strings (content, keyPoints)
async function translateArray(arr, targetLang) {
    const result = [];
    for (const item of arr) {
        if (typeof item === 'string') {
            const translated = await translate(item, targetLang);
            result.push(translated);
            await sleep(DELAY_MS);
        } else {
            result.push(item);
        }
    }
    return result;
}

// Helper to translate review questions
async function translateQuestions(questions, targetLang) {
    const result = [];
    for (const q of questions) {
        console.log(`    Translating question ${q.id}...`);

        const translatedText = await translate(q.text, targetLang);
        await sleep(DELAY_MS);

        // Translate options individually to avoid splitting issues
        const translatedOptions = [];
        for (const opt of q.options) {
            const trOpt = await translate(opt, targetLang);
            translatedOptions.push(trOpt);
            await sleep(DELAY_MS);
        }

        const translatedExplanation = await translate(q.explanation, targetLang);
        await sleep(DELAY_MS);

        result.push({
            ...q,
            text: translatedText,
            options: translatedOptions,
            explanation: translatedExplanation
        });
    }
    return result;
}

// Main function
// Main function
async function main() {
    console.log(`Reading ${DATA_FILE}...`);
    let fileContent = fs.readFileSync(DATA_FILE, 'utf8');

    // Helper to extract object by name
    function extractGuide(name) {
        const regex = new RegExp(`export const ${name}\\s*=\s*({[\\s\\S]*?});\\s*export const|export const ${name}\\s*=\s*({[\\s\\S]*?});\\s*$`, 'm');
        const match = fileContent.match(regex);

        if (match) {
            const objectLiteral = match[1] || match[2];
            try {
                return eval('(' + objectLiteral + ')');
            } catch (e) {
                console.error(`Failed to eval ${name}:`, e);
            }
        }
        return null;
    }

    const guidesToTranslate = [
        { name: 'GeneralKnowledgeStudyGuide', data: extractGuide('GeneralKnowledgeStudyGuide') },
        { name: 'CombinationsStudyGuide', data: extractGuide('CombinationsStudyGuide') },
        { name: 'AirBrakesStudyGuide', data: extractGuide('AirBrakesStudyGuide') }
    ];

    // Filter out missing guides
    const validGuides = guidesToTranslate.filter(g => g.data);

    if (validGuides.length === 0) {
        console.error("Failed to load any study guide data.");
        // Try the temp file method as fallback if eval failed but regex might have worked or not
        const tempJsContent = fileContent
            .replace(/import .*/g, '')
            .replace(/: StudyGuide/g, '')
            .replace(/: InteractionQuestion/g, '')
            .replace(/: StudySection/g, '')
            .replace(/export const STUDY_GUIDES[\s\S]*/, '')
            .replace(/export const/g, 'exports.');

        const tempFile = path.join(__dirname, 'temp_study_data.js');
        fs.writeFileSync(tempFile, tempJsContent);

        try {
            const tempModule = require(tempFile);
            if (tempModule.GeneralKnowledgeStudyGuide) {
                validGuides.push({ name: 'GeneralKnowledgeStudyGuide', data: tempModule.GeneralKnowledgeStudyGuide });
            }
            if (tempModule.CombinationsStudyGuide) {
                validGuides.push({ name: 'CombinationsStudyGuide', data: tempModule.CombinationsStudyGuide });
            }
            if (tempModule.AirBrakesStudyGuide) {
                validGuides.push({ name: 'AirBrakesStudyGuide', data: tempModule.AirBrakesStudyGuide });
            }
            fs.unlinkSync(tempFile);
        } catch (e) {
            console.error("Failed to require temp file:", e);
            process.exit(1);
        }
    }

    if (validGuides.length === 0) {
        console.error("No guides found to translate.");
        process.exit(1);
    }

    console.log(`Found ${validGuides.length} guides to translate.`);

    // Target languages
    const targets = ['es', 'ru'];

    for (const lang of targets) {
        console.log(`\n=== Translating to ${lang.toUpperCase()} ===`);

        let outputContent = `import { StudyGuide } from './study_types';\n\n`;

        for (const guideObj of validGuides) {
            const { name, data } = guideObj;
            console.log(`Processing ${name}...`);

            const newGuide = {
                topicId: data.topicId,
                sections: []
            };

            for (const section of data.sections) {
                console.log(`  Section: ${section.title}`);

                const translatedTitle = await translate(section.title, lang);
                await sleep(DELAY_MS);

                const translatedContent = await translateArray(section.content, lang);
                const translatedKeyPoints = await translateArray(section.keyPoints || [], lang);

                let translatedQuestions = [];
                if (section.reviewQuestions) {
                    translatedQuestions = await translateQuestions(section.reviewQuestions, lang);
                }

                newGuide.sections.push({
                    id: section.id,
                    title: translatedTitle,
                    content: translatedContent,
                    keyPoints: translatedKeyPoints,
                    reviewQuestions: translatedQuestions
                });
            }

            // Append to output content
            outputContent += `export const ${name}_${lang.toUpperCase()}: StudyGuide = ${JSON.stringify(newGuide, null, 4)};\n\n`;
        }

        const outFile = path.join(__dirname, '..', 'data', `study_content_${lang}.ts`);
        fs.writeFileSync(outFile, outputContent);
        console.log(`Saved to ${outFile}`);
    }

    console.log("\nDone!");
}

main().catch(console.error);
