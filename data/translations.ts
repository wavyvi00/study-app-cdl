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
    | 'reset';

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
    }
};
