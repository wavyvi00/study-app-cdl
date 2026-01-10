/**
 * Cross-Platform Authentication Context
 * Manages Supabase auth state for all platforms (iOS, Android, Web).
 * Provides a stable user ID that can be used with RevenueCat.
 */
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import {
    signUpWithEmail,
    signInWithEmail,
    signOut as authSignOut,
    resetPassword as authResetPassword,
    getCurrentSession,
    onAuthStateChange,
} from '../lib/supabase-auth';

interface AuthState {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
    /** The stable user ID to use with RevenueCat (Supabase user UUID) */
    userId: string | null;
    signUp: (email: string, password: string) => Promise<{ error: string | null }>;
    signIn: (email: string, password: string) => Promise<{ error: string | null }>;
    signOut: () => Promise<{ error: string | null }>;
    resetPassword: (email: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [state, setState] = useState<AuthState>({
        user: null,
        session: null,
        isLoading: true,
        isAuthenticated: false,
    });

    // Initialize session on mount
    useEffect(() => {
        let isMounted = true;

        const initSession = async () => {
            try {
                const session = await getCurrentSession();
                if (!isMounted) return;

                setState({
                    user: session?.user || null,
                    session,
                    isLoading: false,
                    isAuthenticated: !!session?.user,
                });

                if (__DEV__) {
                    console.log('[Auth] Session initialized:', {
                        hasUser: !!session?.user,
                        userId: session?.user?.id?.slice(0, 8) + '...',
                    });
                }
            } catch (error) {
                console.error('[Auth] Init error:', error);
                if (isMounted) {
                    setState(prev => ({ ...prev, isLoading: false }));
                }
            }
        };

        initSession();

        // Listen for auth changes
        const unsubscribe = onAuthStateChange(async (event, session) => {
            if (!isMounted) return;

            if (__DEV__) {
                console.log('[Auth] Auth state changed:', event, {
                    hasUser: !!session?.user,
                    userId: session?.user?.id?.slice(0, 8) + '...',
                });
            }

            setState({
                user: session?.user || null,
                session,
                isLoading: false,
                isAuthenticated: !!session?.user,
            });
        });

        return () => {
            isMounted = false;
            unsubscribe();
        };
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

    const value: AuthContextType = {
        ...state,
        userId: state.user?.id || null,
        signUp,
        signIn,
        signOut,
        resetPassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook to access auth context
 * Returns null if used outside of AuthProvider
 */
export function useAuth(): AuthContextType | null {
    return useContext(AuthContext);
}

/**
 * Hook that throws if used outside AuthProvider
 * Use this in components that require authentication
 */
export function useAuthRequired(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthRequired must be used within AuthProvider');
    }

    return context;
}
