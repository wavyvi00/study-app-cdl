import { StudyGuide } from './study_types';

export const GeneralKnowledgeStudyGuide_ES: StudyGuide = {
    "topicId": "general_knowledge",
    "sections": [
        {
            "id": "gk-intro",
            "title": "1. Introducción",
            "content": [
                "Existe un requisito federal de que cada estado tenga estándares mínimos para la obtención de licencias de conductores comerciales. Este manual proporciona información sobre las pruebas de licencia de conducir para conductores que deseen tener una licencia de conducir comercial (CDL).",
                "Debe tener una CDL para operar: Cualquier vehículo con una clasificación de peso bruto vehicular (GVWR) de 26,001 libras o más; Un vehículo combinado con una clasificación de peso bruto combinado de 26,001 libras o más, siempre que el GVWR del vehículo remolcado exceda las 10,000 libras; Un vehículo diseñado para transportar 16 o más pasajeros (incluido el conductor); Vehículo de cualquier tamaño que requiera carteles de materiales peligrosos.",
                "Para obtener una CDL, debe aprobar pruebas de conocimientos y habilidades. Este manual le ayudará a superar las pruebas. Este manual no sustituye una clase o programa de capacitación para conductores de camiones. La capacitación formal es la forma más confiable de aprender las muchas habilidades especiales necesarias para conducir de manera segura un vehículo comercial grande y convertirse en un conductor profesional en la industria del transporte por carretera."
            ],
            "keyPoints": [
                "CDL significa Licencia de conducir comercial.",
                "Necesita una CDL para vehículos de más de 26,001 libras.",
                "Necesita una CDL para vehículos que transportan más de 16 pasajeros o materiales peligrosos."
            ],
            "reviewQuestions": [
                {
                    "id": "q1",
                    "text": "¿Cuál de estos requiere una CDL?",
                    "options": [
                        "Un vehículo con un GVWR de 20,000 lbs.",
                        "Un vehículo diseñado para transportar 10 pasajeros",
                        "Un solo vehículo con un GVWR de 26,001 libras o más",
                        "Una camioneta personal"
                    ],
                    "correctIndex": 2,
                    "explanation": "Se requiere una CDL para vehículos individuales con un GVWR de 26,001 libras o más."
                }
            ]
        },
        {
            "id": "gk-inspection",
            "title": "2.1 Inspección del vehículo",
            "content": [
                "La seguridad es la razón más importante por la que inspecciona su vehículo, la seguridad para usted y para los demás usuarios de la carretera.",
                "Un defecto del vehículo encontrado durante una inspección podría ahorrarle problemas más adelante. Podría sufrir una avería en la carretera que le costará tiempo y dinero, o peor aún, un accidente causado por el defecto.",
                "Las leyes federales y estatales exigen que los conductores inspeccionen sus vehículos. Los inspectores federales y estatales también pueden inspeccionar sus vehículos. Si consideran que el vehículo no es seguro, lo pondrán \"fuera de servicio\" hasta que lo arreglen."
            ],
            "keyPoints": [
                "La seguridad es la razón número uno para inspeccionar.",
                "Las averías cuestan tiempo y dinero.",
                "Los inspectores pueden poner su vehículo \"fuera de servicio\"."
            ],
            "reviewQuestions": [
                {
                    "id": "q2",
                    "text": "¿Cuál es el motivo más importante para la inspección del vehículo?",
                    "options": [
                        "Para mantener el camión limpio",
                        "Seguridad",
                        "Para ahorrar combustible",
                        "para pasar el tiempo"
                    ],
                    "correctIndex": 1,
                    "explanation": "La seguridad para usted y los demás usuarios de la vía es la razón más importante."
                }
            ]
        },
        {
            "id": "gk-control",
            "title": "2.2 Control básico de su vehículo",
            "content": [
                "Para conducir un vehículo de forma segura, debe poder controlar su velocidad y dirección. La operación segura de un vehículo comercial requiere habilidad para: acelerar, dirigir, detener y retroceder de manera segura.",
                "Abróchese el cinturón de seguridad cuando esté en la carretera. Aplique el freno de mano cuando salga de su vehículo.",
                "Acelerar: No retrocedas al empezar. Puedes golpear a alguien detrás de ti. Si tiene un vehículo con transmisión manual, active parcialmente el embrague antes de quitar el pie derecho del freno. Ponga el freno de mano siempre que sea necesario para evitar retroceder. Suelte el freno de mano sólo cuando haya aplicado suficiente potencia del motor para evitar retroceder. Acelere suave y gradualmente para que el vehículo no se sacuda. Una aceleración brusca puede causar daños mecánicos. Al tirar de un remolque, una aceleración brusca puede dañar el acoplamiento.",
                "Dirección: Sujete firmemente el volante con ambas manos. Tus manos deben estar en lados opuestos del volante. Si golpea una acera o un bache, la rueda podría soltarse de sus manos a menos que la sujete firmemente.",
                "Parar: Pise el pedal del freno gradualmente. La cantidad de presión de freno que necesita para detener el vehículo dependerá de la velocidad del vehículo y de la rapidez con la que deba detenerse. Controle la presión para que el vehículo se detenga de forma suave y segura. Si tiene una transmisión manual, presione el embrague cuando el motor esté casi en ralentí."
            ],
            "keyPoints": [
                "Sostenga el volante con ambas manos en lados opuestos.",
                "Acelere suavemente para evitar daños.",
                "No retroceda al comenzar; use el freno de mano si es necesario."
            ],
            "reviewQuestions": [
                {
                    "id": "q3",
                    "text": "¿Por qué deberías sujetar firmemente el volante con ambas manos?",
                    "options": [
                        "Se ve mas profesional",
                        "Para evitar que la rueda se salga si golpeas un bache",
                        "Para descansar tus brazos",
                        "Para conducir más rápido"
                    ],
                    "correctIndex": 1,
                    "explanation": "Si choca contra un bordillo o un bache, la rueda podría salirse a menos que la sujete firmemente."
                },
                {
                    "id": "q4",
                    "text": "¿Cómo deberías acelerar?",
                    "options": [
                        "Lo más rápido posible",
                        "Suavemente y gradualmente",
                        "En ráfagas cortas",
                        "Sólo cuando cuesta abajo"
                    ],
                    "correctIndex": 1,
                    "explanation": "Acelere suave y gradualmente para que el vehículo no se sacuda y evite daños mecánicos."
                }
            ]
        },
        {
            "id": "gk-shifting",
            "title": "2.3 Cambio de marchas",
            "content": [
                "Es importante cambiar de marcha correctamente. Si no puede poner su vehículo en la marcha correcta mientras conduce, tendrá menos control.",
                "Las condiciones especiales en las que debes reducir la marcha son: Antes de comenzar a bajar una colina; Antes de entrar en una curva.",
                "Cambie de marcha antes de comenzar a bajar una colina. Reduzca la velocidad y cambie a una velocidad que pueda controlar sin usar los frenos con fuerza. De lo contrario, los frenos podrían sobrecalentarse y perder su potencia de frenado.",
                "Reduzca la marcha antes de entrar en una curva. Reduzca la velocidad a una velocidad segura y cambie a la velocidad correcta antes de entrar en la curva. Esto le permite usar algo de potencia en la curva para ayudar a que el vehículo sea más estable al girar. También te permite acelerar tan pronto como sales de la curva."
            ],
            "keyPoints": [
                "Cambie a una velocidad descendente ANTES de bajar una colina.",
                "Reduzca la marcha ANTES de entrar en una curva.",
                "Los cambios correctos le brindan un mejor control."
            ],
            "reviewQuestions": [
                {
                    "id": "q5",
                    "text": "¿Cuándo deberías reducir la marcha en una curva?",
                    "options": [
                        "Revisando el turno",
                        "Mientras está dentro de la curva",
                        "despues de la curva",
                        "Antes de entrar en la curva"
                    ],
                    "correctIndex": 3,
                    "explanation": "Reduzca la velocidad y cambie a la velocidad correcta ANTES de entrar en la curva para mantener la estabilidad."
                }
            ]
        },
        {
            "id": "gk-seeing",
            "title": "2.4 Ver",
            "content": [
                "Para ser un conductor seguro, necesita saber qué sucede alrededor de su vehículo. No mirar correctamente es una de las principales causas de accidentes.",
                "Todos los conductores miran hacia adelante; pero muchos no miran lo suficiente hacia el futuro. Importancia de mirar lo suficientemente lejos hacia adelante: Debido a que detenerse o cambiar de carril puede requerir una gran distancia, es muy importante saber qué hace el tráfico a todos lados. Debe mirar con atención hacia adelante para asegurarse de tener espacio para realizar estos movimientos de manera segura.",
                "Qué tan lejos mirar hacia adelante: La mayoría de los buenos conductores miran al menos entre 12 y 15 segundos por delante. Eso significa buscar la distancia que recorrerás en 12 a 15 segundos. A velocidades más bajas, eso es aproximadamente una cuadra. A velocidades de autopista es aproximadamente un cuarto de milla."
            ],
            "keyPoints": [
                "Mire entre 12 y 15 segundos hacia adelante.",
                "A velocidades de autopista, 12 a 15 segundos equivalen aproximadamente a 1/4 de milla.",
                "A velocidad de ciudad, es aproximadamente una cuadra."
            ],
            "reviewQuestions": [
                {
                    "id": "q6",
                    "text": "¿A qué distancia debes mirar hacia adelante mientras conduces?",
                    "options": [
                        "1-2 segundos",
                        "5-8 segundos",
                        "12-15 segundos",
                        "Hasta donde puedes ver"
                    ],
                    "correctIndex": 2,
                    "explanation": "La mayoría de los buenos conductores miran al menos entre 12 y 15 segundos por delante."
                }
            ]
        },
        {
            "id": "gk-communicating",
            "title": "2.5 Comunicarse",
            "content": [
                "Otros conductores no pueden saber lo que usted va a hacer hasta que usted se lo diga. Señalar lo que piensa hacer es importante para la seguridad.",
                "Señales de giro: Hay tres buenas reglas para usar las señales de giro: 1. Señale con anticipación. Señale bien antes de girar. 2. Señalar continuamente. Necesitas ambas manos en el volante para girar con seguridad. 3. Cancela tu señal. No olvide apagar las señales de giro después de haber girado (si no tiene señales de cancelación automática).",
                "Cambios de carril: encienda la señal de giro antes de cambiar de carril. Cambie de carril lenta y suavemente. De esa manera, un conductor que no vio puede tener la oportunidad de tocar la bocina o evitar su vehículo.",
                "Reducir la velocidad: advierta a los conductores detrás de usted cuando vea que necesitará reducir la velocidad. Unos pocos golpes ligeros en el pedal del freno, suficientes para encender las luces de freno, deberían advertir a los conductores que vienen detrás. Utilice las luces intermitentes de emergencia de cuatro direcciones cuando conduzca muy lentamente o esté detenido. Advierta a otros conductores en cualquiera de las siguientes situaciones: problemas más adelante, giros cerrados, detenerse en la carretera, conducir lentamente. No dirija el tráfico."
            ],
            "keyPoints": [
                "Señale temprano, continuamente y cancele después de girar.",
                "Las luces de freno parpadean para advertir de una desaceleración.",
                "Utilice las luces intermitentes de 4 vías cuando conduzca muy despacio o esté detenido.",
                "Nunca dirija el tráfico hacia otros."
            ],
            "reviewQuestions": [
                {
                    "id": "q7",
                    "text": "¿Cuáles son las tres reglas para usar las señales de giro?",
                    "options": [
                        "Señalar tarde, señalar brevemente, cancelar señal",
                        "Señalar temprano, señalar continuamente, cancelar señal",
                        "Señale temprano, señalice periódicamente, deje la señal encendida",
                        "Señal solo para giros a la izquierda"
                    ],
                    "correctIndex": 1,
                    "explanation": "Señale temprano, señalice continuamente y cancele su señal después del giro."
                }
            ]
        },
        {
            "id": "gk-space",
            "title": "2.6 Control de velocidad",
            "content": [
                "Conducir demasiado rápido es una de las principales causas de accidentes mortales. Debe ajustar la velocidad según las condiciones de conducción. Estos incluyen tracción, curvas, visibilidad, tráfico y colinas.",
                "Distancia de frenado: Distancia de percepción + Distancia de reacción + Distancia de frenado = Distancia total de frenado.",
                "Distancia de percepción: La distancia que recorre su vehículo, en condiciones ideales; desde el momento en que tus ojos ven un peligro hasta que tu cerebro lo reconoce. El tiempo medio de percepción de un conductor alerta es de 1 3/4 segundos. A 55 mph esto representa 142 pies recorridos.",
                "Distancia de Reacción: La distancia que seguirás recorriendo, en condiciones ideales; antes de pisar físicamente los frenos, en respuesta a un peligro visto más adelante. El conductor medio tiene un tiempo de reacción de 3/4 de segundo a 1 segundo. A 55 mph esto representa 61 pies recorridos.",
                "Distancia de frenado: La distancia que recorrerá su vehículo, en condiciones ideales; mientras frenas. A 55 mph sobre pavimento seco con buenos frenos, puede recorrer unos 216 pies."
            ],
            "keyPoints": [
                "Distancia total de frenado = Percepción + Reacción + Distancia de frenado.",
                "El tiempo de percepción es de aproximadamente 1,75 segundos.",
                "El tiempo de reacción es de aproximadamente 0,75 a 1 segundo."
            ],
            "reviewQuestions": [
                {
                    "id": "q8",
                    "text": "¿Qué constituye la distancia total de parada?",
                    "options": [
                        "Distancia de reacción + Distancia de frenado",
                        "Distancia de percepción + Distancia de reacción + Distancia de frenado",
                        "Distancia de frenado + Distancia de visualización",
                        "Distancia de pensamiento + Distancia de parada"
                    ],
                    "correctIndex": 1,
                    "explanation": "La distancia total de parada es la suma de la distancia de percepción, la distancia de reacción y la distancia de frenado."
                }
            ]
        },
        {
            "id": "gk-space-management",
            "title": "2.7 Gestión del espacio",
            "content": [
                "Para ser un conductor seguro, necesita espacio alrededor de su vehículo. Cuando las cosas van mal, el espacio te da tiempo para pensar y actuar.",
                "Para tener espacio disponible cuando algo sale mal, es necesario gestionar el espacio. Si bien esto es cierto para todos los conductores, es muy importante para los vehículos grandes. Ocupan más espacio y requieren más espacio para detenerse y girar.",
                "Espacio delante: De todo el espacio alrededor de su vehículo, el área delante del vehículo (el espacio hacia el que conduce) es el más importante.",
                "La necesidad de espacio por delante: Necesita espacio por delante en caso de que deba detenerse abruptamente. Según los informes de accidentes, el vehículo con el que más frecuentemente chocan camiones y autobuses es el que les precede. La causa más frecuente es seguir demasiado de cerca.",
                "¿Cuánto espacio? ¿Cuánto espacio debes mantener frente a ti? Una buena regla dice que necesita al menos un segundo por cada 10 pies de longitud del vehículo a buenas velocidades. Por ejemplo, si conduce un vehículo de 40 pies, debe dejar 4 segundos entre usted y el vehículo de adelante. En una plataforma de 60 pies, necesitarás 6 segundos. A más de 40 mph, necesitarías 5 segundos para un vehículo de 40 pies y 7 segundos para un vehículo de 60 pies."
            ],
            "keyPoints": [
                "Administre el espacio alrededor de su vehículo.",
                "El espacio por delante es el más importante.",
                "Regla: 1 segundo por cada 10 pies de longitud del vehículo (agregue 1 segundo para velocidades superiores a 40 mph)."
            ],
            "reviewQuestions": [
                {
                    "id": "q9",
                    "text": "¿Cuánto espacio debes dejar frente a ti?",
                    "options": [
                        "1 segundo por cada 20 pies de longitud del vehículo",
                        "1 segundo por cada 10 pies de longitud del vehículo",
                        "2 segundos independientemente de la duración",
                        "3 longitudes de coche"
                    ],
                    "correctIndex": 1,
                    "explanation": "Necesita al menos un segundo por cada 10 pies de longitud del vehículo a velocidades inferiores a 40 mph. Agregue un segundo para velocidades superiores a 40 mph."
                }
            ]
        },
        {
            "id": "gk-hazards",
            "title": "2.8 Ver peligros",
            "content": [
                "¿Qué es un peligro? Un peligro es cualquier condición de la carretera u otro usuario de la misma (conductor, ciclista, peatón) que constituye un posible peligro. Por ejemplo, un automóvil frente a usted se dirige hacia la salida de la autopista, pero sus luces de freno se encienden y comienza a frenar con fuerza. Esto podría significar que el conductor no está seguro de tomar la rampa de salida. Podría regresar repentinamente a la carretera. Este coche es un peligro. Si el conductor del coche se le adelanta, ya no es sólo un peligro; es una emergencia.",
                "Ver los peligros le permite estar preparado. Tendrá más tiempo para actuar si ve peligros antes de que se conviertan en emergencias. En el ejemplo anterior, podrías cambiar de carril o reducir la velocidad para evitar un choque si el auto se cruza repentinamente frente a ti. Ver este peligro le da tiempo para mirar por los espejos y señalar un cambio de carril. Estar preparado reduce el peligro. Un conductor que no viera el peligro hasta que el auto lento se detuviera en la carretera frente a él tendría que hacer algo muy repentinamente. Es mucho más probable que un frenado repentino o un cambio rápido de carril provoquen un accidente.",
                "Leyes de traslado. Las leyes comúnmente exigen que los conductores reduzcan la velocidad y, si es seguro hacerlo, abandonen el carril más cercano a los vehículos estacionados. Algunas leyes estatales se aplican sólo a los vehículos de emergencia, mientras que otras se aplican a todos los vehículos estacionarios con luces intermitentes."
            ],
            "keyPoints": [
                "Un peligro es un posible peligro (condición de la carretera o usuario).",
                "Ver los peligros a tiempo le da tiempo para planificar.",
                "Las leyes Move Over protegen a los vehículos de emergencia detenidos."
            ],
            "reviewQuestions": [
                {
                    "id": "q10",
                    "text": "¿Cuál es la definición de peligro?",
                    "options": [
                        "Una situación de emergencia",
                        "Un accidente que ya pasó",
                        "Cualquier condición de la vía o usuario que sea un posible peligro.",
                        "Una infracción de la ley de tránsito."
                    ],
                    "correctIndex": 2,
                    "explanation": "Un peligro es cualquier condición de la carretera u otro usuario de la carretera que sea un posible peligro."
                }
            ]
        },
        {
            "id": "gk-distracted",
            "title": "2.9 Conducción Distraída",
            "content": [
                "La conducción distraída es una causa importante de accidentes. Un manual del conductor debe discutir: Los efectos de la conducción distraída; Tipos de distracciones; Uso de teléfonos celulares.",
                "Tipos de Distracciones: Distracciones físicas (alcanzar un objeto, comer, beber) y distracciones mentales (hablar con un pasajero, pensar en otra cosa).",
                "Teléfonos Móviles: Es ilegal que los conductores de CMV usen un teléfono móvil de mano mientras conducen. Las sanciones incluyen multas y descalificación. Puede usar un dispositivo manos libres si se puede iniciar con un solo toque.",
                "No Participe en Actividades que Distraigan: Preprograme estaciones de radio. Revise los mapas antes de comenzar. Evite comer o fumar excesivamente."
            ],
            "keyPoints": [
                "No use teléfonos celulares de mano mientras conduce.",
                "Las distracciones mentales son tan peligrosas como las físicas.",
                "Las sanciones por el uso de teléfonos de mano incluyen multas y descalificación de la CDL."
            ],
            "reviewQuestions": [
                {
                    "id": "q-distracted",
                    "text": "¿Cuál es la sanción para un conductor de CMV que usa un teléfono móvil de mano mientras conduce?",
                    "options": [
                        "Una multa de advertencia",
                        "Multas y posible descalificación de la CDL",
                        "Solo puntos en la licencia",
                        "Solo aumento de las tarifas de seguro"
                    ],
                    "correctIndex": 1,
                    "explanation": "La violación puede resultar en sanciones civiles (multas) de hasta $2,750 y descalificación del conductor por múltiples ofensas."
                }
            ]
        },
        {
            "id": "gk-aggressive",
            "title": "2.10 Conductores Agresivos/Furia al Volante",
            "content": [
                "Conducción Agresiva: El acto de operar un vehículo de motor de manera egoísta, audaz o insistente, sin tener en cuenta los derechos o la seguridad de los demás (por ejemplo, seguir demasiado cerca, cambiar de carril frecuentemente).",
                "Furia al Volante: Operar un vehículo de motor con la intención de causar daño físico a otros o agredir físicamente a un conductor o su vehículo.",
                "Cómo Evitar Ser una Víctima: No haga contacto visual. No los desafíe. Apártese de su camino. Reporte a los conductores agresivos a las autoridades cuando sea seguro hacerlo."
            ],
            "keyPoints": [
                "La conducción agresiva es un comportamiento egoísta/insistente.",
                "La furia al volante es la intención de causar daño.",
                "Evite el contacto visual y no interactúe con conductores agresivos."
            ],
            "reviewQuestions": [
                {
                    "id": "q-aggressive",
                    "text": "¿Cuál es la principal diferencia entre la conducción agresiva y la furia al volante?",
                    "options": [
                        "La conducción agresiva es más rápida",
                        "La furia al volante implica la intención de causar daño físico",
                        "La conducción agresiva es legal",
                        "No hay diferencia"
                    ],
                    "correctIndex": 1,
                    "explanation": "La furia al volante implica la intención de causar daño físico, mientras que la conducción agresiva es una operación egoísta/audaz."
                }
            ]
        },
        {
            "id": "gk-night",
            "title": "2.11 Conducción Nocturna",
            "content": [
                "Usted corre mayor riesgo cuando conduce de noche. Los conductores no pueden ver los peligros tan rápido como a la luz del día, por lo que tienen menos tiempo para responder. Los conductores tomados por sorpresa son menos capaces de evitar un accidente.",
                "Factores: Visión (la gente no puede ver tan bien de noche), Deslumbramiento (de las luces que vienen de frente), Fatiga (más probabilidad de estar cansado).",
                "Faros: Use luces altas cuando sea seguro y legal hacerlo. Las luces bajas le permiten ver unos 250 pies por delante. Las luces altas le permiten ver unos 350-500 pies por delante. Debe atenuar sus luces dentro de los 500 pies de un vehículo que se aproxima o cuando sigue a otro vehículo dentro de los 500 pies.",
                "Velocidad: No conduzca más rápido que el alcance de sus faros. Debería poder detenerse dentro de la distancia que puede ver por delante."
            ],
            "keyPoints": [
                "Use luces altas cuando sea seguro/legal (ver 350-500 pies).",
                "Atenúe las luces dentro de los 500 pies de otros vehículos.",
                "No conduzca más rápido que sus faros (deténgase dentro de la distancia de visión)."
            ],
            "reviewQuestions": [
                {
                    "id": "q-night",
                    "text": "¿Cuándo debe atenuar sus faros por la noche?",
                    "options": [
                        "Solo cuando se conduce en la ciudad",
                        "Dentro de los 500 pies de un vehículo que se aproxima",
                        "Cuando está cansado",
                        "Dentro de los 100 pies de un vehículo que se aproxima"
                    ],
                    "correctIndex": 1,
                    "explanation": "Atenúe sus luces dentro de los 500 pies de un vehículo que se aproxima o cuando siga a otro vehículo dentro de los 500 pies."
                }
            ]
        },
        {
            "id": "gk-fog",
            "title": "2.12 Conducción en Niebla",
            "content": [
                "La niebla puede oscurecer completamente la visibilidad. El mejor consejo para conducir en niebla es: No lo haga. Salga de la carretera hacia un área de descanso o parada de camiones hasta que la visibilidad sea mejor.",
                "Si Debe Conducir en Niebla: Obedezca todas las señales de advertencia relacionadas con la niebla. Reduzca la velocidad antes de entrar en la niebla. Use luces bajas y luces antiniebla para una mejor visibilidad incluso durante el día, y esté alerta a otros conductores que pueden haber olvidado encender sus luces. Encienda sus luces intermitentes de 4 vías. Esto da a los vehículos que se acercan por detrás una mejor oportunidad de ver su vehículo.",
                "Cuidado con los Vehículos en el Arcén: Los vehículos pueden estar estacionados en el hombro. Evite adelantar a otros vehículos."
            ],
            "keyPoints": [
                "No conduzca en la niebla si es posible.",
                "Use luces bajas (las luces altas se reflejan en la niebla).",
                "Use luces intermitentes de 4 vías para advertir a los demás."
            ],
            "reviewQuestions": [
                {
                    "id": "q-fog",
                    "text": "¿Qué luces debe usar al conducir en niebla?",
                    "options": [
                        "Luces altas",
                        "Solo luces de estacionamiento",
                        "Luces bajas y luces antiniebla",
                        "Sin luces"
                    ],
                    "correctIndex": 2,
                    "explanation": "Use luces bajas y luces antiniebla. Las luces altas se reflejan en las gotas de agua en la niebla y pueden cegarlo."
                }
            ]
        },
        {
            "id": "gk-winter",
            "title": "2.13 Conducción en invierno",
            "content": [
                "Verificaciones del vehículo: asegúrese de que su vehículo esté listo antes de conducir en clima invernal. Debes comprobar el nivel de refrigerante y la cantidad de anticongelante. Asegúrese de que los equipos de descongelación y calefacción funcionen. Los limpiaparabrisas y lavaparabrisas deben estar en buen estado de funcionamiento y tener suficiente líquido.",
                "Superficies resbaladizas: Conduzca lenta y suavemente en caminos resbaladizos. Si está muy resbaladizo, no deberías conducir en absoluto. Detente en el primer lugar seguro.",
                "Comience con suavidad y lentitud: cuando arranque por primera vez, sienta la carretera. No te apresures.",
                "Ajuste el giro y el frenado a las condiciones: gire lo más suavemente posible. No frene más fuerte de lo necesario y no utilice el freno del motor ni el retardador de velocidad. (Pueden provocar que las ruedas motrices patinen en superficies resbaladizas).",
                "Ajuste la velocidad a las condiciones: no rebase a vehículos más lentos a menos que sea necesario. Vaya despacio y mire lo suficiente hacia adelante para mantener una velocidad constante. Evite tener que reducir la velocidad y acelerar. Cuando su vehículo está muy cargado, tardará más en detenerse."
            ],
            "keyPoints": [
                "Revise el refrigerante, los calentadores y los limpiaparabrisas antes de conducir en invierno.",
                "Evite utilizar el freno motor en superficies resbaladizas.",
                "Conduzca lenta y suavemente; deténgase si está demasiado resbaladizo."
            ],
            "reviewQuestions": [
                {
                    "id": "q11",
                    "text": "¿Debería utilizar el freno motor en superficies resbaladizas?",
                    "options": [
                        "Sí, ayuda a reducir la velocidad de forma segura.",
                        "No, puede provocar que las ruedas motrices patinen.",
                        "Sólo si va cuesta abajo",
                        "Sólo si el vehículo está vacío."
                    ],
                    "correctIndex": 1,
                    "explanation": "No utilice el freno motor ni el retardador de velocidad en superficies resbaladizas porque pueden hacer que las ruedas motrices patinen."
                }
            ]
        },
        {
            "id": "gk-hot-weather",
            "title": "2.14 Conducción en Clima Muy Caluroso",
            "content": [
                "No deje salir el aire o la presión será demasiado baja cuando los neumáticos se enfríen. Si un neumático está demasiado caliente para tocarlo, permanezca detenido hasta que el neumático se enfríe. De lo contrario, el neumático puede reventar o incendiarse.",
                "Neumáticos: Revise el montaje y la presión de aire de los neumáticos. Inspeccione los neumáticos cada dos horas o cada 100 millas cuando conduzca en clima muy caluroso. La presión del aire aumenta con la temperatura.",
                "Aceite del Motor: El aceite del motor ayuda a mantener el motor fresco, además de lubricarlo. Asegúrese de que haya suficiente aceite de motor.",
                "Refrigerante del Motor: Antes de salir, asegúrese de que el sistema de enfriamiento del motor tenga suficiente agua y anticongelante según las instrucciones del fabricante del motor.",
                "Alquitrán Sangrante: El alquitrán en el pavimento de la carretera frecuentemente sube a la superficie en clima muy caluroso. Los puntos donde el alquitrán 'sangra' a la superficie son muy resbaladizos."
            ],
            "keyPoints": [
                "Inspeccione los neumáticos cada 2 horas/100 millas en clima caluroso.",
                "La presión del aire aumenta con el calor - NO deje salir el aire.",
                "Cuidado con el alquitrán sangrante (resbaladizo)."
            ],
            "reviewQuestions": [
                {
                    "id": "q-hot-weather",
                    "text": "¿Qué debe hacer si la presión de los neumáticos es alta debido al clima caluroso?",
                    "options": [
                        "Deje salir el aire hasta que alcance la presión normal",
                        "No deje salir el aire",
                        "Conduzca más rápido para enfriarlos",
                        "Vierta agua sobre ellos"
                    ],
                    "correctIndex": 1,
                    "explanation": "La presión del aire aumenta con la temperatura. No deje salir el aire o la presión será demasiado baja cuando se enfríen."
                }
            ]
        },
        {
            "id": "gk-railroad",
            "title": "2.15 Cruces de Ferrocarril-Carretera",
            "content": [
                "Los cruces a nivel de ferrocarril y carretera son un tipo especial de intersección donde la carretera cruza las vías del tren. Estos cruces siempre son peligrosos.",
                "Cruces Pasivos: Este tipo de cruce no tiene ningún tipo de dispositivo de control de tráfico. La decisión de detenerse o proceder recae enteramente en sus manos.",
                "Cruces Activos: Este tipo de cruce tiene un dispositivo de control de tráfico instalado en el cruce para regular el tráfico (luces rojas intermitentes, campanas, barreras).",
                "Señales de Advertencia Anticipada: La señal de advertencia redonda, negra sobre amarillo, se coloca delante de un cruce público de ferrocarril y carretera.",
                "Procedimientos de Conducción: Nunca corra contra un tren hacia un cruce. Reduzca la velocidad. Mire y escuche. Las vías dobles requieren una doble verificación.",
                "Detención: Si debe detenerse, hágalo de 15 a 50 pies del riel más cercano.",
                "Cruzar las Vías: No cambie de marcha mientras cruza las vías del tren. Podría quedarse atascado en las vías."
            ],
            "keyPoints": [
                "Nunca corra contra un tren.",
                "Deténgase de 15 a 50 pies del riel más cercano si es necesario.",
                "NO cambie de marcha mientras cruza las vías."
            ],
            "reviewQuestions": [
                {
                    "id": "q-railroad",
                    "text": "¿Cuándo debe cambiar de marcha al cruzar vías de tren?",
                    "options": [
                        "Siempre reduzca la marcha en las vías",
                        "Suba la marcha para velocidad",
                        "Nunca cambie de marcha en las vías",
                        "Solo si el tren está lejos"
                    ],
                    "correctIndex": 2,
                    "explanation": "No cambie de marcha mientras cruza las vías del tren. Si falla un cambio, podría quedarse atascado en las vías."
                }
            ]
        },
        {
            "id": "gk-mountain",
            "title": "2.16 Conducción en Montaña",
            "content": [
                "En la conducción en montaña, la gravedad juega un papel importante. En cualquier subida, la gravedad lo ralentiza. En las bajadas, la gravedad lo acelera. Debe seleccionar una velocidad segura adecuada, luego una marcha baja y usar técnicas de frenado adecuadas.",
                "Seleccione una Velocidad Segura: Su consideración más importante es seleccionar una velocidad que no sea demasiado rápida para: El peso total del vehículo y la carga; La longitud de la pendiente; La inclinación de la pendiente; Las condiciones de la carretera; El clima.",
                "Seleccione la Marcha Correcta: Cambie a una marcha baja antes de comenzar a bajar la pendiente. No intente reducir la marcha después de que su velocidad ya haya aumentado. No podrá cambiar a una marcha más baja.",
                "Desvanecimiento o Falla de Frenos: Los frenos pueden desvanecerse o fallar por el calor excesivo causado por usarlos demasiado y no depender del efecto de frenado del motor.",
                "Técnica de Frenado Adecuada (Frenado por Arrastre): 1. Aplique los frenos lo suficientemente fuerte como para sentir una desaceleración definida. 2. Cuando su velocidad se haya reducido a aprox. 5 mph por debajo de su velocidad segura, suelte los frenos. 3. Cuando su velocidad haya aumentado a su velocidad segura, repita el paso 1. (Ejemplo: Si la velocidad segura es 40 mph, frene a 35 mph, suelte, espere a 40 mph, repita)."
            ],
            "keyPoints": [
                "La gravedad lo ralentiza en las subidas y lo acelera en las bajadas.",
                "Cambie a marcha baja ANTES de comenzar a bajar una colina.",
                "Use el Frenado por Arrastre (Snub Braking) para controlar la velocidad sin sobrecalentar los frenos."
            ],
            "reviewQuestions": [
                {
                    "id": "q-mountain",
                    "text": "¿Cuál es la técnica de frenado adecuada en una bajada larga?",
                    "options": [
                        "Use presión ligera y constante en los frenos",
                        "Abanique los frenos (bombéelos rápidamente)",
                        "Frenado por arrastre: Frene a 5 mph por debajo de la velocidad segura, suelte, repita",
                        "Use solo el freno de emergencia"
                    ],
                    "correctIndex": 2,
                    "explanation": "El frenado por arrastre implica aplicar los frenos dentro de un rango seguro (por ejemplo, 40 a 35 mph) para evitar el sobrecalentamiento."
                }
            ]
        },
        {
            "id": "gk-emergencies",
            "title": "2.17 Conducción de emergencias",
            "content": [
                "Las emergencias de tránsito ocurren cuando dos vehículos están a punto de chocar. Las emergencias de vehículos ocurren cuando fallan los neumáticos, los frenos u otras piezas críticas. Seguir las prácticas de seguridad de este manual puede ayudar a prevenir emergencias. Pero si ocurre una emergencia, sus posibilidades de evitar un accidente dependen de qué tan bien actúe. Las acciones que puede tomar son girar para evitar un choque, detenerse rápidamente y manejar fallas en los frenos.",
                "Conducir para evitar un choque: Detenerse no siempre es lo más seguro en caso de emergencia. Cuando no tiene suficiente espacio para detenerse, es posible que tenga que alejarse de lo que se avecina. Recuerde, casi siempre puede girar para evitar un obstáculo más rápido de lo que puede detenerse. (Sin embargo, los vehículos muy pesados ​​y los tractores con múltiples remolques pueden volcarse).",
                "Falla de los neumáticos: identifique la falla de los neumáticos por sonido (golpe fuerte), vibración (golpes fuertes) o sensación (la dirección se siente pesada). Respuesta: Sujete firmemente el volante. Manténgase alejado del freno. Revisa los neumáticos."
            ],
            "keyPoints": [
                "Puedes girar para evitar un obstáculo más rápido de lo que puedes detenerte.",
                "Si se revienta un neumático, sostenga firmemente el volante y no frene.",
                "No frene hasta que el vehículo haya reducido la velocidad."
            ],
            "reviewQuestions": [
                {
                    "id": "q12",
                    "text": "¿Qué hacer si se revienta un neumático?",
                    "options": [
                        "Frena fuerte inmediatamente",
                        "Dirigir bruscamente hacia el arcén",
                        "Sujete firmemente el volante y no pise el freno.",
                        "Acelerar para mantener la estabilidad."
                    ],
                    "correctIndex": 2,
                    "explanation": "Si se revienta un neumático, sostenga firmemente el volante y no frene hasta que el vehículo haya disminuido la velocidad."
                }
            ]
        },
        {
            "id": "gk-abs",
            "title": "2.18 Sistemas de frenos antibloqueo (ABS)",
            "content": [
                "El ABS es un sistema computarizado que evita que las ruedas se bloqueen al frenar con fuerza. El ABS es un complemento a los frenos normales. No disminuye ni aumenta su capacidad de frenado normal. El ABS sólo se activa cuando las ruedas están a punto de bloquearse.",
                "Cómo saber si su vehículo está equipado con ABS: Los tractores, camiones y autobuses tendrán luces amarillas de mal funcionamiento del ABS en el panel de instrumentos. Los remolques tendrán luces amarillas de mal funcionamiento del ABS en el lado izquierdo, ya sea en la esquina delantera o trasera.",
                "Cómo le ayuda el ABS: Cuando frena con fuerza en superficies resbaladizas en un vehículo sin ABS, las ruedas pueden bloquearse. Cuando los volantes se bloquean, pierdes el control de la dirección. Cuando las otras ruedas se bloquean, usted puede patinar o doblarse. El ABS le ayuda a evitar el bloqueo de las ruedas y a mantener el control. Es posible que pueda o no detenerse más rápido con el ABS, pero debería poder sortear un obstáculo mientras frena y evitar derrapes causados ​​por frenar excesivamente."
            ],
            "keyPoints": [
                "El ABS evita que las ruedas se bloqueen.",
                "El ABS le permite girar mientras frena.",
                "Las luces amarillas de mal funcionamiento del ABS indican si el sistema está funcionando."
            ],
            "reviewQuestions": [
                {
                    "id": "q13",
                    "text": "¿Cuál es el principal beneficio del ABS?",
                    "options": [
                        "Hace que el vehículo se detenga más rápido.",
                        "Le permite girar mientras frena y evita el bloqueo de las ruedas.",
                        "Aumenta la potencia del motor.",
                        "Previene reventones de neumáticos"
                    ],
                    "correctIndex": 1,
                    "explanation": "El ABS le ayuda a evitar el bloqueo de las ruedas y a mantener el control de la dirección durante una frenada brusca."
                }
            ]
        },
        {
            "id": "gk-skid",
            "title": "2.19 Control de derrape y recuperación",
            "content": [
                "Un patinazo ocurre cuando los neumáticos pierden agarre en la carretera. Esto se debe a una de estas cuatro formas: frenar demasiado, girar demasiado, acelerar demasiado o conducir demasiado rápido.",
                "Patinaje de las ruedas motrices: El patinazo más común es aquel en el que las ruedas traseras pierden tracción debido a un frenado o aceleración excesivos. Los derrapes provocados por la aceleración suelen producirse sobre hielo o nieve.",
                "Corrección de un patinazo al frenar con las ruedas motrices: Deje de frenar. Esto permitirá que las ruedas traseras vuelvan a girar y evitará que se deslicen más.",
                "Patinaje de las ruedas delanteras: Conducir demasiado rápido según las condiciones provoca la mayoría de los patinazos de las ruedas delanteras. Otras causas incluyen la falta de banda de rodadura en los neumáticos delanteros y la carga cargada, por lo que no hay suficiente peso en el eje delantero. En un patinazo de las ruedas delanteras, la parte delantera tiende a ir en línea recta independientemente de cuánto gire el volante. En una superficie muy resbaladiza, es posible que no pueda tomar una curva o girar. La única manera de detener el derrape es dejar que el vehículo reduzca la velocidad. Deja de girar y/o frenar con tanta fuerza. Reduzca la velocidad lo más rápido posible sin patinar."
            ],
            "keyPoints": [
                "La mayoría de los derrapes se deben a conducir demasiado rápido o frenar demasiado.",
                "Corrección del derrape del frenado de las ruedas motrices: Deje de frenar.",
                "Corrección del derrape de las ruedas delanteras: Deje que el vehículo reduzca la velocidad."
            ],
            "reviewQuestions": [
                {
                    "id": "q14",
                    "text": "¿Qué causa la mayoría de los derrapes de las ruedas delanteras?",
                    "options": [
                        "Conducir demasiado lento",
                        "Conducir demasiado rápido para las condiciones",
                        "Girando demasiado suavemente",
                        "Superficies de carretera irregulares"
                    ],
                    "correctIndex": 1,
                    "explanation": "Conducir demasiado rápido según las condiciones provoca la mayoría de los derrapes de las ruedas delanteras."
                }
            ]
        },
        {
            "id": "gk-accident",
            "title": "2.20 Procedimientos en caso de accidente",
            "content": [
                "Cuando sufre un accidente y no sufre lesiones graves, debe actuar para evitar daños o lesiones mayores. Los pasos básicos a seguir ante cualquier accidente son: Proteger el área, Notificar a las autoridades y Atender a los heridos.",
                "Proteger el área: Lo primero que se debe hacer en la escena de un accidente es evitar que ocurra otro accidente en el mismo lugar. Para proteger el área del accidente: Si su vehículo está involucrado en el accidente, intente llevarlo al costado de la carretera. Esto ayudará a prevenir otro accidente y permitirá que el tráfico se mueva. Si se detiene para ayudar, estacione lejos del lugar del accidente. El área inmediatamente alrededor del accidente será necesaria para los vehículos de emergencia. Ponte las luces intermitentes. Coloque triángulos reflectantes para advertir al resto del tráfico. Asegúrese de que otros conductores clave puedan verlos a tiempo para evitar el accidente.",
                "Notifique a las autoridades: si tiene un teléfono celular o CB, llame para solicitar ayuda antes de salir de su vehículo. De lo contrario, espere hasta que la escena del accidente haya sido protegida adecuadamente y luego llame o envíe a alguien para que llame a la policía. Intente determinar dónde se encuentra para poder dar la ubicación exacta.",
                "Atención a los heridos: si hay una persona calificada en el lugar del accidente y ayudando a los heridos, manténgase alejado a menos que se le solicite ayuda. De lo contrario, haga lo mejor que pueda para ayudar a las partes perjudicadas. A continuación se detallan algunos pasos sencillos a seguir para brindar asistencia: No mueva a una persona gravemente herida a menos que el peligro de incendio o el tránsito lo hagan necesario. Detenga el sangrado abundante aplicando presión directa sobre la herida. Mantenga caliente a la persona lesionada."
            ],
            "keyPoints": [
                "Pasos básicos: Proteger el área, Notificar a las autoridades, Atención a heridos.",
                "Utilice luces intermitentes/triángulos para advertir al tráfico.",
                "No mueva a las personas lesionadas a menos que sea absolutamente necesario."
            ],
            "reviewQuestions": [
                {
                    "id": "q15",
                    "text": "¿Cuáles son los tres pasos básicos a seguir en la escena de un accidente?",
                    "options": [
                        "Llama al seguro, toma fotos, vete.",
                        "Proteger la zona, notificar a las autoridades, atender a los heridos.",
                        "Mover los vehículos, discutir con otro conductor, llamar a la policía",
                        "Inspeccione los daños, llame al mecánico, espere"
                    ],
                    "correctIndex": 1,
                    "explanation": "Los pasos básicos son Proteger el área, Notificar a las autoridades y Atender a los heridos."
                }
            ]
        },
        {
            "id": "gk-fires",
            "title": "2.21 Incendios",
            "content": [
                "Causas de incendio: Las causas más comunes son: Después de accidentes (combustible derramado), Llantas (desinfladas y dobles en contacto), Sistema eléctrico (cortocircuitos debido a aislamiento dañado), Combustible (conductor fumando, conexiones de combustible sueltas) y Carga (carga inflamable, mala ventilación).",
                "Extinción de incendios: Es importante saber cómo combatir incendios. Los buzos que han provocado incendios y saben utilizar un extintor pueden evitar que pequeños incendios se conviertan en grandes desastres.",
                "Extinguir el fuego: Manténgase lo más lejos posible del fuego. Apunte a la fuente o base del fuego, no hacia las llamas. Utilice el extintor adecuado (Tipo B/C para incendios eléctricos y de combustible). Nunca use agua en un incendio eléctrico o de gasolina (esparce el combustible).",
                "Incendios en el motor: apague el motor tan pronto como pueda. No abras el capó si puedes evitarlo. Dispare espuma a través de las rejillas, el radiador o desde la parte inferior del vehículo. Al abrir la capota se suministra oxígeno para que el fuego arda más rápido."
            ],
            "keyPoints": [
                "Causas comunes: Neumáticos, Eléctrico, Combustible, Carga.",
                "Utilice extintores tipo B/C para incendios de vehículos.",
                "NO abra el capó si se produce un incendio en el motor (agrega oxígeno).",
                "Apunta a la base del fuego."
            ],
            "reviewQuestions": [
                {
                    "id": "q16",
                    "text": "¿Qué debe hacer si tiene un incendio en el motor?",
                    "options": [
                        "Abra el capó inmediatamente para enfriarlo.",
                        "Conduce más rápido para apagar las llamas.",
                        "Apague el motor y dispare espuma a través de las rejillas (no abra el capó)",
                        "Vierta agua en el motor."
                    ],
                    "correctIndex": 2,
                    "explanation": "Apague el motor. No abra el capó ya que agrega oxígeno. Dispare espuma extintora a través de las rejillas o desde abajo."
                }
            ]
        },
        {
            "id": "gk-alcohol",
            "title": "2.22 Alcohol y otras drogas",
            "content": [
                "Beber alcohol y luego conducir es un problema muy peligroso. Las personas que beben alcohol se ven implicadas en accidentes de tráfico que provocan más de 20.000 muertes cada año. El alcohol afecta la coordinación muscular, el tiempo de reacción, la percepción de profundidad y la visión nocturna. También afecta las partes del cerebro que controlan el juicio y la inhibición.",
                "Límites de BAC: el límite legal para los conductores comerciales suele ser más bajo que para los conductores de automóviles. En la mayoría de los lugares, quedarás fuera de servicio durante 24 horas si tienes CUALQUIER cantidad detectable de alcohol. El límite de BAC para un DUI en un CMV es del 0,04%.",
                "Otras drogas: El uso de drogas puede provocar accidentes de tráfico con resultado de muerte, lesiones y daños a la propiedad. Es ilegal operar un CMV si su capacidad para conducir de manera segura se ve afectada por el uso de cualquier medicamento, incluidos los medicamentos recetados y de venta libre."
            ],
            "keyPoints": [
                "El alcohol afecta el juicio, la coordinación y el tiempo de reacción.",
                "El límite legal de BAC para conductores de CMV es del 0,04%.",
                "Quedará fuera de servicio durante 24 horas por CUALQUIER alcohol detectable."
            ],
            "reviewQuestions": [
                {
                    "id": "q17",
                    "text": "¿Cuál es el límite de BAC para conducir un vehículo de motor comercial?",
                    "options": [
                        "0.08%",
                        "0.04%",
                        "0.10%",
                        "0.01%"
                    ],
                    "correctIndex": 1,
                    "explanation": "El límite de concentración de alcohol en sangre (BAC) para operar un CMV es del 0,04 %."
                }
            ]
        },
        {
            "id": "gk-fatigue",
            "title": "2.23 Mantenerse alerta y en forma para conducir",
            "content": [
                "Conducir un vehículo durante muchas horas resulta agotador. Incluso los mejores conductores estarán menos alerta. Sin embargo, hay cosas que los buenos conductores hacen para mantenerse alerta y seguros.",
                "Fatiga: La fatiga (estar cansado) y la falta de estado de alerta son causas importantes de accidentes. La única cura para la fatiga es dormir. Si estás cansado, sal del camino y duerme.",
                "Horas de servicio: Las regulaciones estrictas limitan las horas que puede conducir. Debes llevar un registro de tus horas. Violar estas reglas es peligroso e ilegal.",
                "Señales de advertencia: Es posible que se sienta fatigado si: No recuerda los últimos kilómetros recorridos, se sale de su carril, bosteza repetidamente o tiene los ojos pesados. Si nota esto, deténgase y duerma."
            ],
            "keyPoints": [
                "La única cura para la fatiga es dormir.",
                "Deje de conducir si no recuerda los últimos kilómetros.",
                "Siga las regulaciones de Horas de Servicio."
            ],
            "reviewQuestions": [
                {
                    "id": "q18",
                    "text": "¿Cuál es la única cura segura para la fatiga?",
                    "options": [
                        "tomando cafe",
                        "abriendo la ventana",
                        "Dormir",
                        "Subiendo la radio"
                    ],
                    "correctIndex": 2,
                    "explanation": "La única cura segura para la fatiga es dormir. El café y el aire fresco sólo proporcionan un alivio a corto plazo."
                }
            ]
        },
        {
            "id": "gk-hazmat",
            "title": "2.24 Reglas sobre materiales peligrosos",
            "content": [
                "Los materiales peligrosos son productos que representan un riesgo para la salud, la seguridad y la propiedad durante el transporte. El término incluye explosivos, diversos tipos de gases, sólidos, líquidos inflamables y combustibles y otros materiales.",
                "Intención de las reglas: Las reglas tienen como objetivo proporcionar conductores y equipos seguros, comunicar el riesgo y contener el producto.",
                "Carteles: Los carteles se utilizan para advertir a otras personas sobre materiales peligrosos. Son señales con forma de rombo colocadas en el exterior del vehículo. Debe tener los carteles adecuados para transportar materiales peligrosos, a menos que la cantidad sea lo suficientemente pequeña como para estar exento.",
                "Responsabilidades del conductor: Los conductores deben rechazar los paquetes con fugas, revisar los papeles y carteles y mantener los papeles a su alcance (en el asiento o en la bolsa de la puerta) o a la vista."
            ],
            "keyPoints": [
                "Existen reglas sobre materiales peligrosos para contener el producto, comunicar el riesgo y garantizar la seguridad.",
                "Los carteles son señales de advertencia en forma de diamante.",
                "Los documentos de envío de materiales peligrosos deben estar al alcance o a la vista."
            ],
            "reviewQuestions": [
                {
                    "id": "q19",
                    "text": "¿Dónde se deben guardar los documentos de envío de materiales peligrosos?",
                    "options": [
                        "en la guantera",
                        "en el maletero",
                        "En la litera",
                        "Al alcance del conductor (asiento o bolsa en la puerta) o a la vista"
                    ],
                    "correctIndex": 3,
                    "explanation": "Los documentos de envío deben mantenerse al alcance (por ejemplo, la bolsa de la puerta) o a la vista en el asiento mientras se conduce."
                }
            ]
        },
        {
            "id": "gk-cargo",
            "title": "3.0 Aseguramiento de la carga",
            "content": [
                "Ya sea que cargue y asegure la carga usted mismo o no, usted es responsable de: Inspeccionar su carga, Reconocer sobrecargas y peso mal equilibrado, Saber que su carga está adecuadamente asegurada y saber que no restringe su vista o acceso al equipo de emergencia.",
                "Inspección de carga: Inspeccione la carga dentro de las primeras 50 millas de un viaje y cada 150 millas o cada 3 horas (lo que ocurra primero) después.",
                "Amarres: La carga debe estar asegurada mediante amarres. Necesita al menos un amarre por cada 10 pies de carga. No importa cuán pequeña sea la carga, debes utilizar al menos dos amarres.",
                "Tableros de cabecera: Los tableros de cabecera frontales ('soportes para dolores de cabeza') lo protegen de su carga en caso de un choque o una parada repentina."
            ],
            "keyPoints": [
                "Inspeccione la carga cada 3 horas o 150 millas.",
                "Utilice al menos 1 amarre por cada 10 pies de carga.",
                "Mínimo de 2 amarres para cualquier carga.",
                "Los cabeceros protegen al conductor."
            ],
            "reviewQuestions": [
                {
                    "id": "q20",
                    "text": "¿Con qué frecuencia debes inspeccionar tu carga durante un viaje?",
                    "options": [
                        "Cada 6 horas",
                        "Sólo cada parada",
                        "Dentro de las primeras 50 millas, luego cada 3 horas o 150 millas",
                        "Solo antes del viaje"
                    ],
                    "correctIndex": 2,
                    "explanation": "Debe revisar su carga dentro de las primeras 50 millas y luego cada 3 horas o 150 millas a partir de entonces."
                }
            ]
        },
        {
            "id": "gk-weight-balance",
            "title": "3.2 Peso y Equilibrio",
            "content": [
                "Definiciones: El Peso Bruto del Vehículo (GVW) es el peso total de un solo vehículo más su carga. El Peso Bruto Combinado (GCW) es el peso total de una unidad motorizada, más el remolque(s), más la carga. La Clasificación de Peso Bruto del Vehículo (GVWR) es el GVW máximo especificado por el fabricante.",
                "Centro de Gravedad: El centro de gravedad es el punto donde el peso del vehículo está equilibrado. Un centro de gravedad alto significa que es más probable que se vuelque. Es más peligroso en curvas o si se desvía para evitar un peligro. Mantenga la carga lo más cerca posible del suelo y centrada.",
                "Equilibrar el Peso: Un mal equilibrio del peso puede hacer que el manejo del vehículo sea inseguro. Demasiado peso en el eje de dirección puede causar una dirección dura. Los ejes delanteros con poca carga (causado por mover el peso rápidamente hacia atrás) pueden hacer que el peso del eje de dirección sea demasiado ligero para conducir con seguridad."
            ],
            "keyPoints": [
                "Centro de gravedad alto = Alto riesgo de vuelco.",
                "Mantenga la carga baja y centrada.",
                "El mal equilibrio del peso afecta la dirección y el frenado."
            ],
            "reviewQuestions": [
                {
                    "id": "q21",
                    "text": "¿Cuál es el peligro de un centro de gravedad alto?",
                    "options": [
                        "Hace que el vehículo sea más lento",
                        "Hace que el vehículo sea más propenso a volcarse",
                        "Ahorra combustible",
                        "Mejora la tracción"
                    ],
                    "correctIndex": 1,
                    "explanation": "Un centro de gravedad alto hace que el vehículo sea más inestable y propenso a volcarse, especialmente en las curvas."
                }
            ]
        },
        {
            "id": "gk-special-cargo",
            "title": "3.4 Carga que Necesita Atención Especial",
            "content": [
                "Carga seca a granel: Los tanques de carga seca a granel requieren un cuidado especial porque tienen un centro de gravedad alto y la carga puede moverse. Sea extremadamente diligente al tomar curvas y hacer giros cerrados.",
                "Carne colgada: La carne colgada (res, cerdo, etc. suspendida) en un camión refrigerado puede ser una carga muy inestable con un centro de gravedad alto. Se necesita precaución en las curvas para evitar que la carga se balancee y vuelque el camión.",
                "Ganado: El ganado puede moverse en un remolque, causando un manejo inseguro. Con menos de una carga completa, use falsos mamparos para mantener al ganado agrupado. Incluso cuando están agrupados, espere que el centro de gravedad cambie en las curvas.",
                "Cargas de gran tamaño: Las cargas de longitud excesiva, ancho excesivo y/o sobrepeso requieren permisos de tránsito especiales. La conducción suele estar limitada a ciertos horarios. Puede ser necesario equipo especial como letreros de \"Carga Ancha\", luces intermitentes, banderas, etc."
            ],
            "keyPoints": [
                "La carga a granel seca y la carne colgada tienen centros de gravedad altos.",
                "El ganado puede moverse y cambiar el equilibrio del vehículo.",
                "Las cargas de gran tamaño requieren permisos y señalización especiales."
            ],
            "reviewQuestions": [
                {
                    "id": "q22",
                    "text": "¿Cuál de estas cargas es conocida por tener un centro de gravedad alto y ser inestable?",
                    "options": [
                        "Madera en plataforma",
                        "Carne colgada",
                        "Remolque vacío",
                        "Productos enlatados"
                    ],
                    "correctIndex": 1,
                    "explanation": "La carne colgada tiene un centro de gravedad alto y puede balancearse, haciendo que el camión sea inestable en las curvas."
                }
            ]
        }
    ]
};
