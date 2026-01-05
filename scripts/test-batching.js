#!/usr/bin/env node
/**
 * Test if translatte preserves delimiter for batching optimization
 */

const translatte = require('translatte');

async function test() {
    console.log('Testing delimiter preservation for batching...\n');

    const delimiter = '|||';
    const testStrings = [
        'Hello world',
        'This is a test',
        'Goodbye'
    ];

    const combined = testStrings.join(delimiter);
    console.log('Input:', combined);

    try {
        const result = await translatte(combined, { to: 'es' });
        console.log('Output:', result.text);

        const parts = result.text.split(delimiter);
        console.log('\nSplit results:');
        parts.forEach((p, i) => console.log(`  [${i}]: "${p.trim()}"`));

        if (parts.length === testStrings.length) {
            console.log('\n✅ SAFE: Delimiter preserved, batching is viable');
        } else {
            console.log('\n❌ UNSAFE: Delimiter not preserved, batching NOT recommended');
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

test();
