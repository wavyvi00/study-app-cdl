/**
 * RevenueCat Web SDK Integration
 * Uses @revenuecat/purchases-js for web purchases via Stripe
 * 
 * IMPORTANT: This module should ONLY be used on web platform.
 * On iOS/Android, purchases flow through react-native-purchases (Apple IAP / Google Play).
 * The Platform checks in revenuecat.ts ensure this, but we add a guard here as defense-in-depth.
 */
import { Platform } from 'react-native';
import { Purchases, type CustomerInfo, type Package, type Offerings } from '@revenuecat/purchases-js';

// Defensive guard: Prevent accidental use on native platforms
const IS_WEB = Platform.OS === 'web';
if (!IS_WEB && __DEV__) {
    console.warn('[RevenueCat Web] WARNING: This module should only be used on web platform. Native platforms should use react-native-purchases directly.');
}

const ENTITLEMENT_ID = 'CDL ZERO Pro';


let purchasesInstance: Purchases | null = null;
let currentAppUserId: string | null = null;
let isConfigured = false;

export interface WebSubscriptionStatus {
    isPro: boolean;
    activeEntitlements: string[];
    expirationDate: string | null;
}

/**
 * Initialize RevenueCat for web (anonymous user initially)
 * Call logInWeb() after to bind to authenticated user
 */
export const initRevenueCatWeb = async (): Promise<void> => {
    // DEFENSIVE GUARD: Bail out immediately if not on web platform
    // This prevents any web SDK initialization on iOS/Android
    if (!IS_WEB) {
        if (__DEV__) console.warn('[RevenueCat Web] Blocked initialization on non-web platform');
        return;
    }

    if (isConfigured) {
        if (__DEV__) console.log('[RevenueCat Web] Already configured, skipping');
        return;
    }


    const apiKey = process.env.EXPO_PUBLIC_REVENUECAT_WEB_API_KEY;

    if (!apiKey) {
        console.error('[RevenueCat Web] API key not found. Set EXPO_PUBLIC_REVENUECAT_WEB_API_KEY in your .env file.');
        return;
    }

    // Validate API key format - RevenueCat Web Billing SDK keys typically start with:
    // - 'rcb_' (RevenueCat Billing)
    // - 'pk_' (Public Key) 
    // NOT 'strp_' (that's the Stripe key used internally by RevenueCat)
    const validPrefixes = ['rcb_', 'pk_'];
    const hasValidPrefix = validPrefixes.some(prefix => apiKey.startsWith(prefix));

    if (!hasValidPrefix) {
        console.error('[RevenueCat Web] Invalid API key format!');
        console.error('[RevenueCat Web] Expected: rcb_xxxxx or pk_xxxxx (Web Billing SDK API Key)');
        console.error('[RevenueCat Web] Got:', apiKey.slice(0, 8) + '...');
        console.error('[RevenueCat Web] NOTE: Do NOT use strp_ keys - those are Stripe keys used internally by RevenueCat');
        console.error('[RevenueCat Web] Get your Web Billing SDK API Key from: RevenueCat Dashboard → Project → Apps → Web → API Keys');
    }

    try {
        // Initialize with a temporary anonymous ID
        // Will be replaced when logInWeb() is called with authenticated user
        const tempUserId = getOrCreateAnonymousUserId();
        currentAppUserId = tempUserId;

        if (__DEV__) {
            console.log('[RevenueCat Web] Configuring SDK with:', {
                apiKeyPrefix: apiKey.slice(0, 8) + '...',
                userId: tempUserId.slice(0, 16) + '...',
            });
        }

        purchasesInstance = Purchases.configure(apiKey, tempUserId);
        isConfigured = true;
        if (__DEV__) console.log('[RevenueCat Web] SDK configured successfully');
    } catch (error: any) {
        console.error('[RevenueCat Web] Failed to configure:', error);
        // Log additional details for 401 errors
        if (error.message?.includes('401') || error.status === 401) {
            console.error('[RevenueCat Web] 401 Unauthorized - Check that your API key is correct and Web Billing is enabled in RevenueCat dashboard');
        }
    }
};

/**
 * Log in a user to RevenueCat Web with their Supabase user ID.
 * This binds all purchases to the authenticated user.
 * @param userId - The Supabase user UUID
 */
export const logInWeb = async (userId: string): Promise<WebSubscriptionStatus> => {
    const apiKey = process.env.EXPO_PUBLIC_REVENUECAT_WEB_API_KEY;

    if (!apiKey) {
        console.error('[RevenueCat Web] API key not found');
        return { isPro: false, activeEntitlements: [], expirationDate: null };
    }

    // If same user, just return current status
    if (userId === currentAppUserId && purchasesInstance) {
        if (__DEV__) console.log('[RevenueCat Web] Already logged in as this user');
        return getWebSubscriptionStatus();
    }

    try {
        if (__DEV__) console.log('[RevenueCat Web] Logging in user:', userId.slice(0, 8) + '...');

        // RevenueCat Web SDK doesn't have a logIn method like mobile
        // We need to reconfigure with the new user ID
        currentAppUserId = userId;
        purchasesInstance = Purchases.configure(apiKey, userId);
        isConfigured = true;

        // Get customer info after login
        const customerInfo = await purchasesInstance.getCustomerInfo();
        const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];

        if (__DEV__) {
            console.log('[RevenueCat Web] Login successful, isPro:', !!entitlement);
        }

        return {
            isPro: !!entitlement,
            activeEntitlements: Object.keys(customerInfo.entitlements.active),
            expirationDate: (entitlement as any)?.expiresDate?.toISOString() || null,
        };
    } catch (error) {
        console.error('[RevenueCat Web] Login error:', error);
        return { isPro: false, activeEntitlements: [], expirationDate: null };
    }
};

/**
 * Log out the current user from RevenueCat Web.
 * Resets to an anonymous user state.
 */
export const logOutWeb = async (): Promise<void> => {
    const apiKey = process.env.EXPO_PUBLIC_REVENUECAT_WEB_API_KEY;

    if (!apiKey) {
        console.error('[RevenueCat Web] API key not found');
        return;
    }

    try {
        if (__DEV__) console.log('[RevenueCat Web] Logging out user');

        // Reset to a new anonymous ID
        const anonId = getOrCreateAnonymousUserId();
        currentAppUserId = anonId;
        purchasesInstance = Purchases.configure(apiKey, anonId);

        if (__DEV__) console.log('[RevenueCat Web] Logout successful, now anonymous');
    } catch (error) {
        console.error('[RevenueCat Web] Logout error:', error);
    }
};

/**
 * Get or create a stable anonymous user ID for web
 * This persists across sessions using localStorage
 * Uses a clean format compatible with RevenueCat
 */
const getOrCreateAnonymousUserId = (): string => {
    const STORAGE_KEY = 'rc_web_user_id';

    if (typeof window !== 'undefined' && window.localStorage) {
        let userId = localStorage.getItem(STORAGE_KEY);
        if (!userId) {
            // Use crypto.randomUUID if available, otherwise fallback to timestamp + random
            if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                userId = `web_${crypto.randomUUID()}`;
            } else {
                userId = `web_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
            }
            localStorage.setItem(STORAGE_KEY, userId);
            if (__DEV__) console.log('[RevenueCat Web] Created new anonymous user ID:', userId.slice(0, 16) + '...');
        }
        return userId;
    }

    // SSR fallback - will be replaced on client hydration
    return `web_anon_${Date.now()}`;
};

/**
 * Get subscription status from RevenueCat web
 */
export const getWebSubscriptionStatus = async (): Promise<WebSubscriptionStatus> => {
    if (!purchasesInstance) {
        return { isPro: false, activeEntitlements: [], expirationDate: null };
    }

    try {
        const customerInfo: CustomerInfo = await purchasesInstance.getCustomerInfo();
        const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];

        return {
            isPro: !!entitlement,
            activeEntitlements: Object.keys(customerInfo.entitlements.active),
            expirationDate: (entitlement as any)?.expiresDate?.toISOString() || null,
        };
    } catch (error) {
        console.error('[RevenueCat Web] Error getting customer info:', error);
        return { isPro: false, activeEntitlements: [], expirationDate: null };
    }
};

/**
 * Get available offerings/products for web
 */
export const getWebOfferings = async (): Promise<Offerings | null> => {
    if (!purchasesInstance) {
        console.log('[RevenueCat Web] getOfferings: No instance available');
        return null;
    }

    try {
        const offerings = await purchasesInstance.getOfferings();
        if (__DEV__) {
            console.log('[RevenueCat Web] Offerings fetched:', {
                current: offerings.current?.identifier,
                packagesCount: offerings.current?.availablePackages?.length,
            });
        }
        return offerings;
    } catch (error) {
        console.error('[RevenueCat Web] Error fetching offerings:', error);
        return null;
    }
};

/**
 * Purchase a package on web
 * This will redirect to Stripe Checkout
 */
export const purchaseWebPackage = async (packageToPurchase: Package): Promise<WebSubscriptionStatus> => {
    if (!purchasesInstance) {
        throw new Error('RevenueCat not initialized');
    }

    try {
        const { customerInfo } = await purchasesInstance.purchase({ rcPackage: packageToPurchase });
        const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];

        return {
            isPro: !!entitlement,
            activeEntitlements: Object.keys(customerInfo.entitlements.active),
            expirationDate: (entitlement as any)?.expiresDate?.toISOString() || null,
        };
    } catch (error: any) {
        if (error.code === 'USER_CANCELLED' || error.message?.includes('cancel')) {
            return getWebSubscriptionStatus();
        }
        console.error('[RevenueCat Web] Purchase error:', error);
        throw error;
    }
};

/**
 * Restore purchases on web
 */
export const restoreWebPurchases = async (): Promise<WebSubscriptionStatus> => {
    return getWebSubscriptionStatus();
};

/**
 * Check if web SDK is available
 */
export const isWebSDKAvailable = (): boolean => {
    return purchasesInstance !== null;
};
