const fs = require('fs');
const path = require('path');

// Read English
const enContent = fs.readFileSync('data/questions_combination.ts', 'utf8');

// Read Spanish (Fixed)
const esPath = 'data/questions/es/questions_combination.ts';
let esContent = fs.readFileSync(esPath, 'utf8');

// Extract IDs of TODO questions
const todoRegex = /id:\s*['"](comb_\d+)['"],\s*text:\s*['"]TODO/;

// We iterate and replace.
function getEnglishData(id) {
    // Regex for: { id: 'comb_X', text: '...', options: [...], ... }
    // Handles single quotes in text
    const re = new RegExp(`{\\s*id:\\s*['"]${id}['"],\\s*text:\\s*['"]([^']+)['"],\\s*options:\\s*\\[([^\\]]+)\\],\\s*correctIndex:\\s*(\\d+),\\s*explanation:\\s*['"]([^']+)['"]`, 's');
    const m = re.exec(enContent);
    if (!m) return null;
    return {
        text: m[1],
        options: m[2], // Raw string inside []
        correctIndex: m[3],
        explanation: m[4]
    };
}

let count = 0;
let match;

// Use loop to find ALL TODOs
// Since we modify esContent, regex state might reset or be tricky.
// Better to find all IDs first.
const todoIds = [];
while ((match = todoRegex.exec(esContent)) !== null) {
    todoIds.push(match[1]);
    // Move regex index forward manually or just replace one by one?
    // Regex logic with g flag is better.
    // Re-create regex with 'g'
}

const todoRegexGlobal = /id:\s*['"](comb_\d+)['"],\s*text:\s*['"]TODO/g;
while ((match = todoRegexGlobal.exec(esContent)) !== null) {
    // Check if not already added
    if (!todoIds.includes(match[1])) {
        todoIds.push(match[1]);
    }
}

console.log(`Found ${todoIds.length} missing questions.`);

todoIds.forEach(id => {
    const enData = getEnglishData(id);
    if (enData) {
        // Construct replacement string using backticks for safety
        const replacement = `{ id: '${id}', text: \`${enData.text}\`, options: [${enData.options}], correctIndex: ${enData.correctIndex}, explanation: \`${enData.explanation}\` }`;

        const lineRegex = new RegExp(`\\s*{ id: '${id}', text: 'TODO.*},`);
        esContent = esContent.replace(lineRegex, '\n    ' + replacement + ',');
        count++;
    } else {
        console.warn(`Could not find English data for ${id}`);
    }
});

fs.writeFileSync(esPath, esContent);
console.log(`Filled ${count} missing translations with English fallback.`);
