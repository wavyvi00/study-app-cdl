import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import { useLocalization } from '../context/LocalizationContext';
import SEO from '../components/seo/Head';

const TERMS_URL = 'https://sites.google.com/view/cdlzerotos/home';

export default function TermsScreen() {
    const router = useRouter();
    const { isDark } = useTheme();
    const { t } = useLocalization();

    const openExternalTerms = () => {
        Linking.openURL(TERMS_URL);
    };

    return (
        <View style={[styles.container, isDark && styles.darkContainer]}>
            <SEO title="Terms of Service - CDL Zero" />
            <LinearGradient
                colors={['#0000a3', '#0000a3']} // Solid Brand Blue
                style={styles.header}
            >
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} accessibilityRole="header" aria-level="1">{t('termsTitle')}</Text>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={[styles.section, isDark && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, isDark && styles.darkText]} accessibilityRole="header" aria-level="2">{t('termsAcceptanceTitle')}</Text>
                    <Text style={[styles.text, isDark && styles.darkSubText]}>
                        {t('termsAcceptanceText')}
                    </Text>
                </View>

                <View style={[styles.section, isDark && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, isDark && styles.darkText]}>{t('termsEducationalTitle')}</Text>
                    <Text style={[styles.text, isDark && styles.darkSubText]}>
                        {t('termsEducationalText')}
                    </Text>
                </View>

                <View style={[styles.section, isDark && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, isDark && styles.darkText]}>{t('termsIPTitle')}</Text>
                    <Text style={[styles.text, isDark && styles.darkSubText]}>
                        {t('termsIPText')}
                    </Text>
                </View>

                <View style={[styles.section, isDark && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, isDark && styles.darkText]}>{t('termsUserConductTitle')}</Text>
                    <Text style={[styles.text, isDark && styles.darkSubText]}>
                        {t('termsUserConductText')}
                    </Text>
                </View>

                <View style={[styles.section, isDark && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, isDark && styles.darkText]}>{t('termsDisclaimerTitle')}</Text>
                    <Text style={[styles.text, isDark && styles.darkSubText]}>
                        {t('termsDisclaimerText')}
                    </Text>
                </View>

                <View style={[styles.section, isDark && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, isDark && styles.darkText]}>{t('termsLiabilityTitle')}</Text>
                    <Text style={[styles.text, isDark && styles.darkSubText]}>
                        {t('termsLiabilityText')}
                    </Text>
                </View>

                <View style={[styles.section, isDark && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, isDark && styles.darkText]}>{t('termsChangesTitle')}</Text>
                    <Text style={[styles.text, isDark && styles.darkSubText]}>
                        {t('termsChangesText')}
                    </Text>
                </View>

                <View style={[styles.section, isDark && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, isDark && styles.darkText]}>{t('termsContactTitle')}</Text>
                    <Text style={[styles.text, isDark && styles.darkSubText]}>
                        {t('termsContactText')}
                    </Text>
                </View>

                {/* External Terms Link */}
                <TouchableOpacity
                    style={[styles.externalLink, isDark && styles.darkExternalLink]}
                    onPress={openExternalTerms}
                    accessibilityLabel={t('viewFullTerms')}
                    accessibilityRole="link"
                >
                    <FontAwesome name="external-link" size={18} color={isDark ? '#6ea8fe' : '#3b5998'} />
                    <Text style={[styles.externalLinkText, isDark && styles.darkExternalLinkText]}>
                        {t('viewFullTerms')}
                    </Text>
                </TouchableOpacity>

                <Text style={[styles.footer, isDark && styles.darkFooterText]}>{t('lastUpdated')}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff', // Match index.tsx
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0000a3',
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
    },
    content: {
        padding: 20,
        maxWidth: 800,
        alignSelf: 'center',
        width: '100%',
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 8,
    },
    text: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 24,
    },
    footer: {
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: 13,
        marginTop: 20,
        marginBottom: 40,
    },
    externalLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eff6ff',
        borderRadius: 12,
        padding: 16,
        marginTop: 10,
        marginBottom: 10,
        gap: 10,
    },
    externalLinkText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0000a3',
    },
    // Dark mode styles
    darkContainer: {
        backgroundColor: '#1a1a2e',
    },
    darkSection: {
        backgroundColor: '#2a2a3e',
    },
    darkText: {
        color: '#f0f0f0',
    },
    darkSubText: {
        color: '#aaa',
    },
    darkFooterText: {
        color: '#666',
    },
    darkExternalLink: {
        backgroundColor: '#2a3a5e',
    },
    darkExternalLinkText: {
        color: '#6ea8fe',
    },
});
