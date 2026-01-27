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
export const PassengerStudyGuide_ES: StudyGuide = {
    topicId: 'passenger',
    sections: [
        {
            id: 'pass-inspection',
            title: 'Inspección del Vehículo',
            cdlReference: 'Manual CDL §4.1',
            content: [
                "La seguridad de los vehículos de pasajeros requiere inspeccionar el interior y el exterior. En el interior, verifique: Pasamanos y barandillas, revestimiento del piso, dispositivos de señalización y salidas de emergencia.",
                "Salidas de emergencia: Deben estar claramente marcadas y funcionar correctamente. Las ventanas deben manejarse con facilidad. Las escotillas del techo (si están equipadas) deben cerrarse herméticamente.",
                "Asientos: Deben ser seguros para los pasajeros. Sujetados firmemente al piso.",
                "Puertas de acceso: Verifique que las puertas de entrada funcionen suavemente y cierren de manera segura."
            ],
            keyPoints: [
                "Verifique pasamanos, barandillas y revestimiento del piso.",
                "Las salidas de emergencia deben representar un camino despejado y funcionar correctamente.",
                "Los asientos deben estar firmemente sujetos."
            ],
            reviewQuestions: [
                {
                    id: 'pass-q1',
                    text: "¿Qué elementos interiores deben revisarse durante una inspección del vehículo?",
                    options: [
                        "Radio y aire acondicionado",
                        "Pasamanos, barandillas, revestimiento del piso, dispositivos de señalización y salidas de emergencia",
                        "Portavasos y asientos reclinables",
                        "GPS y cámaras"
                    ],
                    correctIndex: 1,
                    explanation: "Debe verificar los pasamanos, las barandillas, el revestimiento del piso, los dispositivos de señalización y las salidas de emergencia por seguridad."
                }
            ]
        },
        {
            id: 'pass-loading',
            title: 'Carga y Descarga',
            cdlReference: 'Manual CDL §4.2',
            content: [
                "No permita que los pasajeros dejen equipaje en el pasillo o cerca del conductor. El equipaje y la carga deben estar asegurados para que no puedan caerse ni moverse.",
                "Materiales peligrosos: La mayoría de los materiales peligrosos no se pueden transportar en un autobús. Las excepciones incluyen municiones de armas pequeñas (etiquetadas ORM-D), suministros hospitalarios de emergencia y pequeñas cantidades de medicamentos.",
                "Materiales peligrosos prohibidos: División 2.3 (Gas venenoso), líquido Clase 6 (Venenos), gas lacrimógeno, explosivos (Clase 1) y más de 100 libras de sólidos Clase 6.",
                "Línea de pasajeros de pie: Ningún pasajero puede estar de pie delante de la parte trasera del asiento del conductor. Los autobuses diseñados para permitir estar de pie deben tener una línea de 2 pulgadas en el piso. Los pasajeros deben permanecer detrás de ella."
            ],
            keyPoints: [
                "Los pasillos deben mantenerse libres de equipaje.",
                "La mayoría de los materiales peligrosos están prohibidos.",
                "Los pasajeros deben pararse detrás de la línea de pasajeros de pie (línea de 2 pulgadas)."
            ],
            reviewQuestions: [
                {
                    id: 'pass-q2',
                    text: "¿Dónde deben pararse los pasajeros mientras el autobús está en movimiento?",
                    options: [
                        "Donde quieran",
                        "Detrás de la línea de pasajeros de pie",
                        "Junto al conductor",
                        "En los escalones"
                    ],
                    correctIndex: 1,
                    explanation: "Los pasajeros deben permanecer detrás de la línea de pasajeros de pie (una línea de 2 pulgadas en el piso) por seguridad/visibilidad."
                }
            ]
        },
        {
            id: 'pass-road',
            title: 'En el Camino',
            cdlReference: 'Manual CDL §4.3',
            content: [
                "Supervisión de pasajeros: Usted es responsable de la seguridad de los pasajeros. No permita que los pasajeros lo distraigan. Si un pasajero está ebrio o es perturbador, descárguelo en el próximo lugar seguro y bien iluminado.",
                "Cruces de ferrocarril: Detenga su autobús entre 15 y 50 pies antes de los cruces de ferrocarril. Escuche y mire en ambas direcciones. Normalmente no tiene que detenerse en los cruces de tranvías o donde un policía/banderero dirige el tráfico.",
                "Puentes levadizos: Deténgase en los puentes levadizos que no tengan luz de señalización o asistente de control de tráfico. Deténgase al menos 50 pies antes del tramo levadizo del puente.",
                "Curvas: Los accidentes en curvas ocurren por velocidad excesiva. Reduzca la velocidad antes de la curva."
            ],
            keyPoints: [
                "Deténgase 15-50 pies antes de los cruces de ferrocarril.",
                "Deténgase al menos 50 pies antes de los puentes levadizos (a menos que haya señalización).",
                "Descargue a los pasajeros perturbadores en un lugar SEGURO.",
                "Reduzca la velocidad antes de las curvas."
            ],
            reviewQuestions: [
                {
                    id: 'pass-q3',
                    text: "¿A qué distancia debe detenerse antes de un cruce de ferrocarril?",
                    options: [
                        "5 a 10 pies",
                        "15 a 50 pies",
                        "100 pies",
                        "No necesita detenerse si está vacío"
                    ],
                    correctIndex: 1,
                    explanation: "Debe detenerse entre 15 y 50 pies antes del riel más cercano en los cruces de ferrocarril."
                }
            ]
        },
        {
            id: 'pass-after-trip',
            title: 'Inspección del Vehículo Posterior al Viaje',
            cdlReference: 'Manual CDL §4.4',
            content: [
                "Inspeccione su autobús al final de cada turno. Reporte cualquier daño o defecto.",
                "Verifique el interior en busca de: Artículos olvidados (equipaje, libros), ventanas/puertas abiertas y pasajeros olvidados (dormidos/escondidos).",
                "Cierre el autobús cuando lo deje para evitar la entrada no autorizada."
            ],
            keyPoints: [
                "Inspeccione el autobús al final de cada turno.",
                "Busque pasajeros dormidos o escondidos.",
                "Verifique si hay artículos olvidados."
            ],
            reviewQuestions: [
                {
                    id: 'pass-q4',
                    text: "¿Qué debe verificar durante la inspección posterior al viaje?",
                    options: [
                        "Solo aceite del motor",
                        "Solo presión de los neumáticos",
                        "Pasajeros o artículos olvidados",
                        "Estaciones de radio"
                    ],
                    correctIndex: 2,
                    explanation: "Verifique si hay artículos olvidados y pasajeros que puedan estar durmiendo o escondiéndose."
                }
            ]
        },
        {
            id: 'pass-prohibited',
            title: 'Prácticas Prohibidas',
            cdlReference: 'Manual CDL §4.5',
            content: [
                "Reabastecimiento de combustible: Nunca reabastezca combustible con pasajeros a bordo a menos que sea absolutamente necesario. Nunca reabastezca en un edificio cerrado con pasajeros a bordo.",
                "Hablar: No hable con los pasajeros, ni permita que le hablen, mientras conduce. Es una distracción.",
                "Remolque: No remolque ni empuje un autobús averiado con pasajeros a bordo del vehículo, a menos que bajarse no sea seguro. Solo remolque hasta el lugar seguro más cercano para descargar a los pasajeros."
            ],
            keyPoints: [
                "Evite reabastecer combustible con pasajeros a bordo.",
                "No hable con los pasajeros mientras conduce.",
                "No remolque un autobús con pasajeros (a menos que no sea seguro descargar)."
            ],
            reviewQuestions: [
                {
                    id: 'pass-q5',
                    text: "¿Cuándo es aceptable reabastecer combustible con pasajeros a bordo?",
                    options: [
                        "Siempre",
                        "Solo si es absolutamente necesario",
                        "Siempre que tenga poco combustible",
                        "Nunca"
                    ],
                    correctIndex: 1,
                    explanation: "Evite cargar combustible con pasajeros. Solo hágalo si es absolutamente necesario y nunca en un edificio cerrado."
                }
            ]
        },
        {
            id: 'pass-interlocks',
            title: 'Uso de Interbloqueo de Frenos y Puertas',
            cdlReference: 'Manual CDL §4.6',
            content: [
                "Los interbloqueos de frenos y puertas aplican los frenos y mantienen el acelerador en posición de ralentí cuando la puerta trasera está abierta.",
                "Regla de seguridad: El interbloqueo se libera cuando cierra la puerta. No utilice esta característica de seguridad en lugar del freno de estacionamiento."
            ],
            keyPoints: [
                "Los interbloqueos aplican los frenos cuando la puerta está abierta.",
                "NO utilice los interbloqueos como freno de estacionamiento."
            ],
            reviewQuestions: [
                {
                    id: 'pass-q6',
                    text: "¿Puede utilizar el interbloqueo de frenos y puertas como freno de estacionamiento?",
                    options: [
                        "Sí, siempre",
                        "Sí, pero solo para paradas cortas",
                        "No, nunca",
                        "Solo en colinas"
                    ],
                    correctIndex: 2,
                    explanation: "No utilice el interbloqueo de frenos y puertas en lugar del freno de estacionamiento."
                }
            ]
        }
    ]
};

export const CombinationsStudyGuide_ES: StudyGuide = {
    topicId: 'combinations',
    sections: [
        {
            id: 'comb-intro',
            title: 'Introducción a los Vehículos Combinados',
            cdlReference: 'Manual CDL §6.1',
            content: [
                "Los vehículos combinados son más pesados, más largos y requieren más habilidad de conducción que los vehículos comerciales individuales. Esto incluye tractocamiones, dobles, triples y camiones que remolcan remolques.",
                "Conducir combinaciones de manera segura requiere comprender sus diferencias de manejo: son más propensos a volcar, hacer la tijera (jackknife) y tienen distancias de frenado más largas.",
                "Necesita una CDL Clase A para operar la mayoría de los vehículos combinados. La prueba de Vehículos Combinados es necesaria para la CDL Clase A."
            ],
            keyPoints: [
                "Los vehículos combinados son más pesados y largos que los individuales.",
                "Mayor riesgo de vuelco y efecto tijera.",
                "Se requiere CDL Clase A para la mayoría de las combinaciones."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q1',
                    text: "¿Por qué los vehículos combinados requieren más habilidad de conducción?",
                    options: [
                        "Son más cómodos",
                        "Son más pesados, más largos y tienen características de manejo diferentes",
                        "Tienen mejores frenos",
                        "Son más fáciles de estacionar"
                    ],
                    correctIndex: 1,
                    explanation: "Los vehículos combinados son más pesados, más largos y requieren comprensión de los riesgos de vuelco, efecto tijera y distancias de frenado más largas."
                }
            ]
        },
        {
            id: 'comb-rollover',
            title: 'Riesgos de Vuelco',
            cdlReference: 'Manual CDL §6.1.1',
            content: [
                "Los vuelcos son más comunes en vehículos combinados debido a su centro de gravedad más alto. Más de la mitad de las muertes de conductores de camiones en choques son por vuelcos.",
                "Los factores principales que causan vuelcos son: Velocidad (tomar curvas o giros demasiado rápido), Carga (carga pesada en la parte superior o cargada incorrectamente) y Dirección (movimientos repentinos de dirección).",
                "Mantenga la carga lo más baja posible. Los equipos completamente cargados tienen 10 veces más probabilidades de volcar que los vacíos.",
                "Reduzca la velocidad antes de las curvas. El límite de velocidad indicado puede ser demasiado rápido para un camión cargado. Si la señal dice 35 mph, debe reducir la velocidad a alrededor de 30 mph o menos.",
                "Gire suavemente. Hacer cambios rápidos de carril o virar para evitar un peligro puede causar un vuelco. A menudo es más seguro golpear algo que volcar."
            ],
            keyPoints: [
                "Los vuelcos causan más de la mitad de las muertes de conductores de camiones.",
                "Reduzca la velocidad antes de las curvas: la velocidad indicada puede ser demasiado rápida.",
                "Los camiones llenos tienen 10 veces más probabilidades de volcar que los vacíos.",
                "Gire suavemente para evitar el vuelco."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q2',
                    text: "¿Qué causa la mayoría de los vuelcos de camiones?",
                    options: [
                        "Reventones de neumáticos",
                        "Tomar curvas demasiado rápido, cargas pesadas en la parte superior o dirección repentina",
                        "Falla del motor",
                        "Mal tiempo solamente"
                    ],
                    correctIndex: 1,
                    explanation: "Las causas principales son la velocidad (curvas demasiado rápidas), la carga (carga pesada en la parte superior) y la dirección (movimientos repentinos)."
                }
            ]
        },
        {
            id: 'comb-steering',
            title: 'Dirección y Desviación (Off-Tracking)',
            cdlReference: 'Manual CDL §6.1.2',
            content: [
                "Cuando un vehículo dobla una esquina, las ruedas traseras siguen un camino diferente al de las ruedas delanteras. Esto se llama desviación o 'hacer trampa' (cheating).",
                "Cuanto más largo sea el vehículo, más se desviará. Es por eso que debe abrirse para hacer giros, especialmente giros a la derecha.",
                "Los remolques pueden golpear otros vehículos, peatones u objetos fijos durante los giros debido a la desviación.",
                "El efecto látigo (crack-the-whip): Al cambiar de carril, la parte trasera del remolque tiende a balancearse. Las combinaciones más largas tienen más balanceo."
            ],
            keyPoints: [
                "Las ruedas traseras siguen un camino más corto que las delanteras (desviación).",
                "Los vehículos más largos se desvían más.",
                "Ábrase en los giros para evitar golpear objetos.",
                "Cuidado con el efecto 'látigo' en los cambios de carril."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q3',
                    text: "¿Qué es la desviación (off-tracking)?",
                    options: [
                        "Cuando el camión se sale de la carretera",
                        "Cuando las ruedas traseras siguen un camino más corto que las ruedas delanteras",
                        "Cuando el GPS pierde señal",
                        "Cuando el remolque se desconecta"
                    ],
                    correctIndex: 1,
                    explanation: "La desviación (hacer trampa) es cuando las ruedas traseras siguen un camino diferente y más corto que las ruedas delanteras en las curvas."
                }
            ]
        },
        {
            id: 'comb-jackknife',
            title: 'Prevención del Efecto Tijera (Jackknife)',
            cdlReference: 'Manual CDL §6.1.6',
            content: [
                "Un efecto tijera es cuando el remolque empuja al tractor, haciendo que gire y potencialmente se vuelque. Esto sucede cuando las ruedas motrices pierden tracción.",
                "Causas comunes: Frenado excesivo, especialmente sin ABS. Velocidad excesiva en curvas. Carreteras resbaladizas con poca tracción.",
                "Para prevenir el efecto tijera: No frene demasiado fuerte o repentinamente. Use el freno motor y el frenado controlado (snub braking) en pendientes. Reduzca la velocidad en las curvas.",
                "Si comienza a hacer tijera: Suelte los frenos para permitir que las ruedas motrices recuperen tracción, luego enderece.",
                "Los efectos tijera son más probables cuando el remolque está vacío (ligero) porque hay menos peso sobre las ruedas motrices."
            ],
            keyPoints: [
                "Efecto tijera = el remolque empuja al tractor hacia los lados.",
                "Causado por frenado excesivo o pérdida de tracción.",
                "Si hace tijera, suelte los frenos para recuperar tracción.",
                "Los remolques vacíos son más propensos a hacer tijera."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q4',
                    text: "¿Qué debe hacer si comienza a hacer tijera?",
                    options: [
                        "Frenar más fuerte",
                        "Acelerar rápidamente",
                        "Soltar los frenos para recuperar tracción",
                        "Girar el volante bruscamente"
                    ],
                    correctIndex: 2,
                    explanation: "Suelte los frenos para permitir que las ruedas motrices recuperen la tracción y se enderecen."
                }
            ]
        },
        {
            id: 'comb-braking',
            title: 'Frenado y Distancia de Parada',
            cdlReference: 'Manual CDL §6.1.3',
            content: [
                "Los vehículos combinados tardan más en detenerse que los vehículos individuales debido a su mayor peso. La distancia de parada aumenta significativamente con la velocidad.",
                "Los camiones vacíos pueden ser más difíciles de detener que los camiones cargados porque menos peso presiona los neumáticos contra la carretera, reduciendo la tracción.",
                "Frene temprano y gradualmente. Evite el frenado repentino que puede causar efecto tijera o pérdida de control.",
                "En carreteras mojadas o heladas, la distancia de parada puede duplicarse o triplicarse. Reduzca la velocidad y aumente la distancia de seguimiento.",
                "Use el frenado controlado (snub braking) en pendientes largas: Aplique los frenos firmemente para reducir la velocidad en 5 mph, luego suelte. Repita según sea necesario."
            ],
            keyPoints: [
                "Los vehículos más pesados necesitan más distancia para detenerse.",
                "Los camiones vacíos pueden ser más difíciles de detener (menos tracción).",
                "Frene temprano y gradualmente para evitar el efecto tijera.",
                "Las carreteras mojadas/heladas aumentan drásticamente la distancia de parada."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q5',
                    text: "¿Por qué los camiones vacíos pueden ser más difíciles de detener que los cargados?",
                    options: [
                        "Tienen frenos más débiles",
                        "Menos peso significa menos tracción en los neumáticos",
                        "El motor es menos potente",
                        "El conductor tiene menos experiencia"
                    ],
                    correctIndex: 1,
                    explanation: "Los camiones vacíos tienen menos peso presionando los neumáticos contra la carretera, lo que reduce la tracción y dificulta la parada."
                }
            ]
        },
        {
            id: 'comb-coupling',
            title: 'Acoplamiento de Tractores-Remolques',
            cdlReference: 'Manual CDL §6.4',
            content: [
                "El acoplamiento es conectar el tractor al remolque. El acoplamiento adecuado es crítico para la seguridad.",
                "Paso 1: Inspeccione la Quinta Rueda. Verifique que se incline hacia el remolque, las mordazas estén abiertas, la manija de liberación esté en la posición de bloqueo automático y esté debidamente engrasada.",
                "Paso 2: Inspeccione el Remolque. Verifique el perno rey (kingpin), el delantal (placa debajo del frente del remolque) y las líneas de aire/eléctricas.",
                "Paso 3: Posicione el Tractor. Retroceda lentamente debajo del remolque, manteniendo el perno rey del remolque alineado con la quinta rueda.",
                "Paso 4: Conecte. Retroceda hasta que la quinta rueda se bloquee alrededor del perno rey. Debería escuchar un clic o chasquido. Pruebe tirando hacia adelante suavemente.",
                "Paso 5: Asegure. Conecte las líneas de aire (emergencia primero, luego servicio). Conecte el cable eléctrico. Levante completamente el tren de aterrizaje. Haga una verificación visual de que el perno rey esté bloqueado en las mordazas."
            ],
            keyPoints: [
                "Inspeccione la quinta rueda y el perno rey antes de acoplar.",
                "Retroceda lentamente y alinee el perno rey con la quinta rueda.",
                "Conecte la línea de aire de emergencia PRIMERO.",
                "Pruebe el acoplamiento tirando hacia adelante suavemente."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q6',
                    text: "Al acoplar, ¿qué línea de aire debe conectar primero?",
                    options: [
                        "Línea de servicio",
                        "Línea de emergencia",
                        "Cualquiera está bien",
                        "Ninguna, conéctelas juntas"
                    ],
                    correctIndex: 1,
                    explanation: "Siempre conecte la línea de aire de emergencia primero. Esto carga los tanques de aire del remolque y le permite probar los frenos."
                }
            ]
        },
        {
            id: 'comb-uncoupling',
            title: 'Desacoplamiento de Tractores-Remolques',
            cdlReference: 'Manual CDL §6.4',
            content: [
                "El desacoplamiento es desconectar el tractor del remolque. El desacoplamiento inadecuado puede causar lesiones y daños.",
                "Paso 1: Posicione el equipo. Estacione en terreno firme y nivelado. Calce las ruedas del remolque o use frenos de resorte.",
                "Paso 2: Baje el tren de aterrizaje. Bájelo hasta que toque firmemente el suelo y soporte el remolque. Si está en terreno blando, use tablas debajo de las patas.",
                "Paso 3: Desconecte las líneas de aire y eléctricas. Guárdelas adecuadamente para evitar daños.",
                "Paso 4: Desbloquee la quinta rueda. Tire de la manija de liberación para desbloquear las mordazas.",
                "Paso 5: Tire del tractor hacia adelante. Tire del tractor parcialmente fuera de debajo del remolque. Deténgase con el marco del tractor todavía debajo del remolque para evitar que se caiga.",
                "Paso 6: Asegure el tractor. Cuando el tractor esté libre, aléjese completamente y asegúrelo para estacionar."
            ],
            keyPoints: [
                "Estacione en terreno firme y nivelado.",
                "Baje el tren de aterrizaje completamente antes de desconectar.",
                "Guarde las líneas de aire/eléctricas de forma segura.",
                "Tire del tractor hacia adelante lentamente para liberar el remolque."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q7',
                    text: "Al desacoplar, ¿por qué debe bajar el tren de aterrizaje antes de desconectar?",
                    options: [
                        "Para hacer el remolque más ligero",
                        "Para soportar el remolque para que no se caiga cuando el tractor se aleje",
                        "Para revisar los neumáticos",
                        "Para ahorrar tiempo"
                    ],
                    correctIndex: 1,
                    explanation: "El tren de aterrizaje debe soportar el peso del remolque cuando se retira el tractor, evitando que el remolque se caiga."
                }
            ]
        },
        {
            id: 'comb-inspect',
            title: 'Inspección de Vehículos Combinados',
            cdlReference: 'Manual CDL §6.5',
            content: [
                "Además de los elementos regulares de inspección previa al viaje, los vehículos combinados requieren inspeccionar el sistema de acoplamiento.",
                "Verificación de la Quinta Rueda: Busque daños o piezas faltantes. Verifique los pernos de montaje. Las mordazas de bloqueo deben estar alrededor del vástago del perno rey, no de la cabeza. El brazo de liberación debe estar en la posición bloqueada.",
                "Verificación de Líneas de Aire: Busque fugas, cortes u otros daños. Los acoplamientos (manos de glad) deben estar limpios y conectados correctamente. Las líneas de aire deben tener suficiente holgura para los giros.",
                "Verificación del Cable Eléctrico: Busque daños. Asegúrese de que esté correctamente conectado y asegurado.",
                "Verificación de la Quinta Rueda Deslizante: Si está equipada, verifique que el deslizador esté bloqueado en su posición. Busque pasadores faltantes, soldaduras agrietadas o componentes dañados."
            ],
            keyPoints: [
                "Inspeccione el sistema de acoplamiento cuidadosamente.",
                "Las mordazas de bloqueo deben estar alrededor del vástago del perno rey, no de la cabeza.",
                "Verifique las líneas de aire en busca de fugas y conexión adecuada.",
                "Verifique que la quinta rueda deslizante esté bloqueada."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q8',
                    text: "¿Dónde deben colocarse las mordazas de bloqueo de la quinta rueda en el perno rey?",
                    options: [
                        "Alrededor de la cabeza del perno rey",
                        "Alrededor del vástago (parte estrecha) del perno rey",
                        "Encima del perno rey",
                        "Debajo del perno rey"
                    ],
                    correctIndex: 1,
                    explanation: "Las mordazas deben estar alrededor del vástago (parte estrecha) del perno rey, no de la cabeza. Si están alrededor de la cabeza, el remolque puede soltarse."
                }
            ]
        },
        {
            id: 'comb-trailerbrakes',
            title: 'Frenos de Aire del Remolque',
            cdlReference: 'Manual CDL §6.2',
            content: [
                "Los vehículos combinados usan frenos de aire. Los frenos del remolque funcionan a través de líneas de aire que se conectan al tractor.",
                "Línea de Emergencia (Línea de Suministro): La línea de emergencia suministra aire a los tanques de aire del remolque. También controla los frenos de emergencia en el remolque. La pérdida de presión de aire hará que los frenos del remolque se activen.",
                "Línea de Servicio (Línea de Control): La línea de servicio transporta aire controlado por el freno de pie o la válvula manual del remolque. Esta línea le dice a los frenos del remolque qué tan fuerte deben aplicarse.",
                "Válvula Manual del Remolque (Trolley Valve): Se usa para aplicar solo los frenos del remolque. Solo debe usarse para probar los frenos del remolque. Nunca la use para estacionar (los frenos pueden soltarse y el vehículo rodará).",
                "Separación (Breakaway): Si el remolque se separa del tractor, la línea de emergencia pierde presión y los frenos del remolque se bloquean automáticamente. Esta es una característica de seguridad."
            ],
            keyPoints: [
                "La línea de emergencia carga los tanques del remolque y controla los frenos de emergencia.",
                "La línea de servicio controla qué tan fuerte se aplican los frenos del remolque.",
                "La válvula manual del remolque es para pruebas, NO para estacionar.",
                "Si el remolque se separa, los frenos de emergencia se activan automáticamente."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q9',
                    text: "¿Qué sucede si la línea de aire de emergencia del remolque se rompe o desconecta?",
                    options: [
                        "El remolque acelerará",
                        "No pasa nada",
                        "Los frenos del remolque se bloquearán automáticamente",
                        "Los frenos del tractor fallarán"
                    ],
                    correctIndex: 2,
                    explanation: "La pérdida de presión de aire en la línea de emergencia hace que los frenos de resorte del remolque se activen automáticamente, deteniendo el remolque."
                }
            ]
        },
        {
            id: 'comb-doubles',
            title: 'Dobles y Triples',
            cdlReference: 'Manual CDL §7',
            content: [
                "Los dobles y triples requieren precaución adicional. Tienen más puntos de articulación, lo que los hace más propensos a vuelcos e inestabilidad.",
                "Efecto látigo (Crack-the-whip): El último remolque en un conjunto de dobles o triples es el más propenso a volcar. Los cambios rápidos de carril o movimientos repentinos en el frente se amplifican en la parte trasera.",
                "Acoplamiento de dobles/triples: El remolque más pesado debe estar más cerca del tractor. El remolque más ligero debe estar en la parte trasera.",
                "Inspección: Verifique todos los dispositivos de acoplamiento, incluidos los ganchos de clavija (pintle hooks), barras de tracción y cadenas de seguridad. Inspeccione todas las conexiones de aire y eléctricas entre unidades.",
                "Distancia de seguimiento: Permita aún más distancia de seguimiento para dobles y triples. Tardan más en detenerse y son menos estables."
            ],
            keyPoints: [
                "El último remolque es el más propenso a rodar ('efecto látigo').",
                "El remolque más pesado va más cerca del tractor.",
                "Inspeccione todos los puntos de acoplamiento y conexiones.",
                "Permita distancia de seguimiento adicional."
            ],
            reviewQuestions: [
                {
                    id: 'comb-q10',
                    text: "Al acoplar dobles, ¿qué remolque debe estar más cerca del tractor?",
                    options: [
                        "El remolque más ligero",
                        "El remolque más pesado",
                        "El remolque más corto",
                        "No importa"
                    ],
                    correctIndex: 1,
                    explanation: "El remolque más pesado debe estar más cerca del tractor para una mejor estabilidad. El más ligero va atrás."
                }
            ]
        }
    ]
};
export const DoublesTriplesStudyGuide_ES: StudyGuide = {
    topicId: 'doubles_triples',
    sections: [
        {
            id: 'dt-pulling',
            title: 'Tirar de Remolques Dobles/Triples',
            cdlReference: 'Manual CDL §7.1',
            content: [
                "Tirar de dobles y triples requiere más habilidad que tirar de un solo remolque. Son menos estables y más propensos a volcar.",
                "Prevenir vuelcos: Mantenga la carga lo más cerca posible del suelo. Conduzca suavemente en las curvas. Los dobles/triples vuelcan fácilmente.",
                "Inspeccione completamente: Hay más partes críticas para verificar. La seguridad depende de que todas funcionen correctamente.",
                "Mire lejos hacia adelante: Debe mirar más adelante que cuando conduce una combinación simple. Permita más distancia de seguimiento."
            ],
            keyPoints: [
                "Menos estables que los simples: mayor riesgo de vuelco.",
                "Mantenga la carga baja y conduzca suavemente.",
                "Permita más distancia de seguimiento."
            ],
            reviewQuestions: [
                {
                    id: 'dt-q1',
                    text: "¿Por qué los dobles y triples son más peligrosos que los simples?",
                    options: [
                        "Son más lentos",
                        "Son menos estables y más propensos a volcar",
                        "Usan más combustible",
                        "Son más difíciles de estacionar solamente"
                    ],
                    correctIndex: 1,
                    explanation: "Tienen más puntos de articulación y son menos estables, lo que los hace más propensos a vuelcos y efecto tijera."
                }
            ]
        },
        {
            id: 'dt-coupling',
            title: 'Acoplamiento y Desacoplamiento',
            cdlReference: 'Manual CDL §7.2',
            content: [
                "Acoplamiento de remolques gemelos: Asegure el segundo remolque (trasero). Acople el dolly convertidor al remolque delantero. Luego acople el dolly convertidor al remolque trasero.",
                "Dolly convertidor: Un dispositivo de acoplamiento de uno o dos ejes y una quinta rueda utilizado para acoplar un remolque trasero a un remolque delantero.",
                "Desacoplamiento: Desacople primero el remolque trasero. Luego desacople el dolly convertidor del remolque delantero.",
                "Cadenas de seguridad: SIEMPRE use cadenas de seguridad al acoplar un dolly convertidor. Evitan que el dolly se separe si falla el enganche."
            ],
            keyPoints: [
                "Asegure el remolque trasero antes de acoplar.",
                "Acople el dolly al remolque delantero, luego el remolque trasero al dolly.",
                "SIEMPRE use cadenas de seguridad en los dollies convertidores."
            ],
            reviewQuestions: [
                {
                    id: 'dt-q2',
                    text: "¿Qué dispositivo se utiliza para acoplar un remolque trasero a un remolque delantero?",
                    options: [
                        "Enganche Pingel",
                        "Dolly convertidor",
                        "Gancho de seguridad",
                        "Tren de aterrizaje"
                    ],
                    correctIndex: 1,
                    explanation: "Se utiliza un dolly convertidor (con una quinta rueda) para conectar el remolque trasero al delantero."
                }
            ]
        },
        {
            id: 'dt-inspect',
            title: 'Inspección de Dobles y Triples',
            cdlReference: 'Manual CDL §7.3',
            content: [
                "Haga una inspección previa al viaje normal, más estas comprobaciones para dobles/triples.",
                "Sistema de acoplamiento: Verifique la quinta rueda inferior y superior, los pasadores de bloqueo de la quinta rueda deslizante y asegúrese de que el brazo de liberación esté bloqueado. Verifique el gancho de clavija (pintle hook) y el ojo/barra de tracción en busca de grietas o desgaste.",
                "Líneas de aire: Verifique que las mangueras de aire al remolque trasero estén conectadas y aseguradas. Escuche si hay fugas.",
                "Cadenas de seguridad: Verifique que las cadenas estén bien sujetas y no tengan grietas/daños.",
                "Tren de aterrizaje: Comience con el tren de aterrizaje bajo en el remolque trasero para evitar que se vuelque."
            ],
            keyPoints: [
                "Verifique el gancho de clavija, la barra de tracción y las cadenas de seguridad.",
                "Verifique que las líneas de aire al remolque trasero estén seguras.",
                "Asegúrese de que el brazo de liberación esté en posición bloqueada."
            ],
            reviewQuestions: [
                {
                    id: 'dt-q3',
                    text: "¿Cuál de estos es un control crítico para dobles/triples?",
                    options: [
                        "Volumen de radio",
                        "Gancho de clavija, barra de tracción y cadenas de seguridad",
                        "Estabilidad del portavasos",
                        "Tapicería del asiento"
                    ],
                    correctIndex: 1,
                    explanation: "Los puntos de conexión (gancho de clavija, barra de tracción, cadenas) son críticos para evitar la separación del remolque."
                }
            ]
        },
        {
            id: 'dt-aircheck',
            title: 'Verificación de Frenos de Aire de Dobles/Triples',
            cdlReference: 'Manual CDL §7.4',
            content: [
                "Verifique que el aire fluya a todos los remolques. Abra la válvula de cierre de la línea de emergencia en la parte trasera del último remolque. Debería escuchar aire escapando.",
                "Cierre la válvula de la línea de emergencia. Ahora abra la válvula de la línea de servicio para verificar la presión de aire de servicio (que alguien aplique los frenos).",
                "Prueba de flujo de aire: Si el aire no fluye hacia el remolque trasero, los frenos no funcionarán. Esta es una verificación obligatoria."
            ],
            keyPoints: [
                "Verifique que el aire fluya hacia la PARTE TRASERA del ÚLTIMO remolque.",
                "Abra las válvulas para escuchar el escape de aire.",
                "Si no hay flujo de aire, los frenos no funcionarán."
            ],
            reviewQuestions: [
                {
                    id: 'dt-q4',
                    text: "¿Cómo se verifica si el aire fluye hacia el remolque trasero?",
                    options: [
                        "Mire el medidor",
                        "Abra la válvula de cierre de la línea de emergencia en la parte trasera del último remolque",
                        "Escuche el motor",
                        "Patee los neumáticos"
                    ],
                    correctIndex: 1,
                    explanation: "Abrir la válvula en la parte trasera asegura que el aire viaje a través de todo el sistema hasta el último remolque."
                }
            ]
        }
    ]
};
export const TankVehiclesStudyGuide_ES: StudyGuide = {
    topicId: 'tank_vehicles',
    sections: [
        {
            id: 'tank-inspect',
            title: 'Inspección de Vehículos Tanque',
            cdlReference: 'Manual CDL §8.1',
            content: [
                "Los vehículos tanque tienen elementos especiales para revisar. Las fugas son una gran preocupación.",
                "Revise el tanque: Busque grietas, abolladuras y fugas. Revise tuberías, conexiones y mangueras en busca de fugas.",
                "Tapas de alcantarilla (Manhole Covers): Deben estar cerradas y aseguradas antes de moverse. Las fugas alrededor de la cubierta del domo son peligrosas.",
                "Rejillas de ventilación (Vents): Verifique que las válvulas de admisión y descarga estén en la posición correcta. Verifique las válvulas de alivio de presión."
            ],
            keyPoints: [
                "Revise el cuerpo del tanque, las tuberías y las mangueras en busca de fugas.",
                "Asegúrese de que las tapas de alcantarilla estén ASEGURADAS.",
                "Verifique que las rejillas de ventilación y las válvulas funcionen."
            ],
            reviewQuestions: [
                {
                    id: 'tank-q1',
                    text: "¿Cuál es una comprobación crítica para las tapas de alcantarilla en los vehículos tanque?",
                    options: [
                        "Están pintadas de rojo",
                        "Están cerradas y aseguradas",
                        "Están abiertas para ventilación",
                        "Tienen candado"
                    ],
                    correctIndex: 1,
                    explanation: "Las tapas de alcantarilla deben estar cerradas y aseguradas para evitar fugas y derrames, especialmente en un vuelco."
                }
            ]
        },
        {
            id: 'tank-driving',
            title: 'Conducción de Vehículos Tanque',
            cdlReference: 'Manual CDL §8.2',
            content: [
                "Alto centro de gravedad: Los camiones cisterna son pesados en la parte superior. Vuelcan fácilmente. Conduzca despacio en las curvas.",
                "Oleaje líquido (Liquid Surge): El movimiento del líquido dentro del tanque (oleaje) puede empujar el camión en la dirección de la ola. Puede empujar un camión detenido hacia una intersección.",
                "Mamparos (Bulkheads): Algunos tanques tienen mamparos (divisores) con agujeros. Controlan el oleaje hacia adelante/atrás pero no el oleaje de lado a lado.",
                "Deflectores (Baffles): Los tanques con deflectores tienen mamparos con agujeros. Los tanques sin deflectores (diámetro interior liso) no tienen nada para ralentizar el oleaje del líquido. Son más difíciles de conducir."
            ],
            keyPoints: [
                "Los camiones cisterna tienen un centro de gravedad alto (riesgo de vuelco).",
                "El oleaje líquido afecta el manejo y el frenado.",
                "Los tanques de diámetro liso (sin deflectores) tienen un oleaje fuerte."
            ],
            reviewQuestions: [
                {
                    id: 'tank-q2',
                    text: "¿Qué tipo de vehículo tanque tiene el oleaje líquido más fuerte?",
                    options: [
                        "Tanques con deflectores",
                        "Tanques con mamparos",
                        "Tanques de diámetro liso (sin deflectores)",
                        "Tanques pequeños"
                    ],
                    correctIndex: 2,
                    explanation: "Los tanques de diámetro liso no tienen estructura interna para ralentizar el líquido, lo que provoca un fuerte oleaje hacia adelante y hacia atrás."
                }
            ]
        },
        {
            id: 'tank-safe',
            title: 'Reglas de Conducción Segura',
            cdlReference: 'Manual CDL §8.3',
            content: [
                "Exceso de velocidad: Si conduce demasiado rápido, el oleaje líquido combinado con un centro de gravedad alto puede provocar un vuelco. Reduzca la velocidad antes de las curvas.",
                "Distancia de frenado: Las carreteras mojadas duplican su distancia de frenado. Los tanques vacíos pueden tardar más en detenerse que los cargados debido a una menor tracción (aunque los cargados tienen que lidiar con el oleaje).",
                "Derrapes: No gire demasiado, no acelere demasiado ni frene demasiado. Si lo hace, el oleaje líquido puede empujar el tanque hacia los lados, provocando un efecto tijera."
            ],
            keyPoints: [
                "Conduzca despacio (especialmente en curvas).",
                "Las carreteras mojadas aumentan significativamente la distancia de frenado.",
                "Evite girar demasiado para evitar el efecto tijera inducido por el oleaje."
            ],
            reviewQuestions: [
                {
                    id: 'tank-q3',
                    text: "¿Por qué debe reducir la velocidad antes de las curvas en un vehículo tanque?",
                    options: [
                        "Para ahorrar combustible",
                        "Para admirar la vista",
                        "Para evitar un vuelco debido al alto centro de gravedad y al oleaje",
                        "Para cambiar de marcha"
                    ],
                    correctIndex: 2,
                    explanation: "La combinación de un centro de gravedad alto y el oleaje líquido hace que los camiones cisterna sean muy propensos a vuelcos en las curvas."
                }
            ]
        }
    ]
};
export const SchoolBusStudyGuide_ES: StudyGuide = {
    topicId: 'school_bus',
    sections: [
        {
            id: 'sb-danger',
            title: 'Zonas de Peligro y Uso de Espejos',
            cdlReference: 'Manual CDL §10.1',
            content: [
                "Zonas de Peligro: El área en todos los lados del autobús donde los niños corren mayor peligro de ser golpeados. Se extiende hasta 30 pies desde el parachoques delantero y 10 pies desde los lados izquierdo y derecho.",
                "Espejos: Use espejos convexos para ver las zonas de peligro. Los espejos planos detectan el tráfico. Los espejos de vista cruzada (cross-view) le permiten ver el área del parachoques delantero.",
                "Puntos ciegos: El área directamente detrás del autobús es un punto ciego importante. No se puede ver con ningún espejo."
            ],
            keyPoints: [
                "La zona de peligro se extiende 30 pies al frente, 10 pies a los lados.",
                "Los espejos de vista cruzada muestran el área del parachoques delantero.",
                "Directamente detrás del autobús es un punto ciego."
            ],
            reviewQuestions: [
                {
                    id: 'sb-q1',
                    text: "¿Hasta dónde se extiende la zona de peligro desde el parachoques delantero?",
                    options: [
                        "5 pies",
                        "10 pies",
                        "30 pies",
                        "50 pies"
                    ],
                    correctIndex: 2,
                    explanation: "La zona de peligro se extiende hasta 30 pies desde el parachoques delantero."
                }
            ]
        },
        {
            id: 'sb-loading',
            title: 'Carga y Descarga',
            cdlReference: 'Manual CDL §10.2',
            content: [
                "Esta es la parte más peligrosa del trabajo. Encienda las luces ámbar intermitentes 200-300 pies (o según lo requiera la ley estatal) antes de la parada.",
                "Parada: Deténgase al menos a 10 pies de distancia de los estudiantes. Ponga el freno de estacionamiento.",
                "Señal: Señale a los estudiantes cuando sea seguro cruzar. Deben cruzar al menos 10 pies frente al autobús para que pueda verlos.",
                "Descarga: Cuente a los estudiantes a medida que salen. Asegúrese de que nadie quede atrapado en el pasamanos o la puerta."
            ],
            keyPoints: [
                "Active las luces ámbar 200-300 pies antes de la parada.",
                "Deténgase al menos a 10 pies de los estudiantes.",
                "Los estudiantes deben cruzar 10 pies DELANTE del autobús."
            ],
            reviewQuestions: [
                {
                    id: 'sb-q2',
                    text: "Al descargar, ¿por dónde deben cruzar la calle los estudiantes?",
                    options: [
                        "Detrás del autobús",
                        "Al menos 10 pies frente al autobús",
                        "Directamente al lado de la ventana del conductor",
                        "En cualquier lugar seguro"
                    ],
                    correctIndex: 1,
                    explanation: "Deben cruzar al menos 10 pies por delante para que pueda verlos."
                }
            ]
        },
        {
            id: 'sb-exit',
            title: 'Salida de Emergencia y Evacuación',
            cdlReference: 'Manual CDL §10.3',
            content: [
                "Evacúe si: El autobús está en llamas, atascado en las vías del tren o en peligro de hundirse/colisión.",
                "Puerta delantera: La mejor para la mayoría de las evacuaciones.",
                "Puerta trasera: Úsela si la delantera está bloqueada.",
                "Salidas de techo/ventanas: Úselas si el autobús está de lado o en el agua.",
                "Distancia: Mueva a los estudiantes al menos a 100 pies de distancia del autobús en la dirección del tráfico que se aproxima si está en una carretera (para evitar ser golpeado por escombros si el autobús es golpeado)."
            ],
            keyPoints: [
                "Evacúe por incendio, vías de tren o peligro inminente.",
                "Mueva a los estudiantes a 100 pies de distancia.",
                "Asegure el autobús si es posible."
            ],
            reviewQuestions: [
                {
                    id: 'sb-q3',
                    text: "¿Qué tan lejos debe mover a los estudiantes durante una evacuación?",
                    options: [
                        "10 pies",
                        "50 pies",
                        "100 pies",
                        "Media milla"
                    ],
                    correctIndex: 2,
                    explanation: "Muévalos al menos a 100 pies de distancia para garantizar la seguridad."
                }
            ]
        },
        {
            id: 'sb-railroad',
            title: 'Cruces de Ferrocarril-Carretera',
            cdlReference: 'Manual CDL §10.4',
            content: [
                "Procedimientos: Active las luces de emergencia unos 200 pies antes. Deténgase entre 15 y 50 pies del riel más cercano.",
                "Mire y escuche: Abra la puerta y la ventana del conductor para escuchar los trenes. Silencie a los pasajeros/radio.",
                "Cruce: Cierre la puerta. Cruce solo cuando sea seguro. No cambie de marcha mientras cruza.",
                "Contención: Si se activa una señal o baja una barrera mientras está en las vías, conduzca a través de la barrera. No se detenga."
            ],
            keyPoints: [
                "Deténgase a 15-50 pies del riel.",
                "Abra puerta/ventana para escuchar.",
                "NUNCA cambie de marcha en las vías."
            ],
            reviewQuestions: [
                {
                    id: 'sb-q4',
                    text: "¿Qué debe hacer si la barrera baja mientras cruza las vías?",
                    options: [
                        "Deténgase inmediatamente",
                        "Retroceda",
                        "Conduzca a través de la barrera",
                        "Toque la bocina"
                    ],
                    correctIndex: 2,
                    explanation: "Si queda atrapado, conduzca a través de la barrera. Salvar vidas es más importante que la barrera."
                }
            ]
        },
        {
            id: 'sb-mgmt',
            title: 'Gestión de Estudiantes',
            cdlReference: 'Manual CDL §10.5',
            content: [
                "No se ocupe de la disciplina mientras conduce.",
                "Si el comportamiento es incontrolable, deténgase de manera segura. Asegure el autobús. Levántese y hable con respeto pero con firmeza.",
                "Bajada: Nunca baje a un estudiante del autobús en una parada personalizada por razones disciplinarias. Solo en su parada designada o escuela."
            ],
            keyPoints: [
                "No discipline mientras conduce.",
                "Deténgase de forma segura si pierde el control.",
                "Solo deje a los estudiantes en las paradas designadas."
            ],
            reviewQuestions: [
                {
                    id: 'sb-q5',
                    text: "¿Cuándo debe lidiar con problemas graves de disciplina?",
                    options: [
                        "Mientras conduce, mirando por el espejo",
                        "Deténgase de manera segura, asegure el autobús, luego manéjelo",
                        "Grite mientras conduce",
                        "Llame a los padres inmediatamente"
                    ],
                    correctIndex: 1,
                    explanation: "Detenga el autobús de forma segura primero. Conducir distraído es peligroso."
                }
            ]
        },
        {
            id: 'sb-abs',
            title: 'Sistemas de Frenos Antibloqueo (ABS)',
            cdlReference: 'Manual CDL §10.6',
            content: [
                "El ABS le ayuda a mantener el control de la dirección durante un frenado brusco.",
                "Frene normalmente. No bombee los frenos si tiene ABS.",
                "La luz ABS se enciende al arrancar y debe apagarse. Si permanece encendida, el ABS no funciona (pero los frenos normales sí funcionan)."
            ],
            keyPoints: [
                "El ABS evita el bloqueo de las ruedas.",
                "No bombee los frenos.",
                "Mantenga el control de la dirección."
            ],
            reviewQuestions: [
                {
                    id: 'sb-q6',
                    text: "¿Cómo debe frenar con ABS?",
                    options: [
                        "Bombee los frenos repetidamente",
                        "Frene normalmente y mantenga la presión",
                        "Pise los frenos de golpe",
                        "Use el freno de estacionamiento"
                    ],
                    correctIndex: 1,
                    explanation: "Frene normalmente. El ABS pulsará automáticamente los frenos para evitar el bloqueo."
                }
            ]
        },
        {
            id: 'sb-special',
            title: 'Consideraciones Especiales de Seguridad',
            cdlReference: 'Manual CDL §10.7',
            content: [
                "Luces estroboscópicas: Úselas cuando la visibilidad sea limitada (niebla, lluvia, nieve).",
                "Vientos fuertes: Los autobuses escolares son altos y vulnerables a los vientos.",
                "Retroceso: Se desaconseja totalmente. Solo retroceda si es absolutamente necesario. Use un vigía/ayudante."
            ],
            keyPoints: [
                "Evite retroceder siempre que sea posible.",
                "Use luces estroboscópicas con poca visibilidad.",
                "Cuidado con los vientos fuertes."
            ],
            reviewQuestions: [
                {
                    id: 'sb-q7',
                    text: "¿Cuándo debe retroceder un autobús escolar?",
                    options: [
                        "Siempre que ahorre tiempo",
                        "Solo cuando sea absolutamente necesario",
                        "En cada parada",
                        "Para dar la vuelta"
                    ],
                    correctIndex: 1,
                    explanation: "Retroceder es peligroso. Evítelo a menos que no haya otra forma segura."
                }
            ]
        }
    ]
};
export const AirBrakesStudyGuide_ES: StudyGuide = {
    "topicId": "air_brakes",
    "sections": [
        {
            "id": "air-intro",
            "title": "Parts of an Air Brake System",
            "cdlReference": "CDL Manual §5.1",
            "content": [
                "Los frenos de aire utilizan aire comprimido para que los frenos funcionen. Son una forma segura de detener vehículos pesados, pero tienen más piezas y son más difíciles de mantener que los frenos hidráulicos.",
                "Air Compressor: Pumps air into the air storage tanks. It connects to the engine through gears or a V-belt.",
                "Gobernador del compresor de aire: controla cuándo el compresor bombea aire. Se activa (comienza a bombear) alrededor de 100 psi y se corta (deja de bombear) alrededor de 125 psi.",
                "Air Storage Tanks: Hold compressed air. They have drain valves to remove water and oil (sludge) that collects in the bottom.",
                "Válvula de seguridad: Protege el tanque de demasiada presión. Generalmente se abre a 150 psi. Si se abre, algo anda mal."
            ],
            "keyPoints": [
                "El gobernador entra a 100 psi y sale a 125 psi.",
                "Las válvulas de drenaje eliminan el agua y el aceite de los tanques.",
                "La válvula de seguridad se abre a 150 psi (señal de advertencia)."
            ],
            "reviewQuestions": [
                {
                    "id": "air-q1",
                    "text": "¿Cuándo se \"apaga\" el regulador del compresor de aire?",
                    "options": [
                        "At 100 psi",
                        "A 125 psi",
                        "A 150 psi",
                        "A 60 psi"
                    ],
                    "correctIndex": 1,
                    "explanation": "The governor stops pumping air (cuts out) when the tank pressure reaches around 125 psi."
                }
            ]
        },
        {
            "id": "air-parts",
            "title": "Brake System Components",
            "cdlReference": "CDL Manual §5.1",
            "content": [
                "Brake Pedal: Pressing it pushes air into the brake chambers. Releasing it lets air out.",
                "S-Cam Brakes: The most common type. Air pushes a push rod, which moves a slack adjuster, which turns the S-cam. The S-cam pushes brake shoes against the drum.",
                "Tambores/zapatas de freno: Los tambores son la parte exterior que gira. Los zapatos son la parte interior con forros que presionan contra el tambor para detenerlo.",
                "Ajustadores de holgura: Se utilizan para ajustar los frenos. Si son manuales hay que revisarlos y ajustarlos frecuentemente."
            ],
            "keyPoints": [
                "S-Cam es el freno de base más común.",
                "Push rod -> Slack Adjuster -> S-Cam -> Brake Shoes.",
                "Los ajustadores de holgura fijan el espacio entre las zapatas y el tambor."
            ],
            "reviewQuestions": [
                {
                    "id": "air-q2",
                    "text": "What part of the brake system pushes the brake shoes against the drum?",
                    "options": [
                        "La cámara S",
                        "el compresor de aire",
                        "el gobernador",
                        "La válvula de seguridad"
                    ],
                    "correctIndex": 0,
                    "explanation": "La leva S gira y fuerza las zapatas de freno contra el interior del tambor de freno."
                }
            ]
        },
        {
            "id": "air-dual",
            "title": "Sistemas de frenos de aire duales",
            "cdlReference": "CDL Manual §5.2",
            "content": [
                "La mayoría de los vehículos pesados ​​modernos utilizan sistemas duales de frenos de aire por motivos de seguridad. Tiene dos sistemas de aire separados que utilizan un único conjunto de controles.",
                "Sistema Primario: Generalmente opera los frenos del eje trasero.",
                "Secondary System: Usually operates the front axle brakes.",
                "Before driving, allow time for the air compressor to build up a minimum of 100 psi pressure in BOTH the primary and secondary systems."
            ],
            "keyPoints": [
                "Dos sistemas (Primario/Secundario) para seguridad.",
                "Must build 100 psi in BOTH systems before driving."
            ],
            "reviewQuestions": [
                {
                    "id": "air-q3",
                    "text": "How much pressure must be in the air tanks before driving?",
                    "options": [
                        "60 psi",
                        "100 psi",
                        "125 psi",
                        "150 psi"
                    ],
                    "correctIndex": 1,
                    "explanation": "You must build up a minimum of 100 psi in both the primary and secondary systems before driving."
                }
            ]
        },
        {
            "id": "air-inspection-1",
            "title": "Inspecting Air Brakes (Step 1-2)",
            "cdlReference": "CDL Manual §5.3",
            "content": [
                "Step 1: Engine compartment check. Check the air compressor drive belt (if equipped). Condition: snug, not frayed/cracked. Deflection: press in center, should deflect 1/2 to 3/4 inch.",
                "Step 2: Walk-around inspection. Check manual slack adjusters on S-cam brakes. Park on level ground, chock wheels, release parking brakes. Pull hard on each slack adjuster. It should not move more than 1 inch.",
                "Revise los tambores de freno (sin grietas de más de 1/2 del ancho del área de fricción) y los forros (no demasiado delgados, sin grasa/aceite)."
            ],
            "keyPoints": [
                "Los ajustadores de tensión no deben moverse más de 1 pulgada cuando se tiran.",
                "Check belt deflection (1/2 - 3/4 inch).",
                "Sin aceite/grasa en las pastillas de freno."
            ],
            "reviewQuestions": [
                {
                    "id": "air-q4",
                    "text": "¿Cuánto puede moverse un ajustador de tensión cuando se tira con la mano?",
                    "options": [
                        "Más de 2 pulgadas",
                        "No más de 1 pulgada",
                        "No debería moverse en absoluto",
                        "Hasta 3 pulgadas"
                    ],
                    "correctIndex": 1,
                    "explanation": "Si un ajustador de tensión se mueve más de aproximadamente una pulgada en el lugar donde se une la varilla de empuje, es necesario ajustarlo."
                }
            ]
        },
        {
            "id": "air-inspection-2",
            "title": "The 3-Step Air Leakage Test",
            "cdlReference": "CDL Manual §5.3.3",
            "content": [
                "Esto es CRÍTICO para la prueba CDL.",
                "1. Pruebe la advertencia de baja presión: Apague el motor y ponga la llave en ON. Bombee el pedal del freno para liberar aire. La señal de advertencia (luz/zumbador) DEBE encenderse antes de que la presión caiga a 60 psi.",
                "2. Pruebe los frenos de resorte: Continúe abanicando (bombeando) los frenos. La válvula de protección del freno de resorte debe salir (se aplican los frenos) cuando la presión cae a 20-45 psi.",
                "3. Prueba de fugas estática y aplicada: vuelva a aumentar la presión al máximo. Apague el motor. Suelte el freno de estacionamiento. Aplique completamente el freno de pie y manténgalo así durante 1 minuto. El camión limpio no debe perder más de 3 psi (Combinación: 4 psi)."
            ],
            "keyPoints": [
                "La advertencia de nivel bajo de aire DEBE encenderse a 60 psi.",
                "Spring brakes MUST pop out between 20-45 psi.",
                "Tasa de fuga (aplicada): máx. 3 psi/min (simple), 4 psi/min (combinado)."
            ],
            "reviewQuestions": [
                {
                    "id": "air-q5",
                    "text": "¿A qué presión debe aparecer la señal de advertencia de baja presión de aire?",
                    "options": [
                        "Antes de que caiga a 60 psi",
                        "Antes de que baje a 30 psi",
                        "A 100 psi",
                        "At 125 psi"
                    ],
                    "correctIndex": 0,
                    "explanation": "La señal de advertencia de baja presión de aire debe encenderse antes de que la presión caiga a menos de 60 psi."
                }
            ]
        },
        {
            "id": "air-using-1",
            "title": "Using Air Brakes",
            "cdlReference": "CDL Manual §5.4",
            "content": [
                "Paradas normales: Pise el pedal del freno. Controle la presión para que el vehículo se detenga de forma suave y segura.",
                "Paradas de emergencia: si debe detenerse rápidamente, frene para poder girar y mantener el vehículo en línea recta. Utilice el 'Frenado controlado' (apriete con fuerza pero no bloquee) o el 'Frenado de puñalada' (frene por completo, suelte cuando las ruedas se bloqueen, repita).",
                "Braking Lag: Air brakes take longer to work than hydraulic brakes because air takes time to flow. At 55 mph, this adds about 32 feet to your stopping distance."
            ],
            "keyPoints": [
                "El retardo de frenado aumenta la distancia (32 pies a 55 mph).",
                "Controlled braking: Apply brakes hard without locking.",
                "Frenado brusco: bloquear las ruedas, soltar y repetir."
            ],
            "reviewQuestions": [
                {
                    "id": "air-q6",
                    "text": "¿Qué es el retardo de frenado?",
                    "options": [
                        "El tiempo necesario para que el conductor vea un peligro.",
                        "El tiempo que tarda el aire en fluir a través de las líneas hasta los frenos.",
                        "El tiempo que lleva mover el pie hasta el pedal.",
                        "La distancia que se desliza el camión."
                    ],
                    "correctIndex": 1,
                    "explanation": "El retraso del frenado es el tiempo necesario para que el aire fluya a través de las líneas hacia los frenos después de presionar el pedal."
                }
            ]
        },
        {
            "id": "air-using-2",
            "title": "Frenar en pendientes",
            "cdlReference": "CDL Manual §5.4.3",
            "content": [
                "Brake Fading: Brakes can fade or fail from excessive heat caused by using them too much. DO NOT ride the brakes down a hill.",
                "Técnica adecuada: 1. Seleccione una velocidad baja segura (freno motor). 2. Frene firmemente para reducir la velocidad a 5 mph por debajo de su velocidad segura. 3. Suelte los frenos. 4. Espere a que la velocidad aumente hasta alcanzar una velocidad segura. 5. Repita.",
                "Esto se llama \"frenado brusco\"."
            ],
            "keyPoints": [
                "El calor provoca que los frenos se desvanezcan.",
                "Utilice el freno motor y el frenado brusco.",
                "Aplique los frenos para reducir la velocidad 5 mph y luego suéltelos."
            ],
            "reviewQuestions": [
                {
                    "id": "air-q7",
                    "text": "¿Por qué debería evitar utilizar los frenos continuamente en una bajada larga?",
                    "options": [
                        "Desperdicia combustible",
                        "Desgasta las llantas",
                        "The brakes can overheat and fail (fade)",
                        "es ilegal"
                    ],
                    "correctIndex": 2,
                    "explanation": "El uso excesivo de los frenos de servicio produce sobrecalentamiento y hace que los frenos se desvanezcan."
                }
            ]
        },
        {
            "id": "air-parking",
            "title": "Frenos de estacionamiento",
            "cdlReference": "CDL Manual §5.4.5",
            "content": [
                "Any time you park, use the parking brakes, with two exceptions: 1. The brakes are very hot (they can warp the drums). 2. The brakes are wet in freezing temperatures (they can freeze).",
                "Frenos de resorte: un resorte mecánico aplica los frenos cuando se elimina la presión del aire. Se utiliza para estacionamiento y frenado de emergencia.",
                "Nunca pise el pedal del freno cuando los frenos de resorte estén activados. La fuerza combinada podría dañar los frenos."
            ],
            "keyPoints": [
                "Utilice los frenos de mano cada vez que estacione.",
                "Exceptions: Very hot or wet/freezing.",
                "No utilice el freno de pie cuando el freno de mano esté puesto."
            ],
            "reviewQuestions": [
                {
                    "id": "air-q8",
                    "text": "¿Cuándo NO debes usar los frenos de mano?",
                    "options": [
                        "Al comprobar el aceite",
                        "When the brakes are very hot or wet in freezing weather",
                        "Al estacionar en una colina",
                        "Cuando estacione por menos de 5 minutos"
                    ],
                    "correctIndex": 1,
                    "explanation": "No use los frenos de estacionamiento si los frenos están muy calientes (pueden deformar los tambores) o mojados en temperaturas bajo cero (pueden congelarse)."
                }
            ]
        }
    ]
};

export const HazmatStudyGuide_ES: StudyGuide = {
    topicId: 'hazmat',
    sections: [
        {
            id: 'hazmat-intent',
            title: 'La intención de las regulaciones',
            cdlReference: 'Manual CDL §9.1',
            content: [
                "Los materiales peligrosos son productos que representan un riesgo para la salud, la seguridad y la propiedad durante el transporte.",
                "Contención: Muchos materiales peligrosos pueden lesionar o matar al contacto. Las reglas indican a los remitentes cómo empaquetar de forma segura y a los conductores cómo cargar, transportar y descargar el producto.",
                "Comunicación: Las reglas indican a los remitentes cómo marcar, etiquetar y documentar el envío. Indican a los conductores cómo colocar carteles en su vehículo.",
                "Para garantizar conductores y equipos seguros, debe pasar una prueba de conocimientos y una verificación de antecedentes."
            ],
            keyPoints: [
                "Intención: Contención y Comunicación.",
                "Los remitentes empaquetan y etiquetan.",
                "Los conductores colocan carteles y transportan de forma segura."
            ],
            reviewQuestions: [
                {
                    id: 'haz-q1',
                    text: "¿Cuáles son las dos razones principales de las regulaciones de materiales peligrosos?",
                    options: [
                        "Gravar a los remitentes y transportistas",
                        "Contener el producto y comunicar el riesgo",
                        "Ralentizar el tráfico de camiones",
                        "Crear trabajos para inspectores"
                    ],
                    correctIndex: 1,
                    explanation: "Las regulaciones están destinadas a contener el producto (mantenerlo seguro) y comunicar el riesgo (hacer saber a los demás qué es)."
                }
            ]
        },
        {
            id: 'hazmat-comms',
            title: 'Reglas de Comunicación',
            cdlReference: 'Manual CDL §9.2',
            content: [
                "Documentos de envío: Describen los materiales peligrosos. Deben guardarse en la bolsa de la puerta del conductor O a la vista y al alcance inmediato mientras el cinturón de seguridad está abrochado, usando el reposabrazos del conductor.",
                "Carteles (Placards): Señales de advertencia en forma de diamante colocadas en el exterior del vehículo. Debe tener al menos 4 carteles (frente, atrás y ambos lados).",
                "Etiquetas: Advertencias en forma de diamante en los paquetes mismos.",
                "Números de identificación: Un código de 4 dígitos utilizado por los socorristas para identificar el material (por ejemplo, 1203 para gasolina)."
            ],
            keyPoints: [
                "Documentos de envío: En la bolsa de la puerta o al alcance.",
                "Carteles: 4 lados del vehículo.",
                "Números de ID: Código de 4 dígitos para respuesta de emergencia."
            ],
            reviewQuestions: [
                {
                    id: 'haz-q2',
                    text: "¿Dónde debe guardar los documentos de envío mientras conduce?",
                    options: [
                        "En la guantera",
                        "En su bolsillo",
                        "En una bolsa en la puerta del conductor o a la vista y al alcance",
                        "En la litera"
                    ],
                    correctIndex: 2,
                    explanation: "Deben ser fácilmente accesibles para usted o para el personal de emergencia."
                }
            ]
        },
        {
            id: 'hazmat-loading',
            title: 'Carga y Descarga',
            cdlReference: 'Manual CDL §9.3',
            content: [
                "Regla general: No fume a menos de 25 pies de cualquier vehículo de materiales peligrosos (Clase 1, 3, 4, 4.2).",
                "Reglas del calentador de carga: Apague los calentadores de carga al cargar explosivos o líquidos inflamables.",
                "Combinaciones de carga prohibidas: Algunos materiales no se pueden cargar juntos. Por ejemplo, no cargue la División 1.1 o 1.2 (Explosivos) con la Clase 3 (Líquidos Inflamables).",
                "Tabla de segregación de carga: Use la tabla en el manual para verificar qué puede reemplazar a qué.",
                "Frenos: Ponga el freno de estacionamiento. Use calzos en las ruedas."
            ],
            keyPoints: [
                "No fumar a menos de 25 pies.",
                "Verifique la tabla de segregación para combinaciones prohibidas.",
                "Siempre calce las ruedas."
            ],
            reviewQuestions: [
                {
                    id: 'haz-q3',
                    text: "¿Qué tan cerca puede fumar de un vehículo cargado con líquidos inflamables?",
                    options: [
                        "10 pies",
                        "25 pies",
                        "50 pies",
                        "100 pies"
                    ],
                    correctIndex: 1,
                    explanation: "No fume a menos de 25 pies de un tanque de carga con carteles usado para Clase 3 (líquidos inflamables) o División 2.1 (gas inflamable)."
                }
            ]
        },
        {
            id: 'hazmat-bulk',
            title: 'Embalaje a Granel (Tanques)',
            cdlReference: 'Manual CDL §9.4',
            content: [
                "Marcas: Los tanques portátiles deben mostrar el nombre del propietario o arrendatario en ambos lados.",
                "Vehículos tanque: Tienen un centro de gravedad alto. Conduzca suavemente. Tenga cuidado en las curvas.",
                "Espacio libre (Outage/Ullage): Nunca cargue un tanque al 100%. Los líquidos se expanden con el calor. Deje espacio (espacio libre) para la expansión.",
                "Deflectores (Baffles): Mamparos con agujeros que ralentizan el oleaje del líquido (pero no detienen el oleaje de lado a lado)."
            ],
            keyPoints: [
                "Deje espacio libre para la expansión.",
                "Los tanques portátiles necesitan el nombre del propietario.",
                "Cuidado con el centro de gravedad alto."
            ],
            reviewQuestions: [
                {
                    id: 'haz-q4',
                    text: "¿Por qué debe dejar espacio (espacio libre) en un tanque?",
                    options: [
                        "Para ahorrar peso",
                        "Para permitir la expansión del líquido",
                        "Para ahorrar dinero en producto",
                        "Para reducir el chapoteo"
                    ],
                    correctIndex: 1,
                    explanation: "Los líquidos se expanden cuando se calientan. Si el tanque está lleno, podría estallar o tener fugas."
                }
            ]
        },
        {
            id: 'hazmat-driving',
            title: 'Reglas de Conducción y Estacionamiento',
            cdlReference: 'Manual CDL §9.5',
            content: [
                "Estacionamiento con Explosivos (1.1, 1.2, 1.3): Nunca se estacione a menos de 5 pies de la parte transitada de la carretera. Nunca se estacione a menos de 300 pies de un puente, túnel o edificio destinado a reuniones.",
                "Cruces de ferrocarril: Debe detenerse de 15 a 50 pies antes del riel más cercano. Mire y escuche.",
                "Restricciones de ruta: Algunas carreteras prohíben materiales peligrosos. Conozca su ruta.",
                "Neumáticos: Revise los neumáticos cada 2 horas o 100 millas. Si un neumático está sobrecalentado, debe retirarlo a un lugar seguro para repararlo."
            ],
            keyPoints: [
                "Estacionamiento de explosivos: 300 pies de edificios/puentes.",
                "Deténgase en TODOS los cruces de ferrocarril (15-50 pies).",
                "Revise los neumáticos cada 2 horas/100 millas."
            ],
            reviewQuestions: [
                {
                    id: 'haz-q5',
                    text: "¿Qué tan lejos debe permanecer de un puente o túnel si se estaciona con explosivos de la División 1.1?",
                    options: [
                        "100 pies",
                        "200 pies",
                        "300 pies",
                        "500 pies"
                    ],
                    correctIndex: 2,
                    explanation: "No se estacione a menos de 300 pies de puentes, túneles o edificios."
                }
            ]
        },
        {
            id: 'hazmat-emergencies',
            title: 'Emergencies',
            cdlReference: 'Manual CDL §9.6',
            content: [
                "Guía de Respuesta a Emergencias (ERG): Utilizada por bomberos y policías. Les dice qué hacer. Guárdela en su camión.",
                "Accidentes: Mantenga a las personas alejadas de la escena. Limite la propagación del material si es seguro.",
                "Incendios: No entre en una estación de servicio. Use su extintor (B:C para materiales peligrosos). NO use agua en incendios químicos a menos que sepa que es seguro.",
                "Informes: Llame a las autoridades o a CHEMTREC."
            ],
            keyPoints: [
                "Lleve la ERG.",
                "Mantenga a las personas alejadas (viento arriba).",
                "Use extintor B:C."
            ],
            reviewQuestions: [
                {
                    id: 'haz-q6',
                    text: "¿Para quién está diseñada principalmente la Guía de Respuesta a Emergencias (ERG)?",
                    options: [
                        "Conductores de camiones",
                        "Remitentes",
                        "Socorristas de emergencia",
                        "Inspectores del DOT"
                    ],
                    correctIndex: 2,
                    explanation: "La ERG es una guía para los socorristas durante la fase inicial de un incidente de transporte de mercancías peligrosas/materiales peligrosos."
                }
            ]
        }
    ]
};

