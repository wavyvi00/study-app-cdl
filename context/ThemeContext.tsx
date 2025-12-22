import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// RAW PALETTE
const PALETTE = {
    primaryBlue: '#0000a3',
    blueGrotto: '#0067b3',
    aquamarine: '#40b0df',
    yellowAccent: '#ffd53d',
    success: '#2E7D32',
    error: '#C62828',
    white: '#FFFFFF',
    black: '#000000',
    gray100: '#F5F5F5',
    gray200: '#EEEEEE',
    gray800: '#1A1A1A',
    gray900: '#121212',
};

// THEME CONFIG
export const SPACING = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
};

export const RADIUS = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    round: 9999,
};

export const TYPOGRAPHY = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
};

type ThemeMode = 'light' | 'dark';

interface ThemeColors {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    secondary: string;
    accent: string;
    highlight: string;
    success: string;
    error: string;
    headerGradient: [string, string];
}

interface ThemeContextType {
    theme: ThemeMode;
    isDark: boolean;
    colors: ThemeColors;
    toggleTheme: () => void;
    spacing: typeof SPACING;
    radius: typeof RADIUS;
    typography: typeof TYPOGRAPHY;
}

const LightColors: ThemeColors = {
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#666666',
    border: '#E0E0E0',
    primary: PALETTE.primaryBlue,
    secondary: PALETTE.blueGrotto,
    accent: PALETTE.aquamarine,
    highlight: PALETTE.yellowAccent,
    success: PALETTE.success,
    error: PALETTE.error,
    headerGradient: [PALETTE.primaryBlue, PALETTE.blueGrotto],
};

const DarkColors: ThemeColors = {
    background: '#121212',
    surface: '#1E1E1E',
    text: '#E0E0E0',
    textSecondary: '#AAAAAA',
    border: '#333333',
    primary: PALETTE.aquamarine, // Lighter for visibility on dark
    secondary: PALETTE.blueGrotto,
    accent: PALETTE.primaryBlue,
    highlight: PALETTE.yellowAccent,
    success: '#66BB6A', // Lighter green
    error: '#EF5350', // Lighter red
    headerGradient: ['#0a0a23', '#1a1a3a'], // Deep Midnight Blue
};

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    isDark: false,
    colors: LightColors,
    toggleTheme: () => { },
    spacing: SPACING,
    radius: RADIUS,
    typography: TYPOGRAPHY,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const systemScheme = useColorScheme();
    const [theme, setTheme] = useState<ThemeMode>(systemScheme === 'dark' ? 'dark' : 'light');

    useEffect(() => {
        if (systemScheme) {
            setTheme(systemScheme === 'dark' ? 'dark' : 'light');
        }
    }, [systemScheme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const colors = theme === 'dark' ? DarkColors : LightColors;

    return (
        <ThemeContext.Provider value={{
            theme,
            isDark: theme === 'dark',
            colors,
            toggleTheme,
            spacing: SPACING,
            radius: RADIUS,
            typography: TYPOGRAPHY
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
