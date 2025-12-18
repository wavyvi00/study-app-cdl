import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tdemormabiwkhshgnahn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkZW1vcm1hYml3a2hzaGduYWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4OTMxNzgsImV4cCI6MjA4MTQ2OTE3OH0.vM3RMRSh2Rvp2by_BceQc2Nth7C9kpW_gEdGLIyyDH4';

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
