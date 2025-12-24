# Translation Agent

This directory contains the standalone translation agent for the CDL Study App.

## Usage

```bash
# Run the translation (this will take ~20-30 minutes)
node scripts/translate-all.js
```

## Features

- ✅ **Resilient** - Saves progress and can resume if interrupted
- ✅ **Smart** - Uses Google Translate API with retry logic
- ✅ **Fast** - Batched processing with rate limiting
- ✅ **Safe** - Fallback to English if translation fails
- ✅ **Detailed** - Progress tracking and error reporting

## Output

The script generates:
```
data/questions/es/         (Spanish translations)
data/questions/ru/         (Russian translations)
```

Each folder contains TypeScript files matching the English structure.

## Interruption

If the script is interrupted (Ctrl+C or error), it saves progress to `.translation-progress.json`. Simply run the script again to resume.

## After Translation

Once complete, update your app's data layer to load the appropriate language files based on user's locale selection.
