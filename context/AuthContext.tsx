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
import { loadStats, saveStats, mergeStats } from '../data/stats';
import { pushStatsToCloud, pullStatsFromCloud } from '../lib/sync';

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
    sync: () => Promise<void>;
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

        // --- Sync Logic: Promote Guest Stats to User ---
        if (result.user?.id) {
            try {
                // 1. Load Guest Stats
                const guestStats = await loadStats(null);

                // 2. Save as User Stats (Clone guest -> user)
                await saveStats(guestStats, result.user.id);

                // 3. Push to Cloud (First sync)
                await pushStatsToCloud(result.user.id, guestStats);
            } catch (err) {
                console.error('[Auth] Sync error on signup:', err);
            }
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

        // --- Sync Logic: Merge Cloud Data ---
        if (result.user?.id) {
            try {
                // 1. Pull Remote Stats
                const remoteProfile = await pullStatsFromCloud(result.user.id);

                // 2. Load Local Guest Stats (in case they played before logging in)
                const guestStats = await loadStats(null);

                // 3. Merge Strategies
                // If remote exists, merge. Else just use guest.
                let finalStats = guestStats;
                if (remoteProfile?.stats) {
                    finalStats = mergeStats(guestStats, remoteProfile.stats);
                }

                // 4. Save Merged Stats to Local User Storage
                await saveStats(finalStats, result.user.id);

                // 5. Push Merged back to Cloud (to sync any new guest progress)
                await pushStatsToCloud(result.user.id, finalStats);

            } catch (err) {
                console.error('[Auth] Sync error on signin:', err);
            }
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

        // Sync one last time before signing out
        if (state.user?.id) {
            try {
                const current = await loadStats(state.user.id);
                // We mainly want to push safe changes.
                // Pulling might be risky if we are leaving, but merging is safe.
                await pushStatsToCloud(state.user.id, current);
            } catch (e) {
                console.warn('[Auth] Sync before signout failed', e);
            }
        }

        const result = await authSignOut();

        // Note: We don't need to manually clear 'user_stats_USERID' from storage.
        // It stays as a device cache for that user.
        // Switching 'user' to null will cause hooks to read from 'user_stats_guest' (or default).

        setState({
            user: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
        });

        return result;
    }, [state.user?.id]);

    const resetPassword = useCallback(async (email: string) => {
        return authResetPassword(email);
    }, []);

    const userSync = useCallback(async () => {
        if (!state.user?.id) return;
        const current = await loadStats(state.user.id);
        const remote = await pullStatsFromCloud(state.user.id);
        if (remote?.stats) {
            const merged = mergeStats(current, remote.stats);
            await saveStats(merged, state.user.id);
            await pushStatsToCloud(state.user.id, merged);
        } else {
            // No remote data, just push local
            await pushStatsToCloud(state.user.id, current);
        }
    }, [state.user?.id]);

    const value: AuthContextType = {
        ...state,
        userId: state.user?.id || null,
        signUp,
        signIn,
        signOut,
        resetPassword,
        sync: userSync
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
