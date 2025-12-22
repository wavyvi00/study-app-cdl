import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    icon?: React.ReactNode;
}

export default function Button({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
    style,
    textStyle,
    icon,
}: ButtonProps) {
    const { colors, spacing, radius, typography } = useTheme();

    const getBackgroundColor = () => {
        if (disabled) return colors.border;
        switch (variant) {
            case 'secondary': return colors.secondary;
            case 'accent': return colors.highlight;
            case 'ghost': return 'transparent';
            case 'outline': return 'transparent';
            default: return colors.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return colors.textSecondary;
        switch (variant) {
            case 'accent': return '#0000a3'; // Deep blue on yellow
            case 'ghost': return colors.secondary;
            case 'outline': return colors.primary;
            default: return '#FFFFFF';
        }
    };

    const content = (
        <React.Fragment>
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <>
                    {icon}
                    <Text style={[
                        styles.text,
                        { color: getTextColor(), fontSize: typography.md, marginLeft: icon ? spacing.sm : 0 },
                        textStyle
                    ]}>
                        {title}
                    </Text>
                </>
            )}
        </React.Fragment>
    );

    const containerStyle = [
        styles.container,
        {
            borderRadius: radius.xl,
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.xl,
            borderWidth: variant === 'outline' ? 1 : 0,
            borderColor: variant === 'outline' ? colors.primary : 'transparent',
            backgroundColor: (variant === 'primary' && !disabled) ? 'transparent' : getBackgroundColor(),
        },
        style
    ];

    if (variant === 'primary' && !disabled) {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                activeOpacity={0.8}
                style={style}
            >
                <LinearGradient
                    colors={colors.headerGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.container, { borderRadius: radius.xl, paddingVertical: spacing.md, paddingHorizontal: spacing.xl }]}
                >
                    {content}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
            style={containerStyle}
        >
            {content}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '600',
        textAlign: 'center',
    },
});
