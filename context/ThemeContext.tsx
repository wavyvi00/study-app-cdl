import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// RAW PALETTE (Modern Navy)
const PALETTE = {
    navy900: '#1E3A8A',   // Primary Brand (Modern Navy)
    navy800: '#1E40AF',   // Primary Lighter
    navy700: '#1D4ED8',   // Bright Blue Accent
    blue50: '#EFF6FF',   // App Background
    blue100: '#DBEAFE',   // Tint / Highlight
    slate900: '#0F172A',  // Headings
    slate700: '#334155',  // Body Text
    slate500: '#64748B',  // Secondary Text
    white: '#FFFFFF',
    amber400: '#FBBF24',  // Accent / Stars
    emerald500: '#10B981', // Success
    rose500: '#F43F5E',    // Error
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
    display: 48,
};

type ThemeMode = 'light' | 'dark';

interface ThemeColors {
    background: string;
    surface: string;
    surfaceHighlight: string;
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
    background: PALETTE.blue50,
    surface: PALETTE.white,
    surfaceHighlight: PALETTE.blue100,
    text: PALETTE.slate900,
    textSecondary: PALETTE.slate500,
    border: '#BFDBFE', // Blue 200 (Subtle)
    primary: PALETTE.navy900,
    secondary: PALETTE.navy700,
    accent: PALETTE.amber400,
    highlight: PALETTE.blue100,
    success: PALETTE.emerald500,
    error: PALETTE.rose500,
    headerGradient: [PALETTE.navy900, PALETTE.navy800],
};

const DarkColors: ThemeColors = {
    background: '#0B1120', // Very dark slate
    surface: '#1E293B',    // Slate 800
    surfaceHighlight: '#334155',
    text: '#F1F5F9',       // Slate 100
    textSecondary: '#94A3B8', // Slate 400
    border: '#334155',     // Slate 700
    primary: '#60A5FA',    // Blue 400 (Brighter for dark mode)
    secondary: '#DBEAFE',
    accent: PALETTE.amber400,
    highlight: '#1E293B',
    success: '#34D399',    // Emerald 400
    error: '#FB7185',      // Rose 400
    headerGradient: ['#0F172A', '#1E293B'], // Slate 900 -> 800
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
