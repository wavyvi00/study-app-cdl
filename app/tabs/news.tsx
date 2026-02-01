import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../../context/ThemeContext';
import { useLocalization } from '../../context/LocalizationContext';
import NewsFeed from '../../components/NewsFeed';

export default function NewsScreen() {
    const { colors, isDark } = useTheme();
    const { t } = useLocalization();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>
                        {t('cdlUpdates')}
                    </Text>
                    <View style={styles.authorBadge}>
                        <FontAwesome name="check-circle" size={14} color={colors.primary} />
                        <Text style={[styles.authorText, { color: colors.textSecondary }]}>
                            {t('updatedByInstructors')}
                        </Text>
                    </View>
                </View>

                {/* News Feed */}
                <View style={styles.feedWrapper}>
                    <NewsFeed />
                </View>

                {/* Bottom spacing for tab bar */}
                <View style={{ height: 120 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 20,
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 24,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    authorBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    authorText: {
        fontSize: 13,
        fontWeight: '500',
    },
    feedWrapper: {
        paddingHorizontal: 4,
    },
});
