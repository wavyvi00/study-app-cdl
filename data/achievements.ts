import { UserStats } from './stats';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string; // FontAwesome name
    condition: (stats: UserStats) => boolean;
    getProgress: (stats: UserStats) => { current: number; target: number };
}

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'first_steps',
        title: 'First Steps',
        description: 'Answer 10 questions',
        icon: 'flag',
        condition: (stats) => stats.questionsAnswered >= 10,
        getProgress: (stats) => ({ current: Math.min(stats.questionsAnswered, 10), target: 10 }),
    },
    {
        id: 'dedicated_learner',
        title: 'Dedicated Learner',
        description: 'Answer 100 questions',
        icon: 'book',
        condition: (stats) => stats.questionsAnswered >= 100,
        getProgress: (stats) => ({ current: Math.min(stats.questionsAnswered, 100), target: 100 }),
    },
    {
        id: 'master_mind',
        title: 'Master Mind',
        description: 'Achieve 90% average (min 50 questions)',
        icon: 'graduation-cap',
        condition: (stats) => stats.questionsAnswered >= 50 && stats.averageScore >= 90,
        getProgress: (stats) => {
            // Progress is based on both question count and score
            if (stats.questionsAnswered < 50) {
                return { current: stats.questionsAnswered, target: 50 };
            }
            return { current: Math.min(stats.averageScore, 90), target: 90 };
        },
    },
    {
        id: 'exam_ready',
        title: 'Exam Ready',
        description: 'Complete 3 mock exams',
        icon: 'certificate',
        condition: (stats) => stats.examAttempts >= 3,
        getProgress: (stats) => ({ current: Math.min(stats.examAttempts, 3), target: 3 }),
    },
    {
        id: 'time_keeper',
        title: 'Time Keeper',
        description: 'Study for 1 hour total',
        icon: 'clock-o',
        condition: (stats) => stats.studyTimeMinutes >= 60,
        getProgress: (stats) => ({ current: Math.min(stats.studyTimeMinutes, 60), target: 60 }),
    },
    {
        id: 'streak_master',
        title: 'Streak Master',
        description: 'Maintain a 3-day study streak',
        icon: 'fire',
        condition: (stats) => stats.streakDays >= 3,
        getProgress: (stats) => ({ current: Math.min(stats.streakDays, 3), target: 3 }),
    },
    {
        id: 'quiz_warrior',
        title: 'Quiz Warrior',
        description: 'Answer 500 questions',
        icon: 'trophy',
        condition: (stats) => stats.questionsAnswered >= 500,
        getProgress: (stats) => ({ current: Math.min(stats.questionsAnswered, 500), target: 500 }),
    },
    {
        id: 'perfectionist',
        title: 'Perfectionist',
        description: 'Achieve 95% average (min 100 questions)',
        icon: 'star',
        condition: (stats) => stats.questionsAnswered >= 100 && stats.averageScore >= 95,
        getProgress: (stats) => {
            if (stats.questionsAnswered < 100) {
                return { current: stats.questionsAnswered, target: 100 };
            }
            return { current: Math.min(stats.averageScore, 95), target: 95 };
        },
    },
    {
        id: 'marathon_runner',
        title: 'Marathon Runner',
        description: 'Study for 5 hours total',
        icon: 'road',
        condition: (stats) => stats.studyTimeMinutes >= 300,
        getProgress: (stats) => ({ current: Math.min(stats.studyTimeMinutes, 300), target: 300 }),
    },
    {
        id: 'streak_legend',
        title: 'Streak Legend',
        description: 'Maintain a 7-day study streak',
        icon: 'bolt',
        condition: (stats) => stats.streakDays >= 7,
        getProgress: (stats) => ({ current: Math.min(stats.streakDays, 7), target: 7 }),
    },
];

export const checkAchievements = (stats: UserStats, unlockedIds: string[]): Achievement[] => {
    const newUnlocked: Achievement[] = [];

    ACHIEVEMENTS.forEach((achievement) => {
        if (!unlockedIds.includes(achievement.id)) {
            if (achievement.condition(stats)) {
                newUnlocked.push(achievement);
            }
        }
    });

    return newUnlocked;
};
