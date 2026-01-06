import { Platform } from 'react-native';
import Purchases, { CustomerInfo, PurchasesOffering, PurchasesPackage } from 'react-native-purchases';

// Configuration
// Using the single test key provided by the user for now
// In production, these should be separate per platform
const KEYS = {
    ios: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY,
    android: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY,
};

const ENTITLEMENT_ID = 'CDL ZERO Pro'; // The entitlement identifier in RevenueCat dashboard

export interface SubscriptionStatus {
    isPro: boolean;
    activeEntitlements: string[];
    expirationDate: string | null; // For the pro entitlement
}

// Initialize RevenueCat
export const initRevenueCat = async (): Promise<void> => {
    if (Platform.OS === 'web') {
        // RevenueCat doesn't fully support web yet in the same way, 
        // usually requires Stripe integration or similar. 
        // For now, we'll mock or handle gracefully.
        console.warn('RevenueCat not fully supported on web yet');
        return;
    }

    const apiKey = Platform.select({
        ios: KEYS.ios,
        android: KEYS.android,
    });

    if (!apiKey) {
        console.error('RevenueCat API key not found for this platform');
        return;
    }

    try {
        await Purchases.configure({ apiKey });
        // Initialized
    } catch (error) {
        console.error('Failed to initialize RevenueCat:', error);
    }
};

// Check subscription status
export const getSubscriptionStatus = async (): Promise<SubscriptionStatus> => {
    if (Platform.OS === 'web') {
        return { isPro: false, activeEntitlements: [], expirationDate: null };
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
        console.error('Error fetching customer info:', error);
        return { isPro: false, activeEntitlements: [], expirationDate: null };
    }
};

// Get current offerings (packages to show on paywall)
export const getOfferings = async (): Promise<PurchasesOffering | null> => {
    if (Platform.OS === 'web') return null;

    try {
        const offerings = await Purchases.getOfferings();
        return offerings.current;
    } catch (error) {
        console.error('Error fetching offerings:', error);
        return null;
    }
};

// Purchase a package
export const purchasePackage = async (pack: PurchasesPackage): Promise<SubscriptionStatus> => {
    try {
        const { customerInfo } = await Purchases.purchasePackage(pack);
        const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];

        return {
            isPro: !!entitlement,
            activeEntitlements: Object.keys(customerInfo.entitlements.active),
            expirationDate: entitlement?.expirationDate || null,
        };
    } catch (error: any) {
        // RevenueCat uses different ways to indicate cancellation
        const isCancelled =
            error.userCancelled === true ||
            error.code === 'PURCHASE_CANCELLED' ||
            error.code === 1 || // PurchaseCancelledError code
            error.message?.includes('cancelled') ||
            error.message?.includes('canceled');

        if (!isCancelled) {
            console.error('Purchase error:', error);
            throw error; // Re-throw to handle in UI
        }
        // User cancelled, silently return current status
        return getSubscriptionStatus();
    }
};

// Restore purchases
export const restorePurchases = async (): Promise<SubscriptionStatus> => {
    if (Platform.OS === 'web') return { isPro: false, activeEntitlements: [], expirationDate: null };

    try {
        const customerInfo = await Purchases.restorePurchases();
        const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];

        return {
            isPro: !!entitlement,
            activeEntitlements: Object.keys(customerInfo.entitlements.active),
            expirationDate: entitlement?.expirationDate || null,
        };
    } catch (error) {
        console.error('Error restoring purchases:', error);
        throw error;
    }
};
