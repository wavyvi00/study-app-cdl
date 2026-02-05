import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GlossaryTerm } from '../data/glossary';

interface GlossaryModalProps {
    visible: boolean;
    onClose: () => void;
    term: GlossaryTerm | null;
}

export default function GlossaryModal({ visible, onClose, term }: GlossaryModalProps) {
    const { colors, typography, spacing, radius, isDark } = useTheme();

    if (!term) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <View style={[styles.modalContainer, {
                            backgroundColor: colors.surface,
                            borderColor: colors.border,
                            borderWidth: 1
                        }]}>
                            {/* Header */}
                            <View style={[styles.header, { borderBottomColor: colors.border }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    <FontAwesome name="book" size={20} color={colors.primary} />
                                    <Text style={[styles.title, { color: colors.text }]}>{term.term}</Text>
                                </View>
                                <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                    <FontAwesome name="times" size={20} color={colors.textSecondary} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView contentContainerStyle={styles.content}>
                                {/* Definition */}
                                <View style={styles.section}>
                                    <Text style={[styles.label, { color: colors.textSecondary }]}>DEFINITION</Text>
                                    <Text style={[styles.text, { color: colors.text }]}>{term.definition}</Text>
                                </View>

                                {/* Translation */}
                                <View style={[styles.section, {
                                    marginTop: 16,
                                    paddingTop: 16,
                                    borderTopWidth: 1,
                                    borderTopColor: colors.border
                                }]}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                        <Text style={{ fontSize: 16 }}>🇪🇸</Text>
                                        <Text style={[styles.label, { color: colors.textSecondary, marginBottom: 0 }]}>SPANISH</Text>
                                    </View>
                                    <Text style={[styles.text, { color: colors.text, fontSize: 20, fontWeight: '600' }]}>
                                        {term.translation}
                                    </Text>
                                </View>

                                {/* Tip for context */}
                                <View style={[styles.tipBox, {
                                    backgroundColor: isDark ? '#1e293b' : '#F8FAFC',
                                    marginTop: 20
                                }]}>
                                    <Text style={[styles.tipText, { color: colors.textSecondary }]}>
                                        Tip: Tap keywords like this whenever you see them to learn the vocabulary for the English-only exam.
                                    </Text>
                                </View>

                            </ScrollView>

                            <View style={[styles.footer, { borderTopColor: colors.border }]}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: colors.primary }]}
                                    onPress={onClose}
                                >
                                    <Text style={styles.buttonText}>Got it</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 400,
        borderRadius: 16,
        maxHeight: '80%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        padding: 24,
    },
    section: {
        marginBottom: 8,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 8,
    },
    text: {
        fontSize: 18,
        lineHeight: 26,
    },
    tipBox: {
        padding: 16,
        borderRadius: 8,
    },
    tipText: {
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
    },
    button: {
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
