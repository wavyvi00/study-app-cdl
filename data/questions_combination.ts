import { Question } from './mock';

export const COMBINATION_QUESTIONS: Question[] = [
    {
        id: 'comb_1',
        text: 'What two things are important to prevent rollover?',
        options: [
            'Keep the cargo as close to the ground as possible and drive slowly around turns',
            'Keep the cargo high and drive fast',
            'Keep the cargo heavily distributed to the rear',
            'Use the trailer hand brake in turns'
        ],
        correctIndex: 0,
        explanation: 'To prevent rollovers, keep the center of gravity low and drive slowly around corners.'
    },
    {
        id: 'comb_2',
        text: 'When you turn suddenly while pulling doubles, which trailer is most likely to turn over?',
        options: [
            'The front trailer',
            'The rear trailer',
            'The tractor',
            'They are all equally likely'
        ],
        correctIndex: 1,
        explanation: 'The rear trailer is most susceptible to the "crack-the-whip" effect and rollover.'
    },
    {
        id: 'comb_3',
        text: 'Why should you not use the trailer hand valve while driving?',
        options: [
            'It should never be marked',
            'It changes the air pressure too much',
            'It prevents the brake lights from working',
            'It can cause the trailer wheels to lock up and cause a skid'
        ],
        correctIndex: 3,
        explanation: 'Using the hand valve while driving can cause trailer lockup and jackknife.'
    },
    {
        id: 'comb_4',
        text: 'What is off-tracking?',
        options: [
            'When the vehicle goes off the road',
            'When the rear wheels follow a different path than the front wheels',
            'When the engine loses power',
            'When the trailer disconnects'
        ],
        correctIndex: 1,
        explanation: 'Off-tracking (or cheating) causes the rear wheels to follow a tighter path than the front.'
    },
    {
        id: 'comb_5',
        text: 'What is the "trailer air supply" control?',
        options: [
            'A red eight-sided knob',
            'A yellow six-sided knob',
            'A round blue knob',
            'A square black knob'
        ],
        correctIndex: 0,
        explanation: 'The trailer air supply control is a red, eight-sided knob used to supply the trailer air system.'
    },
    {
        id: 'comb_6',
        text: 'The trailer air supply control (red knob) should automatically pop out when air pressure falls to what range?',
        options: [
            '60 to 80 psi',
            '20 to 45 psi',
            '100 to 120 psi',
            '0 to 10 psi'
        ],
        correctIndex: 1,
        explanation: 'The valve should automatically close (pop out) between 20 and 45 psi.'
    },
    {
        id: 'comb_7',
        text: 'When connecting the glad hands, you should press the two seals together with the couplers at what angle to each other?',
        options: [
            '180 degrees',
            '45 degrees',
            '90 degrees',
            'Parallel'
        ],
        correctIndex: 2,
        explanation: 'Press the seals together at a 90-degree angle and then turn to lock.'
    },
    {
        id: 'comb_8',
        text: 'Why should you be sure that the fifth wheel plate is greased as required?',
        options: [
            'To prevent steering problems',
            'To keep the trailer from sliding',
            'To reduce noise',
            'To increase fuel efficiency'
        ],
        correctIndex: 0,
        explanation: 'A dry fifth wheel can cause steering problems due to friction.'
    },
    {
        id: 'comb_9',
        text: 'After coupling, how much space should be between the upper and lower fifth wheel?',
        options: [
            'About 1 inch',
            'None',
            'Answer depends on the load',
            'About 2 inches'
        ],
        correctIndex: 1,
        explanation: 'There should be no space between the upper and lower fifth wheel plates.'
    },
    {
        id: 'comb_10',
        text: 'Which part of the kingpin should the locking jaws close around?',
        options: [
            'The head',
            'The shank',
            'The base',
            'The tip'
        ],
        correctIndex: 1,
        explanation: 'The locking jaws must close around the shank (the narrow part) of the kingpin.'
    },
    {
        id: 'comb_11',
        text: 'The landing gear is:',
        options: [
            'The tires on the trailer',
            'The supports used to hold up the front of the trailer when not coupled',
            'The transmission gear for hills',
            'The steps to the cab'
        ],
        correctIndex: 1,
        explanation: 'Landing gear supports the trailer when it is not connected to a tractor.'
    },
    {
        id: 'comb_12',
        text: 'Where should the tractor be when you inspect the landing gear after uncoupling?',
        options: [
            'Completely cleared from the trailer',
            'With the frame under the trailer',
            'Attached to the trailer',
            'Miles away'
        ],
        correctIndex: 1,
        explanation: 'Keep the tractor frame under the trailer in case the landing gear collapses.'
    },
    {
        id: 'comb_13',
        text: 'A driver crosses the air lines when hooking up to an old trailer. What will happen?',
        options: [
            'The hand valve will work but the pedal will not',
            'If the trailer has no spring brakes, you could drive away but would not have trailer brakes',
            'The brake lights will not work',
            'The truck will not start'
        ],
        correctIndex: 1,
        explanation: 'If lines are crossed, air won\'t reach the tanks. Without spring brakes, you might move but have no service brakes.'
    },
    {
        id: 'comb_14',
        text: 'You supply air to the trailer tanks by:',
        options: [
            'Pushing in the trailer air supply valve',
            'Pulling out the trailer air supply valve',
            'Connecting the service line',
            'Using the hand valve'
        ],
        correctIndex: 0,
        explanation: 'Pushing in the red knob supplies air to the trailer emergency lines and tanks.'
    },
    {
        id: 'comb_15',
        text: 'The front trailer supports are up and the trailer is resting on the tractor. Make sure:',
        options: [
            'There is enough clearance between the tractor frame and the landing gear',
            'There is enough clearance between the tops of the tractor tires and the trailer floor',
            'There is enough clearance between the tractor cab and the trailer corners during turns',
            'All of the above'
        ],
        correctIndex: 3,
        explanation: 'Check for all these clearances to prevent damage during turns.'
    },
    {
        id: 'comb_16',
        text: 'The safety catch for the fifth wheel locking lever must be ___ for a coupling to be complete.',
        options: [
            'Over the locking lever',
            'Under the locking lever',
            'Straight up',
            'Released'
        ],
        correctIndex: 0,
        explanation: 'The safety latch must be engaged over the locking lever.'
    },
    {
        id: 'comb_17',
        text: 'You have pushed the trailer air supply valve (red knob). You should not move the tractor until the whole air system is:',
        options: [
            'At normal pressure',
            'Empty',
            'Between 60 and 80 psi',
            'Leaking'
        ],
        correctIndex: 0,
        explanation: 'Wait for the system to reach normal pressure (usually 100-125 psi) before moving.'
    },
    {
        id: 'comb_18',
        text: 'How do you check that the trailer brakes are working?',
        options: [
            'Drive 50 mph and slam the brakes',
            'Use the trailer hand valve to apply trailer brakes, then pull gently against them in low gear',
            'Ask a helper to listen',
            'Look at the gauge'
        ],
        correctIndex: 1,
        explanation: 'Test trailer brakes by applying the hand valve and pulling gently against them.'
    },
    {
        id: 'comb_19',
        text: 'What color are the service air lines usually?',
        options: [
            'Red',
            'Blue',
            'Green',
            'Yellow'
        ],
        correctIndex: 1,
        explanation: 'Service lines are blue; emergency lines are red.'
    },
    {
        id: 'comb_20',
        text: 'Why should you lock the tractor glad hands to each other (or dummy couplers) when not towing a trailer?',
        options: [
            'To keep them clean',
            'To prevent air leaks',
            'To keep water and dirt out of the lines',
            'All of the above'
        ],
        correctIndex: 3,
        explanation: 'This protects the lines from contamination and leaks.'
    },
    {
        id: 'comb_21',
        text: 'Which of these vehicles off-tracks the most?',
        options: [
            '5-axle tractor towing a 45-foot trailer',
            '5-axle tractor towing a 53-foot trailer',
            'Straight truck',
            'Bobtail tractor'
        ],
        correctIndex: 1,
        explanation: 'Longer wheelbases off-track more. The 53-foot trailer setup is the longest.'
    },
    {
        id: 'comb_22',
        text: 'When backing a tractor under a trailer, you should:',
        options: [
            'Approach the trailer at a sharp angle',
            'Always use the lowest reverse gear',
            'Hit the trailer hard to ensure coupling',
            'Keep the air lines connected'
        ],
        correctIndex: 1,
        explanation: 'Use the lowest reverse gear to move slowly and control the coupling.'
    },
    {
        id: 'comb_23',
        text: 'If the service line comes apart while you are driving, but the emergency line stays together, what happens immediately?',
        options: [
            'The emergency trailer brakes will come on',
            'The trailer tank will lose pressure',
            'Nothing happens until you try to apply the brakes',
            'The engine will stop'
        ],
        correctIndex: 2,
        explanation: 'You will lose service braking to the trailer, but emergency brakes won\'t apply until air is lost or you brake hard.'
    },
    {
        id: 'comb_24',
        text: 'Where are shut-off valves?',
        options: [
            'At the front of the tractor',
            'At the back of the trailer',
            'Under the dash',
            'In the engine'
        ],
        correctIndex: 1,
        explanation: 'Shut-off valves are at the rear of trailers to close the lines for the last trailer.'
    },
    {
        id: 'comb_25',
        text: 'To unlock the fifth wheel, pull the release handle to the ___ position.',
        options: [
            'Closed',
            'Open',
            'Up',
            'Down'
        ],
        correctIndex: 1,
        explanation: 'Pull the handle to the open position to retract the locking jaws.'
    },
    {
        id: 'comb_26',
        text: 'When uncoupling, you should lower the landing gear until it:',
        options: [
            'Just touches the ground',
            'Makes firm contact with the ground',
            'Lifts the trailer off the fifth wheel',
            'Is fully extended'
        ],
        correctIndex: 1,
        explanation: 'Lower until firm contact, then turn handle a few extra turns to take weight off tractor.'
    },
    {
        id: 'comb_27',
        text: 'When should you use chocks (blocks)?',
        options: [
            'Only when parking on a hill',
            'When parking a trailer without spring brakes',
            'Never',
            'Only in winter'
        ],
        correctIndex: 1,
        explanation: 'Trailers without spring brakes can roll if air leaks away - always use chocks.'
    },
    {
        id: 'comb_28',
        text: 'For a coupling to be complete, the fifth wheel must be:',
        options: [
            'Tilted down in back',
            'Tilted up in back',
            'Level',
            'Greased'
        ],
        correctIndex: 0,
        explanation: 'The fifth wheel shoud serve as a ramp, so it is usually tilted down in the rear.'
    },
    {
        id: 'comb_29',
        text: 'A converter dolly is used to:',
        options: [
            'Couple a tractor to a trailer',
            'Couple two trailers together',
            'Lock the fifth wheel',
            'Load cargo'
        ],
        correctIndex: 1,
        explanation: 'A converter dolly allows a second trailer to be coupled to the first.'
    },
    {
        id: 'comb_30',
        text: 'What happens if you try to couple when the trailer is too high?',
        options: [
            'It will couple perfectly',
            'The kingpin may not engage the jaws',
            'It may miss the fifth wheel and hit the tractor cab',
            'The landing gear will break'
        ],
        correctIndex: 2,
        explanation: 'If too high, the kingpin might jump the fifth wheel and damage the cab.'
    },
    {
        id: 'comb_31',
        text: 'What is the most common problem with coupling?',
        options: [
            'Trailer is too high',
            'Trailer is too low',
            'Tractor is not straight',
            'Air lines are crossed'
        ],
        correctIndex: 0,
        explanation: 'The most common problem is attempting to couple when the trailer is too high.'
    },
    {
        id: 'comb_32',
        text: 'What is the purpose of the emergency air line?',
        options: [
            'Controls the service brakes',
            'Supplies air to the trailer air tanks and controls the emergency brakes',
            'Cools the brakes',
            'Lubricates the system'
        ],
        correctIndex: 1,
        explanation: 'The emergency line (red) supplies air to the trailer tanks and controls the emergency brakes.'
    },
    {
        id: 'comb_33',
        text: 'Before backing under a trailer, you should line up:',
        options: [
            'Directly in front of the trailer',
            'At a 45 degree angle',
            'From the side',
            'Wherever you can'
        ],
        correctIndex: 0,
        explanation: 'Line up directly in front of the trailer to ensure a straight coupling.'
    },
    {
        id: 'comb_34',
        text: 'When hooking up, you should release the fifth wheel locking latch:',
        options: [
            'Before backing under the trailer',
            'After backing under the trailer',
            'It releases automatically',
            'Never'
        ],
        correctIndex: 2,
        explanation: 'Most modern fifth wheels have an automatic release, but you should check that it is open/ready before coupling.'
    },
    {
        id: 'comb_35',
        text: 'How much grease should be on the fifth wheel plate?',
        options: [
            'A thin layer',
            'None',
            'A heavy coat',
            'Only on the edges'
        ],
        correctIndex: 2,
        explanation: 'A heavy coat of grease is required to prevent steering problems and wear.'
    },
    {
        id: 'comb_36',
        text: 'The parking brake control for a trailer is usually:',
        options: [
            'A yellow diamond-shaped knob',
            'A red octagonal knob',
            'A blue round knob',
            'A lever'
        ],
        correctIndex: 0,
        explanation: 'The specific *trailer* supply valve is red octagonal, but the *tractor* parking brake is yellow diamond. The red knob controls trailer spring brakes.'
    },
    {
        id: 'comb_37',
        text: 'Which of these statements is true?',
        options: [
            'Bobtail tractors can take longer to stop than loaded combination vehicles',
            'Loaded trucks take longer to stop than empty ones',
            'The braking distance is the same for all vehicles',
            'Empty trucks stop faster than loaded ones'
        ],
        correctIndex: 0,
        explanation: 'Bobtail (empty) tractors can take longer to stop because they have less traction and bounce more.'
    },
    {
        id: 'comb_38',
        text: 'When should you check the airline connections?',
        options: [
            'Once a week',
            'Every time you hook up to a trailer',
            'Only if you hear a leak',
            'During the annual inspection'
        ],
        correctIndex: 1,
        explanation: 'Check airline connections every time you couple to ensure they are secure and not leaking.'
    },
    {
        id: 'comb_39',
        text: 'If the trailer has no spring brakes, and the air pressure drops:',
        options: [
            'The brakes will lock up automatically',
            'The trailer could roll away if not chocked',
            'The emergency line will close',
            'Nothing happens'
        ],
        correctIndex: 1,
        explanation: 'Without spring brakes, there is no mechanical force to hold the brakes if air is lost.'
    },
    {
        id: 'comb_40',
        text: 'When you are coupling, the trailer should be valid at what height?',
        options: [
            'Where the kingpin is even with the fifth wheel',
            'Where the trailer lifts the tractor slightly',
            'Where the tractor lifts the trailer slightly',
            'Where the landing gear is way off the ground'
        ],
        correctIndex: 2,
        explanation: 'The tractor should lift the trailer slightly when coupling to ensure the kingpin is at the right height.'
    },
    {
        id: 'comb_41',
        text: 'What is the danger of "bobtailing" in wet weather?',
        options: [
            'It is safer',
            'It is harder to steer',
            'It is easier to skid',
            'It uses more fuel'
        ],
        correctIndex: 2,
        explanation: 'Bobtailing (driving without a trailer) reduces weight on rear axles, making skidding more likely.'
    },
    {
        id: 'comb_42',
        text: 'When hauling a heavy load, you should avoid:',
        options: [
            'Using the engine brake',
            'Turning widely',
            'Quick lane changes',
            'Stopping often'
        ],
        correctIndex: 2,
        explanation: 'Quick lane changes with a heavy loads can cause rollovers due to the "crack-the-whip" effect.'
    },
    {
        id: 'comb_43',
        text: 'What is the minimum number of tiedowns for a 20-foot load?',
        options: [
            '1',
            '2',
            '3',
            '4'
        ],
        correctIndex: 1,
        explanation: 'You need at least one tiedown for every 10 feet of cargo, and at least 2 tiedowns total.'
    },
    {
        id: 'comb_44',
        text: 'The "no-zone" refers to:',
        options: [
            'Areas where trucks cannot go',
            'Blind spots around a truck',
            'Parking prohibited areas',
            'Speed limit zones'
        ],
        correctIndex: 1,
        explanation: 'No-zones are the danger areas (blind spots) around trucks where crashes are more likely.'
    },
    {
        id: 'comb_45',
        text: 'If you swing wide to the left before turning right, another driver may:',
        options: [
            'Stop behind you',
            'Try to pass you on the right',
            'Honk at you',
            'Follow you'
        ],
        correctIndex: 1,
        explanation: 'Swinging left creates a gap that other drivers might try to squeeze into on your right.'
    },
    {
        id: 'comb_46',
        text: 'You are coupling a semi-trailer to your tractor but have not yet backed under. The trailer is at the right height when:',
        options: [
            'The kingpin is about 1/4 inch above the fifth wheel',
            'The end of the kingpin is even with the top of the fifth wheel',
            'It will be raised slightly when the tractor is backed under it',
            'The kingpin is lower than the fifth wheel'
        ],
        correctIndex: 2,
        explanation: 'The trailer should be slightly lower than the fifth wheel so it lifts up onto it.'
    },
    {
        id: 'comb_47',
        text: 'When checking the trailer\'s emergency brakes, the tractor protection control valve should be placed in the ___ position.',
        options: [
            'Normal',
            'Emergency',
            'Neutral',
            'Exhaust'
        ],
        correctIndex: 1,
        explanation: 'Placing the valve in emergency (or pulling the red knob) evacuates air to test the spring brakes.'
    },
    {
        id: 'comb_48',
        text: 'You have a major leak in the service line and you put on the brakes. Service air pressure will escape and cause the:',
        options: [
            'Trailer emergency brakes to come on',
            'Tractor spring brakes to lock',
            'Air compressor to stop',
            'Engine to stall'
        ],
        correctIndex: 0,
        explanation: 'Loss of service line pressure will trigger the emergency brakes on the trailer.'
    },
    {
        id: 'comb_49',
        text: 'To stop a trailer skid, you should:',
        options: [
            'Use the trailer hand brake',
            'Release the service brakes',
            'Steer hard left',
            'Accelerate'
        ],
        correctIndex: 1,
        explanation: 'Release the brakes to allow the wheels to regain traction.'
    },
    {
        id: 'comb_50',
        text: 'The tractor protection valve will close and the trailer emergency brakes will come on when there is a major leak in the ___ brake line.',
        options: [
            'Select',
            'Emergency',
            'Service',
            'Parking'
        ],
        correctIndex: 1,
        explanation: 'A major leak in the emergency line causes pressure loss that triggers the emergency brakes.'
    },
    {
        id: 'comb_51',
        text: 'When should you lower the landing gear?',
        options: [
            'Before uncoupling',
            'After uncoupling',
            'While driving',
            'Never'
        ],
        correctIndex: 0,
        explanation: 'Lower the landing gear before uncoupling to support the trailer.'
    },
    {
        id: 'comb_52',
        text: 'If you cannot make a turn without entering another traffic lane, you should:',
        options: [
            'Turn wide as you complete the turn',
            'Turn wide as you start the turn',
            'Not make the turn',
            'Honk your horn'
        ],
        correctIndex: 0,
        explanation: 'Turn wide as you complete the turn to keep the rear of the trailer from hitting the curb.'
    },
    {
        id: 'comb_53',
        text: 'When driving a set of doubles, it is necessary to close the ___ shut-off valve in the last trailer.',
        options: [
            'Front',
            'Middle',
            'Back',
            'Side'
        ],
        correctIndex: 2,
        explanation: 'The back shut-off valve on the last trailer must be closed to seal the air system.'
    },
    {
        id: 'comb_54',
        text: 'Which of these is NOT a good thing to do when driving on slippery roads?',
        options: [
            'Use the retarder or jake brake',
            'Drive slower',
            'Increase following distance',
            'Use gentle braking'
        ],
        correctIndex: 0,
        explanation: 'Retarders can cause drive wheels to lock up on slippery surfaces.'
    },
    {
        id: 'comb_55',
        text: 'Air lines on a combination vehicle are often colored to prevent mixing them up. The emergency line is ___ and the service line is ___.',
        options: [
            'Red; Blue',
            'Blue; Red',
            'Black; Yellow',
            'Green; White'
        ],
        correctIndex: 0,
        explanation: 'Red is for Emergency, Blue is for Service.'
    },
    {
        id: 'comb_56',
        text: 'You are coupling a tractor and semi-trailer and have connected the air lines. Before backing under the trailer you should:',
        options: [
            'Pull forward',
            'Supply air to the trailer system, then pull out the air supply knob to lock the trailer brakes',
            'Disconnect the air lines',
            'Check the oil'
        ],
        correctIndex: 1,
        explanation: 'Charge the trailer air system and set the trailer brakes to ensure it doesn\'t move while coupling.'
    },
    {
        id: 'comb_57',
        text: 'Ideally, the fifth wheel should be inspected:',
        options: [
            'Monthly',
            'Weekly',
            'Before each trip',
            'Annually'
        ],
        correctIndex: 2,
        explanation: 'Coupling devices should be inspected as part of the pre-trip inspection.'
    },
    {
        id: 'comb_58',
        text: 'The best way to prevent a rollover is to:',
        options: [
            'Maintain a high center of gravity',
            'Drive fast in curves',
            'Keep cargo close to the ground',
            'Load cargo on one side'
        ],
        correctIndex: 2,
        explanation: 'Keeping cargo low and centered is key to preventing rollovers.'
    },
    {
        id: 'comb_59',
        text: 'Large combination vehicles take longer to stop when they are:',
        options: [
            'Empty',
            'Fully loaded',
            'Partially loaded',
            'New'
        ],
        correctIndex: 0,
        explanation: 'Empty combination vehicles often take longer to stop than loaded ones due to less traction.'
    },
    {
        id: 'comb_60',
        text: 'When backing up with a trailer, you try to position your vehicle so you can back in a straight line. If you must back on a curved path, back to the:',
        options: [
            'Driver\'s side',
            'Passenger\'s side',
            'Right side',
            'Blind side'
        ],
        correctIndex: 0,
        explanation: 'Back to the driver\'s side so you can see better.'
    },
    {
        id: 'comb_61',
        text: 'When uncoupling, disconnect the electrical cable and:',
        options: [
            'Leave it hanging',
            'Plug it into the dummy receptacle',
            'Throw it in the cab',
            'Wrap it around the air lines'
        ],
        correctIndex: 1,
        explanation: 'Plug the electrical cable into the dummy receptacle (or secure it) to prevent damage.'
    },
    {
        id: 'comb_62',
        text: 'How much space should be between the tractor and trailer when inspecting the coupling?',
        options: [
            'None',
            '1 foot',
            '2 feet',
            'Specifically between the upper and lower fifth wheel: NONE'
        ],
        correctIndex: 3,
        explanation: 'There should be no light or space visible between the upper and lower fifth wheel plates.'
    },
    {
        id: 'comb_63',
        text: 'Which trailer is most likely to rollover?',
        options: [
            'A flatbed with a low load',
            'A tank truck with baffles',
            'A fully loaded 53-foot van',
            'A double trailer'
        ],
        correctIndex: 2,
        explanation: 'High center of gravity loads (like vans) are more prone to rollover than low flatbeds.'
    },
    {
        id: 'comb_64',
        text: 'When driving a combination vehicle, you should check your mirrors:',
        options: [
            'Every 30 seconds',
            'Only when turning',
            'Frequently (every 5-8 seconds)',
            'Rarely'
        ],
        correctIndex: 2,
        explanation: 'Frequent mirror checks are essential for safe operation of large vehicles.'
    },
    {
        id: 'comb_65',
        text: 'If you have a trailer jackknife, the trailer wheels will:',
        options: [
            'Follow the tractor wheels',
            'Slide sideways',
            'Lock up',
            'Speed up'
        ],
        correctIndex: 1,
        explanation: 'In a jackknife, the trailer swings out and slides sideways.'
    }
];
