/**
 * Forgot Password Page (Web Only)
 * Password reset request for web users
 */
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useWebAuth } from '../../context/WebAuthContext';
import { BackgroundShapes } from '../../components/ui/BackgroundShapes';
import { useWindowDimensions } from 'react-native';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const webAuth = useWebAuth();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Web-only page
    if (Platform.OS !== 'web') {
        return null;
    }

    const handleResetPassword = async () => {
        if (!email.trim()) {
            setError('Please enter your email');
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            const result = await webAuth?.resetPassword(email.trim());
            if (result?.error) {
                setError(result.error);
            } else {
                setSuccess(true);
            }
        } catch (err: any) {
            setError(err.message || 'Password reset failed');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                behavior="padding"
                style={[styles.content, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 }]}
            >
                {/* Back button */}
                <TouchableOpacity
                    style={styles.backArrow}
                    onPress={() => router.back()}
                >
                    <FontAwesome name="arrow-left" size={20} color="rgba(255,255,255,0.7)" />
                </TouchableOpacity>

                {/* Header */}
                <View style={styles.header}>
                    <FontAwesome name="unlock-alt" size={48} color="#38bdf8" />
                    <Text style={styles.title}>Reset Password</Text>
                    <Text style={styles.subtitle}>
                        Enter your email and we'll send you a link to reset your password
                    </Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {success ? (
                        <View style={styles.successContainer}>
                            <FontAwesome name="check-circle" size={48} color="#22c55e" />
                            <Text style={styles.successTitle}>Check your email</Text>
                            <Text style={styles.successText}>
                                We've sent a password reset link to {email}
                            </Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => router.push('/auth/login')}
                            >
                                <Text style={styles.buttonText}>Back to Login</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            {error ? (
                                <View style={styles.errorContainer}>
                                    <FontAwesome name="exclamation-circle" size={16} color="#ef4444" />
                                    <Text style={styles.errorText}>{error}</Text>
                                </View>
                            ) : null}

                            <View style={styles.inputContainer}>
                                <FontAwesome name="envelope" size={18} color="rgba(255,255,255,0.5)" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor="rgba(255,255,255,0.4)"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    editable={!isSubmitting}
                                />
                            </View>

                            <TouchableOpacity
                                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                                onPress={handleResetPassword}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>Send Reset Link</Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.linkButton}
                                onPress={() => router.push('/auth/login')}
                            >
                                <Text style={styles.linkText}>Back to Login</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    backArrow: {
        position: 'absolute',
        top: 60,
        left: 24,
        padding: 8,
        zIndex: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 16,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 8,
        textAlign: 'center',
        maxWidth: 300,
    },
    form: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    successContainer: {
        alignItems: 'center',
        padding: 24,
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 16,
    },
    successText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 8,
        textAlign: 'center',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        gap: 8,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 14,
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    inputIcon: {
        paddingLeft: 16,
    },
    input: {
        flex: 1,
        height: 52,
        paddingHorizontal: 12,
        color: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#38bdf8',
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    linkButton: {
        alignItems: 'center',
        marginTop: 16,
        padding: 8,
    },
    linkText: {
        color: '#38bdf8',
        fontSize: 14,
    },
});
