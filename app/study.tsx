import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useQuestions } from '../context/QuestionsContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState, useRef, useEffect } from 'react';
import { STUDY_GUIDES } from '../data/study_content';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

export default function StudyScreen() {
    const { topicId } = useLocalSearchParams();
    const router = useRouter();
    const { isDark } = useTheme();
    const { topics } = useQuestions();
    const insets = useSafeAreaInsets();
    const scrollViewRef = useRef<ScrollView>(null);

    const topic = topics.find(t => t.id === topicId);
    const studyGuide = STUDY_GUIDES[topicId as string];

    const [sectionIndex, setSectionIndex] = useState(0);
    // Track selected answers: { questionId: selectedIndex }
    const [answers, setAnswers] = useState<Record<string, number>>({});

    // Reset scroll and answers when section changes
    useEffect(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        setAnswers({});
    }, [sectionIndex]);

    if (!topic) {
        return (
            <View style={[styles.container, isDark && styles.darkContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={[styles.title, isDark && styles.darkText]}>Topic not found.</Text>
                <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
                    <Text style={{ color: '#1565C0', fontSize: 16 }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Fallback if no study guide exists for this topic yet
    if (!studyGuide) {
        return (
            <View style={[styles.container, isDark && styles.darkContainer]}>
                <Stack.Screen options={{ headerShown: false }} />
                <View style={[styles.header, isDark && styles.darkHeader, { paddingTop: insets.top + 12 }]}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <FontAwesome name="arrow-left" size={18} color={isDark ? "#ccc" : "#666"} />
                        <Text style={[styles.backText, isDark && styles.darkSubText]}>Back</Text>
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, isDark && styles.darkText]}>Study: {topic.title}</Text>
                    <View style={{ width: 60 }} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <FontAwesome name="book" size={50} color={isDark ? "#444" : "#ddd"} />
                    <Text style={[styles.title, isDark && styles.darkText, { marginTop: 20, textAlign: 'center' }]}>
                        Study Guide Coming Soon
                    </Text>
                    <Text style={[styles.text, isDark && styles.darkSubText, { textAlign: 'center', marginTop: 10 }]}>
                        We are working on the study guide for {topic.title}. Please check back later or use Practice Mode.
                    </Text>
                    <TouchableOpacity
                        style={[styles.primaryButton, { marginTop: 30 }]}
                        onPress={() => router.push({ pathname: '/quiz', params: { topicId: topic.id, mode: 'practice' } })}
                    >
                        <Text style={styles.primaryButtonText}>Go to Practice Mode</Text>
                    </TouchableOpacity>
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
        }
    };

    const handlePrev = () => {
        if (!isFirstSection) {
            setSectionIndex(prev => prev - 1);
        }
    };

    return (
        <View style={[styles.container, isDark && styles.darkContainer]}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={[styles.header, isDark && styles.darkHeader, { paddingTop: insets.top + 12 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={18} color={isDark ? "#ccc" : "#666"} />
                    <Text style={[styles.backText, isDark && styles.darkSubText]}>Back</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={[styles.headerSub, isDark && styles.darkSubText]}>Section {sectionIndex + 1} of {studyGuide.sections.length}</Text>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${((sectionIndex + 1) / studyGuide.sections.length) * 100}%` }]} />
                    </View>
                </View>
                <View style={{ width: 60 }} />
            </View>

            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>

                {/* Content Card */}
                <View style={[styles.contentCard, isDark && styles.darkContentCard]}>
                    <Text style={[styles.sectionTitle, isDark && styles.darkText]}>{currentSection.title}</Text>

                    {/* Main Text Content */}
                    {currentSection.content.map((paragraph, idx) => (
                        <Text key={idx} style={[styles.text, isDark && styles.darkText]}>
                            {paragraph}
                        </Text>
                    ))}
                </View>

                {/* Key Points */}
                {currentSection.keyPoints && currentSection.keyPoints.length > 0 && (
                    <View style={[styles.keyPointsBox, isDark && styles.darkKeyPointsBox]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <FontAwesome name="lightbulb-o" size={20} color="#F57F17" />
                            <Text style={[styles.keyPointsTitle, isDark && styles.darkText]}>Key Takeaways</Text>
                        </View>
                        {currentSection.keyPoints.map((point, idx) => (
                            <View key={idx} style={styles.bulletRow}>
                                <View style={[styles.bullet, isDark && { backgroundColor: '#bbb' }]} />
                                <Text style={[styles.bulletText, isDark && styles.darkSubText]}>{point}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Comprehension Questions */}
                {currentSection.reviewQuestions && currentSection.reviewQuestions.length > 0 && (
                    <View style={styles.quizSection}>
                        <Text style={[styles.quizHeader, isDark && styles.darkText]}>Check Your Understanding</Text>

                        {currentSection.reviewQuestions.map((q, idx) => {
                            const selected = answers[q.id];
                            const isAnswered = selected !== undefined;
                            const isCorrect = isAnswered && selected === q.correctIndex;

                            return (
                                <View key={q.id} style={[styles.questionCard, isDark && styles.darkCard]}>
                                    <View style={styles.questionHeaderRow}>
                                        <Text style={[styles.questionLabel, isDark && styles.darkSubText]}>Q{idx + 1}</Text>
                                        {isAnswered && (
                                            <FontAwesome
                                                name={isCorrect ? "check-circle" : "times-circle"}
                                                size={18}
                                                color={isCorrect ? "#2E7D32" : "#C62828"}
                                                style={{ marginLeft: 8 }}
                                            />
                                        )}
                                    </View>
                                    <Text style={[styles.questionText, isDark && styles.darkText]}>{q.text}</Text>

                                    <View style={styles.optionsContainer}>
                                        {q.options.map((opt, optIdx) => {
                                            const isSelected = selected === optIdx;
                                            const isThisCorrect = optIdx === q.correctIndex;

                                            // Style logic:
                                            // If not answered: default
                                            // If answered:
                                            //   - This is correct option: Green BG
                                            //   - This is selected wrong option: Red BG
                                            //   - Other options: dimmed

                                            let bgColor = isDark ? '#2a2a3e' : '#f5f5f5';
                                            let borderColor = 'transparent';
                                            let textColor = isDark ? '#ccc' : '#444';

                                            if (isAnswered) {
                                                if (isThisCorrect) {
                                                    bgColor = isDark ? '#1e4d2b' : '#d4edda';
                                                    borderColor = '#28a745';
                                                    textColor = '#155724';
                                                } else if (isSelected && !isThisCorrect) {
                                                    bgColor = isDark ? '#4d1e1e' : '#f8d7da';
                                                    borderColor = '#dc3545';
                                                    textColor = '#721c24';
                                                }
                                            } else if (isSelected) {
                                                // Just selected (though state updates immediately so this is transient/instant)
                                                bgColor = '#E3F2FD';
                                                borderColor = '#2196F3';
                                            }

                                            return (
                                                <TouchableOpacity
                                                    key={optIdx}
                                                    style={[
                                                        styles.optionButton,
                                                        { backgroundColor: bgColor, borderColor },
                                                        isAnswered && !isSelected && !isThisCorrect && { opacity: 0.5 },
                                                        isSelected && { borderWidth: 2 }
                                                    ]}
                                                    disabled={isAnswered}
                                                    onPress={() => handleOptionSelect(q.id, optIdx)}
                                                >
                                                    <Text style={[styles.optionText, { color: textColor }]}>{opt}</Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>

                                    {/* Explanation shows only after answering */}
                                    {isAnswered && (
                                        <View style={[styles.explanationBox, isDark && styles.darkExplanationBox]}>
                                            <Text style={[styles.explanationText, isDark && styles.darkSubText]}>
                                                <Text style={{ fontWeight: 'bold' }}>Explanation: </Text>
                                                {q.explanation}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                )}

                {/* Section Navigation Footer */}
                <View style={[styles.footer, isDark && styles.darkFooter]}>
                    <View style={styles.navRow}>
                        <TouchableOpacity
                            style={[styles.navButton, styles.prevButton, isFirstSection && styles.disabledButton]}
                            onPress={handlePrev}
                            disabled={isFirstSection}
                        >
                            <FontAwesome name="chevron-left" size={14} color={isDark ? "#888" : "#555"} style={{ marginRight: 6 }} />
                            <Text style={[styles.navButtonText, isFirstSection && { color: '#ccc' }]}>Previous</Text>
                        </TouchableOpacity>

                        {!isLastSection && (
                            <TouchableOpacity style={[styles.navButton, styles.nextButton]} onPress={handleNext}>
                                <Text style={styles.navButtonTextWhite}>Next Section</Text>
                                <FontAwesome name="chevron-right" size={14} color="#fff" style={{ marginLeft: 6 }} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Integrated CTA */}
                    {/* Integrated CTA */}
                    <TouchableOpacity
                        style={[styles.practiceCtaButton, isLastSection && styles.finishButton]}
                        onPress={handlePractice}
                    >
                        <Text style={[styles.practiceCtaText, isLastSection && styles.finishButtonText]}>
                            {isLastSection ? "Finish & Practice This Topic" : "Practice This Topic"}
                        </Text>
                        <FontAwesome
                            name="arrow-right"
                            size={16}
                            color={isLastSection ? "#fff" : "#1976D2"}
                            style={{ marginLeft: 8 }}
                        />
                    </TouchableOpacity>
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
        backgroundColor: '#f2f4f6', // Subtle gray background
    },
    darkContainer: {
        backgroundColor: '#121212',
    },
    scrollViewContent: {
        padding: 16,
        paddingBottom: 40,
    },
    contentCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    darkContentCard: {
        backgroundColor: '#1e1e1e',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        zIndex: 10,
    },
    darkHeader: {
        backgroundColor: '#1e1e1e',
        borderBottomColor: '#333',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        maxWidth: 200,
    },
    headerSub: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    progressBarBg: {
        width: 120,
        height: 4,
        backgroundColor: '#eee',
        borderRadius: 2,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#1976D2',
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
        color: '#666',
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#222',
        marginBottom: 20,
        lineHeight: 30,
    },
    text: {
        fontSize: 17,
        lineHeight: 26,
        color: '#333',
        marginBottom: 20,
    },
    keyPointsBox: {
        backgroundColor: '#FFF9C4', // Light yellow
        padding: 20,
        borderRadius: 12,
        marginBottom: 30,
    },
    darkKeyPointsBox: {
        backgroundColor: '#2a2a20',
    },
    keyPointsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#F57F17',
        marginLeft: 10,
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
        backgroundColor: '#F57F17',
        marginTop: 10,
        marginRight: 10,
    },
    bulletText: {
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    quizSection: {
        marginTop: 10,
        marginBottom: 30,
    },
    quizHeader: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 15,
    },
    questionCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#eee',
    },
    darkCard: {
        backgroundColor: '#1e1e1e',
        borderColor: '#333',
    },
    questionHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    questionLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    questionText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 15,
        lineHeight: 24,
    },
    optionsContainer: {
        gap: 10,
    },
    optionButton: {
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
    },
    optionText: {
        fontSize: 16,
        color: '#444',
    },
    explanationBox: {
        marginTop: 15,
        padding: 12,
        backgroundColor: '#E3F2FD',
        borderRadius: 8,
    },
    darkExplanationBox: {
        backgroundColor: '#1A237E',
    },
    explanationText: {
        fontSize: 15,
        color: '#333',
        lineHeight: 22,
    },
    footer: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    darkFooter: {
        borderTopColor: '#333',
    },
    navRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    navButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    prevButton: {
        backgroundColor: '#f5f5f5',
    },
    nextButton: {
        backgroundColor: '#1976D2',
    },
    finishButton: {
        backgroundColor: '#2E7D32', // Green for finish/practice
        borderWidth: 0,
    },
    disabledButton: {
        opacity: 0.5,
    },
    navButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
    },
    navButtonTextWhite: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    finishButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
    },
    primaryButton: {
        backgroundColor: '#1976D2',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    practiceCtaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1.5,
        borderColor: '#1976D2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 4,
    },
    darkPracticeCta: {
        backgroundColor: 'transparent',
        borderColor: '#4FC3F7',
    },
    practiceCtaText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1976D2',
        marginLeft: 6,
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
});
