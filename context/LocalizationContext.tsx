import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, Locale, TranslationKey } from '../data/translations';

type LocalizationContextType = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: TranslationKey) => string;
    isLoaded: boolean;
};

const LocalizationContext = createContext<LocalizationContextType>({
    locale: 'en',
    setLocale: () => { },
    t: (key) => key,
    isLoaded: false,
});

export const LOCALE_STORAGE_KEY = 'user_locale';

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('en');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        loadLocale();
    }, []);

    const loadLocale = async () => {
        try {
            const savedLocale = await AsyncStorage.getItem(LOCALE_STORAGE_KEY);
            if (savedLocale && (savedLocale === 'en' || savedLocale === 'es' || savedLocale === 'ru')) {
                setLocaleState(savedLocale as Locale);
            }
        } catch (error) {
            console.error('Failed to load locale', error);
        } finally {
            setIsLoaded(true);
        }
    };

    const setLocale = async (newLocale: Locale) => {
        setLocaleState(newLocale);
        try {
            await AsyncStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
        } catch (error) {
            console.error('Failed to save locale', error);
        }
    };

    const t = (key: TranslationKey): string => {
        return translations[locale][key] || key;
    };

    return (
        <LocalizationContext.Provider value={{ locale, setLocale, t, isLoaded }}>
            {children}
        </LocalizationContext.Provider>
    );
}

export const useLocalization = () => useContext(LocalizationContext);
