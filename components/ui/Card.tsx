import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface CardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ children, style, padding = 'md' }: CardProps) {
    const { colors, radius, spacing, isDark } = useTheme();

    const getPadding = () => {
        switch (padding) {
            case 'none': return 0;
            case 'sm': return spacing.sm;
            case 'lg': return spacing.lg;
            default: return spacing.md;
        }
    };

    return (
        <View style={[
            styles.card,
            {
                backgroundColor: isDark ? colors.surface : '#FFFFFF',
                borderRadius: radius.lg,
                padding: getPadding(),
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isDark ? 0.3 : 0.05,
                shadowRadius: 8,
                borderColor: isDark ? colors.border : 'transparent',
                borderWidth: isDark ? 1 : 0,
            },
            style
        ]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        elevation: 2, // Android shadow
    },
});
