import { StudyGuide } from './study_types';

export const GeneralKnowledgeStudyGuide: StudyGuide = {
    topicId: 'general_knowledge', // Matches 'General Knowledge' in mock.ts
    sections: [
        {
            id: 'gk-intro',
            title: '1. Introduction',
            content: [
                "There is a federal requirement that each state have minimum standards for the licensing of commercial drivers. This manual provides driver license testing information for drivers who wish to have a commercial driver’s license (CDL).",
                "You must have a CDL to operate: Any single vehicle with a gross vehicle weight rating (GVWR) of 26,001 pounds or more; A combination vehicle with a gross combination weight rating of 26,001 or more pounds, provided the GVWR of the vehicle(s) being towed is in excess of 10,000 pounds; A vehicle designed to transport 16 or more passengers (including the driver); Any size vehicle which requires hazardous material placards.",
                "To get a CDL, you must pass knowledge and skills tests. This manual will help you pass the tests. This manual is not a substitute for a truck driver training class or program. Formal training is the most reliable way to learn the many special skills required for safely driving a large commercial vehicle and becoming a professional driver in the trucking industry."
            ],
            keyPoints: [
                "CDL stands for Commercial Driver's License.",
                "You need a CDL for vehicles 26,001+ lbs.",
                "You need a CDL for vehicles carrying 16+ passengers or Hazardous Materials."
            ],
            reviewQuestions: [
                {
                    id: 'q1',
                    text: "Which of these requires a CDL?",
                    options: [
                        "A vehicle with a GVWR of 20,000 lbs",
                        "A vehicle designed to transport 10 passengers",
                        "A single vehicle with a GVWR of 26,001 pounds or more",
                        "A personal pickup truck"
                    ],
                    correctIndex: 2,
                    explanation: "A CDL is required for single vehicles with a GVWR of 26,001 pounds or more."
                }
            ]
        },
        {
            id: 'gk-inspection',
            title: '2.1 Vehicle Inspection',
            content: [
                "Safety is the most important reason you inspect your vehicle, safety for yourself and for other road users.",
                "A vehicle defect found during an inspection could save you problems later. You could have a breakdown on the road that will cost time and dollars, or even worse, a crash caused by the defect.",
                "Federal and state laws require that drivers inspect their vehicles. Federal and state inspectors also may inspect your vehicles. If they judge the vehicle to be unsafe, they will put it 'out of service' until it is fixed."
            ],
            keyPoints: [
                "Safety is the #1 reason to inspect.",
                "Breakdowns cost time and money.",
                "Inspectors can put your vehicle 'out of service'."
            ],
            reviewQuestions: [
                {
                    id: 'q2',
                    text: "What is the most important reason for vehicle inspection?",
                    options: [
                        "To keep the truck clean",
                        "Safety",
                        "To save fuel",
                        "To pass time"
                    ],
                    correctIndex: 1,
                    explanation: "Safety for yourself and other road users is the most important reason."
                }
            ]
        },
        {
            id: 'gk-control',
            title: '2.2 Basic Control of Your Vehicle',
            content: [
                "To drive a vehicle safely, you must be able to control its speed and direction. Safe operation of a commercial vehicle requires skill in: Accelerating, Steering, Stopping, and Backing safely.",
                "Fasten your seatbelt when on the road. Apply the parking brake when you leave your vehicle.",
                "Accelerating: Don't roll back when you start. You may hit someone behind you. If you have a manual transmission vehicle, partly engage the clutch before you take your right foot off the brake. Put on the parking brake whenever necessary to keep from rolling back. Release the parking brake only when you have applied enough engine power to keep from rolling back. Speed up smoothly and gradually so the vehicle does not jerk. Rough acceleration can cause mechanical damage. When pulling a trailer, rough acceleration can damage the coupling.",
                "Steering: Hold the steering wheel firmly with both hands. Your hands should be on opposite sides of the wheel. If you hit a curb or a pothole (chuckhole), the wheel could pull away from your hands unless you have a firm hold.",
                "Stopping: Push the brake pedal down gradually. The amount of brake pressure you need to stop the vehicle will depend on the speed of the vehicle and how quickly you need to stop. Control the pressure so the vehicle comes to a smooth, safe stop. If you have a manual transmission, push the clutch in when the engine is close to idle."
            ],
            keyPoints: [
                "Hold steering wheel with both hands on opposite sides.",
                "Speed up smoothly to avoid damage.",
                "Don't roll back when starting; use parking brake if needed."
            ],
            reviewQuestions: [
                {
                    id: 'q3',
                    text: "Why should you hold the steering wheel firmly with both hands?",
                    options: [
                        "It looks more professional",
                        "To keep the wheel from pulling away if you hit a bump",
                        "To rest your arms",
                        "To steer faster"
                    ],
                    correctIndex: 1,
                    explanation: "If you hit a curb or pothole, the wheel could pull away unless you have a firm hold."
                },
                {
                    id: 'q4',
                    text: "How should you accelerate?",
                    options: [
                        "As fast as possible",
                        "Smoothly and gradually",
                        "In short bursts",
                        "Only when downhill"
                    ],
                    correctIndex: 1,
                    explanation: "Speed up smoothly and gradually so the vehicle does not jerk and to avoid mechanical damage."
                }
            ]
        },
        {
            id: 'gk-shifting',
            title: '2.3 Shifting Gears',
            content: [
                "Correct shifting of gears is important. If you can't get your vehicle into the right gear while driving, you will have less control.",
                "Special conditions where you should downshift are: Before starting down a hill; Before entering a curve.",
                "Downshift before starting down a hill. Slow down and shift down to a speed that you can control without using the brakes hard. Otherwise the brakes can overheat and lose their braking power.",
                "Downshift before entering a curve. Slow down to a safe speed, and downshift to the right gear before entering the curve. This lets you use some power through the curve to help the vehicle be more stable while turning. It also allows you to speed up as soon as you are out of the curve."
            ],
            keyPoints: [
                "Downshift BEFORE going down a hill.",
                "Downshift BEFORE entering a curve.",
                "Correct shifting gives you better control."
            ],
            reviewQuestions: [
                {
                    id: 'q5',
                    text: "When should you downshift for a curve?",
                    options: [
                        "Reviewing the turn",
                        "While inside the curve",
                        "After the curve",
                        "Before entering the curve"
                    ],
                    correctIndex: 3,
                    explanation: "Slow down and downshift to the right gear BEFORE entering the curve to maintain stability."
                }
            ]
        },
        {
            id: 'gk-seeing',
            title: '2.4 Seeing',
            content: [
                "To be a safe driver you need to know what's going on all around your vehicle. Not looking properly is a major cause of accidents.",
                "All drivers look ahead; but many don't look far enough ahead. Importance of Looking Far Enough Ahead: Because stopping or changing lanes can take a lot of distance, knowing what the traffic is doing on all sides of you is very important. You need to look well ahead to make sure you have room to make these moves safely.",
                "How Far Ahead to Look: Most good drivers look at least 12 to 15 seconds ahead. That means looking for the distance you will travel in 12 to 15 seconds. At lower speeds, that's about one block. At highway speeds it's about a quarter of a mile."
            ],
            keyPoints: [
                "Look 12-15 seconds ahead.",
                "At highway speeds, 12-15 seconds is about 1/4 mile.",
                "At city speeds, it's about one block."
            ],
            reviewQuestions: [
                {
                    id: 'q6',
                    text: "How far ahead should you look while driving?",
                    options: [
                        "1-2 seconds",
                        "5-8 seconds",
                        "12-15 seconds",
                        "As far as you can see"
                    ],
                    correctIndex: 2,
                    explanation: "Most good drivers look at least 12 to 15 seconds ahead."
                }
            ]
        },
        {
            id: 'gk-communicating',
            title: '2.5 Communicating',
            content: [
                "Other drivers can't know what you are going to do until you tell them. Signaling what you intend to do is important for safety.",
                "Turn Signals: There are three good rules for using turn signals: 1. Signal early. Signal well before you turn. 2. Signal continuously. You need both hands on the wheel to turn safely. 3. Cancel your signal. Don't forget to turn off your turn signal after you've turned (if you don't have self-canceling signals).",
                "Lane Changes: Put your turn signal on before changing lanes. Change lanes slowly and smoothly. That way a driver you didn't see may have a chance to honk his horn, or avoid your vehicle.",
                "Slowing Down: Warn drivers behind you when you see you'll need to slow down. A few light taps on the brake pedal - enough to flash the brake lights - should warn following drivers. Use the four-way emergency flashers for times when you are driving very slowly or are stopped. Warn other drivers in any of the following situations: Trouble Ahead, Tight Turns, Stopping on the Road, Driving Slowly. Don't Direct Traffic."
            ],
            keyPoints: [
                "Signal early, continuously, and cancel after turning.",
                "Flash brake lights to warn of slowing down.",
                "Use 4-way flashers when driving very slowly or stopped.",
                "Never direct traffic for others."
            ],
            reviewQuestions: [
                {
                    id: 'q7',
                    text: "What are the three rules for using turn signals?",
                    options: [
                        "Signal late, signal briefly, cancel signal",
                        "Signal early, signal continuously, cancel signal",
                        "Signal early, signal periodically, leave signal on",
                        "Signal only for left turns"
                    ],
                    correctIndex: 1,
                    explanation: "Signal early, signal continuously, and cancel your signal after the turn."
                }
            ]
        },
        {
            id: 'gk-space',
            title: '2.6 Controlling Speed',
            content: [
                "Driving too fast is a major cause of fatal crashes. You must adjust your speed depending on driving conditions. These include traction, curves, visibility, traffic and hills.",
                "Stopping Distance: Perception Distance + Reaction Distance + Braking Distance = Total Stopping Distance.",
                "Perception Distance: The distance your vehicle travels, in ideal conditions; from the time your eyes see a hazard until your brain recognizes it. The average perception time for an alert driver is 1 3/4 seconds. At 55 mph this accounts for 142 feet traveled.",
                "Reaction Distance: The distance you will continue to travel, in ideal conditions; before you physically hit the brakes, in response to a hazard seen ahead. The average driver has a reaction time of 3/4 second to 1 second. At 55 mph this accounts for 61 feet traveled.",
                "Braking Distance: The distance your vehicle will travel, in ideal conditions; while you are braking. At 55 mph on dry pavement with good brakes, it can take about 216 feet."
            ],
            keyPoints: [
                "Total Stopping Distance = Perception + Reaction + Braking Distance.",
                "Perception time is about 1.75 seconds.",
                "Reaction time is about 0.75 to 1 second."
            ],
            reviewQuestions: [
                {
                    id: 'q8',
                    text: "What makes up Total Stopping Distance?",
                    options: [
                        "Reaction Distance + Braking Distance",
                        "Perception Distance + Reaction Distance + Braking Distance",
                        "Braking Distance + Viewing Distance",
                        "Thinking Distance + Stopping Distance"
                    ],
                    correctIndex: 1,
                    explanation: "Total Stopping Distance is the sum of Perception Distance, Reaction Distance, and Braking Distance."
                }
            ]
        },
        {
            id: 'gk-space-management',
            title: '2.7 Managing Space',
            content: [
                "To be a safe driver, you need space all around your vehicle. When things go wrong, space gives you time to think and to take action.",
                "To have space available when something goes wrong, you need to manage space. While this is true for all drivers, it is very important for large vehicles. They take up more space and they require more space for stopping and turning.",
                "Space Ahead: Of all the space around your vehicle, it is the area ahead of the vehicle--the space you're driving into --that is most important.",
                "The Need for Space Ahead: You need space ahead in case you must abruptly stop. According to accident reports, the vehicle that trucks and buses most often run into is the one in front of them. The most frequent cause is following too closely.",
                "How Much Space? How much space should you keep in front of you? One good rule says you need at least one second for each 10 feet of vehicle length at good speeds. For example, if you are driving a 40-foot vehicle, you should leave 4 seconds between you and the vehicle ahead. In a 60-foot rig, you'll need 6 seconds. Over 40 mph, you'd need 5 seconds for a 40-foot vehicle and 7 seconds for a 60-foot vehicle."
            ],
            keyPoints: [
                "Manage space all around your vehicle.",
                "Space ahead is the most important.",
                "Rule: 1 second for each 10 feet of vehicle length (add 1 second for speeds over 40mph)."
            ],
            reviewQuestions: [
                {
                    id: 'q9',
                    text: "How much space should you leave in front of you?",
                    options: [
                        "1 second for every 20 feet of vehicle length",
                        "1 second for every 10 feet of vehicle length",
                        "2 seconds regardless of length",
                        "3 car lengths"
                    ],
                    correctIndex: 1,
                    explanation: "You need at least one second for each 10 feet of vehicle length at speeds below 40 mph. Add one second for speeds over 40 mph."
                }
            ]
        },
        {
            id: 'gk-hazards',
            title: '2.8 Seeing Hazards',
            content: [
                "What Is a Hazard? A hazard is any road condition or other road user (driver, bicyclist, pedestrian) that is a possible danger. For example, a car in front of you is headed toward the freeway exit, but his brake lights come on and he begins braking hard. This could mean that the driver is uncertain about taking the off ramp. He might suddenly return to the highway. This car is a hazard. If the driver of the car cuts in front of you, it is no longer just a hazard; it is an emergency.",
                "Seeing Hazards Lets You Be Prepared. You will have more time to act if you see hazards before they become emergencies. In the example above, you might make a lane change or slow down to prevent a crash if the car suddenly cuts in front of you. Seeing this hazard gives you time to check your mirrors and signal a lane change. Being prepared reduces the danger. A driver who did not see the hazard until the slow car pulled back on the highway in front of him would have to do something very suddenly. Sudden braking or a quick lane change is much more likely to cause a crash.",
                "Move-Over Laws. The laws commonly require drivers to slow and, if safe to do so, vacate the lane closest to the stationary vehicles. Some state laws apply only to emergency vehicles, while others apply to all stationary vehicles with flashing lights."
            ],
            keyPoints: [
                "A hazard is a possible danger (road condition or user).",
                "Seeing hazards early gives you time to plan.",
                "Move Over laws protect stopped emergency vehicles."
            ],
            reviewQuestions: [
                {
                    id: 'q10',
                    text: "What is the definition of a hazard?",
                    options: [
                        "An emergency situation",
                        "A crash that has already happened",
                        "Any road condition or user that is a possible danger",
                        "A violation of traffic law"
                    ],
                    correctIndex: 2,
                    explanation: "A hazard is any road condition or other road user that is a possible danger."
                }
            ]
        },
        {
            id: 'gk-distracted',
            title: '2.9 Distracted Driving',
            content: [
                "Distracted driving is a major cause of crashes. A driver manual should discuss: The effects of distracted driving; Types of distractions; Cell phone usage.",
                "Types of Distractions: Physical distractions (reaching for an object, eating, drinking) and Mental distractions (talking with a passenger, thinking about something else).",
                "Mobile Phones: It is illegal for CMV drivers to use a hand-held mobile telephone while driving. Penalties include fines and disqualification. You may use a hands-free device if it can be initiated with a single touch.",
                "Don't Engage in Distracting Activities: Pre-program radio stations. Review maps before starting. excessive eating or smoking."
            ],
            keyPoints: [
                "Don't use hand-held cell phones while driving.",
                "Mental distractions are just as dangerous as physical ones.",
                "Penalties for hand-held phone use include fines and CDL disqualification."
            ],
            reviewQuestions: [
                {
                    id: 'q-distracted',
                    text: "What is the penalty for a CMV driver using a hand-held mobile phone while driving?",
                    options: [
                        "A warning ticket",
                        "Fines and potential CDL disqualification",
                        "Points on license only",
                        "Increased insurance rates only"
                    ],
                    correctIndex: 1,
                    explanation: "Violation can result in civil penalties (fines) up to $2,750 and driver disqualification for multiple offenses."
                }
            ]
        },
        {
            id: 'gk-aggressive',
            title: '2.10 Aggressive Drivers/Road Rage',
            content: [
                "Aggressive Driving: The act of operating a motor vehicle in a selfish, bold, or pushy manner, without regard for the rights or safety of others (e.g., tailgating, changing lanes frequently).",
                "Road Rage: Operating a motor vehicle with the intent of doing physical harm to others or physically assaulting a driver or their vehicle.",
                "How to Avoid Being a Victim: Do not make eye contact. Do not challenge them. Get out of their way. Report aggressive drivers to authorities when safe to do so."
            ],
            keyPoints: [
                "Aggressive driving is selfish/pushy behavior.",
                "Road rage is the intent to cause harm.",
                "Avoid eye contact and do not engage with aggressive drivers."
            ],
            reviewQuestions: [
                {
                    id: 'q-aggressive',
                    text: "What is the main difference between aggressive driving and road rage?",
                    options: [
                        "Aggressive driving is faster",
                        "Road rage involves the intent to do physical harm",
                        "Aggressive driving is legal",
                        "There is no difference"
                    ],
                    correctIndex: 1,
                    explanation: "Road rage involves the intent to do physical harm, whereas aggressive driving is selfish/bold operation."
                }
            ]
        },
        {
            id: 'gk-night',
            title: '2.11 Night Driving',
            content: [
                "You are at greater risk when you drive at night. Drivers can't see hazards as quickly as in daylight, so they have less time to respond. Drivers caught by surprise are less able to avoid a crash.",
                "Factors: Vision (people can't see as well at night), Glare (from oncoming lights), Fatigue (more likely to be tired).",
                "Headlights: Use high beams when it is safe and legal to do so. Low beams let you see about 250 feet ahead. High beams let you see about 350-500 feet ahead. You should dim your lights within 500 feet of an oncoming vehicle or when following another vehicle within 500 feet.",
                "Speed: Do not overdrive your headlights. You should be able to stop within the distance you can see ahead."
            ],
            keyPoints: [
                "Use high beams when safe/legal (see 350-500 ft).",
                "Dim lights within 500 ft of other vehicles.",
                "Don't overdrive your headlights (stop within seeing distance)."
            ],
            reviewQuestions: [
                {
                    id: 'q-night',
                    text: "When should you dim your headlights at night?",
                    options: [
                        "When driving in the city only",
                        "Within 500 feet of an oncoming vehicle",
                        "When you are tired",
                        "Within 100 feet of an oncoming vehicle"
                    ],
                    correctIndex: 1,
                    explanation: "Dim your lights within 500 feet of an oncoming vehicle or when following another vehicle within 500 feet."
                }
            ]
        },
        {
            id: 'gk-fog',
            title: '2.12 Driving in Fog',
            content: [
                "Fog completely can obscure visibility. The best advice for driving in fog is: Don't. Pull off the road into a rest area or truck stop until visibility is better.",
                "If You Must Drive in Fog: Obey all fog-related warning signs. Slow down before you enter the fog. Use low-beam headlights and fog lights for best visibility even in daytime, and be alert for other drivers who may have forgotten to turn on their lights. Turn on your 4-way flashers. This gives vehicles approaching you from behind a better chance to see your vehicle.",
                "Watch for Vehicles on the Roadside: Vehicles may be parked on the shoulder. Avoid passing other vehicles."
            ],
            keyPoints: [
                "Don't drive in fog if possible.",
                "Use low-beam headlights (high beams reflect off fog).",
                "Use 4-way flashers to warn others."
            ],
            reviewQuestions: [
                {
                    id: 'q-fog',
                    text: "What lights should you use when driving in fog?",
                    options: [
                        "High beams",
                        "Parking lights only",
                        "Low beams and fog lights",
                        "No lights"
                    ],
                    correctIndex: 2,
                    explanation: "Use low-beam headlights and fog lights. High beams reflect off the water droplets in the fog and can blind you."
                }
            ]
        },
        {
            id: 'gk-winter',
            title: '2.13 Winter Driving',
            content: [
                "Vehicle Checks: Make sure your vehicle is ready before driving in winter weather. You should check the coolant level and antifreeze amount. Make sure the defrosting and heating equipment work. Wipers and washers need to be in good working order and have enough fluid.",
                "Slippery Surfaces: Drive slowly and smoothly on slippery roads. If it is very slippery, you shouldn't drive at all. Stop at the first safe place.",
                "Start Gently and Slowly: When first starting, get the feel of the road. Don't hurry.",
                "Adjust Turning and Braking to Conditions: Make turns as gently as possible. Don't brake any harder than necessary, and don't use the engine brake or speed retarder. (They can cause the driving wheels to skid on slippery surfaces).",
                "Adjust Speed to Conditions: Don't pass slower vehicles unless necessary. Go slowly and watch far enough ahead to keep a steady speed. Avoid having to slow down and speed up. When your vehicle is heavily loaded, it will take longer to stop."
            ],
            keyPoints: [
                "Check coolant, heaters, and wipers before winter driving.",
                "Avoid using the engine brake on slippery surfaces.",
                "Drive slowly and smoothly; stop if it's too slippery."
            ],
            reviewQuestions: [
                {
                    id: 'q11',
                    text: "Should you use the engine brake on slippery surfaces?",
                    options: [
                        "Yes, it helps slow down safely",
                        "No, it can cause the driving wheels to skid",
                        "Only if going downhill",
                        "Only if the vehicle is empty"
                    ],
                    correctIndex: 1,
                    explanation: "Don't use the engine brake or speed retarder on slippery surfaces because they can cause the driving wheels to skid."
                }
            ]
        },
        {
            id: 'gk-hot-weather',
            title: '2.14 Driving in Very Hot Weather',
            content: [
                "Do not let air out or the pressure will be too low when the tires cool off. If a tire is too hot to touch, remain stopped until the tire cools off. Otherwise the tire may blow out or catch fire.",
                "Tires: Check the tire mounting and air pressure. Inspect the tires every two hours or every 100 miles when driving in very hot weather. Air pressure increases with temperature.",
                "Engine Oil: The engine oil helps keep the engine cool, as well as lubricating it. Make sure there is enough engine oil.",
                "Engine Coolant: Before starting out, make sure the engine cooling system has enough water and antifreeze according to the engine manufacturer's directions.",
                "Bleeding Tar: Tar in the road pavement frequently rises to the surface in very hot weather. Spots where tar 'bleeds' to the surface are very slippery."
            ],
            keyPoints: [
                "Inspect tires every 2 hours/100 miles in hot weather.",
                "Air pressure increases with heat - DO NOT let air out.",
                "Watch for bleeding tar (slippery)."
            ],
            reviewQuestions: [
                {
                    id: 'q-hot-weather',
                    text: "What should you do if tire pressure is high due to hot weather?",
                    options: [
                        "Let air out until it reaches normal pressure",
                        "Do not let air out",
                        "Drive faster to cool them down",
                        "Pour water on them"
                    ],
                    correctIndex: 1,
                    explanation: "Air pressure increases with temperature. Do not let air out or the pressure will be too low when they cool off."
                }
            ]
        },
        {
            id: 'gk-railroad',
            title: '2.15 Railroad-Highway Crossings',
            content: [
                "Railroad-highway grade crossings are a special kind of intersection where the roadway crosses train tracks. These crossings are always dangerous.",
                "Passive Crossings: This type of crossing does not have any type of traffic control device. The decision to stop or proceed rests entirely in your hands.",
                "Active Crossings: This type of crossing has a traffic control device installed at the crossing to regulate traffic (flashing red lights, bells, gates).",
                "Advance Warning Signs: The round, black-on-yellow warning sign is placed ahead of a public railroad-highway crossing.",
                "Driving Procedures: Never race a train to a crossing. Reduce speed. Look and listen. Double tracks require a double check.",
                "Stopping: If you must stop, stop 15 to 50 feet from the nearest rail.",
                "Crossing the Tracks: Do not shift gears while crossing railroad tracks. You could get stuck on the tracks."
            ],
            keyPoints: [
                "Never race a train.",
                "Stop 15-50 feet from the nearest rail if required.",
                "DO NOT shift gears while crossing tracks."
            ],
            reviewQuestions: [
                {
                    id: 'q-railroad',
                    text: "When should you shift gears while crossing railroad tracks?",
                    options: [
                        "Always downshift on tracks",
                        "Upshift for speed",
                        "Never shift gears on tracks",
                        "Only if the train is far away"
                    ],
                    correctIndex: 2,
                    explanation: "Do not shift gears while crossing railroad tracks. If you miss a gear, you could get stuck on the tracks."
                }
            ]
        },
        {
            id: 'gk-mountain',
            title: '2.16 Mountain Driving',
            content: [
                "In mountain driving, gravity plays a major role. On any upgrade, gravity slows you down. On downgrades, gravity speeds you up. You must select an appropriate safe speed, then a low gear, and use proper braking techniques.",
                "Select a Safe Speed: Your most important consideration is to select a speed that is not too fast for the: Total weight of the vehicle and cargo; Length of the grade; Steepness of the grade; Road conditions; Weather.",
                "Select the Right Gear: Shift into a low gear before you start down the grade. Don't try to downshift after your speed has already built up. You will not be able to shift into a lower gear.",
                "Brake Fading or Failure: Brakes can fade or fail from excessive heat caused by using them too much and not relying on the engine braking effect.",
                "Proper Braking Technique (Snub Braking): 1. Apply the brakes just hard enough to feel a definite slowdown. 2. When your speed has been reduced to approx. 5 mph below your safe speed, release the brakes. 3. When your speed has increased to your safe speed, repeat step 1. (Example: If safe speed is 40 mph, brake to 35 mph, release, wait for 40 mph, repeat)."
            ],
            keyPoints: [
                "Gravity slows you on upgrades and speeds you on downgrades.",
                "Shift into low gear BEFORE starting down a hill.",
                "Use Snub Braking to control speed without overheating brakes."
            ],
            reviewQuestions: [
                {
                    id: 'q-mountain',
                    text: "What is the proper braking technique on a long downgrade?",
                    options: [
                        "Use light, steady pressure on the brakes",
                        "Fan the brakes (pump them rapidly)",
                        "Snub braking: Brake to 5 mph below safe speed, release, repeat",
                        "Use only the emergency brake"
                    ],
                    correctIndex: 2,
                    explanation: "Snub braking involves applying brakes within a safe range (e.g., 40 to 35 mph) to prevent overheating."
                }
            ]
        },
        {
            id: 'gk-emergencies',
            title: '2.17 Driving Emergencies',
            content: [
                "Traffic emergencies occur when two vehicles are about to collide. Vehicle emergencies occur when tires, brakes, or other critical parts fail. Following the safety practices in this manual can help prevent emergencies. But if an emergency does happen, your chances of avoiding a crash depend upon how well you take action. Actions you can take are Steering to Avoid a Crash, Stopping Quickly and handling Brake Failure.",
                "Steering to Avoid a Crash: Stopping is not always the safest thing to do in an emergency. When you don't have enough room to stop, you may have to steer away from what's ahead. Remember, you can almost always turn to miss an obstacle more quickly than you can stop. (However, top-heavy vehicles and tractors with multiple trailers may flip over).",
                "Tire Failure: Identify tire failure by Sound (loud bang), Vibration (heavy thumping), or Feel (steering feels heavy). Response: Hold the steering wheel firmly. Stay off the brake. Check the tires."
            ],
            keyPoints: [
                "You can turn to miss an obstacle faster than you can stop.",
                "If a tire blows out, hold the steering wheel firmly and stay off the brake.",
                "Don't brake until the vehicle has slowed down."
            ],
            reviewQuestions: [
                {
                    id: 'q12',
                    text: "What should you do if a tire blows out?",
                    options: [
                        "Brake hard immediately",
                        "Steer sharply to the shoulder",
                        "Hold the steering wheel firmly and stay off the brake",
                        "Accelerate to maintain stability"
                    ],
                    correctIndex: 2,
                    explanation: "If a tire blows out, hold the steering wheel firmly and stay off the brake until the vehicle has slowed down."
                }
            ]
        },
        {
            id: 'gk-abs',
            title: '2.18 Antilock Braking Systems (ABS)',
            content: [
                "ABS is a computerized system that keeps your wheels from locking up during hard brake applications. ABS is an addition to your normal brakes. It does not decrease or increase your normal braking capability. ABS only activates when wheels are about to lock up.",
                "How to Know if Your Vehicle is Equipped with ABS: Tractors, trucks, and buses will have yellow ABS malfunction lamps on the instrument panel. Trailers will have yellow ABS malfunction lamps on the left side, either on the front or rear corner.",
                "How ABS Helps You: When you brake hard on slippery surfaces in a vehicle without ABS, your wheels may lock up. When your steering wheels lock up, you lose steering control. When your other wheels lock up, you may skid or jackknife. ABS helps you avoid wheel lock up and maintain control. You may or may not be able to stop faster with ABS, but you should be able to steer around an obstacle while braking, and avoid skids caused by over braking."
            ],
            keyPoints: [
                "ABS keeps wheels from locking up.",
                "ABS allows you to steer while braking.",
                "Yellow ABS malfunction lamps indicate if the system is working."
            ],
            reviewQuestions: [
                {
                    id: 'q13',
                    text: "What is the primary benefit of ABS?",
                    options: [
                        "It makes the vehicle stop faster",
                        "It allows you to steer while braking and prevents wheel lockup",
                        "It increases engine power",
                        "It prevents tire blowouts"
                    ],
                    correctIndex: 1,
                    explanation: "ABS helps you avoid wheel lock up and maintain steering control during hard braking."
                }
            ]
        },
        {
            id: 'gk-skid',
            title: '2.19 Skid Control and Recovery',
            content: [
                "A skid happens whenever the tires lose their grip on the road. This is caused in one of four ways: Over-braking, Over-steering, Over-acceleration, or Driving Too Fast.",
                "Drive-Wheel Skids: The most common skid is one where the rear wheels lose traction through excessive braking or acceleration. Skids caused by acceleration usually happen on ice or snow.",
                "Correcting a Drive-Wheel Braking Skid: Stop braking. This will let the rear wheels roll again, and keep the rear wheels from sliding any further.",
                "Front-Wheel Skids: Driving too fast for conditions causes most front-wheel skids. Other causes include lack of tread on the front tires and cargo loaded so not enough weight is on the front axle. In a front-wheel skid, the front end tends to go in a straight line regardless of how much you turn the steering wheel. On a very slippery surface, you may not be able to steer around a curve or turn. The only way to stop the skid is to let the vehicle slow down. Stop turning and/or braking so hard. Slow down as quickly as possible without skidding."
            ],
            keyPoints: [
                "Most skids are caused by driving too fast or over-braking.",
                "Drive-wheel braking skid correction: Stop braking.",
                "Front-wheel skid correction: Let the vehicle slow down."
            ],
            reviewQuestions: [
                {
                    id: 'q14',
                    text: "What causes most front-wheel skids?",
                    options: [
                        "Driving too slowly",
                        "Driving too fast for conditions",
                        "Turning too gently",
                        "Uneven road surfaces"
                    ],
                    correctIndex: 1,
                    explanation: "Driving too fast for conditions causes most front-wheel skids."
                }
            ]
        },
        {
            id: 'gk-accident',
            title: '2.20 Accident Procedures',
            content: [
                "When you're in an accident and not seriously hurt, you need to act to prevent further damage or injury. The basic steps to be taken at any accident are to: Protect the area, Notify authorities, and Care for the injured.",
                "Protect the Area: The first thing to do at an accident scene is to keep another accident from happening in the same spot. To protect the accident area: If your vehicle is involved in the accident, try to get it to the side of the road. This will help prevent another accident and allow traffic to move. If you're stopping to help, park away from the accident. The area immediately around the accident will be needed for emergency vehicles. Put on your flashers. Set out reflective triangles to warn other traffic. Make sure key other drivers can see them in time to avoid the accident.",
                "Notify Authorities: If you have a cell phone or CB, call for assistance before you get out of your vehicle. If not, wait until after the accident scene has been properly protected, then phone or send someone to phone the police. Try to determine where you are so you can give the exact location.",
                "Care for the Injured: If a qualified person is at the accident and helping the injured, stay out of the way unless asked to assist. Otherwise, do the best you can to help any injured parties. Here are some simple steps to follow in giving assistance: Don't move a severely injured person unless the danger of fire or passing traffic makes it necessary. Stop heavy bleeding by applying direct pressure to the wound. Keep the injured person warm."
            ],
            keyPoints: [
                "Basic steps: Protect area, Notify authorities, Care for injured.",
                "Use flashers/triangles to warn traffic.",
                "Don't move injured persons unless absolutely necessary."
            ],
            reviewQuestions: [
                {
                    id: 'q15',
                    text: "What are the three basic steps to take at an accident scene?",
                    options: [
                        "Call insurance, take photos, leave",
                        "Protect the area, notify authorities, care for the injured",
                        "Move the vehicles, argue with other driver, call police",
                        "Inspect damage, call mechanic, wait"
                    ],
                    correctIndex: 1,
                    explanation: "The basic steps are to Protect the area, Notify authorities, and Care for the injured."
                }
            ]
        },
        {
            id: 'gk-fires',
            title: '2.21 Fires',
            content: [
                "Causes of Fire: The most common causes are: After Accidents (spilled fuel), Tires (under-inflated and duals touching), Electrical System (short circuits due to damaged insulation), Fuel (driver smoking, loose fuel connections), and Cargo (flammable cargo, poor ventilation).",
                "Fire Fighting: Knowing how to fight fires is important. Divers who have caused fires and know how to use an extinguisher can prevent small fires from becoming major disasters.",
                "Extinguishing the Fire: Stay as far away from the fire as possible. Aim at the source or base of the fire, not up in the flames. Use the Right Extinguisher (Type B/C for electrical and fuel fires). Never use water on an electrical fire or gasoline fire (it spreads the fuel).",
                "Engine Fires: Turn off the engine as soon as you can. Do not open the hood if you can avoid it. Shoot foam through louvers, radiator, or from the vehicle's underside. Opening the hood supplies oxygen so that the fire will burn faster."
            ],
            keyPoints: [
                "Common causes: Tires, Electrical, Fuel, Cargo.",
                "Use Type B/C extinguishers for vehicle fires.",
                "Do NOT open the hood for an engine fire (it adds oxygen).",
                "Aim at the base of the fire."
            ],
            reviewQuestions: [
                {
                    id: 'q16',
                    text: "What should you do if you have an engine fire?",
                    options: [
                        "Open the hood immediately to cool it down",
                        "Drive faster to blow out the flames",
                        "Turn off the engine and shoot foam through louvers (do not open hood)",
                        "Pour water on the engine"
                    ],
                    correctIndex: 2,
                    explanation: "Turn off the engine. Do not open the hood as it adds oxygen. Shoot extinguisher foam through louvers or from underneath."
                }
            ]
        },
        {
            id: 'gk-alcohol',
            title: '2.22 Alcohol and Other Drugs',
            content: [
                "Drinking alcohol and then driving is a very dangerous problem. People who drink alcohol are involved in traffic accidents resulting in over 20,000 deaths every year. Alcohol impairs muscle coordination, reaction time, depth perception, and night vision. It also affects the parts of the brain that control judgment and inhibition.",
                "BAC Limits: The legal limit for commercial drivers is usually lower than for car drivers. In most places, you will be put out of service for 24 hours if you have ANY detectable amount of alcohol. The BAC limit for a DUI in a CMV is 0.04%.",
                "Other Drugs: Use of drugs can lead to traffic accidents resulting in death, injury, and property damage. It is illegal to operate a CMV if your ability to drive safely is impaired by the use of any drug, including prescription and over-the-counter drugs."
            ],
            keyPoints: [
                "Alcohol impairs judgment, coordination, and reaction time.",
                "Legal BAC limit for CMV drivers is 0.04%.",
                "You will be put out of service for 24 hours for ANY detectable alcohol."
            ],
            reviewQuestions: [
                {
                    id: 'q17',
                    text: "What is the BAC limit for driving a commercial motor vehicle?",
                    options: [
                        "0.08%",
                        "0.04%",
                        "0.10%",
                        "0.01%"
                    ],
                    correctIndex: 1,
                    explanation: "The Blood Alcohol Concentration (BAC) limit for operating a CMV is 0.04%."
                }
            ]
        },
        {
            id: 'gk-fatigue',
            title: '2.23 Staying Alert and Fit to Drive',
            content: [
                "Driving a vehicle for long hours is tiring. Even the best of drivers will become less alert. However, there are things that good drivers do to help keep alert and safe.",
                "Fatigue: Fatigue (being tired) and lack of alertness are major causes of accidents. The only cure for fatigue is sleep. If you are tired, get off the road and sleep.",
                "Hours of Service: Strict regulations limit the hours you can drive. You must keep a log of your hours. Violating these rules is dangerous and illegal.",
                "Warning Signs: You may be fatigued if you: Can't remember the last few miles driven, drift from your lane, yawn repeatedly, or have heavy eyes. If you notice these, stop and sleep."
            ],
            keyPoints: [
                "The only cure for fatigue is sleep.",
                "Stop driving if you can't remember the last few miles.",
                "Follow Hours of Service regulations."
            ],
            reviewQuestions: [
                {
                    id: 'q18',
                    text: "What is the only sure cure for fatigue?",
                    options: [
                        "Drinking coffee",
                        "Opening the window",
                        "Sleep",
                        "Turning up the radio"
                    ],
                    correctIndex: 2,
                    explanation: "The only sure cure for fatigue is sleep. Coffee and fresh air only provide short-term relief."
                }
            ]
        },
        {
            id: 'gk-hazmat',
            title: '2.24 Hazardous Materials Rules',
            content: [
                "Hazardous materials are products that pose a risk to health, safety, and property during transportation. The term includes explosives, various types of gas, solids, flammable and combustible liquid, and other materials.",
                "Intent of the Rules: The rules are intended to Provide Safe Drivers and Equipment, Communicate the Risk, and Contain the Product.",
                "Placards: Placards are used to warn others of hazardous materials. They are diamond-shaped signs placed on the outside of the vehicle. You must have the proper placards to haul hazmat unless the amount is small enough to be exempt.",
                "Driver Responsibilities: Drivers must refuse leaking packages, check papers and placards, and keep papers in reach (on the seat or in the door pouch) or in view."
            ],
            keyPoints: [
                "Hazmat rules exist to Contain the Product, Communicate Risk, and Ensure Safety.",
                "Placards are diamond-shaped warning signs.",
                "Hazmat shipping papers must be within reach or in clear view."
            ],
            reviewQuestions: [
                {
                    id: 'q19',
                    text: "Where must Hazardous Materials shipping papers be kept?",
                    options: [
                        "In the glove box",
                        "In the trunk",
                        "In the sleeper berth",
                        "Within reach of the driver (seat or door pouch) or in clear view"
                    ],
                    correctIndex: 3,
                    explanation: "Shipping papers must be kept within reach (e.g., door pouch) or in clear view on the seat while driving."
                }
            ]
        },
        {
            id: 'gk-cargo',
            title: '3.0 Cargo Securement',
            content: [
                "Whether or not you load and secure the cargo yourself, you are responsible for: Inspecting your cargo, Recognizing overloads and poorly balanced weight, Knowing your cargo is properly secured, and knowing it does not restrict your view or access to emergency equipment.",
                "Inspecting Cargo: Inspect cargo within the first 50 miles of a trip and every 150 miles or every 3 hours (whichever comes first) after.",
                "Tie-Downs: Cargo must be secured by tie-downs. You need at least one tie-down for each 10 feet of cargo. No matter how small the cargo, you must use at least two tie-downs.",
                "Header Boards: Front-end header boards ('headache racks') protect you from your cargo in case of a crash or sudden stop."
            ],
            keyPoints: [
                "Inspect cargo every 3 hours or 150 miles.",
                "Use at least 1 tie-down for every 10 feet of cargo.",
                "Minimum of 2 tie-downs for any cargo.",
                "Header boards protect the driver."
            ],
            reviewQuestions: [
                {
                    id: 'q20',
                    text: "How often must you inspect your cargo during a trip?",
                    options: [
                        "Every 6 hours",
                        "Every stop only",
                        "Within first 50 miles, then every 3 hours or 150 miles",
                        "Before the trip only"
                    ],
                    correctIndex: 2,
                    explanation: "You must check your cargo within the first 50 miles, and then every 3 hours or 150 miles thereafter."
                }
            ]
        },
        {
            id: 'gk-weight-balance',
            title: '3.2 Weight and Balance',
            content: [
                "Definitions: Gross Vehicle Weight (GVW) is the total weight of a single vehicle plus its load. Gross Combination Weight (GCW) is the total weight of a powered unit, plus trailer(s), plus the cargo. Gross Vehicle Weight Rating (GVWR) is the maximum GVW specified by the manufacturer.",
                "Center of Gravity: The center of gravity is the point where the vehicle's weight is balanced. A high center of gravity means you are more likely to tip over. It is most dangerous in curves or if you swerve to avoid a hazard. Keep the cargo as close to the ground as possible and centered.",
                "Balance the Weight: Poor weight balance can make vehicle handling unsafe. Too much weight on the steering axle can cause hard steering. Under-loaded front axles (caused by shifting weight fast to the rear) can make the steering axle weight too light to steer safely."
            ],
            keyPoints: [
                "High center of gravity = High risk of rollover.",
                "Keep cargo low and centered.",
                "Poor weight balance affects steering and braking."
            ],
            reviewQuestions: [
                {
                    id: 'q21',
                    text: "What is the danger of a high center of gravity?",
                    "options": [
                        "It makes the vehicle slower",
                        "It makes the vehicle more likely to tip over",
                        "It saves fuel",
                        "It improves traction"
                    ],
                    correctIndex: 1,
                    explanation: "A high center of gravity makes the vehicle more unstable and likely to tip over, especially on curves."
                }
            ]
        },
        {
            id: 'gk-special-cargo',
            title: '3.4 Cargo Needing Special Attention',
            content: [
                "Dry Bulk: Dry bulk tanks require special care because they have a high center of gravity, and the load can shift. Be extremely diligent when going around curves and making sharp turns.",
                "Hanging Meat: Hanging meat (suspended beef, pork, etc.) in a refrigerated truck can be a very unstable load with a high center of gravity. Caution on curves is needed to prevent the load from swaying and overturning the truck.",
                "Livestock: Livestock can move around in a trailer, causing unsafe handling. With less than a full load, use false bulkheads to keep livestock bunched together. Even when bunched, expect the center of gravity to shift on curves.",
                "Oversized Loads: Over-length, over-width, and/or overweight loads require special transit permits. Driving is usually limited to certain times. Special equipment may be necessary such as \"Wide Load\" signs, flashing lights, flags, etc."
            ],
            keyPoints: [
                "Dry bulk and hanging meat have high centers of gravity.",
                "Livestock can move and shift the vehicle's balance.",
                "Oversized loads require special permits and signs."
            ],
            reviewQuestions: [
                {
                    id: 'q22',
                    text: "Which of these loads is known for having a high center of gravity and being unstable?",
                    "options": [
                        "Flatbed lumber",
                        "Hanging meat",
                        "Empty trailer",
                        "Canned goods"
                    ],
                    correctIndex: 1,
                    explanation: "Hanging meat has a high center of gravity and can sway, making the truck unstable on curves."
                }
            ]
        }
    ]
};

// =====================================================
// COMBINATION VEHICLES STUDY GUIDE
// =====================================================
export const CombinationsStudyGuide: StudyGuide = {
    topicId: 'combinations',
    sections: [
        {
            id: 'comb-intro',
            title: '1. Introduction to Combination Vehicles',
            content: [
                "Combination vehicles are heavier, longer, and require more driving skill than single commercial vehicles. This includes tractor-trailers, doubles, triples, and trucks towing trailers.",
                "Driving combinations safely requires understanding their handling differences: they're more likely to rollover, jackknife, and have longer stopping distances.",
                "You need a Class A CDL to operate most combination vehicles. The Combination Vehicles test is required for the Class A CDL."
            ],
            keyPoints: [
                "Combination vehicles are heavier and longer than singles.",
                "Higher risk of rollover and jackknife.",
                "Class A CDL required for most combinations."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q1',
                    text: "Why do combination vehicles require more driving skill?",
                    options: [
                        "They are more comfortable",
                        "They are heavier, longer, and have different handling characteristics",
                        "They have better brakes",
                        "They are easier to park"
                    ],
                    correctIndex: 1,
                    explanation: "Combination vehicles are heavier, longer, and require understanding of rollover risks, jackknifing, and longer stopping distances."
                }
            ]
        },
        {
            id: 'comb-rollover',
            title: '2. Rollover Risks',
            content: [
                "Rollovers are more common in combination vehicles due to their higher center of gravity. More than half of truck driver deaths in crashes are from rollovers.",
                "The major factors that cause rollovers are: Speed (taking curves or turns too fast), Load (top-heavy or improperly loaded cargo), and Steering (sudden steering movements).",
                "Keep the cargo as low as possible. Fully loaded rigs are 10 times more likely to roll over than empty rigs.",
                "Slow down before curves. The posted speed limit may be too fast for a loaded truck. If the sign says 35 mph, you should slow down to around 30 mph or less.",
                "Steer gently. Making quick lane changes or swerving to avoid a hazard can cause a rollover. It's often safer to hit something than to roll over."
            ],
            keyPoints: [
                "Rollovers cause more than half of truck driver deaths.",
                "Slow down before curves - posted speed may be too fast.",
                "Full trucks are 10x more likely to roll than empty ones.",
                "Steer gently to avoid rollover."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q2',
                    text: "What causes most truck rollovers?",
                    options: [
                        "Tire blowouts",
                        "Taking curves too fast, top-heavy loads, or sudden steering",
                        "Engine failure",
                        "Bad weather only"
                    ],
                    correctIndex: 1,
                    explanation: "The major causes are speed (curves too fast), load (top-heavy cargo), and steering (sudden movements)."
                }
            ]
        },
        {
            id: 'comb-steering',
            title: '3. Steering and Off-Tracking',
            content: [
                "When a vehicle goes around a corner, the rear wheels follow a different path than the front wheels. This is called off-tracking or 'cheating.'",
                "The longer the vehicle, the more it will off-track. This is why you must swing wide to make turns, especially right turns.",
                "Trailers can hit other vehicles, pedestrians, or fixed objects during turns because of off-tracking.",
                "The crack-the-whip effect: When changing lanes, the rear of the trailer tends to swing. Longer combinations have more swing."
            ],
            keyPoints: [
                "Rear wheels follow a shorter path than front wheels (off-tracking).",
                "Longer vehicles off-track more.",
                "Swing wide on turns to avoid hitting objects.",
                "Watch for 'crack-the-whip' effect on lane changes."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q3',
                    text: "What is off-tracking?",
                    options: [
                        "When the truck goes off the road",
                        "When the rear wheels follow a shorter path than the front wheels",
                        "When the GPS loses signal",
                        "When the trailer disconnects"
                    ],
                    correctIndex: 1,
                    explanation: "Off-tracking (cheating) is when the rear wheels follow a different, shorter path than the front wheels around curves."
                }
            ]
        },
        {
            id: 'comb-jackknife',
            title: '4. Preventing Jackknife',
            content: [
                "A jackknife is when the trailer pushes the tractor, causing it to swing out and potentially flip. This happens when the drive wheels lose traction.",
                "Common causes: Over-braking, especially without ABS. Excessive speed on curves. Slippery roads with little traction.",
                "To prevent jackknifing: Don't brake too hard or too suddenly. Use engine braking and controlled snub braking on downgrades. Slow down for curves.",
                "If you start to jackknife: Release the brakes to let the drive wheels regain traction, then straighten out.",
                "Jackknifes are more likely when the trailer is empty (light) because there's less weight on the drive wheels."
            ],
            keyPoints: [
                "Jackknife = trailer pushes the tractor sideways.",
                "Caused by over-braking or losing traction.",
                "If jackknifing, release brakes to regain traction.",
                "Empty trailers are more likely to jackknife."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q4',
                    text: "What should you do if you start to jackknife?",
                    options: [
                        "Brake harder",
                        "Accelerate quickly",
                        "Release the brakes to regain traction",
                        "Turn the steering wheel sharply"
                    ],
                    correctIndex: 2,
                    explanation: "Release the brakes to let the drive wheels regain traction and straighten out."
                }
            ]
        },
        {
            id: 'comb-braking',
            title: '5. Braking and Stopping Distance',
            content: [
                "Combination vehicles take longer to stop than single vehicles because of their greater weight. Stopping distance increases significantly with speed.",
                "Empty trucks can be harder to stop than loaded trucks because less weight presses the tires to the road, reducing traction.",
                "Brake early and gradually. Avoid sudden braking which can cause jackknifing or loss of control.",
                "On wet or icy roads, stopping distance can double or triple. Slow down and increase following distance.",
                "Use snub braking on long downgrades: Apply brakes firmly to reduce speed by 5 mph, then release. Repeat as needed."
            ],
            keyPoints: [
                "Heavier vehicles need more distance to stop.",
                "Empty trucks can be harder to stop (less traction).",
                "Brake early and gradually to avoid jackknife.",
                "Wet/icy roads dramatically increase stopping distance."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q5',
                    text: "Why can empty trucks be harder to stop than loaded trucks?",
                    options: [
                        "They have weaker brakes",
                        "Less weight means less traction on the tires",
                        "The engine is less powerful",
                        "The driver is less experienced"
                    ],
                    correctIndex: 1,
                    explanation: "Empty trucks have less weight pressing the tires to the road, which reduces traction and makes stopping harder."
                }
            ]
        },
        {
            id: 'comb-coupling',
            title: '6. Coupling Tractor-Trailers',
            content: [
                "Coupling is connecting the tractor to the trailer. Proper coupling is critical for safety.",
                "Step 1: Inspect the Fifth Wheel. Check that it tilts toward the trailer, the jaws are open, the release handle is in the automatic lock position, and it's properly greased.",
                "Step 2: Inspect the Trailer. Check the kingpin, the apron (plate under the front of the trailer), and the air/electrical lines.",
                "Step 3: Position the Tractor. Back slowly under the trailer, keeping the trailer kingpin aligned with the fifth wheel.",
                "Step 4: Connect. Back until the fifth wheel locks around the kingpin. You should hear a click or snap. Test by pulling forward gently.",
                "Step 5: Secure. Connect air lines (emergency first, then service). Connect electrical cord. Raise landing gear fully. Do a visual check that the kingpin is locked in the jaws."
            ],
            keyPoints: [
                "Inspect fifth wheel and kingpin before coupling.",
                "Back slowly and align kingpin with fifth wheel.",
                "Connect emergency air line FIRST.",
                "Test coupling by pulling forward gently."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q6',
                    text: "When coupling, which air line should you connect first?",
                    options: [
                        "Service line",
                        "Emergency line",
                        "Either one is fine",
                        "Neither, connect them together"
                    ],
                    correctIndex: 1,
                    explanation: "Always connect the emergency air line first. This charges the trailer air tanks and allows you to test the brakes."
                }
            ]
        },
        {
            id: 'comb-uncoupling',
            title: '7. Uncoupling Tractor-Trailers',
            content: [
                "Uncoupling is disconnecting the tractor from the trailer. Improper uncoupling can cause injuries and damage.",
                "Step 1: Position the rig. Park on firm, level ground. Chock the trailer wheels or use spring brakes.",
                "Step 2: Lower landing gear. Lower it until it firmly contacts the ground and supports the trailer. If on soft ground, use boards under the legs.",
                "Step 3: Disconnect air and electrical lines. Store them properly to avoid damage.",
                "Step 4: Unlock the fifth wheel. Pull the release handle to unlock the jaws.",
                "Step 5: Pull tractor forward. Pull the tractor partly out from under the trailer. Stop with the tractor frame still under the trailer to prevent it from falling.",
                "Step 6: Secure the tractor. When the tractor clears, pull away completely and secure for parking."
            ],
            keyPoints: [
                "Park on firm, level ground.",
                "Lower landing gear fully before disconnecting.",
                "Store air/electrical lines safely.",
                "Pull tractor forward slowly to clear the trailer."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q7',
                    text: "When uncoupling, why should you lower the landing gear before disconnecting?",
                    options: [
                        "To make the trailer lighter",
                        "To support the trailer so it doesn't fall when the tractor pulls away",
                        "To check the tires",
                        "To save time"
                    ],
                    correctIndex: 1,
                    explanation: "The landing gear must support the trailer weight when the tractor is removed, preventing the trailer from falling."
                }
            ]
        },
        {
            id: 'comb-inspect',
            title: '8. Inspecting Combination Vehicles',
            content: [
                "In addition to regular pre-trip inspection items, combination vehicles require inspecting the coupling system.",
                "Fifth Wheel Check: Look for damage or missing parts. Check mounting bolts. The locking jaws should be around the shank of the kingpin, not the head. The release arm should be in the locked position.",
                "Air Line Check: Check for leaks, cuts, or other damage. Couplings (gladhands) should be clean and connected properly. Air lines should have enough slack for turns.",
                "Electrical Cord Check: Check for damage. Make sure it's properly connected and secured.",
                "Sliding Fifth Wheel Check: If equipped, check that the slide is locked in position. Check for missing pins, cracked welds, or damaged components."
            ],
            keyPoints: [
                "Inspect the coupling system carefully.",
                "Locking jaws must be around the kingpin shank, not head.",
                "Check air lines for leaks and proper connection.",
                "Verify sliding fifth wheel is locked."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q8',
                    text: "Where should the fifth wheel locking jaws be positioned on the kingpin?",
                    options: [
                        "Around the head of the kingpin",
                        "Around the shank (narrow part) of the kingpin",
                        "Above the kingpin",
                        "Below the kingpin"
                    ],
                    correctIndex: 1,
                    explanation: "The jaws should be around the shank (narrow part) of the kingpin, not the head. If around the head, the trailer can come loose."
                }
            ]
        },
        {
            id: 'comb-trailerbrakes',
            title: '9. Trailer Air Brakes',
            content: [
                "Combination vehicles use air brakes. The trailer brakes work through air lines connecting to the tractor.",
                "Emergency Line (Supply Line): The emergency line supplies air to the trailer air tanks. It also controls the emergency brakes on the trailer. Loss of air pressure will cause the trailer brakes to come on.",
                "Service Line (Control Line): The service line carries air controlled by the foot brake or trailer hand valve. This line tells the trailer brakes how hard to apply.",
                "Trailer Hand Valve: Used to apply the trailer brakes only. Should only be used to test trailer brakes. Never use it for parking (the brakes can release and the vehicle will roll).",
                "Breakaway: If the trailer separates from the tractor, the emergency line loses pressure and the trailer brakes lock up automatically. This is a safety feature."
            ],
            keyPoints: [
                "Emergency line charges trailer tanks and controls emergency brakes.",
                "Service line controls how hard trailer brakes apply.",
                "Trailer hand valve is for testing, NOT for parking.",
                "If trailer breaks away, emergency brakes activate automatically."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q9',
                    text: "What happens if the trailer's emergency air line breaks or disconnects?",
                    options: [
                        "The trailer will speed up",
                        "Nothing happens",
                        "The trailer brakes will lock up automatically",
                        "The tractor brakes will fail"
                    ],
                    correctIndex: 2,
                    explanation: "Loss of air pressure in the emergency line causes the trailer's spring brakes to come on automatically, stopping the trailer."
                }
            ]
        },
        {
            id: 'comb-doubles',
            title: '10. Doubles and Triples',
            content: [
                "Doubles and triples require extra caution. They have more articulation points, making them more prone to rollover and instability.",
                "Crack-the-whip effect: The last trailer in a set of doubles or triples is the most likely to overturn. Quick lane changes or sudden movements at the front amplify at the rear.",
                "Coupling doubles/triples: The heaviest trailer should be closest to the tractor. The lightest trailer should be at the rear.",
                "Inspection: Check all coupling devices, including pintle hooks, drawbars, and safety chains. Inspect all air and electrical connections between units.",
                "Following distance: Allow even more following distance for doubles and triples. They take longer to stop and are less stable."
            ],
            keyPoints: [
                "Last trailer is most likely to roll ('crack-the-whip').",
                "Heaviest trailer goes closest to the tractor.",
                "Inspect all coupling points and connections.",
                "Allow extra following distance."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q10',
                    text: "When coupling doubles, which trailer should be closest to the tractor?",
                    options: [
                        "The lightest trailer",
                        "The heaviest trailer",
                        "The shortest trailer",
                        "It doesn't matter"
                    ],
                    correctIndex: 1,
                    explanation: "The heaviest trailer should be closest to the tractor for better stability. The lightest goes at the rear."
                }
            ]
        }
    ]
};

// =====================================================
// AIR BRAKES STUDY GUIDE
// =====================================================
export const AirBrakesStudyGuide: StudyGuide = {
    topicId: 'air_brakes',
    sections: [
        {
            id: 'air-intro',
            title: '1. Parts of an Air Brake System',
            content: [
                "Air brakes use compressed air to make the brakes work. They are a safe way to stop heavy vehicles, but they have more parts and are harder to maintain than hydraulic brakes.",
                "Air Compressor: Pumps air into the air storage tanks. It connects to the engine through gears or a V-belt.",
                "Air Compressor Governor: Controls when the compressor pumps air. It cuts in (starts pumping) at around 100 psi and cuts out (stops pumping) at around 125 psi.",
                "Air Storage Tanks: Hold compressed air. They have drain valves to remove water and oil (sludge) that collects in the bottom.",
                "Safety Valve: Protects the tank from too much pressure. It usually opens at 150 psi. If it opens, something is wrong."
            ],
            keyPoints: [
                "Governor cuts in at 100 psi and out at 125 psi.",
                "Drain valves remove water and oil from tanks.",
                "Safety valve opens at 150 psi (warning sign)."
            ],
            reviewQuestions: [
                {
                    id: 'air-q1',
                    text: "When does the air compressor governor 'cut out'?",
                    options: [
                        "At 100 psi",
                        "At 125 psi",
                        "At 150 psi",
                        "At 60 psi"
                    ],
                    correctIndex: 1,
                    explanation: "The governor stops pumping air (cuts out) when the tank pressure reaches around 125 psi."
                }
            ]
        },
        {
            id: 'air-parts',
            title: '2. Brake System Components',
            content: [
                "Brake Pedal: Pressing it pushes air into the brake chambers. Releasing it lets air out.",
                "S-Cam Brakes: The most common type. Air pushes a push rod, which moves a slack adjuster, which turns the S-cam. The S-cam pushes brake shoes against the drum.",
                "Brake Drums/Shoes: Drums are the outer part that turns. Shoes are the inner part with linings that press against the drum to stop it.",
                "Slack Adjusters: Used to adjust the brakes. If they are manual, they must be checked and adjusted frequently."
            ],
            keyPoints: [
                "S-Cam is the most common foundation brake.",
                "Push rod -> Slack Adjuster -> S-Cam -> Brake Shoes.",
                "Slack adjusters fix the gap between shoes and drum."
            ],
            reviewQuestions: [
                {
                    id: 'air-q2',
                    text: "What part of the brake system pushes the brake shoes against the drum?",
                    options: [
                        "The S-Cam",
                        "The air compressor",
                        "The governor",
                        "The safety valve"
                    ],
                    correctIndex: 0,
                    explanation: "The S-cam turns and forces the brake shoes against the inside of the brake drum."
                }
            ]
        },
        {
            id: 'air-dual',
            title: '3. Dual Air Brake Systems',
            content: [
                "Most modern heavy vehicles use dual air brake systems for safety. It has two separate air systems which use a single set of controls.",
                "Primary System: Usually operates the rear axle brakes.",
                "Secondary System: Usually operates the front axle brakes.",
                "Before driving, allow time for the air compressor to build up a minimum of 100 psi pressure in BOTH the primary and secondary systems."
            ],
            keyPoints: [
                "Two systems (Primary/Secondary) for safety.",
                "Must build 100 psi in BOTH systems before driving."
            ],
            reviewQuestions: [
                {
                    id: 'air-q3',
                    text: "How much pressure must be in the air tanks before driving?",
                    options: [
                        "60 psi",
                        "100 psi",
                        "125 psi",
                        "150 psi"
                    ],
                    correctIndex: 1,
                    explanation: "You must build up a minimum of 100 psi in both the primary and secondary systems before driving."
                }
            ]
        },
        {
            id: 'air-inspection-1',
            title: '4. Inspecting Air Brakes (Step 1-2)',
            content: [
                "Step 1: Engine compartment check. Check the air compressor drive belt (if equipped). Condition: snug, not frayed/cracked. Deflection: press in center, should deflect 1/2 to 3/4 inch.",
                "Step 2: Walk-around inspection. Check manual slack adjusters on S-cam brakes. Park on level ground, chock wheels, release parking brakes. Pull hard on each slack adjuster. It should not move more than 1 inch.",
                "Check brake drums (no cracks longer than 1/2 the width of friction area) and linings (not too thin, no grease/oil)."
            ],
            keyPoints: [
                "Slack adjusters shouldn't move more than 1 inch when pulled.",
                "Check belt deflection (1/2 - 3/4 inch).",
                "No oil/grease on brake linings."
            ],
            reviewQuestions: [
                {
                    id: 'air-q4',
                    text: "How much can a slack adjuster move when pulled by hand?",
                    options: [
                        "More than 2 inches",
                        "No more than 1 inch",
                        "It shouldn't move at all",
                        "Up to 3 inches"
                    ],
                    correctIndex: 1,
                    explanation: "If a slack adjuster moves more than about one inch where the push rod attaches to it, it needs adjustment."
                }
            ]
        },
        {
            id: 'air-inspection-2',
            title: '5. The 3-Step Air Leakage Test',
            content: [
                "This is CRITICAL for the CDL test.",
                "1. Test Low Pressure Warning: Turn engine off, key ON. Pump the brake pedal to release air. The warning signal (light/buzzer) MUST come on before pressure drops to 60 psi.",
                "2. Test Spring Brakes: Continue fanning (pumping) the brakes. The spring brake protection valve should pop out (brakes apply) when pressure drops to 20-45 psi.",
                "3. Static & Applied Leakage Test: Build pressure back to max. Turn engine off. Release parking brake. Fully apply foot brake and hold for 1 minute. Clean truck shouldn't lose more than 3 psi (Combination: 4 psi)."
            ],
            keyPoints: [
                "Low air warning MUST come on by 60 psi.",
                "Spring brakes MUST pop out between 20-45 psi.",
                "Leakage rate (applied): max 3 psi/min (single), 4 psi/min (combo)."
            ],
            reviewQuestions: [
                {
                    id: 'air-q5',
                    text: "At what pressure must the low air pressure warning signal come on?",
                    options: [
                        "Before it drops to 60 psi",
                        "Before it drops to 30 psi",
                        "At 100 psi",
                        "At 125 psi"
                    ],
                    correctIndex: 0,
                    explanation: "The low air pressure warning signal must come on before the pressure drops to less than 60 psi."
                }
            ]
        },
        {
            id: 'air-using-1',
            title: '6. Using Air Brakes',
            content: [
                "Normal Stops: Push the brake pedal down. Control the pressure so the vehicle comes to a smooth, safe stop.",
                "Emergency Stops: If you must stop quickly, brake so you can steer and keep the vehicle in a straight line. Use 'Controlled Braking' (squeeze hard but don't lock) or 'Stab Braking' (brake all the way, release when wheels lock, repeat).",
                "Braking Lag: Air brakes take longer to work than hydraulic brakes because air takes time to flow. At 55 mph, this adds about 32 feet to your stopping distance."
            ],
            keyPoints: [
                "Brake lag adds distance (32 ft at 55 mph).",
                "Controlled braking: Apply brakes hard without locking.",
                "Stab braking: Lock wheels, release, repeat."
            ],
            reviewQuestions: [
                {
                    id: 'air-q6',
                    text: "What is brake lag?",
                    options: [
                        "The time required for the driver to see a hazard",
                        "The time it takes for the air to flow through the lines to the brakes",
                        "The time it takes to move your foot to the pedal",
                        "The distance the truck slides"
                    ],
                    correctIndex: 1,
                    explanation: "Brake lag is the time required for the air to flow through the lines to the brakes after you press the pedal."
                }
            ]
        },
        {
            id: 'air-using-2',
            title: '7. Braking on Downgrades',
            content: [
                "Brake Fading: Brakes can fade or fail from excessive heat caused by using them too much. DO NOT ride the brakes down a hill.",
                "Proper Technique: 1. Select a safe low gear (engine braking). 2. Brake firmly to slow to 5 mph below your safe speed. 3. Release brakes. 4. Wait for speed to increase to safe speed. 5. Repeat.",
                "This is called 'Snub Braking'."
            ],
            keyPoints: [
                "Heat causes brake fade.",
                "Use engine braking and snub braking.",
                "Apply brakes to reduce speed 5 mph, then release."
            ],
            reviewQuestions: [
                {
                    id: 'air-q7',
                    text: "Why should you avoid using the brakes continuously on a long downhill?",
                    options: [
                        "It wastes fuel",
                        "It wears out the tires",
                        "The brakes can overheat and fail (fade)",
                        "It is illegal"
                    ],
                    correctIndex: 2,
                    explanation: "Excessive use of service brakes results in overheating and leads to brake fade."
                }
            ]
        },
        {
            id: 'air-parking',
            title: '8. Parking Brakes',
            content: [
                "Any time you park, use the parking brakes, with two exceptions: 1. The brakes are very hot (they can warp the drums). 2. The brakes are wet in freezing temperatures (they can freeze).",
                "Spring Brakes: A mechanical spring applies the brakes when air pressure is removed. Used for parking and emergency braking.",
                "Never push the brake pedal down when the spring brakes are on. The combined force could damage the brakes."
            ],
            keyPoints: [
                "Use parking brakes every time you park.",
                "Exceptions: Very hot or wet/freezing.",
                "Don't use foot brake when parking brake is on."
            ],
            reviewQuestions: [
                {
                    id: 'air-q8',
                    text: "When should you NOT use the parking brakes?",
                    options: [
                        "When checking the oil",
                        "When the brakes are very hot or wet in freezing weather",
                        "When parking on a hill",
                        "When parking for less than 5 minutes"
                    ],
                    correctIndex: 1,
                    explanation: "Do not use parking brakes if brakes are very hot (can warp drums) or wet in freezing temps (can freeze)."
                }
            ]
        }
    ]
};

// Map of topic IDs to their study guides
export const STUDY_GUIDES: Record<string, StudyGuide> = {
    'general_knowledge': GeneralKnowledgeStudyGuide,
    'combinations': CombinationsStudyGuide,
    'air_brakes': AirBrakesStudyGuide,
};

// Localized study guide accessor
export const getStudyGuide = (topicId: string, locale: string = 'en'): StudyGuide | undefined => {
    const englishGuide = STUDY_GUIDES[topicId];
    if (!englishGuide) return undefined;

    // Try to load localized version
    if (locale === 'es') {
        try {
            const module = require('./study_content_es');
            if (topicId === 'general_knowledge' && module.GeneralKnowledgeStudyGuide_ES) {
                return module.GeneralKnowledgeStudyGuide_ES;
            }
            if (topicId === 'combinations' && module.CombinationsStudyGuide_ES) {
                return module.CombinationsStudyGuide_ES;
            }
            if (topicId === 'air_brakes' && module.AirBrakesStudyGuide_ES) {
                return module.AirBrakesStudyGuide_ES;
            }
        } catch (e) {
            console.warn(`Spanish study guide for ${topicId} not found, falling back to English`);
        }
    }
    if (locale === 'ru') {
        try {
            const module = require('./study_content_ru');
            if (topicId === 'general_knowledge' && module.GeneralKnowledgeStudyGuide_RU) {
                return module.GeneralKnowledgeStudyGuide_RU;
            }
            if (topicId === 'combinations' && module.CombinationsStudyGuide_RU) {
                return module.CombinationsStudyGuide_RU;
            }
            if (topicId === 'air_brakes' && module.AirBrakesStudyGuide_RU) {
                return module.AirBrakesStudyGuide_RU;
            }
        } catch (e) {
            console.warn(`Russian study guide for ${topicId} not found, falling back to English`);
        }
    }

    return englishGuide;
};
