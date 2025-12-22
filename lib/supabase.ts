import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials missing from environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('topic_id', topicId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching questions:', error);
        return [];
    }

    return data || [];
}

// Fetch all questions
export async function fetchAllQuestions(): Promise<DbQuestion[]> {
    const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('topic_id', { ascending: true });

    if (error) {
        console.error('Error fetching all questions:', error);
        return [];
    }

    return data || [];
}
