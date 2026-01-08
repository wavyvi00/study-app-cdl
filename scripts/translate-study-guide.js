/**
 * Translate Study Guide Content
 * 
 * Reads data/study_content.ts, extracts the study guide data,
 * and generates Spanish/Russian versions.
 */

const fs = require('fs');
const path = require('path');

// Translation library
const translatte = require('translatte');

const DELAY_MS = 6000; // Rate limit increased to 6s per user suggestion
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const DATA_FILE = path.join(__dirname, '..', 'data', 'study_content.ts');

// Helper to translate text
async function translate(text, targetLang) {
    if (!text || text.trim() === '') return text;
    try {
        const result = await translatte(text, { to: targetLang });
        return result.text;
    } catch (error) {
        console.error(`Translation error for "${text.substring(0, 20)}...":`, error);
        if (error && (error.statusCode === 429 || error.code === 'ETIMEDOUT')) {
            console.log('Rate limited. Waiting 5s...');
            await sleep(5000);
            try {
                const retry = await translatte(text, { to: targetLang });
                return retry.text;
            } catch (e) {
                console.error('Retry failed:', e.message);
                return text;
            }
        }
        await sleep(1000);
        return text; // Fallback to original
    }
}

// Helper to translate an array of strings (content, keyPoints)
async function translateArray(arr, targetLang) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (typeof item === 'string') {
            process.stdout.write(`\r    Item ${i + 1}/${arr.length}`);
            const translated = await translate(item, targetLang);
            result.push(translated);
            await sleep(DELAY_MS);
        } else {
            result.push(item);
        }
    }
    console.log(''); // New line after progress
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
// Main function
async function main() {
    console.log(`Reading ${DATA_FILE}...`);
    let fileContent = fs.readFileSync(DATA_FILE, 'utf8');

    // Helper to extract object by name
    function extractGuide(name) {
        const regex = new RegExp(`export const ${name}\\s*=\s*({[\\s\\S]*?});\\s*export const|export const ${name}\\s*=\s*({[\\s\\S]*?});\\s*$`, 'm');
        const match = fileContent.match(regex);

        if (match) {
            const objectLiteral = match[1] || match[2];
            try {
                return eval('(' + objectLiteral + ')');
            } catch (e) {
                console.error(`Failed to eval ${name}:`, e);
            }
        }
        return null;
    }

    const guidesToTranslate = [
        // { name: 'GeneralKnowledgeStudyGuide', data: extractGuide('GeneralKnowledgeStudyGuide') },
        // { name: 'CombinationsStudyGuide', data: extractGuide('CombinationsStudyGuide') },
        { name: 'AirBrakesStudyGuide', data: extractGuide('AirBrakesStudyGuide') },
        // { name: 'HazmatStudyGuide', data: extractGuide('HazmatStudyGuide') },
        // { name: 'PassengerStudyGuide', data: extractGuide('PassengerStudyGuide') },
        // { name: 'DoublesTriplesStudyGuide', data: extractGuide('DoublesTriplesStudyGuide') },
        // { name: 'TankVehiclesStudyGuide', data: extractGuide('TankVehiclesStudyGuide') },
        // { name: 'SchoolBusStudyGuide', data: extractGuide('SchoolBusStudyGuide') }
    ];

    // Filter out missing guides
    const validGuides = guidesToTranslate.filter(g => g.data);

    if (validGuides.length === 0) {
        console.error("Failed to load any study guide data.");
        // Try the temp file method as fallback if eval failed but regex might have worked or not
        const tempJsContent = fileContent
            .replace(/import .*/g, '')
            .replace(/: StudyGuide/g, '')
            .replace(/: InteractionQuestion/g, '')
            .replace(/: StudySection/g, '')
            .replace(/export const STUDY_GUIDES[\s\S]*/, '')
            .replace(/export const/g, 'exports.');

        const tempFile = path.join(__dirname, 'temp_study_data.js');
        fs.writeFileSync(tempFile, tempJsContent);

        try {
            const tempModule = require(tempFile);
            // if (tempModule.GeneralKnowledgeStudyGuide) {
            //     validGuides.push({ name: 'GeneralKnowledgeStudyGuide', data: tempModule.GeneralKnowledgeStudyGuide });
            // }
            // if (tempModule.CombinationsStudyGuide) {
            //     validGuides.push({ name: 'CombinationsStudyGuide', data: tempModule.CombinationsStudyGuide });
            // }
            if (tempModule.AirBrakesStudyGuide) {
                validGuides.push({ name: 'AirBrakesStudyGuide', data: tempModule.AirBrakesStudyGuide });
            }
            // if (tempModule.HazmatStudyGuide) {
            //     validGuides.push({ name: 'HazmatStudyGuide', data: tempModule.HazmatStudyGuide });
            // }
            // if (tempModule.PassengerStudyGuide) {
            //     validGuides.push({ name: 'PassengerStudyGuide', data: tempModule.PassengerStudyGuide });
            // }
            // if (tempModule.DoublesTriplesStudyGuide) {
            //     validGuides.push({ name: 'DoublesTriplesStudyGuide', data: tempModule.DoublesTriplesStudyGuide });
            // }
            // if (tempModule.TankVehiclesStudyGuide) {
            //     validGuides.push({ name: 'TankVehiclesStudyGuide', data: tempModule.TankVehiclesStudyGuide });
            // }
            // if (tempModule.SchoolBusStudyGuide) {
            //     validGuides.push({ name: 'SchoolBusStudyGuide', data: tempModule.SchoolBusStudyGuide });
            // }
            fs.unlinkSync(tempFile);
        } catch (e) {
            console.error("Failed to require temp file:", e);
            process.exit(1);
        }
    }

    if (validGuides.length === 0) {
        console.error("No guides found to translate.");
        process.exit(1);
    }

    console.log(`Found ${validGuides.length} guides to translate.`);

    // Target languages
    const targets = ['es', 'ru'];

    for (const lang of targets) {
        console.log(`\n=== Translating to ${lang.toUpperCase()} ===`);

        // Read existing file content if it exists
        const outFile = path.join(__dirname, '..', 'data', `study_content_${lang}.ts`);
        let outputContent = '';

        if (fs.existsSync(outFile)) {
            outputContent = fs.readFileSync(outFile, 'utf8');
        } else {
            outputContent = `import { StudyGuide } from './study_types';\n\n`;
        }

        for (const guideObj of validGuides) {
            const { name, data } = guideObj;
            console.log(`Processing ${name}...`);

            const newGuide = {
                topicId: data.topicId,
                sections: []
            };

            for (const section of data.sections) {
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
                    cdlReference: section.cdlReference,
                    content: translatedContent,
                    keyPoints: translatedKeyPoints,
                    reviewQuestions: translatedQuestions
                });
            }

            // Append to output content if not already present (simple check)
            if (!outputContent.includes(`export const ${name}_${lang.toUpperCase()}`)) {
                outputContent += `export const ${name}_${lang.toUpperCase()}: StudyGuide = ${JSON.stringify(newGuide, null, 4)};\n\n`;
            } else {
                console.log(`Skipping ${name} as it already exists in output file.`);
            }
        }

        fs.writeFileSync(outFile, outputContent);
        console.log(`Saved to ${outFile}`);
    }

    console.log("\nDone!");
}

main().catch(console.error);
