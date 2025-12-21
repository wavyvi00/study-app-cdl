import AsyncStorage from '@react-native-async-storage/async-storage';

// Stats for a single topic
export interface TopicStats {
    examAttempts: number;
    averageScore: number;
    questionsAnswered: number;
    studyTimeMinutes: number;
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
};

// Load stats from local storage
export const loadStats = async (): Promise<UserStats> => {
    try {
        const jsonValue = await AsyncStorage.getItem(STATS_STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : INITIAL_STATS;
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

// Helper to update specific stats
export const updateStats = async (newStats: Partial<UserStats>) => {
    const currentStats = await loadStats();

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

    await saveStats(updatedStats);
    return updatedStats;
};

// Helper: Update stats after a quiz/exam
export const recordQuizResult = async (
    scorePercentage: number,
    questionCount: number,
    isExam: boolean,
    topicId?: string
) => {
    const current = await loadStats();

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

    return await updateStats(updates);
};

// Reset all stats to initial values
export const resetStats = async (): Promise<UserStats> => {
    await saveStats(INITIAL_STATS);
    return INITIAL_STATS;
};
