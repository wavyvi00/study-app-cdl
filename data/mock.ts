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
    summary: string;
    details: string;
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
        summary: 'Core concepts every driver must know.',
        details: 'The General Knowledge test is required for all CDL applicants. It covers vehicle inspections, basic control, shifting, backing, visual search, communication, speed management, hazard perception, and more. You must pass this to get your permit.',
    },
    {
        id: 'combinations',
        title: 'Combinations',
        description: 'Tractor-trailers and combination vehicles.',
        image: 'red',
        questions: COMBINATION_QUESTIONS,
        summary: 'Required for Class A tractor-trailers.',
        details: 'The Combination Vehicles endorsement is required to drive Class A combination vehicles (freight trucks with trailers). It covers rollover risks, jackknifing, off-tracking, coupling and uncoupling procedures, and air brake specifics for combinations.',
    },
    {
        id: 'air_brakes',
        title: 'Air Brakes',
        description: 'Air brake systems and operation.',
        image: 'orange',
        questions: AIR_BRAKES_QUESTIONS,
        summary: 'Essential for vehicles with air brake systems.',
        details: 'The Air Brakes endorsement is required if you plan to drive a truck or bus equipped with air brakes. You will learn about the parts of an air brake system, dual air systems, inspecting air brakes, and using them safely.',
    },
    {
        id: 'hazmat',
        title: 'Hazmat',
        description: 'Hazardous materials transportation.',
        image: 'purple',
        questions: HAZMAT_QUESTIONS,
        summary: ' transporting hazardous materials.',
        details: 'The Hazardous Materials (HazMat) endorsement (H) is required to haul hazardous materials that require placards. It covers intent of regulations, bulk packaging, loading and unloading, driving and parking rules, and emergencies.',
    },
    {
        id: 'passenger',
        title: 'Passenger',
        description: 'Bus and passenger safety.',
        image: 'green',
        questions: PASSENGER_QUESTIONS,
        summary: 'Required for driving buses/passenger vehicles.',
        details: 'The Passenger Transport endorsement (P) is required to drive a vehicle designed to carry 16 or more passengers (including the driver). It covers vehicle inspection, loading, on the road driving, after-trip vehicle inspection, prohibited practices, and brake usage.',
    },
    {
        id: 'doubles_triples',
        title: 'Doubles/Triples',
        description: 'Pulling two or three trailers.',
        image: 'teal',
        questions: DOUBLES_TRIPLES_QUESTIONS,
        summary: 'Advanced trailer configuration safety.',
        details: 'The Doubles/Triples endorsement (T) is required for drivers pulling double or triple trailers. It covers coupling and uncoupling, inspecting doubles and triples, and handling and stability.',
    },
    {
        id: 'tanks',
        title: 'Tanks',
        description: 'Liquid surge and baffles.',
        image: 'pink',
        questions: TANKS_QUESTIONS,
        summary: 'Safety for liquid transport tankers.',
        details: 'The Tank Vehicle endorsement (N) is required to drive a tank vehicle. It covers tank vehicle definition, inspecting tank vehicles, driving rules, and safe driving rules for liquids and surge.',
    },
    {
        id: 'school_bus',
        title: 'School Bus',
        description: 'Student safety and operations.',
        image: 'yellow',
        questions: SCHOOL_BUS_QUESTIONS,
        summary: 'Transporting students safely.',
        details: 'The School Bus endorsement (S) is required to drive a school bus. It covers danger zones, use of mirrors, loading and unloading, emergency exit and evacuation, railroad-highway grade crossings, and student management.',
    },
];
