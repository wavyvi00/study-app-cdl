import { syncPendingEmails } from '../data/supabase';

let isSyncing = false;

/**
 * Start background email sync process
 * Non-blocking and prevents concurrent syncs
 */
export async function startEmailSync(): Promise<void> {
    if (isSyncing) {
        console.log('Email sync already in progress, skipping...');
        return;
    }

    isSyncing = true;
    try {
        const syncedCount = await syncPendingEmails();
        if (syncedCount > 0) {
            console.log(`Successfully synced ${syncedCount} email(s) to Supabase`);
        }
    } catch (error) {
        console.error('Email sync failed:', error);
    } finally {
        isSyncing = false;
    }
}
