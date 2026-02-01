import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import { useLocalization } from '../context/LocalizationContext';
import NewsFeed from '../components/NewsFeed';

export default function UpdatesScreen() {
    const { colors } = useTheme();
    const { t } = useLocalization();
    const router = useRouter();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#F8FAFC' }]} edges={['top', 'left', 'right']}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={20} color="#0F172A" />
                    <Text style={styles.backText}>{t('back')}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('cdlUpdates')}</Text>
                <View style={{ width: 60 }} /> {/* Spacer for balance */}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.contentContainer}>
                    <NewsFeed showHeader={false} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 8,
    },
    backText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0F172A',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    scrollContent: {
        paddingVertical: 24,
    },
    contentContainer: {
        maxWidth: 800,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 16,
    },
});
