const { translate } = require('@vitalets/google-translate-api');

async function test() {
    try {
        const res = await translate('Hello world', { to: 'es' });
        console.log(res.text); // Hola mundo
    } catch (e) {
        console.error(e);
    }
}

test();
