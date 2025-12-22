# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2025-12-21

### Added
- **Email Subscription Feature**:
  - Offline-first anonymous email collection.
  - Background synchronization to Supabase `email_subscribers` table.
  - Persistent UI state: prompt disappears permanently after subscription.
  - Duplicate prevention (local and remote).
- **Environment Configuration**:
  - Added `.env` support for secure credential management.
  - Migrated hardcoded Supabase keys to `EXPO_PUBLIC_` environment variables.

### Security
- **Supabase Hardening**:
  - Documented RLS policies for `email_subscribers` (Anon INSERT-only).
  - Explicitly blocked Anon SELECT on subscriber data.
  - Redacted PII (email addresses) from system logs.

### Fixed
- **Study Mode**: Removed legacy comments and verified offline data integrity.
- **UI**: Improved email prompt visibility logic to respect user dismissal and subscription status.
