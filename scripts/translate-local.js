#!/usr/bin/env node

/**
 * Local LLM Translation Tool for CDL Study App
 * 
 * Uses Ollama with local LLM models for fully offline translation.
 * No external APIs, no internet required.
 * 
 * Usage:
 *   node scripts/translate-local.js --lang=es
 *   node scripts/translate-local.js --lang=ru
 *   node scripts/translate-local.js --lang=pt
 * 
 * Requirements:
 *   - Ollama installed (https://ollama.ai)
 *   - A local model (llama3, mistral, etc.)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync, spawn } = require('child_process');

// ============================================================================
// Configuration
// ============================================================================

const CONFIG = {
    // Model selection priority (first available will be used)
    preferredModels: [
        'llama3.1:8b',
        'llama3:8b',
        'llama3:latest',
        'mistral:7b',
        'mistral:latest',
        'phi-3:mini',
        'phi3:mini',
        'phi:latest'
    ],

    // LLM parameters
    temperature: 0.2,
    maxTokens: 512,

    // Paths
    cacheFile: path.join(__dirname, '.llm-translation-cache.json'),
    progressFile: path.join(__dirname, '.llm-translation-progress.json'),
    logFile: path.join(__dirname, '..', 'translation-local.log'),

    // Source file to translate
    sourceFile: path.join(__dirname, '..', 'data', 'questions_air_brakes.ts'),
    outputDir: path.join(__dirname, '..', 'data', 'questions'),

    // Retry settings
    maxRetries: 2,
    retryDelayMs: 1000,
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
// Cache Management
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
// Ollama Detection and Model Selection
// ============================================================================

function checkOllamaInstalled() {
    try {
        execSync('which ollama', { encoding: 'utf8', stdio: 'pipe' });
        return true;
    } catch (e) {
        return false;
    }
}

function getInstalledModels() {
    try {
        const output = execSync('ollama list', { encoding: 'utf8', stdio: 'pipe' });
        const lines = output.trim().split('\n').slice(1); // Skip header
        return lines.map(line => {
            const parts = line.split(/\s+/);
            return parts[0]; // Model name
        }).filter(Boolean);
    } catch (e) {
        return [];
    }
}

function selectBestModel(installedModels) {
    // Check priority list first
    for (const preferred of CONFIG.preferredModels) {
        if (installedModels.includes(preferred)) {
            return preferred;
        }
    }

    // Fall back to any model with "llama" or "mistral" in name
    for (const model of installedModels) {
        const lowerModel = model.toLowerCase();
        if (lowerModel.includes('llama') || lowerModel.includes('mistral') || lowerModel.includes('phi')) {
            return model;
        }
    }

    // Use first available model if any
    return installedModels[0] || null;
}

// ============================================================================
// Local LLM Translation
// ============================================================================

function buildSystemPrompt(targetLang) {
    const langName = LANGUAGE_NAMES[targetLang] || targetLang;
    return `You are a translator. Translate the following English text to ${langName}. Rules:\n1. Return ONLY the translation, nothing else\n2. Do NOT add notes, explanations, or parenthetical comments\n3. Preserve technical CDL (Commercial Driver's License) terminology\n4. Keep the same tone and meaning\n5. If unsure, translate literally`;
}

async function translateWithOllama(text, targetLang, model) {
    if (!text || text.trim() === '') return text;

    // Check cache first
    const cached = getCachedTranslation(text, targetLang);
    if (cached) {
        return cached;
    }

    const systemPrompt = buildSystemPrompt(targetLang);
    const userPrompt = text;

    return new Promise((resolve, reject) => {
        const ollama = spawn('ollama', ['run', model], {
            stdio: ['pipe', 'pipe', 'pipe']
        });

        let stdout = '';
        let stderr = '';

        ollama.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        ollama.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        ollama.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Ollama exited with code ${code}: ${stderr}`));
                return;
            }

            // Clean up the response
            let translation = stdout.trim();

            // Remove common LLM additions
            // Remove "(Note: ...)" sections
            translation = translation.replace(/\s*\(Note:[^)]*\)/gi, '');
            translation = translation.replace(/\s*\(Nota:[^)]*\)/gi, '');
            translation = translation.replace(/\s*\[Note:[^\\]]*\]/gi, '');

            // Remove "Translation:" or similar prefixes
            translation = translation.replace(/^(Translation|Traducción|Here is|Here's|The translation is)[:\s]*/i, '');

            // Remove trailing explanations after newlines
            const lines = translation.split('\n');
            if (lines.length > 1) {
                // Keep only the first non-empty line that looks like actual translation
                translation = lines[0].trim();
            }

            // Remove any quotes that might wrap the response
            if ((translation.startsWith('"') && translation.endsWith('"')) ||
                (translation.startsWith("'") && translation.endsWith("'"))) {
                translation = translation.slice(1, -1);
            }

            // Cache the translation
            setCachedTranslation(text, targetLang, translation);

            resolve(translation);
        });

        ollama.on('error', (err) => {
            reject(err);
        });

        // Send the prompt
        const fullPrompt = `${systemPrompt}\n\nTranslate this text:\n${userPrompt}`;
        ollama.stdin.write(fullPrompt);
        ollama.stdin.end();
    });
}

async function translateWithRetry(text, targetLang, model) {
    for (let attempt = 1; attempt <= CONFIG.maxRetries; attempt++) {
        try {
            return await translateWithOllama(text, targetLang, model);
        } catch (error) {
            if (attempt === CONFIG.maxRetries) {
                log(`  ⚠️ Failed after ${CONFIG.maxRetries} attempts: "${text.substring(0, 40)}..."`);
                return text; // Return original on final failure
            }
            log(`  ⚠️ Retry ${attempt}/${CONFIG.maxRetries - 1}...`);
            await sleep(CONFIG.retryDelayMs);
        }
    }
    return text;
}

// ============================================================================
// Question Extraction
// ============================================================================

function extractQuestions(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
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

// ============================================================================
// Output Generation
// ============================================================================

function generateOutputFile(questions, targetLang) {
    const langDir = path.join(CONFIG.outputDir, targetLang);
    if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, { recursive: true });
    }

    const outputPath = path.join(langDir, 'questions_air_brakes.ts');

    let output = `import { Question } from '../mock';\n\nexport const AIR_BRAKES_QUESTIONS: Question[] = [\n`;

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
// Main Translation Flow
// ============================================================================

async function main() {
    // Parse CLI arguments
    const args = process.argv.slice(2);
    let targetLang = 'es'; // Default to Spanish

    for (const arg of args) {
        if (arg.startsWith('--lang=')) {
            targetLang = arg.split('=')[1];
        } else if (arg === '--help' || arg === '-h') {
            console.log(`
Local LLM Translation Tool for CDL Study App

Usage:
  node scripts/translate-local.js --lang=<language_code>

Options:
  --lang=es    Spanish (default)
  --lang=ru    Russian
  --lang=pt    Portuguese
  --lang=fr    French
  --lang=de    German

Examples:
  node scripts/translate-local.js --lang=es
  node scripts/translate-local.js --lang=ru
`);
            process.exit(0);
        }
    }

    // Initialize log
    fs.writeFileSync(CONFIG.logFile, '');

    log('╔════════════════════════════════════════════════════════════╗');
    log('║  Local LLM Translation Tool for CDL Study App             ║');
    log('║  Fully Offline • No External APIs                         ║');
    log('╚════════════════════════════════════════════════════════════╝');
    log('');

    // Check Ollama installation
    log('🔍 Checking Ollama installation...');
    if (!checkOllamaInstalled()) {
        log('');
        log('❌ Ollama is not installed!');
        log('');
        log('To install Ollama on macOS:');
        log('  1. Visit https://ollama.ai');
        log('  2. Download and install Ollama');
        log('  3. Run: ollama pull llama3');
        log('');
        process.exit(1);
    }
    log('✅ Ollama is installed');

    // Get available models
    log('🔍 Checking available models...');
    const installedModels = getInstalledModels();

    if (installedModels.length === 0) {
        log('');
        log('❌ No models found!');
        log('');
        log('To install a model:');
        log('  ollama pull llama3');
        log('');
        process.exit(1);
    }

    log(`   Found models: ${installedModels.join(', ')}`);

    // Select best model
    const selectedModel = selectBestModel(installedModels);
    if (!selectedModel) {
        log('❌ No compatible model found!');
        process.exit(1);
    }
    log(`✅ Using model: ${selectedModel}`);
    log('');

    // Load cache
    loadCache();

    // Load progress
    const progress = loadProgress(targetLang);
    const startIndex = progress.lastIndex + 1;

    // Load questions
    log(`📚 Loading questions from ${path.basename(CONFIG.sourceFile)}...`);
    const questions = extractQuestions(CONFIG.sourceFile);
    log(`   Found ${questions.length} questions`);

    if (startIndex > 0) {
        log(`📂 Resuming from question ${startIndex + 1} (${startIndex} already done)`);
    }

    const langName = LANGUAGE_NAMES[targetLang] || targetLang;
    log(`🌐 Target language: ${langName} (${targetLang})`);
    log('');
    log('═══════════════════════════════════════════════════════════════');
    log('');

    // Translate each question
    for (let i = startIndex; i < questions.length; i++) {
        const q = questions[i];
        log(`🔄 Question ${i + 1}/${questions.length}: ${q.id}`);

        // Translate text
        process.stdout.write('   Translating question text... ');
        const translatedText = await translateWithRetry(q.text, targetLang, selectedModel);
        console.log('✓');

        // Translate options
        const translatedOptions = [];
        for (let j = 0; j < q.options.length; j++) {
            process.stdout.write(`   Translating option ${j + 1}/${q.options.length}... `);
            const trOpt = await translateWithRetry(q.options[j], targetLang, selectedModel);
            translatedOptions.push(trOpt);
            console.log('✓');
        }

        // Translate explanation
        process.stdout.write('   Translating explanation... ');
        const translatedExplanation = await translateWithRetry(q.explanation, targetLang, selectedModel);
        console.log('✓');

        // Add to progress
        progress.translatedQuestions.push({
            id: q.id,
            text: translatedText,
            options: translatedOptions,
            correctIndex: q.correctIndex,
            explanation: translatedExplanation
        });
        progress.lastIndex = i;

        // Save progress and cache after each question
        saveProgress(targetLang, progress);
        saveCache();

        // Generate output file with current progress
        const outputPath = generateOutputFile(progress.translatedQuestions, targetLang);

        log(`   ✅ Done! Progress saved.`);
        log('');
    }

    log('═══════════════════════════════════════════════════════════════');
    log('');
    log(`✨ Translation complete!`);
    log(`📄 Output: ${path.join(CONFIG.outputDir, targetLang, 'questions_air_brakes.ts')}`);
    log(`📊 Translated ${progress.translatedQuestions.length} questions to ${langName}`);
    log('');

    // Clear progress on success
    clearProgress(targetLang);

    // Final cache save
    saveCache();
    const cacheCount = Object.values(translationCache).reduce((sum, lang) =>
        sum + Object.keys(lang).length, 0);
    log(`💾 Cache saved (${cacheCount} translations)`);
}

// Run
main().catch(err => {
    log(`❌ Fatal error: ${err.message}`);
    saveCache(); // Save cache even on error
    process.exit(1);
});
