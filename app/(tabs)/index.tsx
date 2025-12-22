import { StyleSheet, Text, View, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager, Modal, Switch, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Topic } from '../../data/mock';
import { useQuestions } from '../../context/QuestionsContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import StatsOverview from '../../components/StatsOverview';
import { STUDY_GUIDES } from '../../data/study_content';

import { loadStats, resetStats, updateStats, INITIAL_STATS, INITIAL_TOPIC_STATS, UserStats } from '../../data/stats';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { saveEmailLocally } from '../../data/supabase';
import { startEmailSync } from '../../utils/emailSync';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TopicsScreen() {
    const router = useRouter();
    const { theme, toggleTheme, isDark } = useTheme();
    const { topics, isLoading } = useQuestions();
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
    const [emailInput, setEmailInput] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Load stats whenever the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadStats().then(setStats);
            AsyncStorage.getItem('EMAIL_SUBSCRIBED').then(val => {
                if (val === 'true') setIsSubscribed(true);
            });
            // Trigger background sync when screen is focused
            startEmailSync();
        }, [])
    );

    // Set initial topic once loaded
    useEffect(() => {
        if (topics.length > 0 && !selectedTopic) {
            setSelectedTopic(topics[0]);
        }
    }, [topics, selectedTopic]);

    const startQuiz = (topicId: string, mode: 'practice' | 'exam') => {
        router.push({ pathname: '/quiz', params: { topicId, mode } });
    };

    const toggleDropdown = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSelectTopic = (topic: Topic) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSelectedTopic(topic);
        setIsDropdownOpen(false);
    };

    const handleResetProgress = () => {
        Alert.alert(
            'Reset All Progress',
            'Are you sure you want to reset all your progress? This cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                        const freshStats = await resetStats();
                        setStats(freshStats);
                        setIsMenuOpen(false);
                    }
                }
            ]
        );
    };

    const gradientMap: Record<string, string[]> = {
        blue: ['#1565C0', '#0D47A1'],
        red: ['#C62828', '#B71C1C'],
        orange: ['#EF6C00', '#E65100'],
        purple: ['#6A1B9A', '#4A148C'],
        green: ['#2E7D32', '#1B5E20'],
        teal: ['#00838F', '#006064'],
        pink: ['#AD1457', '#880E4F'],
        yellow: ['#F9A825', '#F57F17'],
    };

    return (
        <View style={[styles.container, isDark && styles.darkContainer]}>
            <LinearGradient
                colors={isDark ? ['#0D47A1', '#1565C0'] : ['#1976D2', '#1565C0', '#0D47A1']}
                style={styles.headerBackground}
            >
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.headerTitle}>CDL Permit Preparation</Text>
                        <Text style={styles.headerSubtitle}>
                            {stats.lastTopicId
                                ? "Welcome back! Continue mastering your subjects."
                                : "Master CDL sections and endorsements."}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)} style={styles.settingsButton}>
                        <FontAwesome name={isMenuOpen ? "times" : "bars"} size={24} color="rgba(255,255,255,0.8)" />
                    </TouchableOpacity>
                </View>

                {isMenuOpen && (
                    <View style={[styles.menuDropdown, isDark && styles.darkCard]}>
                        <TouchableOpacity
                            style={[styles.menuItem, isDark && styles.darkBorder]}
                            onPress={() => {
                                setIsMenuOpen(false);
                                router.push('/privacy');
                            }}
                        >
                            <FontAwesome name="shield" size={16} color={isDark ? "#ccc" : "#444"} style={styles.menuIcon} />
                            <Text style={[styles.menuText, isDark && styles.darkText]}>Privacy Policy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.menuItem, isDark && styles.darkBorder]}
                            onPress={toggleTheme}
                        >
                            <FontAwesome name={isDark ? "moon-o" : "sun-o"} size={16} color={isDark ? "#ccc" : "#444"} style={styles.menuIcon} />
                            <Text style={[styles.menuText, isDark && styles.darkText]}>{isDark ? 'Dark Mode' : 'Light Mode'}</Text>
                            <View pointerEvents="none">
                                <Switch
                                    value={isDark}
                                    onValueChange={toggleTheme}
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
                                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.menuItem, { borderBottomWidth: 0 }]}
                            onPress={handleResetProgress}
                        >
                            <FontAwesome name="refresh" size={16} color="#C62828" style={styles.menuIcon} />
                            <Text style={[styles.menuText, { color: '#C62828' }]}>Reset Progress</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Email Prompt */}
                {/* Email Prompt */}
                {(!isSubscribed && !stats.hasDismissedEmailPrompt && (stats.questionsAnswered > 5 || !!stats.lastTopicId)) && (
                    <View style={[styles.emailCard, isDark && styles.darkCard]}>
                        <View style={styles.emailHeader}>
                            <View style={styles.emailIconBox}>
                                <FontAwesome name="envelope-o" size={20} color="#1565C0" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.emailTitle, isDark && styles.darkText]}>Stay Updated</Text>
                                <Text style={[styles.emailSubtitle, isDark && styles.darkSubText]}>
                                    Get the latest CDL study tips and app updates.
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    // Dismiss logic
                                    const nextStats = { ...stats, hasDismissedEmailPrompt: true };
                                    setStats(nextStats);
                                    updateStats({ hasDismissedEmailPrompt: true });
                                }}
                                style={{ padding: 4 }}
                            >
                                <FontAwesome name="times" size={16} color={isDark ? "#666" : "#999"} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.emailInputRow}>
                            <TextInput
                                style={[styles.emailInput, isDark && styles.darkInput]}
                                placeholder="Enter your email"
                                placeholderTextColor={isDark ? "#666" : "#999"}
                                value={emailInput}
                                onChangeText={setEmailInput}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={styles.emailSubmitButton}
                                onPress={async () => {
                                    const email = emailInput.trim();
                                    if (!email || !email.includes('@')) {
                                        Alert.alert("Invalid Email", "Please enter a valid email address.");
                                        return;
                                    }

                                    try {
                                        // Save locally first (works offline)
                                        await saveEmailLocally(email);

                                        // Trigger background sync (non-blocking)
                                        startEmailSync();

                                        // Persist subscription state immediately
                                        await AsyncStorage.setItem('EMAIL_SUBSCRIBED', 'true');
                                        setIsSubscribed(true);

                                        // Hide prompt and show success
                                        Alert.alert("Subscribed!", "Thanks for subscribing. We'll keep you updated!");
                                        const nextStats = { ...stats, hasDismissedEmailPrompt: true };
                                        setStats(nextStats);
                                        updateStats({ hasDismissedEmailPrompt: true });
                                        setEmailInput('');
                                    } catch (error) {
                                        Alert.alert("Error", "Failed to save email. Please try again.");
                                    }
                                }}
                            >
                                <Text style={styles.emailSubmitText}>Join</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <StatsOverview
                    stats={selectedTopic ? (stats.topicStats[selectedTopic.id] || INITIAL_TOPIC_STATS) : stats}
                    title={selectedTopic ? `${selectedTopic.title} Progress` : 'Overall Progress'}
                />

                {stats.lastTopicId && topics.find(t => t.id === stats.lastTopicId) && (() => {
                    const lastTopic = topics.find(t => t.id === stats.lastTopicId)!;
                    const topicStat = stats.topicStats[lastTopic.id] || INITIAL_TOPIC_STATS;
                    const totalQuestions = lastTopic.questions.length;

                    const isPractice = stats.lastActivityMode === 'practice';
                    // Determine progress based on mode
                    let progress = 0;
                    let progressLabel = '';
                    let shouldShow = false;

                    if (isPractice && stats.currentPracticeSession && stats.currentPracticeSession.topicId === lastTopic.id) {
                        const currentIdx = stats.currentPracticeSession.currentIndex;
                        // Use saved session total (length of questionIds) or current total (fallback)
                        const sessionTotal = stats.currentPracticeSession.questionIds.length || totalQuestions;
                        progress = sessionTotal > 0 ? Math.min((currentIdx / sessionTotal) * 100, 100) : 0;
                        progressLabel = `${currentIdx}/${sessionTotal}`;
                        shouldShow = progress < 100;

                    } else if (!isPractice) {
                        // Study Mode (Reading Progress)
                        const guide = STUDY_GUIDES[lastTopic.id];
                        if (guide && guide.sections.length > 0) {
                            const currentSectionIdx = topicStat.lastStudySectionIndex || 0;
                            const totalSections = guide.sections.length;
                            progress = Math.min(((currentSectionIdx + 1) / totalSections) * 100, 100);
                            progressLabel = `Section ${currentSectionIdx + 1}/${totalSections}`;
                            // Hide if on the very last section to imply "completion" (or maybe user wants to re-read?
                            // But usually "Continue" implies "pick up where left off". If at end, nothing to pick up.)
                            // Using progress < 100 means if I am on last section, it hides.
                            // Let's stick to progress < 100 for "Incomplete".
                            shouldShow = progress < 100;
                        } else {
                            // Fallback
                            shouldShow = false;
                        }
                    }

                    if (!shouldShow) return null;

                    return (
                        <TouchableOpacity
                            style={[styles.resumeStrip, isDark && styles.darkResumeStrip]}
                            onPress={() => {
                                if (isPractice) {
                                    router.push({ pathname: '/quiz', params: { topicId: lastTopic.id, mode: 'practice', resume: 'true' } });
                                } else {
                                    router.push({ pathname: '/study', params: { topicId: lastTopic.id } });
                                }
                            }}
                        >
                            <View style={[styles.resumeIconBox, isPractice ? { backgroundColor: '#E3F2FD' } : { backgroundColor: '#E8F5E9' }]}>
                                <FontAwesome
                                    name={isPractice ? "pencil" : "book"}
                                    size={14}
                                    color={isPractice ? "#1976D2" : "#2E7D32"}
                                />
                            </View>
                            <View style={styles.resumeContent}>
                                <Text style={[styles.resumeLabel, isDark && styles.darkText]} numberOfLines={1}>
                                    <Text style={{ fontWeight: '700' }}>{isPractice ? 'Resume Practice' : 'Resume Study'}</Text>
                                    <Text style={{ fontWeight: '400' }}> • {lastTopic.title}</Text>
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.resumeProgress, isDark && styles.darkSubText]}>{progressLabel}</Text>
                                <FontAwesome name="chevron-right" size={12} color={isDark ? "#666" : "#ccc"} style={{ marginLeft: 8 }} />
                            </View>
                        </TouchableOpacity>
                    );
                })()}

                <View style={[styles.dropdownContainer, { zIndex: isMenuOpen ? -1 : 10 }]}>
                    <Text style={[styles.sectionLabel, isDark && styles.darkText]}>Select Topic:</Text>
                    {selectedTopic && (
                        <TouchableOpacity style={[styles.dropdownHeader, isDark && styles.darkCard]} onPress={toggleDropdown}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={[styles.miniDot, { backgroundColor: gradientMap[selectedTopic.image]?.[1] }]} />
                                <Text style={[styles.dropdownTitle, isDark && styles.darkText]}>{selectedTopic.title}</Text>
                            </View>
                            <FontAwesome name={isDropdownOpen ? "chevron-up" : "chevron-down"} size={16} color={isDark ? "#ccc" : "#666"} />
                        </TouchableOpacity>
                    )}

                    {isDropdownOpen && (
                        <View style={[styles.dropdownList, isDark && styles.darkCard]}>
                            {topics.map((topic) => {
                                const topicStat = stats.topicStats[topic.id];
                                const masteryScore = topicStat?.averageScore || 0;
                                return (
                                    <TouchableOpacity
                                        key={topic.id}
                                        style={[styles.dropdownItem, isDark && styles.darkBorder]}
                                        onPress={() => handleSelectTopic(topic)}
                                    >
                                        <View style={[styles.miniDot, { backgroundColor: gradientMap[topic.image]?.[1] }]} />
                                        <Text style={[
                                            styles.dropdownItemText,
                                            isDark && styles.darkText,
                                            selectedTopic?.id === topic.id && styles.selectedItemText
                                        ]}>
                                            {topic.title}
                                        </Text>
                                        {masteryScore > 0 && (
                                            <View style={[styles.masteryBadge, masteryScore >= 80 && styles.masteryBadgeGreen]}>
                                                {masteryScore >= 80 && (
                                                    <FontAwesome name="check" size={10} color="#2E7D32" style={{ marginRight: 4 }} />
                                                )}
                                                <Text style={[styles.masteryBadgeText, masteryScore >= 80 && { color: '#2E7D32' }]}>{masteryScore}%</Text>
                                            </View>
                                        )}
                                        {selectedTopic?.id === topic.id && <FontAwesome name="check" size={14} color="#1565C0" />}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    )}
                </View>

                {/* Old Card Logic Removed, Selected Topic Card below */}
                {!isDropdownOpen && selectedTopic && (
                    <View style={[styles.card, isDark && styles.darkCard]}>
                        <View style={[styles.iconContainer, { backgroundColor: gradientMap[selectedTopic.image]?.[1] || '#ccc' }]}>
                            <FontAwesome name="book" size={24} color="white" />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={[styles.cardTitle, isDark && styles.darkText]}>{selectedTopic.title}</Text>
                            {(() => {
                                const guide = STUDY_GUIDES[selectedTopic.id];
                                const sectionCount = guide ? guide.sections.length : 0;
                                const questionCount = selectedTopic.questions.length;
                                const subText = sectionCount > 0
                                    ? `${sectionCount} study sections • ${questionCount} practice questions`
                                    : `Coming soon • ${questionCount} practice questions`;

                                return (
                                    <Text style={[styles.cardDesc, isDark && styles.darkSubText]}>
                                        {subText}
                                    </Text>
                                );
                            })()}

                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={[styles.actionButton, styles.studyButton, isDark && styles.darkStudyButton]} onPress={() => router.push({ pathname: '/study', params: { topicId: selectedTopic.id } })}>
                                    <Text style={[styles.actionText, isDark && styles.darkText]}>Study</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionButton, isDark && styles.darkButton]} onPress={() => startQuiz(selectedTopic.id, 'practice')}>
                                    <Text style={[styles.actionText, isDark && styles.darkText]}>Practice</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionButton, styles.examButton, isDark && styles.darkExamButton]} onPress={() => startQuiz(selectedTopic.id, 'exam')}>
                                    <Text style={[styles.actionText, isDark && styles.darkText]}>Exam</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    darkContainer: {
        backgroundColor: '#121212',
    },
    headerBackground: {
        paddingTop: 80,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        zIndex: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    settingsButton: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 5,
    },
    menuDropdown: {
        position: 'absolute',
        top: 130, // Increased to clear the header area
        right: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 5,
        width: 180,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
        zIndex: 100,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        justifyContent: 'space-between',
    },
    menuIcon: {
        marginRight: 10,
        width: 20,
        textAlign: 'center',
    },
    menuText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '600',
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
        marginLeft: 4,
    },
    dropdownContainer: {
        marginBottom: 20,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    dropdownTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    miniDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    dropdownList: {
        backgroundColor: 'white',
        marginTop: 5,
        borderRadius: 12,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    dropdownItemText: {
        fontSize: 15,
        color: '#555',
        flex: 1,
    },
    selectedItemText: {
        color: '#1565C0',
        fontWeight: '600',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    studyButton: {
        backgroundColor: '#E3F2FD',
        borderWidth: 1,
        borderColor: '#BBDEFB',
    },
    darkStudyButton: {
        backgroundColor: '#1565C0',
        borderColor: '#0D47A1',
    },
    examButton: {
        backgroundColor: '#FFEBEE',
        borderWidth: 1,
        borderColor: '#FFCDD2',
    },
    darkExamButton: {
        backgroundColor: '#3E2723',
        borderColor: '#4E342E',
    },
    actionText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#444',
    },
    darkText: {
        color: '#f0f0f0',
    },
    darkSubText: {
        color: '#bbb',
    },
    darkCard: {
        backgroundColor: '#1e1e1e',
        shadowColor: '#000',
    },
    darkButton: {
        backgroundColor: '#333',
    },
    darkBorder: {
        borderBottomColor: '#333',
    },
    masteryBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
        marginRight: 8,
    },
    masteryBadgeGreen: {
        backgroundColor: '#C8E6C9',
        borderWidth: 1,
        borderColor: '#81C784',
    },
    masteryBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#555',
    },

    // Resume Strip Styles
    resumeStrip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    darkResumeStrip: {
        backgroundColor: '#1E1E1E',
        shadowColor: '#000',
    },
    resumeIconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    resumeContent: {
        flex: 1,
    },
    resumeLabel: {
        fontSize: 14,
        color: '#333',
    },
    resumeProgress: {
        fontSize: 12,
        color: '#666',
        fontWeight: '600',
    },

    // Email Prompt Styles
    emailCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    emailHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    emailIconBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    emailTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        marginBottom: 2,
    },
    emailSubtitle: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },
    emailInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emailInput: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        color: '#333',
        marginRight: 10,
    },
    darkInput: {
        backgroundColor: '#333',
        color: '#fff',
    },
    emailSubmitButton: {
        backgroundColor: '#1565C0',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    emailSubmitText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
    },
});
