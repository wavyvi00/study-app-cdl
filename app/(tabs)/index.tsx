import { StyleSheet, Text, View, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager, Modal, Switch, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Topic } from '../../data/mock';
import { useQuestions } from '../../context/QuestionsContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import StatsOverview from '../../components/StatsOverview';

import { loadStats, resetStats, INITIAL_STATS, INITIAL_TOPIC_STATS, UserStats } from '../../data/stats';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

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

    // Load stats whenever the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadStats().then(setStats);
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
                        <Text style={styles.headerTitle}>Study Topics</Text>
                        <Text style={styles.headerSubtitle}>Choose a subject to master</Text>
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
                <StatsOverview
                    stats={selectedTopic ? (stats.topicStats[selectedTopic.id] || INITIAL_TOPIC_STATS) : stats}
                    title={selectedTopic ? `${selectedTopic.title} Progress` : 'Overall Progress'}
                />

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

                {!isDropdownOpen && selectedTopic && (
                    <View style={[styles.card, isDark && styles.darkCard]}>
                        <View style={[styles.iconContainer, { backgroundColor: gradientMap[selectedTopic.image]?.[1] || '#ccc' }]}>
                            <FontAwesome name="book" size={24} color="white" />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={[styles.cardTitle, isDark && styles.darkText]}>{selectedTopic.title}</Text>
                            <Text style={[styles.cardDesc, isDark && styles.darkSubText]}>{selectedTopic.description}</Text>

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
        fontSize: 32,
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
        gap: 10,
    },
    actionButton: {
        backgroundColor: '#eef2f5',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    studyButton: {
        backgroundColor: '#E3F2FD',
    },
    darkStudyButton: {
        backgroundColor: '#1A237E',
    },
    examButton: {
        backgroundColor: '#fff0f0',
    },
    darkExamButton: {
        backgroundColor: '#3a2a2a',
    },
    actionText: {
        fontSize: 12,
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
});
