export const FREE_TRIAL_QUESTION_LIMIT = 50;

export const PRICING = {
    ONE_TIME: {
        price: 14.99,
        period: 'lifetime',
        productId: 'cdl_1499_1m_pass', // Single consumable/non-renewing product
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
