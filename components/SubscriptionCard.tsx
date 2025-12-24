import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { saveEmailLocally } from '../data/supabase';
import { startEmailSync } from '../utils/emailSync';
import { showAlert } from '../utils/alerts';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SubscriptionCardProps {
    onSuccess?: () => void;
    onClose?: () => void;
    showCloseButton?: boolean;
}

export default function SubscriptionCard({ onSuccess, onClose, showCloseButton = false }: SubscriptionCardProps) {
    const [email, setEmail] = useState('');

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

    return (
        <View style={styles.card}>
            {showCloseButton && (
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <FontAwesome name="times" size={16} color="#999" />
                </TouchableOpacity>
            )}
            <Text style={styles.title}>Stay Updated</Text>
            <Text style={styles.subtitle}>Get notified about new features and study tips.</Text>
            <TextInput
                style={styles.input}
                placeholder="you@email.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
                <Text style={styles.buttonText}>Subscribe</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
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
        color: '#333',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#F5F5F7',
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#1565C0',
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
