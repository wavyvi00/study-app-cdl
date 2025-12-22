import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useMemo, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ImageSourcePropType } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Question } from '../data/mock';
import { useQuestions } from '../context/QuestionsContext';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import { recordQuizResult, logActivityStart } from '../data/stats';
import { Achievement } from '../data/achievements';



export default function QuizScreen() {
    const { topicId, mode, resume } = useLocalSearchParams();
    const router = useRouter();
    const { isDark } = useTheme();
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
                // We do NOT save here because we need the questions first, which are in useMemo/state
            }
            logActivityStart(topicId as string, mode as 'practice' | 'exam');
        };
        initSession();
    }, [topicId, mode, resume]);

    // Topics with 25-question exams
    const shortExamTopics = ['passenger', 'doubles_triples', 'tank', 'school_bus'];

    // Logic to load questions
    const questions = useMemo(() => {
        // If we restored a session, use those questions
        if (restoredSession) return restoredSession.questions;

        if (topicId) {
            const allQuestions = [...getQuestions(topicId as string)];
            if (allQuestions.length === 0) return [];

            // Exam mode: randomly select questions
            if (mode === 'exam') {
                const shuffled = allQuestions.sort(() => 0.5 - Math.random());
                // 25 questions for endorsement topics, 50 for main topics
                const examQuestionCount = shortExamTopics.includes(topicId as string) ? 25 : 50;
                return shuffled.slice(0, Math.min(examQuestionCount, allQuestions.length));
            }

            // Practice mode: use all questions (shuffled)
            return allQuestions.sort(() => 0.5 - Math.random());
        }
        // If no topic, combine all questions from all topics
        const allQ = topics.flatMap(t => t.questions);
        return allQ.sort(() => 0.5 - Math.random()).slice(0, 10);
    }, [topicId, mode, getQuestions, topics, restoredSession]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    const [showReview, setShowReview] = useState(false);
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
            // Don't set QuestionOrder because questions array is already ordered as per session
            setQuestionOrder(restoredSession.questions.map((_, i) => i));
        } else {
            setQuestionOrder(questions.map((_, i) => i));
        }
    }, [restoredSession, questions]);

    const [questionOrder, setQuestionOrder] = useState<number[]>(() =>
        questions.map((_, i) => i)
    );
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


    // Timer state for Exam mode (60 minutes)
    const [timeLeft, setTimeLeft] = useState(60 * 60);

    // Timer logic
    useEffect(() => {
        if (mode !== 'exam' || isFinished) return;
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [mode, isFinished]);

    // Record results when finished
    useEffect(() => {
        if (isFinished) {
            const percentage = (score / questions.length) * 100;
            recordQuizResult(percentage, questions.length, mode === 'exam', topicId as string).then(result => {
                console.log('Stats updated:', result.stats);
                if (result.newAchievements.length > 0) {
                    setRecentAchievements(result.newAchievements);
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                }
            });
        }
    }, [isFinished]);

    // Helper to format time
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // If no questions found
    if (questions.length === 0) {
        return (
            <View style={[styles.container, isDark && styles.darkContainer]}>
                <Text style={isDark && styles.darkText}>No questions found.</Text>
            </View>
        );
    }

    const currentQuestionIndex = questionOrder[currentIndex];
    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentIndex === questionOrder.length - 1;
    const isPractice = mode === 'practice';
    const canSkip = currentIndex < questionOrder.length - 1;

    // Save progress on every step in Practice mode
    const saveProgress = async (newIndex: number, newScore: number, newWrong: typeof wrongAnswers) => {
        if (mode === 'practice') {
            const { savePracticeSession } = await import('../data/stats');
            // We need current question IDs. 
            // IMPORTANT: 'questions' array is what determines our session ID list.
            savePracticeSession({
                topicId: topicId as string,
                questionIds: questions.map(q => q.id),
                currentIndex: newIndex,
                score: newScore,
                wrongAnswers: newWrong.map(w => ({ questionId: w.question.id, selectedIndex: w.selectedIndex })),
                startTime: Date.now() // Update time or keep original? Doesn't matter much for now.
            });
        }
    };

    const handleOptionPress = (index: number) => {
        if (selectedOption !== null && isPractice) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setSelectedOption(index);
    };

    const handleNext = () => {
        Haptics.selectionAsync(); // Light tap on next
        // Check answer
        const isCorrect = selectedOption === currentQuestion.correctIndex;
        let nextScore = score;
        let nextWrong = wrongAnswers;

        if (isCorrect) {
            setScore(s => { nextScore = s + 1; return s + 1; });
        } else if (selectedOption !== null) {
            // Track wrong answer for review
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
            setIsFinished(true);
            // Session clearing handled in recordQuizResult now
        } else {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setSelectedOption(null);
            saveProgress(nextIndex, nextScore, nextWrong);
        }
    };

    const handleSkip = () => {
        Haptics.selectionAsync();
        // Move current question to the end
        // For persistence: update question order? 
        // Complex. If we shuffle 'questionOrder', the 'questions' array array remains fixed.
        // Persistence stores 'questionIds'. If we change order, we must update persistence order too.

        // This 'handleSkip' implementation changes 'questionOrder' state which maps displayed index -> real index.
        // But 'questions' array stays same.
        // To persist skip properly, we'd need to persist 'questionOrder' too.
        // Or, simpler: Just reorder the 'questions' array in persistence?

        // Let's stick to simple index increment for now to avoid complexity in this step.
        // If user skips, we just move to next. The skipped question goes to end of 'questionOrder'.
        // My persistence logic above saves 'questions.map(q => q.id)'. It assumes 'questions' array order matches play order.
        // BUT 'questionOrder' state allows shuffling.
        // If I want to support skip+resume, I need to save the EFFECTIVE order.

        // Fix: Use 'questionOrder' to derive the actual sequence of question IDs to save.

        setQuestionOrder(prev => {
            const newOrder = [...prev];
            const skippedIndex = newOrder.splice(currentIndex, 1)[0];
            newOrder.push(skippedIndex);

            // Re-save session with NEW logical order of questions
            if (mode === 'practice') {
                // Construct new Question list based on newOrder
                const reorderedQs = newOrder.map(idx => questions[idx]);
                import('../data/stats').then(m => {
                    m.savePracticeSession({
                        topicId: topicId as string,
                        questionIds: reorderedQs.map(q => q.id),
                        currentIndex: currentIndex, // Index stays same, but content at index changed
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
        const percentage = (score / questions.length) * 100;
        const passed = percentage >= 80;

        // Show wrong answer review screen
        if (showReview) {
            return (
                <View style={[styles.container, isDark && styles.darkContainer]}>
                    <View style={[styles.header, isDark && styles.darkHeader, { paddingTop: insets.top + 12 }]}>
                        <TouchableOpacity onPress={() => setShowReview(false)} style={styles.quitButton}>
                            <FontAwesome name="arrow-left" size={18} color={isDark ? "#ccc" : "#666"} />
                            <Text style={[styles.quitText, isDark && styles.darkSubText]}>Back</Text>
                        </TouchableOpacity>
                        <Text style={[styles.headerTitle, isDark && styles.darkText]}>Review ({wrongAnswers.length} missed)</Text>
                        <View style={styles.headerSpacer} />
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {wrongAnswers.map((item, index) => (
                            <View key={index} style={[styles.reviewCard, isDark && styles.darkCard]}>
                                <Text style={[styles.reviewQuestionNumber, isDark && styles.darkSubText]}>Question {index + 1}</Text>
                                <Text style={[styles.reviewQuestionText, isDark && styles.darkText]}>{item.question.text}</Text>

                                <View style={styles.reviewAnswerRow}>
                                    <FontAwesome name="times-circle" size={16} color="#C62828" />
                                    <Text style={styles.reviewWrongAnswer}>{item.question.options[item.selectedIndex]}</Text>
                                </View>

                                <View style={styles.reviewAnswerRow}>
                                    <FontAwesome name="check-circle" size={16} color="#2E7D32" />
                                    <Text style={styles.reviewCorrectAnswer}>{item.question.options[item.question.correctIndex]}</Text>
                                </View>

                                {item.question.explanation && (
                                    <View style={[styles.reviewExplanation, isDark && styles.darkExplanationBox]}>
                                        <Text style={[styles.explanationTitle, isDark && styles.darkText]}>Explanation:</Text>
                                        <Text style={[styles.explanationText, isDark && styles.darkSubText]}>{item.question.explanation}</Text>
                                    </View>
                                )}
                            </View>
                        ))}
                    </ScrollView>

                    <View style={[styles.footer, isDark && styles.darkFooter, { paddingBottom: insets.bottom + 20 }]}>
                        <View style={styles.footerButtons}>
                            <TouchableOpacity
                                style={[styles.nextButton, isDark && styles.darkNextButton]}
                                onPress={() => router.back()}
                            >
                                <Text style={styles.nextButtonText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }

        // Main results screen
        return (
            <View style={[styles.container, isDark && styles.darkContainer]}>
                <LinearGradient colors={isDark ? ['#0D47A1', '#1565C0'] : ['#1976D2', '#1565C0']} style={styles.resultGradient}>
                    <View style={styles.resultIconContainer}>
                        <FontAwesome name={passed ? "trophy" : "book"} size={60} color={passed ? "#FFD700" : "#fff"} />
                    </View>
                    <Text style={styles.resultSubtext}>{passed ? "You're ready for the next topic." : "Review the material and try again."}</Text>

                    {recentAchievements.length > 0 && (
                        <View style={styles.achievementsContainer}>
                            <Text style={styles.achievementsHeader}>New Awards Earned!</Text>
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
                            <TouchableOpacity
                                onPress={() => setShowReview(true)}
                                style={[styles.button, styles.reviewButton]}
                            >
                                <FontAwesome name="list" size={16} color="#1565C0" style={{ marginRight: 8 }} />
                                <Text style={styles.reviewButtonText}>Review {wrongAnswers.length} Wrong</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity onPress={() => router.back()} style={[styles.button, isDark && styles.darkButton]}>
                            <Text style={[styles.buttonText, isDark && styles.darkButtonText]}>Back to Home</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        );
    }

    return (
        <View style={[styles.container, isDark && styles.darkContainer]}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header with Quit button */}
            <View style={[styles.header, isDark && styles.darkHeader, { paddingTop: insets.top + 12 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.quitButton}>
                    <FontAwesome name="arrow-left" size={18} color={isDark ? "#ccc" : "#666"} />
                    <Text style={[styles.quitText, isDark && styles.darkSubText]}>Quit</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, isDark && styles.darkText]}>{isPractice ? 'Practice' : 'Exam'}</Text>
                {mode === 'exam' ? (
                    <Text style={{ color: isDark ? '#fff' : '#333', fontWeight: 'bold', minWidth: 60, textAlign: 'right' }}>{formatTime(timeLeft)}</Text>
                ) : (
                    <View style={styles.headerSpacer} />
                )}
            </View>

            <View style={[styles.progressContainer, isDark && styles.darkProgressContainer]}>
                <Text style={[styles.progressText, isDark && styles.darkSubText]}>Question {currentIndex + 1} / {questions.length}</Text>
                <LinearGradient
                    colors={isDark ? ['#1565C0', '#0D47A1'] : ['#1976D2', '#1565C0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressBar, { width: `${((currentIndex + 1) / questions.length) * 100}%` }]}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={[styles.questionText, isDark && styles.darkText]}>{currentQuestion.text}</Text>

                <View style={styles.optionsContainer}>
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedOption === index;
                        const isCorrect = index === currentQuestion.correctIndex;

                        let backgroundColor = isDark ? '#2a2a3e' : '#fff';
                        let borderColor = isDark ? '#444' : '#e0e0e0';

                        // Practice Mode Feedback
                        if (isPractice && selectedOption !== null) {
                            if (isSelected && isCorrect) {
                                backgroundColor = isDark ? '#1e4d2b' : '#d4edda'; // Greenish
                                borderColor = '#28a745';
                            } else if (isSelected && !isCorrect) {
                                backgroundColor = isDark ? '#4d1e1e' : '#f8d7da'; // Reddish
                                borderColor = '#dc3545';
                            } else if (isCorrect) {
                                // Show correct answer even if wrong selected
                                backgroundColor = isDark ? '#1e4d2b' : '#d4edda';
                                borderColor = '#28a745';
                            }
                        } else if (isSelected) {
                            // Exam mode or Pre-submit Practice
                            backgroundColor = isDark ? '#1A237E' : '#E3F2FD';
                            borderColor = isDark ? '#1565C0' : '#1976D2';
                        }

                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.optionCard, { backgroundColor, borderColor }]}
                                onPress={() => handleOptionPress(index)}
                                disabled={isPractice && selectedOption !== null}
                            >
                                <Text style={[styles.optionText, isDark && styles.darkText]}>{option}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Explanation in Practice Mode */}
                {isPractice && selectedOption !== null && (
                    <View style={[styles.explanationBox, isDark && styles.darkExplanationBox]}>
                        <Text style={[styles.explanationTitle, isDark && styles.darkText]}>Explanation:</Text>
                        <Text style={[styles.explanationText, isDark && styles.darkSubText]}>{currentQuestion.explanation}</Text>
                    </View>
                )}

            </ScrollView>

            <View style={[styles.footer, isDark && styles.darkFooter, { paddingBottom: insets.bottom + 20 }]}>
                <View style={styles.footerButtons}>
                    {canSkip && (
                        <TouchableOpacity
                            style={[styles.skipButton, isDark && styles.darkSkipButton]}
                            onPress={handleSkip}
                        >
                            <Text style={[styles.skipButtonText, isDark && styles.darkSubText]}>Skip</Text>
                            <FontAwesome name="arrow-right" size={14} color={isDark ? "#aaa" : "#666"} style={{ marginLeft: 6 }} />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={[styles.nextButton, isDark && styles.darkNextButton, { opacity: selectedOption === null ? 0.5 : 1 }]}
                        onPress={handleNext}
                        disabled={selectedOption === null}
                    >
                        <Text style={styles.nextButtonText}>{isLastQuestion ? 'Finish' : 'Next'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
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
        marginBottom: 10,
    },
    resultScore: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 10,
    },
    resultSubtext: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 40,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
    },
    buttonText: {
        color: '#3b5998',
        fontWeight: 'bold',
        fontSize: 16
    },
    progressContainer: {
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    progressText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
    },
    progressBar: {
        height: 6,
        borderRadius: 3,
        backgroundColor: '#eee',
    },
    scrollContent: {
        padding: 20,
    },
    questionText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 30,
    },
    optionsContainer: {
        gap: 12,
    },
    optionCard: {
        padding: 20,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#e0e0e0',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    optionText: {
        fontSize: 17,
        color: '#444',
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    nextButton: {
        flex: 1,
        backgroundColor: '#1565C0',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    explanationBox: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#E3F2FD',
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#1565C0',
    },
    explanationTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    explanationText: {
        color: '#555',
    },
    // Dark mode styles
    darkContainer: {
        backgroundColor: '#1a1a2e',
    },
    darkText: {
        color: '#f0f0f0',
    },
    darkSubText: {
        color: '#aaa',
    },
    darkProgressContainer: {
        backgroundColor: '#2a2a3e',
    },
    darkButton: {
        backgroundColor: '#2a2a3e',
    },
    darkButtonText: {
        color: '#90CAF9',
    },
    darkExplanationBox: {
        backgroundColor: '#2a2a3e',
    },
    darkFooter: {
        backgroundColor: '#2a2a3e',
        borderTopColor: '#444',
    },
    darkNextButton: {
        backgroundColor: '#1565C0',
    },
    // Header styles
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    darkHeader: {
        backgroundColor: '#2a2a3e',
        borderBottomColor: '#444',
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
        color: '#666',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    headerSpacer: {
        width: 60, // Balance the quit button width
    },
    // Footer button layout
    footerButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    skipButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#ddd',
        backgroundColor: '#f5f5f5',
    },
    darkSkipButton: {
        borderColor: '#555',
        backgroundColor: '#3a3a4e',
    },
    skipButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },

    // Review styles
    reviewCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    darkCard: {
        backgroundColor: '#2a2a3e',
    },
    reviewQuestionNumber: {
        fontSize: 12,
        fontWeight: '600',
        color: '#888',
        marginBottom: 6,
    },
    reviewQuestionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
        lineHeight: 22,
    },
    reviewAnswerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
        paddingLeft: 4,
    },
    reviewWrongAnswer: {
        fontSize: 14,
        color: '#C62828',
        marginLeft: 10,
        flex: 1,
        textDecorationLine: 'line-through',
    },
    reviewCorrectAnswer: {
        fontSize: 14,
        color: '#2E7D32',
        fontWeight: '600',
        marginLeft: 10,
        flex: 1,
    },
    reviewExplanation: {
        marginTop: 12,
        padding: 12,
        backgroundColor: '#E3F2FD',
        borderRadius: 10,
        borderLeftWidth: 3,
        borderLeftColor: '#1565C0',
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
    // Question image styles
    questionImageContainer: {
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        padding: 12,
    },
    questionImage: {
        width: '100%',
        height: 180,
        borderRadius: 8,
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
