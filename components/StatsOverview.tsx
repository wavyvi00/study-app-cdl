import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { UserStats, TopicStats, INITIAL_TOPIC_STATS } from '../data/stats';
import { useTheme } from '../context/ThemeContext';

interface Props {
    stats: UserStats | TopicStats;
    title?: string;
}

export default function StatsOverview({ stats, title = 'Your Progress' }: Props) {
    const { isDark } = useTheme();

    // Handle both UserStats (has streakDays) and TopicStats (doesn't)
    const displayStats = {
        averageScore: stats.averageScore || 0,
        examAttempts: stats.examAttempts || 0,
        questionsAnswered: stats.questionsAnswered || 0,
        studyTimeMinutes: stats.studyTimeMinutes || 0,
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.sectionTitle, isDark && styles.darkTitle]}>{title}</Text>
            <View style={[styles.minimalCard, isDark && styles.darkCard]}>

                {/* Average Score */}
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Accuracy</Text>
                    <View style={styles.statRow}>
                        <FontAwesome name="check-circle" size={14} color={isDark ? "#81C784" : "#43A047"} style={{ marginRight: 6 }} />
                        <Text style={[styles.statValue, isDark && styles.darkText]}>{displayStats.averageScore}%</Text>
                    </View>
                </View>

                <View style={[styles.divider, isDark && styles.darkDivider]} />

                {/* Questions Answered */}
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Completed</Text>
                    <View style={styles.statRow}>
                        <FontAwesome name="list-ul" size={14} color={isDark ? "#90CAF9" : "#1976D2"} style={{ marginRight: 6 }} />
                        <Text style={[styles.statValue, isDark && styles.darkText]}>{displayStats.questionsAnswered}</Text>
                    </View>
                </View>

                <View style={[styles.divider, isDark && styles.darkDivider]} />

                {/* Exams */}
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Exams</Text>
                    <View style={styles.statRow}>
                        <FontAwesome name="file-text-o" size={14} color={isDark ? "#E6EE9C" : "#AFB42B"} style={{ marginRight: 6 }} />
                        <Text style={[styles.statValue, isDark && styles.darkText]}>{displayStats.examAttempts}</Text>
                    </View>
                </View>

                <View style={[styles.divider, isDark && styles.darkDivider]} />

                {/* Time */}
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Time</Text>
                    <View style={styles.statRow}>
                        <FontAwesome name="clock-o" size={14} color={isDark ? "#FFCC80" : "#F57C00"} style={{ marginRight: 6 }} />
                        <Text style={[styles.statValue, isDark && styles.darkText]}>
                            {(() => {
                                const h = Math.floor(displayStats.studyTimeMinutes / 60);
                                const m = displayStats.studyTimeMinutes % 60;
                                if (h > 0) return `${h}h ${m}m`;
                                return `${m}m`;
                            })()}
                        </Text>
                    </View>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        paddingHorizontal: 4,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#888',
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    darkTitle: {
        color: '#aaa',
    },
    minimalCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1, // very subtle shadow
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    darkCard: {
        backgroundColor: '#1e1e1e',
        borderColor: '#333',
        shadowColor: '#000',
        shadowOpacity: 0.2,
    },
    statItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: '#999',
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    darkText: {
        color: '#eee',
    },
    divider: {
        width: 1,
        height: '60%',
        backgroundColor: '#eee',
    },
    darkDivider: {
        backgroundColor: '#333',
    }
});
