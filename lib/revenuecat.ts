import { Platform } from 'react-native';
import Purchases, { CustomerInfo, PurchasesOffering, PurchasesPackage } from 'react-native-purchases';
import {
    initRevenueCatWeb,
    getWebSubscriptionStatus,
    getWebOfferings,
    purchaseWebPackage,
    restoreWebPurchases,
    logInWeb,
    logOutWeb,
    isWebSDKAvailable,
} from './revenuecat-web';

// Configuration
const KEYS = {
    ios: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY,
    android: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY,
};

const ENTITLEMENT_ID = 'CDL ZERO Pro'; // The entitlement identifier in RevenueCat dashboard

// Track initialization state to prevent duplicate configure() calls
let isConfigured = false;

export interface SubscriptionStatus {
    isPro: boolean;
    activeEntitlements: string[];
    expirationDate: string | null;
}

/**
 * Initialize RevenueCat SDK (configuration only, no user login)
 * This should be called once at app startup.
 * Use logIn() separately to bind to an authenticated user.
 */
export const initRevenueCat = async (): Promise<void> => {
    if (Platform.OS === 'web') {
        await initRevenueCatWeb();
        return;
    }

    if (isConfigured) {
        if (__DEV__) console.log('[RevenueCat] Already configured, skipping');
        return;
    }

    const apiKey = Platform.select({
        ios: KEYS.ios,
        android: KEYS.android,
    });

    if (!apiKey) {
        console.error('[RevenueCat] API key not found for this platform');
        return;
    }

    try {
        await Purchases.configure({ apiKey });
        isConfigured = true;
        if (__DEV__) console.log('[RevenueCat] SDK configured successfully');
    } catch (error) {
        console.error('[RevenueCat] Failed to configure:', error);
    }
};

/**
 * Log in a user to RevenueCat with their Supabase user ID.
 * This binds all purchases to the authenticated user.
 * @param userId - The Supabase user UUID
 */
export const logIn = async (userId: string): Promise<SubscriptionStatus> => {
    if (Platform.OS === 'web') {
        return logInWeb(userId);
    }

    if (!isConfigured) {
        console.warn('[RevenueCat] SDK not configured, initializing first');
        await initRevenueCat();
    }

    try {
        if (__DEV__) console.log('[RevenueCat] Logging in user:', userId.slice(0, 8) + '...');
        const { customerInfo } = await Purchases.logIn(userId);
        const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];

        if (__DEV__) {
            console.log('[RevenueCat] Login successful, isPro:', !!entitlement);
        }

        return {
            isPro: !!entitlement,
            activeEntitlements: Object.keys(customerInfo.entitlements.active),
            expirationDate: entitlement?.expirationDate || null,
        };
    } catch (error) {
        console.error('[RevenueCat] Login error:', error);
        return { isPro: false, activeEntitlements: [], expirationDate: null };
    }
};

/**
 * Log out the current user from RevenueCat.
 * This resets to an anonymous user state.
 */
export const logOut = async (): Promise<void> => {
    if (Platform.OS === 'web') {
        await logOutWeb();
        return;
    }

    if (!isConfigured) {
        if (__DEV__) console.log('[RevenueCat] SDK not configured, nothing to log out');
        return;
    }

    try {
        if (__DEV__) console.log('[RevenueCat] Logging out user');
        await Purchases.logOut();
        if (__DEV__) console.log('[RevenueCat] Logout successful');
    } catch (error) {
        console.error('[RevenueCat] Logout error:', error);
    }
};

/**
 * Check subscription status
 */
export const getSubscriptionStatus = async (): Promise<SubscriptionStatus> => {
    if (Platform.OS === 'web') {
        return getWebSubscriptionStatus();
    }

    try {
        const customerInfo: CustomerInfo = await Purchases.getCustomerInfo();
        const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];

        return {
            isPro: !!entitlement,
            activeEntitlements: Object.keys(customerInfo.entitlements.active),
            expirationDate: entitlement?.expirationDate || null,
        };
    } catch (error) {
        console.error('[RevenueCat] Error fetching customer info:', error);
        return { isPro: false, activeEntitlements: [], expirationDate: null };
    }
};

/**
 * Get current offerings (packages to show on paywall)
 */
export const getOfferings = async (): Promise<PurchasesOffering | null> => {
    if (Platform.OS === 'web') {
        const webOfferings = await getWebOfferings();
        return webOfferings?.current as unknown as PurchasesOffering || null;
    }

    try {
        const offerings = await Purchases.getOfferings();
        return offerings.current;
    } catch (error) {
        console.error('[RevenueCat] Error fetching offerings:', error);
        return null;
    }
};

/**
 * Purchase a package
 */
export const purchasePackage = async (pack: PurchasesPackage): Promise<SubscriptionStatus> => {
    if (Platform.OS === 'web') {
        return purchaseWebPackage(pack as any);
    }

    try {
        const { customerInfo } = await Purchases.purchasePackage(pack);
        const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];

        return {
            isPro: !!entitlement,
            activeEntitlements: Object.keys(customerInfo.entitlements.active),
            expirationDate: entitlement?.expirationDate || null,
        };
    } catch (error: any) {
        const isCancelled =
            error.userCancelled === true ||
            error.code === 'PURCHASE_CANCELLED' ||
            error.code === 1 ||
            error.message?.includes('cancelled') ||
            error.message?.includes('canceled');

        if (!isCancelled) {
            console.error('[RevenueCat] Purchase error:', error);
            throw error;
        }
        return getSubscriptionStatus();
    }
};

/**
 * Restore purchases
 */
export const restorePurchases = async (): Promise<SubscriptionStatus> => {
    if (Platform.OS === 'web') {
        return restoreWebPurchases();
    }

    try {
        const customerInfo = await Purchases.restorePurchases();
        const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];

        return {
            isPro: !!entitlement,
            activeEntitlements: Object.keys(customerInfo.entitlements.active),
            expirationDate: entitlement?.expirationDate || null,
        };
    } catch (error) {
        console.error('[RevenueCat] Error restoring purchases:', error);
        throw error;
    }
};
