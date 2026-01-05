
const translatte = require('translatte');

async function test() {
    console.log('Testing translatte with specific text...');
    const text = "Parts of an Air Brake System";
    try {
        const res = await translatte(text, { to: 'es' });
        console.log('Result:', res.text);
    } catch (e) {
        console.error('Error:', e);
    }
}

test();
