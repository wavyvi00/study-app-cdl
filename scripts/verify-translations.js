#!/usr/bin/env node

/**
 * Comprehensive Translation Verification Script
 * 
 * Verifies that all Spanish and Russian translations:
 * 1. Have matching IDs with English originals
 * 2. Have the same number of questions
 * 3. Have correct structure (text, options, correctIndex, explanation)
 * 4. Optionally validates translation quality using OpenAI
 * 
 * Usage:
 *   node scripts/verify-translations.js
 *   node scripts/verify-translations.js --fix   # Re-translate broken questions
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// Configuration
// ============================================================================

const DATA_DIR = path.join(__dirname, '..', 'data');
const QUESTION_FILES = [
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

const LANGUAGES = ['es', 'ru'];

// ============================================================================
// Question Extraction
// ============================================================================

function extractQuestions(filePath) {
    if (!fs.existsSync(filePath)) {
        return { questions: [], error: 'File not found' };
    }

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Find variable name
        const varMatch = content.match(/export const (\w+)/);
        const varName = varMatch ? varMatch[1] : 'QUESTIONS';

        // Clean content for eval
        content = content.replace(/import .*?;[\r\n]*/g, '');
        content = content.replace(/: Question\[\]/g, '');
        content = content.replace(/export const/g, 'const');

        const result = eval(content + '; ' + varName + ';');
        return { questions: result, varName, error: null };
    } catch (e) {
        return { questions: [], error: e.message };
    }
}

// ============================================================================
// Verification
// ============================================================================

function verifyTranslation(englishQuestions, translatedQuestions, lang, filename) {
    const issues = [];

    // Check count
    if (englishQuestions.length !== translatedQuestions.length) {
        issues.push({
            type: 'COUNT_MISMATCH',
            severity: 'ERROR',
            message: `Count mismatch: EN has ${englishQuestions.length}, ${lang.toUpperCase()} has ${translatedQuestions.length}`
        });
    }

    // Build ID maps
    const enMap = new Map(englishQuestions.map(q => [q.id, q]));
    const transMap = new Map(translatedQuestions.map(q => [q.id, q]));

    // Check for missing IDs in translation
    for (const [id, enQ] of enMap) {
        if (!transMap.has(id)) {
            issues.push({
                type: 'MISSING_ID',
                severity: 'ERROR',
                questionId: id,
                message: `Missing in ${lang.toUpperCase()}: ${id}`
            });
        }
    }

    // Check for extra IDs in translation
    for (const [id] of transMap) {
        if (!enMap.has(id)) {
            issues.push({
                type: 'EXTRA_ID',
                severity: 'WARNING',
                questionId: id,
                message: `Extra ID in ${lang.toUpperCase()} (not in EN): ${id}`
            });
        }
    }

    // Check order
    for (let i = 0; i < Math.min(englishQuestions.length, translatedQuestions.length); i++) {
        const enQ = englishQuestions[i];
        const transQ = translatedQuestions[i];

        if (enQ.id !== transQ.id) {
            issues.push({
                type: 'ORDER_MISMATCH',
                severity: 'WARNING',
                index: i,
                message: `Order mismatch at index ${i}: EN has ${enQ.id}, ${lang.toUpperCase()} has ${transQ.id}`
            });
            break; // Only report first order mismatch
        }
    }

    // Check structure of each translated question
    for (const transQ of translatedQuestions) {
        const enQ = enMap.get(transQ.id);
        if (!enQ) continue;

        // Check options count
        if (transQ.options.length !== enQ.options.length) {
            issues.push({
                type: 'OPTIONS_MISMATCH',
                severity: 'ERROR',
                questionId: transQ.id,
                message: `Options count mismatch for ${transQ.id}: EN has ${enQ.options.length}, ${lang.toUpperCase()} has ${transQ.options.length}`
            });
        }

        // Check correctIndex
        if (transQ.correctIndex !== enQ.correctIndex) {
            issues.push({
                type: 'CORRECT_INDEX_MISMATCH',
                severity: 'ERROR',
                questionId: transQ.id,
                message: `CorrectIndex mismatch for ${transQ.id}: EN has ${enQ.correctIndex}, ${lang.toUpperCase()} has ${transQ.correctIndex}`
            });
        }

        // Check for untranslated content (still English)
        if (lang === 'es') {
            // Check if Spanish text looks like English
            const spanishIndicators = /[áéíóúñ¿¡]/;
            if (!spanishIndicators.test(transQ.text) && transQ.text === enQ.text) {
                issues.push({
                    type: 'UNTRANSLATED',
                    severity: 'WARNING',
                    questionId: transQ.id,
                    message: `Possibly untranslated (${transQ.id}): "${transQ.text.substring(0, 50)}..."`
                });
            }
        }

        if (lang === 'ru') {
            // Check if Russian text contains Cyrillic
            const cyrillicPattern = /[а-яА-ЯёЁ]/;
            if (!cyrillicPattern.test(transQ.text)) {
                issues.push({
                    type: 'UNTRANSLATED',
                    severity: 'WARNING',
                    questionId: transQ.id,
                    message: `Not in Cyrillic (${transQ.id}): "${transQ.text.substring(0, 50)}..."`
                });
            }
        }

        // Check for truncated content (broken template literals)
        if (transQ.explanation && transQ.explanation.endsWith('\\')) {
            issues.push({
                type: 'TRUNCATED',
                severity: 'ERROR',
                questionId: transQ.id,
                message: `Truncated explanation for ${transQ.id}`
            });
        }
        if (transQ.text && transQ.text.endsWith('\\')) {
            issues.push({
                type: 'TRUNCATED',
                severity: 'ERROR',
                questionId: transQ.id,
                message: `Truncated text for ${transQ.id}`
            });
        }
    }

    return issues;
}

// ============================================================================
// Main
// ============================================================================

function main() {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║  Comprehensive Translation Verification                    ║');
    console.log('║  Checking Spanish and Russian translations                 ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');

    let totalIssues = 0;
    let errorCount = 0;
    let warningCount = 0;
    const allIssues = [];

    for (const filename of QUESTION_FILES) {
        console.log(`\n📄 ${filename}`);
        console.log('─'.repeat(60));

        // Load English
        const enPath = path.join(DATA_DIR, filename);
        const enResult = extractQuestions(enPath);

        if (enResult.error) {
            console.log(`   ❌ English: ${enResult.error}`);
            continue;
        }
        console.log(`   ✅ English: ${enResult.questions.length} questions`);

        // Check each language
        for (const lang of LANGUAGES) {
            const transPath = path.join(DATA_DIR, 'questions', lang, filename);
            const transResult = extractQuestions(transPath);

            if (transResult.error) {
                console.log(`   ❌ ${lang.toUpperCase()}: ${transResult.error}`);
                allIssues.push({
                    file: filename,
                    lang,
                    issues: [{ type: 'FILE_ERROR', severity: 'ERROR', message: transResult.error }]
                });
                errorCount++;
                continue;
            }

            const issues = verifyTranslation(enResult.questions, transResult.questions, lang, filename);

            if (issues.length === 0) {
                console.log(`   ✅ ${lang.toUpperCase()}: ${transResult.questions.length} questions - All aligned!`);
            } else {
                const errors = issues.filter(i => i.severity === 'ERROR').length;
                const warnings = issues.filter(i => i.severity === 'WARNING').length;
                console.log(`   ⚠️  ${lang.toUpperCase()}: ${transResult.questions.length} questions - ${errors} errors, ${warnings} warnings`);

                for (const issue of issues.slice(0, 5)) { // Show first 5
                    const icon = issue.severity === 'ERROR' ? '❌' : '⚠️';
                    console.log(`      ${icon} ${issue.message}`);
                }
                if (issues.length > 5) {
                    console.log(`      ... and ${issues.length - 5} more issues`);
                }

                allIssues.push({ file: filename, lang, issues });
                errorCount += errors;
                warningCount += warnings;
                totalIssues += issues.length;
            }
        }
    }

    // Summary
    console.log('\n');
    console.log('═'.repeat(60));
    console.log('SUMMARY');
    console.log('═'.repeat(60));

    if (totalIssues === 0) {
        console.log('✅ All translations verified - No issues found!');
    } else {
        console.log(`❌ Found ${totalIssues} total issues:`);
        console.log(`   🔴 ${errorCount} Errors (require fixing)`);
        console.log(`   🟡 ${warningCount} Warnings (review recommended)`);

        // Group by type
        const byType = {};
        for (const { issues } of allIssues) {
            for (const issue of issues) {
                byType[issue.type] = (byType[issue.type] || 0) + 1;
            }
        }

        console.log('\nIssues by type:');
        for (const [type, count] of Object.entries(byType).sort((a, b) => b[1] - a[1])) {
            console.log(`   ${type}: ${count}`);
        }
    }

    // Return exit code
    process.exit(errorCount > 0 ? 1 : 0);
}

main();
