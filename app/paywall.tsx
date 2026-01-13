
/**
 * Paywall Screen (Trust/Light Theme Redesign)
 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    Alert,
    StatusBar,
    Linking,
    ActivityIndicator,
    useWindowDimensions,
} from 'react-native';
import { PurchasesPackage } from 'react-native-purchases';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import { useLocalization } from '../context/LocalizationContext';
import { useSubscription } from '../context/SubscriptionContext';
import { useAuth } from '../context/AuthContext';
import { PremiumIcon } from '../components/icons/PremiumIcon';

export default function PaywallScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const { t } = useLocalization();
    const { questionsAnsweredTotal, purchase, restore, offerings, isLoading } = useSubscription();
    const auth = useAuth();
    const { from } = useLocalSearchParams();
    const [viewPlans, setViewPlans] = React.useState(false);

    // CDL Zero Brand Palette (Matches ThemeContext)
    // Using 'blueGrotto' (#0067b3) as primary for Trust/Brand alignment
    // Using 'aquamarine' (#40b0df) for accent/highlights
    const TRUST_THEME = {
        background: '#FFFFFF',
        surface: '#F8FAFC',
        primary: '#0067b3', // CDL Blue Grotto
        primaryLight: '#E0F2FE', // Very light blue for backgrounds
        accent: '#40b0df', // CDL Aquamarine
        text: '#0F172A', // Dark Slate
        textSecondary: '#64748B',
        border: '#E2E8F0',
        success: '#10B981',
    };

    // Safe navigation helper
    const safeGoBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/tabs');
        }
    };

    const handleClose = () => {
        if (from === 'quiz') {
            router.navigate('/tabs');
        } else {
            safeGoBack();
        }
    };

    const handlePurchase = async (packageToBuy: PurchasesPackage) => {
        try {
            await purchase(packageToBuy);
            safeGoBack();
        } catch (error: any) {
            console.error('[Paywall] Purchase error:', error);
            if (!error.userCancelled) {
                Alert.alert('Error', error.message || 'Purchase failed');
            }
        }
    };

    const handleRestore = async () => {
        try {
            await restore();
            Alert.alert('Success', 'Purchases restored successfully!');
            safeGoBack();
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Restore failed');
        }
    };

    const features = [
        { icon: 'check-circle' as const, text: t('unlimitedPractice') },
        { icon: 'book' as const, text: t('allStudyGuides') },
        { icon: 'trophy' as const, text: t('allExamModes') },
        { icon: 'globe' as const, text: t('allLanguages') },
    ];

    // Auth Gate
    if (!auth?.isAuthenticated && !viewPlans) {
        if (auth?.isLoading) {
            return (
                <View style={[styles.container, { backgroundColor: TRUST_THEME.background, justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="large" color={TRUST_THEME.primary} />
                </View>
            );
        }

        return (
            <View style={[styles.container, { backgroundColor: TRUST_THEME.background }]}>
                <StatusBar barStyle="dark-content" />

                <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                    <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                        <FontAwesome name="times" size={24} color={TRUST_THEME.textSecondary} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
                    <View style={[styles.iconCircle, { backgroundColor: TRUST_THEME.primaryLight }]}>
                        <FontAwesome name="lock" size={40} color={TRUST_THEME.primary} />
                    </View>
                    <Text style={[styles.headerTitle, { color: TRUST_THEME.text, marginTop: 24 }]}>
                        {t('createProfile')}
                    </Text>
                    <Text style={[styles.headerSubtitle, { color: TRUST_THEME.textSecondary, marginTop: 12 }]}>
                        Create a free account to back up your progress and unlock Pro features across all your devices.
                    </Text>

                    <TouchableOpacity
                        style={[styles.primaryButton, { backgroundColor: TRUST_THEME.primary, marginTop: 32 }]}
                        onPress={() => router.push('/auth/signup')}
                    >
                        <Text style={styles.primaryButtonText}>{t('getStarted')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginTop: 20, padding: 8 }}
                        onPress={() => router.push('/auth/login')}
                    >
                        <Text style={{ color: TRUST_THEME.primary, fontWeight: '600' }}>
                            Sign In
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginTop: 12, padding: 8 }}
                        onPress={() => setViewPlans(true)}
                    >
                        <Text style={{ color: TRUST_THEME.textSecondary, fontSize: 14 }}>
                            View Plans
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (isLoading || !offerings) {
        return (
            <View style={[styles.container, { backgroundColor: TRUST_THEME.background, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={TRUST_THEME.primary} />
            </View>
        );
    }

    const packages = offerings.availablePackages || [];
    const getPriceString = (pkg: PurchasesPackage): string => {
        if (pkg.product?.priceString) return pkg.product.priceString;
        if ((pkg as any).rcBillingProduct?.currentPrice?.formattedPrice) return (pkg as any).rcBillingProduct.currentPrice.formattedPrice;
        return '';
    };

    const getPackageTitle = (pkg: PurchasesPackage): string => {
        const id = pkg.identifier.toLowerCase();
        if (id.includes('annual') || id.includes('yearly')) return t('yearly');
        if (id.includes('monthly')) return t('monthly');
        if (id.includes('lifetime')) return t('lifetime');
        return pkg.identifier;
    };

    const isBestValue = (pkg: PurchasesPackage): boolean => {
        const id = pkg.identifier.toLowerCase();
        return id.includes('annual') || id.includes('yearly');
    };

    const sortedPackages = [...packages].sort((a, b) => {
        const order = (pkg: PurchasesPackage) => {
            const id = pkg.identifier.toLowerCase();
            if (id.includes('annual') || id.includes('yearly')) return 0;
            if (id.includes('monthly')) return 1;
            if (id.includes('lifetime')) return 2;
            return 3;
        };
        return order(a) - order(b);
    });

    const isWideScreen = width > 768; // Simple breakpoint

    return (
        <View style={[styles.container, { backgroundColor: TRUST_THEME.background }]}>
            <StatusBar barStyle="dark-content" />

            <View style={[styles.header, { paddingTop: insets.top + 10, paddingBottom: 10 }]}>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                    <FontAwesome name="times" size={24} color={TRUST_THEME.textSecondary} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ alignItems: 'center', paddingHorizontal: 24 }}>
                    <View style={[styles.iconCircle, { backgroundColor: TRUST_THEME.primaryLight }]}>
                        <FontAwesome name="star" size={32} color={TRUST_THEME.primary} />
                    </View>

                    <Text style={[styles.headerTitle, { color: TRUST_THEME.text, marginTop: 20 }]}>
                        {t('unlockCDLZeroPro')}
                    </Text>
                    <Text style={[styles.headerSubtitle, { color: TRUST_THEME.textSecondary, marginTop: 8 }]}>
                        {t('freeTrialEnded').replace('{count}', String(questionsAnsweredTotal))}
                    </Text>

                    {/* Features Grid - Centered & Contained */}
                    <View style={styles.featuresCenterWrapper}>
                        <View style={styles.featuresContainer}>
                            {features.map((feature, index) => (
                                <View key={index} style={styles.featureRow}>
                                    <FontAwesome name={feature.icon as any} size={20} color={TRUST_THEME.primary} style={{ marginRight: 12 }} />
                                    <Text style={[styles.featureText, { color: TRUST_THEME.text }]}>
                                        {feature.text}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Pricing Cards */}
                <View style={[styles.pricingContainer, { paddingHorizontal: isWideScreen ? 100 : 20, maxWidth: 800, alignSelf: 'center', width: '100%' }]}>
                    {sortedPackages.map((pkg) => {
                        const best = isBestValue(pkg);
                        return (
                            <TouchableOpacity
                                key={pkg.identifier}
                                style={[
                                    styles.pricingCard,
                                    {
                                        borderColor: best ? TRUST_THEME.primary : TRUST_THEME.border,
                                        backgroundColor: best ? '#F0F9FF' : '#FFFFFF',
                                        shadowColor: '#000',
                                    },
                                    best && styles.pricingCardBest
                                ]}
                                onPress={() => handlePurchase(pkg)}
                                activeOpacity={0.9}
                            >
                                {best && (
                                    <View style={[styles.bestBadge, { backgroundColor: TRUST_THEME.primary }]}>
                                        <Text style={styles.bestBadgeText}>{t('bestValue')}</Text>
                                    </View>
                                )}

                                <View style={{ alignItems: 'center' }}>
                                    <Text style={[styles.periodText, { color: best ? TRUST_THEME.primary : TRUST_THEME.textSecondary }]}>
                                        {getPackageTitle(pkg)}
                                    </Text>
                                    <Text style={[styles.priceText, { color: TRUST_THEME.text }]}>
                                        {getPriceString(pkg)}
                                    </Text>
                                    {pkg.identifier.toLowerCase().includes('lifetime') && (
                                        <Text style={[styles.noteText, { color: TRUST_THEME.textSecondary }]}>{t('oneTimePayment')}</Text>
                                    )}
                                    {best && (
                                        <Text style={{ fontSize: 12, color: TRUST_THEME.success, marginTop: 4, fontWeight: '600' }}>
                                            {t('save')} 50%
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
                    <View style={styles.trustRow}>
                        <FontAwesome name="lock" size={14} color={TRUST_THEME.textSecondary} />
                        <Text style={{ color: TRUST_THEME.textSecondary, fontSize: 12, marginLeft: 6 }}>
                            Secure payment processed by Apple/Google
                        </Text>
                    </View>
                    <View style={[styles.trustRow, { marginTop: 4 }]}>
                        <FontAwesome name="check" size={14} color={TRUST_THEME.textSecondary} />
                        <Text style={{ color: TRUST_THEME.textSecondary, fontSize: 12, marginLeft: 6 }}>
                            Cancel anytime in settings
                        </Text>
                    </View>

                    <TouchableOpacity onPress={handleRestore} style={{ alignSelf: 'center', marginTop: 24, padding: 10 }}>
                        <Text style={{ color: TRUST_THEME.primary, fontSize: 14, fontWeight: '600' }}>
                            {t('restorePurchases')}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.legalRow}>
                        <Text
                            style={styles.legalText}
                            onPress={() => Linking.openURL('https://sites.google.com/view/cdlzeropermittest2026/home')}
                        >
                            {t('privacyPolicy')}
                        </Text>
                        <Text style={styles.legalText}> • </Text>
                        <Text
                            style={styles.legalText}
                            onPress={() => Linking.openURL('https://sites.google.com/view/cdlzerotos/home')}
                        >
                            {t('termsOfService')}
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        alignItems: 'flex-end',
    },
    closeButton: {
        padding: 8,
        backgroundColor: '#F1F5F9', // light gray circle
        borderRadius: 20,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 24,
    },
    featuresCenterWrapper: {
        width: '100%',
        alignItems: 'center', // Centers the container itself
        marginTop: 32,
    },
    featuresContainer: {
        width: 'auto', // Takes only needed width
        alignItems: 'flex-start', // Left aligns items inside
        minWidth: 200, // Minimum width so it's not too squeezed
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        // No full width here, so it hugs content or minWidth
    },
    featureText: {
        fontSize: 16,
        fontWeight: '500',
    },
    pricingContainer: {
        marginTop: 32,
        gap: 12,
    },
    pricingCard: {
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderWidth: 1,
        // Shadow for "Card" feel
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    pricingCardBest: {
        borderWidth: 2,
        shadowOpacity: 0.1,
        elevation: 4,
    },
    bestBadge: {
        position: 'absolute',
        top: -10,
        alignSelf: 'center',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    bestBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    periodText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    priceText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    noteText: {
        fontSize: 12,
        marginTop: 4,
    },
    primaryButton: {
        width: '100%',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    trustRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    legalRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    legalText: {
        fontSize: 12,
        color: '#94A3B8',
    }
});
