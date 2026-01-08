/**
 * Web-Only Authentication Context
 * Manages Supabase auth state for web users only
 * iOS/Android use anonymous RevenueCat IDs and don't use this context
 */
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Platform } from 'react-native';
import type { User, Session } from '@supabase/supabase-js';
import {
    signUpWithEmail,
    signInWithEmail,
    signOut as authSignOut,
    resetPassword as authResetPassword,
    getCurrentSession,
    onAuthStateChange,
} from '../lib/supabase-auth';

interface WebAuthState {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

interface WebAuthContextType extends WebAuthState {
    signUp: (email: string, password: string) => Promise<{ error: string | null }>;
    signIn: (email: string, password: string) => Promise<{ error: string | null }>;
    signOut: () => Promise<{ error: string | null }>;
    resetPassword: (email: string) => Promise<{ error: string | null }>;
}

const WebAuthContext = createContext<WebAuthContextType | null>(null);

interface WebAuthProviderProps {
    children: ReactNode;
}

export function WebAuthProvider({ children }: WebAuthProviderProps) {
    // Only run on web
    if (Platform.OS !== 'web') {
        return <>{children}</>;
    }

    return <WebAuthProviderInner>{children}</WebAuthProviderInner>;
}

function WebAuthProviderInner({ children }: WebAuthProviderProps) {
    const [state, setState] = useState<WebAuthState>({
        user: null,
        session: null,
        isLoading: true,
        isAuthenticated: false,
    });

    // Initialize session on mount
    useEffect(() => {
        const initSession = async () => {
            try {
                const session = await getCurrentSession();
                setState({
                    user: session?.user || null,
                    session,
                    isLoading: false,
                    isAuthenticated: !!session?.user,
                });
            } catch (error) {
                console.error('[WebAuth] Init error:', error);
                setState(prev => ({ ...prev, isLoading: false }));
            }
        };

        initSession();

        // Listen for auth changes
        const unsubscribe = onAuthStateChange(async (event, session) => {
            console.log('[WebAuth] Auth state changed:', event);
            setState({
                user: session?.user || null,
                session,
                isLoading: false,
                isAuthenticated: !!session?.user,
            });

            // Reinitialize RevenueCat with new user ID
            try {
                const { reinitRevenueCatWeb } = await import('../lib/revenuecat-web');
                await reinitRevenueCatWeb();
            } catch (error) {
                console.error('[WebAuth] Failed to reinit RevenueCat:', error);
            }
        });

        return unsubscribe;
    }, []);

    const signUp = useCallback(async (email: string, password: string) => {
        setState(prev => ({ ...prev, isLoading: true }));
        const result = await signUpWithEmail(email, password);

        if (result.error) {
            setState(prev => ({ ...prev, isLoading: false }));
            return { error: result.error };
        }

        setState({
            user: result.user,
            session: result.session,
            isLoading: false,
            isAuthenticated: !!result.user,
        });

        return { error: null };
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        setState(prev => ({ ...prev, isLoading: true }));
        const result = await signInWithEmail(email, password);

        if (result.error) {
            setState(prev => ({ ...prev, isLoading: false }));
            return { error: result.error };
        }

        setState({
            user: result.user,
            session: result.session,
            isLoading: false,
            isAuthenticated: !!result.user,
        });

        return { error: null };
    }, []);

    const signOut = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true }));
        const result = await authSignOut();

        setState({
            user: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
        });

        return result;
    }, []);

    const resetPassword = useCallback(async (email: string) => {
        return authResetPassword(email);
    }, []);

    const value: WebAuthContextType = {
        ...state,
        signUp,
        signIn,
        signOut,
        resetPassword,
    };

    return (
        <WebAuthContext.Provider value={value}>
            {children}
        </WebAuthContext.Provider>
    );
}

/**
 * Hook to access web auth context
 * Returns null on non-web platforms
 */
export function useWebAuth(): WebAuthContextType | null {
    const context = useContext(WebAuthContext);

    // On non-web platforms, context will be null
    if (Platform.OS !== 'web') {
        return null;
    }

    return context;
}

/**
 * Hook that throws if used outside provider (web only)
 */
export function useWebAuthRequired(): WebAuthContextType {
    const context = useContext(WebAuthContext);

    if (Platform.OS !== 'web') {
        throw new Error('useWebAuthRequired is only available on web');
    }

    if (!context) {
        throw new Error('useWebAuthRequired must be used within WebAuthProvider');
    }

    return context;
}
