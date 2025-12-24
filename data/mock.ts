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
import { Locale } from './translations';

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

// Get questions by locale
export function getQuestionsByLocale(locale: Locale = 'en') {
    if (locale === 'es') {
        // Spanish translations
        const { GK_QUESTIONS_PART1: GK_ES_1 } = require('./questions/es/questions_part1');
        const { GK_QUESTIONS_PART2: GK_ES_2 } = require('./questions/es/questions_part2');
        const { GK_QUESTIONS_PART3: GK_ES_3 } = require('./questions/es/questions_part3');
        const { GK_QUESTIONS_PART4: GK_ES_4 } = require('./questions/es/questions_part4');
        const { GK_QUESTIONS_PART5: GK_ES_5 } = require('./questions/es/questions_part5');
        const { COMBINATION_QUESTIONS: COMBO_ES } = require('./questions/es/questions_combination');
        const { AIR_BRAKES_QUESTIONS: AIR_ES } = require('./questions/es/questions_air_brakes');
        const { HAZMAT_QUESTIONS: HAZ_ES } = require('./questions/es/questions_hazmat');
        const { PASSENGER_QUESTIONS: PASS_ES } = require('./questions/es/questions_passenger');
        const { DOUBLES_TRIPLES_QUESTIONS: DBL_ES } = require('./questions/es/questions_doubles_triples');
        const { TANKS_QUESTIONS: TANK_ES } = require('./questions/es/questions_tanks');
        const { SCHOOL_BUS_QUESTIONS: BUS_ES } = require('./questions/es/questions_school_bus');

        return {
            ALL_GK: [...GK_ES_1, ...GK_ES_2, ...GK_ES_3, ...GK_ES_4, ...GK_ES_5],
            COMBINATION: COMBO_ES,
            AIR_BRAKES: AIR_ES,
            HAZMAT: HAZ_ES,
            PASSENGER: PASS_ES,
            DOUBLES_TRIPLES: DBL_ES,
            TANKS: TANK_ES,
            SCHOOL_BUS: BUS_ES
        };
    }

    if (locale === 'ru') {
        // Russian translations
        const { GK_QUESTIONS_PART1: GK_RU_1 } = require('./questions/ru/questions_part1');
        const { GK_QUESTIONS_PART2: GK_RU_2 } = require('./questions/ru/questions_part2');
        const { GK_QUESTIONS_PART3: GK_RU_3 } = require('./questions/ru/questions_part3');
        const { GK_QUESTIONS_PART4: GK_RU_4 } = require('./questions/ru/questions_part4');
        const { GK_QUESTIONS_PART5: GK_RU_5 } = require('./questions/ru/questions_part5');
        const { COMBINATION_QUESTIONS: COMBO_RU } = require('./questions/ru/questions_combination');
        const { AIR_BRAKES_QUESTIONS: AIR_RU } = require('./questions/ru/questions_air_brakes');
        const { HAZMAT_QUESTIONS: HAZ_RU } = require('./questions/ru/questions_hazmat');
        const { PASSENGER_QUESTIONS: PASS_RU } = require('./questions/ru/questions_passenger');
        const { DOUBLES_TRIPLES_QUESTIONS: DBL_RU } = require('./questions/ru/questions_doubles_triples');
        const { TANKS_QUESTIONS: TANK_RU } = require('./questions/ru/questions_tanks');
        const { SCHOOL_BUS_QUESTIONS: BUS_RU } = require('./questions/ru/questions_school_bus');

        return {
            ALL_GK: [...GK_RU_1, ...GK_RU_2, ...GK_RU_3, ...GK_RU_4, ...GK_RU_5],
            COMBINATION: COMBO_RU,
            AIR_BRAKES: AIR_RU,
            HAZMAT: HAZ_RU,
            PASSENGER: PASS_RU,
            DOUBLES_TRIPLES: DBL_RU,
            TANKS: TANK_RU,
            SCHOOL_BUS: BUS_RU
        };
    }

    // Default: English
    return {
        ALL_GK: [...GK_QUESTIONS_PART1, ...GK_QUESTIONS_PART2, ...GK_QUESTIONS_PART3, ...GK_QUESTIONS_PART4, ...GK_QUESTIONS_PART5],
        COMBINATION: COMBINATION_QUESTIONS,
        AIR_BRAKES: AIR_BRAKES_QUESTIONS,
        HAZMAT: HAZMAT_QUESTIONS,
        PASSENGER: PASSENGER_QUESTIONS,
        DOUBLES_TRIPLES: DOUBLES_TRIPLES_QUESTIONS,
        TANKS: TANKS_QUESTIONS,
        SCHOOL_BUS: SCHOOL_BUS_QUESTIONS
    };
}

// Topic metadata translations
const TOPIC_TRANS = {
    en: {
        general_knowledge: {
            title: 'General Knowledge',
            desc: '250 questions covering all CDL test topics.',
            summary: 'Core concepts every driver must know.',
            details: 'The General Knowledge test is required for all CDL applicants. It covers vehicle inspections, basic control, shifting, backing, visual search, communication, speed management, hazard perception, and more.',
        },
        combinations: {
            title: 'Combinations',
            desc: 'Tractor-trailers and combination vehicles.',
            summary: 'Required for Class A tractor-trailers.',
            details: 'The Combination Vehicles endorsement is required to drive Class A combination vehicles. It covers rollover risks, jackknifing, off-tracking, coupling procedures, and air brake specifics for combinations.',
        },
        air_brakes: {
            title: 'Air Brakes',
            desc: 'Air brake systems and operation.',
            summary: 'Essential for vehicles with air brake systems.',
            details: 'The Air Brakes endorsement is required if you plan to drive a truck or bus equipped with air brakes. You will learn about the parts of an air brake system, dual air systems, inspecting air brakes, and using them safely.',
        },
        hazmat: {
            title: 'Hazmat',
            desc: 'Hazardous materials transportation.',
            summary: 'Required for transporting hazmat.',
            details: 'The Hazardous Materials (H) endorsement is required to transport hazmat requiring placards. You must pass the HazMat knowledge test and undergo a TSA background check.',
        },
        passenger: {
            title: 'Passenger',
            desc: 'Buses and passenger vehicles.',
            summary: 'For bus drivers.',
            details: 'The Passenger (P) endorsement is required to operate vehicles designed to transport 16 or more passengers (including the driver). It covers pre-trip inspections, loading/unloading, railroad crossings, and passenger safety.',
        },
        doubles_triples: {
            title: 'Doubles/Triples',
            desc: 'Double and triple trailers.',
            summary: 'For pulling multiple trailers.',
            details: 'The Doubles/Triples (T) endorsement is required to pull two or three trailers. It covers coupling and uncoupling, inspecting doubles and triples, and safe driving practices specific to these longer vehicles.',
        },
        tanks: {
            title: 'Tank Vehicles',
            desc: 'Tank vehicles and liquid cargo.',
            summary: 'For tank truck drivers.',
            details: 'The Tank Vehicles (N) endorsement is required to drive tank vehicles. You will learn about the high center of gravity, liquid surge, baffles, bulkheads, and safe driving practices for tank vehicles.',
        },
        school_bus: {
            title: 'School Bus',
            desc: 'School bus operation and safety.',
            summary: 'For school bus drivers.',
            details: 'The School Bus (S) endorsement is required to drive a school bus. It covers danger zones, loading/unloading students, railroad crossings, special safety considerations, and student management.',
        },
    },
    es: {
        general_knowledge: {
            title: 'Conocimientos Generales',
            desc: '250 preguntas cubriendo todos los temas.',
            summary: 'Conceptos básicos que todo conductor debe saber.',
            details: 'La prueba de Conocimientos Generales es obligatoria. Cubre inspecciones, control básico, cambios, retroceso, comunicación, gestión de velocidad y más.',
        },
        combinations: {
            title: 'Combinaciones',
            desc: 'Tractocamiones y vehículos combinados.',
            summary: 'Requerido para tractocamiones Clase A.',
            details: 'El endoso de Vehículos Combinados es requerido para conducir vehículos combinados Clase A. Cubre riesgos de vuelco, jackknifing, acoplamiento y frenos de aire.',
        },
        air_brakes: {
            title: 'Frenos de Aire',
            desc: 'Sistemas de frenos de aire.',
            summary: 'Esencial para vehículos con frenos de aire.',
            details: 'El endoso de Frenos de Aire es requerido si planea conducir un camión o autobús equipado con frenos de aire. Aprenderá sobre las partes del sistema.',
        },
        hazmat: {
            title: 'Materiales Peligrosos',
            desc: 'Transporte de materiales peligrosos.',
            summary: 'Requerido para transportar materiales peligrosos.',
            details: 'El end oso de Materiales Peligrosos (H) es requerido para transportar materiales peligrosos que requieran letreros. Debe pasar la prueba y verificación de antecedentes TSA.',
        },
        passenger: {
            title: 'Pasajeros',
            desc: 'Autobuses y vehículos de pasajeros.',
            summary: 'Para conductores de autobús.',
            details: 'El endoso de Pasajeros (P) es requerido para operar vehículos diseñados para transportar 16 o más pasajeros. Cubre inspecciones pre-viaje, carga/descarga y seguridad de pasajeros.',
        },
        doubles_triples: {
            title: 'Dobles/Triples',
            desc: 'Remolques dobles y triples.',
            summary: 'Para remolcar múltiples remolques.',
            details: 'El endoso de Dobles/Triples (T) es requerido para remolcar dos o tres remolques. Cubre acoplamiento, inspección y prácticas de conducción segura.',
        },
        tanks: {
            title: 'Vehículos Cisterna',
            desc: 'Vehículos cisterna y carga líquida.',
            summary: 'Para conductores de camiones cisterna.',
            details: 'El endoso de Vehículos Cisterna (N) es requerido para conducir vehículos cisterna. Aprenderá sobre el centro de gravedad alto, oleaje de líquidos y prácticas de conducción segura.',
        },
        school_bus: {
            title: 'Autobús Escolar',
            desc: 'Operación y seguridad de autobús escolar.',
            summary: 'Para conductores de autobús escolar.',
            details: 'El endoso de Autobús Escolar (S) es requerido para conducir un autobús escolar. Cubre zonas de peligro, carga/descarga de estudiantes y consideraciones de seguridad especiales.',
        },
    },
    ru: {
        general_knowledge: {
            title: 'Общие знания',
            desc: '250 вопросов, охватывающих все темы теста CDL.',
            summary: 'Основные концепции, которые должен знать каждый водитель.',
            details: 'Тест на общие знания требуется для всех кандидатов CDL. Он охватывает осмотр транспортных средств, базовое управление, переключение передач и многое другое.',
        },
        combinations: {
            title: 'Комбинации',
            desc: 'Тягачи с прицепами и комбинированные транспортные средства.',
            summary: 'Требуется для тягачей с прицепами класса А.',
            details: 'Одобрение комбинированных транспортных средств требуется для управления комбинированными транспортными средствами класса А. Оно охватывает риски опрокидывания, складывания и процедуры сцепки.',
        },
        air_brakes: {
            title: 'Пневматические тормоза',
            desc: 'Системы пневматических тормозов и работа.',
            summary: 'Необходим для транспортных средств с пневматическими тормозными системами.',
            details: 'Одобрение пневматических тормозов требуется, если вы планируете управлять грузовиком или автобусом, оборудованным пневматическими тормозами.',
        },
        hazmat: {
            title: 'Опасные материалы',
            desc: 'Транспортировка опасных материалов.',
            summary: 'Требуется для перевозки опасных материалов.',
            details: 'Одобрение опасных материалов (H) требуется для перевозки опасных материалов, требующих табличек. Вы должны пройти тест на знания и пройти проверку биографических данных TSA.',
        },
        passenger: {
            title: 'Пассажирский',
            desc: 'Автобусы и пассажирские транспортные средства.',
            summary: 'Для водителей автобусов.',
            details: 'Одобрение пассажиров (P) требуется для управления транспортными средствами, рассчитанными на перевозку 16 и более пассажиров. Охватывает предполетные осмотры, посадку/высадку и безопасность пассажиров.',
        },
        doubles_triples: {
            title: 'Двойные/Тройные',
            desc: ' Двойные и тройные прицепы.',
            summary: 'Для буксировки нескольких прицепов.',
            details: 'Одобрение двойных/тройных прицепов (T) требуется для буксировки двух или трех прицепов. Охватывает сцепку, осмотр и безопасное вождение.',
        },
        tanks: {
            title: 'Автоцистерны',
            desc: 'Автоцистерны и жидкий груз.',
            summary: 'Для водителей автоцистерн.',
            details: 'Одобрение автоцистерн (N) требуется для управления автоцистернами. Вы узнаете о высоком центре тяжести, переливе жидкости и безопасном вождении.',
        },
        school_bus: {
            title: 'Школьный автобус',
            desc: 'Эксплуатация и безопасность школьного автобуса.',
            summary: 'Для водителей школьных автобусов.',
            details: 'Одобрение школьного автобуса (S) требуется для управления школьным автобусом. Охватывает опасные зоны, посадку/высадку учащихся и особые соображения безопасности.',
        },
    },
};

export function getTopics(locale: Locale = 'en'): Topic[] {
    const trans = TOPIC_TRANS[locale] || TOPIC_TRANS.en;
    const questions = getQuestionsByLocale(locale);

    return [
        {
            id: 'general_knowledge',
            title: trans.general_knowledge.title,
            description: trans.general_knowledge.desc,
            image: 'blue',
            questions: questions.ALL_GK,
            summary: trans.general_knowledge.summary,
            details: trans.general_knowledge.details,
        },
        {
            id: 'combinations',
            title: trans.combinations.title,
            description: trans.combinations.desc,
            image: 'purple',
            questions: questions.COMBINATION,
            summary: trans.combinations.summary,
            details: trans.combinations.details,
        },
        {
            id: 'air_brakes',
            title: trans.air_brakes.title,
            description: trans.air_brakes.desc,
            image: 'green',
            questions: questions.AIR_BRAKES,
            summary: trans.air_brakes.summary,
            details: trans.air_brakes.details,
        },
        {
            id: 'hazmat',
            title: trans.hazmat.title,
            description: trans.hazmat.desc,
            image: 'orange',
            questions: questions.HAZMAT,
            summary: trans.hazmat.summary,
            details: trans.hazmat.details,
        },
        {
            id: 'passenger',
            title: trans.passenger.title,
            description: trans.passenger.desc,
            image: 'red',
            questions: questions.PASSENGER,
            summary: trans.passenger.summary,
            details: trans.passenger.details,
        },
        {
            id: 'doubles_triples',
            title: trans.doubles_triples.title,
            description: trans.doubles_triples.desc,
            image: 'yellow',
            questions: questions.DOUBLES_TRIPLES,
            summary: trans.doubles_triples.summary,
            details: trans.doubles_triples.details,
        },
        {
            id: 'tanks',
            title: trans.tanks.title,
            description: trans.tanks.desc,
            image: 'cyan',
            questions: questions.TANKS,
            summary: trans.tanks.summary,
            details: trans.tanks.details,
        },
        {
            id: 'school_bus',
            title: trans.school_bus.title,
            description: trans.school_bus.desc,
            image: 'indigo',
            questions: questions.SCHOOL_BUS,
            summary: trans.school_bus.summary,
            details: trans.school_bus.details,
        },
    ];
}
