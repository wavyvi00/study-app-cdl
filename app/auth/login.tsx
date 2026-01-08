/**
 * Login Page (Web Only)
 * Email + password login for web users
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
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useWebAuth } from '../../context/WebAuthContext';
import { BackgroundShapes } from '../../components/ui/BackgroundShapes';
import { useWindowDimensions } from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const webAuth = useWebAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Redirect to home if already authenticated
    useEffect(() => {
        if (webAuth?.isAuthenticated) {
            router.replace('/tabs');
        }
    }, [webAuth?.isAuthenticated]);

    // Web-only page
    if (Platform.OS !== 'web') {
        return null;
    }

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            setError('Please enter email and password');
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            const result = await webAuth?.signIn(email.trim(), password);
            if (result?.error) {
                setError(result.error);
            } else {
                // Success - redirect to home or paywall
                router.replace('/tabs');
            }
        } catch (err: any) {
            setError(err.message || 'Login failed');
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
                {/* Header */}
                <View style={styles.header}>
                    <FontAwesome name="lock" size={48} color="#38bdf8" />
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to access your purchases</Text>
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

                    <View style={styles.inputContainer}>
                        <FontAwesome name="key" size={18} color="rgba(255,255,255,0.5)" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={!isSubmitting}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeButton}
                        >
                            <FontAwesome
                                name={showPassword ? 'eye-slash' : 'eye'}
                                size={18}
                                color="rgba(255,255,255,0.5)"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, isSubmitting && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Sign In</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() => router.push('/auth/forgot-password')}
                    >
                        <Text style={styles.linkText}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                        <Text style={styles.footerLink}>Create one</Text>
                    </TouchableOpacity>
                </View>

                {/* Back to app */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.replace('/tabs')}
                >
                    <FontAwesome name="arrow-left" size={14} color="rgba(255,255,255,0.6)" />
                    <Text style={styles.backText}>Continue without account</Text>
                </TouchableOpacity>
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
    },
    form: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
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
    eyeButton: {
        padding: 16,
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        gap: 8,
    },
    footerText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
    },
    footerLink: {
        color: '#38bdf8',
        fontSize: 14,
        fontWeight: '600',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        gap: 8,
        padding: 8,
    },
    backText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
    },
});
