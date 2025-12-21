import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useMemo, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated, ViewStyle, TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Question } from '../data/mock';
import { useQuestions } from '../context/QuestionsContext';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import { recordQuizResult } from '../data/stats';
import { shuffleArray } from '../lib/shuffle';
import { APP_CONFIG } from '../constants/appConfig';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function QuizScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const { colors, spacing, typography, radius, isDark } = useTheme();
    const { getQuestions, topics } = useQuestions();
    const insets = useSafeAreaInsets();

    // Safe params
    const topicId = typeof params.topicId === 'string' ? params.topicId : '';
    const mode = typeof params.mode === 'string' ? params.mode : 'practice';

    // Logic to load questions
    const questions = useMemo(() => {
        if (topicId) {
            const allQuestions = [...getQuestions(topicId)];
            if (allQuestions.length === 0) return [];

            // Exam mode: randomly select questions
            if (mode === 'exam') {
                const shuffled = shuffleArray(allQuestions);

                const isEndorsement = APP_CONFIG.ENDORSEMENT_TOPICS.includes(topicId);
                const questCount = isEndorsement
                    ? APP_CONFIG.QUESTION_COUNTS.ENDORSEMENT_TOPIC
                    : APP_CONFIG.QUESTION_COUNTS.MAIN_TOPIC;

                return shuffled.slice(0, Math.min(questCount, allQuestions.length));
            }

            // Practice mode: use all questions (shuffled)
            return shuffleArray(allQuestions);
        }

        // If no topic (fallback), combine all questions
        const allQ = topics.flatMap(t => t.questions);
        return shuffleArray(allQ).slice(0, 10);
    }, [topicId, mode, getQuestions, topics]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    const [showReview, setShowReview] = useState(false);

    // Track wrong answers
    const [wrongAnswers, setWrongAnswers] = useState<Array<{
        question: Question;
        selectedIndex: number;
    }>>([]);

    // We already shuffled 'questions' above, so we can just iterate 0..length
    const [questionOrder, setQuestionOrder] = useState<number[]>([]);

    useEffect(() => {
        if (questions.length > 0) {
            setQuestionOrder(questions.map((_, i) => i));
        }
    }, [questions]);

    // Timer state for Exam mode
    const [timeLeft, setTimeLeft] = useState(APP_CONFIG.EXAM_TIME_LIMIT_SECONDS);
    const hasRecordedRef = useRef(false);

    // Reset recording flag when quiz starts (questions change)
    useEffect(() => {
        hasRecordedRef.current = false;
        setIsFinished(false);
        setScore(0);
        setCurrentIndex(0);
        setWrongAnswers([]);
        setTimeLeft(APP_CONFIG.EXAM_TIME_LIMIT_SECONDS);
    }, [questions]);

    // Timer logic
    useEffect(() => {
        if (mode !== 'exam' || isFinished) return;
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);

                    // AUTO-SUBMIT LOGIC:
                    // If user has a selection but ran out of time, count it!
                    // We need to access the LATEST selectedOption. 
                    // Since we are in a state update callback, we can't easily see other state.
                    // BUT 'setIsFinished' will trigger the effect below.
                    // To do this cleanly, we'll set a "timedOut" flag or just rely on the effect.

                    // Correct approach: Set isFinished(true) is fine, 
                    // but we need to ensure the final answer is processed.

                    setIsFinished(true); // Triggers the effect
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [mode, isFinished]);

    // Record results when finished
    useEffect(() => {
        if (isFinished && !hasRecordedRef.current && questions.length > 0) {
            hasRecordedRef.current = true; // Mark handled immediately

            // CHECK FOR TIMEOUT SUBMISSION
            // If we timed out (timeLeft <= 0) and had a selection, add it to stats
            // We use local variables to calculate 'final' data for DB without waiting for state update
            let finalScore = score;

            if (timeLeft <= 0 && selectedOption !== null && questions[currentIndex]) {
                const currentQ = questions[currentIndex];
                const isCorrect = selectedOption === currentQ.correctIndex;

                if (isCorrect) {
                    finalScore += 1;
                    // Update UI state too so user sees correct count
                    setScore(s => s + 1);
                } else {
                    setWrongAnswers(prev => [...prev, {
                        question: currentQ,
                        selectedIndex: selectedOption
                    }]);
                }
            }
            hasRecordedRef.current = true;

            const percentage = (score / questions.length) * 100;

            recordQuizResult(
                percentage,
                questions.length,
                mode === 'exam',
                topicId
            ).catch(err => {
                if (__DEV__) console.error("Failed to record stats:", err);
            });
        }
    }, [isFinished, score, questions.length, mode, topicId]);

    // Helper to format time
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // If no questions found or loading
    if (questions.length === 0) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', padding: spacing.xl }]}>
                <Text style={{ color: colors.text, fontSize: typography.lg, marginBottom: spacing.lg }}>No questions found.</Text>
                <Button title="Go Back" onPress={() => router.back()} />
            </View>
        );
    }

    if (questionOrder.length === 0) return null; // Wait for init

    const currentQuestionIndex = questionOrder[currentIndex];
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null; // Safety

    const isLastQuestion = currentIndex === questionOrder.length - 1;
    const isPractice = mode === 'practice';
    const canSkip = currentIndex < questionOrder.length - 1;

    const handleOptionPress = (index: number) => {
        if (selectedOption !== null && isPractice) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setSelectedOption(index);
    };

    const handleNext = () => {
        Haptics.selectionAsync();

        // Check answer matches current question
        const isCorrect = selectedOption === currentQuestion.correctIndex;
        if (isCorrect) {
            setScore(s => s + 1);
        } else if (selectedOption !== null) {
            setWrongAnswers(prev => [...prev, {
                question: currentQuestion,
                selectedIndex: selectedOption
            }]);
        }

        if (isLastQuestion) {
            setIsFinished(true);
        } else {
            setCurrentIndex(i => i + 1);
            setSelectedOption(null);
        }
    };

    const handleSkip = () => {
        Haptics.selectionAsync();
        // Move current question to the end
        setQuestionOrder(prev => {
            const newOrder = [...prev];
            const skippedIndex = newOrder.splice(currentIndex, 1)[0];
            newOrder.push(skippedIndex);
            return newOrder;
        });
        setSelectedOption(null);
    };

    if (isFinished) {
        const percentage = (score / questions.length) * 100;
        const passed = percentage >= APP_CONFIG.PASSING_SCORE_PERCENTAGE;

        // Show wrong answer review screen
        if (showReview) {
            return (
                <View style={[styles.container, { backgroundColor: colors.background }]}>
                    <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border, paddingTop: insets.top + 12 }]}>
                        <TouchableOpacity onPress={() => setShowReview(false)} style={styles.quitButton}>
                            <FontAwesome name="arrow-left" size={18} color={colors.textSecondary} />
                            <Text style={[styles.quitText, { color: colors.textSecondary }]}>Back</Text>
                        </TouchableOpacity>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>Review ({wrongAnswers.length} missed)</Text>
                        <View style={{ width: 60 }} />
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {wrongAnswers.map((item, index) => (
                            <Card key={index} style={styles.reviewCard} padding="md">
                                <Text style={[styles.reviewQuestionNumber, { color: colors.textSecondary }]}>Question {index + 1}</Text>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 12 }}>{item.question.text}</Text>

                                <View style={styles.reviewAnswerRow}>
                                    <FontAwesome name="times-circle" size={16} color={colors.error} />
                                    <Text style={[styles.reviewWrongAnswer, { color: colors.error }]}>{item.question.options[item.selectedIndex]}</Text>
                                </View>

                                <View style={styles.reviewAnswerRow}>
                                    <FontAwesome name="check-circle" size={16} color={colors.success} />
                                    <Text style={[styles.reviewCorrectAnswer, { color: colors.success }]}>{item.question.options[item.question.correctIndex]}</Text>
                                </View>

                                {item.question.explanation && (
                                    <View style={[styles.reviewExplanation, { backgroundColor: colors.background, borderColor: colors.primary }]}>
                                        <Text style={{ fontWeight: 'bold', color: colors.text, marginBottom: 4 }}>Explanation:</Text>
                                        <Text style={{ color: colors.textSecondary }}>{item.question.explanation}</Text>
                                    </View>
                                )}
                            </Card>
                        ))}
                    </ScrollView>

                    <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border, paddingBottom: insets.bottom + 20 }]}>
                        <Button title="Done" onPress={() => router.back()} />
                    </View>
                </View>
            );
        }

        // Main results screen
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <LinearGradient colors={colors.headerGradient} style={styles.resultGradient}>
                    <View style={styles.resultIconContainer}>
                        <FontAwesome name={passed ? "trophy" : "book"} size={60} color={passed ? colors.highlight : "#fff"} />
                    </View>
                    <Text style={styles.resultTitle}>{passed ? "Great Job!" : "Keep Studying!"}</Text>

                    <View style={styles.scoreCircle}>
                        <Text style={[styles.scoreNumber, { color: colors.primary }]}>{Math.round(percentage)}%</Text>
                    </View>
                    <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, marginBottom: 40 }}>
                        {score} out of {questions.length} correct
                    </Text>

                    <View style={styles.resultButtonsContainer}>
                        {wrongAnswers.length > 0 && (
                            <Button
                                title={`Review ${wrongAnswers.length} Wrong`}
                                onPress={() => setShowReview(true)}
                                variant="secondary"
                                style={{ marginBottom: 16, width: '100%' }}
                                icon={<FontAwesome name="list" size={16} color="white" style={{ marginRight: 8 }} />}
                            />
                        )}

                        <Button
                            title="Back to Home"
                            onPress={() => router.back()}
                            variant="outline"
                            style={{ width: '100%', borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }}
                            textStyle={{ color: 'white' }}
                        />
                    </View>
                </LinearGradient>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header with Quit button */}
            <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border, paddingTop: insets.top + 12, paddingBottom: 12 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.quitButton}>
                    <FontAwesome name="arrow-left" size={18} color={colors.textSecondary} />
                    <Text style={[styles.quitText, { color: colors.textSecondary }]}>Quit</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>{isPractice ? 'Practice' : 'Exam'}</Text>
                {mode === 'exam' ? (
                    <Badge
                        label={formatTime(timeLeft)}
                        variant={timeLeft < 60 ? 'error' : 'default'}
                        style={{ minWidth: 60, justifyContent: 'center' }}
                    />
                ) : (
                    <View style={styles.headerSpacer} />
                )}
            </View>

            <View style={[styles.progressContainer, { backgroundColor: colors.surface }]}>
                <Text style={[styles.progressText, { color: colors.textSecondary }]}>Question {currentIndex + 1} / {questions.length}</Text>
                <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
                    <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: `${((currentIndex + 1) / questions.length) * 100}%` }]} />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Card padding="lg" style={{ marginBottom: spacing.xl }}>
                    <Text style={[styles.questionText, { color: colors.text, fontSize: typography.lg }]}>{currentQuestion.text}</Text>
                </Card>

                <View style={styles.optionsContainer}>
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedOption === index;
                        const isCorrect = index === currentQuestion.correctIndex;

                        let cardStyle: ViewStyle = {};
                        let textStyle: TextStyle = { color: colors.text };
                        let icon: React.ComponentProps<typeof FontAwesome>['name'] | null = null;

                        if (isPractice && selectedOption !== null) {
                            if (isSelected && isCorrect) {
                                cardStyle = { backgroundColor: isDark ? '#1b5e20' : '#E8F5E9', borderColor: colors.success, borderWidth: 2 };
                                textStyle = { color: colors.success };
                                icon = "check";
                            } else if (isSelected && !isCorrect) {
                                cardStyle = { backgroundColor: isDark ? '#b71c1c' : '#FFEBEE', borderColor: colors.error, borderWidth: 2 };
                                textStyle = { color: colors.error };
                                icon = "times";
                            } else if (isCorrect) {
                                cardStyle = { backgroundColor: isDark ? '#1b5e20' : '#E8F5E9', borderColor: colors.success, borderWidth: 2 };
                                textStyle = { color: colors.success };
                                icon = "check";
                            }
                        } else if (isSelected) {
                            cardStyle = { backgroundColor: colors.primary + '10', borderColor: colors.primary, borderWidth: 2 };
                            textStyle = { color: colors.primary, fontWeight: '700' };
                        }

                        return (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.8}
                                onPress={() => handleOptionPress(index)}
                                disabled={isPractice && selectedOption !== null}
                            >
                                <Card style={[styles.optionCard, cardStyle]} padding="md">
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {/* Option Letter/Circle */}
                                        <View style={{
                                            width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: colors.border,
                                            justifyContent: 'center', alignItems: 'center', marginRight: 12,
                                            backgroundColor: isSelected ? colors.primary : 'transparent',
                                            ...((isSelected && isPractice && isCorrect) ? { backgroundColor: colors.success, borderColor: colors.success } : {}),
                                            ...((isSelected && isPractice && !isCorrect) ? { backgroundColor: colors.error, borderColor: colors.error } : {})
                                        }}>
                                            {icon ? (
                                                <FontAwesome name={icon} size={12} color="#fff" />
                                            ) : (
                                                <Text style={{ fontSize: 10, color: isSelected ? '#fff' : colors.textSecondary }}>{String.fromCharCode(65 + index)}</Text>
                                            )}
                                        </View>
                                        <Text style={[{ fontSize: 16, flex: 1 }, textStyle]}>{option}</Text>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Explanation in Practice Mode */}
                {isPractice && selectedOption !== null && !!currentQuestion.explanation && (
                    <View style={[styles.explanationBox, { backgroundColor: colors.background, borderLeftColor: colors.primary, borderLeftWidth: 4, padding: spacing.md, marginTop: spacing.lg, borderRadius: radius.md }]}>
                        <Text style={{ fontWeight: 'bold', color: colors.text, marginBottom: 4 }}>Explanation:</Text>
                        <Text style={{ color: colors.textSecondary, lineHeight: 22 }}>{currentQuestion.explanation}</Text>
                    </View>
                )}

            </ScrollView>

            <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border, paddingBottom: insets.bottom + 20 }]}>
                <View style={styles.footerButtons}>
                    {canSkip && (
                        <Button
                            title="Skip"
                            variant="ghost"
                            onPress={handleSkip}
                            style={{ flex: 1, marginRight: 10 }}
                            textStyle={{ color: colors.textSecondary }}
                        />
                    )}
                    <Button
                        title={isLastQuestion ? 'Finish' : 'Next'}
                        onPress={handleNext}
                        disabled={selectedOption === null}
                        style={{ flex: 2 }}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    resultGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    resultIconContainer: {
        marginBottom: 20,
    },
    resultTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    scoreCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    scoreNumber: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    progressContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    progressText: {
        fontSize: 12,
        marginBottom: 5,
    },
    progressBarBg: {
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    scrollContent: {
        padding: 20,
    },
    questionText: {
        fontWeight: '700',
        lineHeight: 28,
    },
    optionsContainer: {
        gap: 12,
    },
    optionCard: {
        borderWidth: 1,
        borderColor: 'transparent', // Default hidden border
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
    },
    explanationBox: {
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
    },
    quitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    quitText: {
        marginLeft: 6,
        fontSize: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    headerSpacer: {
        width: 60,
    },
    footerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewCard: {
        marginBottom: 16,
    },
    reviewQuestionNumber: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 6,
    },
    reviewAnswerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    reviewWrongAnswer: {
        fontSize: 14,
        marginLeft: 10,
        flex: 1,
        textDecorationLine: 'line-through',
    },
    reviewCorrectAnswer: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 10,
        flex: 1,
    },
    reviewExplanation: {
        marginTop: 12,
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 3,
    },
    resultButtonsContainer: {
        width: '100%',
        paddingHorizontal: 30,
    }
});
