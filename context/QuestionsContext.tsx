import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { fetchQuestions, DbQuestion } from '../lib/supabase';
import { Question, Topic, getTopics, getQuestionsByLocale } from '../data/mock';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalization } from './LocalizationContext';

interface QuestionsContextType {
    getQuestions: (topicId: string) => Question[];
    topics: Topic[];
    isLoading: boolean;
    refreshQuestions: () => Promise<void>;
}

const QuestionsContext = createContext<QuestionsContextType>({
    getQuestions: () => [],
    topics: [],
    isLoading: true,
    refreshQuestions: async () => { },
});

export const useQuestions = () => useContext(QuestionsContext);

// Map topic IDs to question keys
const TOPIC_TO_QUESTION_KEY: Record<string, string> = {
    'general-knowledge': 'ALL_GK',
    'combination-vehicles': 'COMBINATION',
    'air-brakes': 'AIR_BRAKES',
    'hazmat': 'HAZMAT',
    'passenger': 'PASSENGER',
    'doubles-triples': 'DOUBLES_TRIPLES',
    'tanks': 'TANKS',
    'school-bus': 'SCHOOL_BUS',
};

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

const QUESTIONS_CACHE_KEY = 'cached_all_questions_en';

export function QuestionsProvider({ children }: { children: ReactNode }) {
    const { locale } = useLocalization();
    // Store English questions from Supabase (for English mode)
    const [supabaseQuestions, setSupabaseQuestions] = useState<Map<string, Question[]>>(new Map());
    const [isLoading, setIsLoading] = useState(true);

    // Get pre-translated questions for current locale
    const localTranslatedQuestions = useMemo(() => {
        try {
            const questions = getQuestionsByLocale(locale);
            if (__DEV__) {
                const count = Object.values(questions).flat().length;
                if (__DEV__) console.log(`Loaded ${count} pre-translated questions for locale: ${locale}`);
            }
            return questions;
        } catch (error) {
            console.error('Failed to load translated questions:', error);
            return getQuestionsByLocale('en');
        }
    }, [locale]);

    const loadQuestions = async () => {
        setIsLoading(true);
        try {
            if (__DEV__) console.log('Attempting to fetch questions from Supabase...');

            // Try fetching from Supabase
            const baseTopics = getTopics('en');
            const questionsMap = new Map<string, Question[]>();
            let hasRemoteData = false;

            const results = await Promise.all(
                baseTopics.map(async (topic) => {
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
                if (__DEV__) console.log('Supabase fetch successful.');
                setSupabaseQuestions(questionsMap);

                // Cache for offline use
                const cacheData = Array.from(questionsMap.entries());
                await AsyncStorage.setItem(QUESTIONS_CACHE_KEY, JSON.stringify(cacheData));
            } else {
                throw new Error('No remote data found');
            }

        } catch (error) {
            console.warn('Offline or Supabase error. Falling back to cache:', error);

            try {
                const cachedJson = await AsyncStorage.getItem(QUESTIONS_CACHE_KEY);
                if (cachedJson) {
                    const cacheEntries = JSON.parse(cachedJson);
                    const cachedMap = new Map<string, Question[]>(cacheEntries);
                    if (cachedMap.size > 0) {
                        if (__DEV__) console.log('Loaded from cache.');
                        setSupabaseQuestions(cachedMap);
                    }
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

    // Get localized topics
    const currentTopics = useMemo(() => getTopics(locale), [locale]);

    // Get questions for a topic
    // IMPORTANT: For non-English locales, ALWAYS use pre-translated local files
    const getQuestions = useCallback((topicId: string): Question[] => {
        // For non-English locales, use pre-translated local files
        if (locale !== 'en') {
            const questionKey = TOPIC_TO_QUESTION_KEY[topicId];
            if (questionKey && localTranslatedQuestions[questionKey]) {
                return localTranslatedQuestions[questionKey] as Question[];
            }
            // Fallback to topic questions from getTopics
            const topic = currentTopics.find(t => t.id === topicId);
            return topic?.questions || [];
        }

        // For English, try Supabase first, then fallback to local
        const supabaseQ = supabaseQuestions.get(topicId);
        if (supabaseQ && supabaseQ.length > 0) {
            return supabaseQ;
        }

        // Fallback to local data
        const topic = currentTopics.find(t => t.id === topicId);
        return topic?.questions || [];
    }, [locale, supabaseQuestions, localTranslatedQuestions, currentTopics]);

    // Get topics with updated question counts
    const topics: Topic[] = useMemo(() => {
        return currentTopics.map(topic => {
            const questions = getQuestions(topic.id);
            return {
                ...topic,
                questions,
                description: `${questions.length} questions available`,
            };
        });
    }, [currentTopics, getQuestions]);

    return (
        <QuestionsContext.Provider value={{ getQuestions, topics, isLoading, refreshQuestions: loadQuestions }}>
            {children}
        </QuestionsContext.Provider>
    );
}
