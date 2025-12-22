import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchQuestions, DbQuestion } from '../lib/supabase';
import { TOPICS, Question, Topic } from '../data/mock';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const QUESTIONS_CACHE_KEY = 'cached_all_questions';

export function QuestionsProvider({ children }: { children: ReactNode }) {
    const [supabaseQuestions, setSupabaseQuestions] = useState<Map<string, Question[]>>(new Map());
    const [isLoading, setIsLoading] = useState(true);

    const loadQuestions = async () => {
        setIsLoading(true);
        try {
            if (__DEV__) console.log('Attempting to fetch questions from Supabase...');

            // 1. Try fetching from Supabase (Parallelized)
            const questionsMap = new Map<string, Question[]>();
            let hasRemoteData = false;

            const results = await Promise.all(
                TOPICS.map(async (topic) => {
                    const dbQuestions = await fetchQuestions(topic.id);
                    return { id: topic.id, questions: dbQuestions };
                })
            );

            results.forEach(({ id, questions }) => {
                if (questions.length > 0) {
                    questionsMap.set(id, questions.map(dbToAppQuestion));
                    hasRemoteData = true;
                }
            });

            if (hasRemoteData) {
                // Success! Set state and cache the data
                if (__DEV__) console.log('Supabase fetch successful. Updating cache.');
                setSupabaseQuestions(questionsMap);

                // Convert Map to array of entries for JSON stringify
                const cacheData = Array.from(questionsMap.entries());
                await AsyncStorage.setItem(QUESTIONS_CACHE_KEY, JSON.stringify(cacheData));
            } else {
                // If we got here, it means we connected but found no data? 
                // Or handle based on specific needs. For now, treat as failure to fallback to cache if meaningful.
                throw new Error('No remote data found');
            }

        } catch (error) {
            console.warn('Offline or Supabase error. Falling back to cache:', error);

            try {
                // 2. Fallback to Cache
                const cachedJson = await AsyncStorage.getItem(QUESTIONS_CACHE_KEY);
                if (cachedJson) {
                    const cacheEntries = JSON.parse(cachedJson);
                    const cachedMap = new Map<string, Question[]>(cacheEntries);

                    if (cachedMap.size > 0) {
                        if (__DEV__) console.log('Loaded questions from Async Storage cache.');
                        setSupabaseQuestions(cachedMap);
                    }
                } else {
                    if (__DEV__) console.log('No cache found. Using local mock data.');
                }
            } catch (cacheError) {
                console.error('Failed to load cache:', cacheError);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    // Get questions for a topic - use Supabase/Cache if available, fallback to local
    const getQuestions = (topicId: string): Question[] => {
        const supabaseQ = supabaseQuestions.get(topicId);
        if (supabaseQ && supabaseQ.length > 0) {
            return supabaseQ;
        }

        // 3. Fallback to local data (Ultimate safety net)
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
