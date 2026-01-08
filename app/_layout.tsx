import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { LocalizationProvider } from '../context/LocalizationContext';
import { QuestionsProvider } from '../context/QuestionsContext';
import { SubscriptionProvider } from '../context/SubscriptionContext';
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
                <Stack.Screen name="terms" options={{ headerShown: false }} />
                <Stack.Screen name="onboarding" options={{ headerShown: false, gestureEnabled: false }} />
                <Stack.Screen name="achievements" options={{ headerShown: false }} />
                <Stack.Screen name="paywall" options={{ headerShown: false, presentation: 'modal' }} />
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
            {Platform.OS === 'web' && <Analytics />}
        </View>
    );
}

export default function RootLayout() {
    const [loaded] = useFonts({
        // We can load custom fonts here later
        // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
    useEffect(() => {
        // Delay background sync to not interfere with startup
        const timer = setTimeout(() => {
            try {
                startEmailSync();
            } catch (e) {
                console.error('Email sync init error:', e);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ThemeProvider>
            <LocalizationProvider>
                <QuestionsProvider>
                    <SubscriptionProvider>
                        <AppContent fontsLoaded={loaded} />
                    </SubscriptionProvider>
                </QuestionsProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

