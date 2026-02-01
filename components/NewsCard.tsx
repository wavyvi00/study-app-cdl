import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Linking } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import { useLocalization } from '../context/LocalizationContext';
import type { NewsItem, NewsTag } from '../data/news';

interface NewsCardProps {
    item: NewsItem;
    initialExpanded?: boolean;
}

const TAG_COLORS: Record<NewsTag, { bg: string; text: string; bgDark: string; textDark: string }> = {
    Important: { bg: '#FEE2E2', text: '#DC2626', bgDark: '#7F1D1D', textDark: '#FCA5A5' },
    Upcoming: { bg: '#FEF3C7', text: '#D97706', bgDark: '#78350F', textDark: '#FCD34D' },
    General: { bg: '#DBEAFE', text: '#2563EB', bgDark: '#1E3A8A', textDark: '#93C5FD' },
};

export default function NewsCard({ item, initialExpanded = false }: NewsCardProps) {
    const [isExpanded, setIsExpanded] = useState(initialExpanded);
    const { colors, isDark } = useTheme();
    const { t } = useLocalization();

    const tagColors = TAG_COLORS[item.tag];
    const tagStyle = {
        backgroundColor: isDark ? tagColors.bgDark : tagColors.bg,
    };
    const tagTextStyle = {
        color: isDark ? tagColors.textDark : tagColors.text,
    };

    const formattedDate = new Date(item.updatedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <TouchableOpacity
            style={[
                styles.card,
                {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                },
            ]}
            onPress={() => setIsExpanded(!isExpanded)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}. ${item.summary}. Tap to ${isExpanded ? 'collapse' : 'expand'}`}
        >
            {/* Header Row */}
            <View style={styles.headerRow}>
                <View style={[styles.tag, tagStyle]}>
                    <Text style={[styles.tagText, tagTextStyle]}>
                        {t(`tag${item.tag}` as any) || item.tag}
                    </Text>
                </View>
                <Text style={[styles.date, { color: colors.textSecondary }]}>
                    {formattedDate}
                </Text>
            </View>

            {/* Title */}
            <Text style={[styles.title, { color: colors.text }]}>
                {item.title}
            </Text>

            {/* Summary */}
            <Text style={[styles.summary, { color: colors.textSecondary }]}>
                {item.summary}
            </Text>

            {/* Expanded Content */}
            {isExpanded && (
                <View style={[styles.expandedContent, { borderTopColor: colors.border }]}>
                    <Text style={[styles.fullContent, { color: colors.text }]}>
                        {item.fullContent}
                    </Text>
                    <View style={styles.sourceContainer}>
                        <Text style={[styles.sourceText, { color: colors.textSecondary }]}>
                            {t('source')}: {item.source}
                        </Text>
                        {item.link && (
                            <TouchableOpacity
                                onPress={() => Linking.openURL(item.link!)}
                                style={styles.linkButton}
                                accessibilityRole="link"
                                accessibilityLabel={`${t('readMore')} at ${item.source}`}
                            >
                                <Text style={styles.linkText}>{t('readMore')}</Text>
                                <FontAwesome name="external-link" size={12} color="#0284C7" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.authorRow}>
                        <FontAwesome name="check-circle" size={14} color={colors.primary} />
                        <Text style={[styles.authorText, { color: colors.textSecondary }]}>
                            {t('updatedByInstructors')}
                        </Text>
                    </View>
                </View>
            )}

            {/* Expand Indicator */}
            <View style={styles.expandIndicator}>
                <FontAwesome
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={12}
                    color={colors.textSecondary}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        ...Platform.select({
            web: {
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
            },
            default: {},
        }),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    tagText: {
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    date: {
        fontSize: 12,
        fontWeight: '500',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 6,
        lineHeight: 22,
    },
    summary: {
        fontSize: 14,
        lineHeight: 20,
    },
    expandedContent: {
        marginTop: 14,
        paddingTop: 14,
        borderTopWidth: 1,
    },
    fullContent: {
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 12,
    },
    sourceText: {
        fontSize: 13,
        marginBottom: 8,
        fontWeight: '600',
    },
    sourceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    linkButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: '#E0F2FE',
        borderRadius: 6,
    },
    linkText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#0284C7',
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    authorText: {
        fontSize: 12,
        fontWeight: '500',
        fontStyle: 'italic',
    },
    expandIndicator: {
        alignItems: 'center',
        marginTop: 8,
    },
});
