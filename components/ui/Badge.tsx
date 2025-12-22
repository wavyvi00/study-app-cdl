import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

type BadgeVariant = 'success' | 'warning' | 'info' | 'error' | 'default';

interface BadgeProps {
    label: string | number;
    variant?: BadgeVariant;
    style?: StyleProp<ViewStyle>;
    icon?: React.ReactNode;
}

export default function Badge({ label, variant = 'default', style, icon }: BadgeProps) {
    const { colors, spacing, radius, typography, isDark } = useTheme();

    const getColors = () => {
        switch (variant) {
            case 'success':
                return { bg: isDark ? '#1b5e20' : '#E8F5E9', text: isDark ? '#a5d6a7' : '#2E7D32' };
            case 'warning':
                return { bg: isDark ? '#f57f17' : '#FFF3E0', text: isDark ? '#fff' : '#EF6C00' };
            case 'error':
                return { bg: isDark ? '#b71c1c' : '#FFEBEE', text: isDark ? '#ef9a9a' : '#C62828' };
            case 'info':
                return { bg: isDark ? '#0d47a1' : '#E3F2FD', text: isDark ? '#90caf9' : '#1565C0' };
            default:
                return { bg: colors.border, text: colors.textSecondary };
        }
    };

    const { bg, text } = getColors();

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: bg,
                borderRadius: radius.sm,
                paddingHorizontal: spacing.sm,
                paddingVertical: 2,
            },
            style
        ]}>
            {icon && <View style={{ marginRight: 4 }}>{icon}</View>}
            <Text style={[styles.text, { color: text, fontSize: typography.xs }]}>
                {label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    text: {
        fontWeight: '700',
    },
});
