try {
    const { TranslateClient } = require('@aws-sdk/client-translate');
    // Check if we can instantiate it (it might check env vars automatically)
    const client = new TranslateClient({ region: process.env.AWS_REGION || 'us-east-1' });

    // We can't easily check if creds are valid without making a call, but we can check env vars
    const hasKey = !!process.env.AWS_ACCESS_KEY_ID;
    const hasSecret = !!process.env.AWS_SECRET_ACCESS_KEY;

    console.log(`AWS Client Library Available: Yes`);
    console.log(`AWS_ACCESS_KEY_ID Present: ${hasKey}`);
    console.log(`AWS_SECRET_ACCESS_KEY Present: ${hasSecret}`);

} catch (e) {
    console.log(`AWS Client Library Available: No (${e.message})`);
}
