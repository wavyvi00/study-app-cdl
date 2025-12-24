import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useQuestions } from '../context/QuestionsContext';
import { useLocalization } from '../context/LocalizationContext'; // Added
import { saveStudyProgress, loadStats, logActivityStart } from '../data/stats';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState, useRef, useEffect } from 'react';
import { STUDY_GUIDES, getStudyGuide } from '../data/study_content'; // Updated
import * as Haptics from '../utils/haptics';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function StudyScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const { colors, spacing, typography, radius, isDark } = useTheme();
    const { topics } = useQuestions();
    const { locale } = useLocalization(); // Added
    const insets = useSafeAreaInsets();
    const scrollViewRef = useRef<ScrollView>(null);

    const topicId = typeof params.topicId === 'string' ? params.topicId : '';
    const topic = topics.find(t => t.id === topicId);

    // Get localized study guide
    const studyGuide = getStudyGuide(topicId, locale);

    const [sectionIndex, setSectionIndex] = useState(0);
    // Track selected answers: { questionId: selectedIndex }
    const [answers, setAnswers] = useState<Record<string, number>>({});

    const [isCompleted, setIsCompleted] = useState(false);

    // Reset scroll and answers when section changes
    useEffect(() => {
        if (!isCompleted) {
            scrollViewRef.current?.scrollTo({ y: 0, animated: false });
            setAnswers({});
            // Save progress whenever section changes
            if (topic) {
                saveStudyProgress(topic.id, sectionIndex);
            }
        }
    }, [sectionIndex, topic, isCompleted]);

    // Initial load of saved position
    useEffect(() => {
        if (topicId) {
            logActivityStart(topicId as string, 'study');
            loadStats().then(stats => {
                const topicStats = stats.topicStats[topicId as string];
                if (topicStats?.lastStudySectionIndex !== undefined) {
                    setSectionIndex(topicStats.lastStudySectionIndex);
                }
            });
        }
    }, [topicId]);

    if (!topic) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', padding: spacing.xl }]}>
                <Text style={{ fontSize: typography.lg, color: colors.text, marginBottom: spacing.lg }}>Topic not found.</Text>
                <Button title="Go Back" onPress={() => router.back()} />
            </View>
        );
    }

    // Fallback if no study guide exists for this topic yet
    if (!studyGuide) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Stack.Screen options={{ headerShown: false }} />
                <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border, paddingTop: insets.top + spacing.md, paddingBottom: spacing.md }]}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <FontAwesome name="arrow-left" size={18} color={colors.textSecondary} />
                        <Text style={[styles.backText, { color: colors.textSecondary }]}>Back</Text>
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>{topic.title}</Text>
                    <View style={{ width: 60 }} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl }}>
                    <FontAwesome name="book" size={50} color={colors.textSecondary} />
                    <Text style={{ fontSize: typography.xl, fontWeight: 'bold', color: colors.text, marginTop: spacing.xl, marginBottom: spacing.md, textAlign: 'center' }}>
                        Study Guide Coming Soon
                    </Text>
                    <Text style={{ fontSize: typography.md, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.xl }}>
                        We are working on the study guide for {topic.title}. Please check back later or use Practice Mode.
                    </Text>
                    <Button
                        title="Go to Practice Mode"
                        onPress={() => router.push({ pathname: '/quiz', params: { topicId: topic.id, mode: 'practice' } })}
                    />
                </View>
            </View>
        );
    }

    const currentSection = studyGuide.sections[sectionIndex];
    const isFirstSection = sectionIndex === 0;
    const isLastSection = sectionIndex === studyGuide.sections.length - 1;

    const handleOptionSelect = (questionId: string, index: number) => {
        Haptics.selectionAsync();
        setAnswers(prev => ({
            ...prev,
            [questionId]: index
        }));
    };

    const handlePractice = () => {
        router.push({ pathname: '/quiz', params: { topicId: topic.id, mode: 'practice' } });
    };

    const handleNext = () => {
        if (!isLastSection) {
            setSectionIndex(prev => prev + 1);
        } else {
            handleFinish();
        }
    };

    const handleFinish = () => {
        setIsCompleted(true);
        // Optionally mark as "completed" in stats if we were tracking that
        // For now, just show the completion screen
    };

    const handlePrev = () => {
        if (!isFirstSection) {
            setSectionIndex(prev => prev - 1);
        }
    };

    const handleRestart = () => {
        setSectionIndex(0);
        setIsCompleted(false);
    };

    const handleQuit = () => {
        router.back();
    };

    if (isCompleted) {
        return (
            <View style={[styles.container, isDark && styles.darkContainer]}>
                <Stack.Screen options={{ headerShown: false }} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
                    <View style={[styles.completionIcon, isDark && styles.darkCompletionIcon]}>
                        <FontAwesome name="trophy" size={50} color="#FFD700" />
                    </View>
                    <Text style={[styles.completionTitle, isDark && styles.darkText]}>Topic Completed!</Text>
                    <Text style={[styles.completionSub, isDark && styles.darkSubText]}>
                        You have finished reading all {studyGuide.sections.length} sections of {topic.title}.
                    </Text>

                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity style={[styles.actionButton, styles.restartButton]} onPress={handleRestart}>
                            <FontAwesome name="refresh" size={16} color="#555" style={{ marginRight: 8 }} />
                            <Text style={styles.actionButtonText}>Restart Study</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionButton, styles.practiceButton]} onPress={handlePractice}>
                            <FontAwesome name="pencil" size={16} color="#fff" style={{ marginRight: 8 }} />
                            <Text style={styles.actionButtonTextWhite}>Practice Questions</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionButton, styles.quitButton, isDark && { borderColor: '#555' }]} onPress={handleQuit}>
                            <Text style={[styles.actionButtonText, isDark && styles.darkText]}>Quit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border, paddingTop: insets.top + spacing.md }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={18} color={colors.textSecondary} />
                    <Text style={[styles.backText, { color: colors.textSecondary }]}>Back</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={[styles.headerSub, { color: colors.textSecondary }]}>Section {sectionIndex + 1} of {studyGuide.sections.length}</Text>
                    <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
                        <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: `${((sectionIndex + 1) / studyGuide.sections.length) * 100}%` }]} />
                    </View>
                </View>
                <View style={{ width: 60 }} />
            </View>

            <ScrollView ref={scrollViewRef} contentContainerStyle={[styles.scrollViewContent, { padding: spacing.lg }]}>

                {/* Content Card */}
                <Card padding="lg" style={{ marginBottom: spacing.xl }}>
                    <Text style={[styles.sectionTitle, { color: colors.text, fontSize: typography.xl, marginBottom: spacing.lg }]}>{currentSection.title}</Text>

                    {/* Main Text Content */}
                    {currentSection.content.map((paragraph, idx) => (
                        <Text key={idx} style={[styles.text, { color: colors.text, fontSize: typography.md, marginBottom: spacing.md, lineHeight: 26 }]}>
                            {paragraph}
                        </Text>
                    ))}
                </Card>

                {/* Key Points */}
                {currentSection.keyPoints && currentSection.keyPoints.length > 0 && (
                    <Card padding="lg" style={{ marginBottom: spacing.xl, backgroundColor: isDark ? '#2a2a20' : '#FFF9C4', borderColor: isDark ? '#444' : 'transparent' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
                            <FontAwesome name="lightbulb-o" size={20} color={colors.highlight} />
                            <Text style={[styles.keyPointsTitle, { color: isDark ? colors.highlight : '#F57F17', fontSize: typography.lg, marginLeft: spacing.sm }]}>Key Takeaways</Text>
                        </View>
                        {currentSection.keyPoints.map((point, idx) => (
                            <View key={idx} style={styles.bulletRow}>
                                <View style={[styles.bullet, { backgroundColor: isDark ? colors.highlight : '#F57F17' }]} />
                                <Text style={[styles.bulletText, { color: colors.text, fontSize: typography.md }]}>{point}</Text>
                            </View>
                        ))}
                    </Card>
                )}

                {/* Comprehension Questions */}
                {currentSection.reviewQuestions && currentSection.reviewQuestions.length > 0 && (
                    <View style={styles.quizSection}>
                        <Text style={[styles.quizHeader, { color: colors.text, fontSize: typography.lg, marginBottom: spacing.md }]}>Check Your Understanding</Text>

                        {currentSection.reviewQuestions.map((q, idx) => {
                            const selected = answers[q.id];
                            const isAnswered = selected !== undefined;
                            const isCorrect = isAnswered && selected === q.correctIndex;

                            return (
                                <Card key={q.id} style={{ marginBottom: spacing.lg }} padding="md">
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
                                        <Badge label={`Q${idx + 1}`} variant="default" style={{ marginRight: spacing.sm }} />
                                        {isAnswered && (
                                            <FontAwesome
                                                name={isCorrect ? "check-circle" : "times-circle"}
                                                size={18}
                                                color={isCorrect ? colors.success : colors.error}
                                            />
                                        )}
                                    </View>
                                    <Text style={[styles.questionText, { color: colors.text, fontSize: typography.md, marginBottom: spacing.md }]}>{q.text}</Text>

                                    <View style={styles.optionsContainer}>
                                        {q.options.map((opt, optIdx) => {
                                            const isSelected = selected === optIdx;
                                            const isThisCorrect = optIdx === q.correctIndex;

                                            let cardStyle: ViewStyle = {};
                                            let textStyle: TextStyle = { color: colors.text };

                                            if (isAnswered) {
                                                if (isThisCorrect) {
                                                    cardStyle = { backgroundColor: isDark ? '#1b5e20' : '#E8F5E9', borderColor: colors.success, borderWidth: 2 };
                                                    textStyle = { color: colors.success };
                                                } else if (isSelected && !isThisCorrect) {
                                                    cardStyle = { backgroundColor: isDark ? '#b71c1c' : '#FFEBEE', borderColor: colors.error, borderWidth: 2 };
                                                    textStyle = { color: colors.error };
                                                } else {
                                                    cardStyle = { opacity: 0.5 };
                                                }
                                            } else if (isSelected) {
                                                cardStyle = { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.primary + '10' };
                                                textStyle = { color: colors.primary, fontWeight: '700' };
                                            }

                                            return (
                                                <TouchableOpacity
                                                    key={optIdx}
                                                    onPress={() => handleOptionSelect(q.id, optIdx)}
                                                    disabled={isAnswered}
                                                    activeOpacity={0.8}
                                                >
                                                    <Card style={[styles.optionCard, cardStyle]} padding="sm">
                                                        <Text style={[styles.optionText, textStyle, { fontSize: typography.md }]}>{opt}</Text>
                                                    </Card>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>

                                    {/* Explanation */}
                                    {isAnswered && (
                                        <View style={[styles.explanationBox, { backgroundColor: colors.background, borderLeftColor: colors.primary, marginTop: spacing.md }]}>
                                            <Text style={{ color: colors.text, fontSize: typography.sm, lineHeight: 20 }}>
                                                <Text style={{ fontWeight: 'bold' }}>Explanation: </Text>
                                                {q.explanation}
                                            </Text>
                                        </View>
                                    )}
                                </Card>
                            );
                        })}
                    </View>
                )}

                {/* Section Navigation Footer */}
                <View style={[styles.footer, { borderTopColor: colors.border, marginTop: spacing.xl, paddingTop: spacing.xl }]}>
                    <View style={styles.navRow}>

                        <Button
                            title="Previous"
                            variant="secondary"
                            onPress={handlePrev}
                            disabled={isFirstSection}
                            style={{ flex: 1, marginRight: spacing.md, opacity: isFirstSection ? 0 : 1 }}
                            icon={<FontAwesome name="chevron-left" size={14} color="#fff" style={{ marginRight: spacing.sm }} />}
                        />

                        {!isLastSection ? (
                            <Button
                                title="Next Section"
                                onPress={handleNext}
                                style={{ flex: 1 }}
                            // Note: Button prepends icon by default logic in Button.tsx, so for right icon we might need adjustment or just accept it on left.
                            // Or we can leave out icon for now to keep it simple or put it in text using flex if really needed. 
                            // But Button.tsx implementation puts icon before text.
                            // Let's just use text for Next to avoid confusion or keep it simple.
                            />
                        ) : (
                            <View style={{ flex: 1 }} />
                        )}
                    </View>

                    {/* Integrated CTA */}
                    <Button
                        title={isLastSection ? "Finish & Practice" : "Practice This Topic"}
                        variant={isLastSection ? "primary" : "outline"}
                        onPress={handlePractice}
                        style={{ marginTop: spacing.md, width: '100%' }}
                        icon={<FontAwesome name="pencil" size={16} color={isLastSection ? "#fff" : colors.primary} style={{ marginRight: spacing.sm }} />}
                    />
                </View>

                {/* Safe area spacer */}
                <View style={{ height: 40 }} />
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    darkContainer: {
        backgroundColor: '#121212',
    },
    scrollViewContent: {
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    headerSub: {
        fontSize: 12,
        marginBottom: 4,
    },
    progressBarBg: {
        width: 120,
        height: 4,
        borderRadius: 2,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 2,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        width: 60,
    },
    backText: {
        marginLeft: 5,
        fontSize: 16,
    },
    sectionTitle: {
        fontWeight: '800',
        lineHeight: 30,
    },
    text: {
        lineHeight: 26,
    },
    keyPointsTitle: {
        fontWeight: '700',
    },
    bulletRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: 10,
        marginRight: 10,
    },
    bulletText: {
        flex: 1,
        lineHeight: 24,
    },
    quizSection: {
        marginTop: 10,
        marginBottom: 30,
    },
    quizHeader: {
        fontWeight: '700',
    },
    questionText: {
        fontWeight: '600',
        lineHeight: 24,
    },
    optionsContainer: {
        gap: 10,
    },
    optionCard: {
        borderWidth: 1,
        borderColor: 'transparent',
    },
    optionText: {
    },
    explanationBox: {
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
    },
    footer: {
        borderTopWidth: 1,
    },
    navRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    darkText: {
        color: '#f0f0f0',
    },
    darkSubText: {
        color: '#bbb',
    },
    completionIcon: {
        width: 100,
        height: 100,
        backgroundColor: '#FFF8E1',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    darkCompletionIcon: {
        backgroundColor: '#3e3e26',
    },
    completionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    completionSub: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    actionButtonsContainer: {
        width: '100%',
        gap: 15,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    restartButton: {
        backgroundColor: '#f5f5f5',
        borderColor: '#e0e0e0',
    },
    practiceButton: {
        backgroundColor: '#1976D2',
    },
    quitButton: {
        backgroundColor: 'transparent',
        borderColor: '#ccc',
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
    },
    actionButtonTextWhite: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
