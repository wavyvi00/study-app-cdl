/**
 * Translate Study Guide Content
 * 
 * Reads data/study_content.ts, extracts the study guide data,
 * and generates Spanish/Russian versions.
 */

const fs = require('fs');
const path = require('path');

// Translation library
let translatte;
try {
    translatte = require('translatte');
} catch (e) {
    console.error('Please install translatte: npm install translatte');
    process.exit(1);
}

const DELAY_MS = 300; // Rate limit
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const DATA_FILE = path.join(__dirname, '..', 'data', 'study_content.ts');

// Helper to translate text
async function translate(text, targetLang) {
    if (!text || text.trim() === '') return text;
    try {
        const result = await translatte(text, { to: targetLang });
        return result.text;
    } catch (error) {
        console.error(`Translation error for "${text.substring(0, 20)}...": ${error.message}`);
        await sleep(1000); // Wait longer on error
        return text;
    }
}

// Helper to translate an array of strings (content, keyPoints)
async function translateArray(arr, targetLang) {
    const result = [];
    for (const item of arr) {
        if (typeof item === 'string') {
            const translated = await translate(item, targetLang);
            result.push(translated);
            await sleep(DELAY_MS);
        } else {
            result.push(item);
        }
    }
    return result;
}

// Helper to translate review questions
async function translateQuestions(questions, targetLang) {
    const result = [];
    for (const q of questions) {
        console.log(`    Translating question ${q.id}...`);

        const translatedText = await translate(q.text, targetLang);
        await sleep(DELAY_MS);

        // Translate options individually to avoid splitting issues
        const translatedOptions = [];
        for (const opt of q.options) {
            const trOpt = await translate(opt, targetLang);
            translatedOptions.push(trOpt);
            await sleep(DELAY_MS);
        }

        const translatedExplanation = await translate(q.explanation, targetLang);
        await sleep(DELAY_MS);

        result.push({
            ...q,
            text: translatedText,
            options: translatedOptions,
            explanation: translatedExplanation
        });
    }
    return result;
}

// Main function
async function main() {
    console.log(`Reading ${DATA_FILE}...`);
    let fileContent = fs.readFileSync(DATA_FILE, 'utf8');

    // Extract the object data by stripping TS syntax
    // fail-safe: hardcode the object extraction if regex is tricky, but let's try regex
    // We want the content inside: export const GeneralKnowledgeStudyGuide: StudyGuide = { ... };

    // 1. Remove imports
    fileContent = fileContent.replace(/import .*/g, '');

    // 2. Remove type annotation
    fileContent = fileContent.replace(/: StudyGuide/g, '');

    // 3. Extract the object definition
    const match = fileContent.match(/export const GeneralKnowledgeStudyGuide\s*=\s*({[\s\S]*?});\s*export const/);

    let studyGuideData;

    if (match && match[1]) {
        try {
            // Use eval to parse the object literal
            // We need to make sure it's valid JS. 
            // The file content likely has unquoted keys if it's standard JS/TS style, which JSON.parse won't like.
            // eval is dangerous but fine for a build script running on local trusted code.
            studyGuideData = eval('(' + match[1] + ')');
        } catch (e) {
            console.error("Failed to eval extracted object:", e);
            process.exit(1);
        }
    } else {
        // Fallback: try to find it ending with }; at the end of file or before next export
        // The regex above expects "export const" after it.
        // Let's try a simpler approach since we know the file structure.
        // We'll require the user to verify the script manually if it fails parsing.
        console.error("Could not extract GeneralKnowledgeStudyGuide object using regex. Please ensure data/study_content.ts matches expected format.");

        // Since we can't easily parse it without the TS environment, and regex for nested objects is hard...
        // Let's do a "poor man's" parsing OR just translate the file content line-by-line if we can identify strings?
        // No, that's brittle.

        // ALTERNATIVE: Use a temporary JS file.
        // We can write a temporary .js file that exports the object, strip the type annotations, and require it.
        const tempJsContent = fileContent
            .replace(/import .*/g, '')
            .replace(/: StudyGuide/g, '')
            .replace(/: InteractionQuestion/g, '') // if present
            .replace(/: StudySection/g, '') // if present
            .replace(/export const STUDY_GUIDES[\s\S]*/, '') // remove the end map
            .replace(/export const/g, 'exports.'); // export for node

        const tempFile = path.join(__dirname, 'temp_study_data.js');
        fs.writeFileSync(tempFile, tempJsContent);

        try {
            studyGuideData = require(tempFile).GeneralKnowledgeStudyGuide;
            fs.unlinkSync(tempFile); // clean up
        } catch (e) {
            console.error("Failed to require temp file:", e);
            process.exit(1);
        }
    }

    if (!studyGuideData) {
        console.error("Failed to load study guide data.");
        process.exit(1);
    }

    console.log(`Loaded study guide: ${studyGuideData.topicId}, ${studyGuideData.sections.length} sections.`);

    // Target languages
    const targets = ['es', 'ru'];

    for (const lang of targets) {
        console.log(`\n=== Translating to ${lang.toUpperCase()} ===`);

        const newGuide = {
            topicId: studyGuideData.topicId,
            sections: []
        };

        for (const section of studyGuideData.sections) {
            console.log(`  Section: ${section.title}`);

            const translatedTitle = await translate(section.title, lang);
            await sleep(DELAY_MS);

            const translatedContent = await translateArray(section.content, lang);
            const translatedKeyPoints = await translateArray(section.keyPoints || [], lang);

            let translatedQuestions = [];
            if (section.reviewQuestions) {
                translatedQuestions = await translateQuestions(section.reviewQuestions, lang);
            }

            newGuide.sections.push({
                id: section.id,
                title: translatedTitle,
                content: translatedContent,
                keyPoints: translatedKeyPoints,
                reviewQuestions: translatedQuestions
            });
        }

        // Generate output file content
        const outputContent = `import { StudyGuide } from './study_types';

export const GeneralKnowledgeStudyGuide_${lang.toUpperCase()}: StudyGuide = ${JSON.stringify(newGuide, null, 4)};
`;

        const outFile = path.join(__dirname, '..', 'data', `study_content_${lang}.ts`);
        fs.writeFileSync(outFile, outputContent);
        console.log(`Saved to ${outFile}`);
    }

    console.log("\nDone!");
}

main().catch(console.error);
