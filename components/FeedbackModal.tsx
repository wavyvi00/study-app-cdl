import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';

interface FeedbackModalProps {
    visible: boolean;
    onClose: () => void;
    questionId: string;
    questionTextShort?: string; // Optional context
}

type Reason = 'wrong_answer' | 'typo' | 'confusing' | 'other';

const REASONS: { id: Reason; label: string; icon: any }[] = [
    { id: 'wrong_answer', label: 'Wrong Answer', icon: 'times-circle' },
    { id: 'typo', label: 'Typo / Grammar', icon: 'pencil' },
    { id: 'confusing', label: 'Confusing', icon: 'question-circle' },
    { id: 'other', label: 'Other', icon: 'comment' },
];

export default function FeedbackModal({ visible, onClose, questionId, questionTextShort }: FeedbackModalProps) {
    const { colors, isDark } = useTheme();
    const [selectedReason, setSelectedReason] = useState<Reason | null>(null);
    const [details, setDetails] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!selectedReason) {
            Alert.alert('Please select a reason');
            return;
        }


        if (selectedReason === 'other' && !details.trim()) {
            Alert.alert('Details Required', 'Please explain the issue.');
            return;
        }

        setIsSubmitting(true);

        try {
            if (!supabase) throw new Error("Supabase client not initialized");

            const { error } = await supabase
                .from('question_reports')
                .insert([{
                    question_id: questionId,
                    reason: selectedReason,
                    details: details,
                }]);

            if (error) throw error;

            Alert.alert('Thanks!', 'Your feedback helps us improve.');
            onClose();
            // Reset state
            setSelectedReason(null);
            setDetails('');

        } catch (error) {
            console.error('Error submitting feedback:', error);
            Alert.alert('Error', 'Could not submit feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.overlay}
            >
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.backdrop} />
                </TouchableWithoutFeedback>

                <View style={[styles.modalContainer, { backgroundColor: colors.surface }]}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.text }]}>Report Issue</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <FontAwesome name="times" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    {questionTextShort && (
                        <Text style={[styles.contextText, { color: colors.textSecondary }]} numberOfLines={2}>
                            Re: "{questionTextShort}"
                        </Text>
                    )}

                    <Text style={[styles.label, { color: colors.text }]}>What's the issue?</Text>

                    <View style={styles.reasonsGrid}>
                        {REASONS.map((r) => (
                            <TouchableOpacity
                                key={r.id}
                                style={[
                                    styles.reasonCard,
                                    { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9' },
                                    selectedReason === r.id && { backgroundColor: isDark ? 'rgba(2, 132, 199, 0.2)' : '#e0f2fe', borderColor: colors.primary }
                                ]}
                                onPress={() => setSelectedReason(r.id)}
                            >
                                <FontAwesome
                                    name={r.icon}
                                    size={24}
                                    color={selectedReason === r.id ? colors.primary : colors.textSecondary}
                                    style={{ marginBottom: 8 }}
                                />
                                <Text style={[
                                    styles.reasonText,
                                    { color: colors.textSecondary },
                                    selectedReason === r.id && { color: colors.primary }
                                ]}>
                                    {r.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={[styles.label, { color: colors.text }]}>
                        Details {selectedReason === 'other' ? '(Required)' : '(Optional)'}
                    </Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', borderColor: colors.border, color: colors.text }]}
                        placeholder="Describe what's wrong..."
                        placeholderTextColor={colors.textSecondary}
                        multiline
                        numberOfLines={3}
                        value={details}
                        onChangeText={setDetails}
                    />

                    <TouchableOpacity
                        style={[styles.submitButton, { backgroundColor: colors.primary }, isSubmitting && styles.disabledButton]}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.submitText}>Submit Report</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end', // Bottom sheet feel
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
        minHeight: 400,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 4,
    },
    contextText: {
        fontSize: 12,
        fontStyle: 'italic',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
    },
    reasonsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    reasonCard: {
        width: '48%', // roughly 2 cols
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    reasonText: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        textAlignVertical: 'top',
        height: 80,
        marginBottom: 24,
    },
    submitButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.7,
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
