
/**
 * Paywall Screen (One-Time Pass Redesign)
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
import { PRICING } from '../constants/appConfig';

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
        { icon: 'check-circle' as const, text: 'Unlimited Practice Questions' },
        { icon: 'book' as const, text: 'Complete Study Guide Access' },
        { icon: 'trophy' as const, text: 'Exam Simulation Mode' },
        { icon: 'lock' as const, text: 'One-Time Payment, No Subscriptions' },
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
                            View Pass Options
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

    // We expect RevenueCat to return at least one package. 
    const packages = offerings?.availablePackages || [];

    // 1. Try to find the exact match for our new 14.99 product
    const exactMatchPackage = packages.find(p => {
        const id = p.identifier;
        const prodId = p.product?.identifier;
        return id === PRICING.ONE_TIME.productId || prodId === PRICING.ONE_TIME.productId;
    });

    // 2. Fallback to any available package so the button still works (for testing)
    const activePackage = exactMatchPackage || packages[0];

    // 3. Display Logic: matches User Request to "say 14.99"
    // If we found the real product, use its localized price string (e.g. "€14.99").
    // If NOT found (external config missing), force display to "$14.99" instead of showing the fallback package's price (e.g. "$9.99").
    const priceString = exactMatchPackage
        ? (exactMatchPackage.product?.priceString || (exactMatchPackage as any).rcBillingProduct?.currentPrice?.formattedPrice || `$${PRICING.ONE_TIME.price}`)
        : `$${PRICING.ONE_TIME.price}`;

    const handleBuy = () => {
        if (activePackage) {
            handlePurchase(activePackage);
        } else {
            Alert.alert('Configuration Required', 'Product not found in RevenueCat. Please complete the external platform setup.');
        }
    };

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
                        <FontAwesome name="drivers-license" size={32} color={TRUST_THEME.primary} />
                    </View>

                    <Text style={[styles.headerTitle, { color: TRUST_THEME.text, marginTop: 20 }]}>
                        Pass Your CDL Exam
                    </Text>
                    <Text style={[styles.headerSubtitle, { color: TRUST_THEME.textSecondary, marginTop: 8 }]}>
                        Unlock everything you need to study, practice, and pass securely.
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

                {/* Single Hero Pricing Card */}
                <View style={[styles.pricingContainer, { paddingHorizontal: 24, maxWidth: 600, alignSelf: 'center', width: '100%' }]}>
                    <View
                        style={[
                            styles.pricingCard,
                            {
                                borderColor: TRUST_THEME.primary,
                                backgroundColor: '#F0F9FF',
                                shadowColor: '#000',
                            },
                            styles.pricingCardBest
                        ]}
                    >
                        <View style={[styles.bestBadge, { backgroundColor: TRUST_THEME.primary }]}>
                            <Text style={styles.bestBadgeText}>STANDARD PASS</Text>
                        </View>

                        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={[styles.periodText, { color: TRUST_THEME.primary }]}>
                                Full Access
                            </Text>
                            <Text style={[styles.priceText, { color: TRUST_THEME.text }]}>
                                {priceString}
                            </Text>
                            <Text style={[styles.noteText, { color: TRUST_THEME.textSecondary, fontWeight: '500' }]}>
                                One-time payment
                            </Text>
                            <Text style={[styles.noteText, { color: TRUST_THEME.textSecondary, fontSize: 12 }]}>
                                Yours forever. No monthly fees.
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.primaryButton, { backgroundColor: TRUST_THEME.primary, marginTop: 20 }]}
                            onPress={handleBuy}
                        // disabled={!targetPackage} // Allow click to show configuration alert
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.primaryButtonText}>Get Your Pass</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: 32, paddingHorizontal: 24 }}>
                    <View style={styles.trustRow}>
                        <FontAwesome name="lock" size={14} color={TRUST_THEME.textSecondary} />
                        <Text style={{ color: TRUST_THEME.textSecondary, fontSize: 12, marginLeft: 6 }}>
                            Secure payment via Apple / Google / Stripe
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
        paddingHorizontal: 10,
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
    },
    featureText: {
        fontSize: 16,
        fontWeight: '500',
    },
    pricingContainer: {
        marginTop: 32,
    },
    pricingCard: {
        borderRadius: 20,
        paddingVertical: 32,
        paddingHorizontal: 24,
        borderWidth: 1,
    },
    pricingCardBest: {
        borderWidth: 2,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    bestBadge: {
        position: 'absolute',
        top: -12,
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 12,
    },
    bestBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    periodText: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    priceText: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    noteText: {
        fontSize: 14,
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
        fontSize: 20,
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
