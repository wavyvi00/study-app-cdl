#!/usr/bin/env node

/**
 * Translation Script for CDL Study App
 * 
 * This script translates all English questions to Spanish and Russian
 * using the Google Translate API and generates TypeScript files.
 */

const fs = require('fs');
const path = require('path');

// Simple translation using Google Translate (free, no API key)
const translate = require('@vitalets/google-translate-api');

const LANGUAGES = {
    es: 'Spanish',
    ru: 'Russian'
};

const DATA_DIR = path.join(__dirname, '../data');
const MOCK_FILE = path.join(DATA_DIR, 'mock.ts');

// Rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Extract questions from mock.ts file
 */
function extractQuestions() {
    const content = fs.readFileSync(MOCK_FILE, 'utf8');

    // This is a simplified parser - we'll extract question arrays
    const questions = {};

    // Extract question arrays by looking for patterns like:
    // export const ALL_GK_QUESTIONS = [...]
    const arrayPattern = /export const (\w+_QUESTIONS)\s*=\s*\[([\s\S]*?)\];/g;

    let match;
    while ((match = arrayPattern.exec(content)) !== null) {
        const arrayName = match[1];
        const arrayContent = match[2];

        // Parse individual questions
        const questionMatches = arrayContent.matchAll(/\{[\s\S]*?\},?\s*(?=\{|$)/g);
        const parsedQuestions = [];

        for (const qMatch of questionMatches) {
            const questionText = qMatch[0];

            // Extract fields (simplified parsing)
            const idMatch = questionText.match(/id:\s*['"]([^'"]+)['"]/);
            const textMatch = questionText.match(/text:\s*['"`]([^'"`]+)['"`]/);
            const optionsMatch = questionText.match(/options:\s*\[(.*?)\]/s);
            const correctIndexMatch = questionText.match(/correctIndex:\s*(\d+)/);
            const explanationMatch = questionText.match(/explanation:\s*['"`]([^'"`]*?)['"`]/);

            if (idMatch && textMatch && optionsMatch && correctIndexMatch) {
                const options = optionsMatch[1]
                    .split(',')
                    .map(opt => opt.trim().replace(/^['"`]|['"`]$/g, ''))
                    .filter(opt => opt.length > 0);

                parsedQuestions.push({
                    id: idMatch[1],
                    text: textMatch[1],
                    options: options,
                    correctIndex: parseInt(correctIndexMatch[1]),
                    explanation: explanationMatch ? explanationMatch[1] : undefined
                });
            }
        }

        questions[arrayName] = parsedQuestions;
    }

    return questions;
}

/**
 * Translate a single text with retry logic
 */
async function translateText(text, targetLang, retries = 3) {
    if (!text || text.trim() === '') return text;

    for (let i = 0; i < retries; i++) {
        try {
            await delay(100); // Small delay to avoid rate limiting
            const result = await translate(text, { to: targetLang });
            return result.text;
        } catch (error) {
            console.error(`Translation error (attempt ${i + 1}/${retries}):`, error.message);
            if (i === retries - 1) {
                console.error(`Failed to translate: "${text.substring(0, 50)}..."`);
                return text; // Return original on final failure
            }
            await delay(1000 * (i + 1)); // Exponential backoff
        }
    }
}

/**
 * Translate all questions for a given array
 */
async function translateQuestionArray(questions, targetLang, arrayName) {
    console.log(`\nTranslating ${arrayName} to ${LANGUAGES[targetLang]} (${questions.length} questions)...`);

    const translated = [];

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        process.stdout.write(`\r  Progress: ${i + 1}/${questions.length}`);

        // Translate question text
        const translatedText = await translateText(q.text, targetLang);

        // Translate options
        const translatedOptions = [];
        for (const option of q.options) {
            const translatedOption = await translateText(option, targetLang);
            translatedOptions.push(translatedOption);
        }

        // Translate explanation if exists
        const translatedExplanation = q.explanation
            ? await translateText(q.explanation, targetLang)
            : undefined;

        translated.push({
            ...q,
            text: translatedText,
            options: translatedOptions,
            explanation: translatedExplanation
        });
    }

    console.log('\n  ✓ Complete!');
    return translated;
}

/**
 * Generate TypeScript file content
 */
function generateTSFile(arrayName, questions) {
    const lines = [
        `import { Question } from '../mock';`,
        ``,
        `export const ${arrayName}: Question[] = [`
    ];

    questions.forEach((q, index) => {
        const isLast = index === questions.length - 1;

        lines.push(`  {`);
        lines.push(`    id: '${q.id}',`);
        lines.push(`    text: \`${q.text.replace(/`/g, '\\`')}\`,`);
        lines.push(`    options: [`);
        q.options.forEach((opt, i) => {
            const comma = i < q.options.length - 1 ? ',' : '';
            lines.push(`      \`${opt.replace(/`/g, '\\`')}\`${comma}`);
        });
        lines.push(`    ],`);
        lines.push(`    correctIndex: ${q.correctIndex}${q.explanation ? ',' : ''}`);
        if (q.explanation) {
            lines.push(`    explanation: \`${q.explanation.replace(/`/g, '\\`')}\``);
        }
        lines.push(`  }${isLast ? '' : ','}`);
    });

    lines.push(`];`);
    lines.push(``);

    return lines.join('\n');
}

/**
 * Main translation function
 */
async function main() {
    console.log('🌍 CDL Study App Translation Script\n');
    console.log('Extracting questions from mock.ts...');

    const allQuestions = extractQuestions();
    const arrayNames = Object.keys(allQuestions);

    console.log(`Found ${arrayNames.length} question arrays:`);
    arrayNames.forEach(name => {
        console.log(`  - ${name}: ${allQuestions[name].length} questions`);
    });

    // Create output directories
    for (const lang of Object.keys(LANGUAGES)) {
        const dir = path.join(DATA_DIR, 'questions', lang);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    // Translate each array for each language
    for (const lang of Object.keys(LANGUAGES)) {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`Starting ${LANGUAGES[lang]} translations...`);
        console.log('='.repeat(60));

        for (const arrayName of arrayNames) {
            const translatedQuestions = await translateQuestionArray(
                allQuestions[arrayName],
                lang,
                arrayName
            );

            // Generate filename (e.g., ALL_GK_QUESTIONS -> general_knowledge.ts)
            const filename = arrayName
                .replace(/_QUESTIONS$/, '')
                .toLowerCase()
                .replace(/^all_/, '') + '.ts';

            const outputPath = path.join(DATA_DIR, 'questions', lang, filename);
            const content = generateTSFile(arrayName, translatedQuestions);

            fs.writeFileSync(outputPath, content, 'utf8');
            console.log(`  ✓ Saved to ${outputPath}`);
        }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log('✨ Translation complete!');
    console.log('='.repeat(60));
}

// Run the script
main().catch(console.error);
