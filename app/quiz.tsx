import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useMemo, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Question } from '../data/mock';
import { useQuestions } from '../context/QuestionsContext';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from '../utils/haptics';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import { recordQuizResult, logActivityStart } from '../data/stats';
import { Achievement } from '../data/achievements';
import { shuffleArray } from '../lib/shuffle';
import { APP_CONFIG } from '../constants/appConfig';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

import { useLocalization } from '../context/LocalizationContext'; // Added import

// ... imports

export default function QuizScreen() {
    const params = useLocalSearchParams();
    const topicId = typeof params.topicId === 'string' ? params.topicId : '';
    const mode = typeof params.mode === 'string' ? params.mode : 'practice';
    const resume = typeof params.resume === 'string' ? params.resume : 'false';

    const router = useRouter();
    const { colors, spacing, typography, radius, isDark } = useTheme();
    const { t } = useLocalization(); // Added hook
    const { getQuestions, topics } = useQuestions();
    const insets = useSafeAreaInsets();

    // State to hold potentially restored session data
    const [restoredSession, setRestoredSession] = useState<{
        questions: Question[];
        index: number;
        score: number;
        wrongAnswers: Array<{ question: Question; selectedIndex: number }>;
    } | null>(null);

    // Initial Load for Resume
    useEffect(() => {
        const initSession = async () => {
            if (mode === 'practice') {
                const stats = await import('../data/stats').then(m => m.loadStats());

                if (resume === 'true' && stats.currentPracticeSession && stats.currentPracticeSession.topicId === topicId) {
                    // Restore session
                    const session = stats.currentPracticeSession;
                    const allQs = getQuestions(topicId as string);
                    // Reconstruct question objects from IDs
                    const sessionQuestions = session.questionIds.map(id => allQs.find(q => q.id === id)).filter(Boolean) as Question[];

                    if (sessionQuestions.length > 0) {
                        const restoredWrong = session.wrongAnswers.map(w => ({
                            question: allQs.find(q => q.id === w.questionId)!,
                            selectedIndex: w.selectedIndex
                        })).filter(w => w.question);

                        setRestoredSession({
                            questions: sessionQuestions,
                            index: session.currentIndex,
                            score: session.score,
                            wrongAnswers: restoredWrong
                        });
                        return; // Done restoring
                    }
                }

                // If not resuming or restore failed, we'll start fresh (the normal flow)
            }
            logActivityStart(topicId as string, mode as 'practice' | 'exam');
        };
        initSession();
    }, [topicId, mode, resume]);

    // Logic to load questions
    const questions = useMemo(() => {
        // If we restored a session, use those questions
        if (restoredSession) return restoredSession.questions;

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
    }, [topicId, mode, getQuestions, topics, restoredSession]);

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

    // Initialize state from restored session if available
    useEffect(() => {
        if (restoredSession) {
            setCurrentIndex(restoredSession.index);
            setScore(restoredSession.score);
            setWrongAnswers(restoredSession.wrongAnswers);
            setQuestionOrder(restoredSession.questions.map((_, i) => i));
        } else if (questions.length > 0) {
            setQuestionOrder(questions.map((_, i) => i));
        }
    }, [restoredSession, questions]);

    const [questionOrder, setQuestionOrder] = useState<number[]>([]);
    const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([]);

    // Save initial session if starting new Practice
    useEffect(() => {
        if (mode === 'practice' && questions.length > 0 && !restoredSession) {
            // New session, save it
            import('../data/stats').then(m => {
                m.savePracticeSession({
                    topicId: topicId as string,
                    questionIds: questions.map(q => q.id),
                    currentIndex: 0,
                    score: 0,
                    wrongAnswers: [],
                    startTime: Date.now()
                });
            });
        }
    }, [mode, questions, topicId, restoredSession]);

    // Timer state for Exam mode
    const [timeLeft, setTimeLeft] = useState(APP_CONFIG.EXAM_TIME_LIMIT_SECONDS);
    const hasRecordedRef = useRef(false);

    // Reset recording flag when quiz starts (questions change)
    useEffect(() => {
        if (!restoredSession) { // Only reset if not restoring
            hasRecordedRef.current = false;
            setIsFinished(false);
            setScore(0);
            setCurrentIndex(0);
            setWrongAnswers([]);
            setTimeLeft(APP_CONFIG.EXAM_TIME_LIMIT_SECONDS);
        }
    }, [questions, restoredSession]);

    // Timer logic
    useEffect(() => {
        if (mode !== 'exam' || isFinished) return;
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsFinished(true); // Triggers the effect
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [mode, isFinished]);

    // Handle Quit (Finish early)
    const handleQuit = () => {
        // If we haven't answered anything, just exit
        if (currentIndex === 0 && selectedOption === null) {
            router.back();
            return;
        }

        // Show simplified alert or just finish
        // For 'Study App' flow, just finishing is cleanest.
        setIsFinished(true);
    };

    // Record results when finished
    useEffect(() => {
        if (isFinished && !hasRecordedRef.current && questions.length > 0) {
            hasRecordedRef.current = true; // Mark handled immediately

            // CHECK FOR TIMEOUT SUBMISSION
            let finalScore = score;
            let finalWrong = [...wrongAnswers];

            // If we timed out (or quit?) and had a selection, count it
            // Note: If I Quit, I might have a selected option?
            // If I selected but didn't submit, should it count? 
            // Usually 'Next' submits. 'Quit' abandons current question?
            // Let's assume 'Quit' abandons the *current* unfinished question unless time ran out.
            // If time ran out (timeLeft <= 0), we force submit.
            // If voluntary quit, we ignore current selection.

            if (timeLeft <= 0 && selectedOption !== null && questions[currentIndex]) {
                const currentQ = questions[currentIndex];
                const isCorrect = selectedOption === currentQ.correctIndex;

                if (isCorrect) {
                    finalScore += 1;
                } else {
                    finalWrong.push({
                        question: currentQ,
                        selectedIndex: selectedOption
                    });
                }
            }

            // Calculate Stats based on ANSWERED questions, not TOTAL
            const answeredCount = finalScore + finalWrong.length;

            // Accuracy percentage (based on what was answered)
            // If 0 answered, 0%
            const accuracyPercentage = answeredCount > 0
                ? (finalScore / answeredCount) * 100
                : 0;

            // Completion percentage (for UI 'Pass/Fail')
            const completionPercentage = (finalScore / questions.length) * 100;
            // const passed = completionPercentage >= APP_CONFIG.PASSING_SCORE_PERCENTAGE; 
            // (We stick to passed logic based on strict completion for "Exam" feel, but stats use accuracy)

            recordQuizResult(
                accuracyPercentage, // Use ACCURACY for stats (average score)
                answeredCount,      // Use ACTUAL COUNT for total questions stats
                mode === 'exam',
                topicId
            ).then(result => {
                if (__DEV__) {
                    console.log('Stats updated:', result.stats);
                }
                if (result.newAchievements.length > 0) {
                    setRecentAchievements(result.newAchievements);
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                }
            }).catch(err => {
                if (__DEV__) console.error("Failed to record stats:", err);
            });
        }
    }, [isFinished]);

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
                <Text style={{ color: colors.text, fontSize: typography.lg, marginBottom: spacing.lg }}>{t('noQuestionsFound')}</Text>
                <Button title={t('goBack')} onPress={() => router.back()} />
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

    // Save progress on every step in Practice mode
    const saveProgress = async (newIndex: number, newScore: number, newWrong: typeof wrongAnswers) => {
        if (mode === 'practice') {
            const { savePracticeSession } = await import('../data/stats');
            savePracticeSession({
                topicId: topicId as string,
                questionIds: questions.map(q => q.id), // Always use original IDs
                currentIndex: newIndex,
                score: newScore,
                wrongAnswers: newWrong.map(w => ({ questionId: w.question.id, selectedIndex: w.selectedIndex })),
                startTime: Date.now()
            });
        }
    };

    const handleOptionPress = (index: number) => {
        if (selectedOption !== null && isPractice) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setSelectedOption(index);
    };

    const handleNext = () => {
        Haptics.selectionAsync();

        const isCorrect = selectedOption === currentQuestion.correctIndex;
        let nextScore = score;
        let nextWrong = wrongAnswers;

        if (isCorrect) {
            setScore(s => { nextScore = s + 1; return s + 1; });
        } else if (selectedOption !== null) {
            setWrongAnswers(prev => {
                const updated = [...prev, {
                    question: currentQuestion,
                    selectedIndex: selectedOption
                }];
                nextWrong = updated;
                return updated;
            });
        }

        if (isLastQuestion) {
            setIsFinished(true); // Triggers recording
        } else {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setSelectedOption(null);
            saveProgress(nextIndex, nextScore, nextWrong);
        }
    };

    const handleSkip = () => {
        Haptics.selectionAsync();
        setQuestionOrder(prev => {
            const newOrder = [...prev];
            const skippedIndex = newOrder.splice(currentIndex, 1)[0];
            newOrder.push(skippedIndex);

            // Re-save session with NEW logical order of questions
            if (mode === 'practice') {
                const reorderedQs = newOrder.map(idx => questions[idx]);
                import('../data/stats').then(m => {
                    m.savePracticeSession({
                        topicId: topicId as string,
                        questionIds: reorderedQs.map(q => q.id),
                        currentIndex: currentIndex,
                        score: score,
                        wrongAnswers: wrongAnswers.map(w => ({ questionId: w.question.id, selectedIndex: w.selectedIndex })),
                        startTime: Date.now()
                    });
                });
            }
            return newOrder;
        });
        setSelectedOption(null);
    };

    if (isFinished) {
        // Calculate based on ALL questions for UI "Grade"
        const percentage = (score / questions.length) * 100;
        const passed = percentage >= APP_CONFIG.PASSING_SCORE_PERCENTAGE;

        // Show wrong answer review screen
        if (showReview) {
            return (
                <View style={[styles.container, { backgroundColor: colors.background }]}>
                    <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border, paddingTop: insets.top + 12 }]}>
                        <TouchableOpacity onPress={() => setShowReview(false)} style={styles.quitButton}>
                            <FontAwesome name="arrow-left" size={18} color={colors.textSecondary} />
                            <Text style={[styles.quitText, { color: colors.textSecondary }]}>{t('back')}</Text>
                        </TouchableOpacity>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>{t('reviewHeader')} ({wrongAnswers.length} {t('missed')})</Text>
                        <View style={{ width: 60 }} />
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {wrongAnswers.map((item, index) => (
                            <Card key={index} style={styles.reviewCard} padding="md">
                                <Text style={[styles.reviewQuestionNumber, { color: colors.textSecondary }]}>{t('question')} {index + 1}</Text>
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
                                        <Text style={{ fontWeight: 'bold', color: colors.text, marginBottom: 4 }}>{t('explanation')}:</Text>
                                        <Text style={{ color: colors.textSecondary }}>{item.question.explanation}</Text>
                                    </View>
                                )}
                            </Card>
                        ))}
                    </ScrollView>

                    <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border, paddingBottom: insets.bottom + 20 }]}>
                        <Button title={t('done')} onPress={() => router.back()} />
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
                    <Text style={styles.resultTitle}>{passed ? t('greatJob') : t('keepStudying')}</Text>

                    <View style={styles.scoreCircle}>
                        <Text style={[styles.scoreNumber, { color: colors.primary }]}>{Math.round(percentage)}%</Text>
                    </View>
                    <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, marginBottom: 40 }}>
                        {score} {t('outOf')} {questions.length} {t('correctLowerCase')}
                    </Text>

                    {recentAchievements.length > 0 && (
                        <View style={styles.achievementsContainer}>
                            <Text style={styles.achievementsHeader}>{t('newAwardsEarned')}</Text>
                            {recentAchievements.map((achievement) => (
                                <View key={achievement.id} style={styles.achievementBadge}>
                                    <FontAwesome name={achievement.icon as any} size={20} color="#FFD700" />
                                    <View style={{ marginLeft: 12 }}>
                                        <Text style={styles.achievementTitle}>{achievement.title}</Text>
                                        <Text style={styles.achievementDesc}>{achievement.description}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    <View style={styles.resultButtonsContainer}>
                        {wrongAnswers.length > 0 && (
                            <Button
                                title={`${t('reviewWrong')} (${wrongAnswers.length})`}
                                onPress={() => setShowReview(true)}
                                variant="secondary"
                                style={{ marginBottom: 16, width: '100%' }}
                                icon={<FontAwesome name="list" size={16} color="white" style={{ marginRight: 8 }} />}
                            />
                        )}

                        <Button
                            title={t('backToHome')}
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

    // Main Quiz Interface
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border, paddingTop: insets.top + 12, paddingBottom: 12 }]}>
                <TouchableOpacity onPress={handleQuit} style={styles.quitButton}>
                    <FontAwesome name="arrow-left" size={18} color={colors.textSecondary} />
                    <Text style={[styles.quitText, { color: colors.textSecondary }]}>{t('quit')}</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>{isPractice ? t('practice') : t('exam')}</Text>
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
                <Text style={[styles.progressText, { color: colors.textSecondary }]}>{t('question')} {currentIndex + 1} / {questions.length}</Text>
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
                                accessibilityRole="radio"
                                accessibilityLabel={`${t('answer')} ${String.fromCharCode(65 + index)}: ${option}`}
                                accessibilityState={{
                                    checked: isSelected,
                                    disabled: isPractice && selectedOption !== null
                                }}
                                accessibilityHint={isSelected && isPractice && isCorrect ? t('correctHeadsUp') : isSelected && isPractice && !isCorrect ? t('incorrectHeadsUp') : t('doubleTapToSelect')}
                            >
                                <Card style={[styles.optionCard, cardStyle]} padding="md">
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                                        {/* Additional visual indicator for correct/incorrect */}
                                        {isSelected && isPractice && isCorrect && (
                                            <FontAwesome name="check-circle" size={20} color={colors.success} style={{ marginLeft: 8 }} />
                                        )}
                                        {isSelected && isPractice && !isCorrect && (
                                            <FontAwesome name="times-circle" size={20} color={colors.error} style={{ marginLeft: 8 }} />
                                        )}
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {
                    isPractice && selectedOption !== null && !!currentQuestion.explanation && (
                        <View style={[styles.explanationBox, { backgroundColor: colors.background, borderLeftColor: colors.primary, borderLeftWidth: 4, padding: spacing.md, marginTop: spacing.lg, borderRadius: radius.md }]}>
                            <Text style={{ fontWeight: 'bold', color: colors.text, marginBottom: 4 }}>{t('explanation')}:</Text>
                            <Text style={{ color: colors.textSecondary, lineHeight: 22 }}>{currentQuestion.explanation}</Text>
                        </View>
                    )
                }

            </ScrollView >

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
        </View >
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
        borderColor: 'transparent',
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
        marginTop: 10,
    },
    reviewButton: {
        backgroundColor: '#fff',
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewButtonText: {
        color: '#1565C0',
        fontSize: 16,
        fontWeight: 'bold',
    },
    achievementsContainer: {
        width: '100%',
        paddingHorizontal: 30,
        marginBottom: 20,
        alignItems: 'center',
    },
    achievementsHeader: {
        color: '#FFD700',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    achievementBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        padding: 12,
        borderRadius: 12,
        width: '100%',
        marginBottom: 8,
    },
    achievementTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    achievementDesc: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
    },
});
