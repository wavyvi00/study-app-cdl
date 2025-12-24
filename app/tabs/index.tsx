import { StyleSheet, Text, View, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager, Switch, ActivityIndicator } from 'react-native';
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
import Hoverable from '../../components/ui/Hoverable';
import SubscriptionCard from '../../components/SubscriptionCard';
import { showConfirm } from '../../utils/alerts';
import { getPendingEmails, isSubscriptionDismissed, markSubscriptionDismissed } from '../../data/supabase';

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
    const [infoTopic, setInfoTopic] = useState<Topic | null>(null);
    const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);

    // ... (rest of component logic remains same until return)

    // Load stats and check subscription status whenever the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadStats().then(setStats);
            // Check if we should show subscription popup
            Promise.all([getPendingEmails(), isSubscriptionDismissed()]).then(([emails, dismissed]) => {
                if (emails.length === 0 && !dismissed) {
                    setShowSubscriptionPopup(true);
                }
            });
        }, [])
    );

    // Set initial topic once loaded
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
        const performReset = async () => {
            const freshStats = await resetStats();
            setStats(freshStats);
            setIsMenuOpen(false);
        };

        showConfirm({
            title: 'Reset All Progress',
            message: 'Are you sure you want to reset all your progress? Achievements will not be cleared.',
            confirmText: 'Reset',
            cancelText: 'Cancel',
            isDestructive: true,
            onConfirm: performReset,
        });
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
                style={[styles.headerBackground, { paddingTop: 60, paddingBottom: 50, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }]}
            >
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.headerLabel}>OFFICIAL CDL PREPARATION</Text>
                        <Text style={[styles.headerTitle, { color: '#FFFFFF', fontSize: typography.xxl }]}>STUDY CENTER</Text>
                        <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.85)', fontSize: typography.md }]}>Prepare. Practice. Pass.</Text>
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
                                router.push('/privacy');
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
                    stats={selectedTopic ? (stats.topicStats[selectedTopic.id] || INITIAL_TOPIC_STATS) : stats}
                    title={selectedTopic ? `${selectedTopic.title} Progress` : 'Your Progress'}
                />

                <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: typography.sm, marginTop: spacing.md, marginBottom: spacing.sm }]}>SELECT TOPIC:</Text>

                <Hoverable
                    style={({ hovered }) => [
                        styles.dropdownButton,
                        {
                            backgroundColor: colors.surface,
                            borderColor: hovered ? colors.primary : colors.border
                        }
                    ]}
                    onPress={toggleDropdown}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[styles.dot, { backgroundColor: selectedTopic ? getTopicColor(selectedTopic.image) : colors.primary }]} />
                        <Text style={[styles.dropdownText, { color: colors.text, fontSize: typography.md }]}>
                            {selectedTopic ? selectedTopic.title : "Select a Topic"}
                        </Text>
                    </View>
                    <FontAwesome name={isDropdownOpen ? "chevron-up" : "chevron-down"} size={12} color={colors.textSecondary} />
                </Hoverable>

                {isDropdownOpen && (
                    <View style={[styles.dropdownList, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        {topics.map((topic) => (
                            <Hoverable
                                key={topic.id}
                                style={({ hovered }) => [
                                    styles.dropdownItem,
                                    {
                                        borderBottomColor: colors.border,
                                        backgroundColor: hovered ? (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)') : 'transparent'
                                    }
                                ]}
                                onPress={() => handleSelectTopic(topic)}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={[styles.dot, { backgroundColor: getTopicColor(topic.image), marginRight: 12 }]} />
                                    <Text style={[styles.dropdownItemText, { color: colors.text }]}>{topic.title}</Text>
                                </View>
                                {selectedTopic?.id === topic.id && (
                                    <FontAwesome name="check" size={12} color={colors.primary} />
                                )}
                            </Hoverable>
                        ))}
                    </View>
                )}

                {selectedTopic && (
                    <Hoverable style={{ marginTop: spacing.lg }}>
                        {({ hovered }) => (
                            <Card
                                style={[
                                    styles.topicCard,
                                    hovered && {
                                        transform: [{ translateY: -2 }],
                                        shadowOpacity: isDark ? 0.35 : 0.12
                                    }
                                ]}
                                padding="md"
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.md }}>
                                    <View style={[styles.iconBox, { backgroundColor: getTopicColor(selectedTopic.image) }]}>
                                        <FontAwesome name={getTopicIcon(selectedTopic.id)} size={20} color="#FFFFFF" />
                                    </View>
                                    <View style={{ marginLeft: spacing.md, flex: 1 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={[styles.topicCardTitle, { color: colors.text, fontSize: typography.lg }]}>{selectedTopic.title}</Text>
                                            <TouchableOpacity
                                                onPress={() => setInfoTopic(selectedTopic)}
                                                style={{ padding: 8, opacity: 0.6 }}
                                            >
                                                <FontAwesome name="ellipsis-h" size={16} color={colors.textSecondary} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={[styles.topicCardSubtitle, { color: colors.textSecondary, marginTop: 4 }]}>
                                            {selectedTopic.summary || 'Essential CDL knowledge.'}
                                        </Text>
                                    </View>
                                </View>

                                {stats.questionsAnswered < 10 && (
                                    <View style={{
                                        backgroundColor: isDark ? 'rgba(33, 150, 243, 0.1)' : 'rgba(33, 150, 243, 0.08)',
                                        paddingVertical: 8,
                                        paddingHorizontal: 12,
                                        borderRadius: 8,
                                        marginBottom: spacing.sm,
                                        borderLeftWidth: 3,
                                        borderLeftColor: colors.primary
                                    }}>
                                        <Text style={{
                                            fontSize: 12,
                                            color: colors.primary,
                                            fontWeight: '600',
                                            lineHeight: 16
                                        }}>
                                            💡 New here? Try Practice first to learn as you go.
                                        </Text>
                                    </View>
                                )}

                                <View style={styles.actionRow}>
                                    <Button
                                        title="Study Guide"
                                        variant="outline"
                                        onPress={() => router.push({ pathname: '/study', params: { topicId: selectedTopic.id } })}
                                        style={{ flex: 1, marginRight: 8, height: 42, borderRadius: 12, borderColor: colors.primary, borderWidth: 1.5 }}
                                        textStyle={{ fontSize: 13, fontWeight: '600', color: colors.primary }}
                                        icon={<FontAwesome name="book" size={12} color={colors.primary} style={{ marginRight: 6 }} />}
                                    />
                                    <Button
                                        title="Practice"
                                        variant="outline"
                                        onPress={() => startQuiz(selectedTopic.id, 'practice')}
                                        style={{ flex: 1, marginRight: 8, height: 42, borderRadius: 12, borderColor: colors.border }}
                                        textStyle={{ fontSize: 13, fontWeight: '600', color: colors.textSecondary }}
                                    />
                                    <Button
                                        title="Exam"
                                        variant="outline"
                                        onPress={() => startQuiz(selectedTopic.id, 'exam')}
                                        style={{ flex: 1, height: 42, borderRadius: 12, borderColor: colors.border }}
                                        textStyle={{ fontSize: 13, fontWeight: '600', color: colors.error }}
                                        icon={<FontAwesome name="clock-o" size={12} color={colors.error} style={{ marginRight: 6 }} />}
                                    />
                                </View>
                            </Card>
                        )}
                    </Hoverable>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Info Card Overlay */}
            {infoTopic && (
                <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }]}>
                    <TouchableOpacity
                        style={StyleSheet.absoluteFill}
                        activeOpacity={1}
                        onPress={() => setInfoTopic(null)}
                    />
                    <View style={{
                        width: '85%',
                        backgroundColor: colors.surface,
                        borderRadius: 24,
                        padding: 24,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.25,
                        shadowRadius: 16,
                        elevation: 10
                    }}>
                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <View style={[styles.iconBox, { backgroundColor: getTopicColor(infoTopic.image), width: 64, height: 64, borderRadius: 20, marginBottom: 16 }]}>
                                <FontAwesome name={getTopicIcon(infoTopic.id)} size={32} color="#FFFFFF" />
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text, textAlign: 'center', marginBottom: 8 }}>{infoTopic.title}</Text>
                            <Text style={{ fontSize: 14, color: colors.textSecondary, textAlign: 'center', fontStyle: 'italic' }}>{infoTopic.summary}</Text>
                        </View>

                        <View style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F5F5F7', padding: 16, borderRadius: 16, marginBottom: 24 }}>
                            <Text style={{ fontSize: 15, color: colors.text, lineHeight: 22, textAlign: 'center' }}>
                                {infoTopic.details || "This topic covers essential knowledge for the Commercial Driver's License test. Study the materials carefully before attempting the exam."}
                            </Text>
                        </View>

                        <Button
                            title="Close"
                            variant="primary"
                            onPress={() => setInfoTopic(null)}
                            style={{ width: '100%', borderRadius: 16, height: 50 }}
                        />
                    </View>
                </View>
            )}

            {/* Subscription Popup */}
            {showSubscriptionPopup && (
                <View style={{
                    position: 'absolute',
                    bottom: 100,
                    left: spacing.lg,
                    right: spacing.lg,
                    zIndex: 900,
                }}>
                    <SubscriptionCard
                        showCloseButton
                        onClose={() => {
                            markSubscriptionDismissed();
                            setShowSubscriptionPopup(false);
                        }}
                        onSuccess={() => setShowSubscriptionPopup(false)}
                    />
                </View>
            )}
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
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
        marginBottom: 0,
        zIndex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    headerLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 2,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    headerTitle: {
        fontWeight: '900',
        letterSpacing: 1.5,
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    headerSubtitle: {
        fontWeight: '600',
        letterSpacing: 0.5,
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
        paddingTop: 20,
    },
    sectionTitle: {
        fontWeight: '700',
        letterSpacing: 0.8,
        opacity: 0.7,
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12, // Reduced from 14
        borderRadius: 16, // Softer radius
        borderWidth: 1,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 10,
    },
    dropdownText: {
        fontWeight: '600',
    },
    dropdownList: {
        marginTop: 8,
        borderRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
    },
    dropdownItem: {
        paddingVertical: 12, // Reduced padding
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownItemText: {
        fontSize: 15, // Slightly smaller
        fontWeight: '500',
    },
    topicCard: {
        // Softer shadow to match progress section
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        borderRadius: 20,
    },
    topicCardTitle: {
        fontWeight: '700',
    },
    topicCardSubtitle: {
        fontSize: 14,
        marginTop: 2,
    },
    iconBox: {
        width: 44, // Reduced from 48
        height: 44,
        borderRadius: 14, // Softer radius
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
