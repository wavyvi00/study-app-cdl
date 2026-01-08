import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import { useLocalization } from '../context/LocalizationContext';
import { saveEmailLocally } from '../data/supabase';
import { startEmailSync } from '../utils/emailSync';
import { showAlert } from '../utils/alerts';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface EmailOptInModalProps {
    visible: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function EmailOptInModal({ visible, onClose, onSuccess }: EmailOptInModalProps) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { colors, spacing, typography, radius, isDark } = useTheme();
    const { t } = useLocalization();

    const handleSubscribe = async () => {
        const trimmed = email.trim().toLowerCase();
        if (!trimmed) {
            showAlert(t('emailRequired') || 'Email Required', t('enterEmailToSubscribe') || 'Please enter an email to subscribe.');
            return;
        }
        if (!EMAIL_REGEX.test(trimmed)) {
            showAlert(t('invalidEmail') || 'Invalid Email', t('enterValidEmail') || 'Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);
        try {
            await saveEmailLocally(trimmed);
            setEmail('');
            startEmailSync();
            showAlert(t('subscribed') || 'Subscribed!', t('thanksForSubscribing') || "Thanks! We'll keep you updated.");
            onSuccess?.();
            onClose();
        } catch (error) {
            showAlert(t('subscriptionFailed') || 'Subscription Failed', t('couldntSaveEmail') || "Couldn't save your email. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDismiss = () => {
        Keyboard.dismiss();
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={handleDismiss}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.overlay}
            >
                {/* Backdrop */}
                <TouchableWithoutFeedback onPress={handleDismiss}>
                    <View style={styles.backdrop} />
                </TouchableWithoutFeedback>

                {/* Bottom Sheet */}
                <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
                    {/* Handle bar */}
                    <View style={[styles.handleBar, { backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }]} />

                    {/* Icon */}
                    <View style={[styles.iconCircle, { backgroundColor: isDark ? 'rgba(33, 150, 243, 0.15)' : 'rgba(33, 150, 243, 0.1)' }]}>
                        <FontAwesome name="envelope" size={28} color={colors.primary} />
                    </View>

                    {/* Title */}
                    <Text style={[styles.title, { color: colors.text }]}>
                        {t('stayUpdated') || 'Stay Updated'}
                    </Text>

                    {/* Subtitle */}
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        {t('emailOptInSubtitle') || 'Get notified about new features, study tips, and updates.'}
                    </Text>

                    {/* Email Input */}
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : colors.background,
                                color: colors.text,
                                borderColor: colors.border,
                            }
                        ]}
                        placeholder={t('emailPlaceholder') || 'you@email.com'}
                        placeholderTextColor={colors.textSecondary}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        returnKeyType="done"
                        onSubmitEditing={handleSubscribe}
                        autoCorrect={false}
                    />

                    {/* Subscribe Button */}
                    <TouchableOpacity
                        style={[styles.subscribeButton, { backgroundColor: colors.primary, opacity: isSubmitting ? 0.7 : 1 }]}
                        onPress={handleSubscribe}
                        disabled={isSubmitting}
                        accessibilityRole="button"
                        accessibilityLabel={t('subscribe') || 'Subscribe'}
                    >
                        <Text style={styles.subscribeButtonText}>
                            {isSubmitting ? (t('subscribing') || 'Subscribing...') : (t('subscribe') || 'Subscribe')}
                        </Text>
                    </TouchableOpacity>

                    {/* Skip Button */}
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={handleDismiss}
                        accessibilityRole="button"
                        accessibilityLabel={t('notNow') || 'Not now'}
                    >
                        <Text style={[styles.skipButtonText, { color: colors.textSecondary }]}>
                            {t('notNow') || 'Not now'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    sheet: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
        alignItems: 'center',
    },
    handleBar: {
        width: 40,
        height: 4,
        borderRadius: 2,
        marginBottom: 20,
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
        maxWidth: 280,
    },
    input: {
        width: '100%',
        borderRadius: 12,
        borderWidth: 1,
        padding: 14,
        fontSize: 16,
        marginBottom: 16,
    },
    subscribeButton: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    subscribeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    skipButton: {
        paddingVertical: 8,
    },
    skipButtonText: {
        fontSize: 14,
        fontWeight: '500',
    },
});
