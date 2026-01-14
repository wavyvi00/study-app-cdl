/**
 * Reset Password Page - Supabase Callback Handler
 * Handles the password reset link from email
 * User lands here after clicking the reset link
 */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BackgroundShapes } from '../../components/ui/BackgroundShapes';
import { useWindowDimensions } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function ResetPasswordScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isValidSession, setIsValidSession] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check for valid recovery session on mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                // Get current session - Supabase automatically handles the recovery token
                const { data: { session } } = await supabase.auth.getSession();

                if (session) {
                    setIsValidSession(true);
                } else {
                    setError('Invalid or expired reset link. Please request a new one.');
                }
            } catch (err) {
                setError('Failed to verify reset link. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();

        // Listen for password recovery event
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                setIsValidSession(true);
                setIsLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleResetPassword = async () => {
        if (!password.trim()) {
            setError('Please enter a new password');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            const { error: updateError } = await supabase.auth.updateUser({
                password: password,
            });

            if (updateError) {
                setError(updateError.message);
            } else {
                setSuccess(true);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to update password');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['#0a0a23', '#1a1a3a', '#0000a3']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
                <View style={styles.centerContent}>
                    <ActivityIndicator size="large" color="#38bdf8" />
                    <Text style={styles.loadingText}>Verifying reset link...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0a0a23', '#1a1a3a', '#0000a3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />
            <BackgroundShapes width={width} height={height} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={[
                        styles.content,
                        { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 }
                    ]}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <FontAwesome name="lock" size={48} color="#38bdf8" />
                        <Text style={styles.title}>Set New Password</Text>
                        <Text style={styles.subtitle}>
                            Enter your new password below
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {success ? (
                            <View style={styles.successContainer}>
                                <FontAwesome name="check-circle" size={48} color="#22c55e" />
                                <Text style={styles.successTitle}>Password Updated!</Text>
                                <Text style={styles.successText}>
                                    Your password has been successfully reset
                                </Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => router.replace('/auth/login')}
                                >
                                    <Text style={styles.buttonText}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        ) : !isValidSession ? (
                            <View style={styles.errorState}>
                                <FontAwesome name="exclamation-triangle" size={48} color="#ef4444" />
                                <Text style={styles.errorTitle}>Invalid Link</Text>
                                <Text style={styles.errorDescription}>
                                    {error || 'This password reset link is invalid or has expired.'}
                                </Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => router.push('/auth/forgot-password')}
                                >
                                    <FontAwesome name="check-circle" size={16} color="#10B981" />
                                    <Text style={styles.successText}>{message}</Text>
                            </View>
                        ) : null}

                        {error ? (
                            <View style={styles.errorContainer}>
                                <FontAwesome name="exclamation-circle" size={16} color="#EF4444" />
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}

                        <View style={styles.inputContainer}>
                            <FontAwesome name="key" size={18} color="#64748B" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="New Password"
                                placeholderTextColor="#94A3B8"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={!isSubmitting}
                                returnKeyType="done"
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeButton}
                            >
                                <FontAwesome
                                    name={showPassword ? 'eye-slash' : 'eye'}
                                    size={18}
                                    color="#94A3B8"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[styles.button, isSubmitting && styles.buttonDisabled]}
                            onPress={handleUpdate}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Update Password</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.replace('/auth/login')}
                        >
                            <Text style={styles.backButtonText}>Back to Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff', // Clean whites
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: '#DBEAFE', // Blue 100
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0F172A', // Slate 900
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B', // Slate 500
        textAlign: 'center',
    },
    form: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    successContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFDF5', // Emerald 50
        borderWidth: 1,
        borderColor: '#A7F3D0', // Emerald 200
        borderRadius: 12,
        padding: 12,
        marginBottom: 20,
        gap: 8,
    },
    successText: {
        color: '#10B981', // Emerald 500
        fontSize: 14,
        flex: 1,
        fontWeight: '500',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF2F2', // Red 50
        borderWidth: 1,
        borderColor: '#FECACA', // Red 200
        borderRadius: 12,
        padding: 12,
        marginBottom: 20,
        gap: 8,
    },
    errorText: {
        color: '#EF4444', // Red 500
        fontSize: 14,
        flex: 1,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF', // Blue 50
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0', // Slate 200
    },
    inputIcon: {
        paddingLeft: 16,
    },
    input: {
        flex: 1,
        height: 52,
        paddingHorizontal: 12,
        color: '#0F172A', // Slate 900
        fontSize: 16,
    },
    eyeButton: {
        padding: 16,
    },
    button: {
        backgroundColor: '#1E3A8A', // Navy 900
        height: 54,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        shadowColor: "#1E3A8A", // Navy 900
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonDisabled: {
        opacity: 0.7,
        backgroundColor: '#94A3B8',
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
    },
    backButton: {
        alignItems: 'center',
        marginTop: 24,
        padding: 8,
    },
    backButtonText: {
        color: '#64748B', // Slate 500
        fontSize: 14,
        fontWeight: '600',
    },
});
