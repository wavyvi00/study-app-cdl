import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserStats {
    examAttempts: number;
    averageScore: number;
    questionsAnswered: number;
    studyTimeMinutes: number;
    streakDays: number;
    lastStudyDate: string | null;
}

const STATS_STORAGE_KEY = 'user_stats_v1';

export const INITIAL_STATS: UserStats = {
    examAttempts: 0,
    averageScore: 0,
    questionsAnswered: 0,
    studyTimeMinutes: 0,
    streakDays: 0,
    lastStudyDate: null,
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

// Helper: Update stats after a quiz/exam
export const recordQuizResult = async (scorePercentage: number, questionCount: number, isExam: boolean) => {
    const current = await loadStats();

    const newTotalQuestions = current.questionsAnswered + questionCount;
    // Calculate new running average
    // Heuristic: Weighted average based on total questions isn't perfectly stored, 
    // but we can approximate or just keep a simple moving average.
    // Better simple approach: New Avg = ((Old Avg * Old Exams) + New Score) / (Old Exams + 1)
    // Only updating average score for Exams to be meaningful? Or all quizzes?
    // Let's assume average score tracks EXAM performance mainly, or blended.
    // Let's do blended for now.

    // We don't track total quizzes, so let's stick to a simple weighted moving average 
    // or just average of last N? Without history, we approximate:
    // NewAvg = (OldAvg * 0.9) + (NewScore * 0.1) for smoothing? 
    // OR: NewAvg = ((OldAvg * TotalQuestions) + (Score * Questions)) / NewTotal
    // Let's try the weighted by questions approach for accuracy over time.
    const oldWeight = current.questionsAnswered;
    const currentTotalScoreMass = current.averageScore * oldWeight;
    const newScoreMass = scorePercentage * questionCount;
    const newAverage = Math.round((currentTotalScoreMass + newScoreMass) / newTotalQuestions);

    const updates: Partial<UserStats> = {
        questionsAnswered: newTotalQuestions,
        averageScore: newAverage,
        // Add 5 mins study time per quiz roughly? Or pass actual time?
        // Let's assume 1 min per question for now as a heuristic if not passed.
        studyTimeMinutes: current.studyTimeMinutes + Math.ceil(questionCount * 1.0),
    };

    if (isExam) {
        updates.examAttempts = current.examAttempts + 1;
    }

    return await updateStats(updates);
};
