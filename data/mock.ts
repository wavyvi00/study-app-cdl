import { GK_QUESTIONS_PART1 } from './questions_part1';
import { GK_QUESTIONS_PART2 } from './questions_part2';
import { GK_QUESTIONS_PART3 } from './questions_part3';
import { GK_QUESTIONS_PART4 } from './questions_part4';
import { GK_QUESTIONS_PART5 } from './questions_part5';
import { COMBINATION_QUESTIONS } from './questions_combination';
import { AIR_BRAKES_QUESTIONS } from './questions_air_brakes';
import { HAZMAT_QUESTIONS } from './questions_hazmat';
import { PASSENGER_QUESTIONS } from './questions_passenger';
import { DOUBLES_TRIPLES_QUESTIONS } from './questions_doubles_triples';
import { TANKS_QUESTIONS } from './questions_tanks';
import { SCHOOL_BUS_QUESTIONS } from './questions_school_bus';

export interface Question {
    id: string;
    text: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
}

export interface Topic {
    id: string;
    title: string;
    description: string;
    image: string;
    questions: Question[];
}

// Combine all 250 General Knowledge questions
const ALL_GK_QUESTIONS: Question[] = [
    ...GK_QUESTIONS_PART1,
    ...GK_QUESTIONS_PART2,
    ...GK_QUESTIONS_PART3,
    ...GK_QUESTIONS_PART4,
    ...GK_QUESTIONS_PART5,
];

export const TOPICS: Topic[] = [
    {
        id: 'general_knowledge',
        title: 'General Knowledge',
        description: '250 questions covering all CDL test topics.',
        image: 'blue',
        questions: ALL_GK_QUESTIONS,
    },
    {
        id: 'combinations',
        title: 'Combinations',
        description: 'Tractor-trailers and combination vehicles.',
        image: 'red',
        questions: COMBINATION_QUESTIONS,
    },
    {
        id: 'air_brakes',
        title: 'Air Brakes',
        description: 'Air brake systems and operation.',
        image: 'orange',
        questions: AIR_BRAKES_QUESTIONS,
    },
    {
        id: 'hazmat',
        title: 'Hazmat',
        description: 'Hazardous materials transportation.',
        image: 'purple',
        questions: HAZMAT_QUESTIONS,
    },
    {
        id: 'passenger',
        title: 'Passenger',
        description: 'Bus and passenger safety.',
        image: 'green',
        questions: PASSENGER_QUESTIONS,
    },
    {
        id: 'doubles_triples',
        title: 'Doubles/Triples',
        description: 'Pulling two or three trailers.',
        image: 'teal',
        questions: DOUBLES_TRIPLES_QUESTIONS,
    },
    {
        id: 'tanks',
        title: 'Tanks',
        description: 'Liquid surge and baffles.',
        image: 'pink',
        questions: TANKS_QUESTIONS,
    },
    {
        id: 'school_bus',
        title: 'School Bus',
        description: 'Student safety and operations.',
        image: 'yellow',
        questions: SCHOOL_BUS_QUESTIONS,
    },
];
