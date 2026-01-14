/**
 * Forgot Password Page (Cross-Platform)
 * Password reset request for all platforms (iOS, Android, Web)
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
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from '../../context/AuthContext';
import { BackgroundShapes } from '../../components/ui/BackgroundShapes';
import { useWindowDimensions } from 'react-native';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const auth = useAuth();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleResetPassword = async () => {
        if (!email.trim()) {
            setError('Please enter your email');
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            const result = await auth?.resetPassword(email.trim());
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
                        <View style={styles.iconCircle}>
                            <FontAwesome name="unlock-alt" size={32} color="#1E3A8A" />
                        </View>
                        <Text style={styles.title} accessibilityRole="header">Reset Password</Text>
                        <Text style={styles.subtitle}>Enter your email to receive reset code</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {message ? (
                            <View style={styles.successContainer}>
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
                            <FontAwesome name="envelope" size={18} color="#64748B" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#94A3B8"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={!isSubmitting}
                                returnKeyType="done"
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, isSubmitting && styles.buttonDisabled]}
                            onPress={handleReset}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Send Reset Code</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <FontAwesome name="arrow-left" size={14} color="#64748B" />
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        padding: 8,
        gap: 8,
    },
    backButtonText: {
        color: '#64748B', // Slate 500
        fontSize: 14,
        fontWeight: '600',
    },
});
