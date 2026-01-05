#!/usr/bin/env node

/**
 * Air Brakes Translation Script - Spanish Only
 * 
 * Uses very slow pace to avoid rate limiting.
 * Saves progress after each question for resumability.
 */

const fs = require('fs');
const path = require('path');
const { translate } = require('@vitalets/google-translate-api');

// Configuration - VERY SLOW to avoid rate limits
const DELAY_BETWEEN_REQUESTS = 5000; // 5 seconds between each translation
const DELAY_BETWEEN_QUESTIONS = 10000; // 10 seconds between questions
const MAX_RETRIES = 3;
const RETRY_DELAY = 30000; // 30 seconds on error

const DATA_DIR = path.join(__dirname, '../data');
const SOURCE_FILE = path.join(DATA_DIR, 'questions_air_brakes.ts');
const OUTPUT_FILE = path.join(DATA_DIR, 'questions', 'es', 'questions_air_brakes.ts');
const PROGRESS_FILE = path.join(__dirname, '.air-brakes-es-progress.json');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function log(msg) {
    const timestamp = new Date().toISOString().slice(11, 19);
    console.log(`[${timestamp}] ${msg}`);
}

// Load progress
function loadProgress() {
    if (fs.existsSync(PROGRESS_FILE)) {
        try {
            return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
        } catch (e) {
            return { translatedQuestions: [], lastIndex: -1 };
        }
    }
    return { translatedQuestions: [], lastIndex: -1 };
}

// Save progress
function saveProgress(progress) {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// Extract questions from source file
function extractQuestions() {
    const content = fs.readFileSync(SOURCE_FILE, 'utf8');
    const questions = [];

    // Match each question object
    const questionRegex = /\{\s*id:\s*['"]([^'"]+)['"],\s*text:\s*['"`]([^'"`]+)['"`],\s*options:\s*\[([\s\S]*?)\],\s*correctIndex:\s*(\d+),\s*explanation:\s*['"`]([^'"`]*?)['"`]/g;

    let match;
    while ((match = questionRegex.exec(content)) !== null) {
        const optionsStr = match[3];
        const options = [];
        const optRegex = /['"`]([^'"`]+)['"`]/g;
        let optMatch;
        while ((optMatch = optRegex.exec(optionsStr)) !== null) {
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

// Translate a single text with retries
async function translateText(text, retryCount = 0) {
    if (!text || text.trim() === '') return text;

    try {
        const result = await translate(text, { to: 'es' });
        return result.text;
    } catch (error) {
        if (retryCount < MAX_RETRIES) {
            log(`  ⚠️ Rate limited, waiting ${RETRY_DELAY / 1000}s before retry ${retryCount + 1}/${MAX_RETRIES}...`);
            await sleep(RETRY_DELAY);
            return translateText(text, retryCount + 1);
        }
        log(`  ❌ Failed to translate: "${text.substring(0, 40)}..."`);
        return text; // Return original on final failure
    }
}

// Generate output file
function generateOutputFile(questions) {
    let output = `import { Question } from '../mock';\n\nexport const AIR_BRAKES_QUESTIONS: Question[] = [\n`;

    for (const q of questions) {
        const escapedText = q.text.replace(/`/g, '\\`').replace(/\\/g, '\\\\');
        const escapedOptions = q.options.map(o => `\`${o.replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\``).join(', ');
        const escapedExplanation = q.explanation.replace(/`/g, '\\`').replace(/\\/g, '\\\\');

        output += `    { id: '${q.id}', text: \`${escapedText}\`, options: [${escapedOptions}], correctIndex: ${q.correctIndex}, explanation: \`${escapedExplanation}\` },\n`;
    }

    output += `];\n`;

    // Ensure output directory exists
    const outDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, output);
}

async function main() {
    log('═══════════════════════════════════════════════════');
    log('  Air Brakes Spanish Translation (Slow Mode)');
    log('═══════════════════════════════════════════════════');
    log('');

    // Load source questions
    const questions = extractQuestions();
    log(`📚 Found ${questions.length} questions in source file`);

    // Load progress
    const progress = loadProgress();
    const startIndex = progress.lastIndex + 1;

    if (startIndex > 0) {
        log(`📂 Resuming from question ${startIndex + 1} (${startIndex} already done)`);
    }

    // Process each question
    for (let i = startIndex; i < questions.length; i++) {
        const q = questions[i];
        log(`\n🔄 Question ${i + 1}/${questions.length}: ${q.id}`);

        // Translate text
        log(`  Translating question text...`);
        const translatedText = await translateText(q.text);
        await sleep(DELAY_BETWEEN_REQUESTS);

        // Translate each option
        const translatedOptions = [];
        for (let j = 0; j < q.options.length; j++) {
            log(`  Translating option ${j + 1}/${q.options.length}...`);
            const trOpt = await translateText(q.options[j]);
            translatedOptions.push(trOpt);
            await sleep(DELAY_BETWEEN_REQUESTS);
        }

        // Translate explanation
        log(`  Translating explanation...`);
        const translatedExplanation = await translateText(q.explanation);
        await sleep(DELAY_BETWEEN_REQUESTS);

        // Add to translated questions
        progress.translatedQuestions.push({
            id: q.id,
            text: translatedText,
            options: translatedOptions,
            correctIndex: q.correctIndex,
            explanation: translatedExplanation
        });
        progress.lastIndex = i;

        // Save progress after each question
        saveProgress(progress);
        log(`  ✅ Done! Progress saved.`);

        // Write output file with current progress
        generateOutputFile(progress.translatedQuestions);

        // Wait before next question
        if (i < questions.length - 1) {
            log(`  ⏳ Waiting ${DELAY_BETWEEN_QUESTIONS / 1000}s before next question...`);
            await sleep(DELAY_BETWEEN_QUESTIONS);
        }
    }

    log('\n═══════════════════════════════════════════════════');
    log(`✨ DONE! Translated ${progress.translatedQuestions.length} questions`);
    log(`📄 Output: ${OUTPUT_FILE}`);
    log('═══════════════════════════════════════════════════');

    // Clean up progress file on success
    if (fs.existsSync(PROGRESS_FILE)) {
        fs.unlinkSync(PROGRESS_FILE);
    }
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
