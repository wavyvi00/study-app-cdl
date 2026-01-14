/**
 * Signup Page (Cross-Platform)
 * Email + password registration for all platforms (iOS, Android, Web)
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
import { useAuth } from '../../context/AuthContext';
import { BackgroundShapes } from '../../components/ui/BackgroundShapes';
import { useWindowDimensions } from 'react-native';
import SEO from '../../components/seo/Head';

export default function SignupScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const auth = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Redirect to home if already authenticated
    useEffect(() => {
        if (auth?.isAuthenticated) {
            router.replace('/tabs');
        }
    }, [auth?.isAuthenticated]);

    const getPasswordStrength = (): { label: string; color: string; width: string } => {
        if (password.length === 0) return { label: '', color: 'transparent', width: '0%' };
        if (password.length < 6) return { label: 'Too short', color: '#ef4444', width: '25%' };
        if (password.length < 8) return { label: 'Weak', color: '#f97316', width: '50%' };
        if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            return { label: 'Good', color: '#eab308', width: '75%' };
        }
        return { label: 'Strong', color: '#22c55e', width: '100%' };
    };

    const passwordStrength = getPasswordStrength();

    const handleSignup = async () => {
        if (!email.trim()) {
            setError('Please enter your email');
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
            const result = await auth?.signUp(email.trim(), password);
            if (result?.error) {
                // Handle common error messages
                if (result.error.includes('already registered') || result.error.includes('already exists')) {
                    setError('An account with this email already exists. Please sign in instead.');
                } else {
                    setError(result.error);
                }
            } else {
                // Success - redirect to home
                router.replace('/setup-profile');
            }
        } catch (err: any) {
            setError(err.message || 'Signup failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <SEO title="Sign Up - CDL Zero" description="Create your free CDL Zero account and start studying today." />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={[
                        styles.content,
                        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }
                    ]}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.iconCircle}>
                            <FontAwesome name="user-plus" size={32} color="#1E3A8A" />
                        </View>
                        <Text style={styles.title} accessibilityRole="header">Create Account</Text>
                        <Text style={styles.subtitle}>Start the journey to your CDL</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {error ? (
                            <View style={styles.errorContainer}>
                                <FontAwesome name="exclamation-circle" size={16} color="#ef4444" />
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
                                returnKeyType="next"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <FontAwesome name="key" size={18} color="#64748B" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password (min 6 chars)"
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

                        <View style={styles.termsContainer}>
                            <Text style={styles.termsText}>
                                By creating an account, you agree to our{' '}
                                <Text
                                    style={styles.termsLink}
                                    onPress={() => router.push('/terms')}
                                >
                                    Terms of Service
                                </Text>
                                {' '}and{' '}
                                <Text
                                    style={styles.termsLink}
                                    onPress={() => router.push('/privacy')}
                                >
                                    Privacy Policy
                                </Text>.
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.button, isSubmitting && styles.buttonDisabled]}
                            onPress={handleSignup}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Sign Up</Text>
                            )}
                        </TouchableOpacity>

                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => router.push('/auth/login')}>
                            <Text style={styles.footerLink}>Log In</Text>
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
        backgroundColor: '#ffffff', // Clean White
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
        marginBottom: 32,
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
    termsContainer: {
        marginBottom: 20,
        paddingHorizontal: 4,
    },
    termsText: {
        color: '#64748B', // Slate 500
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 20,
    },
    termsLink: {
        color: '#1E40AF', // Navy 800
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#1E3A8A', // Navy 900
        height: 54,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        gap: 6,
    },
    footerText: {
        color: '#64748B', // Slate 500
        fontSize: 14,
    },
    footerLink: {
        color: '#1E40AF', // Navy 800
        fontSize: 14,
        fontWeight: '700',
    },
});
