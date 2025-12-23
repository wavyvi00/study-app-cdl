import { StyleSheet, Text, View, Pressable, Platform, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { UserStats, TopicStats } from '../data/stats';
import { useTheme } from '../context/ThemeContext';
import Card from './ui/Card';
import { useRef, useState } from 'react';

interface Props {
    stats: UserStats | TopicStats;
    title?: string;
}

interface StatConfig {
    icon: React.ComponentProps<typeof FontAwesome>['name'];
    value: string | number;
    label: string;
    gradientColors: [string, string];
    iconColor: string;
}

const StatItem = ({ config }: { config: StatConfig }) => {
    const { colors, isDark } = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleHoverIn = () => {
        setIsHovered(true);
        Animated.spring(scaleAnim, {
            toValue: 1.05,
            useNativeDriver: true,
            friction: 8,
            tension: 40
        }).start();
    };

    const handleHoverOut = () => {
        setIsHovered(false);
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            friction: 8,
            tension: 40
        }).start();
    };

    return (
        <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
            <Pressable
                style={[styles.statContainer]}
                onHoverIn={handleHoverIn}
                onHoverOut={handleHoverOut}
            >
                {/* Floating Icon with Gradient */}
                <View style={styles.iconWrapper}>
                    <LinearGradient
                        colors={config.gradientColors}
                        style={styles.iconGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <FontAwesome name={config.icon} size={13} color="#FFFFFF" />
                    </LinearGradient>
                    {/* Soft shadow effect - increases on hover */}
                    <View style={[
                        styles.iconShadow,
                        {
                            backgroundColor: config.gradientColors[1],
                            opacity: isHovered ? 0.4 : 0.2,
                            transform: [{ scaleX: isHovered ? 1.1 : 0.9 }]
                        }
                    ]} />
                </View>

                {/* Value and Label */}
                <View style={styles.statContent}>
                    <Text style={[styles.statValue, { color: colors.text }]} numberOfLines={1} adjustsFontSizeToFit>{config.value}</Text>
                    <Text style={[styles.statLabel, { color: colors.textSecondary }]} numberOfLines={1}>{config.label}</Text>
                </View>
            </Pressable>
        </Animated.View>
    );
};

export default function StatsOverview({ stats, title = 'Your Progress' }: Props) {
    const { colors, spacing, isDark } = useTheme();

    // Handle both UserStats (has streakDays) and TopicStats (doesn't)
    const displayStats = {
        averageScore: stats.averageScore || 0,
        examAttempts: stats.examAttempts || 0,
        questionsAnswered: stats.questionsAnswered || 0,
        studyTimeMinutes: stats.studyTimeMinutes || 0,
    };

    const statConfigs: StatConfig[] = [
        {
            icon: 'trophy',
            value: `${displayStats.averageScore}%`,
            label: 'Avg Score',
            gradientColors: ['#FFD54F', '#FFB300'],
            iconColor: '#F57F17',
        },
        {
            icon: 'file-text-o',
            value: displayStats.examAttempts,
            label: 'Exams',
            gradientColors: ['#64B5F6', '#1E88E5'],
            iconColor: '#0D47A1',
        },
        {
            icon: 'check-square-o',
            value: displayStats.questionsAnswered,
            label: 'Questions',
            gradientColors: ['#81C784', '#43A047'],
            iconColor: '#1B5E20',
        },
        {
            icon: 'clock-o',
            value: `${Math.floor(displayStats.studyTimeMinutes / 60)}h ${displayStats.studyTimeMinutes % 60}m`,
            label: 'Study Time',
            gradientColors: ['#FF8A65', '#F4511E'],
            iconColor: '#BF360C',
        },
    ];

    return (
        <View style={[styles.container, { marginBottom: spacing.lg }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {title}
            </Text>

            <View style={[styles.groupContainer, { backgroundColor: isDark ? colors.surface : '#FFFFFF' }]}>
                <View style={styles.statsRow}>
                    {statConfigs.map((config, index) => (
                        <StatItem key={index} config={config} />
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 12,
        marginLeft: 4,
        textTransform: 'uppercase',
        opacity: 0.6,
    },
    groupContainer: {
        borderRadius: 20,
        paddingVertical: 18,
        paddingHorizontal: 12,
        // Soft group shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    statContainer: {
        flex: 1,
        alignItems: 'center', // Vertical alignment
        paddingHorizontal: 2,
        cursor: 'pointer', // Web pointer
    },
    iconWrapper: {
        position: 'relative',
        marginBottom: 8,
    },
    iconGradient: {
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        // Subtle shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
    },
    iconShadow: {
        position: 'absolute',
        width: 26,
        height: 5,
        borderRadius: 50,
        bottom: -4,
        left: 5,
        opacity: 0.2,
        transform: [{ scaleX: 0.9 }],
    },
    statContent: {
        alignItems: 'center',
        marginTop: 2,
        width: '100%',
    },
    statValue: {
        fontSize: 15,
        fontWeight: '800',
        letterSpacing: 0.3,
        lineHeight: 20,
        marginBottom: 2,
        textAlign: 'center',
    },
    statLabel: {
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        opacity: 0.5,
        textAlign: 'center',
    },
});
