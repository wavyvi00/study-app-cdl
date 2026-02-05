#!/usr/bin/env node

/**
 * Populate local_id column in Supabase from text matching
 * 
 * Usage:
 *   node scripts/populate-local-ids.js
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Load mapping
const mappingPath = path.join(__dirname, 'local-question-map.json');
const localMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

function normalizeText(text) {
    return text.toLowerCase().replace(/[""'']/g, "'").replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();
}

async function main() {
    console.log('Populating local_id column...\n');

    let totalUpdated = 0;
    let totalFailed = 0;

    for (const topicId of Object.keys(localMapping)) {
        console.log(`Processing ${topicId}...`);

        // Get local mapping
        const localTextToId = localMapping[topicId];
        const normalizedMap = {};
        for (const [normalizedText, localId] of Object.entries(localTextToId)) {
            normalizedMap[normalizedText] = localId;
        }

        // Fetch questions
        const { data: questions, error } = await supabase
            .from('questions')
            .select('id, text')
            .eq('topic_id', topicId);

        if (error) {
            console.error(`  Error: ${error.message}`);
            continue;
        }

        let updated = 0;
        for (const q of questions) {
            const normalizedText = normalizeText(q.text);
            const localId = normalizedMap[normalizedText];

            if (localId) {
                const { error: updateError } = await supabase
                    .from('questions')
                    .update({ local_id: localId })
                    .eq('id', q.id);

                if (updateError) {
                    console.error(`  Failed to update ${q.id}: ${updateError.message}`);
                    totalFailed++;
                } else {
                    updated++;
                }
            } else {
                console.warn(`  No match for: ${q.text.substring(0, 40)}...`);
                totalFailed++;
            }
        }

        console.log(`  Updated ${updated}/${questions.length}`);
        totalUpdated += updated;
    }

    console.log(`\n✅ Done! Updated ${totalUpdated} questions, ${totalFailed} failed.`);
}

main().catch(console.error);
