import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import SEO from '../components/seo/Head';

const PRIVACY_POLICY_URL = 'https://sites.google.com/view/cdlzeropermittest2026/home';

export default function PrivacyScreen() {
    const router = useRouter();
    const { isDark } = useTheme();

    const openExternalPolicy = () => {
        Linking.openURL(PRIVACY_POLICY_URL);
    };

    return (
        <View style={[styles.container, isDark && styles.darkContainer]}>
            <SEO title="Privacy Policy - CDL Zero" />
            <LinearGradient
                colors={['#0000a3', '#0000a3']} // Solid Brand Blue to match Index
                style={styles.header}
            >
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} accessibilityRole="header" aria-level="1">Privacy Policy</Text>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={[styles.section, isDark && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, isDark && styles.darkText]} accessibilityRole="header" aria-level="2">1. Data Collection</Text>
                    <Text style={[styles.text, isDark && styles.darkSubText]}>
                        This CDL Study App is designed as a standalone educational tool. We do not collect, store, or transmit any personal data to external servers. All progress, scores, and statistics are stored locally on your device.
                    </Text>
                </View>

                <View style={[styles.section, isDark && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, isDark && styles.darkText]} accessibilityRole="header" aria-level="2">2. Usage</Text>
                    <Text style={[styles.text, isDark && styles.darkSubText]}>
                        The information provided in this app is for study purposes only. While we strive for accuracy based on official CDL manuals, we cannot guarantee that the questions will exactly match your state's official exam. Always refer to your local DMV handbook.
                    </Text>
                </View>

                <View style={[styles.section, isDark && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, isDark && styles.darkText]} accessibilityRole="header" aria-level="2">3. Permissions</Text>
                    <Text style={[styles.text, isDark && styles.darkSubText]}>
                        This app requires no special permissions (such as camera, location, or contacts) to function.
                    </Text>
                </View>

                <View style={[styles.section, isDark && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, isDark && styles.darkText]} accessibilityRole="header" aria-level="2">4. Contact Us</Text>
                    <Text style={[styles.text, isDark && styles.darkSubText]}>
                        If you have any questions about this policy, please contact support.
                    </Text>
                </View>

                {/* External Privacy Policy Link */}
                <TouchableOpacity
                    style={[styles.externalLink, isDark && styles.darkExternalLink]}
                    onPress={openExternalPolicy}
                    accessibilityLabel="View full privacy policy online"
                    accessibilityRole="link"
                >
                    <FontAwesome name="external-link" size={18} color={isDark ? '#6ea8fe' : '#3b5998'} />
                    <Text style={[styles.externalLinkText, isDark && styles.darkExternalLinkText]}>
                        View Full Privacy Policy Online
                    </Text>
                </TouchableOpacity>

                <Text style={[styles.footer, isDark && styles.darkFooterText]}>Last updated: December 2025</Text>
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
        maxWidth: 800, // Limit width for readability on web
        alignSelf: 'center',
        width: '100%',
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        // Removed shadow for cleaner look matching index features
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b', // Slate 800
        marginBottom: 8,
    },
    text: {
        fontSize: 15,
        color: '#475569', // Slate 600
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
        backgroundColor: '#eff6ff', // Blue 50
        borderRadius: 12,
        padding: 16,
        marginTop: 10,
        marginBottom: 10,
        gap: 10,
    },
    externalLinkText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0000a3', // Brand Blue
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
