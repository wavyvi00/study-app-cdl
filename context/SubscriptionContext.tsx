import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { PurchasesOffering, PurchasesPackage } from 'react-native-purchases';
import { APP_CONFIG } from '../constants/appConfig';
import { loadStats, updateStats } from '../data/stats';
import {
    initRevenueCat,
    getSubscriptionStatus,
    purchasePackage as rcPurchasePackage,
    restorePurchases as rcRestorePurchases,
    getOfferings as rcGetOfferings
} from '../lib/revenuecat';

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
    // Actions
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

    // Initial setup
    // Initial setup with delay to prevent launch crash
    useEffect(() => {
        let isMounted = true;
        const init = async () => {
            try {
                // Delay initialization to ensure first screen renders/settles
                await new Promise(resolve => setTimeout(resolve, 2000));

                if (!isMounted) return;

                // Wrap in try/catch to ensure app never crashes on boot
                try {
                    await initRevenueCat();
                } catch (e) {
                    console.error('[Subscription] RevenueCat init failed:', e);
                }

                if (!isMounted) return;

                try {
                    await loadSubscriptionState();
                } catch (e) {
                    console.error('[Subscription] Load state failed:', e);
                }
            } catch (error) {
                console.error('[Subscription] Fatal init error:', error);
            }
        };

        init();

        return () => { isMounted = false; };
    }, []);

    const loadSubscriptionState = async () => {
        try {
            // Load stats to get questionsAnsweredTotal
            const stats = await loadStats();
            const totalAnswered = stats.questionsAnsweredTotal || 0;

            // Get RevenueCat status
            const rcStatus = await getSubscriptionStatus();
            const offerings = await rcGetOfferings();

            // Load saved fallback status (for offline/faster load)
            const savedSubscription = await AsyncStorage.getItem(SUBSCRIPTION_STORAGE_KEY);
            let subscriptionData = savedSubscription ? JSON.parse(savedSubscription) : null;

            // Use RevenueCat if available, otherwise fallback to local
            const isPro = rcStatus.isPro || subscriptionData?.isPro || false;
            const expirationDate = rcStatus.expirationDate || subscriptionData?.expirationDate || null;

            // Persist latest status
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
                subscriptionTier: isPro ? 'yearly' : 'free', // specific tier tracking relies on entitlement data we could parse deeper
                expirationDate,
                offerings: offerings || prev.offerings,
                isLoading: false,
            }));

            if (__DEV__) {
                console.log('[Subscription] Loaded state:', {
                    totalAnswered,
                    isPro,
                    offeringsFound: !!offerings
                });
            }
        } catch (error) {
            console.error('[Subscription] Failed to load state:', error);
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

    const restore = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true }));
            const status = await rcRestorePurchases();

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

    const checkCanAccessQuiz = useCallback((): boolean => {
        // Pro users always have access
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

    const value: SubscriptionContextType = {
        ...state,
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
