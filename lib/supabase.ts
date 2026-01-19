import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../constants/SupabaseCredentials';

// Safely get environment variables with fallbacks to prevent crashes
const supabaseUrl = SUPABASE_URL;
const supabaseAnonKey = SUPABASE_ANON_KEY;

// Validate config before creating client to prevent crashes
const isValidConfig = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.length > 0 && supabaseAnonKey.length > 0);

if (!isValidConfig) {
    console.warn('[Supabase] Credentials missing - check constants/SupabaseCredentials.ts');
}

// Create client only if valid config, otherwise null
export const supabase: SupabaseClient | null = isValidConfig
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Database types for questions
export interface DbQuestion {
    id: string;
    topic_id: string;
    text: string;
    options: string[];
    correct_index: number;
    explanation: string | null;
    created_at: string;
}

// Fetch questions for a specific topic
export async function fetchQuestions(topicId: string): Promise<DbQuestion[]> {
    if (!supabase) return [];

    try {
        const { data, error } = await supabase
            .from('questions')
            .select('*')
            .eq('topic_id', topicId)
            .order('created_at', { ascending: true });

        if (error) {
            // RLS Policy Violation (e.g. Free user trying to fetch premium questions)
            // PostgREST typically returns an empty array [] if RLS hides rows, 
            // but if we get an explicit permission error, handle it.
            console.warn('[Supabase] Access denied or error fetching questions:', error.message);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('[Supabase] Exception fetching questions:', error);
        return [];
    }
}

// Fetch all questions
export async function fetchAllQuestions(): Promise<DbQuestion[]> {
    if (!supabase) return [];

    try {
        const { data, error } = await supabase
            .from('questions')
            .select('*')
            .order('topic_id', { ascending: true });

        if (error) {
            console.error('[Supabase] Error fetching all questions:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('[Supabase] Exception fetching all questions:', error);
        return [];
    }
}
