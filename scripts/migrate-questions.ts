// Script to migrate local questions to Supabase
// Run with: npx ts-node --esm scripts/migrate-questions.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tdemormabiwkhshgnahn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkZW1vcm1hYml3a2hzaGduYWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4OTMxNzgsImV4cCI6MjA4MTQ2OTE3OH0.vM3RMRSh2Rvp2by_BceQc2Nth7C9kpW_gEdGLIyyDH4';

const supabase = createClient(supabaseUrl, supabaseKey);

// Import all question parts
import { GK_QUESTIONS_PART1 } from '../data/questions_part1';
import { GK_QUESTIONS_PART2 } from '../data/questions_part2';
import { GK_QUESTIONS_PART3 } from '../data/questions_part3';
import { GK_QUESTIONS_PART4 } from '../data/questions_part4';
import { GK_QUESTIONS_PART5 } from '../data/questions_part5';
import { TOPICS } from '../data/mock';

async function migrateQuestions() {
    console.log('Starting migration...');

    // Combine all General Knowledge questions
    const allGKQuestions = [
        ...GK_QUESTIONS_PART1,
        ...GK_QUESTIONS_PART2,
        ...GK_QUESTIONS_PART3,
        ...GK_QUESTIONS_PART4,
        ...GK_QUESTIONS_PART5,
    ];

    // Format for Supabase
    const dbQuestions = allGKQuestions.map(q => ({
        topic_id: 'general_knowledge',
        text: q.text,
        options: q.options,
        correct_index: q.correctIndex,
        explanation: q.explanation || null,
    }));

    console.log(`Migrating ${dbQuestions.length} General Knowledge questions...`);

    // Insert in batches of 50
    for (let i = 0; i < dbQuestions.length; i += 50) {
        const batch = dbQuestions.slice(i, i + 50);
        const { data, error } = await supabase.from('questions').insert(batch);

        if (error) {
            console.error(`Error inserting batch ${i / 50 + 1}:`, error);
        } else {
            console.log(`Inserted batch ${i / 50 + 1} (${batch.length} questions)`);
        }
    }

    // Migrate other topic questions
    for (const topic of TOPICS) {
        if (topic.id === 'general_knowledge') continue; // Already done

        const topicQuestions = topic.questions.map(q => ({
            topic_id: topic.id,
            text: q.text,
            options: q.options,
            correct_index: q.correctIndex,
            explanation: q.explanation || null,
        }));

        if (topicQuestions.length > 0) {
            const { error } = await supabase.from('questions').insert(topicQuestions);
            if (error) {
                console.error(`Error inserting ${topic.id}:`, error);
            } else {
                console.log(`Inserted ${topicQuestions.length} questions for ${topic.id}`);
            }
        }
    }

    console.log('Migration complete!');
}

migrateQuestions();
