/**
 * Auth Layout (Cross-Platform)
 * Layout wrapper for auth routes - works on iOS, Android, and Web
 */
import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="forgot-password" />
        </Stack>
    );
}
