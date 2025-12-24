import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { View, Text, Platform, StyleSheet } from 'react-native';

// Custom Tab Icon Component with "Pill" design
function TabBarIcon({ name, focused, label }: { name: React.ComponentProps<typeof FontAwesome>['name']; focused: boolean; label: string }) {
    const { colors, typography } = useTheme();

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', top: Platform.OS === 'ios' ? 10 : 0 }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 20,
                backgroundColor: focused ? (colors.primary + '15') : 'transparent', // 15% opacity primary
            }}>
                <FontAwesome
                    name={name}
                    size={20}
                    color={focused ? colors.primary : colors.textSecondary}
                />
                {focused && (
                    <Text style={{
                        color: colors.primary,
                        marginLeft: 8,
                        fontWeight: '600',
                        fontSize: 12
                    }}>
                        {label}
                    </Text>
                )}
            </View>
        </View>
    );
}

export default function TabLayout() {
    const { colors, isDark } = useTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                headerShown: false,
                tabBarShowLabel: false, // We render label inside icon
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 5,
                    backgroundColor: colors.surface,
                    borderRadius: 25,
                    height: 70,
                    borderTopWidth: 0,
                    // Shadow for iOS
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 10,
                    paddingBottom: 0,
                }
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Topics',
                    tabBarIcon: ({ focused }) => <TabBarIcon name="list" focused={focused} label="Topics" />,
                }}
            />
            <Tabs.Screen
                name="achievements"
                options={{
                    title: 'Awards',
                    tabBarIcon: ({ focused }) => <TabBarIcon name="trophy" focused={focused} label="Awards" />,
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
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => <TabBarIcon name="user" focused={focused} label="Profile" />,
                }}
            />
        </Tabs>
    );
}
