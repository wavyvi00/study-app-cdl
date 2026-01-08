/**
 * Auth Layout (Web Only)
 * Simple layout wrapper for auth routes
 */
import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function AuthLayout() {
    // On non-web platforms, render nothing
    if (Platform.OS !== 'web') {
        return null;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="forgot-password" />
        </Stack>
    );
}
