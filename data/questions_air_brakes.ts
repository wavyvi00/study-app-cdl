import { Question } from './mock';

export const AIR_BRAKES_QUESTIONS: Question[] = [
    {
        id: 'ab_1',
        text: 'Which of the following is okay to find in the air brake system?',
        options: [
            'Oil',
            'Water',
            'Air',
            'All of the above'
        ],
        correctIndex: 2,
        explanation: 'The air brake system uses compressed air to make the brakes work. Water and oil are contaminants.'
    },
    {
        id: 'ab_2',
        text: 'Air loss in a single vehicle (not a combination unit) should not be more than ___ with the engine off and the brakes on.',
        options: [
            '1 psi per minute',
            '2 psi per minute',
            '3 psi per minute',
            '4 psi per minute'
        ],
        correctIndex: 2,
        explanation: 'For a straight truck, air loss with brakes applied should not exceed 3 psi in one minute.'
    },
    {
        id: 'ab_3',
        text: 'A straight truck or bus air brake system cannot leak more than how many psi per minute with the engine off and the brakes released?',
        options: [
            '1 psi',
            '2 psi',
            '3 psi',
            '4 psi'
        ],
        correctIndex: 1,
        explanation: 'With brakes released, a single vehicle shouldn\'t leak more than 2 psi per minute.'
    },
    {
        id: 'ab_4',
        text: 'If the air system should develop a leak, what will keep air in the air tanks?',
        options: [
            'The tractor protection valve',
            'The emergency relay valve',
            'The one-way check valve',
            'The air compressor'
        ],
        correctIndex: 2,
        explanation: 'One-way check valves prevent air from escaping the tanks back into the supply line.'
    },
    {
        id: 'ab_5',
        text: 'When using the parking brakes or emergency brakes, what type of pressure is being used?',
        options: [
            'Hydraulic pressure',
            'Air pressure',
            'Spring pressure',
            'Atmospheric pressure'
        ],
        correctIndex: 2,
        explanation: 'Spring brakes are held back by air pressure but applied by mechanical spring pressure.'
    },
    {
        id: 'ab_6',
        text: 'What turns on the electrical stop light switch in an air brake system?',
        options: [
            'The brake pedal',
            'Spring pressure',
            'Air pressure',
            'Electricity'
        ],
        correctIndex: 2,
        explanation: 'Air pressure triggers the electrical stop light switch when you push the brake pedal.'
    },
    {
        id: 'ab_7',
        text: 'What will determine how effective the spring emergency brakes or the parking brakes work?',
        options: [
            'The adjustment of the service brakes',
            'The amount of air pressure',
            'The weight of the vehicle',
            'The steepness of the grade'
        ],
        correctIndex: 0,
        explanation: 'Spring brakes depend on the adjustment of the service brakes to work effectively.'
    },
    {
        id: 'ab_8',
        text: 'Which of the following statements about brakes is true?',
        options: [
            'The heavier a vehicle or the faster it is moving, the more heat the brakes have to absorb to stop it.',
            'Brakes have more stopping power when they get very hot.',
            'Air brakes take effect instantly.',
            'All of the above.'
        ],
        correctIndex: 0,
        explanation: 'Heat absorption increases with weight and speed, which can lead to brake fade.'
    },
    {
        id: 'ab_9',
        text: 'How do you check the free-play in manual slack adjusters?',
        options: [
            'Park on level ground, chock the wheels, release the parking brake, and pull hard on each slack adjuster',
            'apply the brakes and watch the slack adjusters move',
            'Turn the adjusting nut until tight',
            'Measure with a ruler while someone presses the pedal'
        ],
        correctIndex: 0,
        explanation: 'You must release the parking brake to check free play. If it moves more than 1 inch, it needs adjustment.'
    },
    {
        id: 'ab_10',
        text: 'Which is most correct about brake use on a long and steep downgrade?',
        options: [
            'Use the trailer hand brake to save the tractor brakes.',
            'Use the engine braking effect, then apply brakes until speed is reduced to about 5 mph below safe speed.',
            'Pump the brakes constantly.',
            'Use only the parking brake.'
        ],
        correctIndex: 1,
        explanation: 'Use proper gear (snub braking): slow to 5 mph below safe speed, release, repeat.'
    },
    {
        id: 'ab_11',
        text: 'When do you use the parking brake in air brake equipped vehicles?',
        options: [
            'Only when parking on a hill',
            'Every time you park the vehicle',
            'Only in emergencies',
            'Never in cold weather'
        ],
        correctIndex: 1,
        explanation: 'Any time you park, use the parking brake (unless very hot or wet/freezing).'
    },
    {
        id: 'ab_12',
        text: 'Why should you NOT fan the brakes on and off during long downgrades?',
        options: [
            'It prevents the air compressor from working',
            'Does not allow brakes to cool',
            'It increases air pressure too much',
            'It wears out the pedal'
        ],
        correctIndex: 1,
        explanation: 'Fanning gives the brakes no time to cool down, increasing the risk of fade.'
    },
    {
        id: 'ab_13',
        text: 'If you must make a quick emergency stop, you should:',
        options: [
            'Pump the brakes',
            'Steer hard to the right',
            'Stay in a straight line and maintain control',
            'Use the hand brake'
        ],
        correctIndex: 2,
        explanation: 'Brake in a way that keeps the vehicle in a straight line (CSB or Stab braking).'
    },
    {
        id: 'ab_14',
        text: 'A combination vehicle air brake system cannot leak more than ___ psi per minute with the engine off and the brakes released.',
        options: [
            '1 psi',
            '2 psi',
            '3 psi',
            '4 psi'
        ],
        correctIndex: 2,
        explanation: 'For combination vehicles, allowable leakage is 3 psi/minute (released) and 4 psi/minute (applied).'
    },
    {
        id: 'ab_15',
        text: 'At 55 mph on dry pavement, the air brakes lag distance adds about __ feet to total stopping distance.',
        options: [
            '10 feet',
            '32 feet',
            '55 feet',
            '100 feet'
        ],
        correctIndex: 1,
        explanation: 'Brake lag adds about 32 feet at 55 mph.'
    },
    {
        id: 'ab_16',
        text: 'Air brakes cool very slowly.',
        options: [
            'True',
            'False',
            'Only in summer',
            'Only on hills'
        ],
        correctIndex: 0,
        explanation: 'True. This is why managing speed and using engine braking is critical.'
    },
    {
        id: 'ab_17',
        text: 'Excessive brake use from speed can cause too much heat to build up in the air brakes.',
        options: [
            'True',
            'False',
            'True but only on drum brakes',
            'False, air cools them'
        ],
        correctIndex: 0,
        explanation: 'True. Excessive heat leads to brake fade or failure.'
    },
    {
        id: 'ab_18',
        text: 'If the low pressure alarm comes on you should:',
        options: [
            'Pump the brakes',
            'Drive to the next service station',
            'Stop and park your vehicle as soon as possible',
            'Ignore it if brakes still work'
        ],
        correctIndex: 2,
        explanation: 'Stop immediately. You may lose braking ability or spring brakes may pop out.'
    },
    {
        id: 'ab_19',
        text: 'It is suggested that you drain your air tanks at the end of each week to remove dirt and oil.',
        options: [
            'True',
            'False (drain daily)',
            'False (drain monthly)',
            'True (if dry tanks)'
        ],
        correctIndex: 1,
        explanation: 'Drain air tanks DAILY to remove water and oil.'
    },
    {
        id: 'ab_20',
        text: 'The s-cam drum is the most common type of foundation brake.',
        options: [
            'True',
            'False',
            'Only on trailers',
            'Only on older trucks'
        ],
        correctIndex: 0,
        explanation: 'S-cam brakes are indeed the most common type.'
    },
    {
        id: 'ab_21',
        text: 'The supply pressure gauge tells you how long before the s-cam turns.',
        options: [
            'True',
            'False (tells you pressure in tanks)',
            'False (tells you brake temp)',
            'True'
        ],
        correctIndex: 1,
        explanation: 'Supply pressure gauge shows air pressure in the tanks.'
    },
    {
        id: 'ab_22',
        text: 'Drum brakes are the only type of brake in which brake fade occurs.',
        options: [
            'True',
            'False',
            'True for air brakes',
            'False for hydraulic'
        ],
        correctIndex: 1,
        explanation: 'Disc brakes can also fade, though drums are more susceptible.'
    },
    {
        id: 'ab_23',
        text: 'On a heavy vehicle, the emergency brake is usually held in place by spring pressure because air pressure can leak away.',
        options: [
            'True',
            'False',
            'Only on trailers',
            'Only on hills'
        ],
        correctIndex: 0,
        explanation: 'Spring brakes activate when air pressure is lost, acting as a fail-safe.'
    },
    {
        id: 'ab_24',
        text: 'Some vehicles have a separate air tank which can be used to release the spring brakes.',
        options: [
            'True (dual parking control valves)',
            'False',
            'Only on buses',
            'Only on tankers'
        ],
        correctIndex: 0,
        explanation: 'Yes, this allows you to move the vehicle a short distance in an emergency.'
    },
    {
        id: 'ab_25',
        text: 'The two systems of a dual air brake system are the primary and secondary.',
        options: [
            'True',
            'False',
            'Service and Emergency',
            'Front and Rear'
        ],
        correctIndex: 0,
        explanation: 'Dual air systems have Primary (usually rear) and Secondary (usually front) systems.'
    },
    {
        id: 'ab_26',
        text: 'When the brakes are very hot you should not use the parking brake.',
        options: [
            'True',
            'False',
            'Only if wet',
            'Never true'
        ],
        correctIndex: 0,
        explanation: 'Hot drums expand; as they cool and shrink, engaged parking brakes can crack them.'
    },
    {
        id: 'ab_27',
        text: 'The total stopping distance traveling at 55 mph under normal conditions is about 100 feet.',
        options: [
            'True',
            'False',
            'Depends on weight',
            'True for empty trucks'
        ],
        correctIndex: 1,
        explanation: 'False. It is over 450 feet for a heavy vehicle at 55 mph.'
    },
    {
        id: 'ab_28',
        text: 'Modern air brake systems use three braking systems - service, parking and emergency.',
        options: [
            'True',
            'False',
            'Only two',
            'Only one'
        ],
        correctIndex: 0,
        explanation: 'Service (pedal), Parking (valve), and Emergency (springs/air loss) systems.'
    },
    {
        id: 'ab_29',
        text: 'The air compressor governor controls:',
        options: [
            'The speed of the engine',
            'When the air compressor pumps air into the storage tanks',
            'The air pressure in the tires',
            'The brake pedal pressure'
        ],
        correctIndex: 1,
        explanation: 'The governor controls the cut-in and cut-out pressure of the compressor.'
    },
    {
        id: 'ab_30',
        text: 'The alcohol evaporator:',
        options: [
            'Condenses air',
            'Cools the brakes',
            'Reduces the risk of ice in air brake valves',
            'Heating the cab'
        ],
        correctIndex: 2,
        explanation: 'Alcohol prevents moisture from freezing in the air lines and valves.'
    },
    {
        id: 'ab_31',
        text: 'The first thing to do when a low pressure warning comes on is:',
        options: [
            'Pump the brakes',
            'Stop and safely park as soon as possible',
            'Shift to neutral',
            'Turn on hazards'
        ],
        correctIndex: 1,
        explanation: 'Immediate action is required to prevent emergency brake lockup.'
    },
    {
        id: 'ab_32',
        text: 'Air braking takes more time than hydraulic braking because air brakes:',
        options: [
            'Have stronger springs',
            'Need to have air flow through the lines to work (Brake Lag)',
            'Are heavier',
            'Use different shoes'
        ],
        correctIndex: 1,
        explanation: 'Air takes time to flow through the lines, causing a slight delay (brake lag).'
    },
    {
        id: 'ab_33',
        text: 'The driver must be able to see a warning that is given when air pressure in the service air tanks falls below:',
        options: [
            '80 psi',
            '60 psi',
            '40 psi',
            '20 psi'
        ],
        correctIndex: 1,
        explanation: 'Low air warning must activate by 60 psi (or one-half governor cut-out).'
    },
    {
        id: 'ab_34',
        text: 'An air brake system safety relief valve opens at about:',
        options: [
            '100 psi',
            '120 psi',
            '150 psi',
            '180 psi'
        ],
        correctIndex: 2,
        explanation: 'The safety valve protects the tank from over-pressure, usually at 150 psi.'
    },
    {
        id: 'ab_35',
        text: 'When some air brakes in the system are doing more work than others:',
        options: [
            'They will last longer',
            'They will develop more heat and vehicle handling will be affected',
            'It is normal',
            'The system balances itself'
        ],
        correctIndex: 1,
        explanation: 'Unbalanced brakes cause uneven wear, heat buildup, and potential jackknifing.'
    },
    {
        id: 'ab_36',
        text: 'Your safety relief valve has opened several times. This means:',
        options: [
            'The system is working well',
            'The pressure is too low',
            'The system needs immediate attention',
            'You are braking too hard'
        ],
        correctIndex: 2,
        explanation: 'It means the governor failed to cut out, leading to dangerous over-pressure.'
    },
    {
        id: 'ab_37',
        text: 'To test the air compressor on a dual air brake vehicle, run the engine at a fast idle. Pressure should build from 85 to 100 psi within:',
        options: [
            '30 seconds',
            '45 seconds',
            '60 seconds',
            '2 minutes'
        ],
        correctIndex: 1,
        explanation: 'Pressure must build quickly (45 seconds) to ensure safety.'
    },
    {
        id: 'ab_38',
        text: 'Vehicles with air brakes must have:',
        options: [
            'A supply pressure gauge',
            'An air pressure gauge',
            'A backup hydraulic system',
            'A spare tank'
        ],
        correctIndex: 1,
        explanation: 'You must be able to monitor the available air pressure.'
    },
    {
        id: 'ab_39',
        text: 'Which brake system applies and releases the brakes when the driver uses the brake pedal?',
        options: [
            'The parking brake system',
            'The emergency brake system',
            'The service brake system',
            'The auxiliary system'
        ],
        correctIndex: 2,
        explanation: 'The service brake system is controlled by the foot pedal.'
    },
    {
        id: 'ab_40',
        text: 'The purpose of engine retarders is to:',
        options: [
            'Make noise',
            'Help slow the vehicle and reduce brake wear',
            'Improve fuel economy',
            'Warm up the engine'
        ],
        correctIndex: 1,
        explanation: 'Retarders assist in braking, saving the service brakes for stopping.'
    },
    {
        id: 'ab_41',
        text: 'The cut-in pressure for the air compressor is commonly set at:',
        options: [
            '85 psi',
            '100 psi',
            '125 psi',
            '150 psi'
        ],
        correctIndex: 1,
        explanation: 'Compressor starts pumping again around 100 psi.'
    },
    {
        id: 'ab_42',
        text: 'The cut-out pressure for the air compressor is commonly set at:',
        options: [
            '100 psi',
            '125 psi',
            '150 psi',
            '175 psi'
        ],
        correctIndex: 1,
        explanation: 'Compressor stops pumping around 125 psi.'
    },
    {
        id: 'ab_43',
        text: 'What can happen if the air pressure gets too low in an air brake system?',
        options: [
            'The engine will stop',
            'The emergency brakes will engage automatically',
            'The compressor will explode',
            'Steering will lock'
        ],
        correctIndex: 1,
        explanation: 'If pressure drops (usually 20-45 psi), spring brakes automatically apply.'
    },
    {
        id: 'ab_44',
        text: 'Why should you never leave a parked vehicle with the air brakes released?',
        options: [
            'It saves air',
            'It cools the brakes',
            'It could roll away',
            'It drains the battery'
        ],
        correctIndex: 2,
        explanation: 'Without parking brakes (or chocks), the vehicle has nothing holding it.'
    },
    {
        id: 'ab_45',
        text: 'How should you test the low pressure warning signal?',
        options: [
            'Pump the pedal with engine running',
            'Pump the brake pedal with the engine off / key on',
            'Drain the tanks manually',
            'Looking at the gauge'
        ],
        correctIndex: 1,
        explanation: 'Engine off, key on (for electrical warnings), pump pedal to lower pressure.'
    },
    {
        id: 'ab_46',
        text: 'What is a "wig wag"?',
        options: [
            'A type of trailer',
            'A mechanical low air pressure warning device',
            'A loose wheel',
            'A steering problem'
        ],
        correctIndex: 1,
        explanation: 'A wig wag is a mechanical arm that drops into view when air pressure is low.'
    },
    {
        id: 'ab_47',
        text: 'The brake pedal in an air brake system:',
        options: [
            'Controls the speed of the air compressor',
            'Controls the air pressure applied to put on the brakes',
            'Is connected to the engine',
            'Works directly on the master cylinder'
        ],
        correctIndex: 1,
        explanation: 'Pushing harder applies more air pressure, braking harder.'
    },
    {
        id: 'ab_48',
        text: 'All air brake equipped vehicles have:',
        options: [
            'A supply pressure gauge',
            'An alcohol evaporator',
            'A hydraulic backup',
            'Air conditioning'
        ],
        correctIndex: 0,
        explanation: 'A supply pressure gauge is required.'
    },
    {
        id: 'ab_49',
        text: 'The application pressure gauge shows how much air pressure you:',
        options: [
            'Have in the tanks',
            'Are applying to the brakes',
            'Have lost',
            'Need to stop'
        ],
        correctIndex: 1,
        explanation: 'This gauge shows the pressure currently being applied to the brake chambers.'
    },
    {
        id: 'ab_50',
        text: 'Front wheel brakes are good under all conditions.',
        options: [
            'True',
            'False',
            'Only in dry weather',
            'Only when loaded'
        ],
        correctIndex: 0,
        explanation: 'True. Front brakes are essential for stopping and do not cause skids if working right.'
    },
    {
        id: 'ab_51',
        text: 'Automatic slack adjusters should be manually adjusted:',
        options: [
            'Every week',
            'Every day',
            'Only during installation or when the mechanism fails',
            'Never'
        ],
        correctIndex: 2,
        explanation: 'Manually adjusting auto-slacks can hide mechanical problems. Only do it for repairs.'
    },
    {
        id: 'ab_52',
        text: 'Brake linings (drums) should not be:',
        options: [
            'Thick',
            'Loose or soaked with oil/grease',
            'Hot',
            'Dusty'
        ],
        correctIndex: 1,
        explanation: 'Oil/grease causes brake failure; loose linings are dangerous.'
    },
    {
        id: 'ab_53',
        text: 'The modulating control valve allows you to:',
        options: [
            'Control the spring brakes gradually',
            'Control the compressor',
            'Control the air horn',
            'Drain the tanks'
        ],
        correctIndex: 0,
        explanation: 'This lever lets you apply spring brakes gradually to stop if service brakes fail.'
    },
    {
        id: 'ab_54',
        text: 'Dual parking control valves allow you to:',
        options: [
            'Park twice',
            'Release the spring brakes using air from a separate tank',
            'Use hydraulic brakes',
            'Lock the steering'
        ],
        correctIndex: 1,
        explanation: 'This lets you move a vehicle with failed primary air by using a reserve tank.'
    },
    {
        id: 'ab_55',
        text: 'The parking brake control is a:',
        options: [
            'Yellow diamond-shaped knob',
            'Red octagon',
            'Blue circle',
            'Green square'
        ],
        correctIndex: 0,
        explanation: 'Push-pull control knob for parking brakes is yellow and diamond-shaped.'
    },
    {
        id: 'ab_56',
        text: 'ABS is an addition to your normal brakes. It does not:',
        options: [
            'Shorten stopping distance',
            'Increase or decrease normal braking capability',
            'Prevent skids',
            'Work on wet roads'
        ],
        correctIndex: 1,
        explanation: 'ABS only activates to prevent lockup; it doesn\'t change normal braking power.'
    },
    {
        id: 'ab_57',
        text: 'If your truck has a dual air system and one system is very low on pressure:',
        options: [
            'Drive slowly',
            'Either the front or rear brakes will not be fully operational',
            'The other system will compensate',
            'You can still drive safely'
        ],
        correctIndex: 1,
        explanation: 'You lose half your braking ability. Do not drive.'
    },
    {
        id: 'ab_58',
        text: 'To check the air compressor governor cut-in and cut-out pressures:',
        options: [
            'Run the engine at a fast idle and watch the gauges',
            'Step on and off the brake pedal',
            'Drain the tanks',
            'Listed to the engine'
        ],
        correctIndex: 0,
        explanation: 'Watch the gauge to see when pressure stops rising (cut-out) and starts rising again (cut-in).'
    },
    {
        id: 'ab_59',
        text: 'If your vehicle has an alcohol evaporator, you should check the alcohol level:',
        options: [
            'Daily in cold weather',
            'Weekly',
            'Monthly',
            'Never'
        ],
        correctIndex: 0,
        explanation: 'Check and refill daily in cold weather to prevent freezing.'
    },
    {
        id: 'ab_60',
        text: 'A slack adjuster\'s free play needs to be adjusted if it is more than about:',
        options: [
            '1/4 inch',
            '1/2 inch',
            '1 inch',
            '2 inches'
        ],
        correctIndex: 2,
        explanation: 'More than 1 inch of free play (where the push rod enters the chamber) is unsafe.'
    },
    {
        id: 'ab_61',
        text: 'Which kind of brake requires more stopping distance?',
        options: [
            'Air brakes',
            'Hydraulic brakes',
            'Disc brakes',
            'They are all the same'
        ],
        correctIndex: 0,
        explanation: 'Air brakes have added brake lag time.'
    },
    {
        id: 'ab_62',
        text: 'The brake system that applies and releases the brakes when the driver uses the brake pedal is the:',
        options: [
            'Emergency brake system',
            'Service brake system',
            'Parking brake system',
            'Auxiliary brake system'
        ],
        correctIndex: 1,
        explanation: 'Service brakes are for normal driving.'
    },
    {
        id: 'ab_63',
        text: 'Cracks in the brake drum should not be longer than:',
        options: [
            '1/4 the width of the friction area',
            '1/2 the width of the friction area',
            '1 inch',
            'Any crack is okay'
        ],
        correctIndex: 1,
        explanation: 'Cracks exceeding 1/2 the width of the friction area are dangerous.'
    },
    {
        id: 'ab_64',
        text: 'In air brake vehicles, the parking brake should be used:',
        options: [
            'Except when the brakes are very hot or in freezing wet conditions',
            'Only on hills',
            'Only when the vehicle is empty',
            'Always, no matter what'
        ],
        correctIndex: 0,
        explanation: 'Avoid using parking brakes if they can freeze to the drums or damage hot drums.'
    },
    {
        id: 'ab_65',
        text: 'If you do not have automatic tank drains, how often should you drain the oil and water from the bottom of compressed air storage air tanks?',
        options: [
            'At the end of each day of driving',
            'Once a week',
            'Once a month',
            'Every 2 days'
        ],
        correctIndex: 0,
        explanation: 'Daily draining is required to prevent system failure/freezing.'
    },
    {
        id: 'ab_66',
        text: 'The proper method of braking when going down long and/or steep grades after selecting the proper gear is to brake until your speed is about ___ mph below your "safe" speed, then release your brakes.',
        options: [
            '5 mph',
            '10 mph',
            '15 mph',
            '20 mph'
        ],
        correctIndex: 0,
        explanation: 'Snub braking: slow 5 mph below safe speed, release, let speed build back, repeat.'
    },
    {
        id: 'ab_67',
        text: 'If your vehicle has an air brake system, you should check for:',
        options: [
            'Air leaks',
            'Correct air pressure',
            'Properly working gauges',
            'All of the above'
        ],
        correctIndex: 3,
        explanation: 'All parts of the air system must be checked.'
    },
    {
        id: 'ab_68',
        text: 'The air loss rate for a straight truck or bus with the engine off and the brakes on should not be more than:',
        options: [
            '1 psi in one minute',
            '2 psi in one minute',
            '3 psi in one minute',
            '4 psi in one minute'
        ],
        correctIndex: 2,
        explanation: '3 psi/min for single vehicles with brakes applied.'
    },
    {
        id: 'ab_69',
        text: 'The air loss rate for a combination vehicle with the engine off and the brakes on should not be more than:',
        options: [
            '2 psi in one minute',
            '3 psi in one minute',
            '4 psi in one minute',
            '5 psi in one minute'
        ],
        correctIndex: 2,
        explanation: '4 psi/min for combination vehicles with brakes applied.'
    },
    {
        id: 'ab_70',
        text: 'The safety valve reduces pressure at ___ psi.',
        options: [
            '50',
            '100',
            '150',
            '200'
        ],
        correctIndex: 2,
        explanation: 'It opens at 150 psi to prevent tank rupture.'
    },
    {
        id: 'ab_71',
        text: 'If you are driving down a steep downgrade and usually drive 40 mph on highway, safe speed might be:',
        options: [
            '40 mph',
            '20 mph',
            '50 mph',
            '5 mph'
        ],
        correctIndex: 1,
        explanation: 'Safe speed on downgrades is often much lower than the highway speed limit.'
    }
];
