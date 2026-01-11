/**
 * Paywall Screen
 * 
 * Platform-specific purchase flow:
 * - iOS: Apple In-App Purchase via RevenueCat
 * - Android: Google Play Billing via RevenueCat  
 * - Web: RevenueCat Web Billing with Stripe
 * 
 * IMPORTANT: Authentication is required on ALL platforms before showing purchase options.
 * This ensures the purchase is bound to the user's account for cross-platform entitlement sync.
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
} from 'react-native';
import { PurchasesPackage } from 'react-native-purchases';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import { useLocalization } from '../context/LocalizationContext';
import { useSubscription } from '../context/SubscriptionContext';
import { useAuth } from '../context/AuthContext';
import { BackgroundShapes } from '../components/ui/BackgroundShapes';
import { PremiumIcon } from '../components/icons/PremiumIcon';
import { useWindowDimensions } from 'react-native';

export default function PaywallScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { colors, spacing } = useTheme();
    const { width, height } = useWindowDimensions();
    const { t } = useLocalization();
    const { questionsAnsweredTotal, purchase, restore, offerings, isLoading } = useSubscription();
    const auth = useAuth();

    const { from } = useLocalSearchParams();

    // Debug: Log offerings state
    if (__DEV__) {
        console.log('[Paywall] State:', {
            isLoading,
            hasOfferings: !!offerings,
            availablePackages: offerings?.availablePackages?.length ?? 0,
        });
    }


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

    /**
     * Handle purchase - uses RevenueCat package directly
     * The purchase() function from SubscriptionContext handles platform routing:
     * - iOS: Apple IAP
     * - Android: Google Play Billing
     * - Web: Stripe via RevenueCat Web SDK
     */
    const handlePurchase = async (packageToBuy: PurchasesPackage) => {
        try {
            if (__DEV__) {
                console.log('[Paywall] Initiating purchase for:', packageToBuy.identifier);
            }

            await purchase(packageToBuy);
            // On success, entitlement is updated via RevenueCat
            // SubscriptionContext refreshes state automatically
            safeGoBack();

        } catch (error: any) {
            console.error('[Paywall] Purchase error:', error);
            // Don't show alert for user cancellation
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

    // Feature list for the paywall
    const features = [
        { icon: 'check-circle' as const, text: t('unlimitedPractice') },
        { icon: 'book' as const, text: t('allStudyGuides') },
        { icon: 'trophy' as const, text: t('allExamModes') },
        { icon: 'language' as const, text: t('allLanguages') },
    ];

    // ==================================================================
    // AUTHENTICATION GATE - ALL PLATFORMS
    // Users must be authenticated to purchase. This ensures:
    // 1. Purchase is bound to their RevenueCat appUserID
    // 2. Entitlement syncs across all platforms
    // ==================================================================
    if (!auth?.isAuthenticated) {
        if (auth?.isLoading) {
            return (
                <View style={[styles.container, { backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center' }]}>
                    <LinearGradient
                        colors={['#0a0a23', '#1a1a3a', '#0000a3']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFill}
                    />
                    <ActivityIndicator size="large" color="#38bdf8" />
                </View>
            );
        }

        // Show authentication required screen
        return (
            <View style={[styles.container, { backgroundColor: '#0f172a' }]}>
                <StatusBar barStyle="light-content" />
                <LinearGradient
                    colors={['#0a0a23', '#1a1a3a', '#0000a3']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
                <BackgroundShapes width={width} height={height} />

                <View style={[styles.header, { paddingTop: insets.top + 10, paddingBottom: 10 }]}>
                    <TouchableOpacity
                        onPress={handleClose}
                        style={styles.closeButton}
                        accessibilityLabel={t('close')}
                    >
                        <FontAwesome name="times" size={24} color="rgba(255,255,255,0.7)" />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
                    <PremiumIcon />
                    <Text style={[styles.headerTitle, { marginTop: 16, fontSize: 26 }]}>
                        Account Required
                    </Text>
                    <Text style={[styles.headerSubtitle, { marginTop: 12, fontSize: 16, textAlign: 'center', maxWidth: 320 }]}>
                        Create an account to save your progress and unlock CDL ZERO Pro on all your devices.
                    </Text>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#38bdf8',
                            paddingHorizontal: 32,
                            paddingVertical: 16,
                            borderRadius: 12,
                            marginTop: 32,
                        }}
                        onPress={() => router.push('/auth/signup')}
                    >
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
                            Create Account
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginTop: 16, padding: 8 }}
                        onPress={() => router.push('/auth/login')}
                    >
                        <Text style={{ color: '#38bdf8', fontSize: 14 }}>
                            Already have an account? Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // ==================================================================
    // LOADING STATE
    // ==================================================================
    if (isLoading || !offerings) {
        return (
            <View style={[styles.container, { backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center' }]}>
                <LinearGradient
                    colors={['#0a0a23', '#1a1a3a', '#0000a3']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
                <ActivityIndicator size="large" color="#38bdf8" />
                <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>
                    Loading prices...
                </Text>
            </View>
        );
    }

    // ==================================================================
    // MAIN PAYWALL UI
    // Prices come from RevenueCat offerings (platform-specific)
    // No hardcoded prices or cross-platform pricing mentions
    // ==================================================================

    // Get available packages from RevenueCat
    const packages = offerings.availablePackages || [];

    // Helper to get price string from package (works for both mobile and web)
    const getPriceString = (pkg: PurchasesPackage): string => {
        // Mobile SDK
        if (pkg.product?.priceString) {
            return pkg.product.priceString;
        }
        // Web SDK
        if ((pkg as any).rcBillingProduct?.currentPrice?.formattedPrice) {
            return (pkg as any).rcBillingProduct.currentPrice.formattedPrice;
        }
        return '';
    };

    // Helper to get package title
    const getPackageTitle = (pkg: PurchasesPackage): string => {
        const id = pkg.identifier.toLowerCase();
        if (id.includes('annual') || id.includes('yearly')) return t('yearly');
        if (id.includes('monthly')) return t('monthly');
        if (id.includes('lifetime')) return t('lifetime');
        return pkg.identifier;
    };

    // Helper to check if package is the "best value" (annual)
    const isBestValue = (pkg: PurchasesPackage): boolean => {
        const id = pkg.identifier.toLowerCase();
        return id.includes('annual') || id.includes('yearly');
    };

    // Sort packages: annual first, then monthly, then lifetime
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

    return (
        <View style={[styles.container, { backgroundColor: '#0f172a' }]}>
            <StatusBar barStyle="light-content" />

            <LinearGradient
                colors={['#0a0a23', '#1a1a3a', '#0000a3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            <BackgroundShapes width={width} height={height} />

            <View style={[styles.header, { paddingTop: insets.top + 10, paddingBottom: 10 }]}>
                <TouchableOpacity
                    onPress={handleClose}
                    style={styles.closeButton}
                    accessibilityLabel={t('close')}
                >
                    <FontAwesome name="times" size={24} color="rgba(255,255,255,0.7)" />
                </TouchableOpacity>

                <View style={[styles.headerContent, { marginTop: 0 }]}>
                    <PremiumIcon />
                    <Text style={[styles.headerTitle, { marginTop: 10, fontSize: 26 }]}>{t('unlockCDLZeroPro')}</Text>
                    <Text style={[styles.headerSubtitle, { marginTop: 4, fontSize: 14 }]}>
                        {t('freeTrialEnded').replace('{count}', String(questionsAnsweredTotal))}
                    </Text>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
            >
                {/* Features list */}
                <View style={[styles.featuresContainer, { padding: spacing.lg }]}>
                    <Text style={[styles.featuresTitle]}>
                        {t('whatYouGet')}
                    </Text>
                    {features.map((feature, index) => (
                        <View key={index} style={styles.featureRow}>
                            <View style={[styles.featureIcon]}>
                                <FontAwesome name={feature.icon} size={20} color="#38bdf8" />
                            </View>
                            <Text style={[styles.featureText]}>
                                {feature.text}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Pricing options - from RevenueCat offerings */}
                <View style={[styles.pricingContainer, { paddingHorizontal: spacing.lg, marginTop: 10 }]}>
                    {sortedPackages.map((pkg) => (
                        <TouchableOpacity
                            key={pkg.identifier}
                            style={[
                                styles.pricingCard,
                                isBestValue(pkg) && styles.pricingCardBest
                            ]}
                            onPress={() => handlePurchase(pkg)}
                            activeOpacity={0.8}
                        >
                            {isBestValue(pkg) && (
                                <View style={[styles.bestValueBadge]}>
                                    <Text style={styles.bestValueText}>{t('bestValue')}</Text>
                                </View>
                            )}
                            <Text style={[styles.pricingPeriod]}>
                                {getPackageTitle(pkg)}
                            </Text>
                            <Text style={[styles.pricingPrice]}>
                                {getPriceString(pkg)}
                            </Text>
                            {pkg.identifier.toLowerCase().includes('lifetime') && (
                                <Text style={[styles.pricingNote]}>
                                    {t('oneTimePayment')}
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* No packages available */}
                {sortedPackages.length === 0 && (
                    <View style={{ alignItems: 'center', padding: 20 }}>
                        <Text style={{ color: 'rgba(255,255,255,0.6)' }}>
                            No purchase options available
                        </Text>
                    </View>
                )}

                {/* Restore purchases */}
                <TouchableOpacity onPress={handleRestore} style={styles.restoreButton}>
                    <Text style={styles.restoreText}>
                        {t('restorePurchases')}
                    </Text>
                </TouchableOpacity>

                {/* Legal Links */}
                <View style={[styles.legalContainer, { paddingHorizontal: spacing.lg }]}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL('https://sites.google.com/view/cdlzeropermittest2026/home')}
                        style={{ padding: 8 }}
                    >
                        <Text style={styles.legalLink}>{t('privacyPolicy')}</Text>
                    </TouchableOpacity>
                    <Text style={styles.legalDivider}>|</Text>
                    <TouchableOpacity
                        onPress={() => Linking.openURL('https://sites.google.com/view/cdlzerotos/home')}
                        style={{ padding: 8 }}
                    >
                        <Text style={styles.legalLink}>{t('termsOfService')}</Text>
                    </TouchableOpacity>
                </View>

                {/* Terms */}
                <Text style={[styles.termsText, { color: colors.textSecondary, paddingHorizontal: spacing.lg }]}>
                    {t('subscriptionTerms')}
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    closeButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 30,
        right: 20,
        padding: 8,
        zIndex: 10,
    },
    headerContent: {
        alignItems: 'center',
        marginTop: 0,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 5,
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 5,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 10,
    },
    featuresContainer: {
        marginTop: 10,
    },
    featuresTitle: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 8,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 6,
        borderRadius: 12,
    },
    featureIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: 'rgba(56, 189, 248, 0.15)',
    },
    featureText: {
        fontSize: 14,
        color: '#e2e8f0',
        fontWeight: '500',
        flex: 1,
    },
    pricingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
        marginTop: 10,
    },
    pricingCard: {
        flex: 1,
        borderRadius: 12,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    pricingCardBest: {
        borderWidth: 2,
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        transform: [{ scale: 1.05 }],
        zIndex: 10,
    },
    bestValueBadge: {
        position: 'absolute',
        top: -12,
        backgroundColor: '#38bdf8',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        shadowColor: "#38bdf8",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    bestValueText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    pricingPeriod: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
        marginTop: 10,
    },
    pricingPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 4,
    },
    pricingNote: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.6)',
        marginTop: 4,
    },
    restoreButton: {
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignSelf: 'center',
    },
    restoreText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.8)',
    },
    legalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    legalLink: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.6)',
        textDecorationLine: 'underline',
    },
    legalDivider: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.4)',
        marginHorizontal: 4,
    },
    termsText: {
        fontSize: 10,
        textAlign: 'center',
        lineHeight: 14,
        marginTop: 8,
        color: 'rgba(255,255,255,0.4)',
    },
});
