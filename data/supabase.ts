import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PendingEmail {
    email: string;
    timestamp: number;
    synced: boolean;
}

const PENDING_EMAILS_KEY = 'pending_emails';
const SUBSCRIPTION_DISMISSED_KEY = 'subscription_popup_dismissed';

/**
 * Mark the subscription popup as dismissed
 */
export async function markSubscriptionDismissed(): Promise<void> {
    try {
        await AsyncStorage.setItem(SUBSCRIPTION_DISMISSED_KEY, 'true');
    } catch (error) {
        console.error('Error marking subscription dismissed:', error);
    }
}

/**
 * Check if the subscription popup has been dismissed
 */
export async function isSubscriptionDismissed(): Promise<boolean> {
    try {
        const value = await AsyncStorage.getItem(SUBSCRIPTION_DISMISSED_KEY);
        return value === 'true';
    } catch (error) {
        console.error('Error checking subscription dismissal:', error);
        return false;
    }
}

/**
 * Save email locally for later sync to Supabase
 */
export async function saveEmailLocally(email: string): Promise<void> {
    try {
        const pending = await getPendingEmails();

        // Check if email already exists
        const exists = pending.some(p => p.email === email);
        if (exists) {
            return; // Don't add duplicates
        }

        const newEmail: PendingEmail = {
            email,
            timestamp: Date.now(),
            synced: false,
        };

        pending.push(newEmail);
        await AsyncStorage.setItem(PENDING_EMAILS_KEY, JSON.stringify(pending));
    } catch (error) {
        console.error('Error saving email locally:', error);
        throw error;
    }
}

/**
 * Get all pending emails from local storage
 */
export async function getPendingEmails(): Promise<PendingEmail[]> {
    try {
        const data = await AsyncStorage.getItem(PENDING_EMAILS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error getting pending emails:', error);
        return [];
    }
}

/**
 * Replace the pending emails list (used to restore after a reset).
 */
export async function setPendingEmails(pending: PendingEmail[]): Promise<void> {
    try {
        await AsyncStorage.setItem(PENDING_EMAILS_KEY, JSON.stringify(pending));
    } catch (error) {
        console.error('Error setting pending emails:', error);
        throw error;
    }
}

/**
 * Mark an email as synced
 */
export async function markEmailSynced(email: string): Promise<void> {
    try {
        const pending = await getPendingEmails();
        const updated = pending.map(p =>
            p.email === email ? { ...p, synced: true } : p
        );
        await AsyncStorage.setItem(PENDING_EMAILS_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error('Error marking email as synced:', error);
        throw error;
    }
}

/**
 * Insert email into Supabase email_subscribers table
 */
async function insertEmailToSupabase(email: string): Promise<boolean> {
    try {
        const { supabase } = await import('../lib/supabase');

        if (!supabase) {
            console.warn('Supabase client not initialized (missing credentials?)');
            return false;
        }

        // Insert email, ignore if duplicate (handled by unique constraint)
        const { error } = await supabase
            .from('email_subscribers')
            .insert([{ email }]);

        if (error) {
            // If error is duplicate key, consider it success (already subscribed)
            if (error.code === '23505') {
                if (__DEV__) console.log('Email already subscribed');
                return true;
            }
            console.error('Supabase insert error:', error);
            return false;
        }

        if (__DEV__) console.log('Successfully inserted email to Supabase');
        return true;
    } catch (error) {
        console.error('Error inserting to Supabase:', error);
        return false;
    }
}

/**
 * Sync a single email to Supabase
 */
export async function syncEmailToSupabase(email: string): Promise<boolean> {
    const success = await insertEmailToSupabase(email);
    if (success) {
        await markEmailSynced(email);
    }
    return success;
}

/**
 * Sync all pending emails to Supabase
 * Returns number of successfully synced emails
 */
export async function syncPendingEmails(): Promise<number> {
    try {
        const pending = await getPendingEmails();
        const unsynced = pending.filter(p => !p.synced);

        if (unsynced.length === 0) {
            return 0;
        }

        let syncedCount = 0;
        for (const item of unsynced) {
            const success = await syncEmailToSupabase(item.email);
            if (success) {
                syncedCount++;
            }
        }

        return syncedCount;
    } catch (error) {
        console.error('Error syncing pending emails:', error);
        return 0;
    }
}
