export interface InteractionQuestion {
    id: string;
    text: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export interface StudySection {
    id: string;
    title: string; // e.g. "Vehicle Inspection"
    cdlReference?: string; // e.g. "CDL Manual §2.1"
    content: string[]; // Array of paragraphs for easier rendering
    keyPoints: string[]; // Bulleted summary list
    reviewQuestions: InteractionQuestion[];
}

export interface StudyGuide {
    topicId: string; // Links to existing topics (e.g., 'part1')
    sections: StudySection[];
}

// Example Schema Usage (to be populated in Prompt 3)
/*
const GeneralKnowledgeStudyGuide: StudyGuide = {
    topicId: 'part1',
    sections: [
        {
            id: 'gk-inspection',
            title: 'Vehicle Inspection',
            content: [
                 "Safety is the most important reason you inspect your vehicle...",
                 "A vehicle defect found during an inspection could save you..."
            ],
            keyPoints: [
                "Safety is the #1 reason to inspect.",
                "Watch gauges for signs of trouble."
            ],
            reviewQuestions: [...]
        }
    ]
}
*/
