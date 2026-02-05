/**
 * CDL Glossary
 * 
 * Maps English keywords to their definitions and translations.
 * Keys should be lowercase for easier matching.
 */

export interface GlossaryTerm {
    term: string;
    definition: string;
    translation: string; // Spanish translation
}

export const GLOSSARY: Record<string, GlossaryTerm> = {
    "air brakes": {
        term: "Air Brakes",
        definition: "A brake system that uses compressed air to make the brakes work. Used on large heavy vehicles.",
        translation: "Frenos de aire"
    },
    "axle": {
        term: "Axle",
        definition: "A central shaft for a rotating wheel or gear.",
        translation: "Eje"
    },
    "clutch": {
        term: "Clutch",
        definition: "Mechanism for connecting and disconnecting the engine from the transmission.",
        translation: "Embrague"
    },
    "skid": {
        term: "Skid",
        definition: "When tires lose their grip on the road and slide.",
        translation: "Derrape / Patinazo"
    },
    "hazmat": {
        term: "HazMat",
        definition: "Short for 'Hazardous Materials'. Substances that pose a danger to life or the environment.",
        translation: "Materiales peligrosos"
    },
    "psi": {
        term: "PSI",
        definition: "Pounds per Square Inch. A unit of pressure used for measuring tire pressure and air brake pressure.",
        translation: "Libras por pulgada cuadrada"
    },
    "gear": {
        term: "Gear",
        definition: "A toothed wheel that works with others to alter the relation between the speed of a driving mechanism (engine) and the speed of the driven parts (wheels).",
        translation: "Marcha / Engranaje"
    },
    "steering wheel": {
        term: "Steering Wheel",
        definition: "The wheel that the driver turns to control the direction of the vehicle.",
        translation: "Volante"
    },
    "tread": {
        term: "Tread",
        definition: "The part of the tire that touches the road.",
        translation: "Banda de rodadura (Dibujo de la llanta)"
    },
    "blind spot": {
        term: "Blind Spot",
        definition: "Area around the vehicle that the driver cannot see directly or through mirrors.",
        translation: "Punto ciego"
    },
    "coupling": {
        term: "Coupling",
        definition: "Connecting two vehicles together, like a tractor and a trailer.",
        translation: "Acoplamiento"
    },
    "jackknife": {
        term: "Jackknife",
        definition: "When the trailer of a combination vehicle swings out to the side, forming an angle with the tractor like a folding knife.",
        translation: "Efecto tijera"
    },
    "retarder": {
        term: "Retarder",
        definition: "A mechanism used to help slow the vehicle, reducing the need for using the brakes.",
        translation: "Retardador"
    },
    "hydroplaning": {
        term: "Hydroplaning",
        definition: "When tires lose contact with the road due to water, causing the vehicle to slide.",
        translation: "Aquaplaning (Hidroplaneo)"
    },
    "off-tracking": {
        term: "Off-tracking",
        definition: "When the rear wheels follow a different path than the front wheels while turning. Also called 'cheating'.",
        translation: "Desviación de trayectoria"
    },
    "placard": {
        term: "Placard",
        definition: "A sign put on the outside of a vehicle to warn that it is carrying hazardous materials.",
        translation: "Cartel / Placa"
    },
    "suspension": {
        term: "Suspension",
        definition: "The system of springs and shock absorbers that connects the vehicle to its wheels.",
        translation: "Suspensión"
    },
    "gauge": {
        term: "Gauge",
        definition: "An instrument for measuring and displaying values like speed, fuel level, or air pressure.",
        translation: "Indicador / Medidor"
    },
    "coolant": {
        term: "Coolant",
        definition: "Liquid used in the radiator to keep the engine from overheating.",
        translation: "Refrigerante"
    },
    "alternator": {
        term: "Alternator",
        definition: "Device that generates electricity to charge the battery and run electrical systems while the engine is on.",
        translation: "Alternador"
    }
};

/**
 * Helper to find a term in the glossary (case-insensitive)
 */
export function findTerm(text: string): GlossaryTerm | undefined {
    return GLOSSARY[text.toLowerCase()];
}
