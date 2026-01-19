# CDL Zero: Permit Practice

A comprehensive, cross-platform mobile application designed to help aspiring truck drivers prepare for their Commercial Driver's License (CDL) exams. Built with React Native and Expo, it offers a robust study experience with practice questions, simulated exams, and detailed progress tracking.

## Features

- **Extensive Question Bank**: 600+ verified questions covering 8 major CDL topics:
  - General Knowledge
  - Air Brakes
  - Combination Vehicles
  - Hazardous Materials (Hazmat)
  - Passenger Transport
  - Tank Vehicles
  - Doubles/Triples
  - School Bus

- **Two Study Modes**:
  - **Practice Mode**: Learn at your own pace with immediate feedback and detailed explanations.
  - **Exam Mode**: Simulate real test conditions with randomized questions and timed sessions.

- **One-Time Purchase**: $14.99 unlocks all content forever. No subscriptions or recurring fees.

- **Free Tier**: Try before you buy with 50 free questions.

- **Cloud & Local Sync**: Supabase-powered data synchronization.
  - **Guest Mode**: Start immediately; progress saved locally.
  - **Account Sync**: Sign up to back up stats, achievements, and profile.
  - **Smart Merging**: Seamlessly merges guest progress when signing in.

- **Profile Wizard**: Personalize your experience with username, avatar, and CDL Class selection.

- **Progress Tracking**: Stats including average score, questions answered, study time, and streaks.

- **Dark Mode**: Light and dark themes for comfortable studying.

- **Multi-Language**: English, Spanish, and Russian.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Expo (React Native) |
| Language | TypeScript |
| Navigation | Expo Router |
| Authentication | Supabase Auth |
| Payments | RevenueCat (iOS/Android) + Stripe (Web) |
| Storage | AsyncStorage (local) + Supabase PostgreSQL (cloud) |

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed system diagrams.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   iOS App       │     │   Android App   │     │   Web App       │
│  (Apple IAP)    │     │  (Google Play)  │     │   (Stripe)      │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │      RevenueCat         │
                    │  (Unified Entitlements) │
                    └────────────┬────────────┘
                                 │ webhook
                    ┌────────────▼────────────┐
                    │   Supabase Edge Func    │
                    │  (revenuecat-webhook)   │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   Supabase Database     │
                    │  • profiles (is_pro)    │
                    │  • questions (RLS)      │
                    │  • Auth (users)         │
                    └─────────────────────────┘
```

**Key Principles:**
- **Identity**: Supabase Auth provides user UUID
- **Entitlements**: RevenueCat is source of truth for purchases
- **Sync**: RevenueCat webhooks update Supabase `is_pro` flag
- **Access Control**: RLS policies gate premium content

## Getting Started

### Prerequisites
- Node.js (LTS)
- npm or yarn

### Installation
```bash
git clone <repository-url>
cd study-app-cdl
npm install
```

### Running Locally
```bash
npx expo start
```
- **iOS Simulator**: Press `i` (requires Xcode)
- **Android Emulator**: Press `a` (requires Android Studio)
- **Web**: Press `w`

## Environment Variables

Create `.env` in root (optional - credentials are hardcoded for reliability):

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
EXPO_PUBLIC_REVENUECAT_API_KEY=appl_your_key
EXPO_PUBLIC_REVENUECAT_WEB_API_KEY=rcb_your_key
```

> **Note**: Supabase and RevenueCat public keys are hardcoded in `constants/SupabaseCredentials.ts` and `lib/revenuecat.ts` for production reliability.

## Building for Production

### iOS (Local Build)
```bash
eas build --platform ios --profile production --local --non-interactive
```

### Android
```bash
eas build --platform android --profile production
```

### Web
```bash
npm run build:web
```

## Project Structure

```
study-app-cdl/
├── app/                      # Screens (Expo Router)
│   ├── _layout.tsx           # Root layout with providers
│   ├── tabs/                 # Bottom tab screens
│   ├── auth/                 # Auth screens
│   ├── quiz.tsx              # Quiz gameplay
│   ├── paywall.tsx           # Purchase screen
│   └── onboarding.tsx        # First-time flow
├── components/               # Reusable UI components
├── context/                  # React Context providers
│   ├── AuthContext.tsx       # Authentication state
│   ├── SubscriptionContext.tsx   # Purchase/entitlement state
│   ├── QuestionsContext.tsx  # Question data
│   ├── ThemeContext.tsx      # Light/Dark mode
│   └── LocalizationContext.tsx   # i18n
├── lib/                      # External integrations
│   ├── supabase.ts           # Supabase client
│   ├── revenuecat.ts         # RevenueCat iOS/Android
│   └── revenuecat-web.ts     # RevenueCat Web + Stripe
├── data/                     # Questions, stats, translations
├── constants/                # App config, hardcoded credentials
└── utils/                    # Helper functions
```

## Monetization

### Pricing
- **Free Tier**: 50 questions, limited topics
- **Pro (One-Time)**: $14.99 unlocks everything forever

### Entitlement
Single entitlement: `CDL ZERO Pro`

### Platform Payments
| Platform | Payment Method |
|----------|----------------|
| iOS | Apple In-App Purchase |
| Android | Google Play Billing |
| Web | Stripe via RevenueCat |

## App Store Links

- **Privacy Policy**: https://sites.google.com/view/cdlzeropermittest2026/home
- **Terms of Use**: https://sites.google.com/view/cdlzerotos/home

## Localization

Supports `en` (English), `es` (Spanish), `ru` (Russian).

Translation scripts available in `/scripts/`.

## License

Proprietary - intended for educational purposes.
