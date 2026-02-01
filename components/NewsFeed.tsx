import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useLocalization } from '../context/LocalizationContext';
import { getNewsItems, getNewsPreview, NewsItem } from '../data/news';
import NewsCard from './NewsCard';

interface NewsFeedProps {
    /** Limit number of items (for preview sections) */
    limit?: number;
    /** Show header with title */
    showHeader?: boolean;
    /** Custom header title key */
    headerTitleKey?: string;
}

export default function NewsFeed({
    limit,
    showHeader = false,
    headerTitleKey = 'latestUpdates'
}: NewsFeedProps) {
    const { colors } = useTheme();
    const { t } = useLocalization();

    const items: NewsItem[] = limit ? getNewsPreview(limit) : getNewsItems();

    if (items.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                    No updates available.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {showHeader && (
                <View style={styles.headerContainer}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>
                        {t(headerTitleKey as any)}
                    </Text>
                    <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                        {t('updatedByInstructors')}
                    </Text>
                </View>
            )}

            <View style={styles.feedContainer}>
                {items.map((item) => (
                    <NewsCard key={item.id} item={item} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    headerContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 6,
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: 14,
        fontWeight: '500',
    },
    feedContainer: {
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
        paddingHorizontal: Platform.select({ web: 0, default: 16 }),
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 14,
    },
});
