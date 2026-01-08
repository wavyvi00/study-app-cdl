#!/usr/bin/env node

/**
 * OpenAI Translation Tool for CDL Study App
 * 
 * Uses OpenAI gpt-4o-mini for fast, reliable translation.
 * Reuses existing cache and progress tracking.
 * 
 * Usage:
 *   OPENAI_API_KEY=sk-xxx node scripts/translate-openai.js --lang=es
 *   OPENAI_API_KEY=sk-xxx node scripts/translate-openai.js --lang=ru
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const OpenAI = require('openai').default;

// ============================================================================
// Configuration
// ============================================================================

const CONFIG = {
    // OpenAI model - gpt-4o-mini is fast and cost-efficient for translation
    model: 'gpt-4o-mini',

    // Optimized parameters for translation (minimal reasoning overhead)
    temperature: 0.1,  // Very low for consistent translations
    maxTokens: 256,    // Translations are short

    // Paths - reuse existing cache
    cacheFile: path.join(__dirname, '.llm-translation-cache.json'),
    progressFile: path.join(__dirname, '.openai-translation-progress.json'),
    logFile: path.join(__dirname, '..', 'translation-openai.log'),

    // Source file to translate
    sourceFile: path.join(__dirname, '..', 'data', 'questions_air_brakes.ts'),
    outputDir: path.join(__dirname, '..', 'data', 'questions'),

    // Retry settings
    maxRetries: 2,
    retryDelayMs: 500,
};

// Language names for system prompts
const LANGUAGE_NAMES = {
    es: 'neutral Latin American Spanish',
    ru: 'Russian',
    pt: 'Brazilian Portuguese',
    fr: 'French',
    de: 'German',
    zh: 'Simplified Chinese',
    ja: 'Japanese',
    ko: 'Korean',
    ar: 'Arabic',
    hi: 'Hindi',
};

// ============================================================================
// Utilities
// ============================================================================

function log(message) {
    const timestamp = new Date().toISOString().slice(11, 19);
    const line = `[${timestamp}] ${message}`;
    console.log(line);
    fs.appendFileSync(CONFIG.logFile, line + '\n');
}

function hashText(text) {
    return crypto.createHash('md5').update(text.trim()).digest('hex');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================================
// Cache Management (Reuses existing cache)
// ============================================================================

let translationCache = {};

function loadCache() {
    if (fs.existsSync(CONFIG.cacheFile)) {
        try {
            translationCache = JSON.parse(fs.readFileSync(CONFIG.cacheFile, 'utf8'));
            const count = Object.values(translationCache).reduce((sum, lang) =>
                sum + Object.keys(lang).length, 0);
            log(`📦 Loaded cache with ${count} translations`);
        } catch (e) {
            translationCache = {};
        }
    }
}

function saveCache() {
    fs.writeFileSync(CONFIG.cacheFile, JSON.stringify(translationCache, null, 2));
}

function getCachedTranslation(text, targetLang) {
    const hash = hashText(text);
    if (!translationCache[targetLang]) return null;
    return translationCache[targetLang][hash] || null;
}

function setCachedTranslation(text, targetLang, translation) {
    const hash = hashText(text);
    if (!translationCache[targetLang]) {
        translationCache[targetLang] = {};
    }
    translationCache[targetLang][hash] = translation;
}

// ============================================================================
// Progress Management
// ============================================================================

function loadProgress(targetLang) {
    if (fs.existsSync(CONFIG.progressFile)) {
        try {
            const progress = JSON.parse(fs.readFileSync(CONFIG.progressFile, 'utf8'));
            return progress[targetLang] || { translatedQuestions: [], lastIndex: -1 };
        } catch (e) {
            return { translatedQuestions: [], lastIndex: -1 };
        }
    }
    return { translatedQuestions: [], lastIndex: -1 };
}

function saveProgress(targetLang, progress) {
    let allProgress = {};
    if (fs.existsSync(CONFIG.progressFile)) {
        try {
            allProgress = JSON.parse(fs.readFileSync(CONFIG.progressFile, 'utf8'));
        } catch (e) { }
    }
    allProgress[targetLang] = progress;
    fs.writeFileSync(CONFIG.progressFile, JSON.stringify(allProgress, null, 2));
}

function clearProgress(targetLang) {
    if (fs.existsSync(CONFIG.progressFile)) {
        try {
            const allProgress = JSON.parse(fs.readFileSync(CONFIG.progressFile, 'utf8'));
            delete allProgress[targetLang];
            if (Object.keys(allProgress).length === 0) {
                fs.unlinkSync(CONFIG.progressFile);
            } else {
                fs.writeFileSync(CONFIG.progressFile, JSON.stringify(allProgress, null, 2));
            }
        } catch (e) { }
    }
}

// ============================================================================
// OpenAI Translation
// ============================================================================

let openai = null;

function initOpenAI() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        log('❌ OPENAI_API_KEY environment variable not set!');
        log('');
        log('Usage:');
        log('  OPENAI_API_KEY=sk-xxx node scripts/translate-openai.js --lang=es');
        process.exit(1);
    }
    openai = new OpenAI({ apiKey });
    log('✅ OpenAI client initialized');
}

async function translateWithOpenAI(text, targetLang) {
    if (!text || text.trim() === '') return text;

    // Check cache first
    const cached = getCachedTranslation(text, targetLang);
    if (cached) {
        return cached;
    }

    const langName = LANGUAGE_NAMES[targetLang] || targetLang;

    const response = await openai.chat.completions.create({
        model: CONFIG.model,
        temperature: CONFIG.temperature,
        max_tokens: CONFIG.maxTokens,
        messages: [
            {
                role: 'system',
                content: `Translate to ${langName}. Return ONLY the translation. No explanations. Preserve CDL terminology.`
            },
            {
                role: 'user',
                content: text
            }
        ]
    });

    let translation = response.choices[0].message.content.trim();

    // Clean up - remove quotes if wrapped
    if ((translation.startsWith('"') && translation.endsWith('"')) ||
        (translation.startsWith("'") && translation.endsWith("'"))) {
        translation = translation.slice(1, -1);
    }

    // Cache the translation
    setCachedTranslation(text, targetLang, translation);

    return translation;
}

async function translateWithRetry(text, targetLang) {
    for (let attempt = 1; attempt <= CONFIG.maxRetries; attempt++) {
        try {
            return await translateWithOpenAI(text, targetLang);
        } catch (error) {
            if (attempt === CONFIG.maxRetries) {
                log(`  ⚠️ Failed: "${text.substring(0, 30)}..." - ${error.message}`);
                return text; // Return original on final failure
            }
            await sleep(CONFIG.retryDelayMs * attempt);
        }
    }
    return text;
}

// ============================================================================
// Question Extraction
// ============================================================================

function extractQuestions(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Find variable name before stripping export
    const varMatch = content.match(/export const (\w+)/);
    const varName = varMatch ? varMatch[1] : 'QUESTIONS';

    // Remove imports
    content = content.replace(/import .*?;\n/g, '');

    // Remove TypeScript type annotation
    content = content.replace(/: Question\[\]/g, '');

    // Remove export keyword
    content = content.replace(/export const/g, 'const');

    // Eval the content to get the array
    try {
        const result = eval(content + '; ' + varName + ';');
        return { questions: result, varName };
    } catch (e) {
        log(`❌ Failed to parse questions file: ${e.message}`);
        process.exit(1);
    }
}

// ============================================================================
// Output Generation
// ============================================================================

function generateOutputFile(questions, targetLang, originalVarName, outputDir, filename) {
    const langDir = path.join(outputDir, targetLang);
    if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, { recursive: true });
    }

    const outputPath = path.join(langDir, filename);

    let output = `import { Question } from '../mock';\n\nexport const ${originalVarName}: Question[] = [\n`;

    for (const q of questions) {
        const escapedText = (q.text || '').replace(/`/g, '\\`').replace(/\\/g, '\\\\');
        const escapedOptions = q.options.map(o => `\`${(o || '').replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\``).join(', ');
        const escapedExplanation = (q.explanation || '').replace(/`/g, '\\`').replace(/\\/g, '\\\\');

        output += `    { id: '${q.id}', text: \`${escapedText}\`, options: [${escapedOptions}], correctIndex: ${q.correctIndex}, explanation: \`${escapedExplanation}\` },\n`;
    }

    output += `];\n`;

    fs.writeFileSync(outputPath, output);
    return outputPath;
}

// ============================================================================
// Main
// ============================================================================

async function main() {
    const args = process.argv.slice(2);
    let targetLang = 'es';
    let sourcePath = CONFIG.sourceFile;

    for (const arg of args) {
        if (arg.startsWith('--lang=')) {
            targetLang = arg.split('=')[1];
        } else if (arg.startsWith('--source=')) {
            const rawPath = arg.split('=')[1];
            // Resolve relative paths if necessary
            sourcePath = path.isAbsolute(rawPath) ? rawPath : path.resolve(process.cwd(), rawPath);
            // If just filename is provided, assume it's in data dir if not found
            if (!fs.existsSync(sourcePath)) {
                const dataPath = path.join(__dirname, '..', 'data', rawPath);
                if (fs.existsSync(dataPath)) {
                    sourcePath = dataPath;
                }
            }
        } else if (arg === '--help' || arg === '-h') {
            console.log(`
OpenAI Translation Tool for CDL Study App

Usage:
  OPENAI_API_KEY=sk-xxx node scripts/translate-openai.js --lang=<code> [--source=file.ts]

Options:
  --lang=es      Spanish (default)
  --lang=ru      Russian
  --source=file  Source TypeScript file (default: questions_air_brakes.ts)
`);
            process.exit(0);
        }
    }

    fs.writeFileSync(CONFIG.logFile, '');

    log('╔════════════════════════════════════════════════════════════╗');
    log('║  OpenAI Translation Tool (gpt-4o-mini)                     ║');
    log('║  Fast • Reliable • Cost-Efficient                         ║');
    log('╚════════════════════════════════════════════════════════════╝');
    log('');

    initOpenAI();
    loadCache();

    // Load questions
    log(`📚 Loading questions from ${path.basename(sourcePath)}...`);
    if (!fs.existsSync(sourcePath)) {
        log(`❌ Source file not found: ${sourcePath}`);
        process.exit(1);
    }

    const { questions, varName } = extractQuestions(sourcePath);
    log(`   Found ${questions.length} questions (Variable: ${varName})`);

    // Progress is tracked per source file + language to avoid collisions
    // We'll append the filename hash to the lang key in progress
    const fileHash = crypto.createHash('md5').update(path.basename(sourcePath)).digest('hex').substring(0, 6);
    const progressKey = `${targetLang}_${fileHash}`; // es_abcdef

    const progress = loadProgress(progressKey);
    const startIndex = progress.lastIndex + 1;

    if (startIndex > 0) {
        log(`📂 Resuming from question ${startIndex + 1}`);
    }

    const langName = LANGUAGE_NAMES[targetLang] || targetLang;
    log(`🌐 Target: ${langName} (${targetLang})`);
    log('');

    const startTime = Date.now();
    const outputFilename = path.basename(sourcePath);

    for (let i = startIndex; i < questions.length; i++) {
        const q = questions[i];
        const qStart = Date.now();

        process.stdout.write(`[${i + 1}/${questions.length}] ${q.id}... `);

        // Translate all parts
        const translatedText = await translateWithRetry(q.text, targetLang);
        const translatedOptions = [];
        for (const opt of q.options) {
            translatedOptions.push(await translateWithRetry(opt, targetLang));
        }
        const translatedExplanation = await translateWithRetry(q.explanation, targetLang);

        progress.translatedQuestions.push({
            id: q.id,
            text: translatedText,
            options: translatedOptions,
            correctIndex: q.correctIndex,
            explanation: translatedExplanation
        });
        progress.lastIndex = i;

        saveProgress(progressKey, progress);
        saveCache();
        generateOutputFile(progress.translatedQuestions, targetLang, varName, CONFIG.outputDir, outputFilename);

        const qTime = ((Date.now() - qStart) / 1000).toFixed(1);
        console.log(`✓ (${qTime}s)`);
    }

    const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);

    log('');
    log('═══════════════════════════════════════════════════════════════');
    log(`✨ Done! ${questions.length} questions in ${totalTime}s`);
    log(`📄 Output: ${path.join(CONFIG.outputDir, targetLang, outputFilename)}`);

    clearProgress(progressKey);
    saveCache();
}

main().catch(err => {
    log(`❌ Error: ${err.message}`);
    saveCache();
    process.exit(1);
});
