export type Locale = 'en' | 'es' | 'ru';

export type TranslationKey =
    | 'appTitle'
    | 'appSubtitle'
    | 'topics'
    | 'awards'
    | 'profile'
    | 'settings'
    | 'darkMode'
    | 'lightMode'
    | 'resetProgress'
    | 'privacyPolicy'
    | 'termsOfService'
    | 'selectTopic'
    | 'studyGuide'
    | 'newHereTip'
    | 'practice'
    | 'exam'
    | 'questions'
    | 'averageScore'
    | 'studyTime'
    | 'close'
    | 'back'
    | 'next'
    | 'submit'
    | 'finish'
    | 'correct'
    | 'incorrect'
    | 'explanation'
    | 'quizComplete'
    | 'score'
    | 'home'
    | 'tryAgain'
    | 'review'
    | 'loading'
    | 'language'
    | 'confirmReset'
    | 'confirmResetMessage'
    | 'cancel'
    | 'reset'
    // New Keys
    | 'officialCDLPreparation'
    | 'yourProgress'
    | 'selectTopicDropdown'
    | 'myProfile'
    | 'editProfile'
    | 'createProfile'
    | 'chooseAvatar'
    | 'selectClass'
    | 'username'
    | 'displayName'
    | 'saveChanges'
    | 'globalProgress'
    | 'accuracy'
    | 'completed'
    | 'timeSpent'
    | 'exams'
    | 'achievements'
    | 'comingSoon'
    | 'logout'
    | 'logoutTitle'
    | 'logoutMessage'
    | 'usernameRequired'
    | 'enterUsername'
    | 'classADesc'
    | 'classBDesc'
    | 'yourMilestones'
    | 'roadToSuccess'
    | 'milestonesReached'
    | 'of'
    // Achievement Keys
    | 'achievement_first_steps_title' | 'achievement_first_steps_desc'
    | 'achievement_dedicated_learner_title' | 'achievement_dedicated_learner_desc'
    | 'achievement_master_mind_title' | 'achievement_master_mind_desc'
    | 'achievement_exam_ready_title' | 'achievement_exam_ready_desc'
    | 'achievement_time_keeper_title' | 'achievement_time_keeper_desc'
    | 'achievement_streak_master_title' | 'achievement_streak_master_desc'
    | 'achievement_quiz_warrior_title' | 'achievement_quiz_warrior_desc'
    | 'achievement_perfectionist_title' | 'achievement_perfectionist_desc'
    | 'achievement_marathon_runner_title' | 'achievement_marathon_runner_desc'
    | 'achievement_streak_legend_title' | 'achievement_streak_legend_desc'
    // Quiz Result Keys
    | 'keepStudying'
    | 'greatJob'
    | 'outOf'
    | 'correctLowerCase' // "correct" exists but is "Correct!", we need "correct" for "X out of Y correct"
    | 'newAwardsEarned'
    | 'reviewWrong'
    | 'backToHome'
    | 'reviewHeader'
    | 'missed'
    | 'question'
    | 'done'
    | 'noQuestionsFound'
    | 'goBack'
    | 'quit'
    | 'skip'
    // Accessibility
    | 'answer'
    | 'correctHeadsUp'
    | 'incorrectHeadsUp'
    | 'incorrectHeadsUp'
    | 'doubleTapToSelect'
    | 'keyTakeaways'
    | 'checkYourUnderstanding'
    // Terms of Service
    | 'termsTitle'
    | 'termsAcceptanceTitle'
    | 'termsAcceptanceText'
    | 'termsEducationalTitle'
    | 'termsEducationalText'
    | 'termsIPTitle'
    | 'termsIPText'
    | 'termsUserConductTitle'
    | 'termsUserConductText'
    | 'termsDisclaimerTitle'
    | 'termsDisclaimerText'
    | 'termsLiabilityTitle'
    | 'termsLiabilityText'
    | 'termsChangesTitle'
    | 'termsChangesText'
    | 'termsContactTitle'
    | 'termsContactText'
    | 'viewFullTerms'
    | 'lastUpdated'
    // Onboarding
    | 'onboardingWelcomeTitle'
    | 'onboardingWelcomeText'
    | 'onboardingFeaturesTitle'
    | 'onboardingFeaturesText'
    | 'onboardingOfflineTitle'
    | 'onboardingOfflineText'
    | 'onboardingTitle1' | 'onboardingDesc1'
    | 'onboardingTitle2' | 'onboardingDesc2'
    | 'onboardingTitle3' | 'onboardingDesc3'
    | 'getStarted'
    | 'chooseLanguage'
    | 'startEngine'
    | 'viewAllAwards'
    // Paywall Keys
    | 'unlockCDLZeroPro'
    | 'freeTrialEnded'
    | 'whatYouGet'
    | 'unlimitedPractice'
    | 'allStudyGuides'
    | 'allExamModes'
    | 'allLanguages'
    | 'bestValue'
    | 'yearly'
    | 'monthly'
    | 'lifetime'
    | 'save'
    | 'oneTimePayment'
    | 'restorePurchases'
    | 'subscriptionTerms'
    | 'trialQuestionsRemaining'
    | 'upgradeToContinue'
    | 'noThanks'
    | 'maybeLater'
    | 'errorLoadingProducts'
    | 'productNotFound'
    | 'mo'
    | 'yr';

export const translations: Record<Locale, Record<TranslationKey, string>> = {
    en: {
        appTitle: 'STUDY CENTER',
        appSubtitle: 'Prepare. Practice. Pass.',
        topics: 'Topics',
        awards: 'Awards',
        profile: 'Profile',
        settings: 'Settings',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        resetProgress: 'Reset Progress',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        selectTopic: 'SELECT TOPIC:',
        studyGuide: 'Study Guide',
        newHereTip: 'New here? Try Practice first to learn as you go.',
        practice: 'Practice',
        exam: 'Exam',
        questions: 'Questions',
        averageScore: 'Avg Score',
        studyTime: 'Study Time',
        close: 'Close',
        back: 'Back',
        next: 'Next',
        submit: 'Submit',
        finish: 'Finish',
        correct: 'Correct!',
        incorrect: 'Incorrect',
        explanation: 'Explanation',
        quizComplete: 'Quiz Complete!',
        score: 'Your Score',
        home: 'Home',
        tryAgain: 'Try Again',
        review: 'Review',
        loading: 'Loading...',
        language: 'Language',
        confirmReset: 'Reset All Progress',
        confirmResetMessage: 'Are you sure you want to reset all your progress? Achievements will not be cleared.',
        cancel: 'Cancel',
        reset: 'Reset',
        // New Keys
        officialCDLPreparation: 'OFFICIAL CDL PREPARATION',
        yourProgress: 'Your Progress',
        selectTopicDropdown: 'Select a Topic',
        myProfile: 'My Profile',
        editProfile: 'Edit Profile',
        createProfile: 'Create Profile',
        chooseAvatar: 'Choose Avatar',
        selectClass: 'Select CDL Class',
        username: 'Username',
        displayName: 'Display Name',
        saveChanges: 'Save Changes',
        globalProgress: 'Global Progress',
        accuracy: 'Accuracy',
        completed: 'Completed',
        timeSpent: 'Time Spent',
        exams: 'Exams',
        achievements: 'Achievements',
        comingSoon: 'Coming soon',
        logout: 'Log Out',
        logoutTitle: 'Logout',
        logoutMessage: 'Log out and clear all local data on this device?',
        usernameRequired: 'Username Required',
        enterUsername: 'Please enter a username.',
        classADesc: 'Combination vehicles (truck + trailer).',
        classBDesc: 'Single heavy vehicles (straight trucks, buses).',
        yourMilestones: 'YOUR MILESTONES',
        roadToSuccess: 'ROAD TO SUCCESS',
        milestonesReached: 'MILESTONES REACHED',
        of: 'OF',
        // Achievement Translations
        achievement_first_steps_title: 'First Steps',
        achievement_first_steps_desc: 'Answer 10 questions',
        achievement_dedicated_learner_title: 'Dedicated Learner',
        achievement_dedicated_learner_desc: 'Answer 100 questions',
        achievement_master_mind_title: 'Master Mind',
        achievement_master_mind_desc: 'Achieve 90% average (min 50 questions)',
        achievement_exam_ready_title: 'Exam Ready',
        achievement_exam_ready_desc: 'Complete 3 mock exams',
        achievement_time_keeper_title: 'Time Keeper',
        achievement_time_keeper_desc: 'Study for 1 hour total',
        achievement_streak_master_title: 'Streak Master',
        achievement_streak_master_desc: 'Maintain a 3-day study streak',
        achievement_quiz_warrior_title: 'Quiz Warrior',
        achievement_quiz_warrior_desc: 'Answer 500 questions',
        achievement_perfectionist_title: 'Perfectionist',
        achievement_perfectionist_desc: 'Achieve 95% average (min 100 questions)',
        achievement_marathon_runner_title: 'Marathon Runner',
        achievement_marathon_runner_desc: 'Study for 5 hours total',
        achievement_streak_legend_title: 'Streak Legend',
        achievement_streak_legend_desc: 'Maintain a 7-day study streak',
        // Quiz Result Translations
        keepStudying: 'Keep Studying!',
        greatJob: 'Great Job!',
        outOf: 'out of',
        correctLowerCase: 'correct',
        newAwardsEarned: 'New Awards Earned!',
        reviewWrong: 'Review Wrong',
        backToHome: 'Back to Home',
        reviewHeader: 'Review',
        missed: 'missed',
        question: 'Question',
        done: 'Done',
        noQuestionsFound: 'No questions found.',
        goBack: 'Go Back',
        quit: 'Quit',
        skip: 'Skip',
        // Accessibility
        answer: 'Answer',
        correctHeadsUp: 'Correct answer',
        incorrectHeadsUp: 'Incorrect answer',
        doubleTapToSelect: 'Double tap to select this answer',
        keyTakeaways: 'Key Takeaways',
        checkYourUnderstanding: 'Check Your Understanding',
        // Terms of Service
        termsTitle: 'Terms of Service',
        termsAcceptanceTitle: '1. Acceptance of Terms',
        termsAcceptanceText: 'By downloading, installing, or using CDL Zero: Permit Practice ("the App"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App.',
        termsEducationalTitle: '2. Educational Purpose Only',
        termsEducationalText: 'The App is designed as a supplementary study tool for CDL permit exam preparation. The content is based on publicly available CDL handbooks but is NOT an official DMV product. We do not guarantee that using this App will result in passing your CDL exam. Always consult your state\'s official DMV handbook for the most accurate and up-to-date information.',
        termsIPTitle: '3. Intellectual Property',
        termsIPText: 'All content within the App, including but not limited to text, graphics, logos, icons, and software, is the property of CDL Zero and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without express written permission.',
        termsUserConductTitle: '4. User Conduct',
        termsUserConductText: 'You agree to use the App only for lawful purposes. You may not attempt to reverse engineer, decompile, or extract source code from the App. You may not use the App in any way that could damage, disable, or impair the App\'s functionality.',
        termsDisclaimerTitle: '5. Disclaimer of Warranties',
        termsDisclaimerText: 'THE APP IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE APP WILL BE ERROR-FREE, UNINTERRUPTED, OR FREE OF HARMFUL COMPONENTS. YOUR USE OF THE APP IS AT YOUR OWN RISK.',
        termsLiabilityTitle: '6. Limitation of Liability',
        termsLiabilityText: 'TO THE FULLEST EXTENT PERMITTED BY LAW, CDL ZERO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE APP, INCLUDING BUT NOT LIMITED TO FAILURE TO PASS A CDL EXAM.',
        termsChangesTitle: '7. Changes to Terms',
        termsChangesText: 'We reserve the right to modify these Terms at any time. Continued use of the App after changes constitutes acceptance of the new Terms. We encourage you to review these Terms periodically.',
        termsContactTitle: '8. Contact Information',
        termsContactText: 'If you have questions about these Terms of Service, please contact us through the App Store listing or visit our website.',
        viewFullTerms: 'View Full Terms Online',
        lastUpdated: 'Last updated: December 2025',
        // Onboarding
        onboardingWelcomeTitle: 'Master Your CDL',
        onboardingWelcomeText: 'Get ready to ace your Commercial Driver\'s License exam with our comprehensive practice tools.',
        onboardingFeaturesTitle: 'Practice & Simulate',
        onboardingFeaturesText: 'Build confidence with topic-specific quizzes and realistic exam simulations.',
        onboardingOfflineTitle: 'Study Anywhere',
        onboardingOfflineText: 'No internet? No problem. All content and progress tracking works completely offline.',
        onboardingTitle1: 'Welcome to CDL Zero',
        onboardingDesc1: 'Your journey to getting your Commercial Driver\'s License starts here. Master the permit test with ease.',
        onboardingTitle2: 'Learn & Practice',
        onboardingDesc2: 'Access official study materials and practice with realistic exam simulations in multiple languages.',
        onboardingTitle3: 'Track Progress',
        onboardingDesc3: 'Monitor your improvement and know exactly when you are ready to pass the real exam.',
        getStarted: 'Get Started',
        chooseLanguage: 'Choose Language',
        startEngine: 'Start Engine',
        viewAllAwards: 'View All Awards',
        // Paywall
        unlockCDLZeroPro: 'Unlock CDL Zero Pro',
        freeTrialEnded: 'You\'ve answered {count} free questions',
        whatYouGet: 'What You Get',
        unlimitedPractice: 'Unlimited practice questions',
        allStudyGuides: 'All study guides & materials',
        allExamModes: 'All exam simulation modes',
        allLanguages: 'All language options',
        bestValue: 'Best Value',
        yearly: 'Yearly',
        monthly: 'Monthly',
        lifetime: 'Lifetime',
        mo: 'mo',
        save: 'Save',
        oneTimePayment: 'One-time payment',
        restorePurchases: 'Restore Purchases',
        subscriptionTerms: 'Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period.',
        trialQuestionsRemaining: '{count} free questions remaining',
        upgradeToContinue: 'Upgrade to Continue',
        noThanks: "No Thanks, maybe later",
        maybeLater: "Maybe Later",
        yr: "yr",
        errorLoadingProducts: 'Unable to load products. Please check your configuration.',
        productNotFound: 'Product not found. Please try again later.',
    },
    es: {
        appTitle: 'CENTRO DE ESTUDIO',
        appSubtitle: 'Preparar. Practicar. Aprobar.',
        topics: 'Temas',
        awards: 'Premios',
        profile: 'Perfil',
        settings: 'Ajustes',
        darkMode: 'Modo Oscuro',
        lightMode: 'Modo Claro',
        resetProgress: 'Reiniciar Progreso',
        privacyPolicy: 'Política de Privacidad',
        termsOfService: 'Términos de Servicio',
        selectTopic: 'SELECCIONAR TEMA:',
        studyGuide: 'Guía de Estudio',
        newHereTip: '¿Nuevo aquí? Prueba la Práctica para aprender.',
        practice: 'Práctica',
        exam: 'Examen',
        questions: 'Preguntas',
        averageScore: 'Promedio',
        studyTime: 'Tiempo',
        close: 'Cerrar',
        back: 'Atrás',
        next: 'Siguiente',
        submit: 'Enviar',
        finish: 'Terminar',
        correct: '¡Correcto!',
        incorrect: 'Incorrecto',
        explanation: 'Explicación',
        quizComplete: '¡Prueba Completada!',
        score: 'Tu Puntuación',
        home: 'Inicio',
        tryAgain: 'Intentar de Nuevo',
        review: 'Revisar',
        loading: 'Cargando...',
        language: 'Idioma',
        confirmReset: 'Reiniciar Todo',
        confirmResetMessage: '¿Estás seguro de que quieres reiniciar todo tu progreso? Los logros no se borrarán.',
        cancel: 'Cancelar',
        reset: 'Reiniciar',
        // New Keys
        officialCDLPreparation: 'PREPARACIÓN OFICIAL CDL',
        yourProgress: 'Tu Progreso',
        selectTopicDropdown: 'Seleccionar un Tema',
        myProfile: 'Mi Perfil',
        editProfile: 'Editar Perfil',
        createProfile: 'Crear Perfil',
        chooseAvatar: 'Elegir Avatar',
        selectClass: 'Clase CDL',
        username: 'Usuario',
        displayName: 'Nombre para mostrar',
        saveChanges: 'Guardar Cambios',
        globalProgress: 'Progreso Global',
        accuracy: 'Precisión',
        completed: 'Completado',
        timeSpent: 'Tiempo Dedicado',
        exams: 'Exámenes',
        achievements: 'Logros',
        comingSoon: 'Próximamente',
        logout: 'Cerrar Sesión',
        logoutTitle: 'Cerrar Sesión',
        logoutMessage: '¿Cerrar sesión y borrar datos locales?',
        usernameRequired: 'Usuario Requerido',
        enterUsername: 'Por favor ingrese un usuario.',
        classADesc: 'Vehículos combinados (camión + remolque).',
        classBDesc: 'Vehículos pesados simples (rectos/autobús).',
        yourMilestones: 'TUS HITOS',
        roadToSuccess: 'CAMINO AL ÉXITO',
        milestonesReached: 'HITOS ALCANZADOS',
        of: 'DE',
        // Achievement Translations
        achievement_first_steps_title: 'Primeros Pasos',
        achievement_first_steps_desc: 'Responde 10 preguntas',
        achievement_dedicated_learner_title: 'Aprendiz Dedicado',
        achievement_dedicated_learner_desc: 'Responde 100 preguntas',
        achievement_master_mind_title: 'Mente Maestra',
        achievement_master_mind_desc: 'Logra un promedio del 90% (mín 50 preguntas)',
        achievement_exam_ready_title: 'Listo para Examen',
        achievement_exam_ready_desc: 'Completa 3 exámenes de prueba',
        achievement_time_keeper_title: 'Guardián del Tiempo',
        achievement_time_keeper_desc: 'Estudia por 1 hora en total',
        achievement_streak_master_title: 'Maestro de la Racha',
        achievement_streak_master_desc: 'Mantén una racha de estudio de 3 días',
        achievement_quiz_warrior_title: 'Guerrero del Quiz',
        achievement_quiz_warrior_desc: 'Responde 500 preguntas',
        achievement_perfectionist_title: 'Perfeccionista',
        achievement_perfectionist_desc: 'Logra un promedio del 95% (mín 100 preguntas)',
        achievement_marathon_runner_title: 'Corredor de Maratón',
        achievement_marathon_runner_desc: 'Estudia por 5 horas en total',
        achievement_streak_legend_title: 'Leyenda de la Racha',
        achievement_streak_legend_desc: 'Mantén una racha de estudio de 7 días',
        // Quiz Result Translations
        keepStudying: '¡Sigue Estudiando!',
        greatJob: '¡Gran Trabajo!',
        outOf: 'de',
        correctLowerCase: 'correctas',
        newAwardsEarned: '¡Nuevos Premios Ganados!',
        reviewWrong: 'Revisar Incorrectas',
        backToHome: 'Volver al Inicio',
        reviewHeader: 'Revisar',
        missed: 'falladas',
        question: 'Pregunta',
        done: 'Listo',
        noQuestionsFound: 'No se encontraron preguntas.',
        goBack: 'Volver',
        quit: 'Salir',
        skip: 'Saltar',
        // Accessibility
        answer: 'Respuesta',
        correctHeadsUp: 'Respuesta correcta',
        incorrectHeadsUp: 'Respuesta incorrecta',
        doubleTapToSelect: 'Toca dos veces para seleccionar esta respuesta',
        keyTakeaways: 'Puntos Clave',
        checkYourUnderstanding: 'Comprueba tu Comprensión',
        // Terms of Service
        termsTitle: 'Términos de Servicio',
        termsAcceptanceTitle: '1. Aceptación de Términos',
        termsAcceptanceText: 'Al descargar, instalar o usar CDL Zero: Permit Practice ("la App"), usted acepta estos Términos de Servicio. Si no está de acuerdo con estos términos, por favor no use la App.',
        termsEducationalTitle: '2. Solo con Fines Educativos',
        termsEducationalText: 'La App está diseñada como herramienta de estudio complementaria para la preparación del examen de permiso CDL. El contenido se basa en manuales CDL disponibles públicamente, pero NO es un producto oficial del DMV. No garantizamos que el uso de esta App resultará en aprobar su examen CDL. Siempre consulte el manual oficial del DMV de su estado.',
        termsIPTitle: '3. Propiedad Intelectual',
        termsIPText: 'Todo el contenido de la App, incluyendo texto, gráficos, logos, iconos y software, es propiedad de CDL Zero y está protegido por leyes de derechos de autor y propiedad intelectual. No puede reproducir, distribuir o crear obras derivadas sin permiso escrito expreso.',
        termsUserConductTitle: '4. Conducta del Usuario',
        termsUserConductText: 'Usted acepta usar la App solo para fines legales. No puede intentar realizar ingeniería inversa, descompilar o extraer el código fuente de la App. No puede usar la App de ninguna manera que pueda dañar, deshabilitar o perjudicar su funcionalidad.',
        termsDisclaimerTitle: '5. Descargo de Garantías',
        termsDisclaimerText: 'LA APP SE PROPORCIONA "TAL CUAL" SIN GARANTÍAS DE NINGÚN TIPO, EXPRESAS O IMPLÍCITAS. NO GARANTIZAMOS QUE LA APP ESTARÁ LIBRE DE ERRORES, ININTERRUMPIDA O LIBRE DE COMPONENTES DAÑINOS. EL USO DE LA APP ES BAJO SU PROPIO RIESGO.',
        termsLiabilityTitle: '6. Limitación de Responsabilidad',
        termsLiabilityText: 'EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, CDL ZERO NO SERÁ RESPONSABLE POR DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES, CONSECUENTES O PUNITIVOS DERIVADOS DEL USO DE LA APP, INCLUYENDO LA FALTA DE APROBACIÓN DE UN EXAMEN CDL.',
        termsChangesTitle: '7. Cambios en los Términos',
        termsChangesText: 'Nos reservamos el derecho de modificar estos Términos en cualquier momento. El uso continuado de la App después de los cambios constituye aceptación de los nuevos Términos. Le recomendamos revisar estos Términos periódicamente.',
        termsContactTitle: '8. Información de Contacto',
        termsContactText: 'Si tiene preguntas sobre estos Términos de Servicio, contáctenos a través del listado de la App Store o visite nuestro sitio web.',
        viewFullTerms: 'Ver Términos Completos en Línea',
        lastUpdated: 'Última actualización: Diciembre 2025',
        // Onboarding
        onboardingWelcomeTitle: 'Domina tu CDL',
        onboardingWelcomeText: 'Prepárate para aprobar tu examen de licencia comercial con nuestras herramientas completas.',
        onboardingFeaturesTitle: 'Practica y Simula',
        onboardingFeaturesText: 'Gana confianza con cuestionarios por tema y simulaciones de examen realistas.',
        onboardingOfflineTitle: 'Estudia Donde Sea',
        onboardingOfflineText: '¿Sin internet? Sin problema. Todo el contenido y progreso funciona sin conexión.',
        onboardingTitle1: 'Bienvenido a CDL Zero',
        onboardingDesc1: 'Tu viaje para obtener tu Licencia Comercial comienza aquí. Domina el examen con facilidad.',
        onboardingTitle2: 'Aprende y Practica',
        onboardingDesc2: 'Accede a materiales de estudio oficiales y practica con simulaciones de examen realistas.',
        onboardingTitle3: 'Sigue tu Progreso',
        onboardingDesc3: 'Monitorea tu mejora y sabe exactamente cuándo estás listo para aprobar el examen real.',
        getStarted: 'Empezar',
        chooseLanguage: 'Elegir Idioma',
        startEngine: 'Arrancar Motor',
        viewAllAwards: 'Ver Todos los Premios',
        // Paywall
        unlockCDLZeroPro: 'Desbloquear CDL Zero Pro',
        freeTrialEnded: 'Has respondido {count} preguntas gratis',
        whatYouGet: 'Lo Que Obtienes',
        unlimitedPractice: 'Preguntas de práctica ilimitadas',
        allStudyGuides: 'Todas las guías de estudio',
        allExamModes: 'Todos los modos de examen',
        allLanguages: 'Todos los idiomas',
        bestValue: 'Mejor Valor',
        yearly: 'Anual',
        monthly: 'Mensual',
        lifetime: 'De por vida',
        mo: 'mes',
        save: 'Ahorra',
        oneTimePayment: 'Pago único',
        restorePurchases: 'Restaurar Compras',
        subscriptionTerms: 'La suscripción se renueva automáticamente a menos que se desactive la renovación automática al menos 24 horas antes del final del periodo actual.',
        trialQuestionsRemaining: 'Quedan {count} preguntas gratuitas',
        upgradeToContinue: 'Actualizar para Continuar',
        noThanks: "No gracias, quizás después",
        maybeLater: "Quizás Después",
        yr: "año",
        errorLoadingProducts: 'No se pudieron cargar los productos. Por favor verifique su configuración.',
        productNotFound: 'Producto no encontrado. Por favor intente más tarde.',
    },
    ru: {
        appTitle: 'УЧЕБНЫЙ ЦЕНТР',
        appSubtitle: 'Подготовка. Практика. Сдача.',
        topics: 'Темы',
        awards: 'Награды',
        profile: 'Профиль',
        settings: 'Настройки',
        darkMode: 'Тёмная тема',
        lightMode: 'Светлая тема',
        resetProgress: 'Сброс прогресса',
        privacyPolicy: 'Конфиденциальность',
        termsOfService: 'Условия использования',
        selectTopic: 'ВЫБЕРИТЕ ТЕМУ:',
        studyGuide: 'Учебник',
        newHereTip: 'Новичок? Попробуйте Практику, чтобы учиться на ходу.',
        practice: 'Практика',
        exam: 'Экзамен',
        questions: 'Вопросы',
        averageScore: 'Ср. балл',
        studyTime: 'Время',
        close: 'Закрыть',
        back: 'Назад',
        next: 'Далее',
        submit: 'Отправить',
        finish: 'Завершить',
        correct: 'Правильно!',
        incorrect: 'Неверно',
        explanation: 'Пояснение',
        quizComplete: 'Тест завершен!',
        score: 'Ваш результат',
        home: 'Главная',
        tryAgain: 'Повторить',
        review: 'Обзор',
        loading: 'Загрузка...',
        language: 'Язык',
        confirmReset: 'Сбросить все',
        confirmResetMessage: 'Вы уверены, что хотите сбросить весь прогресс? Достижения не будут удалены.',
        cancel: 'Отмена',
        reset: 'Сброс',
        // New Keys
        officialCDLPreparation: 'ОФИЦИАЛЬНАЯ ПОДГОТОВКА',
        yourProgress: 'Ваш прогресс',
        selectTopicDropdown: 'Выберите тему',
        myProfile: 'Мой профиль',
        editProfile: 'Ред. профиль',
        createProfile: 'Создать профиль',
        chooseAvatar: 'Выбрать аватар',
        selectClass: 'Класс CDL',
        username: 'Имя пользователя',
        displayName: 'Отображаемое имя',
        saveChanges: 'Сохранить',
        globalProgress: 'Общий прогресс',
        accuracy: 'Точность',
        completed: 'Завершено',
        timeSpent: 'Время в учебе',
        exams: 'Экзамены',
        achievements: 'Достижения',
        comingSoon: 'Скоро',
        logout: 'Выйти',
        logoutTitle: 'Выход',
        logoutMessage: 'Выйти и очистить локальные данные?',
        usernameRequired: 'Нужно имя',
        enterUsername: 'Введите имя пользователя.',
        classADesc: 'Комбинированные ТС (тягач + прицеп).',
        classBDesc: 'Одиночные тяжелые ТС (грузовик/автобус).',
        yourMilestones: 'ВАШИ ЭТАПЫ',
        roadToSuccess: 'ПУТЬ К УСПЕХУ',
        milestonesReached: 'ДОСТИГНУТО',
        of: 'ИЗ',
        // Achievement Translations
        achievement_first_steps_title: 'Первые шаги',
        achievement_first_steps_desc: 'Ответьте на 10 вопросов',
        achievement_dedicated_learner_title: 'Прилежный ученик',
        achievement_dedicated_learner_desc: 'Ответьте на 100 вопросов',
        achievement_master_mind_title: 'Высший разум',
        achievement_master_mind_desc: 'Ср. балл 90% (мин. 50 вопросов)',
        achievement_exam_ready_title: 'Готов к экзамену',
        achievement_exam_ready_desc: 'Сдайте 3 пробных экзамена',
        achievement_time_keeper_title: 'Хранитель времени',
        achievement_time_keeper_desc: 'Учитесь 1 час в общей сложности',
        achievement_streak_master_title: 'Мастер серии',
        achievement_streak_master_desc: 'Поддерживайте серию занятий 3 дня',
        achievement_quiz_warrior_title: 'Воин викторины',
        achievement_quiz_warrior_desc: 'Ответьте на 500 вопросов',
        achievement_perfectionist_title: 'Перфекционист',
        achievement_perfectionist_desc: 'Ср. балл 95% (мин. 100 вопросов)',
        achievement_marathon_runner_title: 'Марафонец',
        achievement_marathon_runner_desc: 'Учитесь 5 часов в общей сложности',
        achievement_streak_legend_title: 'Легенда серии',
        achievement_streak_legend_desc: 'Поддерживайте серию занятий 7 дней',
        // Quiz Result Translations
        keepStudying: 'Продолжайте учиться!',
        greatJob: 'Отличная работа!',
        outOf: 'из',
        correctLowerCase: 'правильных',
        newAwardsEarned: 'Новые награды!',
        reviewWrong: 'Обзор ошибок',
        backToHome: 'На главную',
        reviewHeader: 'Обзор',
        missed: 'пропущено',
        question: 'Вопрос',
        done: 'Готово',
        noQuestionsFound: 'Вопросы не найдены.',
        goBack: 'Назад',
        quit: 'Выйти',
        skip: 'Пропустить',
        // Accessibility
        answer: 'Ответ',
        correctHeadsUp: 'Правильный ответ',
        incorrectHeadsUp: 'Неправильный ответ',
        doubleTapToSelect: 'Дважды коснитесь, чтобы выбрать этот ответ',
        keyTakeaways: 'Ключевые моменты',
        checkYourUnderstanding: 'Проверьте свои знания',
        // Terms of Service
        termsTitle: 'Условия использования',
        termsAcceptanceTitle: '1. Принятие условий',
        termsAcceptanceText: 'Загружая, устанавливая или используя CDL Zero: Permit Practice ("Приложение"), вы соглашаетесь с этими Условиями использования. Если вы не согласны, пожалуйста, не используйте Приложение.',
        termsEducationalTitle: '2. Только для обучения',
        termsEducationalText: 'Приложение разработано как дополнительный инструмент для подготовки к экзамену CDL. Содержимое основано на общедоступных справочниках CDL, но НЕ является официальным продуктом DMV. Мы не гарантируем, что использование этого Приложения приведет к сдаче экзамена CDL. Всегда обращайтесь к официальному справочнику DMV вашего штата.',
        termsIPTitle: '3. Интеллектуальная собственность',
        termsIPText: 'Весь контент Приложения, включая текст, графику, логотипы, значки и программное обеспечение, является собственностью CDL Zero и защищен законами об авторском праве. Вы не можете воспроизводить, распространять или создавать производные работы без письменного разрешения.',
        termsUserConductTitle: '4. Поведение пользователя',
        termsUserConductText: 'Вы соглашаетесь использовать Приложение только в законных целях. Вы не можете пытаться выполнить обратную разработку, декомпилировать или извлекать исходный код Приложения. Вы не можете использовать Приложение способом, который может повредить, отключить или нарушить функциональность Приложения.',
        termsDisclaimerTitle: '5. Отказ от гарантий',
        termsDisclaimerText: 'ПРИЛОЖЕНИЕ ПРЕДОСТАВЛЯЕТСЯ "КАК ЕСТЬ" БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ. МЫ НЕ ГАРАНТИРУЕМ, ЧТО ПРИЛОЖЕНИЕ БУДЕТ РАБОТАТЬ БЕЗ ОШИБОК, БЕСПЕРЕБОЙНО ИЛИ БЕЗ ВРЕДОНОСНЫХ КОМПОНЕНТОВ. ИСПОЛЬЗОВАНИЕ ПРИЛОЖЕНИЯ НА ВАШ СОБСТВЕННЫЙ РИСК.',
        termsLiabilityTitle: '6. Ограничение ответственности',
        termsLiabilityText: 'В МАКСИМАЛЬНОЙ СТЕПЕНИ, РАЗРЕШЕННОЙ ЗАКОНОМ, CDL ZERO НЕ НЕСЕТ ОТВЕТСТВЕННОСТИ ЗА ЛЮБЫЕ КОСВЕННЫЕ, СЛУЧАЙНЫЕ, СПЕЦИАЛЬНЫЕ, ПОСЛЕДУЮЩИЕ ИЛИ ШТРАФНЫЕ УБЫТКИ, ВОЗНИКАЮЩИЕ В РЕЗУЛЬТАТЕ ИСПОЛЬЗОВАНИЯ ВАМИ ПРИЛОЖЕНИЯ, ВКЛЮЧАЯ, ПОМИМО ПРОЧЕГО, НЕСДАЧУ ЭКЗАМЕНА CDL.',
        termsChangesTitle: '7. Изменение условий',
        termsChangesText: 'Мы оставляем за собой право изменять эти Условия в любое время. Продолжение использования Приложения после изменений означает принятие новых Условий. Рекомендуем периодически проверять эти Условия.',
        termsContactTitle: '8. Контактная информация',
        termsContactText: 'Если у вас есть вопросы об этих Условиях использования, свяжитесь с нами через список App Store или посетите наш веб-сайт.',
        viewFullTerms: 'Посмотреть полные Условия онлайн',
        lastUpdated: 'Последнее обновление: Декабрь 2025',
        // Onboarding
        onboardingWelcomeTitle: 'Сдайте на CDL',
        onboardingWelcomeText: 'Готовьтесь к экзамену на коммерческие права с нашими инструментами.',
        onboardingFeaturesTitle: 'Практика и тесты',
        onboardingFeaturesText: 'Укрепляйте уверенность с помощью тематических тестов и симуляторов экзамена.',
        onboardingOfflineTitle: 'Учитесь везде',
        onboardingOfflineText: 'Нет интернета? Не проблема. Весь контент и прогресс работают офлайн.',
        onboardingTitle1: 'Добро пожаловать в CDL Zero',
        onboardingDesc1: 'Ваш путь к получению прав CDL начинается здесь. Сдайте экзамен с легкостью.',
        onboardingTitle2: 'Учитесь и практикуйтесь',
        onboardingDesc2: 'Доступ к официальным материалам и реалистичным симуляторам экзамена на разных языках.',
        onboardingTitle3: 'Отслеживайте прогресс',
        onboardingDesc3: 'Следите за улучшениями и знайте точно, когда вы готовы к реальному экзамену.',
        getStarted: 'Начать',
        chooseLanguage: 'Выберите язык',
        startEngine: 'Поехали',
        viewAllAwards: 'Посмотреть все награды',
        // Paywall
        unlockCDLZeroPro: 'Разблокировать CDL Zero Pro',
        freeTrialEnded: 'Вы ответили на {count} бесплатных вопросов',
        whatYouGet: 'Что Вы Получите',
        unlimitedPractice: 'Неограниченные практические вопросы',
        allStudyGuides: 'Все учебные материалы',
        allExamModes: 'Все режимы экзамена',
        allLanguages: 'Все языковые опции',
        bestValue: 'Лучшая Цена',
        yearly: 'Годовая',
        monthly: 'Месячная',
        lifetime: 'Навсегда',
        mo: 'мес',
        save: 'Скидка',
        oneTimePayment: 'Одноразовый платеж',
        restorePurchases: 'Восстановить покупки',
        subscriptionTerms: 'Подписка продлевается автоматически, если автопродление не отключено по крайней мере за 24 часа до окончания текущего периода.',
        trialQuestionsRemaining: 'Осталось {count} бесплатных вопросов',
        upgradeToContinue: 'Обновить для продолжения',
        noThanks: "Нет, спасибо, может быть позже",
        maybeLater: "Может позже",
        yr: "год",
        errorLoadingProducts: 'Не удалось загрузить продукты. Пожалуйста, проверьте конфигурацию.',
        productNotFound: 'Продукт не найден. Пожалуйста, попробуйте позже.',
    }
};
