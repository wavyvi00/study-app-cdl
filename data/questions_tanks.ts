import { Question } from './mock';

export const TANKS_QUESTIONS: Question[] = [
    {
        id: 'tank_1',
        text: 'A tank vehicle is used to carry:',
        options: [
            'Any liquid',
            'Any liquid or gas',
            'Bulk liquids or gases',
            'Only water'
        ],
        correctIndex: 2,
        explanation: 'A tank vehicle is used to carry any liquid or gaseous materials in a tank.'
    },
    {
        id: 'tank_2',
        text: 'Which of these is the most important thing to remember about driving a tank vehicle?',
        options: [
            'You must drive faster to keep the liquid from settling',
            'The center of gravity is high',
            'You can stop faster than other vehicles',
            'They are very stable'
        ],
        correctIndex: 1,
        explanation: 'High center of gravity makes tankers top-heavy and easy to roll over.'
    },
    {
        id: 'tank_3',
        text: 'Liquid surge:',
        options: [
            'Is a problem only in bad weather',
            'Is the movement of liquid in a partially filled tank',
            'Helps you stop',
            'Keeps the tank clean'
        ],
        correctIndex: 1,
        explanation: 'Movement of liquid (surge) can push the truck in the direction of the wave.'
    },
    {
        id: 'tank_4',
        text: 'To prevent rollover, you should:',
        options: [
            'Keep the cargo as close to the ground as possible',
            'Drive slowly around turns',
            'Both A and B',
            'Neither A nor B'
        ],
        correctIndex: 2,
        explanation: 'Keeping load low (when possible) and driving slow in curves prevents rollovers.'
    },
    {
        id: 'tank_5',
        text: 'Baffles in liquid cargo tanks do not usually prevent:',
        options: [
            'Side-to-side surge',
            'Front-to-back surge',
            'Heat buildup',
            'Explosions'
        ],
        correctIndex: 0,
        explanation: 'Baffles control fore-aft surge but not side-to-side surge.'
    },
    {
        id: 'tank_6',
        text: 'If your tanker does not have baffles (smooth bore), you should expect:',
        options: [
            'A smoother ride',
            'Strong forward-and-back surge',
            'Less stopping distance',
            'Better handling'
        ],
        correctIndex: 1,
        explanation: 'Smooth bore tanks have nothing to slow down the wave of liquid.'
    },
    {
        id: 'tank_7',
        text: 'You should be extremely cautious when driving smooth bore tankers, especially when you are:',
        options: [
            'Starting or stopping',
            'Driving on highway',
            'Parked',
            'Loading'
        ],
        correctIndex: 0,
        explanation: 'Starting and stopping causes the biggest surge in unbaffled tanks.'
    },
    {
        id: 'tank_8',
        text: 'The amount of liquid to load into a tank depends on:',
        options: [
            'The amount the liquid will expand in transit',
            'The weight of the liquid',
            'Legal weight limits',
            'All of the above'
        ],
        correctIndex: 3,
        explanation: 'You must consider expansion, weight density, and legal limits.'
    },
    {
        id: 'tank_9',
        text: 'Outage means:',
        options: [
            'Driving without lights',
            'Allowance for expansion of liquid',
            'Running out of fuel',
            'A leak'
        ],
        correctIndex: 1,
        explanation: 'You must leave room (outage) for liquid to expand as it warms.'
    },
    {
        id: 'tank_10',
        text: 'A full tank of dense liquid (like some acids) could:',
        options: [
            'Make the truck lighter',
            'Exceed legal weight limits',
            'Lower the center of gravity',
            'Be safer than water'
        ],
        correctIndex: 1,
        explanation: 'Dense liquids weigh more; a full tank might be illegal.'
    },
    {
        id: 'tank_11',
        text: 'If you must make a quick stop to avoid a crash, use:',
        options: [
            'Controlled or stab braking',
            'Only the emergency brake',
            'The hand valve',
            'No brakes'
        ],
        correctIndex: 0,
        explanation: 'Use controlled braking to keep the vehicle straight.'
    },
    {
        id: 'tank_12',
        text: 'Which of these statements about stopping distance and speed is true?',
        options: [
            'You need less stopping distance with a heavy load',
            'Wet roads can double stopping distance',
            'Empty tankers stop the fastest',
            'Speed does not matter'
        ],
        correctIndex: 1,
        explanation: 'Slippery roads increase stopping distance significantly.'
    },
    {
        id: 'tank_13',
        text: 'Empty tanker trucks:',
        options: [
            'Require greater stopping distance than full ones',
            'Stop on a dime',
            'Have excellent traction',
            'Are very stable'
        ],
        correctIndex: 0,
        explanation: 'Empty trucks have less traction and bounce, taking longer to stop.'
    },
    {
        id: 'tank_14',
        text: 'When driving a tank vehicle, you should:',
        options: [
            'Drive fast in curves',
            'Start and stop smoothly',
            'Ignore the surge',
            'Overload the tank'
        ],
        correctIndex: 1,
        explanation: 'Smooth operations prevent dangerous surging.'
    },
    {
        id: 'tank_15',
        text: 'On a tank vehicle, the most likely place for a leak is:',
        options: [
            'The tires',
            'The Discharge valves',
            'The roof',
            'The mirrors'
        ],
        correctIndex: 1,
        explanation: 'Valves/manholes are common leak points.'
    },
    {
        id: 'tank_16',
        text: 'Manhole covers should be:',
        options: [
            'Left open for venting',
            'Closed and secured',
            'Painted red',
            'Loose'
        ],
        correctIndex: 1,
        explanation: 'Secure covers prevent leaks and spills.'
    },
    {
        id: 'tank_17',
        text: 'If you steer a tank vehicle quickly while braking, you:',
        options: [
            'Will stop faster',
            'May cause the vehicle to roll over',
            'Will gain traction',
            'Are driving correctly'
        ],
        correctIndex: 1,
        explanation: 'Quick steering + braking + high CG = Rollover.'
    },
    {
        id: 'tank_18',
        text: 'Side-to-side surge can cause:',
        options: [
            'Rollover',
            'Better gas mileage',
            'Smoother ride',
            'Faster acceleration'
        ],
        correctIndex: 0,
        explanation: 'Sloshing side-to-side changes the CG and can tip the truck.'
    },
    {
        id: 'tank_19',
        text: 'When hauling hazardous materials in a tank, you must:',
        options: [
            'Have a hazardous materials endorsement',
            'Drive only at night',
            'Have a police escort',
            'Wear a suit'
        ],
        correctIndex: 0,
        explanation: 'Hazmat load requires H endorsement (usually X for Tank+Hazmat).'
    },
    {
        id: 'tank_20',
        text: 'Separation of liquids in a multi-compartment tank is done by:',
        options: [
            'Baffles',
            'Bulkheads',
            'Air pressure',
            'Nets'
        ],
        correctIndex: 1,
        explanation: 'Bulkheads create separate liquid-tight compartments.'
    },
    {
        id: 'tank_21',
        text: 'If you drive a tank vehicle that has lost its brakes, use:',
        options: [
            'A tree',
            'A truck escape ramp',
            'Another car',
            'A ditch'
        ],
        correctIndex: 1,
        explanation: 'Escape ramps are designed to stop runaways safely.'
    },
    {
        id: 'tank_22',
        text: 'Portable tanks are:',
        options: [
            'Bulk containers not permanently attached to a truck',
            'Small gas cans',
            'Always empty',
            'Plastic bags'
        ],
        correctIndex: 0,
        explanation: 'Portable tanks are loaded onto a flatbed/chassis.'
    },
    {
        id: 'tank_23',
        text: 'Baffled liquid tanks have bulkheads in them with holes that let the liquid flow through. The headers (bulkheads) help to:',
        options: [
            'Control forward and backward liquid surge',
            'Mix the cargo',
            'Clean the tank',
            'Increase weight'
        ],
        correctIndex: 0,
        explanation: 'Baffles slow down the flow fore and aft.'
    },
    {
        id: 'tank_24',
        text: 'Forward-to-back surge is especially strong in:',
        options: [
            'Smooth bore tanks',
            'Baffled tanks',
            'Small tanks',
            'Square tanks'
        ],
        correctIndex: 0,
        explanation: 'Nothing stops the wave in a smooth bore tank.'
    },
    {
        id: 'tank_25',
        text: 'To control the surge, you should:',
        options: [
            'Keep a steady pressure on the brakes',
            'Brake far in advance and increase pressure gradually',
            'Brake hard at the last minute',
            'Use the hand brake'
        ],
        correctIndex: 1,
        explanation: 'Gradual braking prevents a massive wave from hitting the front.'
    },
    {
        id: 'tank_26',
        text: 'You should know the outage needed for the liquids you carry because:',
        options: [
            'Some liquids expand more than others when they get warm',
            'It is the law',
            'The shipper says so',
            'It saves money'
        ],
        correctIndex: 0,
        explanation: 'If you don\'t leave enough room, the tank could overflow or burst.'
    },
    {
        id: 'tank_27',
        text: 'A keyed-in switch for an unloading pump should be:',
        options: [
            'Left on',
            'Turned off when not in use',
            'Always fast',
            'Ignored'
        ],
        correctIndex: 1,
        explanation: 'Check unintentional engagement of equipment.'
    },
    {
        id: 'tank_28',
        text: 'If you have a vehicle with a high center of gravity, you should:',
        options: [
            'Drive fast in curves',
            'Slow down before curves',
            'Turn sharply',
            'Load it to the top'
        ],
        correctIndex: 1,
        explanation: 'Slowing down reduces centrifugal force that causes rollovers.'
    },
    {
        id: 'tank_29',
        text: 'Smooth bore tanks are used for:',
        options: [
            'Milk',
            'Food products',
            'Liquid wishing to be sanitized',
            'All of the above'
        ],
        correctIndex: 3,
        explanation: 'Sanitation requires smooth interiors without baffle crevices.'
    },
    {
        id: 'tank_30',
        text: 'Generally, empty trucks take longer to stop than loaded trucks, but this is NOT true for:',
        options: [
            'Tanks with baffles',
            'Smooth bore tanks',
            'Flatbeds',
            'Vans'
        ],
        correctIndex: 0,
        explanation: 'Wait, general rule is empty takes longer. But specifically, a FULL tank stops slower than an EMPTY one? Actually, empty tanks bounce. The wording is tricky. Usually empty = longer stop.'
    },
    {
        id: 'tank_31',
        text: 'Never load a cargo tank totally full:',
        options: [
            'Because liquid expands',
            'Unless it is water',
            'Because it is too heavy',
            'Unless it is cold'
        ],
        correctIndex: 0,
        explanation: 'Always leave outage for expansion.'
    },
    {
        id: 'tank_32',
        text: 'Which of these is a special requirement for tank vehicles?',
        options: [
            'Low clearance',
            'High center of gravity',
            'Wide turns',
            'Fast acceleration'
        ],
        correctIndex: 1,
        explanation: 'Handling the high CG is the primary special skill.'
    },
    {
        id: 'tank_33',
        text: 'When loading a tank with dividers (bulkheads), you should:',
        options: [
            'Load the front first',
            'Load the back first',
            'Distribute the weight evenly',
            'Fill one to the top then the next'
        ],
        correctIndex: 2,
        explanation: 'Don\'t overload the axles; balance the load.'
    },
    {
        id: 'tank_34',
        text: 'You are driving on a clear night. You must dim your headlights from high to low. You should adjust your speed so that you can stop within:',
        options: [
            'The distance you can see ahead',
            '500 feet',
            'The length of your vehicle',
            '100 feet'
        ],
        correctIndex: 0,
        explanation: 'Never overdrive your headlights.'
    },
    {
        id: 'tank_35',
        text: 'Vehicle skids are often caused by:',
        options: [
            'Driving too fast for conditions',
            'Heavy loads',
            'Good tires',
            'Dry roads'
        ],
        correctIndex: 0,
        explanation: 'Speed and poor braking cause skids.'
    },
    {
        id: 'tank_36',
        text: 'If your vehicle is involved in a leak, you should:',
        options: [
            'Drive to a garage',
            'Park it and call for help',
            'Keep driving',
            'Ignore it'
        ],
        correctIndex: 1,
        explanation: 'Stop, park, secure the area.'
    },
    {
        id: 'tank_37',
        text: 'Baffles reduce surge:',
        options: [
            'Completely',
            'Front to back',
            'Side to side',
            'Up and down'
        ],
        correctIndex: 1,
        explanation: 'Fore-and-aft only.'
    }
];
