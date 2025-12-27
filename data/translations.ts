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
    | 'checkYourUnderstanding';

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
        checkYourUnderstanding: 'Check Your Understanding'
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
        checkYourUnderstanding: 'Comprueba tu Comprensión'
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
        checkYourUnderstanding: 'Проверьте свои знания'
    }
};
