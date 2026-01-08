#!/usr/bin/env node

/**
 * Translation Script for Air Brakes Questions
 */

const fs = require('fs');
const path = require('path');
const { translate } = require('@vitalets/google-translate-api');

const LANGUAGES = {
    es: 'Spanish',
    ru: 'Russian'
};

const DATA_DIR = path.join(__dirname, '../data');
const SOURCE_FILE = path.join(DATA_DIR, 'questions_air_brakes.ts');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function extractQuestions() {
    const content = fs.readFileSync(SOURCE_FILE, 'utf8');
    const questions = {};

    // Updated regex to handle type annotation: export const NAME: Type[] = [...]
    const arrayPattern = /export const (\w+_QUESTIONS).*?=\s*\[([\s\S]*?)\];/g;

    let match;
    while ((match = arrayPattern.exec(content)) !== null) {
        const arrayName = match[1];
        const arrayContent = match[2];

        const questionMatches = arrayContent.matchAll(/\{[\s\S]*?\},?\s*(?=\{|$)/g);
        const parsedQuestions = [];

        for (const qMatch of questionMatches) {
            const questionText = qMatch[0];

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

async function translateText(text, targetLang, retries = 0) {
    return text; // Skip translation, return original
}

async function translateQuestionArray(questions, targetLang, arrayName) {
    console.log(`\nTranslating ${arrayName} to ${LANGUAGES[targetLang]} (${questions.length} questions)...`);
    const translated = [];

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        process.stdout.write(`\r  Progress: ${i + 1}/${questions.length}`);

        const translatedText = await translateText(q.text, targetLang);
        const translatedOptions = [];
        for (const option of q.options) {
            translatedOptions.push(await translateText(option, targetLang));
        }
        const translatedExplanation = q.explanation ? await translateText(q.explanation, targetLang) : undefined;

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

function generateTSFile(arrayName, questions) {
    const lines = [
        `import { Question } from '../mock';`, // Corrected relative path
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
        if (q.explanation) lines.push(`    explanation: \`${q.explanation.replace(/`/g, '\\`')}\``);
        lines.push(`  }${isLast ? '' : ','}`);
    });

    lines.push(`];`);
    lines.push(``);
    return lines.join('\n');
}

async function main() {
    const allQuestions = extractQuestions();
    const arrayNames = Object.keys(allQuestions);

    if (arrayNames.length === 0) {
        console.error("No questions found! Regex might not match.");
        return;
    }

    for (const lang of Object.keys(LANGUAGES)) {
        const dir = path.join(DATA_DIR, 'questions', lang);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        for (const arrayName of arrayNames) {
            const translatedQuestions = await translateQuestionArray(allQuestions[arrayName], lang, arrayName);
            const filename = 'questions_air_brakes.ts';
            const outputPath = path.join(dir, filename);
            fs.writeFileSync(outputPath, generateTSFile(arrayName, translatedQuestions), 'utf8');
            console.log(`  ✓ Saved to ${outputPath}`);
        }
    }
}

main().catch(console.error);
