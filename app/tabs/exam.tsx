import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useLocalization } from '../../context/LocalizationContext';

export default function ExamScreen() {
    const router = useRouter();
    const { t } = useLocalization();

    const startExam = () => {
        router.push({ pathname: '/quiz', params: { mode: 'exam' } });
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#cb2d3e', '#ef473a']}
                style={styles.headerBackground}
            >
                <Text style={styles.headerTitle}>{t('examModeTitle')}</Text>
                <Text style={styles.headerSubtitle}>{t('examModeSubtitle')}</Text>
            </LinearGradient>

            <View style={styles.content}>
                <FontAwesome name="graduation-cap" size={80} color="#cb2d3e" style={{ opacity: 0.2, marginBottom: 20 }} />
                <Text style={styles.infoText}>{t('examModeInfo')}</Text>

                <TouchableOpacity style={styles.startButton} onPress={startExam}>
                    <Text style={styles.startText}>{t('startExam')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerBackground: {
        paddingTop: 80,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 5,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    infoText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 40,
        lineHeight: 24,
    },
    startButton: {
        backgroundColor: '#cb2d3e',
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#cb2d3e',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    startText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
