import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../../context/ThemeContext'; // Assuming this exists based on previous files
import { useEffect, useState, useCallback } from 'react';
import { loadStats, UserStats } from '../../data/stats';
import { ACHIEVEMENTS, Achievement } from '../../data/achievements';
import { useFocusEffect } from 'expo-router';

export default function AchievementsScreen() {
    const { isDark } = useTheme();
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

    const isUnlocked = (achievementId: string) => {
        return stats?.unlockedAchievements?.includes(achievementId) || false;
    };

    return (
        <View style={[styles.container, isDark && styles.darkContainer]}>
            <View style={styles.header}>
                <Text style={[styles.title, isDark && styles.darkText]}>Achievements</Text>
                <Text style={[styles.subtitle, isDark && styles.darkTextSecondary]}>
                    {stats?.unlockedAchievements?.length || 0} / {ACHIEVEMENTS.length} Unlocked
                </Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.list}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {ACHIEVEMENTS.map((achievement) => {
                    const unlocked = isUnlocked(achievement.id);
                    return (
                        <View key={achievement.id} style={[styles.card, isDark && styles.darkCard]}>
                            <LinearGradient
                                colors={unlocked ? ['#FFD54F', '#FFA000'] : isDark ? ['#424242', '#303030'] : ['#E0E0E0', '#BDBDBD']}
                                style={styles.iconContainer}
                            >
                                <FontAwesome
                                    name={achievement.icon as any}
                                    size={24}
                                    color={unlocked ? 'white' : '#757575'}
                                />
                            </LinearGradient>
                            <View style={styles.textContainer}>
                                <Text style={[styles.cardTitle, isDark && styles.darkText, !unlocked && styles.lockedText]}>
                                    {achievement.title}
                                </Text>
                                <Text style={[styles.cardDescription, isDark && styles.darkTextSecondary]}>
                                    {achievement.description}
                                </Text>
                            </View>
                            {unlocked && (
                                <FontAwesome name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: 60,
    },
    darkContainer: {
        backgroundColor: '#121212',
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    darkText: {
        color: '#FFFFFF',
    },
    darkTextSecondary: {
        color: '#AAAAAA',
    },
    list: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    darkCard: {
        backgroundColor: '#1E1E1E',
        shadowColor: 'transparent',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    lockedText: {
        color: '#9E9E9E',
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
    },
    checkIcon: {
        marginLeft: 10,
    }
});
