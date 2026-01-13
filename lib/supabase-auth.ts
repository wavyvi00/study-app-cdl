/**
 * Supabase Authentication Helpers (Cross-Platform)
 * Provides auth functions using the existing Supabase client.
 * Works on iOS, Android, and Web.
 */
import { supabase } from './supabase';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

export interface AuthResult {
    user: User | null;
    session: Session | null;
    error: string | null;
}

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (email: string, password: string): Promise<AuthResult> => {
    if (!supabase) {
        return { user: null, session: null, error: 'Supabase client not configured' };
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return { user: null, session: null, error: error.message };
        }

        // Handle case where user already exists but email confirmation is disabled
        // Supabase returns user but no session in this case
        if (data.user && !data.session) {
            // Check if this is an existing user (identities array is empty for unconfirmed duplicates)
            if (data.user.identities && data.user.identities.length === 0) {
                return { user: null, session: null, error: 'An account with this email already exists. Please sign in.' };
            }
        }

        return {
            user: data.user,
            session: data.session,
            error: null,
        };
    } catch (err: any) {
        return { user: null, session: null, error: err.message || 'Signup failed' };
    }
};

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email: string, password: string): Promise<AuthResult> => {
    if (!supabase) {
        return { user: null, session: null, error: 'Supabase client not configured' };
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { user: null, session: null, error: error.message };
        }

        return {
            user: data.user,
            session: data.session,
            error: null,
        };
    } catch (err: any) {
        return { user: null, session: null, error: err.message || 'Login failed' };
    }
};

/**
 * Sign out current user
 */
export const signOut = async (): Promise<{ error: string | null }> => {
    if (!supabase) {
        return { error: 'Supabase client not configured' };
    }

    try {
        const { error } = await supabase.auth.signOut();
        return { error: error?.message || null };
    } catch (err: any) {
        return { error: err.message || 'Signout failed' };
    }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email: string): Promise<{ error: string | null }> => {
    if (!supabase) {
        return { error: 'Supabase client not configured' };
    }

    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: typeof window !== 'undefined'
                ? `${window.location.origin}/auth/reset-password`
                : undefined,
        });
        return { error: error?.message || null };
    } catch (err: any) {
        return { error: err.message || 'Password reset failed' };
    }
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (): Promise<User | null> => {
    if (!supabase) {
        return null;
    }

    try {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    } catch {
        return null;
    }
};

/**
 * Get current session
 */
export const getCurrentSession = async (): Promise<Session | null> => {
    if (!supabase) {
        return null;
    }

    try {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    } catch {
        return null;
    }
};

/**
 * Listen for auth state changes
 */
export const onAuthStateChange = (
    callback: (event: AuthChangeEvent, session: Session | null) => void
): (() => void) => {
    if (!supabase) {
        return () => { }; // No-op unsubscribe
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return () => subscription.unsubscribe();
};

/**
 * Sign in with Google (OAuth)
 */
export const signInWithGoogle = async (): Promise<{ data: any; error: string | null }> => {
    if (!supabase) {
        return { data: null, error: 'Supabase client not configured' };
    }

    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                // For mobile, you would typically use makeRedirectUri from expo-auth-session
                // For now, we rely on Supabase's default behavior or configured redirect URLs
                redirectTo: typeof window !== 'undefined'
                    ? window.location.origin
                    : undefined, // Add deep link scheme here for mobile later if needed
            },
        });

        if (error) {
            return { data: null, error: error.message };
        }

        return { data, error: null };
    } catch (err: any) {
        return { data: null, error: err.message || 'Google sign in failed' };
    }
};
