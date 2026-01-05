const translate = require('@vitalets/google-translate-api');
console.log('Type of translate:', typeof translate);
console.log('Exports:', Object.keys(translate));
if (typeof translate === 'object') {
    console.log('translate.translate:', typeof translate.translate);
    console.log('translate.default:', typeof translate.default);
}
