# Changelog

All notable changes to this project will be documented in this file.

## [2.0.2] - 2026-01-15

### Security Hardening (Server-First)
- **Supabase RLS**: Implemented strict Row Level Security on the `questions` table.
  - Pro users can access all questions.
  - Free users are restricted to standard/free questions only.
- **Secure RPC**: Created `increment_questions_answered` PostgreSQL function to enforce trial limits server-side, preventing client-side tampering.
- **Edge Functions**: Deployed `revenuecat-webhook` to securely sync `is_pro` status from RevenueCat to Supabase `profiles` table.

### Fixed
- **Password Reset Loop**: Fixed Native Deep Linking issue where clicking a reset link would open the app but fail to route to the "New Password" screen. Now uses `cdlzero://auth/reset-password`.
- **Expo Config**: Resolved "Expo Head" metadata error by adding `origin` to `expo-router` config.


### Added
- **Email Subscription Feature**:
  - Offline-first anonymous email collection.
  - Background synchronization to Supabase `email_subscribers` table.
  - Persistent UI state: prompt disappears permanently after subscription.
  - Duplicate prevention (local and remote).
- **Environment Configuration**:
  - Added `.env` support for secure credential management.
  - Migrated hardcoded Supabase keys to `EXPO_PUBLIC_` environment variables.
  
## [2.1.0] - 2026-01-11

### Added
- **Cloud Data Synchronization**:
    - **Cross-Device Sync**: User stats, profiles, and achievements now sync via Supabase.
    - **Guest Merging**: Anonymous progress is automatically promoted and merged upon sign-in.
    - **Smart Conflict Resolution**: Sync logic prioritizes higher progress (questions answered, streaks) when merging devices.
- **Profile Wizard**:
    - New onboarding flow for users to set **Username**, **Avatar**, and **CDL Class**.
    - Integrated into new user signup and initial onboarding.
- **Paywall Redesign**:
    - Switched to a cleaner **White/Light "Trust" Theme** to increase user confidence.
    - Updated typography (`#0F172A`), brand colors (`#0067b3`), and layout for better readability on all devices.
    - Added explicit security and cancellation trust signals.
- **User Scoped Data**: Refactored local storage to support multiple users on the same device without data leakage.

### Changed
- **Auth Flow**: Updated `SignIn` and `SignUp` to trigger cloud sync operations.
- **Sign Out**: Now safely clears session while caching user data locally for fast re-login.

### Security
- **Supabase Hardening**:
  - Documented RLS policies for `email_subscribers` (Anon INSERT-only).
  - Explicitly blocked Anon SELECT on subscriber data.
  - Redacted PII (email addresses) from system logs.

### Fixed
- **Study Mode**: Removed legacy comments and verified offline data integrity.
- **UI**: Improved email prompt visibility logic to respect user dismissal and subscription status.
