
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, UIManager, LayoutAnimation, Image, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { loadStats, updateStats, resetStats, UserStats, INITIAL_STATS } from '../../data/stats';
import { ACHIEVEMENTS, Achievement } from '../../data/achievements';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { restartApp } from '../../utils/restartApp';
import { showAlert, showConfirm } from '../../utils/alerts';
import { useLocalization } from '../../context/LocalizationContext';
import { useSubscription } from '../../context/SubscriptionContext';
import { useAuth } from '../../context/AuthContext';


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AVATARS = [
    { id: 'truck', source: require('../../assets/avatars/truck.png') },
    { id: 'bus', source: require('../../assets/avatars/bus.png') },
    { id: 'road', source: require('../../assets/avatars/wheel.png') },
    { id: 'user', source: require('../../assets/avatars/driver.png') },
];

export default function ProfileScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { t } = useLocalization();
    const { restore, isPro } = useSubscription();
    const auth = useAuth(); // Cross-platform auth

    const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].id);
    const [selectedClass, setSelectedClass] = useState<'Class A' | 'Class B'>('Class A');

    useFocusEffect(
        useCallback(() => {
            loadStats(auth?.userId).then(s => {
                setStats(s);
                if (s.username) {
                    setUsername(s.username);
                    // Map old IDs if necessary or fallback
                    const avatarExists = AVATARS.find(a => a.id === s.avatarId);
                    setSelectedAvatar(avatarExists ? s.avatarId! : 'truck');
                    setSelectedClass(s.cdlClass || 'Class A');
                }
                setIsLoading(false);
            });
        }, [])
    );

    // Reset form when entering edit mode from view mode
    useEffect(() => {
        if (isEditing && stats.username) {
            setUsername(stats.username);
            const avatarExists = AVATARS.find(a => a.id === stats.avatarId);
            setSelectedAvatar(avatarExists ? stats.avatarId! : 'truck');
            setSelectedClass(stats.cdlClass || 'Class A');
        }
    }, [isEditing, stats]);

    const handleSaveProfile = async () => {
        if (!username.trim()) {
            showAlert(t('usernameRequired'), t('enterUsername'));
            setUsernameError(true);
            return;
        }
        setUsernameError(false);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        const updates: Partial<UserStats> = {
            username: username.trim(),
            avatarId: selectedAvatar as string,
            cdlClass: selectedClass,
        };

        const updated = await updateStats(updates, auth?.userId);
        setStats(updated);
        setIsEditing(false);
    };

    const handleRestore = async () => {
        try {
            await restore();
            Alert.alert('Success', 'Purchases restored successfully!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Restore failed');
        }
    };

    const handleResetProfile = async () => {
        const performReset = async () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            // resetStats is safer for multi-user/cloud
            const cleared = await resetStats(auth?.userId || null);
            setStats(cleared);
            setUsername('');
            setSelectedAvatar('truck');
            setSelectedClass('Class A');
            setIsEditing(false);

            // Note: restartApp won't work perfectly on Expo Go/Client often, so we rely on state reset
            const restarted = await restartApp();
            if (!restarted && Platform.OS !== 'web') {
                showAlert(t('resetProfileTitle'), "Local data cleared.");
            }
        };

        showConfirm({
            title: t('resetProfileTitle'),
            message: t('resetProfileMessage'),
            confirmText: t('resetProfile'),
            cancelText: t('cancel'),
            isDestructive: true,
            onConfirm: performReset,
        });
    };

    // Sign out handler
    const handleSignOut = async () => {
        if (!auth) return;

        try {
            await auth.signOut();
            // RevenueCat will reinitialize with anonymous ID via auth state change listener
            Alert.alert('Signed Out', 'You have been signed out successfully.');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Sign out failed');
        }
    };
    if (isLoading) return null;

    const renderFormInfo = (title: string) => (
        <View style={styles.formSection}>
            <Text style={styles.label}>{title}</Text>
        </View>
    );

    const renderAvatarPicker = () => (
        <View style={styles.pickerSection}>
            <Text style={styles.label}>{t('chooseAvatar')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.avatarList}>
                {AVATARS.map((avatar) => {
                    const label = t(`avatar_${avatar.id}` as any);
                    return (
                        <TouchableOpacity
                            key={avatar.id}
                            style={[
                                styles.avatarOption,
                                selectedAvatar === avatar.id && styles.selectedAvatarOption
                            ]}
                            onPress={() => setSelectedAvatar(avatar.id)}
                            accessibilityRole="radio"
                            accessibilityLabel={label}
                            accessibilityState={{ checked: selectedAvatar === avatar.id }}
                            accessibilityHint="Double tap to select this avatar"
                        >
                            <Image source={avatar.source} style={styles.avatarImage} />
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );

    const renderClassPicker = () => (
        <View style={styles.pickerSection}>
            <Text style={styles.label}>{t('selectClass')}</Text>
            <View style={styles.classRow}>
                {['Class A', 'Class B'].map((cls) => (
                    <TouchableOpacity
                        key={cls}
                        style={[
                            styles.classOption,
                            selectedClass === cls && styles.selectedClassOption
                        ]}
                        onPress={() => setSelectedClass(cls as 'Class A' | 'Class B')}
                        accessibilityRole="radio"
                        accessibilityLabel={cls}
                        accessibilityState={{ checked: selectedClass === cls }}
                        accessibilityHint={cls === 'Class A' ? 'Combination vehicles' : 'Single heavy vehicles'}
                    >
                        <Text style={[
                            styles.classOptionText,
                            selectedClass === cls && styles.selectedClassOptionText
                        ]}>{cls}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.helperText}>
                {selectedClass === 'Class A'
                    ? t('classADesc')
                    : t('classBDesc')}
            </Text>
        </View>
    );



    // Render Edit/Create Form
    if (!stats.username || isEditing) {
        return (
            <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{isEditing ? t('editProfile') : t('createProfile')}</Text>
                    {isEditing && (
                        <TouchableOpacity
                            onPress={() => setIsEditing(false)}
                            accessibilityRole="button"
                            accessibilityLabel="Cancel"
                            accessibilityHint="Double tap to cancel editing"
                        >
                            <Text style={styles.cancelText}>{t('cancel')}</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

                    {renderAvatarPicker()}

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t('username')} <Text style={{ color: 'red' }}>*</Text></Text>
                        <TextInput
                            style={[styles.input, usernameError && styles.inputError]}
                            placeholder={t('displayName')}
                            value={username}
                            onChangeText={(value) => {
                                setUsername(value);
                                if (usernameError && value.trim()) {
                                    setUsernameError(false);
                                }
                            }}
                            autoCapitalize="words"
                        />
                        {usernameError && (
                            <Text style={styles.errorText}>{t('enterUsername')}</Text>
                        )}
                    </View>

                    {renderClassPicker()}



                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                        <Text style={styles.saveButtonText}>{isEditing ? t('saveChanges') : t('createProfile')}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    // View Mode (Profile)
    const currentAvatar = AVATARS.find(a => a.id === stats.avatarId) || AVATARS[0];

    return (
        <ScrollView
            style={[styles.container, { paddingTop: insets.top + 20 }]}
            contentContainerStyle={{ paddingBottom: 130 }}
            keyboardShouldPersistTaps="handled"
        >
            <View style={[styles.header, { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }]}>
                <Text style={styles.headerTitle}>{t('myProfile')}</Text>
                <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButtonHeader}>
                    <Text style={styles.editText}>{t('editProfile')}</Text>
                </TouchableOpacity>
            </View>

            {/* Profile Header */}
            <View style={styles.profileHeaderCard}>
                <View style={styles.avatarCircle}>
                    <Image source={currentAvatar.source} style={styles.avatarImageLarge} />
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{stats.username}</Text>
                    <View style={styles.classBadge}>
                        <Text style={styles.classBadgeText}>{stats.cdlClass || 'Class A'}</Text>
                    </View>
                </View>
            </View>

            {/* Web-Only Account Section */}
            {Platform.OS === 'web' && (
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <View style={styles.accountCard}>
                        {auth?.isAuthenticated ? (
                            <>
                                <View style={styles.accountRow}>
                                    <FontAwesome name="envelope" size={18} color="#666" />
                                    <Text style={styles.accountEmail}>{auth.user?.email}</Text>
                                </View>
                                <View style={styles.accountRow}>
                                    <FontAwesome name="star" size={18} color={isPro ? '#FFC107' : '#ccc'} />
                                    <Text style={[styles.accountStatus, isPro && styles.accountStatusPro]}>
                                        {isPro ? 'CDL ZERO Pro Member' : 'Free Account'}
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                                    <FontAwesome name="sign-out" size={16} color="#C62828" />
                                    <Text style={styles.signOutText}>Sign Out</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={styles.accountPromptText}>
                                    Sign in to sync your purchases across devices
                                </Text>
                                <TouchableOpacity
                                    style={styles.signInButton}
                                    onPress={() => router.push('/auth/login')}
                                >
                                    <Text style={styles.signInButtonText}>Sign In</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            )}

            {/* Global Progress */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{t('globalProgress')}</Text>
                <View style={styles.statsGrid}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{stats.averageScore}%</Text>
                        <Text style={styles.statLabel}>{t('accuracy')}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{stats.questionsAnswered}</Text>
                        <Text style={styles.statLabel}>{t('completed')}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{Math.floor(stats.studyTimeMinutes / 60)}h {stats.studyTimeMinutes % 60}m</Text>
                        <Text style={styles.statLabel}>{t('timeSpent')}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{stats.examAttempts}</Text>
                        <Text style={styles.statLabel}>{t('exams')}</Text>
                    </View>
                </View>
            </View>

            {/* Achievements Summary */}
            <View style={styles.sectionContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>{t('achievements')}</Text>
                    <TouchableOpacity onPress={() => router.push('/achievements')}>
                        <Text style={{ color: '#1565C0', fontWeight: '600' }}>{t('viewAllAwards')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.achievementsList}>
                    {ACHIEVEMENTS.sort((a, b) => {
                        const unlockA = stats.unlockedAchievements?.includes(a.id) ? 1 : 0;
                        const unlockB = stats.unlockedAchievements?.includes(b.id) ? 1 : 0;
                        return unlockB - unlockA; // Unlocked first
                    }).slice(0, 3).map((ach) => {
                        const isUnlocked = stats.unlockedAchievements?.includes(ach.id);
                        const progress = ach.getProgress(stats);
                        const percentage = Math.min(100, Math.round((progress.current / progress.target) * 100));

                        // Construct translation keys dynamically
                        const title = t(`achievement_${ach.id}_title` as any);
                        const desc = t(`achievement_${ach.id}_desc` as any);

                        return (
                            <View key={ach.id} style={[styles.achievementCard, !isUnlocked && styles.achievementCardLocked]}>
                                <View style={[styles.achievementIcon, isUnlocked ? styles.iconUnlocked : styles.iconLocked]}>
                                    <FontAwesome
                                        name={ach.icon as any}
                                        size={24}
                                        color={isUnlocked ? '#fff' : '#999'}
                                    />
                                </View>
                                <View style={styles.achievementContent}>
                                    <View style={styles.achievementHeader}>
                                        <Text style={[styles.achievementTitle, !isUnlocked && styles.textLocked]}>
                                            {title}
                                        </Text>
                                        {isUnlocked && (
                                            <FontAwesome name="check-circle" size={16} color="#4CAF50" />
                                        )}
                                    </View>
                                    <Text style={styles.achievementDesc}>{desc}</Text>

                                    {!isUnlocked && (
                                        <View style={styles.progressContainer}>
                                            <View style={styles.progressBarBg}>
                                                <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
                                            </View>
                                            <Text style={styles.progressText}>
                                                {progress.current} / {progress.target}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>


            <View style={styles.footer}>
                <Text style={styles.localStorageNoteText}>{t('localStorageNote')}</Text>
                <Text style={styles.versionText}>v1.0.0</Text>

                <TouchableOpacity style={styles.restoreButtonFooter} onPress={handleRestore}>
                    <Text style={styles.restoreTextFooter}>{t('restorePurchases')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.resetProfileButton} onPress={handleResetProfile}>
                    <Text style={styles.resetProfileText}>{t('resetProfile')}</Text>
                </TouchableOpacity>


            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#333',
    },
    cancelText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    editButtonHeader: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    editText: {
        color: '#1565C0',
        fontWeight: '600',
        fontSize: 14,
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    formSection: {
        marginBottom: 20,
    },
    pickerSection: {
        marginBottom: 24,
    },
    avatarList: {
        flexDirection: 'row',
        gap: 12,
        paddingVertical: 8,
        paddingLeft: 4,
    },
    avatarOption: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    avatarImage: {
        width: 52,
        height: 52,
        borderRadius: 26,
    },
    selectedAvatarOption: {
        borderColor: '#1565C0',
        transform: [{ scale: 1.1 }],
    },
    classRow: {
        flexDirection: 'row',
        gap: 12,
    },
    classOption: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    selectedClassOption: {
        backgroundColor: '#E3F2FD',
        borderColor: '#1565C0',
        borderWidth: 2,
    },
    classOptionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    selectedClassOptionText: {
        color: '#1565C0',
        fontWeight: '700',
    },
    helperText: {
        fontSize: 12,
        color: '#666',
        marginTop: 8,
        fontStyle: 'italic',
    },
    subscribeCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 2,
    },
    subscribeTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    subscribeSubtitle: {
        fontSize: 12,
        color: '#666',
        marginBottom: 12,
    },
    subscribeButton: {
        backgroundColor: '#1565C0',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    subscribeButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
    },

    // Form Inputs
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    inputError: {
        borderWidth: 1,
        borderColor: '#C62828',
        backgroundColor: '#FFEBEE',
    },
    errorText: {
        color: '#C62828',
        fontSize: 12,
        marginTop: 6,
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: '#1565C0',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },

    // View Mode Styles
    profileHeaderCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatarCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    classBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    classBadgeText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2E7D32',
    },
    sectionContainer: {
        marginHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    statBox: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1565C0',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    placeholderBox: {
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        borderStyle: 'dashed',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#999',
        fontSize: 14,
    },
    achievementsList: {
        gap: 12,
    },
    achievementCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    achievementCardLocked: {
        backgroundColor: '#f9f9f9',
        opacity: 0.8,
    },
    achievementIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    iconUnlocked: {
        backgroundColor: '#FFC107', // Gold
        shadowColor: '#FFC107',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    iconLocked: {
        backgroundColor: '#e0e0e0',
    },
    achievementContent: {
        flex: 1,
    },
    achievementHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    achievementTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    textLocked: {
        color: '#666',
    },
    achievementDesc: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    progressBarBg: {
        flex: 1,
        height: 6,
        backgroundColor: '#eee',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#1565C0',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 10,
        color: '#999',
        fontWeight: '600',
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    versionText: {
        color: '#999',
        fontSize: 12,
        marginBottom: 16,
    },
    resetProfileButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    resetProfileText: {
        color: '#C62828',
        fontSize: 16,
        fontWeight: '600',
    },
    localStorageNoteText: {
        color: '#999',
        fontSize: 11,
        textAlign: 'center',
        marginBottom: 8,
        fontStyle: 'italic',
    },
    avatarImageLarge: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    restoreButtonFooter: {
        marginBottom: 16,
        padding: 8,
    },
    restoreTextFooter: {
        color: '#1565C0',
        fontSize: 14,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    // Web Account Section Styles
    accountCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    accountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    accountEmail: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    accountStatus: {
        fontSize: 14,
        color: '#666',
    },
    accountStatusPro: {
        color: '#FFC107',
        fontWeight: '600',
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 8,
        marginTop: 4,
    },
    signOutText: {
        color: '#C62828',
        fontSize: 14,
        fontWeight: '600',
    },
    accountPromptText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        textAlign: 'center',
    },
    signInButton: {
        backgroundColor: '#1565C0',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    signInButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});
