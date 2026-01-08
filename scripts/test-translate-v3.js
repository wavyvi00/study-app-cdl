
const translatte = require('translatte');

async function test() {
    console.log('Testing translatte...');
    try {
        const res = await translatte('Hello world', { to: 'es' });
        console.log('Result:', res.text);
    } catch (e) {
        console.error('Error:', e);
    }
}

test();
