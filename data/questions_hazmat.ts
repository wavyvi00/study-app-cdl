import { Question } from './mock';

export const HAZMAT_QUESTIONS: Question[] = [
    {
        id: 'hm_1',
        text: 'A vehicle placarded for hazardous materials must have placards on ___ sides.',
        options: [
            '2',
            '3',
            '4',
            '5'
        ],
        correctIndex: 2,
        explanation: 'Placards must be on all 4 sides: front, rear, and both sides.',
    },
    {
        id: 'hm_2',
        text: 'Who is responsible for checking that the shipper correctly named, labeled, and marked a hazardous materials shipment?',
        options: [
            'The Manufacturer',
            'The Carrier',
            'The Driver',
            'The Shipper'
        ],
        correctIndex: 1,
        explanation: 'To refuse improper shipments, the Carrier is responsible for checking the paperwork.',
    },
    {
        id: 'hm_3',
        text: 'If there is an "RQ" before or after the item description on the shipping paper, it means the:',
        options: [
            'Carrier must report any spill of this material',
            'Material is in a Reportable Quantity',
            'Material is Really Quick',
            'Material is Radioactive Quality'
        ],
        correctIndex: 1,
        explanation: 'RQ stands for Reportable Quantity.'
    },
    {
        id: 'hm_4',
        text: 'You need to warn other motorists of a stopped vehicle containing hazardous materials. You may NOT use:',
        options: [
            'Reflective triangles',
            'Signal fires',
            'Flares (fusees)',
            'Flashing lights'
        ],
        correctIndex: 2,
        explanation: 'Never use flares/fusees (fire) around hazardous materials.',
    },
    {
        id: 'hm_5',
        text: 'A driver who transports hazardous materials in a vehicle that must be placarded must have:',
        options: [
            'A special driver\'s license',
            'A CDL with a hazardous materials endorsement',
            'A letter of permission',
            'A police escort'
        ],
        correctIndex: 1,
        explanation: 'You need a specific Hazmat (H) endorsement on your CDL.',
    },
    {
        id: 'hm_6',
        text: 'The intent of the Hazardous Materials regulations has three goals: 1. Contain the material, 2. Communicate the risk, 3. ______.',
        options: [
            'Assure safe drivers and equipment',
            'Allow state enforcement',
            'Tax the shipper',
            'Protect the environment'
        ],
        correctIndex: 0,
        explanation: 'The three goals are Containment, Communication, and Assuring safe drivers/equipment.'
    },
    {
        id: 'hm_7',
        text: 'To stop for railroad tracks, you should stop ___ to ___ feet before the nearest track.',
        options: [
            '5; 20',
            '10; 35',
            '15; 50',
            '20; 100'
        ],
        correctIndex: 2,
        explanation: 'Stop within 15 to 50 feet of the nearest rail.'
    },
    {
        id: 'hm_8',
        text: 'If you are in an accident involving hazardous materials, you should:',
        options: [
            'Drive away quickly',
            'Keep people away and warn others',
            'Open the doors',
            'Move the cargo'
        ],
        correctIndex: 1,
        explanation: 'Keep people away, warn others, and prevent fire.'
    },
    {
        id: 'hm_9',
        text: 'The shipping paper for hazardous materials must always be easily accessible to:',
        options: [
            'Emergency response personnel',
            'The shipper',
            'The public',
            'The warehouse manager'
        ],
        correctIndex: 0,
        explanation: 'Papers must be within reach or in the door pouch for emergency responders.'
    },
    {
        id: 'hm_10',
        text: 'When transporting chlorine in cargo tanks, you must have:',
        options: [
            'An approved gas mask in the vehicle',
            'A fire extinguisher',
            'Extra water',
            'A shovel'
        ],
        correctIndex: 0,
        explanation: 'Chlorine transport requires an approved gas mask.'
    },
    {
        id: 'hm_11',
        text: 'The total transport index of all radioactive material packages in a single vehicle must not exceed:',
        options: [
            '10',
            '50',
            '100',
            '200'
        ],
        correctIndex: 1,
        explanation: 'The total transport index limit is 50.'
    },
    {
        id: 'hm_12',
        text: 'If you have a hazardous materials fire on the road, you should:',
        options: [
            'Open the trailer doors',
            'Drive to a fire station',
            'Wait for firefighters',
            'Attempt to extinguish it only if you can do so safely and without risk'
        ],
        correctIndex: 3,
        explanation: 'Do not open doors. Only fight the fire if safe; otherwise wait for help.'
    },
    {
        id: 'hm_13',
        text: 'Class 1 hazard is:',
        options: [
            'Explosives',
            'Gases',
            'Flammable liquids',
            'Poison'
        ],
        correctIndex: 0,
        explanation: 'Class 1 is Explosives.'
    },
    {
        id: 'hm_14',
        text: 'Class 3 hazard is:',
        options: [
            'Gases',
            'Flammable liquids',
            'Solids',
            'Oxidizers'
        ],
        correctIndex: 1,
        explanation: 'Class 3 is Flammable Liquids.'
    },
    {
        id: 'hm_15',
        text: 'You should stop and check your tires every ___ hours or ___ miles when transporting hazardous materials.',
        options: [
            '1; 50',
            '2; 100',
            '3; 150',
            '4; 200'
        ],
        correctIndex: 1,
        explanation: 'Check tires every 2 hours or 100 miles.'
    },
    {
        id: 'hm_16',
        text: 'A placard on dragging or rubbing against part of the trailer is:',
        options: [
            'Acceptable',
            'Prohibited',
            'Common',
            'Required'
        ],
        correctIndex: 1,
        explanation: 'Placards must be clear and visible, not damaged or rubbing.'
    },
    {
        id: 'hm_17',
        text: 'Which marking system is used for bulk packaging?',
        options: [
            'NFPA',
            'UN/NA identification number',
            'HMIS',
            'OSHA'
        ],
        correctIndex: 1,
        explanation: 'Bulk packaging uses the 4-digit UN/NA ID number.'
    },
    {
        id: 'hm_18',
        text: 'Smoking is prohibited within ___ feet of a Class 3 (Flammable Liquid) cargo tank.',
        options: [
            '10',
            '25',
            '50',
            '100'
        ],
        correctIndex: 1,
        explanation: 'No smoking within 25 feet of flammable liquid tanks.'
    },
    {
        id: 'hm_19',
        text: 'Shipping papers must include:',
        options: [
            'Proper shipping name, hazard class, ID number, packing group',
            'Price of the goods',
            'Driver\'s home address',
            'Weather conditions'
        ],
        correctIndex: 0,
        explanation: 'The core description is Name, Class, ID, Group.'
    },
    {
        id: 'hm_20',
        text: 'When parking a vehicle carrying Division 1.1, 1.2, or 1.3 explosives, you must not park within ___ feet of the traveled part of the road.',
        options: [
            '5',
            '100',
            '300',
            '500'
        ],
        correctIndex: 0,
        explanation: 'Do not park within 5 feet of the traveled road; use a parking lot or safe haven.'
    },
    {
        id: 'hm_21',
        text: 'Division 1.1 explosives must not be transported in a combination vehicle if the combination includes:',
        options: [
            'A tank',
            'A flatbed',
            'More than one trailer with the explosives',
            'A refrigerated van'
        ],
        correctIndex: 2,
        explanation: 'You cannot transport 1.1 explosives in a truck-truck-trailer combination.'
    },
    {
        id: 'hm_22',
        text: 'The Transport Index determines:',
        options: [
            'How fast you can drive',
            'How close packages can be to people/animals',
            'The cost of shipping',
            'The weight of the package'
        ],
        correctIndex: 1,
        explanation: 'Transport Index controls stowage distance from people and film.'
    },
    {
        id: 'hm_23',
        text: 'Who provides the emergency response information?',
        options: [
            'The driver',
            'The shipper',
            'The police',
            'The truck manufacturer'
        ],
        correctIndex: 1,
        explanation: 'The shipper must provide ER info (MSDS/SDS or guidebook page).'
    },
    {
        id: 'hm_24',
        text: 'If a label will not fit on a package, it may be placed on a tag securely attached to the package.',
        options: [
            'True',
            'False',
            'Only for liquids',
            'Only for gases'
        ],
        correctIndex: 0,
        explanation: 'True, tags are acceptable if the package is too small.'
    },
    {
        id: 'hm_25',
        text: 'Generally, you cannot park a vehicle carrying hazardous materials within ___ feet of an open fire.',
        options: [
            '100',
            '200',
            '300',
            '500'
        ],
        correctIndex: 2,
        explanation: 'Keep 300 feet away from open fires.'
    },
    {
        id: 'hm_26',
        text: 'Hazardous materials shipping papers can be distinguished from others by:',
        options: [
            'Being printed in red',
            'Being first, or having an "X" in the HM column',
            'Being in a separate envelope',
            'Having a sticker on them'
        ],
        correctIndex: 1,
        explanation: 'They must be on top, distinct, or marked with an "X" (or "RQ") in the HM column.'
    },
    {
        id: 'hm_27',
        text: 'If you discover a tire leak on a hazardous materials vehicle, you must:',
        options: [
            'Drive to the nearest repair shop',
            'Stop immediately and repair/replace it',
            'Add air and continue',
            'Ignore it if it is a dual tire'
        ],
        correctIndex: 1,
        explanation: 'You cannot continue travel with a leaking tire.'
    },
    {
        id: 'hm_28',
        text: 'A safe haven is:',
        options: [
            'A truck stop',
            'An approved place for parking unattended vehicles loaded with explosives',
            'A rest area',
            'A police station'
        ],
        correctIndex: 1,
        explanation: 'Safe havens are government-approved parking spots for explosives.'
    },
    {
        id: 'hm_29',
        text: 'How often must a driver be trained in security awareness?',
        options: [
            'Every year',
            'Every 2 years',
            'Every 3 years',
            'Only once'
        ],
        correctIndex: 2,
        explanation: 'Hazmat training is required at least every 3 years.'
    },
    {
        id: 'hm_30',
        text: 'When fueling a placarded vehicle, someone must always be:',
        options: [
            'At the nozzle, controlling the fuel flow',
            'In the cab',
            'Checking the tires',
            'Cleaning the windshield'
        ],
        correctIndex: 0,
        explanation: 'Never leave the nozzle unattended; engine must be off.'
    },
    {
        id: 'hm_31',
        text: 'Animals and human food should not be loaded in the same vehicle with:',
        options: [
            'Poisons',
            'Flammable liquids',
            'Gases',
            'Corrosives'
        ],
        correctIndex: 0,
        explanation: 'Poisons cannot be transported with food/feed.'
    },
    {
        id: 'hm_32',
        text: 'A driver must have a CDL with an H endorsement to haul:',
        options: [
            'Any amount of hazardous material',
            'Only large quantities',
            'Any amount requiring placards',
            'Only explosives'
        ],
        correctIndex: 2,
        explanation: 'The endorsement is required for any load that requires placarding.'
    },
    {
        id: 'hm_33',
        text: 'Which signal may be used to warn of a stopped vehicle containing explosives?',
        options: [
            'Flares',
            'Reflective triangles',
            'Fusees',
            'Burning signals'
        ],
        correctIndex: 1,
        explanation: 'Use reflective triangles. Never use fire (flares/fusees).'
    },
    {
        id: 'hm_34',
        text: 'When there is a hazardous materials emergency, you should:',
        options: [
            'Run away',
            'Keep people away and upwind',
            'Bury the material',
            'Touch the material to identify it'
        ],
        correctIndex: 1,
        explanation: 'Stay upwind and keep people away.'
    },
    {
        id: 'hm_35',
        text: 'Identification numbers are used to:',
        options: [
            'Identify the driver',
            'Identify the truck',
            'Identify the specific chemical or material',
            'Identify the route'
        ],
        correctIndex: 2,
        explanation: 'ID numbers (UN/NA) tell responders what the chemical is.'
    },
    {
        id: 'hm_36',
        text: 'If you are driving a placarded vehicle, you must minimize the use of:',
        options: [
            'Congested areas (tunnels, narrow streets, crowds)',
            'Highways',
            'Rest areas',
            'Weigh stations'
        ],
        correctIndex: 0,
        explanation: 'Regulations require avoiding heavily populated or congested areas when possible.'
    },
    {
        id: 'hm_37',
        text: 'You may not park a vehicle carrying hazardous materials within ___ feet of a bridge, tunnel, or building.',
        options: [
            '100',
            '200',
            '300',
            '500'
        ],
        correctIndex: 2,
        explanation: 'The limit is generally 300 feet for explosives/hazmat near structures.'
    },
    {
        id: 'hm_38',
        text: 'Who determines if a material is hazardous?',
        options: [
            'The driver',
            'The shipper',
            'The carrier',
            'The DOT'
        ],
        correctIndex: 1,
        explanation: 'The shipper classifies the material.'
    },
    {
        id: 'hm_39',
        text: 'When transporting Division 1.1, 1.2, or 1.3 explosives, you must have:',
        options: [
            'A written route plan',
            'A police escort',
            'Two drivers',
            'A radio'
        ],
        correctIndex: 0,
        explanation: 'Carriers must provide a written route plan for Class 1 explosives.'
    },
    {
        id: 'hm_40',
        text: 'The power unit of a placarded vehicle must have a fire extinguisher with a UL rating of ___ B:C or more.',
        options: [
            '5',
            '10',
            '20',
            '50'
        ],
        correctIndex: 1,
        explanation: '10 B:C is the minimum UL rating.'
    },
    {
        id: 'hm_41',
        text: 'When separation is required, packages cannot be loaded:',
        options: [
            'Next to each other',
            'In the same vehicle',
            'On top of each other',
            'Without pallets'
        ],
        correctIndex: 0,
        explanation: 'Separation means they cannot be right next to each other.'
    },
    {
        id: 'hm_42',
        text: 'Which hazard class uses a "flammable" placard?',
        options: [
            'Class 1',
            'Class 2',
            'Class 3',
            'Class 4'
        ],
        correctIndex: 2,
        explanation: 'Class 3 is Flammable Liquids.'
    },
    {
        id: 'hm_43',
        text: 'A "Dangerous" placard may be used if:',
        options: [
            'You have 1001 lbs or more of two or more non-bulk Table 2 materials',
            'You are in a hurry',
            'You have any amount of poison gas',
            'You have explosives'
        ],
        correctIndex: 0,
        explanation: 'Dangerous placard is for mixed loads of Table 2 goods exceeding 1001 lbs.'
    },
    {
        id: 'hm_44',
        text: 'If you are required to stop at railroad crossings, you must stop:',
        options: [
            '15-50 feet away',
            '5-10 feet away',
            '50-100 feet away',
            'Anywhere is fine'
        ],
        correctIndex: 0,
        explanation: '15 to 50 feet is the rule.'
    },
    {
        id: 'hm_45',
        text: 'The Emergency Response Guidebook (ERG) is primarily used by:',
        options: [
            'Truck drivers',
            'First responders',
            'Shippers',
            'Mechanics'
        ],
        correctIndex: 1,
        explanation: 'Though you carry it, it is designed for firefighters and police.'
    },
    {
        id: 'hm_46',
        text: 'If hazardous material is spilling from your vehicle, you should:',
        options: [
            'Drive to a safe spot',
            'Not move the vehicle any more than safety requires',
            'Try to catch it in a bucket',
            'Wash it down with water'
        ],
        correctIndex: 1,
        explanation: 'Move only if absolutely necessary for safety; otherwise contain it.'
    },
    {
        id: 'hm_47',
        text: 'Class 8 is:',
        options: [
            'Corrosives',
            'Radioactive',
            'Poison',
            'Explosives'
        ],
        correctIndex: 0,
        explanation: 'Class 8 is Corrosives.'
    },
    {
        id: 'hm_48',
        text: 'Class 6 is:',
        options: [
            'Poison',
            'Radioactive',
            'Corrosive',
            'Flammable'
        ],
        correctIndex: 0,
        explanation: 'Class 6 is Poison (Toxic).'
    },
    {
        id: 'hm_49',
        text: 'What shape are most placards?',
        options: [
            'Diamond',
            'Square',
            'Circle',
            'Triangle'
        ],
        correctIndex: 0,
        explanation: 'Placards are diamond-shaped (square-on-point).'
    },
    {
        id: 'hm_50',
        text: 'You have a vehicle without racks to hold cylinders of compressed gas. You may load the cylinders only if they are:',
        options: [
            'Loaded upright or braced lying down flat',
            'Bundled together',
            'Loose',
            'Leaning against the wall'
        ],
        correctIndex: 0,
        explanation: 'Cylinders must be secured upright or braced flat.'
    },
    {
        id: 'hm_51',
        text: 'When handling packages of explosives, you must:',
        options: [
            'Never use hooks or metal tools',
            'Throw them gently',
            'Roll them',
            'Drag them'
        ],
        correctIndex: 0,
        explanation: 'Metal tools can cause sparks/detonation.'
    },
    {
        id: 'hm_52',
        text: 'Who is responsible for packaging, labeling, and marking the hazardous material?',
        options: [
            'The driver',
            'The shipper',
            'The carrier',
            'The receiver'
        ],
        correctIndex: 1,
        explanation: 'The Shipper does the packaging and marking.'
    },
    {
        id: 'hm_53',
        text: 'Use this only when you are transporting hazardous materials that are not compatible with water:',
        options: [
            'Type B:C fire extinguisher',
            'Type A fire extinguisher',
            'Water hose',
            'Sand'
        ],
        correctIndex: 0,
        explanation: 'B:C extinguishers are for liquids/electrical; water can spread some fires.'
    },
    {
        id: 'hm_54',
        text: 'Can you transfer a Class 3 flammable liquid from one tanker to another on a public highway?',
        options: [
            'Yes',
            'No, unless it is an emergency',
            'Only at night',
            'Only if you have a permit'
        ],
        correctIndex: 1,
        explanation: 'Emergency transfer only.'
    },
    {
        id: 'hm_55',
        text: 'You should check the cargo markings:',
        options: [
            'At the start of the trip',
            'Every time you stop',
            'At the end of the trip',
            'You don\'t need to check'
        ],
        correctIndex: 0,
        explanation: 'Start the trip by verifying all markings and placards.'
    },
    {
        id: 'hm_56',
        text: 'A driver ticketed for a hazmat violation may lose their endorsement for:',
        options: [
            '1 year',
            '3 years',
            'Lifetime',
            'It depends on the offense'
        ],
        correctIndex: 3,
        explanation: 'Disqualification periods vary by offense severity.'
    },
    {
        id: 'hm_57',
        text: 'Which of these contains the detailed regulations for hazardous materials?',
        options: [
            'Title 49 of the CFR',
            'The driver\'s manual',
            'The bill of lading',
            'The ERG'
        ],
        correctIndex: 0,
        explanation: 'Title 49 Code of Federal Regulations (CFR) is the law.'
    }
];
