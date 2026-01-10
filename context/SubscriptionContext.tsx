import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PurchasesOffering, PurchasesPackage } from 'react-native-purchases';
import { APP_CONFIG } from '../constants/appConfig';
import { loadStats, updateStats } from '../data/stats';
import {
    initRevenueCat,
    getSubscriptionStatus,
    purchasePackage as rcPurchasePackage,
    restorePurchases as rcRestorePurchases,
    getOfferings as rcGetOfferings,
    logIn as rcLogIn,
    logOut as rcLogOut,
} from '../lib/revenuecat';
import { useAuth } from './AuthContext';

// Subscription status types
export type SubscriptionTier = 'free' | 'monthly' | 'yearly' | 'lifetime';

interface SubscriptionState {
    // Trial tracking
    questionsAnsweredTotal: number;
    isTrialActive: boolean;
    questionsRemaining: number;

    // Subscription status
    isPro: boolean;
    subscriptionTier: SubscriptionTier;
    expirationDate: string | null;

    // Loading state
    isLoading: boolean;
    offerings: PurchasesOffering | null;
}

interface SubscriptionContextType extends SubscriptionState {
    /**
     * Check if user has the "CDL ZERO Pro" entitlement.
     * This is the primary way to gate premium features.
     * Returns true if the entitlement is active in RevenueCat,
     * regardless of purchase platform (iOS, Android, or Web).
     */
    hasEntitlement: () => boolean;

    // Access control
    checkCanAccessQuiz: () => boolean;
    incrementQuestionsAnswered: (count?: number) => Promise<void>;
    refreshSubscriptionStatus: () => Promise<void>;
    purchase: (pack: PurchasesPackage) => Promise<void>;
    restore: () => Promise<void>;

    // Paywall
    showPaywall: () => void;
    hidePaywall: () => void;
    isPaywallVisible: boolean;

    // For testing/dev
    resetTrialCount: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const SUBSCRIPTION_STORAGE_KEY = 'subscription_status';

interface SubscriptionProviderProps {
    children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
    const auth = useAuth();
    const [state, setState] = useState<SubscriptionState>({
        questionsAnsweredTotal: 0,
        isTrialActive: true,
        questionsRemaining: APP_CONFIG.FREE_TRIAL_QUESTION_LIMIT,
        isPro: false,
        subscriptionTier: 'free',
        expirationDate: null,
        isLoading: true,
        offerings: null,
    });

    const [isPaywallVisible, setPaywallVisible] = useState(false);

    // Track the last userId we logged into RevenueCat to prevent duplicate calls
    const lastLoggedInUserId = useRef<string | null>(null);
    const isInitialized = useRef(false);

    // Initialize RevenueCat SDK once on mount
    useEffect(() => {
        let isMounted = true;

        const initSDK = async () => {
            try {
                // Delay initialization to ensure first screen renders/settles
                await new Promise(resolve => setTimeout(resolve, 2000));

                if (!isMounted) return;

                try {
                    await initRevenueCat();
                    isInitialized.current = true;
                    if (__DEV__) console.log('[Subscription] RevenueCat SDK initialized');
                } catch (e) {
                    console.error('[Subscription] RevenueCat init failed:', e);
                }
            } catch (error) {
                console.error('[Subscription] Fatal init error:', error);
            }
        };

        initSDK();

        return () => { isMounted = false; };
    }, []);


    /**
     * React to auth state changes - logIn/logOut RevenueCat
     * 
     * CROSS-PLATFORM SYNC:
     * When a user logs in, rcLogIn(userId) is called which:
     * 1. Sets the appUserID in RevenueCat to the Supabase user UUID
     * 2. Fetches customerInfo for that user from RevenueCat servers
     * 3. Returns any active entitlements linked to that appUserID
     * 
     * This means if a user purchased on iOS and logs into Android/Web,
     * they automatically get their entitlement because it's linked to
     * their appUserID in RevenueCat, not to a device.
     */
    useEffect(() => {
        if (!isInitialized.current) {
            // SDK not ready yet, will be handled after init
            return;
        }

        const handleAuthChange = async () => {
            const userId = auth?.userId;

            // User logged in → sync with RevenueCat to get their entitlements
            if (userId && userId !== lastLoggedInUserId.current) {
                if (__DEV__) console.log('[Subscription] Auth changed: logging in to RevenueCat for cross-platform sync');
                lastLoggedInUserId.current = userId;

                try {
                    // rcLogIn fetches customerInfo for this user from RevenueCat
                    // This includes any purchases made on ANY platform
                    const status = await rcLogIn(userId);

                    // Refresh local state with entitlement from RevenueCat
                    await loadSubscriptionState();

                    if (__DEV__) {
                        console.log('[Subscription] Cross-platform sync complete:', {
                            userId: userId.slice(0, 8) + '...',
                            isPro: status.isPro,
                            activeEntitlements: status.activeEntitlements,
                        });
                    }
                } catch (error) {
                    console.error('[Subscription] RevenueCat login failed:', error);
                }
            }
            // User logged out
            else if (!userId && lastLoggedInUserId.current !== null) {
                if (__DEV__) console.log('[Subscription] Auth changed: logging out of RevenueCat');
                lastLoggedInUserId.current = null;

                try {
                    await rcLogOut();
                    // Reset subscription state for anonymous user
                    setState(prev => ({
                        ...prev,
                        isPro: false,
                        subscriptionTier: 'free',
                        expirationDate: null,
                    }));
                } catch (error) {
                    console.error('[Subscription] RevenueCat logout failed:', error);
                }
            }
        };

        handleAuthChange();
    }, [auth?.userId, auth?.isAuthenticated]);

    // Load subscription state after SDK is ready and auth is resolved
    useEffect(() => {
        if (!isInitialized.current) return;
        if (auth?.isLoading) return;

        // If user is authenticated, wait for login to complete before loading state
        if (auth?.userId && lastLoggedInUserId.current !== auth.userId) {
            return; // Will be handled by auth change effect
        }

        loadSubscriptionState();
    }, [auth?.isLoading, auth?.userId]);

    const loadSubscriptionState = async () => {
        try {
            // Load stats to get questionsAnsweredTotal
            const stats = await loadStats();
            const totalAnswered = stats.questionsAnsweredTotal || 0;

            // Get RevenueCat status - this is the SINGLE SOURCE OF TRUTH for entitlements
            // isPro is derived exclusively from RevenueCat's customerInfo.entitlements
            // regardless of where the purchase was made (iOS, Android, or Web)
            const rcStatus = await getSubscriptionStatus();
            const offerings = await rcGetOfferings();

            // RevenueCat is the sole source of truth for entitlement state
            // isPro = true only if the "CDL ZERO Pro" entitlement is active in RevenueCat
            const isPro = rcStatus.isPro;
            const expirationDate = rcStatus.expirationDate;

            // Cache the latest status for quicker initial load on next app start
            // Note: This cache is ONLY used for initial UI display while waiting for RevenueCat
            // It does NOT determine actual access - RevenueCat always overrides
            await AsyncStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify({
                isPro,
                expirationDate,
                timestamp: Date.now()
            }));

            const questionsRemaining = Math.max(0, APP_CONFIG.FREE_TRIAL_QUESTION_LIMIT - totalAnswered);
            const isTrialActive = !isPro && questionsRemaining > 0;

            setState(prev => ({
                ...prev,
                questionsAnsweredTotal: totalAnswered,
                isTrialActive,
                questionsRemaining,
                isPro,
                subscriptionTier: isPro ? 'yearly' : 'free',
                expirationDate,
                offerings: offerings || prev.offerings,
                isLoading: false,
            }));

            if (__DEV__) {
                console.log('[Subscription] Entitlement state loaded from RevenueCat:', {
                    isPro,
                    expirationDate,
                    activeEntitlements: rcStatus.activeEntitlements,
                });
            }
        } catch (error) {
            console.error('[Subscription] Failed to load entitlement state:', error);
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const purchase = useCallback(async (pack: PurchasesPackage) => {
        try {
            setState(prev => ({ ...prev, isLoading: true }));
            const status = await rcPurchasePackage(pack);

            // Update state with new status
            const stats = await loadStats();
            const totalAnswered = stats.questionsAnsweredTotal || 0;
            const questionsRemaining = Math.max(0, APP_CONFIG.FREE_TRIAL_QUESTION_LIMIT - totalAnswered);

            setState(prev => ({
                ...prev,
                isPro: status.isPro,
                isTrialActive: !status.isPro && questionsRemaining > 0,
                expirationDate: status.expirationDate,
                isLoading: false
            }));

            // Persist
            await AsyncStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify({
                isPro: status.isPro,
                expirationDate: status.expirationDate,
                timestamp: Date.now()
            }));

            if (status.isPro) {
                setPaywallVisible(false);
            }
        } catch (error) {
            setState(prev => ({ ...prev, isLoading: false }));
            throw error;
        }
    }, []);

    /**
     * Restore purchases from the app store.
     * 
     * This function:
     * 1. Calls RevenueCat.restorePurchases() to sync with App Store / Play Store
     * 2. RevenueCat associates any found purchases with the current appUserID
     * 3. Returns updated entitlement state from RevenueCat
     * 
     * Cross-platform sync: If a user purchased on iOS and logs into Android,
     * calling restore() will fetch their entitlement from RevenueCat (since
     * the purchase is linked to their appUserID, not device).
     * 
     * Note: On Web, restore simply refreshes customerInfo since there's no
     * local receipt to restore.
     */
    const restore = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true }));

            if (__DEV__) {
                console.log('[Subscription] Restoring purchases...');
            }

            const status = await rcRestorePurchases();

            if (__DEV__) {
                console.log('[Subscription] Restore complete:', {
                    isPro: status.isPro,
                    activeEntitlements: status.activeEntitlements,
                    expirationDate: status.expirationDate,
                });
            }

            const stats = await loadStats();
            const totalAnswered = stats.questionsAnsweredTotal || 0;
            const questionsRemaining = Math.max(0, APP_CONFIG.FREE_TRIAL_QUESTION_LIMIT - totalAnswered);

            setState(prev => ({
                ...prev,
                isPro: status.isPro,
                isTrialActive: !status.isPro && questionsRemaining > 0,
                expirationDate: status.expirationDate,
                isLoading: false
            }));

            await AsyncStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify({
                isPro: status.isPro,
                expirationDate: status.expirationDate,
                timestamp: Date.now()
            }));

            if (status.isPro) {
                setPaywallVisible(false);
            }
        } catch (error) {
            setState(prev => ({ ...prev, isLoading: false }));
            throw error;
        }
    }, []);

    /**
     * Check if user can access quiz content.
     * 
     * Access is determined by entitlement state from RevenueCat:
     * - If "CDL ZERO Pro" entitlement is active (isPro = true), full access is granted
     * - Otherwise, access is limited to free trial questions remaining
     * 
     * This check is platform-agnostic - the same entitlement unlocks access
     * regardless of whether the purchase was made on iOS, Android, or Web.
     */
    const checkCanAccessQuiz = useCallback((): boolean => {
        // Pro users always have access (entitlement-based)
        if (state.isPro) return true;

        // Free users check trial limit
        return state.questionsRemaining > 0;
    }, [state.isPro, state.questionsRemaining]);

    const incrementQuestionsAnswered = useCallback(async (count: number = 1): Promise<void> => {
        // Persist immediately to enforce global limit even if app is killed
        const currentStats = await loadStats();
        const newTotal = (currentStats.questionsAnsweredTotal || 0) + count;

        await updateStats({
            questionsAnsweredTotal: newTotal
        });

        // Update local state
        const questionsRemaining = Math.max(0, APP_CONFIG.FREE_TRIAL_QUESTION_LIMIT - newTotal);
        const isTrialActive = !state.isPro && questionsRemaining > 0;

        setState(prev => ({
            ...prev,
            questionsAnsweredTotal: newTotal,
            questionsRemaining,
            isTrialActive,
        }));

        if (__DEV__) {
            console.log('[Subscription] Questions incremented & saved:', { newTotal, questionsRemaining });
        }
    }, [state.isPro]);

    const refreshSubscriptionStatus = useCallback(async (): Promise<void> => {
        // Reload local state and RevenueCat status
        await loadSubscriptionState();
    }, []);

    const showPaywall = useCallback(() => {
        setPaywallVisible(true);
    }, []);

    const hidePaywall = useCallback(() => {
        setPaywallVisible(false);
    }, []);

    const resetTrialCount = useCallback(async (): Promise<void> => {
        // Dev/testing only - reset the trial counter
        if (!__DEV__) return;

        try {
            const stats = await loadStats();
            const { saveStats } = await import('../data/stats');
            await saveStats({ ...stats, questionsAnsweredTotal: 0 });
            await loadSubscriptionState();
            if (__DEV__) console.log('[Subscription] Trial count reset');
        } catch (error) {
            console.error('[Subscription] Failed to reset trial:', error);
        }
    }, []);

    /**
     * Check if user has the "CDL ZERO Pro" entitlement.
     * This is derived from RevenueCat customerInfo.entitlements.active
     */
    const hasEntitlement = useCallback((): boolean => {
        return state.isPro;
    }, [state.isPro]);

    const value: SubscriptionContextType = {
        ...state,
        hasEntitlement,
        checkCanAccessQuiz,
        incrementQuestionsAnswered,
        refreshSubscriptionStatus,
        purchase,
        restore,
        showPaywall,
        hidePaywall,
        isPaywallVisible,
        resetTrialCount,
    };

    return (
        <SubscriptionContext.Provider value={value}>
            {children}
        </SubscriptionContext.Provider>
    );
}

export function useSubscription(): SubscriptionContextType {
    const context = useContext(SubscriptionContext);
    if (context === undefined) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
}

// Optional hook that doesn't throw (for components that might render before provider)
export function useSubscriptionOptional(): SubscriptionContextType | null {
    return useContext(SubscriptionContext) ?? null;
}
