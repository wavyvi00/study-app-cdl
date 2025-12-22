import { StyleSheet, Text, View, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager, Switch, Alert, ActivityIndicator } from 'react-native';
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
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TopicsScreen() {
    const router = useRouter();
    const { theme, toggleTheme, isDark, colors, spacing, typography, radius } = useTheme();
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
    // Set initial topic once loaded or update refreshing
    useEffect(() => {
        if (topics.length > 0) {
            if (!selectedTopic) {
                setSelectedTopic(topics[0]);
            } else {
                // Refresh stale topic object
                const current = topics.find(t => t.id === selectedTopic.id);
                if (current && current !== selectedTopic) {
                    setSelectedTopic(current);
                }
            }
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

    const getTopicColor = (imageName: string) => {
        switch (imageName) {
            case 'blue': return '#2196F3';
            case 'red': return '#F44336';
            case 'orange': return '#FF9800';
            case 'purple': return '#9C27B0';
            case 'green': return '#4CAF50';
            case 'teal': return '#009688';
            case 'pink': return '#E91E63';
            case 'yellow': return '#F9A825'; // Darker yellow for better visibility
            default: return colors.primary;
        }
    };

    const getTopicIcon = (topicId: string): React.ComponentProps<typeof FontAwesome>['name'] => {
        switch (topicId) {
            case 'general_knowledge': return 'graduation-cap';
            case 'combinations': return 'truck';
            case 'air_brakes': return 'tachometer';
            case 'hazmat': return 'exclamation-triangle';
            case 'passenger': return 'users';
            case 'doubles_triples': return 'road'; // or 'chain'
            case 'tanks': return 'tint';
            case 'school_bus': return 'bus';
            default: return 'book';
        }
    };

    if (isLoading) {
        return (
            <View style={[styles.container, styles.center, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={{ marginTop: spacing.md, color: colors.textSecondary }}>Loading topics...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <LinearGradient
                colors={colors.headerGradient}
                style={[styles.headerBackground, { paddingTop: 60, paddingBottom: 40, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }]}
            >
                <View style={styles.headerRow}>
                    <View>
                        <Text style={[styles.headerTitle, { color: '#FFFFFF', fontSize: typography.xxl }]}>Study Topics</Text>
                        <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.8)', fontSize: typography.md }]}>Choose a subject to master</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setIsMenuOpen(!isMenuOpen)}
                        style={[styles.settingsButton, { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: radius.xl }]}
                        accessibilityRole="button"
                        accessibilityLabel="Open settings menu"
                    >
                        <FontAwesome name={isMenuOpen ? "times" : "bars"} size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {isMenuOpen && (
                    <Card style={styles.menuDropdown} padding="sm">
                        <TouchableOpacity
                            style={[styles.menuItem, { borderBottomColor: colors.border }]}
                            onPress={() => {
                                setIsMenuOpen(false);
                                router.push('/privacy'); // Adjust if route doesn't exist, but per original it might
                            }}
                        >
                            <FontAwesome name="shield" size={16} color={colors.textSecondary} style={styles.menuIcon} />
                            <Text style={[styles.menuText, { color: colors.text }]}>Privacy Policy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.menuItem, { borderBottomColor: colors.border }]}
                            onPress={toggleTheme}
                        >
                            <FontAwesome name={isDark ? "moon-o" : "sun-o"} size={16} color={colors.textSecondary} style={styles.menuIcon} />
                            <Text style={[styles.menuText, { color: colors.text }]}>{isDark ? 'Dark Mode' : 'Light Mode'}</Text>
                            <View pointerEvents="none">
                                <Switch
                                    value={isDark}
                                    onValueChange={toggleTheme}
                                    trackColor={{ false: "#767577", true: colors.secondary }}
                                    thumbColor={isDark ? colors.highlight : "#f4f3f4"}
                                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.menuItem, { borderBottomWidth: 0 }]}
                            onPress={handleResetProgress}
                        >
                            <FontAwesome name="refresh" size={16} color={colors.error} style={styles.menuIcon} />
                            <Text style={[styles.menuText, { color: colors.error }]}>Reset Progress</Text>
                        </TouchableOpacity>
                    </Card>
                )}
            </LinearGradient>

            <ScrollView contentContainerStyle={[styles.scrollContent, { padding: spacing.lg }]}>
                <StatsOverview
                    stats={stats}
                />

                <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: typography.sm, marginTop: spacing.xl, marginBottom: spacing.md }]}>SELECT TOPIC:</Text>

                <TouchableOpacity
                    style={[styles.dropdownButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
                    onPress={toggleDropdown}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[styles.dot, { backgroundColor: selectedTopic ? getTopicColor(selectedTopic.image) : colors.primary }]} />
                        <Text style={[styles.dropdownText, { color: colors.text, fontSize: typography.md }]}>
                            {selectedTopic ? selectedTopic.title : "Select a Topic"}
                        </Text>
                    </View>
                    <FontAwesome name={isDropdownOpen ? "chevron-up" : "chevron-down"} size={14} color={colors.textSecondary} />
                </TouchableOpacity>

                {isDropdownOpen && (
                    <View style={[styles.dropdownList, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        {topics.map((topic) => (
                            <TouchableOpacity
                                key={topic.id}
                                style={[styles.dropdownItem, { borderBottomColor: colors.border }]}
                                onPress={() => handleSelectTopic(topic)}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={[styles.dot, { backgroundColor: getTopicColor(topic.image), marginRight: 12 }]} />
                                    <Text style={[styles.dropdownItemText, { color: colors.text }]}>{topic.title}</Text>
                                </View>
                                {selectedTopic?.id === topic.id && (
                                    <FontAwesome name="check" size={14} color={colors.primary} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {selectedTopic && (
                    <Card style={{ marginTop: spacing.xl }} padding="lg">
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
                            <View style={[styles.iconBox, { backgroundColor: getTopicColor(selectedTopic.image) }]}>
                                <FontAwesome name={getTopicIcon(selectedTopic.id)} size={20} color="#FFFFFF" />
                            </View>
                            <View style={{ marginLeft: spacing.md }}>
                                <Text style={[styles.topicCardTitle, { color: colors.text, fontSize: typography.lg }]}>{selectedTopic.title}</Text>
                                <Text style={[styles.topicCardSubtitle, { color: colors.textSecondary }]}>{selectedTopic.questions.length} questions available</Text>
                            </View>
                        </View>

                        <View style={styles.actionRow}>
                            <Button
                                title="Study Guide"
                                onPress={() => router.push({ pathname: '/study', params: { topicId: selectedTopic.id } })}
                                style={{ flex: 1, marginRight: spacing.sm }}
                                icon={<FontAwesome name="book" size={16} color='#FFFFFF' style={{ marginRight: 8 }} />}
                            />
                            <Button
                                title="Practice"
                                variant="outline"
                                onPress={() => startQuiz(selectedTopic.id, 'practice')}
                                style={{ flex: 1, marginHorizontal: spacing.xs }}
                            />
                            <Button
                                title="Exam"
                                variant="accent"
                                onPress={() => startQuiz(selectedTopic.id, 'exam')}
                                style={{ flex: 1, marginLeft: spacing.sm }}
                            />
                        </View>
                    </Card>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerBackground: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: -20, // Overlap effect
        zIndex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontWeight: '800',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontWeight: '500',
    },
    settingsButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuDropdown: {
        position: 'absolute',
        top: 110,
        right: 20,
        width: 200,
        zIndex: 100,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
    },
    menuIcon: {
        width: 24,
        textAlign: 'center',
        marginRight: 12,
    },
    menuText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
    },
    scrollContent: {
        paddingTop: 30, // Compensate for overlap
    },
    sectionTitle: {
        fontWeight: '600',
        letterSpacing: 1,
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 10,
    },
    dropdownText: {
        fontWeight: '500',
    },
    dropdownList: {
        marginTop: 8,
        borderRadius: 12,
        borderWidth: 1,
        overflow: 'hidden',
    },
    dropdownItem: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownItemText: {
        fontSize: 16,
    },
    topicCardTitle: {
        fontWeight: '700',
    },
    topicCardSubtitle: {
        fontSize: 14,
        marginTop: 2,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
