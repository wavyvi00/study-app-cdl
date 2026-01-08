/**
 * RevenueCat Web SDK Integration
 * Uses @revenuecat/purchases-js for web purchases via Stripe
 */
import { Purchases, type CustomerInfo, type Package, type Offerings } from '@revenuecat/purchases-js';

const ENTITLEMENT_ID = 'CDL ZERO Pro';

let purchasesInstance: Purchases | null = null;
let currentAppUserId: string | null = null;

export interface WebSubscriptionStatus {
    isPro: boolean;
    activeEntitlements: string[];
    expirationDate: string | null;
}

/**
 * Get app user ID - prioritizes authenticated Supabase user over anonymous
 */
const getAppUserId = async (): Promise<string> => {
    // Check for authenticated Supabase user first
    try {
        const { getCurrentUser } = await import('./supabase-auth');
        const user = await getCurrentUser();
        if (user?.id) {
            console.log('[RevenueCat Web] Using authenticated user ID:', user.id);
            return user.id;
        }
    } catch (error) {
        // Auth module not available or user not logged in, fall through to anonymous
    }

    // Fallback to anonymous ID
    return getOrCreateAnonymousUserId();
};

/**
 * Initialize RevenueCat for web
 */
export const initRevenueCatWeb = async (): Promise<void> => {
    const apiKey = process.env.EXPO_PUBLIC_REVENUECAT_WEB_API_KEY;

    if (!apiKey) {
        console.error('[RevenueCat Web] API key not found');
        return;
    }

    try {
        const appUserId = await getAppUserId();
        currentAppUserId = appUserId;
        purchasesInstance = Purchases.configure(apiKey, appUserId);
        console.log('[RevenueCat Web] Initialized successfully with user:', appUserId);
    } catch (error) {
        console.error('[RevenueCat Web] Failed to initialize:', error);
    }
};

/**
 * Reinitialize RevenueCat with new user ID (call after login/logout)
 */
export const reinitRevenueCatWeb = async (): Promise<void> => {
    const newUserId = await getAppUserId();

    // Only reinitialize if user changed
    if (newUserId !== currentAppUserId) {
        console.log('[RevenueCat Web] User changed, reinitializing...');
        currentAppUserId = newUserId;
        await initRevenueCatWeb();
    }
};

/**
 * Get or create an anonymous user ID for web
 * This persists across sessions using localStorage
 */
const getOrCreateAnonymousUserId = (): string => {
    const STORAGE_KEY = 'rc_anonymous_user_id';

    if (typeof window !== 'undefined' && window.localStorage) {
        let userId = localStorage.getItem(STORAGE_KEY);
        if (!userId) {
            userId = `web_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
            localStorage.setItem(STORAGE_KEY, userId);
        }
        return userId;
    }

    // Fallback for SSR or no localStorage
    return `web_temp_${Date.now()}`;
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
        console.log('[RevenueCat Web] Offerings fetched:', {
            current: offerings.current?.identifier,
            packagesCount: offerings.current?.availablePackages?.length,
            packages: offerings.current?.availablePackages?.map(p => ({
                id: p.identifier,
                productId: p.rcBillingProduct?.identifier
            }))
        });
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
        // Purchase will redirect to Stripe Checkout
        const { customerInfo } = await purchasesInstance.purchase({ rcPackage: packageToPurchase });
        const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];

        return {
            isPro: !!entitlement,
            activeEntitlements: Object.keys(customerInfo.entitlements.active),
            expirationDate: (entitlement as any)?.expiresDate?.toISOString() || null,
        };
    } catch (error: any) {
        // Check if user cancelled
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
    // On web, customer info is fetched from RevenueCat servers
    // No "restore" needed like on mobile, just refresh customer info
    return getWebSubscriptionStatus();
};

/**
 * Check if web SDK is available
 */
export const isWebSDKAvailable = (): boolean => {
    return purchasesInstance !== null;
};
