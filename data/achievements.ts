import { UserStats } from './stats';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string; // FontAwesome name
    condition: (stats: UserStats) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'first_steps',
        title: 'First Steps',
        description: 'Complete your first quiz',
        icon: 'flag',
        condition: (stats) => stats.questionsAnswered >= 10,
    },
    {
        id: 'dedicated_learner',
        title: 'Dedicated Learner',
        description: 'Answer 100 questions',
        icon: 'book',
        condition: (stats) => stats.questionsAnswered >= 100,
    },
    {
        id: 'master_mind',
        title: 'Master Mind',
        description: 'Achieve an average score of 90%',
        icon: 'graduation-cap',
        condition: (stats) => stats.questionsAnswered >= 50 && stats.averageScore >= 90,
    },
    {
        id: 'exam_ready',
        title: 'Exam Ready',
        description: 'Attempt 3 mock exams',
        icon: 'certificate',
        condition: (stats) => stats.examAttempts >= 3,
    },
    {
        id: 'time_keeper',
        title: 'Time Keeper',
        description: 'Study for 1 hour total',
        icon: 'clock-o',
        condition: (stats) => stats.studyTimeMinutes >= 60,
    },
    {
        id: 'streak_master',
        title: 'Streak Master',
        description: 'Maintain a 3-day study streak',
        icon: 'fire',
        condition: (stats) => stats.streakDays >= 3,
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
