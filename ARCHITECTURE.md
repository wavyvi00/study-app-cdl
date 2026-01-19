# CDL Zero Architecture

This document provides a detailed technical overview of the CDL Zero application architecture.

## System Overview

```mermaid
flowchart TB
    subgraph Clients["Client Applications"]
        iOS["📱 iOS App<br/>(Apple IAP)"]
        Android["📱 Android App<br/>(Google Play)"]
        Web["🌐 Web App<br/>(Stripe)"]
    end

    subgraph RevenueCat["RevenueCat"]
        RC["Unified Entitlements<br/>& Purchase Management"]
    end

    subgraph Supabase["Supabase Backend"]
        Auth["🔐 Auth<br/>(User Identity)"]
        DB["🗃️ PostgreSQL<br/>(profiles, questions)"]
        Edge["⚡ Edge Functions<br/>(revenuecat-webhook)"]
    end

    iOS --> RC
    Android --> RC
    Web --> RC
    
    iOS --> Auth
    Android --> Auth
    Web --> Auth
    
    RC -->|Webhook| Edge
    Edge -->|Update is_pro| DB
    Auth --> DB
    
    iOS --> DB
    Android --> DB
    Web --> DB
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant App
    participant Supabase as Supabase Auth
    participant RC as RevenueCat

    User->>App: Open App
    App->>App: Check AsyncStorage for session
    
    alt Has Session
        App->>Supabase: Validate session
        Supabase-->>App: User data
        App->>RC: logIn(userId)
        RC-->>App: CustomerInfo (entitlements)
    else No Session (Guest)
        App->>App: Generate anonymous ID
        App->>RC: Configure (anonymous)
    end
    
    User->>App: Sign Up / Sign In
    App->>Supabase: signUp() / signIn()
    Supabase-->>App: User + Session
    App->>RC: logIn(supabase_user_id)
    RC-->>App: CustomerInfo
```

## Purchase Flow

```mermaid
sequenceDiagram
    participant User
    participant App
    participant RC as RevenueCat
    participant Store as App Store / Play Store / Stripe
    participant Edge as Supabase Edge Function
    participant DB as Supabase DB

    User->>App: Tap "Unlock Pro ($14.99)"
    App->>RC: getOfferings()
    RC-->>App: Available packages

    App->>RC: purchasePackage(cdl_1499)
    RC->>Store: Process payment
    Store-->>RC: Transaction complete
    RC-->>App: CustomerInfo (isPro: true)

    Note over RC,Edge: Async webhook (seconds later)
    RC->>Edge: POST /revenuecat-webhook
    Edge->>DB: UPDATE profiles SET is_pro = true
    
    App->>App: Update UI, unlock content
```

## Data Flow

```mermaid
flowchart LR
    subgraph Local["Local Storage"]
        AS["AsyncStorage<br/>(stats, preferences)"]
    end

    subgraph Remote["Supabase"]
        Profiles["profiles<br/>(user data, is_pro)"]
        Questions["questions<br/>(RLS protected)"]
    end

    subgraph App["React Native App"]
        AuthCtx["AuthContext"]
        SubCtx["SubscriptionContext"]
        QCtx["QuestionsContext"]
    end

    AS <--> AuthCtx
    AS <--> SubCtx
    Profiles <--> AuthCtx
    Questions --> QCtx
    SubCtx --> QCtx
```

## Key Files Reference

| Category | File | Purpose |
|----------|------|---------|
| **Entry** | `app/_layout.tsx` | Root layout, context providers |
| **Auth** | `context/AuthContext.tsx` | Authentication state management |
| **Subscriptions** | `context/SubscriptionContext.tsx` | Purchase state, entitlements |
| **RevenueCat** | `lib/revenuecat.ts` | iOS/Android SDK wrapper |
| **RevenueCat Web** | `lib/revenuecat-web.ts` | Web + Stripe integration |
| **Supabase** | `lib/supabase.ts` | Database client |
| **Credentials** | `constants/SupabaseCredentials.ts` | Hardcoded public keys |
| **Paywall** | `app/paywall.tsx` | Purchase UI |
| **Questions** | `context/QuestionsContext.tsx` | Question fetching with gating |

## Content Gating Logic

```mermaid
flowchart TD
    Start["User starts quiz"]
    Check{"Is Pro?"}
    
    ProPath["✅ Access all questions"]
    FreePath{"Questions answered < 50?"}
    
    AllowFree["✅ Access free questions"]
    Block["🚫 Show Paywall"]
    
    Start --> Check
    Check -->|Yes| ProPath
    Check -->|No| FreePath
    FreePath -->|Yes| AllowFree
    FreePath -->|No| Block
```

## Security Model

1. **Row Level Security (RLS)**: Premium questions require `is_pro = true` in user profile
2. **Server-Side Validation**: Webhook verifies purchases before updating database
3. **Public Keys Only**: Client contains only anon/public keys (safe to expose)
4. **Question Counter**: Tracked server-side via secure RPC to prevent tampering

## Environment & Credentials

| Key | Location | Type |
|-----|----------|------|
| Supabase URL | `constants/SupabaseCredentials.ts` | Hardcoded |
| Supabase Anon Key | `constants/SupabaseCredentials.ts` | Hardcoded |
| RevenueCat API Key | `lib/revenuecat.ts` | Hardcoded |
| Webhook Secret | Supabase Dashboard | Server-side only |
