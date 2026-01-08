#!/usr/bin/env node

/**
 * CDL Translation Agent v3.1
 * 
 * A resilient translation script that:
 * - Uses translatte library (more reliable than google-translate-api)
 * - Saves progress and can resume if interrupted
 * - Uses persistent disk cache for cross-run efficiency
 * - Shows detailed progress with percentage
 * - Supports both questions and study guides
 */

const fs = require('fs');
const path = require('path');
const translatte = require('translatte');

// Configuration
const MIN_DELAY = 1000;  // Minimum delay between calls (1 second)
const MAX_DELAY = 10000; // Maximum delay on rate limit (10 seconds)
const MAX_RETRIES = 5;   // More retries with longer backoff
const PROGRESS_FILE = path.join(__dirname, '..', '.translation-progress.json');
const CACHE_FILE = path.join(__dirname, '.translation-cache.json');
const LOG_FILE = path.join(__dirname, '..', 'translation.log');

// Adaptive delay - starts conservative
let currentDelay = 1500;

// Persistent translation cache
let translationCache = {};

const LANGUAGES = [
    { code: 'es', name: 'Spanish' },
    { code: 'ru', name: 'Russian' }
];

// Helpers
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function log(message, toFile = true) {
    console.log(message);
    if (toFile) {
        fs.appendFileSync(LOG_FILE, message + '\n');
    }
}

function clearLine() {
    process.stdout.write('\r\x1b[K');
}

// Normalize text for cache key
function normalizeText(text) {
    if (!text) return '';
    return text.trim().replace(/\s+/g, ' ');
}

// Load persistent cache from disk
function loadCache() {
    if (fs.existsSync(CACHE_FILE)) {
        try {
            translationCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
            const totalEntries = Object.keys(translationCache.es || {}).length +
                Object.keys(translationCache.ru || {}).length;
            log(`📦 Loaded ${totalEntries} cached translations`);
        } catch (e) {
            translationCache = {};
        }
    }
}

// Save cache to disk
function saveCache() {
    try {
        fs.writeFileSync(CACHE_FILE, JSON.stringify(translationCache, null, 2));
    } catch (e) {
        console.error('Failed to save cache:', e.message);
    }
}

// Load progress
function loadProgress() {
    if (fs.existsSync(PROGRESS_FILE)) {
        try {
            return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
        } catch (e) {
            return { completed: [], failed: [] };
        }
    }
    return { completed: [], failed: [] };
}

// Save progress
function saveProgress(progress) {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// Single string translation with retry and persistent caching
async function translate(text, targetLang) {
    if (!text || text.trim() === '') return text;

    const normalized = normalizeText(text);

    // Initialize language cache if needed
    if (!translationCache[targetLang]) {
        translationCache[targetLang] = {};
    }

    // Check cache first
    if (translationCache[targetLang][normalized]) {
        const cached = translationCache[targetLang][normalized];
        if (cached === '__FAILED__') {
            return text; // Return original for known failures
        }
        return cached;
    }

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const result = await translatte(text, { to: targetLang });
            // Success: reduce delay slightly
            currentDelay = Math.max(MIN_DELAY, currentDelay - 10);
            // Cache the result
            translationCache[targetLang][normalized] = result.text;
            return result.text;
        } catch (error) {
            // Error: increase delay
            currentDelay = Math.min(MAX_DELAY, currentDelay * 1.5);
            if (attempt === MAX_RETRIES) {
                console.error(`\n  ⚠️ Failed after ${MAX_RETRIES} attempts: "${text.substring(0, 30)}..."`);
                // Mark as failed in cache to avoid retrying
                translationCache[targetLang][normalized] = '__FAILED__';
                return text; // Return original as fallback
            }
            await sleep(currentDelay);
        }
    }
    return text;
}

// Translate a question file
async function translateQuestionFile(inputPath, outputPath, lang, progress) {
    const filename = path.basename(inputPath);
    const progressKey = `${lang.code}:${filename}`;

    if (progress.completed.includes(progressKey)) {
        log(`  ✅ ${filename} (already done)`);
        return { translated: 0, failed: 0 };
    }

    process.stdout.write(`🔄 ${filename} → ${lang.name}\n`);

    // Read and parse the question file
    const content = fs.readFileSync(inputPath, 'utf8');

    // Extract array name
    const arrayNameMatch = content.match(/export const (\w+)/);
    const arrayName = arrayNameMatch ? arrayNameMatch[1] : 'QUESTIONS';

    // Parse questions using regex
    const questionRegex = /\{\s*id:\s*['"]([^'"]+)['"],\s*text:\s*['"`]([^'"`]*(?:\\['"`][^'"`]*)*)['"`],\s*options:\s*\[([\s\S]*?)\],\s*correctIndex:\s*(\d+),\s*explanation:\s*['"`]([^'"`]*(?:\\['"`][^'"`]*)*)['"`]\s*\}/g;

    const questions = [];
    let match;
    while ((match = questionRegex.exec(content)) !== null) {
        const optionsStr = match[3];
        const options = [];
        const optRegex = /['"`]([^'"`]*)['"`]/g;
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

    if (questions.length === 0) {
        log(`  ⚠️ No questions found in ${filename}`);
        return { translated: 0, failed: 0 };
    }

    let translated = 0;
    let failed = 0;
    const translatedQuestions = [];

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const pct = Math.round(((i + 1) / questions.length) * 100);
        process.stdout.write(`\r  ${i + 1}/${questions.length} (${pct}%)`);

        try {
            // Translate text
            const translatedText = await translate(q.text, lang.code);
            await sleep(currentDelay);

            // Translate options one by one
            const translatedOptions = [];
            for (const opt of q.options) {
                const trOpt = await translate(opt, lang.code);
                translatedOptions.push(trOpt);
                await sleep(currentDelay);
            }

            // Translate explanation
            const translatedExplanation = await translate(q.explanation, lang.code);
            await sleep(currentDelay);

            translatedQuestions.push({
                id: q.id,
                text: translatedText,
                options: translatedOptions,
                correctIndex: q.correctIndex,
                explanation: translatedExplanation
            });

            translated++;
        } catch (e) {
            translatedQuestions.push(q); // Keep original on failure
            failed++;
        }

        // Save cache periodically (every 10 questions)
        if (i % 10 === 0) {
            saveCache();
        }
    }

    // Generate output file
    let output = `import { Question } from '../mock';\n\nexport const ${arrayName}: Question[] = [\n`;

    for (const q of translatedQuestions) {
        const escapedText = q.text.replace(/`/g, '\\`');
        const escapedOptions = q.options.map(o => `\`${o.replace(/`/g, '\\`')}\``).join(', ');
        const escapedExplanation = q.explanation.replace(/`/g, '\\`');

        output += `    { id: '${q.id}', text: \`${escapedText}\`, options: [${escapedOptions}], correctIndex: ${q.correctIndex}, explanation: \`${escapedExplanation}\` },\n`;
    }

    output += `];\n`;

    // Ensure output directory exists
    const outDir = path.dirname(outputPath);
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, output);

    clearLine();
    log(`\r  ${questions.length}/${questions.length} (100%) ✅`);

    progress.completed.push(progressKey);
    saveProgress(progress);
    saveCache();

    return { translated, failed };
}

// Translate study guide content
async function translateStudyGuide(guideName, guideData, lang, progress) {
    const progressKey = `${lang.code}:study:${guideName}`;

    if (progress.completed.includes(progressKey)) {
        log(`  ✅ ${guideName} (already done)`);
        return { translated: 0, failed: 0 };
    }

    log(`🔄 ${guideName} → ${lang.name}`);

    let translated = 0;
    let failed = 0;

    const newGuide = {
        topicId: guideData.topicId,
        sections: []
    };

    for (let s = 0; s < guideData.sections.length; s++) {
        const section = guideData.sections[s];
        log(`  Section ${s + 1}/${guideData.sections.length}: ${section.title}`);

        // Translate title
        const translatedTitle = await translate(section.title, lang.code);
        await sleep(currentDelay);

        // Translate content one by one
        const translatedContent = [];
        for (let i = 0; i < section.content.length; i++) {
            const pct = Math.round(((i + 1) / section.content.length) * 100);
            process.stdout.write(`\r    Content: ${i + 1}/${section.content.length} (${pct}%)`);

            const item = section.content[i];
            if (typeof item === 'string') {
                const tr = await translate(item, lang.code);
                translatedContent.push(tr);
                translated++;
            } else {
                translatedContent.push(item);
            }
            await sleep(currentDelay);
        }
        clearLine();
        log(`    Content: ${section.content.length}/${section.content.length} (100%) ✅`);

        // Translate key points one by one
        const translatedKeyPoints = [];
        if (section.keyPoints && section.keyPoints.length > 0) {
            for (let i = 0; i < section.keyPoints.length; i++) {
                const pct = Math.round(((i + 1) / section.keyPoints.length) * 100);
                process.stdout.write(`\r    Key Points: ${i + 1}/${section.keyPoints.length} (${pct}%)`);

                const kp = section.keyPoints[i];
                const tr = await translate(kp, lang.code);
                translatedKeyPoints.push(tr);
                translated++;
                await sleep(currentDelay);
            }
            clearLine();
            log(`    Key Points: ${section.keyPoints.length}/${section.keyPoints.length} (100%) ✅`);
        }

        // Translate review questions
        const translatedQuestions = [];
        if (section.reviewQuestions && section.reviewQuestions.length > 0) {
            for (let i = 0; i < section.reviewQuestions.length; i++) {
                const q = section.reviewQuestions[i];
                process.stdout.write(`\r    Question ${i + 1}/${section.reviewQuestions.length}`);

                const trText = await translate(q.text, lang.code);
                await sleep(currentDelay);

                const trOptions = [];
                for (const opt of q.options) {
                    const trOpt = await translate(opt, lang.code);
                    trOptions.push(trOpt);
                    await sleep(currentDelay);
                }

                const trExplanation = await translate(q.explanation, lang.code);
                await sleep(currentDelay);

                translatedQuestions.push({
                    ...q,
                    text: trText,
                    options: trOptions,
                    explanation: trExplanation
                });
                translated++;
            }
            clearLine();
            log(`    Questions: ${section.reviewQuestions.length}/${section.reviewQuestions.length} (100%) ✅`);
        }

        newGuide.sections.push({
            id: section.id,
            title: translatedTitle,
            cdlReference: section.cdlReference,
            content: translatedContent,
            keyPoints: translatedKeyPoints,
            reviewQuestions: translatedQuestions
        });

        // Save cache after each section
        saveCache();
    }

    progress.completed.push(progressKey);
    saveProgress(progress);

    return { guide: newGuide, translated, failed };
}

// Main function
async function main() {
    // Clear and initialize log file
    fs.writeFileSync(LOG_FILE, '');

    log('╔════════════════════════════════════════════╗');
    log('║  CDL Translation Agent v3.1                ║');
    log('║  (Persistent cache + atomic translations)  ║');
    log('╚════════════════════════════════════════════╝');
    log('');

    // Load persistent cache
    loadCache();

    const progress = loadProgress();
    const completedCount = progress.completed.length;
    log(`📂 Resuming (${completedCount} files done)`);
    log('');

    const dataDir = path.join(__dirname, '..', 'data');

    // Question files to translate
    const questionFiles = [
        'questions_part1.ts',
        'questions_part2.ts',
        'questions_part3.ts',
        'questions_part4.ts',
        'questions_part5.ts',
        'questions_combination.ts',
        'questions_air_brakes.ts',
        'questions_hazmat.ts',
        'questions_passenger.ts',
        'questions_doubles_triples.ts',
        'questions_tanks.ts',
        'questions_school_bus.ts'
    ];

    let totalTranslated = 0;
    let totalFailed = 0;

    // Process each language
    for (const lang of LANGUAGES) {
        log('==============================================');
        log(lang.name.toUpperCase());
        log('==============================================');
        log('');

        // Translate question files
        for (const filename of questionFiles) {
            const inputPath = path.join(dataDir, filename);
            const outputPath = path.join(dataDir, 'questions', lang.code, filename);

            if (!fs.existsSync(inputPath)) {
                log(`  ⚠️ ${filename} not found, skipping`);
                continue;
            }

            const result = await translateQuestionFile(inputPath, outputPath, lang, progress);
            totalTranslated += result.translated;
            totalFailed += result.failed;
        }

        log('');
    }

    log('==============================================');
    log('✨ DONE!');
    log(`📊 ${totalTranslated} translations`);
    if (totalFailed > 0) {
        log(`⚠️  ${totalFailed} failed`);
    }

    // Final cache save
    saveCache();
    log(`💾 Cache saved (${Object.keys(translationCache.es || {}).length + Object.keys(translationCache.ru || {}).length} entries)`);

    // Clean up progress file on success
    if (fs.existsSync(PROGRESS_FILE)) {
        fs.unlinkSync(PROGRESS_FILE);
    }
}

main().catch(err => {
    saveCache(); // Save cache even on error
    console.error('Fatal error:', err);
    process.exit(1);
});
