import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image, ActivityIndicator, useWindowDimensions, Linking } from 'react-native';
import { Redirect, useRouter, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SEO from '../components/seo/Head';
import { useLocalization } from '../context/LocalizationContext';

const ONBOARDING_KEY = 'onboarding_completed';

// --- Native Auth Check Logic ---
function NativeAuthCheck() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

    useEffect(() => {
        checkOnboarding();
    }, []);

    const checkOnboarding = async () => {
        try {
            const result = await AsyncStorage.getItem(ONBOARDING_KEY);
            if (result === 'true') {
                setHasSeenOnboarding(true);
            }
        } catch (e) {
            console.error('Error checking onboarding status:', e);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' }}>
                <ActivityIndicator size="large" color="#38bdf8" />
            </View>
        );
    }

    if (!hasSeenOnboarding) {
        return <Redirect href="/onboarding" />;
    }

    return <Redirect href="/tabs" />;
}

// --- Web Landing Page ---
function WebLandingPage() {
    const router = useRouter();
    const { t, locale, setLocale } = useLocalization();
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const navigateToApp = () => {
        router.push('/onboarding');
    };

    return (
        <View style={styles.container}>
            <SEO />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Navbar */}
                <View style={[styles.navbar, isMobile && styles.navbarMobile]}>
                    <View style={styles.navLogo}>
                        {/* Brand Icon: Wrapped in white box for contrast */}
                        <View style={styles.navLogoBox}>
                            <Image source={require('../assets/brand_logo.png')} style={styles.navLogoImg} />
                        </View>
                        <Text style={styles.navLogoText}>CDL ZERO</Text>
                    </View>
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

                        {!isMobile && (
                            <TouchableOpacity onPress={navigateToApp} style={styles.navLink}>
                                <Text style={styles.navLinkText}>{t('navPracticeNow')}</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity onPress={() => router.push('/auth/login')} style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>{t('logIn')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Hero Section - Solid Brand Blue */}
                <View style={styles.heroSection}>
                    <View style={styles.heroContent}>
                        <Text accessibilityRole="header" style={[styles.heroTitle, isMobile && styles.heroTitleMobile]}>
                            {t('heroTitle')}
                        </Text>
                        <Text style={styles.heroSubtitle}>
                            {t('heroSubtitle')}
                        </Text>

                        <TouchableOpacity
                            onPress={navigateToApp}
                            style={styles.ctaButton}
                            activeOpacity={0.9}
                            accessibilityRole="button"
                            accessibilityLabel="Start your free practice now"
                        >
                            <Text style={styles.ctaText}>{t('heroCta')}</Text>
                            <FontAwesome name="arrow-right" size={18} color="#0000a3" />
                        </TouchableOpacity>

                        <Text style={styles.trustText}>
                            <FontAwesome name="star" color="#ffd53d" /> {t('heroTrust')}
                        </Text>

                        <TouchableOpacity
                            onPress={() => Linking.openURL('https://apps.apple.com/us/app/cdl-zero-permit-practice/id6757250472')}
                            style={styles.appStoreButtonHero}
                            accessibilityRole="link"
                            accessibilityLabel="Download on the App Store"
                        >
                            <FontAwesome name="apple" size={24} color="#ffffff" />
                            <View>
                                <Text style={styles.appStoreSubtext}>Download on the</Text>
                                <Text style={styles.appStoreText}>App Store</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Social Proof / Stats Strip */}
                <View style={styles.statsStrip}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>10k+</Text>
                        <Text style={styles.statLabel}>{t('statActiveUsers')}</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>50+</Text>
                        <Text style={styles.statLabel}>{t('statStatesCovered')}</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>2025</Text>
                        <Text style={styles.statLabel}>{t('statUpdatedQA')}</Text>
                    </View>
                </View>

                {/* Features Grid - Clean Gray/White */}
                <View style={styles.featuresSection}>
                    <View style={styles.sectionHeader}>
                        <Text accessibilityRole="header" aria-level="2" style={styles.sectionTitle}>
                            {t('featuresTitle')}
                        </Text>
                        <Text style={styles.sectionSubtitle}>{t('featuresSubtitle')}</Text>
                    </View>

                    <View style={styles.gridContainer}>
                        {/* Card 1 */}
                        <View style={styles.featureCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#e3f2fd' }]}>
                                <Image source={require('../assets/images/onboarding/study.png')} style={styles.featureIconImg} />
                            </View>
                            <Text style={styles.featureTitle}>{t('feature1Title')}</Text>
                            <Text style={styles.featureDesc}>
                                {t('feature1Desc')}
                            </Text>
                        </View>

                        {/* Card 2 */}
                        <View style={styles.featureCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#fff8e1' }]}>
                                <Image source={require('../assets/images/onboarding/license.png')} style={styles.featureIconImg} />
                            </View>
                            <Text style={styles.featureTitle}>{t('feature2Title')}</Text>
                            <Text style={styles.featureDesc}>
                                {t('feature2Desc')}
                            </Text>
                        </View>

                        {/* Card 3 */}
                        <View style={styles.featureCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#e8f5e9' }]}>
                                <Image source={require('../assets/images/onboarding/trophy.png')} style={styles.featureIconImg} />
                            </View>
                            <Text style={styles.featureTitle}>{t('feature3Title')}</Text>
                            <Text style={styles.featureDesc}>
                                {t('feature3Desc')}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Call to Action Strip */}
                <View style={styles.ctaStrip}>
                    <View style={styles.ctaStripContent}>
                        <Text style={styles.ctaStripTitle}>{t('ctaStripTitle')}</Text>
                        <Text style={styles.ctaStripSubtitle}>{t('ctaStripSubtitle')}</Text>
                        <TouchableOpacity onPress={navigateToApp} style={styles.secondaryCtaButton}>
                            <Text style={styles.secondaryCtaText}>{t('ctaStripButton')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <View style={styles.footerContent}>
                        {/* Brand Column */}
                        <View style={styles.footerCol}>
                            <View style={styles.footerBrand}>
                                <Image source={require('../assets/brand_logo.png')} style={styles.footerLogo} />
                                <Text style={styles.footerBrandText}>CDL ZERO</Text>
                            </View>
                            <Text style={styles.footerTagline}>
                                {t('footerTagline')}
                            </Text>
                            <Text style={styles.copyright}>© 2025 CDL Zero. All rights reserved.</Text>
                        </View>

                        {/* Quick Links */}
                        <View style={styles.footerCol}>
                            <Text style={styles.footerHeading}>{t('footerCompany')}</Text>
                            <Link href="/privacy" style={styles.footerLink}>{t('privacyPolicy')}</Link>
                            <Link href="/terms" style={styles.footerLink}>{t('termsOfService')}</Link>
                            <TouchableOpacity style={styles.footerLinkWrapper}>
                                <Text style={styles.footerLink}>{t('footerAboutUs')}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Support */}
                        <View style={styles.footerCol}>
                            <Text style={styles.footerHeading}>{t('footerSupport')}</Text>
                            <Link href="/help" style={styles.footerLink}>{t('footerHelpCenter')}</Link>
                            <Link href="/contact" style={styles.footerLink}>{t('footerContactSupport')}</Link>
                            <TouchableOpacity onPress={() => Linking.openURL('https://apps.apple.com/us/app/cdl-zero-permit-practice/id6757250472')} style={styles.footerLinkWrapper}>
                                <Text style={styles.footerLink}>Download on App Store</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Socials */}
                        <View style={styles.footerCol}>
                            <Text style={styles.footerHeading}>{t('footerConnect')}</Text>
                            <View style={styles.socialRow}>
                                <TouchableOpacity style={styles.socialBtn}>
                                    <FontAwesome name="facebook-square" size={24} color="#64748b" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialBtn}>
                                    <FontAwesome name="twitter" size={24} color="#64748b" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialBtn}>
                                    <FontAwesome name="instagram" size={24} color="#64748b" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

export default function Index() {
    if (Platform.OS === 'web') {
        return <WebLandingPage />;
    } else {
        return <NativeAuthCheck />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContent: {
        flexGrow: 1,
    },
    // Navbar - Now White with Blue Branding
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Platform.select({ web: 40, default: 20 }),
        paddingVertical: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9', // Slate-100
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
        backgroundColor: '#1E3A8A', // Navy 900
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navLogoImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        tintColor: '#fff', // Make logo white
    },
    navLogoText: {
        color: '#0F172A', // Slate-900
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
        paddingHorizontal: 16,
    },
    navLinkText: {
        color: '#475569', // Slate-600
        fontWeight: '600',
        fontSize: 15,
    },
    // Language Selector
    langSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9', // Slate-100
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
        color: '#94A3B8', // Slate-400
        fontSize: 12,
        fontWeight: '700',
    },
    langTextActive: {
        color: '#0284C7', // Sky-600
        fontWeight: '800',
    },
    langDivider: {
        width: 1,
        height: 12,
        backgroundColor: '#CBD5E1', // Slate-300
    },
    loginButton: {
        backgroundColor: '#E0F2FE', // Sky-100
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#BAE6FD', // Sky-200
    },
    loginButtonText: {
        color: '#0284C7', // Sky-600
        fontWeight: '700',
        fontSize: 14,
    },

    // Hero - Light & Clean
    heroSection: {
        paddingVertical: 100,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8FAFC', // Slate-50
    },
    heroContent: {
        maxWidth: 900,
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: Platform.select({ web: 64, default: 42 }),
        fontWeight: '900',
        color: '#0F172A', // Slate-900
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: Platform.select({ web: 72, default: 50 }),
        letterSpacing: -1.5,
    },
    heroTitleMobile: {
        fontSize: 36,
        lineHeight: 44,
    },
    heroSubtitle: {
        fontSize: 20,
        color: '#334155', // Slate 700
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 30,
        maxWidth: 600,
    },
    ctaButton: {
        backgroundColor: '#1E3A8A', // Navy 900
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 24,
        marginBottom: 24,
        shadowColor: "#1E3A8A", // Navy 900
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
    },
    ctaText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    trustText: {
        color: '#64748B', // Slate-500
        fontSize: 14,
        fontWeight: '500',
    },

    // Stats Strip - Clean White
    statsStrip: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        gap: 60,
        flexWrap: 'wrap',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 48,
        fontWeight: '800',
        color: '#1E3A8A', // Navy 900
        marginBottom: 8,
        letterSpacing: -1,
    },
    statLabel: {
        fontSize: 13,
        color: '#64748B', // Slate-500
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: '#E2E8F0', // Slate-200
    },

    // Features Section
    featuresSection: {
        paddingVertical: 100,
        paddingHorizontal: 24,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    sectionHeader: {
        marginBottom: 80,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 36,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 16,
        letterSpacing: -1,
    },
    sectionSubtitle: {
        fontSize: 18,
        color: '#64748B',
        maxWidth: 500,
        textAlign: 'center',
        lineHeight: 28,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 32,
        maxWidth: 1200,
        width: '100%',
    },
    featureCard: {
        backgroundColor: '#ffffff',
        padding: 40,
        borderRadius: 24,
        width: '100%',
        maxWidth: 360,
        minWidth: 300,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#F1F5F9', // Very subtle border
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
        backgroundColor: '#EFF6FF', // Blue 50
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    featureIconImg: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    featureTitle: {
        color: '#0F172A',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 12,
        letterSpacing: -0.5,
    },
    featureDesc: {
        color: '#64748B', // Slate-500
        fontSize: 16,
        lineHeight: 26,
    },

    // CTA Strip
    ctaStrip: {
        backgroundColor: '#0F172A', // Slate-900 (High Contrast)
        paddingVertical: 80,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    ctaStripContent: {
        alignItems: 'center',
        maxWidth: 700,
    },
    ctaStripTitle: {
        fontSize: 36,
        fontWeight: '800',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 16,
        letterSpacing: -1,
    },
    ctaStripSubtitle: {
        fontSize: 18,
        color: '#94A3B8', // Slate-400
        textAlign: 'center',
        marginBottom: 40,
    },
    secondaryCtaButton: {
        backgroundColor: '#1E3A8A', // Navy 900
        paddingVertical: 18,
        paddingHorizontal: 32,
        borderRadius: 12,
        shadowColor: "#1E3A8A", // Navy 900
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 6,
    },
    secondaryCtaText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 16,
    },

    // Footer - Clean White
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
    footerTagline: {
        color: '#64748B',
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 24,
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
    socialRow: {
        flexDirection: 'row',
        gap: 16,
    },
    socialBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F1F5F9', // Slate-100
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    // App Store Button Styles
    appStoreButtonHero: {
        backgroundColor: '#000000',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        gap: 12,
        marginTop: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    appStoreSubtext: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: '500',
    },
    appStoreText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 20,
    }
});
