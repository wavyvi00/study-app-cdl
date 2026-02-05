const fs = require('fs');
const path = require('path');

// Helper to extract IDs from a file content
function extractIds(content) {
    const ids = [];
    // Match IDs that look like: gk1, gk123, comb_1, dt_1, air_1, haz_1, pass_1, tank_1, bus_1
    const regex = /id:\s*['"]([a-z_]+\d+)['"]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        ids.push(match[1]);
    }
    return ids;
}

const baseDir = 'data';
const languages = ['es', 'ru'];

// List of files to check (based on imports in mock.ts)
const files = [
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

let hasErrors = false;

console.log('Starting Verification...\n');

files.forEach(file => {
    const enPath = path.join(baseDir, file);

    if (!fs.existsSync(enPath)) {
        console.error(`MISSING ENGLISH FILE: ${enPath}`);
        return;
    }

    const enContent = fs.readFileSync(enPath, 'utf8');
    const enIds = extractIds(enContent);
    console.log(`Checking ${file} (${enIds.length} questions)...`);

    languages.forEach(lang => {
        const langPath = path.join(baseDir, 'questions', lang, file);
        if (!fs.existsSync(langPath)) {
            console.error(`  [${lang.toUpperCase()}] MISSING FILE: ${langPath}`);
            hasErrors = true;
            return;
        }

        const langContent = fs.readFileSync(langPath, 'utf8');
        const langIds = extractIds(langContent);

        if (enIds.length !== langIds.length) {
            console.error(`  [${lang.toUpperCase()}] LENGTH MISMATCH! English: ${enIds.length}, ${lang}: ${langIds.length}`);
            hasErrors = true;
        }

        // Check ID alignment
        let mismatchCount = 0;
        for (let i = 0; i < Math.max(enIds.length, langIds.length); i++) {
            if (enIds[i] !== langIds[i]) {
                if (mismatchCount < 5) { // Only show first 5 mismatches
                    console.error(`  [${lang.toUpperCase()}] ID MISMATCH at index ${i}: English '${enIds[i]}' vs ${lang} '${langIds[i]}'`);
                }
                mismatchCount++;
                hasErrors = true;
            }
        }
        if (mismatchCount > 5) {
            console.error(`  [${lang.toUpperCase()}] ... and ${mismatchCount - 5} more mismatches.`);
        }

        if (mismatchCount === 0 && enIds.length === langIds.length) {
            // console.log(`  [${lang.toUpperCase()}] OK`);
        }
    });
});

if (hasErrors) {
    console.log('\n❌ Verification FAILED.');
    process.exit(1);
} else {
    console.log('\n✅ All files verified successfully!');
}
