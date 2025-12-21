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
        }
    ]
};

// Map of topic IDs to their study guides
export const STUDY_GUIDES: Record<string, StudyGuide> = {
    'general_knowledge': GeneralKnowledgeStudyGuide,
    // Future topics will be added here
};
