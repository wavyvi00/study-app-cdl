#!/usr/bin/env node

/**
 * Script to update Supabase question IDs to match local file format
 * 
 * This script:
 * 1. Loads all local English questions with their IDs (gk1, comb_1, etc.)
 * 2. Fetches all Supabase questions with their UUIDs
 * 3. Matches them by text
 * 4. Generates SQL UPDATE statements to fix the IDs
 * 
 * Usage:
 *   node scripts/sync-supabase-ids.js
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// Configuration
// ============================================================================

const DATA_DIR = path.join(__dirname, '..', 'data');

// Map of topic_id in Supabase to local file info
const TOPIC_MAPPING = {
    'general_knowledge': [
        { file: 'questions_part1.ts', varName: 'GK_QUESTIONS_PART1' },
        { file: 'questions_part2.ts', varName: 'GK_QUESTIONS_PART2' },
        { file: 'questions_part3.ts', varName: 'GK_QUESTIONS_PART3' },
        { file: 'questions_part4.ts', varName: 'GK_QUESTIONS_PART4' },
        { file: 'questions_part5.ts', varName: 'GK_QUESTIONS_PART5' },
    ],
    'combinations': [
        { file: 'questions_combination.ts', varName: 'COMBINATION_QUESTIONS' }
    ],
    'air_brakes': [
        { file: 'questions_air_brakes.ts', varName: 'AIR_BRAKES_QUESTIONS' }
    ],
    'hazmat': [
        { file: 'questions_hazmat.ts', varName: 'HAZMAT_QUESTIONS' }
    ],
    'passenger': [
        { file: 'questions_passenger.ts', varName: 'PASSENGER_QUESTIONS' }
    ],
    'doubles_triples': [
        { file: 'questions_doubles_triples.ts', varName: 'DOUBLES_TRIPLES_QUESTIONS' }
    ],
    'tanks': [
        { file: 'questions_tanks.ts', varName: 'TANKS_QUESTIONS' }
    ],
    'school_bus': [
        { file: 'questions_school_bus.ts', varName: 'SCHOOL_BUS_QUESTIONS' }
    ],
};

// ============================================================================
// Load Local Questions
// ============================================================================

function extractQuestions(filePath, varName) {
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return [];
    }

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Clean content for eval
        content = content.replace(/import .*?;[\r\n]*/g, '');
        content = content.replace(/: Question\[\]/g, '');
        content = content.replace(/export const/g, 'const');

        const result = eval(content + '; ' + varName + ';');
        return result || [];
    } catch (e) {
        console.error(`Error loading ${filePath}:`, e.message);
        return [];
    }
}

function loadAllLocalQuestions() {
    const allQuestions = {};

    for (const [topicId, files] of Object.entries(TOPIC_MAPPING)) {
        allQuestions[topicId] = [];

        for (const { file, varName } of files) {
            const filePath = path.join(DATA_DIR, file);
            const questions = extractQuestions(filePath, varName);
            allQuestions[topicId].push(...questions);
            console.log(`  Loaded ${questions.length} questions from ${file}`);
        }
    }

    return allQuestions;
}

// ============================================================================
// Normalize text for comparison
// ============================================================================

function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/[""'']/g, "'")
        .replace(/[–—]/g, '-')
        .replace(/\s+/g, ' ')
        .trim();
}

// ============================================================================
// Main
// ============================================================================

async function main() {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║  Sync Supabase Question IDs with Local Files               ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');

    // Load local questions
    console.log('Loading local questions...');
    const localQuestions = loadAllLocalQuestions();

    // Build text -> id map for each topic
    const textToIdMap = {};
    for (const [topicId, questions] of Object.entries(localQuestions)) {
        textToIdMap[topicId] = new Map();
        for (const q of questions) {
            const normalizedText = normalizeText(q.text);
            textToIdMap[topicId].set(normalizedText, q.id);
        }
        console.log(`  ${topicId}: ${textToIdMap[topicId].size} unique questions`);
    }

    // Output JSON for use in SQL generation
    const mappingData = {};
    for (const [topicId, map] of Object.entries(textToIdMap)) {
        mappingData[topicId] = Object.fromEntries(map);
    }

    const outputPath = path.join(__dirname, 'local-question-map.json');
    fs.writeFileSync(outputPath, JSON.stringify(mappingData, null, 2));
    console.log(`\nWrote mapping data to ${outputPath}`);

    // Summary
    let total = 0;
    for (const map of Object.values(textToIdMap)) {
        total += map.size;
    }
    console.log(`\nTotal: ${total} question IDs ready for matching`);
    console.log('\nNext step: Run the Supabase update query to match these IDs');
}

main().catch(console.error);
