const fs = require('fs');
const path = require('path');

// Helper to parse the object string from TS files
function parseQuestions(fileContent, topicId) {
    const questions = [];

    // Find array content: export const NAME = [ ... ];
    const match = fileContent.match(/=\s*\[([\s\S]*?)\];/);
    if (!match) return [];

    const arrayContent = match[1];

    // Split by object boundaries: { ... },
    // We assume standard formatting where each object starts with { and ends with }, 
    // and they are separated by commas.
    // A robust way to split is to match all `{ ... }` blocks.
    // We use a non-greedy match for content inside braces.
    const objectRegex = /\{[\s\S]*?\}(?=\s*[,\]])/g;
    const items = arrayContent.match(objectRegex) || [];

    for (const item of items) {
        try {
            // Helper to extract string value: name: 'value' or name: "value"
            const getField = (name) => {
                // Matches key: 'value' or key: "value"
                // capturing group 1 is quote type, group 2 is content
                const r = new RegExp(name + '\\s*:\\s*(["\'])((?:\\\\.|[^\\\\])*?)\\1');
                const m = item.match(r);
                return m ? m[2].replace(/\\'/g, "'").replace(/\\"/g, '"') : null;
            };

            // Helper to extract number: name: 123
            const getNumber = (name) => {
                const r = new RegExp(name + '\\s*:\\s*(-?\\d+)');
                const m = item.match(r);
                return m ? parseInt(m[1], 10) : 0;
            };

            // Helper to extract array: options: ['a', 'b']
            const getArray = (name) => {
                // Matches key: [ ... ]
                const r = new RegExp(name + '\\s*:\\s*\\[([\\s\\S]*?)\\]');
                const m = item.match(r);
                if (!m) return [];

                const content = m[1];
                // Match strings inside the array
                const items = [];
                const itemRegex = /(["\'])((?:\\\\.|[^\\\\])*?)\1/g;
                let itemMatch;
                while ((itemMatch = itemRegex.exec(content)) !== null) {
                    items.push(itemMatch[2].replace(/\\'/g, "'").replace(/\\"/g, '"'));
                }
                return items;
            };

            const text = getField('text');
            const options = getArray('options');
            const correctIndex = getNumber('correctIndex');
            const explanation = getField('explanation');

            if (text && options.length) {
                // Escape for SQL: single quote -> ''
                const sqlText = text.replace(/'/g, "''");
                const sqlOptions = JSON.stringify(options).replace(/'/g, "''");
                const sqlExp = explanation ? explanation.replace(/'/g, "''") : null;

                questions.push({
                    topic_id: topicId,
                    text: sqlText,
                    options: sqlOptions,
                    correct_index: correctIndex,
                    explanation: sqlExp
                });
            }
        } catch (e) {
            console.error('Error parsing item:', item.substring(0, 50) + '...', e);
        }
    }

    return questions;
}

// Main execution
const outputLines = [
    '-- Seed data for questions',
    '-- Copy and paste this into Supabase SQL Editor to populate questions',
    '-- WARNING: This will delete existing questions and re-insert them.',
    '',
    'TRUNCATE TABLE questions;',
    '',
    'INSERT INTO questions (topic_id, text, options, correct_index, explanation) VALUES'
];

const allQuestions = [];

// 1. Process GK Parts 1-5
for (let i = 1; i <= 5; i++) {
    const filePath = path.join(__dirname, `../data/questions_part${i}.ts`);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const qs = parseQuestions(content, 'general_knowledge');
        allQuestions.push(...qs);
        console.log(`Parsed ${qs.length} questions from part ${i}`);
    }
}

// 1.5 Process Combination Questions
const comboPath = path.join(__dirname, '../data/questions_combination.ts');
if (fs.existsSync(comboPath)) {
    const content = fs.readFileSync(comboPath, 'utf8');
    const qs = parseQuestions(content, 'combinations');
    allQuestions.push(...qs);
    console.log(`Parsed ${qs.length} questions from combinations`);
}

// 1.6 Process Air Brakes Questions
const abPath = path.join(__dirname, '../data/questions_air_brakes.ts');
if (fs.existsSync(abPath)) {
    const content = fs.readFileSync(abPath, 'utf8');
    const qs = parseQuestions(content, 'air_brakes');
    allQuestions.push(...qs);
    console.log(`Parsed ${qs.length} questions from air_brakes`);
}

// 1.7 Process Hazmat Questions
const hmPath = path.join(__dirname, '../data/questions_hazmat.ts');
if (fs.existsSync(hmPath)) {
    const content = fs.readFileSync(hmPath, 'utf8');
    const qs = parseQuestions(content, 'hazmat');
    allQuestions.push(...qs);
    console.log(`Parsed ${qs.length} questions from hazmat`);
}

// 1.8 Process Passenger Questions
const passPath = path.join(__dirname, '../data/questions_passenger.ts');
if (fs.existsSync(passPath)) {
    const content = fs.readFileSync(passPath, 'utf8');
    const qs = parseQuestions(content, 'passenger');
    allQuestions.push(...qs);
    console.log(`Parsed ${qs.length} questions from passenger`);
}

// 1.9 Process Doubles/Triples Questions
const dtPath = path.join(__dirname, '../data/questions_doubles_triples.ts');
if (fs.existsSync(dtPath)) {
    const content = fs.readFileSync(dtPath, 'utf8');
    const qs = parseQuestions(content, 'doubles_triples');
    allQuestions.push(...qs);
    console.log(`Parsed ${qs.length} questions from doubles_triples`);
}

// 1.10 Process Tanks Questions
const tankPath = path.join(__dirname, '../data/questions_tanks.ts');
if (fs.existsSync(tankPath)) {
    const content = fs.readFileSync(tankPath, 'utf8');
    const qs = parseQuestions(content, 'tanks');
    allQuestions.push(...qs);
    console.log(`Parsed ${qs.length} questions from tanks`);
}

// 1.11 Process School Bus Questions
const sbPath = path.join(__dirname, '../data/questions_school_bus.ts');
if (fs.existsSync(sbPath)) {
    const content = fs.readFileSync(sbPath, 'utf8');
    const qs = parseQuestions(content, 'school_bus');
    allQuestions.push(...qs);
    console.log(`Parsed ${qs.length} questions from school_bus`);
}

// 2. Process other topics from mock.ts
const mockPath = path.join(__dirname, '../data/mock.ts');
if (fs.existsSync(mockPath)) {
    const content = fs.readFileSync(mockPath, 'utf8');

    // Extract TOPICS array
    // Match the array content inside TOPICS = [ ... ];
    const topicMatch = content.match(/export const TOPICS: Topic\[\] = \[([\s\S]*?)\];/);
    if (topicMatch) {
        // Split by topic objects manually to be safer
        // Each topic starts with { and id: ...
        const topicBlocks = topicMatch[1].split(/{\s*id:/).slice(1);

        for (const block of topicBlocks) {
            // Add back the id part to make it parseable by regex if needed, 
            // but we just need to extract fields from this block text
            const fullBlock = 'id:' + block;

            // Extract topic ID
            const idMatch = fullBlock.match(/id:\s*(['"])([^'"]+)\1/);
            if (!idMatch) continue;

            const topicId = idMatch[2];
            if (topicId === 'general_knowledge') continue; // Skip GK

            // Extract questions array content
            const qMatch = fullBlock.match(/questions:\s*\[([\s\S]*?)\]/);
            if (qMatch) {
                // Wrap in array brackets to reuse parseQuestions logic
                const qs = parseQuestions(`= [${qMatch[1]}];`, topicId);
                allQuestions.push(...qs);
                console.log(`Parsed ${qs.length} questions from topic ${topicId}`);
            }
        }
    }
}

// Generate SQL
// Filter out any potential duplicates or empty items
const validQuestions = allQuestions.filter(q => q.text && q.topic_id);

const values = validQuestions.map(q =>
    `('${q.topic_id}', '${q.text}', '${q.options}'::jsonb, ${q.correct_index}, ${q.explanation ? `'${q.explanation}'` : 'NULL'})`
).join(',\n');

outputLines.push(values + ';');

const outputPath = path.join(__dirname, '../supabase/seed_questions.sql');
fs.writeFileSync(outputPath, outputLines.join('\n'));
console.log(`Generated SQL file at ${outputPath} with ${validQuestions.length} questions.`);
