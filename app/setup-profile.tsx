
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import { useLocalization } from '../context/LocalizationContext';
import { updateStats, loadStats } from '../data/stats';
import { useAuth } from '../context/AuthContext';
import { pushStatsToCloud } from '../lib/sync';
import Button from '../components/ui/Button';

export default function SetupProfileScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { colors, typography, isDark } = useTheme();
    const { t } = useLocalization();
    const auth = useAuth();

    const [username, setUsername] = useState('');
    const [selectedClass, setSelectedClass] = useState<'Class A' | 'Class B'>('Class A');
    const [selectedAvatar, setSelectedAvatar] = useState('truck');
    const [loading, setLoading] = useState(false);

    const AVATARS = [
        { id: 'truck', icon: 'truck' },
        { id: 'user', icon: 'user' },
        { id: 'star', icon: 'star' },
        { id: 'road', icon: 'road' },
        { id: 'gears', icon: 'cogs' },
        { id: 'ticket', icon: 'ticket' },
    ];

    const handleContinue = async () => {
        if (!username.trim()) {
            Alert.alert(t('error'), t('pleaseEnterUsername'));
            return;
        }

        if (username.length < 3) {
            Alert.alert(t('error'), t('usernameTooShort'));
            return;
        }

        setLoading(true);
        try {
            // Update local stats
            const updates = {
                username: username.trim(),
                avatarId: selectedAvatar,
                cdlClass: selectedClass,
            };

            // This updates local storage (user-scoped or guest)
            const newStats = await updateStats(updates, auth?.userId);

            // If logged in, ensure we push strict sync now
            if (auth?.userId) {
                await pushStatsToCloud(auth.userId, newStats);
            }

            // Navigate to main app
            router.replace('/tabs');
        } catch (error) {
            console.error('Error setting up profile:', error);
            Alert.alert(t('error'), 'Failed to save profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

            {/* Background Gradient */}
            <LinearGradient
                colors={isDark ? ['#0f172a', '#1e293b'] : ['#f0f9ff', '#e0f2fe']}
                style={StyleSheet.absoluteFill}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 40, paddingBottom: 40 }]}>

                    <View style={styles.header}>
                        <View style={styles.iconContainer}>
                            <FontAwesome name="drivers-license-o" size={40} color={colors.primary} />
                        </View>
                        <Text style={[styles.title, { color: colors.text }]}>{t('setupProfile')}</Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{t('setupProfileSubtitle')}</Text>
                    </View>

                    {/* Username Input */}
                    <View style={styles.section}>
                        <Text style={[styles.label, { color: colors.text }]}>{t('username')}</Text>
                        <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <FontAwesome name="user" size={20} color={colors.textSecondary} style={{ marginRight: 12 }} />
                            <TextInput
                                value={username}
                                onChangeText={setUsername}
                                placeholder={t('enterUsername')}
                                placeholderTextColor={colors.textSecondary}
                                style={[styles.input, { color: colors.text }]}
                                autoCapitalize="words"
                                maxLength={20}
                            />
                        </View>
                    </View>

                    {/* Class Selection */}
                    <View style={styles.section}>
                        <Text style={[styles.label, { color: colors.text }]}>{t('selectClass')}</Text>
                        <View style={styles.classRow}>
                            <TouchableOpacity
                                style={[
                                    styles.classCard,
                                    { backgroundColor: colors.surface, borderColor: selectedClass === 'Class A' ? colors.primary : colors.border },
                                    selectedClass === 'Class A' && styles.selectedClassCard
                                ]}
                                onPress={() => setSelectedClass('Class A')}
                                activeOpacity={0.8}
                            >
                                <FontAwesome name="truck" size={32} color={selectedClass === 'Class A' ? colors.primary : colors.textSecondary} />
                                <Text style={[styles.classTitle, { color: selectedClass === 'Class A' ? colors.primary : colors.text }]}>Class A</Text>
                                <Text style={[styles.classDesc, { color: colors.textSecondary }]}>{t('classADesc')}</Text>
                                {selectedClass === 'Class A' && (
                                    <View style={[styles.checkBadge, { backgroundColor: colors.primary }]}>
                                        <FontAwesome name="check" size={10} color="#fff" />
                                    </View>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.classCard,
                                    { backgroundColor: colors.surface, borderColor: selectedClass === 'Class B' ? colors.primary : colors.border },
                                    selectedClass === 'Class B' && styles.selectedClassCard
                                ]}
                                onPress={() => setSelectedClass('Class B')}
                                activeOpacity={0.8}
                            >
                                <FontAwesome name="bus" size={32} color={selectedClass === 'Class B' ? colors.primary : colors.textSecondary} />
                                <Text style={[styles.classTitle, { color: selectedClass === 'Class B' ? colors.primary : colors.text }]}>Class B</Text>
                                <Text style={[styles.classDesc, { color: colors.textSecondary }]}>{t('classBDesc')}</Text>
                                {selectedClass === 'Class B' && (
                                    <View style={[styles.checkBadge, { backgroundColor: colors.primary }]}>
                                        <FontAwesome name="check" size={10} color="#fff" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Avatar Selection */}
                    <View style={styles.section}>
                        <Text style={[styles.label, { color: colors.text }]}>{t('chooseAvatar')}</Text>
                        <View style={styles.avatarGrid}>
                            {AVATARS.map((av) => {
                                const isSelected = selectedAvatar === av.id;
                                return (
                                    <TouchableOpacity
                                        key={av.id}
                                        onPress={() => setSelectedAvatar(av.id)}
                                        style={[
                                            styles.avatarItem,
                                            { backgroundColor: colors.surface, borderColor: isSelected ? colors.primary : 'transparent' }
                                        ]}
                                    >
                                        <FontAwesome name={av.icon as any} size={24} color={isSelected ? colors.primary : colors.textSecondary} />
                                        {isSelected && <View style={[styles.avatarCheck, { backgroundColor: colors.primary }]} />}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Button
                            title={loading ? t('saving') : t('continue')}
                            onPress={handleContinue}
                            disabled={loading}
                            style={{ height: 56, borderRadius: 28 }}
                            textStyle={{ fontSize: 18 }}
                            icon={!loading ? <FontAwesome name="arrow-right" size={20} color="#fff" style={{ marginLeft: 8 }} /> : undefined}
                        // Icon on right? Button supports icon prop on left.
                        // Let's just use default Button behavior or customize if needed. Button puts icon on left.
                        // We can just rely on text for now or put arrow.
                        />
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
    section: {
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        paddingHorizontal: 16,
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: '100%',
    },
    classRow: {
        flexDirection: 'row',
        gap: 16,
    },
    classCard: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        position: 'relative',
    },
    selectedClassCard: {
        borderWidth: 2,
        backgroundColor: 'rgba(56, 189, 248, 0.05)',
    },
    classTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 4,
    },
    classDesc: {
        fontSize: 12,
        textAlign: 'center',
        opacity: 0.7,
    },
    checkBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    avatarItem: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    avatarCheck: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#fff',
    }
});
