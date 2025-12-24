import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { LocalizationProvider } from '../context/LocalizationContext';
import { QuestionsProvider } from '../context/QuestionsContext';
import EntryScreen from '../components/EntryScreen';
import { startEmailSync } from '../utils/emailSync';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootNavigator() {
    const { theme } = useTheme();

    return (
        <NavThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="tabs" options={{ headerShown: false }} />
                <Stack.Screen name="quiz" options={{ headerShown: false }} />
                <Stack.Screen name="privacy" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        </NavThemeProvider>
    );
}

function AppContent({ fontsLoaded }: { fontsLoaded: boolean }) {
    const [isSplashFinished, setIsSplashFinished] = useState(false);

    useEffect(() => {
        if (fontsLoaded) {
            // Hide native splash immediately so our custom one takes over
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{ flex: 1 }}>
            <RootNavigator />
            {!isSplashFinished && (
                <EntryScreen onFinish={() => setIsSplashFinished(true)} />
            )}
        </View>
    );
}

export default function RootLayout() {
    const [loaded] = useFonts({
        // We can load custom fonts here later
        // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
    useEffect(() => {
        startEmailSync();
    }, []);

    return (
        <ThemeProvider>
            <LocalizationProvider>
                <QuestionsProvider>
                    <AppContent fontsLoaded={loaded} />
                </QuestionsProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
}
