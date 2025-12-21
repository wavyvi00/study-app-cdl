import { StyleSheet, Text, View } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { UserStats, TopicStats } from '../data/stats';
import { useTheme } from '../context/ThemeContext';
import Card from './ui/Card';

interface Props {
    stats: UserStats | TopicStats;
    title?: string;
}

export default function StatsOverview({ stats, title = 'Your Progress' }: Props) {
    const { colors, spacing, typography, radius, isDark } = useTheme();

    // Handle both UserStats (has streakDays) and TopicStats (doesn't)
    const displayStats = {
        averageScore: stats.averageScore || 0,
        examAttempts: stats.examAttempts || 0,
        questionsAnswered: stats.questionsAnswered || 0,
        studyTimeMinutes: stats.studyTimeMinutes || 0,
    };

    const StatItem = ({ icon, value, label, color }: { icon: any, value: string | number, label: string, color: string }) => (
        <View style={styles.statItemContainer}>
            <View style={[styles.iconCircle, { backgroundColor: isDark ? colors.surface : color + '20' }]}>
                <FontAwesome name={icon} size={16} color={color} />
            </View>
            <View>
                <Text style={[styles.statValue, { color: colors.text, fontSize: typography.lg }]}>{value}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: typography.xs }]}>{label}</Text>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { marginBottom: spacing.xl }]}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontSize: typography.xl, marginBottom: spacing.md, marginLeft: spacing.xs }]}>
                {title}
            </Text>

            <Card style={styles.card} padding="md">
                <View style={styles.row}>
                    <StatItem
                        icon="trophy"
                        value={`${displayStats.averageScore}%`}
                        label="Avg Score"
                        color={colors.primary}
                    />
                    <StatItem
                        icon="pencil"
                        value={displayStats.examAttempts}
                        label="Exams"
                        color={colors.secondary}
                    />
                </View>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <View style={styles.row}>
                    <StatItem
                        icon="check-circle"
                        value={displayStats.questionsAnswered}
                        label="Questions"
                        color={colors.success}
                    />
                    <StatItem
                        icon="clock-o"
                        value={`${Math.floor(displayStats.studyTimeMinutes / 60)}h`}
                        label="Study Time"
                        color={colors.accent}
                    />
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    sectionTitle: {
        fontWeight: '700',
    },
    card: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    divider: {
        height: 1,
        width: '100%',
        marginVertical: 8,
    },
    statItemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    statValue: {
        fontWeight: 'bold',
    },
    statLabel: {
        fontWeight: '500',
    }
});

