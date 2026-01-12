
import { supabase } from './supabase';
import { UserStats, INITIAL_STATS } from '../data/stats';

/**
 * Fetch the latest stats and profile data from Supabase for a given user.
 */
export const pullStatsFromCloud = async (userId: string) => {
    if (!userId) return null;
    if (!supabase) return null;

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('[Sync] Error pulling stats:', error);
            return null;
        }

        return data;
    } catch (err) {
        console.error('[Sync] Unexpected error pulling stats:', err);
        return null;
    }
};

/**
 * Push the local stats and profile data to Supabase.
 * This effectively backs up the user's progress.
 */
export const pushStatsToCloud = async (userId: string, stats: UserStats) => {
    if (!userId) return { error: 'No user ID provided' };
    if (!supabase) return { error: 'Supabase client not configured' };

    try {
        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: userId,
                updated_at: new Date().toISOString(),
                username: stats.username,
                avatar_id: stats.avatarId,
                cdl_class: stats.cdlClass,
                stats: stats,
            });

        if (error) {
            console.error('[Sync] Error pushing stats:', error);
            return { error: error.message };
        }

        return { error: null };
    } catch (err: any) {
        console.error('[Sync] Unexpected error pushing stats:', err);
        return { error: err.message };
    }
};
