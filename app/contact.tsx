import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, Linking, useWindowDimensions } from 'react-native';
import { useRouter, Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SEO from '../components/seo/Head';
import { useLocalization } from '../context/LocalizationContext';

export default function ContactScreen() {
    const router = useRouter();
    const { t, locale, setLocale } = useLocalization();
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const navToHome = () => router.push('/');
    const handleEmailSupport = () => Linking.openURL('mailto:support@cdlzero.com');

    return (
        <View style={styles.container}>
            <SEO title="Contact Support - CDL Zero" description="Contact our support team for help with your CDL training app." />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Navbar (Reused from Index) */}
                <View style={[styles.navbar, isMobile && styles.navbarMobile]}>
                    <TouchableOpacity onPress={navToHome} style={styles.navLogo}>
                        <View style={styles.navLogoBox}>
                            <Image source={require('../assets/brand_logo.png')} style={styles.navLogoImg} />
                        </View>
                        <Text style={styles.navLogoText}>CDL ZERO</Text>
                    </TouchableOpacity>

                    <View style={styles.navActions}>
                        {/* Language Selector */}
                        <View style={styles.langSelector}>
                            <TouchableOpacity onPress={() => setLocale('en')} style={[styles.langBtn, locale === 'en' && styles.langBtnActive]}>
                                <Text style={[styles.langText, locale === 'en' && styles.langTextActive]}>EN</Text>
                            </TouchableOpacity>
                            <View style={styles.langDivider} />
                            <TouchableOpacity onPress={() => setLocale('es')} style={[styles.langBtn, locale === 'es' && styles.langBtnActive]}>
                                <Text style={[styles.langText, locale === 'es' && styles.langTextActive]}>ES</Text>
                            </TouchableOpacity>
                            <View style={styles.langDivider} />
                            <TouchableOpacity onPress={() => setLocale('ru')} style={[styles.langBtn, locale === 'ru' && styles.langBtnActive]}>
                                <Text style={[styles.langText, locale === 'ru' && styles.langTextActive]}>RU</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={navToHome} style={styles.navLink}>
                            <Text style={styles.navLinkText}>Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Hero / Header */}
                <View style={styles.heroSection}>
                    <Text accessibilityRole="header" style={[styles.heroTitle, isMobile && styles.heroTitleMobile]}>
                        Contact Support
                    </Text>
                    <Text style={styles.heroSubtitle}>
                        We're here to help! Reach out to us for any questions or issues.
                    </Text>
                </View>

                {/* Main Content */}
                <View style={styles.contentSection}>
                    <View style={styles.card}>
                        <View style={styles.iconBox}>
                            <FontAwesome name="envelope-o" size={32} color="#1E3A8A" />
                        </View>
                        <Text style={styles.cardTitle}>Email Us</Text>
                        <Text style={styles.cardText}>
                            For general inquiries and technical support, please email our team directly.
                        </Text>
                        <TouchableOpacity onPress={handleEmailSupport} style={styles.primaryBtn}>
                            <FontAwesome name="envelope" size={16} color="#fff" />
                            <Text style={styles.primaryBtnText}>support@cdlzero.com</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.card}>
                        <View style={[styles.iconBox, { backgroundColor: '#F0FDF4' }]}>
                            <FontAwesome name="clock-o" size={32} color="#15803d" />
                        </View>
                        <Text style={styles.cardTitle}>Response Time</Text>
                        <Text style={styles.cardText}>
                            We typically respond within 24-48 hours during business days.
                        </Text>
                    </View>
                </View>

                {/* Footer (Reused from Index) */}
                <View style={styles.footer}>
                    <View style={styles.footerContent}>
                        <View style={styles.footerCol}>
                            <View style={styles.footerBrand}>
                                <Image source={require('../assets/brand_logo.png')} style={styles.footerLogo} />
                                <Text style={styles.footerBrandText}>CDL ZERO</Text>
                            </View>
                            <Text style={styles.copyright}>© 2025 CDL Zero. All rights reserved.</Text>
                        </View>

                        <View style={styles.footerCol}>
                            <Text style={styles.footerHeading}>{t('footerCompany')}</Text>
                            <Link href="/privacy" style={styles.footerLink}>{t('privacyPolicy')}</Link>
                            <Link href="/terms" style={styles.footerLink}>{t('termsOfService')}</Link>
                        </View>

                        <View style={styles.footerCol}>
                            <Text style={styles.footerHeading}>{t('footerSupport')}</Text>
                            <Link href="/help" style={styles.footerLink}>{t('footerHelpCenter')}</Link>
                            <TouchableOpacity style={styles.footerLinkWrapper}>
                                <Text style={styles.footerLink}>{t('footerContactSupport')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContent: {
        flexGrow: 1,
    },
    // Navbar
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Platform.select({ web: 40, default: 20 }),
        paddingVertical: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    navbarMobile: {
        paddingHorizontal: 16,
    },
    navLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    navLogoBox: {
        width: 40,
        height: 40,
        backgroundColor: '#1E3A8A',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navLogoImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        tintColor: '#fff',
    },
    navLogoText: {
        color: '#0F172A',
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    navActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    navLink: {
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    navLinkText: {
        color: '#475569',
        fontWeight: '600',
        fontSize: 15,
    },
    // Language
    langSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        padding: 4,
        borderRadius: 8,
        marginRight: 8,
    },
    langBtn: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    langBtnActive: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    langText: {
        color: '#94A3B8',
        fontSize: 12,
        fontWeight: '700',
    },
    langTextActive: {
        color: '#0284C7',
        fontWeight: '800',
    },
    langDivider: {
        width: 1,
        height: 12,
        backgroundColor: '#CBD5E1',
    },

    // Hero
    heroSection: {
        paddingVertical: 80,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8FAFC',
    },
    heroTitle: {
        fontSize: 48,
        fontWeight: '900',
        color: '#0F172A',
        textAlign: 'center',
        marginBottom: 16,
        letterSpacing: -1,
    },
    heroTitleMobile: {
        fontSize: 32,
    },
    heroSubtitle: {
        fontSize: 18,
        color: '#64748B',
        textAlign: 'center',
        maxWidth: 600,
        lineHeight: 28,
    },

    // Content
    contentSection: {
        paddingVertical: 60,
        paddingHorizontal: 24,
        alignItems: 'center',
        gap: 32,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 40,
        borderRadius: 24,
        width: '100%',
        maxWidth: 500,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: "#64748B",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
        elevation: 4,
    },
    iconBox: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 12,
    },
    cardText: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 24,
    },
    primaryBtn: {
        backgroundColor: '#1E3A8A',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    primaryBtnText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },

    // Footer
    footer: {
        paddingTop: 80,
        paddingBottom: 40,
        paddingHorizontal: 40,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    footerContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        maxWidth: 1200,
        alignSelf: 'center',
        width: '100%',
        gap: 48,
    },
    footerCol: {
        flex: 1,
        minWidth: 200,
    },
    footerBrand: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    footerLogo: {
        width: 40,
        height: 40,
        borderRadius: 10,
    },
    footerBrandText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    copyright: {
        color: '#94A3B8',
        fontSize: 13,
    },
    footerHeading: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0F172A',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 20,
    },
    footerLink: {
        color: '#64748B',
        fontSize: 15,
        marginBottom: 14,
        fontWeight: '500',
    },
    footerLinkWrapper: {
        marginBottom: 0,
    },
});
