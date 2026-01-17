import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import SEO from '../components/seo/Head';

export default function HelpScreen() {
    const router = useRouter();
    const { isDark } = useTheme();

    const handleContactSupport = () => {
        Linking.openURL('mailto:support@cdlzero.com');
    };

    return (
        <View style={[styles.container, isDark && styles.darkContainer]}>
            <SEO title="Help Center - CDL Zero" description="Get help with CDL Zero. FAQs, support contact, and troubleshooting guides." />

            <LinearGradient
                colors={['#0000a3', '#0000a3']}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} accessibilityRole="header" aria-level="1">Help Center</Text>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Intro */}
                <View style={styles.introContainer}>
                    <Text style={[styles.introTitle, isDark && styles.darkText]}>How can we help you?</Text>
                    <Text style={[styles.introText, isDark && styles.darkSubText]}>
                        Browse our frequently asked questions or contact our support team directly.
                    </Text>
                </View>

                {/* FAQ Section */}
                <View style={[styles.section, isDark && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, isDark && styles.darkText]} accessibilityRole="header" aria-level="2">Frequently Asked Questions</Text>

                    <View style={styles.faqItem}>
                        <Text style={[styles.question, isDark && styles.darkText]}>Is CDL Zero free?</Text>
                        <Text style={[styles.answer, isDark && styles.darkSubText]}>
                            Yes! You can study for your CDL permit for free. We also offer a Pro subscription for unlimited practice, offline access, and an ad-free experience.
                        </Text>
                    </View>

                    <View style={styles.faqSeparator} />

                    <View style={styles.faqItem}>
                        <Text style={[styles.question, isDark && styles.darkText]}>How do I restore my purchase?</Text>
                        <Text style={[styles.answer, isDark && styles.darkSubText]}>
                            If you've previously purchased CDL Zero Pro, you can restore it by going to the Paywall/Upgrade screen and tapping "Restore Purchases" at the bottom.
                        </Text>
                    </View>

                    <View style={styles.faqSeparator} />

                    <View style={styles.faqItem}>
                        <Text style={[styles.question, isDark && styles.darkText]}>Can I use CDL Zero on multiple devices?</Text>
                        <Text style={[styles.answer, isDark && styles.darkSubText]}>
                            Yes. By creating a free account, your progress is synced across all your devices, including the web and mobile apps.
                        </Text>
                    </View>

                    <View style={styles.faqSeparator} />

                    <View style={styles.faqItem}>
                        <Text style={[styles.question, isDark && styles.darkText]}>How accurate are the questions?</Text>
                        <Text style={[styles.answer, isDark && styles.darkSubText]}>
                            Our questions are based on the official CDL manual for your state. However, the actual exam questions may vary, so we always recommend reading the official manual as well.
                        </Text>
                    </View>
                </View>

                {/* Contact Section */}
                <View style={[styles.section, isDark && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, isDark && styles.darkText]}>Still need help?</Text>
                    <Text style={[styles.text, isDark && styles.darkSubText]}>
                        Our team is ready to assist you with any technical issues or questions you might have.
                    </Text>

                    <TouchableOpacity
                        style={[styles.contactButton, isDark && styles.darkContactButton]}
                        onPress={handleContactSupport}
                        accessibilityRole="button"
                        accessibilityLabel="Contact Support"
                    >
                        <FontAwesome name="envelope" size={18} color="#ffffff" />
                        <Text style={styles.contactButtonText}>
                            Contact Support
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.footer, isDark && styles.darkFooterText]}>CDL Zero Support • Version 2.0.2</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc', // Light slate background for contrast
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0000a3',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    backButton: {
        marginRight: 15,
        padding: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
    },
    content: {
        padding: 24,
        maxWidth: 800,
        alignSelf: 'center',
        width: '100%',
    },
    introContainer: {
        marginBottom: 32,
        marginTop: 8,
    },
    introTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 8,
    },
    introText: {
        fontSize: 18,
        color: '#475569',
        lineHeight: 28,
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 20,
    },
    faqItem: {
        paddingVertical: 8,
    },
    faqSeparator: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 16,
    },
    question: {
        fontSize: 17,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 8,
    },
    answer: {
        fontSize: 16,
        color: '#475569',
        lineHeight: 26,
    },
    text: {
        fontSize: 16,
        color: '#475569',
        lineHeight: 26,
        marginBottom: 24,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0000a3',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        gap: 12,
        shadowColor: "#0000a3",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    contactButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
    },
    footer: {
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: 13,
        marginTop: 12,
        marginBottom: 40,
    },
    // Dark mode styles
    darkContainer: {
        backgroundColor: '#0f172a',
    },
    darkSection: {
        backgroundColor: '#1e293b',
        borderColor: '#334155',
    },
    darkText: {
        color: '#f1f5f9',
    },
    darkSubText: {
        color: '#cbd5e1',
    },
    darkFooterText: {
        color: '#64748b',
    },
    darkContactButton: {
        backgroundColor: '#3b82f6', // Brighter blue for dark mode
    },
});
