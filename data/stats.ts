import AsyncStorage from '@react-native-async-storage/async-storage';

// Stats for a single topic
export interface TopicStats {
    examAttempts: number;
    averageScore: number;
    questionsAnswered: number;
    studyTimeMinutes: number;
    lastStudySectionIndex?: number;
}

export const INITIAL_TOPIC_STATS: TopicStats = {
    examAttempts: 0,
    averageScore: 0,
    questionsAnswered: 0,
    studyTimeMinutes: 0,
};

// Global user stats including per-topic breakdown
export interface UserStats {
    examAttempts: number;
    averageScore: number;
    questionsAnswered: number;
    studyTimeMinutes: number;
    streakDays: number;
    lastStudyDate: string | null;
    topicStats: Record<string, TopicStats>;
    unlockedAchievements: string[];
    lastTopicId: string | null;
    lastActivityMode: 'study' | 'practice' | 'exam' | null;
    currentPracticeSession?: PracticeSessionState | null;
}

const STATS_STORAGE_KEY = 'user_stats_v1';

export const INITIAL_STATS: UserStats = {
    examAttempts: 0,
    averageScore: 0,
    questionsAnswered: 0,
    studyTimeMinutes: 0,
    streakDays: 0,
    lastStudyDate: null,
    topicStats: {},
    unlockedAchievements: [],
    lastTopicId: null,
    lastActivityMode: null,
    currentPracticeSession: null,
};

// Load stats from local storage
export const loadStats = async (): Promise<UserStats> => {
    try {
        const jsonValue = await AsyncStorage.getItem(STATS_STORAGE_KEY);
        if (jsonValue != null) {
            const parsed = JSON.parse(jsonValue);
            // Ensure unlockedAchievements exists for older data
            if (!parsed.unlockedAchievements) {
                parsed.unlockedAchievements = [];
            }
            return parsed;
        }
        return INITIAL_STATS;
    } catch (e) {
        console.error('Failed to load stats', e);
        return INITIAL_STATS;
    }
};

// Save stats to local storage
export const saveStats = async (stats: UserStats) => {
    try {
        const jsonValue = JSON.stringify(stats);
        await AsyncStorage.setItem(STATS_STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error('Failed to save stats', e);
    }
};

// --- Practice Session Persistence ---

export interface PracticeSessionState {
    topicId: string;
    questionIds: string[];
    currentIndex: number;
    score: number;
    wrongAnswers: Array<{ questionId: string; selectedIndex: number }>;
    startTime: number;
}

export const savePracticeSession = async (session: PracticeSessionState) => {
    const current = await loadStats();
    const nextStats: UserStats = {
        ...current,
        currentPracticeSession: session,
        lastTopicId: session.topicId,
        lastActivityMode: 'practice'
    };
    await saveStats(nextStats);
    return nextStats;
};

export const clearPracticeSession = async () => {
    const current = await loadStats();
    const nextStats: UserStats = {
        ...current,
        currentPracticeSession: null,
        // Don't clear lastActivityMode/TopicId because we want to show "Start New" or just generic label
        // Actually, if we clear session, we can't "Continue" it.
        // So index.tsx will fall back to "Start Practice" or just normal Study button behavior?
        // No, user requirement: "If user last stopped during Practice... resume".
        // If session is cleared (finished), then we shouldn't show "Continue Practice" probably?
        // Or we show "Start Practice".
        // But for this specific function, we just clear the *active* session data.
    };
    await saveStats(nextStats);
    return nextStats;
};


// Helper to update specific stats
export const updateStats = async (newStats: Partial<UserStats>) => {
    const currentStats = await loadStats();

    // Logic for streak calculation if studyTime is updated
    let updatedStreak = currentStats.streakDays;
    let updatedLastStudyDate = currentStats.lastStudyDate;

    if (newStats.studyTimeMinutes && newStats.studyTimeMinutes > currentStats.studyTimeMinutes) {
        const today = new Date().toISOString().split('T')[0];
        if (currentStats.lastStudyDate !== today) {
            // Check if last study date was yesterday for streak
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (currentStats.lastStudyDate === yesterdayStr) {
                updatedStreak += 1;
            } else {
                updatedStreak = 1; // Reset or start new streak
            }
            updatedLastStudyDate = today;
        }
    }

    const updatedStats = {
        ...currentStats,
        ...newStats,
        streakDays: updatedStreak,
        lastStudyDate: updatedLastStudyDate
    };

    await saveStats(updatedStats);
    return updatedStats;
};

import { checkAchievements, Achievement } from './achievements';

// Helper: Update stats after a quiz/exam
export const recordQuizResult = async (
    scorePercentage: number,
    questionCount: number,
    isExam: boolean,
    topicId?: string
): Promise<{ stats: UserStats; newAchievements: Achievement[] }> => {
    const current = await loadStats();

    // Clear active session if we are finishing one
    // Note: Caller might handle this, but safe to ensure here if it matches
    let currentSession = current.currentPracticeSession;
    if (currentSession && currentSession.topicId === topicId && !isExam) {
        currentSession = null;
    }

    // --- Update Global Stats ---
    const newTotalQuestions = current.questionsAnswered + questionCount;
    const oldWeight = current.questionsAnswered;
    const currentTotalScoreMass = current.averageScore * oldWeight;
    const newScoreMass = scorePercentage * questionCount;
    const newAverage = newTotalQuestions > 0
        ? Math.round((currentTotalScoreMass + newScoreMass) / newTotalQuestions)
        : 0;

    const updates: Partial<UserStats> = {
        questionsAnswered: newTotalQuestions,
        averageScore: newAverage,
        studyTimeMinutes: current.studyTimeMinutes + Math.ceil(questionCount * 1.0),
        currentPracticeSession: currentSession // Save the cleared session
    };

    if (isExam) {
        updates.examAttempts = current.examAttempts + 1;
    }

    // --- Update Per-Topic Stats ---
    if (topicId) {
        const currentTopicStats = current.topicStats[topicId] || { ...INITIAL_TOPIC_STATS };
        const topicNewTotal = currentTopicStats.questionsAnswered + questionCount;
        const topicOldWeight = currentTopicStats.questionsAnswered;
        const topicScoreMass = currentTopicStats.averageScore * topicOldWeight;
        const topicNewScoreMass = scorePercentage * questionCount;
        const topicNewAverage = topicNewTotal > 0
            ? Math.round((topicScoreMass + topicNewScoreMass) / topicNewTotal)
            : 0;

        const updatedTopicStats: TopicStats = {
            questionsAnswered: topicNewTotal,
            averageScore: topicNewAverage,
            studyTimeMinutes: currentTopicStats.studyTimeMinutes + Math.ceil(questionCount * 1.0),
            examAttempts: isExam ? currentTopicStats.examAttempts + 1 : currentTopicStats.examAttempts,
        };

        updates.topicStats = {
            ...current.topicStats,
            [topicId]: updatedTopicStats,
        };
    }

    // First update the basic stats to calculate achievements against the NEW state
    // We can't call updateStats yet because we need to merge streak logic first or just do it in memory.
    // For simplicity, let's construct the "next" state in memory to check achievements.

    // Reuse the logic from updateStats for streak just to get an accurate "next" object for checking
    let updatedStreak = current.streakDays;
    if (updates.studyTimeMinutes && updates.studyTimeMinutes > current.studyTimeMinutes) {
        const today = new Date().toISOString().split('T')[0];
        if (current.lastStudyDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            if (current.lastStudyDate === yesterdayStr) {
                updatedStreak += 1;
            } else {
                updatedStreak = 1;
            }
        }
    }

    // Construct the hypothetical new stats object
    const nextStats: UserStats = {
        ...current,
        ...updates,
        streakDays: updatedStreak,
        lastTopicId: topicId || current.lastTopicId,
        // we don't strictly need to update lastStudyDate for the check, but good for consistency
        lastStudyDate: (updates.studyTimeMinutes && updates.studyTimeMinutes > current.studyTimeMinutes)
            ? new Date().toISOString().split('T')[0]
            : current.lastStudyDate
    };

    // Check for new achievements
    const newAchievements = checkAchievements(nextStats, current.unlockedAchievements || []);

    if (newAchievements.length > 0) {
        nextStats.unlockedAchievements = [
            ...(current.unlockedAchievements || []),
            ...newAchievements.map(a => a.id)
        ];
    }

    // Save properly
    await saveStats(nextStats);

    return { stats: nextStats, newAchievements };
};

// Track the start of an activity to ensure "Continue Card" appears immediately
export const logActivityStart = async (topicId: string, mode: 'study' | 'practice' | 'exam') => {
    const current = await loadStats();
    const nextStats = { ...current, lastTopicId: topicId, lastActivityMode: mode };
    await saveStats(nextStats);
    return nextStats;
};

// Save reading position in Study Guide
export const saveStudyProgress = async (topicId: string, sectionIndex: number) => {
    const current = await loadStats();
    const currentTopicStats = current.topicStats[topicId] || INITIAL_TOPIC_STATS;

    const nextStats = {
        ...current,
        topicStats: {
            ...current.topicStats,
            [topicId]: {
                ...currentTopicStats,
                lastStudySectionIndex: sectionIndex
            }
        },
        lastTopicId: topicId,
        lastActivityMode: 'study' as const
    };

    await saveStats(nextStats);
    return nextStats;
};

// Reset all stats to initial values
export const resetStats = async (): Promise<UserStats> => {
    await saveStats(INITIAL_STATS);
    return INITIAL_STATS;
};
