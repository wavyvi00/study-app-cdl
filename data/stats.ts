
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkAchievements, Achievement } from './achievements';
import { Platform } from 'react-native';

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
    questionsAnsweredTotal: number; // Lifetime total for paywall tracking (never resets)
    studyTimeMinutes: number;
    streakDays: number;
    lastStudyDate: string | null;
    topicStats: Record<string, TopicStats>;
    unlockedAchievements: string[];
    lastTopicId: string | null;
    lastActivityMode: 'study' | 'practice' | 'exam' | null;
    currentPracticeSession?: PracticeSessionState | null;
    hasDismissedEmailPrompt?: boolean;
    username?: string;
    cdlClass?: 'Class A' | 'Class B';
    avatarId?: string;
}

// Storage Keys
const GUEST_STATS_KEY = 'user_stats_v1';
const getUserKey = (userId?: string | null) => userId ? `user_stats_${userId}` : GUEST_STATS_KEY;

export const INITIAL_STATS: UserStats = {
    examAttempts: 0,
    averageScore: 0,
    questionsAnswered: 0,
    questionsAnsweredTotal: 0, // Lifetime total for paywall
    studyTimeMinutes: 0,
    streakDays: 0,
    lastStudyDate: null,
    topicStats: {},
    unlockedAchievements: [],
    lastTopicId: null,
    lastActivityMode: null,
    currentPracticeSession: null,
    hasDismissedEmailPrompt: false,
    username: undefined,
    cdlClass: 'Class A',
    avatarId: 'truck',
};

// Load stats from local storage with optional userId
export const loadStats = async (userId?: string | null): Promise<UserStats> => {
    try {
        const key = getUserKey(userId);
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue != null) {
            const parsed = JSON.parse(jsonValue);
            // Ensure required fields exist for older data
            if (!parsed.unlockedAchievements) {
                parsed.unlockedAchievements = [];
            }
            // Ensure topicStats is always an object (fixes crash for older data)
            if (!parsed.topicStats || typeof parsed.topicStats !== 'object') {
                parsed.topicStats = {};
            }
            return parsed;
        }
        return INITIAL_STATS;
    } catch (e) {
        console.error('Failed to load stats', e);
        return INITIAL_STATS;
    }
};

// Save stats to local storage with optional userId
export const saveStats = async (stats: UserStats, userId?: string | null) => {
    try {
        const key = getUserKey(userId);
        const jsonValue = JSON.stringify(stats);
        await AsyncStorage.setItem(key, jsonValue);
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

export const savePracticeSession = async (session: PracticeSessionState, userId?: string | null) => {
    const current = await loadStats(userId);
    const nextStats: UserStats = {
        ...current,
        currentPracticeSession: session,
        lastTopicId: session.topicId,
        lastActivityMode: 'practice'
    };
    await saveStats(nextStats, userId);
    return nextStats;
};

export const clearPracticeSession = async (userId?: string | null) => {
    const current = await loadStats(userId);
    const nextStats: UserStats = {
        ...current,
        currentPracticeSession: null,
    };
    await saveStats(nextStats, userId);
    return nextStats;
};


// Helper to update specific stats
export const updateStats = async (newStats: Partial<UserStats>, userId?: string | null) => {
    const currentStats = await loadStats(userId);

    // Logic for streak calculation if studyTime is updated
    let updatedStreak = currentStats.streakDays;
    let updatedLastStudyDate = currentStats.lastStudyDate;

    if (newStats.studyTimeMinutes && newStats.studyTimeMinutes > currentStats.studyTimeMinutes) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const today = `${year}-${month}-${day}`;

        if (currentStats.lastStudyDate !== today) {
            // Check if last study date was yesterday for streak
            const yesterdayDate = new Date();
            yesterdayDate.setDate(yesterdayDate.getDate() - 1);
            const yYear = yesterdayDate.getFullYear();
            const yMonth = String(yesterdayDate.getMonth() + 1).padStart(2, '0');
            const yDay = String(yesterdayDate.getDate()).padStart(2, '0');
            const yesterdayStr = `${yYear}-${yMonth}-${yDay}`;

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

    await saveStats(updatedStats, userId);
    return updatedStats;
};

// Helper: Update stats after a quiz/exam
export const recordQuizResult = async (
    scorePercentage: number,
    questionCount: number,
    isExam: boolean,
    topicId?: string,
    userId?: string | null
): Promise<{ stats: UserStats; newAchievements: Achievement[] }> => {
    const current = await loadStats(userId);

    // Clear active session if we are finishing one
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
        questionsAnsweredTotal: (current.questionsAnsweredTotal || 0) + questionCount, // Lifetime total for paywall
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

    // Construct the hypothetical new stats object
    const nextStats: UserStats = {
        ...current,
        ...updates,
        streakDays: current.streakDays, // Handled implicitly via updateStats typically, but fine here
        lastTopicId: topicId || current.lastTopicId,
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
    await saveStats(nextStats, userId);

    return { stats: nextStats, newAchievements };
};

// Track the start of an activity to ensure "Continue Card" appears immediately
export const logActivityStart = async (topicId: string, mode: 'study' | 'practice' | 'exam', userId?: string | null) => {
    const current = await loadStats(userId);
    const nextStats = { ...current, lastTopicId: topicId, lastActivityMode: mode };
    await saveStats(nextStats, userId);
    return nextStats;
};

// Save reading position in Study Guide
export const saveStudyProgress = async (topicId: string, sectionIndex: number, userId?: string | null) => {
    const current = await loadStats(userId);
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

    await saveStats(nextStats, userId);
    return nextStats;
};

// Reset all stats to initial values
export const resetStats = async (userId?: string | null): Promise<UserStats> => {
    const current = await loadStats(userId);
    const nextStats: UserStats = {
        ...INITIAL_STATS,
        unlockedAchievements: current.unlockedAchievements || [],
    };
    await saveStats(nextStats, userId);
    return nextStats;
};


/**
 * Clear all local app data (stats, cache, and web storage).
 * WARNING: This clears ALL keys, meaning it affects all users if they share device.
 * But AsyncStorage doesn't support "clear by prefix" natively well, so we might want to just remove the specific keys.
 */
export const resetAllAppData = async (): Promise<UserStats> => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        if (keys.length > 0) {
            await AsyncStorage.multiRemove(keys);
        }

        if (Platform.OS === 'web') {
            try {
                localStorage.clear();
                sessionStorage.clear();
            } catch (e) {
                console.warn('Failed to clear web storage:', e);
            }
        }
        await AsyncStorage.clear();

        return INITIAL_STATS;
    } catch (error) {
        console.error('Error resetting app data:', error);
        return INITIAL_STATS;
    }
};

/**
 * Merge function to reconcile local stats with remote stats.
 * Strategy: Take the 'better' of the two (e.g. more questions answered, higher streak).
 */
export function mergeStats(local: UserStats, remote: UserStats): UserStats {
    // If one is clearly "empty" (e.g. initial), take the other.
    if (local.questionsAnswered === 0 && local.studyTimeMinutes === 0) return remote;
    if (remote.questionsAnswered === 0 && remote.studyTimeMinutes === 0) return local;

    // Union of achievements
    const allAchievements = Array.from(new Set([
        ...(local.unlockedAchievements || []),
        ...(remote.unlockedAchievements || [])
    ]));

    // Merge topic stats: take the one with more questions answered per topic
    const mergedTopics: Record<string, TopicStats> = { ...remote.topicStats };
    Object.keys(local.topicStats).forEach(topicId => {
        const lTopic = local.topicStats[topicId];
        const rTopic = mergedTopics[topicId];
        if (!rTopic || lTopic.questionsAnswered > rTopic.questionsAnswered) {
            mergedTopics[topicId] = lTopic;
        }
    });

    return {
        // Scalar Max-ing
        examAttempts: Math.max(local.examAttempts, remote.examAttempts),
        averageScore: local.questionsAnswered > remote.questionsAnswered ? local.averageScore : remote.averageScore, // biased towards more activity
        questionsAnswered: Math.max(local.questionsAnswered, remote.questionsAnswered),
        questionsAnsweredTotal: Math.max(local.questionsAnsweredTotal || 0, remote.questionsAnsweredTotal || 0),
        studyTimeMinutes: Math.max(local.studyTimeMinutes, remote.studyTimeMinutes),
        streakDays: Math.max(local.streakDays, remote.streakDays),

        lastStudyDate: (local.lastStudyDate && remote.lastStudyDate)
            ? (local.lastStudyDate > remote.lastStudyDate ? local.lastStudyDate : remote.lastStudyDate)
            : (local.lastStudyDate || remote.lastStudyDate),

        topicStats: mergedTopics,
        unlockedAchievements: allAchievements,

        lastTopicId: local.lastTopicId || remote.lastTopicId,
        lastActivityMode: local.lastActivityMode || remote.lastActivityMode,

        // Prefer local current session if active, else remote
        currentPracticeSession: local.currentPracticeSession || remote.currentPracticeSession,

        hasDismissedEmailPrompt: local.hasDismissedEmailPrompt || remote.hasDismissedEmailPrompt,

        // Profile fields - prefer remote if set, else local
        username: remote.username || local.username,
        cdlClass: remote.cdlClass || local.cdlClass,
        avatarId: remote.avatarId || local.avatarId,
    };
}
