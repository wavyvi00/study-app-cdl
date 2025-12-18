import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { UserStats } from '../data/stats';
import { useTheme } from '../context/ThemeContext';

interface Props {
    stats: UserStats;
}

export default function StatsOverview({ stats }: Props) {
    const { isDark } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.sectionTitle, isDark && styles.darkText]}>Your Progress</Text>
            <View style={styles.grid}>
                <View style={styles.cardContainer}>
                    <LinearGradient colors={['#FF9966', '#FF5E62']} style={styles.card}>
                        <FontAwesome name="trophy" size={12} color="white" style={styles.icon} />
                        <Text style={styles.value}>{stats.averageScore}%</Text>
                        <Text style={styles.label}>Avg</Text>
                    </LinearGradient>
                </View>

                <View style={styles.cardContainer}>
                    <LinearGradient colors={['#56CCF2', '#2F80ED']} style={styles.card}>
                        <FontAwesome name="pencil" size={12} color="white" style={styles.icon} />
                        <Text style={styles.value}>{stats.examAttempts}</Text>
                        <Text style={styles.label}>Exams</Text>
                    </LinearGradient>
                </View>

                <View style={styles.cardContainer}>
                    <LinearGradient colors={['#42275a', '#734b6d']} style={styles.card}>
                        <FontAwesome name="check-circle" size={12} color="white" style={styles.icon} />
                        <Text style={styles.value}>{stats.questionsAnswered}</Text>
                        <Text style={styles.label}>Done</Text>
                    </LinearGradient>
                </View>

                <View style={styles.cardContainer}>
                    <LinearGradient colors={['#11998e', '#38ef7d']} style={styles.card}>
                        <FontAwesome name="clock-o" size={12} color="white" style={styles.icon} />
                        <Text style={styles.value}>{Math.floor(stats.studyTimeMinutes / 60)}h</Text>
                        <Text style={styles.label}>Time</Text>
                    </LinearGradient>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 15,
        marginLeft: 4,
    },
    darkText: {
        color: '#f0f0f0',
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Changed to space-around for fixed small items
        paddingHorizontal: 10,
    },
    cardContainer: {
        width: 65,  // Fixed small width similar to topic icons
        height: 65, // Fixed height
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    card: {
        flex: 1,
        borderRadius: 12,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginBottom: 1,
        opacity: 0.9,
    },
    value: {
        fontSize: 14, // Micro font
        fontWeight: 'bold',
        color: 'white',
        lineHeight: 16,
    },
    label: {
        fontSize: 7, // Micro label
        color: 'rgba(255,255,255,0.9)',
        marginTop: 0,
        textAlign: 'center',
    }
});
