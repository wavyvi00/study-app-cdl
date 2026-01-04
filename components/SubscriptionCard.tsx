import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { saveEmailLocally } from '../data/supabase';
import { startEmailSync } from '../utils/emailSync';
import { showAlert } from '../utils/alerts';
import { useTheme } from '../context/ThemeContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SubscriptionCardProps {
    onSuccess?: () => void;
    onClose?: () => void;
    showCloseButton?: boolean;
}

export default function SubscriptionCard({ onSuccess, onClose, showCloseButton = false }: SubscriptionCardProps) {
    const [email, setEmail] = useState('');
    const { colors, spacing, typography } = useTheme();

    const handleSubscribe = async () => {
        const trimmed = email.trim().toLowerCase();
        if (!trimmed) {
            showAlert("Email Required", "Please enter an email to subscribe.");
            return;
        }
        if (!EMAIL_REGEX.test(trimmed)) {
            showAlert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        try {
            await saveEmailLocally(trimmed);
            setEmail('');
            startEmailSync();
            showAlert("Subscribed", "Thanks! We'll sync your email when you're online.");
            onSuccess?.();
        } catch (error) {
            showAlert("Subscription Failed", "Couldn't save your email. Please try again.");
        }
    };

    // Dynamic styles for theme
    const cardBg = colors.surface;
    const textColor = colors.text;
    const subtextColor = colors.textSecondary;
    const inputBg = colors.background;

    return (
        <View style={[styles.card, { backgroundColor: cardBg, shadowColor: colors.text }]}>
            {showCloseButton && (
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <FontAwesome name="times" size={16} color={subtextColor} />
                </TouchableOpacity>
            )}
            <Text style={[styles.title, { color: textColor }]}>Stay Updated</Text>
            <Text style={[styles.subtitle, { color: subtextColor }]}>Get notified about new features and study tips.</Text>
            <TextInput
                style={[styles.input, { backgroundColor: inputBg, color: textColor, borderColor: colors.border, borderWidth: 1 }]}
                placeholder="you@email.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor={subtextColor}
                returnKeyType="done"
                onSubmitEditing={handleSubscribe}
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSubscribe}>
                <Text style={styles.buttonText}>Subscribe</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 16,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    closeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        padding: 4,
        zIndex: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        marginBottom: 12,
    },
    input: {
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        marginBottom: 10,
    },
    button: {
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
    },
});
