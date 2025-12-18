import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchQuestions, DbQuestion } from '../lib/supabase';
import { TOPICS, Question, Topic } from '../data/mock';

interface QuestionsContextType {
    getQuestions: (topicId: string) => Question[];
    topics: Topic[];
    isLoading: boolean;
    refreshQuestions: () => Promise<void>;
}

const QuestionsContext = createContext<QuestionsContextType>({
    getQuestions: () => [],
    topics: TOPICS,
    isLoading: true,
    refreshQuestions: async () => { },
});

export const useQuestions = () => useContext(QuestionsContext);

// Convert database question to app question format
function dbToAppQuestion(dbQ: DbQuestion): Question {
    return {
        id: dbQ.id,
        text: dbQ.text,
        options: dbQ.options,
        correctIndex: dbQ.correct_index,
        explanation: dbQ.explanation || undefined,
    };
}

export function QuestionsProvider({ children }: { children: ReactNode }) {
    const [supabaseQuestions, setSupabaseQuestions] = useState<Map<string, Question[]>>(new Map());
    const [isLoading, setIsLoading] = useState(true);

    const loadQuestions = async () => {
        setIsLoading(true);
        try {
            // Load questions for each topic
            const questionsMap = new Map<string, Question[]>();

            for (const topic of TOPICS) {
                const dbQuestions = await fetchQuestions(topic.id);
                if (dbQuestions.length > 0) {
                    questionsMap.set(topic.id, dbQuestions.map(dbToAppQuestion));
                }
            }

            setSupabaseQuestions(questionsMap);
        } catch (error) {
            console.error('Error loading questions from Supabase:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    // Get questions for a topic - use Supabase if available, fallback to local
    const getQuestions = (topicId: string): Question[] => {
        const supabaseQ = supabaseQuestions.get(topicId);
        if (supabaseQ && supabaseQ.length > 0) {
            return supabaseQ;
        }

        // Fallback to local data
        const topic = TOPICS.find(t => t.id === topicId);
        return topic?.questions || [];
    };

    // Get topics with updated question counts
    const topics: Topic[] = TOPICS.map(topic => {
        const questions = getQuestions(topic.id);
        return {
            ...topic,
            questions,
            description: `${questions.length} questions available`,
        };
    });

    return (
        <QuestionsContext.Provider value={{ getQuestions, topics, isLoading, refreshQuestions: loadQuestions }}>
            {children}
        </QuestionsContext.Provider>
    );
}
