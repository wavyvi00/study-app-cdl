import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#1565C0',
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                }
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Topics',
                    tabBarIcon: ({ color }) => <FontAwesome name="list" size={24} color={color} />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="achievements"
                options={{
                    title: 'Awards',
                    tabBarIcon: ({ color }) => <FontAwesome name="trophy" size={24} color={color} />,
                    headerShown: false,
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
                    tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
