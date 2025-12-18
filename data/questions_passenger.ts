import { Question } from './mock';

export const PASSENGER_QUESTIONS: Question[] = [
    {
        id: 'pass_1',
        text: 'When should you check the interior of the bus?',
        options: [
            'Before driving',
            'Before and after every trip',
            'Only when cleaning',
            'Once a week'
        ],
        correctIndex: 1,
        explanation: 'You must check the interior of the bus before each trip to ensure rider safety and after each trip for left articles or sleeping passengers.'
    },
    {
        id: 'pass_2',
        text: 'Hazardous materials that are NOT allowed on a bus include:',
        options: [
            'Small-arms ammunition labeled ORM-D',
            'Emergency hospital supplies',
            'Class 2 poison gas',
            'Drugs'
        ],
        correctIndex: 2,
        explanation: 'Poison gas (Class 2) and liquid Class 6 poisons are forbidden on buses.'
    },
    {
        id: 'pass_3',
        text: 'How far from a railroad crossing should you stop?',
        options: [
            '5 to 10 feet',
            '15 to 50 feet',
            '50 to 100 feet',
            '100 to 200 feet'
        ],
        correctIndex: 1,
        explanation: 'Stop between 15 and 50 feet before the nearest rail.'
    },
    {
        id: 'pass_4',
        text: 'When arriving at the destination or intermediate stops, you should announce:',
        options: [
            'The time',
            'The weather',
            'The location, reason for stopping, next departure time, and bus number',
            'The driver\'s name'
        ],
        correctIndex: 2,
        explanation: 'Clear announcements prevent passengers from missing their stops or getting on the wrong bus.'
    },
    {
        id: 'pass_5',
        text: 'Which of the following types of cargo can never be carried on a bus?',
        options: [
            'Small arms ammunition',
            'Irritating materials or tear gas',
            'Emergency hospital supplies',
            'Oxygen'
        ],
        correctIndex: 1,
        explanation: 'Tear gas and irritating materials are prohibited.'
    },
    {
        id: 'pass_6',
        text: 'If your bus has an emergency exit door, it must:',
        options: [
            'Be locked while driving',
            'Be open for fresh air',
            'Be closed when operating the bus',
            'Have a warning light'
        ],
        correctIndex: 2,
        explanation: 'Emergency exits must be closed and secured while the bus is moving.'
    },
    {
        id: 'pass_7',
        text: 'You must not allow riders to stand:',
        options: [
            'In the aisle',
            'In front of the standee line',
            'When the bus is moving',
            'Near the back'
        ],
        correctIndex: 1,
        explanation: 'The standee line marks the area where passengers would obstruct the driver\'s view.'
    },
    {
        id: 'pass_8',
        text: 'Buses may carry small-arms ammunition labeled ORM-D, emergency hospital supplies, and drugs.',
        options: [
            'True',
            'False',
            'Only in cargo bays',
            'Only if permitted by police'
        ],
        correctIndex: 0,
        explanation: 'These are exceptions to the hazardous materials rules for buses.'
    },
    {
        id: 'pass_9',
        text: 'When must you stop before crossing a drawbridge?',
        options: [
            'Always',
            'Only if the light is red',
            'At least 50 feet before the draw of the bridge',
            'Never'
        ],
        correctIndex: 2,
        explanation: 'Stop at least 50 feet before the draw unless there is a traffic light or attendant.'
    },
    {
        id: 'pass_10',
        text: 'Which of these statements about speed management is true?',
        options: [
            'You should always drive at the posted speed limit',
            'You must be able to stop within the distance you can see ahead',
            'Buses stop faster than cars',
            'Speed does not affect safety'
        ],
        correctIndex: 1,
        explanation: 'Never drive faster than the distance you can see ahead to stop.'
    },
    {
        id: 'pass_11',
        text: 'If a rider wants to bring a car battery or a can of gasoline aboard your bus, you should:',
        options: [
            'Allow it if they hold it',
            'Put it in the cargo bay',
            'Not allow them to do so',
            'Charge extra'
        ],
        correctIndex: 2,
        explanation: 'Gasoline and car batteries (acid) are hazardous and prohibited.'
    },
    {
        id: 'pass_12',
        text: 'When obtaining a CDL with a passenger endorsement, you must pass a knowledge test on:',
        options: [
            'Driving safely and transporting passengers safely',
            'Engine repair',
            'Route planning',
            'Fare collection'
        ],
        correctIndex: 0,
        explanation: 'The test covers safety regulations and passenger management.'
    },
    {
        id: 'pass_13',
        text: 'It is best to wear your seat belt:',
        options: [
            'Only on highways',
            'At all times',
            'Only in bad weather',
            'Only if police are around'
        ],
        correctIndex: 1,
        explanation: 'Drivers must always wear seat belts.'
    },
    {
        id: 'pass_14',
        text: 'Brake-door interlocks:',
        options: [
            'Are required on all buses',
            'Should be used in place of the parking brake',
            'Must not be used in place of the parking brake',
            'Are for emergency stops only'
        ],
        correctIndex: 2,
        explanation: 'Interlocks only work when the door is open; never rely on them for parking.'
    },
    {
        id: 'pass_15',
        text: 'Most hazardous materials are allowed on buses if they are:',
        options: [
            'Labeled correctly',
            'Carried by the driver',
            'Hidden',
            'Prohibited entirely'
        ],
        correctIndex: 3,
        explanation: 'Most hazmat is prohibited. Only specific exceptions are allowed.'
    },
    {
        id: 'pass_16',
        text: 'At the end of each shift, you should:',
        options: [
            'Park and leave',
            'Inspect the bus for lost items and sleeping passengers',
            'Lock the doors only',
            'Refuel only'
        ],
        correctIndex: 1,
        explanation: 'Always check for sleeping passengers or suspicious items.'
    },
    {
        id: 'pass_17',
        text: 'If your bus leans in a curve, you:',
        options: [
            'Are driving too fast',
            'Have a flat tire',
            'Are on a banked road',
            'Should speed up'
        ],
        correctIndex: 0,
        explanation: 'Leaning indicates excessive speed for the curve.'
    },
    {
        id: 'pass_18',
        text: 'When you discharge an unruly rider, you should choose a place that is:',
        options: [
            'Dark and quiet',
            'As safe as possible',
            'Far from town',
            'On a bridge'
        ],
        correctIndex: 1,
        explanation: 'Safety is the priority, even for unruly passengers.'
    },
    {
        id: 'pass_19',
        text: 'You should not let riders leave the bus:',
        options: [
            'At their stop',
            'In a safe location',
            'Unless they have paid',
            'At an unsafe location'
        ],
        correctIndex: 3,
        explanation: 'Never discharge passengers in an unsafe place.'
    },
    {
        id: 'pass_20',
        text: 'How many folding aisle seats are permitted in a bus not carrying farm workers?',
        options: [
            '0',
            '1',
            '2',
            '4'
        ],
        correctIndex: 0,
        explanation: 'Folding aisle seats are generally prohibited.'
    },
    {
        id: 'pass_21',
        text: 'The total weight of a hazardous material allowed on a bus is:',
        options: [
            '100 lbs',
            '500 lbs',
            'Any amount',
            'None'
        ],
        correctIndex: 1,
        explanation: 'The limit is 500 lbs total, with no more than 100 lbs of any one class.'
    },
    {
        id: 'pass_22',
        text: 'If you are driving a bus with passengers, you should not fuel the bus:',
        options: [
            'With passengers on board',
            'In an enclosed building with passengers on board',
            'At night',
            'At a truck stop'
        ],
        correctIndex: 1,
        explanation: 'Avoid fueling with passengers on board, and never do so in a closed building.'
    },
    {
        id: 'pass_23',
        text: 'You must stop your bus between 15 and 50 feet before:',
        options: [
            'A stop sign',
            'A railroad crossing',
            'A bridge',
            'A tunnel'
        ],
        correctIndex: 1,
        explanation: 'This is the mandatory stopping distance for RR crossings.'
    },
    {
        id: 'pass_24',
        text: 'To avoid a crash, you had to drive onto the right shoulder. You are now driving at 40 mph on the shoulder. How should you move back onto the pavement?',
        options: [
            'Steer sharply back',
            'If possible, come to a complete stop before steering back',
            'Accelerate',
            'Wait for a gap'
        ],
        correctIndex: 1,
        explanation: 'It is safer to stop and re-enter traffic than to steer back at speed.'
    },
    {
        id: 'pass_25',
        text: 'The maximum weight of hazardous materials of one class allowed on a bus is:',
        options: [
            '100 pounds',
            '500 pounds',
            '50 pounds',
            '200 pounds'
        ],
        correctIndex: 0,
        explanation: '100 lbs limit per class.'
    },
    {
        id: 'pass_26',
        text: 'If a passenger is drunk or disruptive, you may:',
        options: [
            'Kick them off anywhere',
            'Use force',
            'Follow your carrier\'s guidelines',
            'Ignore them'
        ],
        correctIndex: 2,
        explanation: 'Follow company policy; usually discharge in a safe, well-lit area.'
    },
    {
        id: 'pass_27',
        text: 'Which of the following must be closed when the bus is in motion?',
        options: [
            'Windows',
            'Emergency exit',
            'Roof hatches',
            'Driver\'s window'
        ],
        correctIndex: 1,
        explanation: 'Emergency exits must be secured.'
    },
    {
        id: 'pass_28',
        text: 'When carrying passengers, you should inspect the bus:',
        options: [
            'Weekly',
            'Before each trip',
            'Monthly',
            'Annually'
        ],
        correctIndex: 1,
        explanation: 'Pre-trip inspections are mandatory.'
    },
    {
        id: 'pass_29',
        text: 'Before driving, you must insure that the emergency exit window:',
        options: [
            'Is locked permanently',
            'Moves freely and opens completely',
            'Is barred',
            'Is taped shut'
        ],
        correctIndex: 1,
        explanation: 'It must work properly for safety.'
    },
    {
        id: 'pass_30',
        text: 'If you have to swerve to avoid a hazard:',
        options: [
            'Brake hard while swerving',
            'Do not brake while turning',
            'Accelerate',
            'Close your eyes'
        ],
        correctIndex: 1,
        explanation: 'Braking while swerving can cause a skid/rollover.'
    },
    {
        id: 'pass_31',
        text: 'Secure baggage and freight in a way that avoids damage and:',
        options: [
            'Allows the driver to move freely',
            'Allows riders to exit by any window or door in an emergency',
            'Is easy to unload',
            'Looks neat'
        ],
        correctIndex: 1,
        explanation: 'Aisles and exits must remain clear.'
    },
    {
        id: 'pass_32',
        text: 'Bus accidents often happen at:',
        options: [
            'Intersections',
            'Bridges',
            'Tunnels',
            'Highways'
        ],
        correctIndex: 0,
        explanation: 'Intersections are high-risk areas.'
    },
    {
        id: 'pass_33',
        text: 'You may carry up to ___ lbs of any one class of allowed hazardous materials.',
        options: [
            '100',
            '200',
            '300',
            '500'
        ],
        correctIndex: 0,
        explanation: '100 lbs per class limit.'
    },
    {
        id: 'pass_34',
        text: 'When should you talk to passengers?',
        options: [
            'Only when necessary/safe',
            'All the time',
            'Never',
            'To tell jokes'
        ],
        correctIndex: 0,
        explanation: 'Distracted driving is dangerous.'
    },
    {
        id: 'pass_35',
        text: 'Standee lines are:',
        options: [
            'For decoration',
            'To show where passengers cannot stand',
            'Found on all buses',
            'To separate men and women'
        ],
        correctIndex: 1,
        explanation: 'Passengers standing forward of this line obstruct the driver\'s view.'
    },
    {
        id: 'pass_36',
        text: 'Convex (spot) mirrors make things look:',
        options: [
            'Smaller and further away',
            'Larger and closer',
            'Normal size',
            'Upside down'
        ],
        correctIndex: 0,
        explanation: 'Convex mirrors show a wider area but distort distance.'
    },
    {
        id: 'pass_37',
        text: 'During your pre-trip inspection, you should check for:',
        options: [
            'Passenger comfort items',
            'Cleanliness only',
            'Safety defects',
            'Radio stations'
        ],
        correctIndex: 2,
        explanation: 'Safety is the primary focus.'
    },
    {
        id: 'pass_38',
        text: 'Charter bus drivers should normally:',
        options: [
            'Allow passengers to do whatever they want',
            'Explain rules and safety procedures at the start',
            'Ignore the passengers',
            'Drive faster'
        ],
        correctIndex: 1,
        explanation: 'Briefing passengers on safety is the driver\'s job.'
    },
    {
        id: 'pass_39',
        text: 'The interlock releases when you:',
        options: [
            'Close the door',
            'Open the door',
            'Push the brake',
            'Start the engine'
        ],
        correctIndex: 0,
        explanation: 'Closing the door releases the brake interlock.'
    },
    {
        id: 'pass_40',
        text: 'You must stop at a railroad crossing unless:',
        options: [
            'The train has passed',
            'A police officer or flagman signals you to proceed',
            'You are late',
            'There are no passengers'
        ],
        correctIndex: 1,
        explanation: 'Only officials can waive the stop requirement.'
    },
    {
        id: 'pass_41',
        text: 'Carrying a guest on a bus is prohibited unless:',
        options: [
            'They pay',
            'They are family',
            'It is an emergency',
            'They sit in the back'
        ],
        correctIndex: 2,
        explanation: 'Unauthorized guests are generally prohibited except in emergencies.'
    },
    {
        id: 'pass_42',
        text: 'Buses rarely have:',
        options: [
            'Seat belts for passengers',
            'Windows',
            'A driver',
            'Wheels'
        ],
        correctIndex: 0,
        explanation: 'Many transit/coach buses lack passenger seat belts.'
    },
    {
        id: 'pass_43',
        text: 'Managing space around your bus is important because:',
        options: [
            'Buses are large and heavy',
            'It looks good',
            'Police watch for it',
            'It saves fuel'
        ],
        correctIndex: 0,
        explanation: 'Large vehicles need more stopping and turning distance.'
    },
    {
        id: 'pass_44',
        text: 'Blind spots on a bus are:',
        options: [
            'Non-existent',
            'Only underneath',
            'Directly behind and to the sides',
            'In front'
        ],
        correctIndex: 2,
        explanation: 'Large blind spots exist behind and beside the bus.'
    },
    {
        id: 'pass_45',
        text: 'When pulling out of a stop, you should:',
        options: [
            'Honk your horn',
            'Just go',
            'Wait for a large gap in traffic',
            'Assume they will stop'
        ],
        correctIndex: 2,
        explanation: 'Buses accelerate slowly, so you need a large gap.'
    },
    {
        id: 'pass_46',
        text: 'A common cause of bus crashes is:',
        options: [
            'Driving too fast for conditions',
            'Stops',
            'Passengers',
            'Traffic lights'
        ],
        correctIndex: 0,
        explanation: 'Speeding is a major factor in accidents.'
    },
    {
        id: 'pass_47',
        text: 'When backing a bus:',
        options: [
            'It is always safe',
            'You should use a helper/spotter if possible',
            'Use only mirrors',
            'Drive fast'
        ],
        correctIndex: 1,
        explanation: 'Backing is dangerous; use a spotter.'
    },
    {
        id: 'pass_48',
        text: 'If you miss your exit on a highway:',
        options: [
            'Back up on the shoulder',
            'Go to the next exit',
            'Stop in the lane',
            'U-turn'
        ],
        correctIndex: 1,
        explanation: 'Never back up on a highway.'
    },
    {
        id: 'pass_49',
        text: 'Riders should be reminded to watch their step when:',
        options: [
            'Boarding or alighting',
            'Sleeping',
            'Eating',
            'Talking'
        ],
        correctIndex: 0,
        explanation: 'Slips and falls are common during boarding/alighting.'
    },
    {
        id: 'pass_50',
        text: 'If a passenger is injured on the bus:',
        options: [
            'Ignore it',
            'Stop and provide assistance/call for help',
            'Keep driving',
            'Tell them to get off'
        ],
        correctIndex: 1,
        explanation: 'Driver is responsible for passenger safety.'
    }
];
