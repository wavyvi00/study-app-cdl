export const FREE_TRIAL_QUESTION_LIMIT = 50;

export const PRICING = {
    MONTHLY: {
        price: 9.99,
        period: 'month',
        productId: 'cdl_zero_monthly',
    },
    YEARLY: {
        price: 29.99,
        period: 'year',
        productId: 'cdl_zero_yearly',
        savingsPercent: 75,
    },
    LIFETIME: {
        price: 49.99,
        period: 'lifetime',
        productId: 'cdl_zero_lifetime',
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
