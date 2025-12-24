import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useLocalization } from '../../context/LocalizationContext';
import { View, Text, Platform, StyleSheet } from 'react-native';

// Custom Tab Icon Component with "Pill" design
function TabBarIcon({ name, focused, label }: { name: React.ComponentProps<typeof FontAwesome>['name']; focused: boolean; label: string }) {
    const { colors, typography } = useTheme();

    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            top: 10, // Push down slightly
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.surface, // Individual card background
                // Shadow for the button
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 4,
            }}>
                <FontAwesome
                    name={name}
                    size={24}
                    color={focused ? colors.primary : colors.textSecondary}
                />
            </View>
            {/* Optional: Small label below the bubble if desired, or keep clean */}
        </View>
    );
}

export default function TabLayout() {
    const { colors, isDark } = useTheme();
    const { t } = useLocalization();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                headerShown: false,
                tabBarShowLabel: false, // We render label inside icon
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 18,
                    left: 20,
                    right: 20,
                    backgroundColor: 'transparent',
                    elevation: 0,
                    height: 80,
                    borderRadius: 0,
                    borderTopWidth: 0,
                    paddingBottom: 0,
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: t('topics'),
                    tabBarIcon: ({ focused }) => <TabBarIcon name="list" focused={focused} label={t('topics')} />,
                }}
            />
            <Tabs.Screen
                name="achievements"
                options={{
                    title: t('awards'),
                    tabBarIcon: ({ focused }) => <TabBarIcon name="trophy" focused={focused} label={t('awards')} />,
                }}
            />
            <Tabs.Screen
                name="practice"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="exam"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: t('profile'),
                    tabBarIcon: ({ focused }) => <TabBarIcon name="user" focused={focused} label={t('profile')} />,
                }}
            />
        </Tabs >
    );
}
