const fs = require('fs');
const path = require('path');

// 1. Read English File to get the "Template" (IDs, structure)
const enPath = 'data/questions_combination.ts';
const enContent = fs.readFileSync(enPath, 'utf8');

// Simple regex to extract objects from English file
// We just want the IDs in order.
const enIds = [];
const idRegex = /id:\s*['"](comb_\d+)['"]/g;
let match;
while ((match = idRegex.exec(enContent)) !== null) {
    enIds.push(match[1]);
}

console.log(`English File has ${enIds.length} questions.`);

// 2. Read Corrupted Spanish File
const esPath = 'data/questions/es/questions_combination.ts';
const esContent = fs.readFileSync(esPath, 'utf8');

// 3. Extract all "potential" question data from Spanish file
// Since they are mashed into strings like "id: '...', text: '...', options: [...]",
// we can try to find them by looking for the ID pattern and capturing up to the next ID or end of object?
// Actually, the Spanish file seems to rely on the `mock.ts` Question interface.
// The corrupted lines have nested structures inside strings.
// e.g. `... options: [..., 'text... id: 'comb_3' ...]`
// We can use a regex that looks for `id: 'comb_X'` and then grabs the text and options following it.

// Helper to extract text between quotes
const extractString = (str, startIdx) => {
    // This is hard because of nested quotes.
    // Let's assume the corrupted file has `id: 'comb_X', text: 'THE TEXT', options: [...]`
    // We can regex for specific fields.
    return "";
};

const questionsMap = {};

// Strategy: Regex for every `id: 'comb_N'` and capture the surrounding text/options if possible.
// The corrupted file seems to have valid JS objects for some, and others hidden inside arrays strings.
// We will search the WHOLE string for patterns.

enIds.forEach(id => {
    // Regex to find this ID in the Spanish content
    // It might be `{ id: 'comb_1', ... }` OR `'comb_1',` inside an option?
    // Based on `view_file`, the corruption looks like:
    // `options: [..., 'comb_3', '¿Por qué ...?', ...]`
    // So for corrupted ones, the ID is just a string in an array.

    // Pattern 1: Valid object `{ id: 'comb_1', text: '...', options: [...], ... }`
    // Pattern 2: Hidden in array `..., 'comb_3', 'Title', 'Op1', 'Op2', ...`

    // Let's try to un-mash the file content.
    // We can try to split the content by `id: 'comb_`.

    // Use a very specific regex for each ID to find its *Translation*.
    // If we can't find it, we flag it.

    let text = "";
    let options = [];
    let explanation = "";
    let correctIndex = 0; // Default

    // Search for the ID in the file
    const idIndex = esContent.indexOf(id);
    if (idIndex === -1) {
        console.warn(`MISSING TRANSLATION FOR ${id}`);
        return;
    }

    // Attempt to extract text and explanation nearby.
    // This is fuzzy parsing.
    // 1. TEXT: usually follows `text:` or is following the ID in the array.
    // If it's a valid object: `text: '...'`
    // If it's corrupted: `'comb_3', 'Why should you ...?',`

    // Let's try to find the chunk of text starting at `idIndex`.
    const chunk = esContent.substring(idIndex, idIndex + 500); // 500 chars lookahead

    // Check if it looks like a valid object property `id: 'comb_X', text: '...'`
    const validMatch = /id:\s*['"]comb_\d+['"],\s*text:\s*[`'"]([^`'"]+)[`'"]/.exec(chunk);
    if (validMatch) {
        text = validMatch[1];
    } else {
        // Look for implicit format: `'comb_X', 'Question Text',`
        const arrayMatch = new RegExp(`['"]${id}['"],\\s*['"]([^'"]+)['"]`).exec(chunk);
        if (arrayMatch) {
            text = arrayMatch[1];
        }
    }

    // If we found text, we proceed. If not, we keep empty (will fill with English later?).
    if (text) {
        questionsMap[id] = { text };
    }

    // We also need options and explanation.
    // This is getting too complex for fuzzy regex on the whole file.
    // The previous tool output showed specific lines.
    // Line 5: `... 'comb_3', '¿Por qué ...?', ...`
    // It seems the "Corrupted" questions are just flattened into the previous question's options array!

});

// Since I have the file content in the chat history, I can see the pattern.
// Bad lines: 
// Line 5: ends with `correctIndex: 3, explanation: '...' },`
// But inside `options`, it has `..., 'comb_3', 'Question', 'Op1', ...`
// So `comb_3` is inside `comb_2`'s options.
// `comb_7` is inside `comb_6`'s options.
// `comb_8` is inside `comb_7`'s options (if nested) or `comb_6`?
// It seems `comb_6` options has `comb_7`... invalid structure.

// BETTER STRATEGY: 
// 1. Re-import `COMBINATION_QUESTIONS` from English.
// 2. Iterate through them.
// 3. For each, try to construct the Spanish version.
//    - If exists as valid object in Spanish file, use it.
//    - If not, check if it's "buried".
//    - If buried, extract it.
// 4. Write new file.

// To extract "buried" data:
// The pattern seems to be: `'ID', 'Question', 'Op1', 'Op2', 'Op3', 'Op4', 'Explanation',` ?
// Looking at Line 7: `... 'La válvula debe cerrarse (salir) automáticamente entre 20 y 45 psi.', 'comb_7', 'Al conectar las manos alegres, debe presionar los dos sellos junto con los acopladores ¿en qué ángulo entre sí?', '180 grados', ...`
// So it is: `ExplanationOfPrevious`, `ID`, `Text`, `Op1`, ...
// Wait, `comb_6` explanation is at the end of the line?
// No, the array in headers shows: `options: [ ... 'comb_7', 'Text', ... ]`
// This implies `comb_7` is inside `comb_6`'s options array??
// Yes.

// I will write a script that defines the Spanish questions MANUALLY based on the viewed content because parsing this garbage is risky.
// Actually, I can use `sed` or just rewrite the file.
// There are ~60 questions.
// I have the English text.
// I can just produce a cleaned file with English placeholders for the broken ones and let the user (or me) translate them properly later?
// Or I can try to recover the text.

// I will try to recover the text using a smarter regex that just looks for strings.
// `['"](comb_\d+)['"],\s*['"]([^'"]+)['"],\s*(?:['"]([^'"]+)['"],\s*){4}` 
// (ID, Text, 4 Options...)

// Let's generate the script to do this recovery.

const outputLines = [];
outputLines.push("import { Question } from '../../mock';");
outputLines.push("");
outputLines.push("export const COMBINATION_QUESTIONS: Question[] = [");

// Map of ID -> Extracted Data
const extracted = {};

// Regex to find ID and subsequent strings
// Matches: 'comb_X', 'Text', 'Op1', 'Op2', 'Op3', 'Op4', 'Explanation'?
// Or in valid object: { id: 'comb_X', text: 'Text', ... }

// Let's handle valid objects first (remove them from content to simplify?)
// No, just index by ID.

// We iterate English IDs.
for (const id of enIds) {
    let qData = { id, text: 'TODO', options: [], correctIndex: 0, explanation: 'TODO' };

    // 1. Try finding precise object definition
    // { id: 'comb_1', text: `...`, ... }
    // Note: The file uses backticks and single quotes.
    const validRegex = new RegExp(`{\\s*id:\\s*['"]${id}['"],\\s*text:\\s*[\`'"]([^\`'"]+)[\`'"],\\s*options:\\s*\\[([^\\]]+)\\],\\s*correctIndex:\\s*(\\d+),\\s*explanation:\\s*[\`'"]([^\`'"]+)[\`'"]`, 's');

    // We regex against the whole file? validRegex might account for newlines.
    const validMatch = validRegex.exec(esContent);

    if (validMatch) {
        qData.text = validMatch[1];
        // Options need splitting
        const optsStr = validMatch[2];
        // If option string contains "comb_", then this question is corrupted/contains others!
        // But we only want the FIRST 4 options if it's corrupted?
        // Or the valid options. 
        // Let's assume validMatch gives us the corrupted option string too.
        // We naively split by comma/quote.

        // Extract strings from options array
        const optRegex = /[`'"]([^`'"]+)[`'"]/g;
        let m;
        while ((m = optRegex.exec(optsStr)) !== null) {
            if (!m[1].startsWith('comb_')) {
                qData.options.push(m[1]);
            } else {
                // Found a nested ID! Stop capturing options.
                break;
            }
        }
        // Limit to 4 options?
        qData.options = qData.options.slice(0, 4);

        qData.correctIndex = parseInt(validMatch[3]);
        qData.explanation = validMatch[4];

        extracted[id] = qData;
        continue; // Done with this ID
    }

    // 2. Try finding "buried" definition
    // pattern: 'comb_X', 'Text', 'Op1', 'Op2', 'Op3', 'Op4', 'Explanation'?
    // Actually, looking at Line 7: `..., 'comb_7', 'Text', 'Op1', 'Op2', 'Op3', 'Op4', 'ExplanationPrevious', ...`
    // Wait, the explanation for `comb_6` seems to be after `comb_7` data? 
    // `options: [ ... 'comb_7', ...]` 
    // This is weird.

    // Let's just Regex for `['"]comb_X['"],\s*['"]([^'"]+)['"]` (ID, Text)
    // And assume next 4 strings are options?

    const buriedRegex = new RegExp(`['"]${id}['"],\\s*['"]([^'"]+)['"]`, 'g');
    const buriedMatch = buriedRegex.exec(esContent);

    if (buriedMatch) {
        qData.text = buriedMatch[1];

        // Find options following the text.
        // We need to scan forward from `buriedMatch.index`
        const afterText = esContent.substring(buriedMatch.index + buriedMatch[0].length);

        // Extract next 5 strings (4 options + maybe explanation?)
        // Caution: Explanation might be separated.

        const stringRegex = /\s*,\s*['"]([^'"]+)['"]/g;
        let count = 0;
        let sm;
        while ((sm = stringRegex.exec(afterText)) !== null && count < 6) {
            if (sm[1].startsWith('comb_')) break; // Hit next ID

            if (count < 4) {
                qData.options.push(sm[1]);
            } else if (count === 4) {
                // Might be explanation or start of next weirdness
                // In the sample: `..., 'Op4', 'ExplanationPrevious?'`
                // No, usually Explanation is separate property.
                // In corrupted array: `..., 'Op4', 'comb_7', ...`
                // So we only get options here.
            }
            count++;
        }

        // If we found text but no explanation, we might default explanation to "Ver texto en inglés" or try to find it.
        // Recover explanation from English if missing.
        extracted[id] = qData;
    }
}

// Generate Output
enIds.forEach(id => {
    const data = extracted[id];
    // Fallback to English content for missing pieces
    // We need to read English content fully to get placeholders? 
    // I don't have English content memory here easily.
    // I'll just write what I have or standard placeholder.

    if (data && data.text !== 'TODO') {
        outputLines.push(`    { id: '${id}', text: \`${data.text}\`, options: [${data.options.map(o => `\`${o}\``).join(', ')}], correctIndex: ${data.correctIndex}, explanation: \`${data.explanation || 'Ver explicación en inglés.'}\` },`);
    } else {
        // Missing translation
        outputLines.push(`    { id: '${id}', text: 'TODO: Translate ${id}', options: ['A', 'B', 'C', 'D'], correctIndex: 0, explanation: 'TODO' },`);
    }
});

outputLines.push("];");

fs.writeFileSync('data/questions/es/questions_combination_fixed.ts', outputLines.join('\n'));
console.log("Fixed file written to data/questions/es/questions_combination_fixed.ts");
