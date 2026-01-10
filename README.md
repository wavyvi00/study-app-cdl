# CDL Zero: Permit Practice

A comprehensive, cross-platform mobile application designed to help aspiring truck drivers prepare for their Commercial Driver's License (CDL) exams. Built with React Native and Expo, it offers a robust study experience with practice questions, simulated exams, and detailed progress tracking.

## Features

- **Extensive Question Bank**: Over 600 verified questions covering 8 major CDL topics:
  - General Knowledge
  - Air Brakes
  - Combination Vehicles
  - Hazardous Materials (Hazmat)
  - Passenger Transport
  - Tank Vehicles
  - Doubles/Triples
  - School Bus

- **Two Study Modes**:
  - **Practice Mode**: Learn at your own pace with immediate feedback and detailed explanations for every question.
  - **Exam Mode**: Simulate real test conditions with randomized questions and no hints until the end.

- **Cross-Platform Sync**: Create an account to sync your progress and subscription across iOS, Android, and Web.

- **Offline-First**: Fully functional without an internet connection. All questions and user progress are stored locally on your device.

- **Progress Tracking**: Automatically tracks your stats, including average score, total questions answered, study time, exam attempts, and daily streaks.

- **Dark Mode**: Seamlessly switch between light and dark themes for comfortable studying day or night.

- **Multi-Language Support**: Available in English, Spanish, and Russian.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Expo (React Native) |
| Language | TypeScript |
| Navigation | Expo Router |
| Authentication | Supabase Auth |
| Subscriptions | RevenueCat |
| Payments | Apple IAP, Google Play, Stripe |
| Storage | AsyncStorage |
| Database | Supabase PostgreSQL |

## Architecture

```
                    ┌─────────────────────────────────────┐
                    │         Supabase Auth               │
                    │   (User Identity - UUID)            │
                    └──────────────┬──────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────┐
                    │         RevenueCat                  │
                    │   (Entitlements - "CDL ZERO Pro")   │
                    ├─────────┬───────────┬───────────────┤
                    │  Apple  │  Google   │    Stripe     │
                    │   IAP   │   Play    │    (Web)      │
                    └────┬────┴─────┬─────┴───────┬───────┘
                         │          │             │
                    ┌────▼────┐ ┌───▼────┐ ┌──────▼─────┐
                    │   iOS   │ │Android │ │    Web     │
                    │   App   │ │  App   │ │    App     │
                    └─────────┘ └────────┘ └────────────┘
```

**Key Design Principles:**
- User identity flows from Supabase (single UUID across platforms)
- RevenueCat manages all subscriptions using Supabase UUID as appUserID
- Entitlements sync automatically when user logs in on any platform
- Entitlement is the single source of truth for premium access

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd study-app-cdl
npm install
```

### Running the App

```bash
npx expo start
```

- **iOS Simulator**: Press `i` (requires Xcode on macOS)
- **Android Emulator**: Press `a` (requires Android Studio)
- **Web**: Press `w`
- **Physical Device**: Download "Expo Go" app and scan the QR code

## Environment Setup

Create a `.env` file in the root directory. All environment variables are required for full functionality:

```env
# Supabase (Required)
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# RevenueCat (Required for subscriptions)
EXPO_PUBLIC_REVENUECAT_API_KEY=appl_your_revenuecat_key
EXPO_PUBLIC_REVENUECAT_WEB_API_KEY=rcb_your_web_key
```

> **Note**: The app will run without these variables but authentication and subscription features will be disabled.

## Building for Production

This project uses **EAS Build**.

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for platforms
eas build --platform android
eas build --platform ios
npm run build:web
```

## Project Structure

```
study-app-cdl/
├── app/                    # Screens & Navigation (Expo Router)
│   ├── _layout.tsx         # Root layout with providers
│   ├── tabs/               # Bottom tab screens
│   ├── auth/               # Auth screens (all platforms)
│   ├── quiz.tsx            # Quiz gameplay
│   ├── paywall.tsx         # Subscription paywall
│   └── onboarding.tsx      # First-time flow
├── components/             # Reusable UI components
├── context/                # React Context providers
│   ├── AuthContext.tsx     # Cross-platform auth
│   ├── SubscriptionContext.tsx  # RevenueCat state
│   ├── ThemeContext.tsx    # Light/Dark mode
│   └── LocalizationContext.tsx  # i18n
├── lib/                    # External service integrations
│   ├── supabase.ts         # Supabase client
│   ├── revenuecat.ts       # RevenueCat iOS/Android
│   └── revenuecat-web.ts   # RevenueCat Web + Stripe
└── data/                   # Questions & translations
```

## Subscription System

### How It Works

1. **Authentication Required**: Users must create an account before purchasing
2. **Unified Identity**: Supabase user UUID is used as RevenueCat appUserID
3. **Platform-Specific Payments**:
   - iOS: Apple In-App Purchase
   - Android: Google Play Billing
   - Web: Stripe via RevenueCat
4. **Entitlement Sync**: Login on any platform fetches entitlements from RevenueCat
5. **Restore Purchases**: Syncs with app stores to recover owned purchases

### Entitlement

The app uses a single entitlement: `CDL ZERO Pro`

Access is granted when `customerInfo.entitlements.active["CDL ZERO Pro"]` exists.

## App Store Submission

### Required Links

For iOS App Store submission, include these links in your App Store description:

- **Privacy Policy**: https://sites.google.com/view/cdlzeropermittest2026/home
- **Terms of Use**: https://sites.google.com/view/cdlzerotos/home

These links are also displayed in the in-app paywall.

### Subscription Requirements

The paywall includes all Apple-required subscription information:
- Subscription title and duration
- Price (fetched from RevenueCat/App Store)
- Auto-renewal terms
- Links to Privacy Policy and Terms of Use

## Localization

Supports 3 languages with custom translation scripts:

```bash
# Translate using OpenAI
OPENAI_API_KEY=your_key node scripts/translate-openai.js --lang=es --source=questions_hazmat.ts

# Translate using local LLM (Ollama)
node scripts/translate-local.js --lang=ru --source=questions_hazmat.ts
```

Supported: `en` (English), `es` (Spanish), `ru` (Russian)

## License

This project is proprietary and intended for educational purposes.
