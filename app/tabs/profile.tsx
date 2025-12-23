
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, UIManager, LayoutAnimation, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { loadStats, updateStats, resetAllAppData, UserStats, INITIAL_STATS } from '../../data/stats';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getPendingEmails, saveEmailLocally, setPendingEmails } from '../../data/supabase';
import { startEmailSync } from '../../utils/emailSync';
import { restartApp } from '../../utils/restartApp';
import { showAlert, showConfirm } from '../../utils/alerts';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AVATARS = [
    { id: 'truck', source: require('../../assets/avatars/truck.png') },
    { id: 'bus', source: require('../../assets/avatars/bus.png') },
    { id: 'road', source: require('../../assets/avatars/wheel.png') },
    { id: 'user', source: require('../../assets/avatars/driver.png') },
];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].id);
    const [selectedClass, setSelectedClass] = useState<'Class A' | 'Class B'>('Class A');

    useFocusEffect(
        useCallback(() => {
            loadStats().then(s => {
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
            showAlert("Username Required", "Please enter a username.");
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

        const updated = await updateStats(updates);
        setStats(updated);
        setIsEditing(false);
    };

    const handleLogout = async () => {
        const performLogout = async () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            const pendingEmails = await getPendingEmails();
            const cleared = await resetAllAppData();
            if (pendingEmails.length > 0) {
                await setPendingEmails(pendingEmails);
            }
            setStats(cleared);
            // Reset local form state
            setUsername('');
            setSelectedAvatar('truck');
            setSelectedClass('Class A');
            setIsEditing(false);
            setSubscribeEmail('');
            const restarted = await restartApp();
            if (!restarted && Platform.OS !== 'web') {
                showAlert("Logged Out", "Local data cleared. Please restart the app if anything looks stale.");
            }
        };

        showConfirm({
            title: "Logout",
            message: "Log out and clear all local data on this device?",
            confirmText: "Logout",
            cancelText: "Cancel",
            isDestructive: true,
            onConfirm: performLogout,
        });
    };
    const handleSubscribe = async () => {
        const trimmed = subscribeEmail.trim().toLowerCase();
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
            setSubscribeEmail('');
            startEmailSync();
            showAlert("Subscribed", "Thanks! We'll sync your email when you're online.");
        } catch (error) {
            showAlert("Subscription Failed", "Couldn't save your email. Please try again.");
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
            <Text style={styles.label}>Choose Avatar</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.avatarList}>
                {AVATARS.map((avatar) => (
                    <TouchableOpacity
                        key={avatar.id}
                        style={[
                            styles.avatarOption,
                            selectedAvatar === avatar.id && styles.selectedAvatarOption
                        ]}
                        onPress={() => setSelectedAvatar(avatar.id)}
                    >
                        <Image source={avatar.source} style={styles.avatarImage} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderClassPicker = () => (
        <View style={styles.pickerSection}>
            <Text style={styles.label}>Select CDL Class</Text>
            <View style={styles.classRow}>
                {['Class A', 'Class B'].map((cls) => (
                    <TouchableOpacity
                        key={cls}
                        style={[
                            styles.classOption,
                            selectedClass === cls && styles.selectedClassOption
                        ]}
                        onPress={() => setSelectedClass(cls as 'Class A' | 'Class B')}
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
                    ? "Combination vehicles (truck + trailer)."
                    : "Single heavy vehicles (straight trucks, buses)."}
            </Text>
        </View>
    );

    const renderSubscribeSection = () => (
        <View style={styles.subscribeCard}>
            <Text style={styles.subscribeTitle}>Email Updates</Text>
            <Text style={styles.subscribeSubtitle}>We only use this email for subscription updates.</Text>
            <TextInput
                style={styles.input}
                placeholder="you@email.com"
                value={subscribeEmail}
                onChangeText={setSubscribeEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
                <Text style={styles.subscribeButtonText}>Subscribe</Text>
            </TouchableOpacity>
        </View>
    );

    // Render Edit/Create Form
    if (!stats.username || isEditing) {
        return (
            <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{isEditing ? 'Edit Profile' : 'Create Profile'}</Text>
                    {isEditing && (
                        <TouchableOpacity onPress={() => setIsEditing(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

                    {renderAvatarPicker()}

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Username <Text style={{ color: 'red' }}>*</Text></Text>
                        <TextInput
                            style={[styles.input, usernameError && styles.inputError]}
                            placeholder="Display Name"
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
                            <Text style={styles.errorText}>Please enter a username.</Text>
                        )}
                    </View>

                    {renderClassPicker()}

                    {!isEditing && renderSubscribeSection()}

                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                        <Text style={styles.saveButtonText}>{isEditing ? 'Save Changes' : 'Create Profile'}</Text>
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
            contentContainerStyle={{ paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
        >
            <View style={[styles.header, { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }]}>
                <Text style={styles.headerTitle}>My Profile</Text>
                <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButtonHeader}>
                    <Text style={styles.editText}>Edit</Text>
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

            {/* Global Progress */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Global Progress</Text>
                <View style={styles.statsGrid}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{stats.averageScore}%</Text>
                        <Text style={styles.statLabel}>Accuracy</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{stats.questionsAnswered}</Text>
                        <Text style={styles.statLabel}>Completed</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{Math.floor(stats.studyTimeMinutes / 60)}h {stats.studyTimeMinutes % 60}m</Text>
                        <Text style={styles.statLabel}>Time Spent</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{stats.examAttempts}</Text>
                        <Text style={styles.statLabel}>Exams</Text>
                    </View>
                </View>
            </View>

            {/* Achievements Placeholder */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                <View style={styles.placeholderBox}>
                    <FontAwesome name="trophy" size={24} color="#ccc" style={{ marginBottom: 8 }} />
                    <Text style={styles.placeholderText}>Coming soon</Text>
                </View>
            </View>
            <View style={styles.sectionContainer}>
                {renderSubscribeSection()}
            </View>

            <View style={styles.footer}>
                <Text style={styles.versionText}>v1.0.0</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Log Out</Text>
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
    logoutButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    logoutText: {
        color: '#C62828',
        fontSize: 16,
        fontWeight: '600',
    },
    avatarImageLarge: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
});
