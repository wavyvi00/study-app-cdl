import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../../context/ThemeContext';
import { useCallback, useState } from 'react';
import { loadStats, UserStats, INITIAL_STATS } from '../../data/stats';
import { ACHIEVEMENTS, Achievement } from '../../data/achievements';
import { useFocusEffect } from 'expo-router';
import Hoverable from '../../components/ui/Hoverable';
import Card from '../../components/ui/Card';

interface AchievementItemProps {
    achievement: Achievement;
    index: number;
    total: number;
    stats: UserStats | null;
    isDark: boolean;
    colors: any; // Type from ThemeContext
    spacing: any;
    radius: any;
    typography: any;
}

const AchievementItem = ({ achievement, index, total, stats, isDark, colors, spacing, radius, typography }: AchievementItemProps) => {
    const unlocked = stats?.unlockedAchievements?.includes(achievement.id) || false;
    const { current, target } = achievement.getProgress(stats || INITIAL_STATS);
    const progressPercent = Math.min((current / target) * 100, 100);
    const isStarted = progressPercent > 0;
    const isLast = index === total - 1;

    // Timeline styles
    const lineColor = unlocked ? '#4CAF50' : (isStarted ? '#2196F3' : (isDark ? '#333' : '#E0E0E0'));
    const markerSize = 32; // Increased for 44x44 touch target minimum

    return (
        <View style={styles.timelineRow}>
            {/* Timeline Column */}
            <View style={styles.timelineColumn}>
                {/* Upper Line */}
                <View style={[
                    styles.timelineLine,
                    {
                        backgroundColor: index === 0 ? 'transparent' : (unlocked ? '#4CAF50' : (isStarted ? '#2196F3' : (isDark ? '#333' : '#E0E0E0'))),
                        flex: 1
                    }
                ]} />

                {/* Marker */}
                <View style={[
                    styles.markerContainer,
                    {
                        width: markerSize,
                        height: markerSize,
                        borderRadius: markerSize / 2,
                        backgroundColor: unlocked ? '#4CAF50' : (isStarted ? '#2196F3' : (isDark ? '#333' : '#E0E0E0')),
                        borderColor: isDark ? colors.background : '#F5F5F5',
                        borderWidth: 4,
                        zIndex: 2,
                    }
                ]}>
                    {unlocked && <FontAwesome name="check" size={12} color="#FFF" />}
                    {!unlocked && isStarted && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFF' }} />}
                </View>

                {/* Lower Line */}
                <View style={[
                    styles.timelineLine,
                    {
                        backgroundColor: isLast ? 'transparent' : (unlocked ? '#4CAF50' : (isDark ? '#333' : '#E0E0E0')), // Only green if NEXT is also unlocked (simplified here, ideally checks next state)
                        flex: 1
                    }
                ]} />
            </View>

            {/* Content Column */}
            <Hoverable style={{ flex: 1, paddingBottom: spacing.xl }}>
                {({ hovered }) => (
                    <Card
                        style={[
                            styles.contentCard,
                            {
                                backgroundColor: isDark ? colors.surface : '#FFFFFF',
                                opacity: unlocked || isStarted ? 1 : 0.6,
                                transform: [{ scale: hovered ? 1.02 : 1 }],
                                marginLeft: spacing.md,
                            }
                        ]}
                        padding="md"
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                            {unlocked ? (
                                <FontAwesome name={achievement.icon as any} size={16} color="#4CAF50" style={{ marginRight: 8 }} />
                            ) : (
                                <FontAwesome name={achievement.icon as any} size={16} color={isDark ? '#757575' : '#9E9E9E'} style={{ marginRight: 8 }} />
                            )}
                            <Text style={[styles.cardTitle, { color: colors.text, fontSize: typography.md }]}>
                                {achievement.title}
                            </Text>
                        </View>

                        <Text style={[styles.cardDescription, { color: colors.textSecondary, fontSize: typography.sm }]}>
                            {achievement.description}
                        </Text>

                        {(isStarted || unlocked) && (
                            <View style={styles.progressContainer}>
                                <View style={[styles.progressBar, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
                                    <View style={[
                                        styles.progressFill,
                                        {
                                            width: `${progressPercent}%`,
                                            backgroundColor: unlocked ? '#4CAF50' : '#2196F3'
                                        }
                                    ]} />
                                </View>
                                <Text style={[styles.progressText, { color: colors.textSecondary }]}>{current}/{target}</Text>
                            </View>
                        )}
                    </Card>
                )}
            </Hoverable>
        </View>
    );
};

export default function AchievementsScreen() {
    const { colors, spacing, radius, typography, isDark } = useTheme();
    const [stats, setStats] = useState<UserStats | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchStats = async () => {
        const data = await loadStats();
        setStats(data);
    };

    useFocusEffect(
        useCallback(() => {
            fetchStats();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchStats();
        setRefreshing(false);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <LinearGradient
                colors={colors.headerGradient}
                style={[styles.headerBackground, { paddingTop: 60, paddingBottom: 50, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }]}
            >
                <Text style={styles.headerLabel}>YOUR MILESTONES</Text>
                <Text style={[styles.headerTitle, { color: '#FFFFFF', fontSize: typography.xxl }]}>ROAD TO SUCCESS</Text>
                <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.85)', fontSize: typography.md }]}>
                    {stats?.unlockedAchievements?.length || 0} OF {ACHIEVEMENTS.length} MILESTONES REACHED
                </Text>
            </LinearGradient>

            <ScrollView
                contentContainerStyle={[styles.list, { padding: spacing.lg }]}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
            >
                <View style={styles.timelineContainer}>
                    {/* Continuous Road Line Background (optional, or built by segments) */}
                    {ACHIEVEMENTS.map((achievement, index) => (
                        <AchievementItem
                            key={achievement.id}
                            achievement={achievement}
                            index={index}
                            total={ACHIEVEMENTS.length}
                            stats={stats}
                            isDark={isDark}
                            colors={colors}
                            spacing={spacing}
                            radius={radius}
                            typography={typography}
                        />
                    ))}
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    list: {
        paddingTop: 20,
    },
    timelineContainer: {
        paddingLeft: 10,
    },
    timelineRow: {
        flexDirection: 'row',
        minHeight: 100, // Ensure minimum height for visual spacing
    },
    timelineColumn: {
        alignItems: 'center',
        width: 40,
        marginRight: 0,
    },
    timelineLine: {
        width: 4,
        borderRadius: 2,
    },
    markerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: -2, // Pull markers slightly to close gaps if needed, or keeping it clean
    },
    contentCard: {
        marginBottom: 0, // Handled by paddingBottom in container
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontWeight: '700',
        flex: 1,
    },
    cardDescription: {
        marginBottom: 8,
        lineHeight: 18,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    progressBar: {
        flex: 1,
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',
        marginRight: 8,
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 11,
        fontWeight: '600',
        fontVariant: ['tabular-nums'],
    },
});
