export const FREE_TRIAL_QUESTION_LIMIT = 50;

export const PRICING = {
    MONTHLY: {
        price: 9.99,
        period: 'month',
        productId: '$rc_monthly', // RevenueCat standard package identifier
    },
    YEARLY: {
        price: 29.99,
        period: 'year',
        productId: '$rc_annual', // RevenueCat standard package identifier
        savingsPercent: 75,
    },
    LIFETIME: {
        price: 49.99,
        period: 'lifetime',
        productId: '$rc_lifetime', // RevenueCat standard package identifier
    },
};

export const APP_CONFIG = {
    EXAM_TIME_LIMIT_SECONDS: 60 * 60, // 60 minutes
    PASSING_SCORE_PERCENTAGE: 80,
    QUESTION_COUNTS: {
        MAIN_TOPIC: 50,
        ENDORSEMENT_TOPIC: 25,
    },
    ENDORSEMENT_TOPICS: ['passenger', 'doubles_triples', 'tanks', 'school_bus'],

    // Paywall Configuration
    FREE_TRIAL_QUESTION_LIMIT,
    PRICING,
};
