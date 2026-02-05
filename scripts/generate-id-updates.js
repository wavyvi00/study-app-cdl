#!/usr/bin/env node

/**
 * Generate SQL to update Supabase question IDs to match local format
 * 
 * This script reads the local question mapping and generates SQL UPDATE statements
 * that will be run directly against Supabase.
 * 
 * Usage:
 *   node scripts/generate-id-updates.js
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// ============================================================================
// Configuration
// ============================================================================

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Load local question mapping
const mappingPath = path.join(__dirname, 'local-question-map.json');
const localMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

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
    console.log('║  Generate Supabase ID Update Statements                    ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');

    const updates = [];
    const unmapped = [];

    for (const topicId of Object.keys(localMapping)) {
        console.log(`\nProcessing ${topicId}...`);

        // Fetch all questions for this topic from Supabase
        const { data: supabaseQuestions, error } = await supabase
            .from('questions')
            .select('id, text')
            .eq('topic_id', topicId);

        if (error) {
            console.error(`  Error fetching ${topicId}:`, error.message);
            continue;
        }

        console.log(`  Found ${supabaseQuestions.length} questions in Supabase`);

        // Get local mapping for this topic (normalized text -> local id)
        const localTextToId = localMapping[topicId];
        const localNormalizedMap = {};
        for (const [normalizedText, localId] of Object.entries(localTextToId)) {
            localNormalizedMap[normalizedText] = localId;
        }

        let matched = 0;
        for (const sq of supabaseQuestions) {
            const normalizedText = normalizeText(sq.text);
            const localId = localNormalizedMap[normalizedText];

            if (localId) {
                if (sq.id !== localId) {
                    updates.push({
                        oldId: sq.id,
                        newId: localId,
                        text: sq.text.substring(0, 50)
                    });
                }
                matched++;
            } else {
                unmapped.push({
                    id: sq.id,
                    topic: topicId,
                    text: sq.text.substring(0, 60)
                });
            }
        }

        console.log(`  Matched: ${matched}/${supabaseQuestions.length}`);
    }

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log(`Total updates needed: ${updates.length}`);
    console.log(`Unmapped questions: ${unmapped.length}`);

    if (unmapped.length > 0) {
        console.log('\nUnmapped questions (first 10):');
        for (const u of unmapped.slice(0, 10)) {
            console.log(`  [${u.topic}] ${u.text}...`);
        }
    }

    // Generate SQL file
    if (updates.length > 0) {
        let sql = '-- Update Supabase question IDs to match local format\n';
        sql += '-- Generated on ' + new Date().toISOString() + '\n\n';
        sql += 'BEGIN;\n\n';

        for (const u of updates) {
            // Need to use a two-step approach to avoid ID collisions
            sql += `-- ${u.text}...\n`;
            sql += `UPDATE questions SET id = '${u.newId}' WHERE id = '${u.oldId}';\n\n`;
        }

        sql += 'COMMIT;\n';

        const sqlPath = path.join(__dirname, 'update-supabase-ids.sql');
        fs.writeFileSync(sqlPath, sql);
        console.log(`\nSQL file written to: ${sqlPath}`);
        console.log(`Run: npx supabase db push < ${sqlPath}`);
    }

    // Also output as JSON for programmatic updates
    const jsonPath = path.join(__dirname, 'id-updates.json');
    fs.writeFileSync(jsonPath, JSON.stringify({ updates, unmapped }, null, 2));
    console.log(`JSON file written to: ${jsonPath}`);
}

main().catch(console.error);
