import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, Locale, TranslationKey } from '../data/translations';

type LocalizationContextType = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: TranslationKey) => string;
    isLoaded: boolean;
    // Dual Language Mode
    dualLanguageMode: boolean;
    setDualLanguageMode: (enabled: boolean) => void;
    secondaryLanguage: Locale;
    setSecondaryLanguage: (locale: Locale) => void;
};

const LocalizationContext = createContext<LocalizationContextType>({
    locale: 'en',
    setLocale: () => { },
    t: (key) => key,
    isLoaded: false,
    dualLanguageMode: false,
    setDualLanguageMode: () => { },
    secondaryLanguage: 'es',
    setSecondaryLanguage: () => { },
});

export const LOCALE_STORAGE_KEY = 'user_locale';
export const DUAL_LANGUAGE_MODE_KEY = 'user_dual_language_mode';
export const SECONDARY_LANGUAGE_KEY = 'user_secondary_language';

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('en');
    const [dualLanguageMode, setDualLanguageModeState] = useState<boolean>(false);
    const [secondaryLanguage, setSecondaryLanguageState] = useState<Locale>('es');
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

            const savedDualMode = await AsyncStorage.getItem(DUAL_LANGUAGE_MODE_KEY);
            if (savedDualMode !== null) {
                setDualLanguageModeState(savedDualMode === 'true');
            }

            const savedSecondary = await AsyncStorage.getItem(SECONDARY_LANGUAGE_KEY);
            if (savedSecondary && (savedSecondary === 'en' || savedSecondary === 'es' || savedSecondary === 'ru')) {
                setSecondaryLanguageState(savedSecondary as Locale);
            }
        } catch (error) {
            console.error('Failed to load settings', error);
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

    const setDualLanguageMode = async (enabled: boolean) => {
        setDualLanguageModeState(enabled);
        try {
            await AsyncStorage.setItem(DUAL_LANGUAGE_MODE_KEY, String(enabled));
        } catch (error) {
            console.error('Failed to save dual language mode', error);
        }
    };

    const setSecondaryLanguage = async (newLocale: Locale) => {
        setSecondaryLanguageState(newLocale);
        try {
            await AsyncStorage.setItem(SECONDARY_LANGUAGE_KEY, newLocale);
        } catch (error) {
            console.error('Failed to save secondary language', error);
        }
    };

    const t = (key: TranslationKey): string => {
        return translations[locale][key] || key;
    };

    return (
        <LocalizationContext.Provider value={{
            locale,
            setLocale,
            t,
            isLoaded,
            dualLanguageMode,
            setDualLanguageMode,
            secondaryLanguage,
            setSecondaryLanguage
        }}>
            {children}
        </LocalizationContext.Provider>
    );
}

export const useLocalization = () => useContext(LocalizationContext);
