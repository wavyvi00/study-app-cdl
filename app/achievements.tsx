import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { loadStats, UserStats, INITIAL_STATS } from '../data/stats';
import { ACHIEVEMENTS } from '../data/achievements';
import { useLocalization } from '../context/LocalizationContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function AchievementsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { t } = useLocalization();
    const { isDark } = useTheme();
    const auth = useAuth();
    const [stats, setStats] = useState<UserStats>(INITIAL_STATS);

    useEffect(() => {
        loadStats(auth?.userId).then(setStats);
    }, [auth?.userId]);

    return (
        <View style={[styles.container, isDark && styles.darkContainer, { paddingTop: insets.top }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={20} color={isDark ? '#fff' : '#333'} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, isDark && styles.darkText]}>{t('achievements')}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.achievementsList}>
                    {ACHIEVEMENTS.map((ach) => {
                        const isUnlocked = stats.unlockedAchievements?.includes(ach.id);
                        const progress = ach.getProgress(stats);
                        const percentage = Math.min(100, Math.round((progress.current / progress.target) * 100));

                        const title = t(`achievement_${ach.id}_title` as any);
                        const desc = t(`achievement_${ach.id}_desc` as any);

                        return (
                            <View key={ach.id} style={[styles.achievementCard, isDark && styles.darkCard, !isUnlocked && styles.achievementCardLocked]}>
                                <View style={[styles.achievementIcon, isUnlocked ? styles.iconUnlocked : styles.iconLocked]}>
                                    <FontAwesome
                                        name={ach.icon as any}
                                        size={24}
                                        color={isUnlocked ? '#fff' : '#999'}
                                    />
                                </View>
                                <View style={styles.achievementContent}>
                                    <View style={styles.achievementHeader}>
                                        <Text style={[styles.achievementTitle, isDark && styles.darkText, !isUnlocked && styles.textLocked]}>
                                            {title}
                                        </Text>
                                        {isUnlocked && (
                                            <FontAwesome name="check-circle" size={16} color="#4CAF50" />
                                        )}
                                    </View>
                                    <Text style={[styles.achievementDesc, isDark && styles.darkSubText]}>{desc}</Text>

                                    {!isUnlocked && (
                                        <View style={styles.progressContainer}>
                                            <View style={[styles.progressBarBg, isDark && styles.darkProgressBg]}>
                                                <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
                                            </View>
                                            <Text style={[styles.progressText, isDark && styles.darkSubText]}>
                                                {progress.current} / {progress.target}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    darkContainer: {
        backgroundColor: '#1a1a2e',
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    backButton: {
        padding: 10,
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    achievementsList: {
        gap: 12,
    },
    achievementCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    darkCard: {
        backgroundColor: '#16213e',
    },
    achievementCardLocked: {
        opacity: 0.7,
        backgroundColor: '#f9f9f9',
    },
    achievementIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    iconUnlocked: {
        backgroundColor: '#FFC107',
    },
    iconLocked: {
        backgroundColor: '#e0e0e0',
    },
    achievementContent: {
        flex: 1,
    },
    achievementHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    achievementTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    textLocked: {
        color: '#666',
    },
    achievementDesc: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    darkText: {
        color: '#fff',
    },
    darkSubText: {
        color: '#aaa',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    progressBarBg: {
        flex: 1,
        height: 6,
        backgroundColor: '#eee',
        borderRadius: 3,
        overflow: 'hidden',
    },
    darkProgressBg: {
        backgroundColor: '#333',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#1565C0',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 10,
        color: '#999',
        fontWeight: '600',
    },
});
