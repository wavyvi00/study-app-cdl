/**
 * AuthGate Component
 * Gates access to the main app - users must be authenticated after onboarding.
 * Shows auth screens for unauthenticated users, main content for authenticated users.
 */
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const ONBOARDING_COMPLETE_KEY = 'onboarding_complete';

interface AuthGateProps {
    children: React.ReactNode;
}

/**
 * AuthGate ensures users are authenticated before accessing the main app.
 * Flow:
 * 1. If auth is loading, show spinner
 * 2. If user hasn't completed onboarding, let them through (onboarding handles itself)
 * 3. If user completed onboarding but not authenticated, redirect to login
 * 4. If authenticated, show children
 */
export function AuthGate({ children }: AuthGateProps) {
    const auth = useAuth();
    const { colors } = useTheme();
    const router = useRouter();
    const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

    // Check if user has completed onboarding
    useEffect(() => {
        const checkOnboarding = async () => {
            try {
                const completed = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
                setHasCompletedOnboarding(completed === 'true');
            } catch (error) {
                console.error('[AuthGate] Error checking onboarding:', error);
            } finally {
                setIsCheckingOnboarding(false);
            }
        };

        checkOnboarding();
    }, []);

    // Handle auth state changes
    useEffect(() => {
        // Still loading initial states
        if (isCheckingOnboarding || auth?.isLoading) {
            return;
        }

        // User hasn't completed onboarding - let onboarding flow handle it
        if (!hasCompletedOnboarding) {
            return;
        }

        // User completed onboarding but is not authenticated - redirect to login
        if (!auth?.isAuthenticated) {
            if (__DEV__) {
                console.log('[AuthGate] User not authenticated, redirecting to login');
            }
            router.replace('/auth/login');
        }
    }, [isCheckingOnboarding, hasCompletedOnboarding, auth?.isLoading, auth?.isAuthenticated, router]);

    // Show loading while checking initial states
    if (isCheckingOnboarding || auth?.isLoading) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    // User hasn't done onboarding yet - let them through
    // The onboarding screen will handle redirecting to auth after completion
    if (!hasCompletedOnboarding) {
        return <>{children}</>;
    }

    // User completed onboarding but not authenticated
    // The useEffect above will redirect them - show loading in the meantime
    if (!auth?.isAuthenticated) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    // User is authenticated - show the app
    return <>{children}</>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

/**
 * Helper to mark onboarding as complete
 * Call this at the end of the onboarding flow
 */
export async function markOnboardingComplete(): Promise<void> {
    try {
        await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
        if (__DEV__) {
            console.log('[AuthGate] Onboarding marked complete');
        }
    } catch (error) {
        console.error('[AuthGate] Error marking onboarding complete:', error);
    }
}

/**
 * Helper to check if onboarding is complete
 */
export async function isOnboardingComplete(): Promise<boolean> {
    try {
        const completed = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
        return completed === 'true';
    } catch {
        return false;
    }
}

/**
 * Helper to reset onboarding status (for testing)
 */
export async function resetOnboardingStatus(): Promise<void> {
    try {
        await AsyncStorage.removeItem(ONBOARDING_COMPLETE_KEY);
        if (__DEV__) {
            console.log('[AuthGate] Onboarding status reset');
        }
    } catch (error) {
        console.error('[AuthGate] Error resetting onboarding:', error);
    }
}
