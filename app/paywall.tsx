import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    Alert,
    StatusBar, // Added StatusBar
    Linking, // Added Linking
} from 'react-native';
import { PurchasesPackage } from 'react-native-purchases'; // Added import
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import { useLocalization } from '../context/LocalizationContext';
import { useSubscription } from '../context/SubscriptionContext';
import { APP_CONFIG } from '../constants/appConfig';
import Button from '../components/ui/Button';
import { BackgroundShapes } from '../components/ui/BackgroundShapes';
import { PremiumIcon } from '../components/icons/PremiumIcon';
import { useWindowDimensions } from 'react-native';

export default function PaywallScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { colors, spacing, typography } = useTheme();
    const { width, height } = useWindowDimensions();
    const { t } = useLocalization();
    const { questionsAnsweredTotal, refreshSubscriptionStatus, purchase, restore, offerings, isLoading } = useSubscription();

    const { PRICING } = APP_CONFIG;

    const handlePurchase = async (productId: string) => {
        try {
            if (!offerings && !__DEV__) {
                alert(t('errorLoadingProducts'));
                return;
            }

            // Find package matching the productId (either Store ID or RC Identifier)
            const packageToBuy = offerings?.availablePackages.find(
                (pkg: PurchasesPackage) => pkg.product.identifier === productId || pkg.identifier === productId
            );

            if (!packageToBuy) {
                if (__DEV__) {
                    Alert.alert('Error', 'Dev Mode: Product not found in RevenueCat. Setup required.\nID: ' + productId);
                } else {
                    Alert.alert('Error', t('productNotFound'));
                }
                return;
            }

            await purchase(packageToBuy);
            // On success, the context updates state and we can close or navigate away
            // The useEffect in the context or the redirect logic elsewhere handles the rest
            router.back();

        } catch (error: any) {
            if (!error.userCancelled) {
                Alert.alert('Error', error.message || 'Purchase failed');
            }
        }
    };

    const handleRestore = async () => {
        try {
            await restore();
            Alert.alert('Success', 'Purchases restored successfully!');
            router.back();
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Restore failed');
        }
    };

    const features = [
        { icon: 'check-circle' as const, text: t('unlimitedPractice') },
        { icon: 'book' as const, text: t('allStudyGuides') },
        { icon: 'trophy' as const, text: t('allExamModes') },
        { icon: 'language' as const, text: t('allLanguages') },
    ];

    const { from } = useLocalSearchParams();

    // ...

    const handleClose = () => {
        if (from === 'quiz') {
            // Prevent loop if coming from a forced redirect in Quiz
            router.navigate('/(tabs)');
        } else {
            router.back();
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: '#0f172a' }]}>
            <StatusBar barStyle="light-content" />

            {/* Deep premium background matching Onboarding */}
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

                {/* Pricing options */}
                <View style={[styles.pricingContainer, { paddingHorizontal: spacing.lg, marginTop: 10 }]}>
                    {/* Yearly - Best Value */}
                    <TouchableOpacity
                        style={[styles.pricingCard, styles.pricingCardBest]}
                        onPress={() => handlePurchase(PRICING.YEARLY.productId)}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.bestValueBadge]}>
                            <Text style={styles.bestValueText}>{t('bestValue')}</Text>
                        </View>
                        <Text style={[styles.pricingPeriod]}>
                            {t('yearly')}
                        </Text>
                        <Text style={[styles.pricingPrice]}>
                            ${PRICING.YEARLY.price}
                        </Text>
                        <Text style={[styles.pricingSavings]}>
                            {t('save')} {PRICING.YEARLY.savingsPercent}%
                        </Text>
                    </TouchableOpacity>


                    {/* Monthly */}
                    <TouchableOpacity
                        style={[styles.pricingCard]}
                        onPress={() => handlePurchase(PRICING.MONTHLY.productId)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.pricingPeriod]}>
                            {t('monthly')}
                        </Text>
                        <Text style={[styles.pricingPrice]}>
                            ${PRICING.MONTHLY.price}/{t('mo')}
                        </Text>
                    </TouchableOpacity>

                    {/* Lifetime */}
                    <TouchableOpacity
                        style={[styles.pricingCard]}
                        onPress={() => handlePurchase(PRICING.LIFETIME.productId)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.pricingPeriod]}>
                            {t('lifetime')}
                        </Text>
                        <Text style={[styles.pricingPrice]}>
                            ${PRICING.LIFETIME.price}
                        </Text>
                        <Text style={[styles.pricingNote]}>
                            {t('oneTimePayment')}
                        </Text>
                    </TouchableOpacity>
                </View>

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
        top: Platform.OS === 'ios' ? 50 : 30, // Adjusted for new padding
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
        backgroundColor: 'rgba(56, 189, 248, 0.15)', // Light blue bg
    },
    featureText: {
        fontSize: 14,
        color: '#e2e8f0', // Slate-200
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
        // Glass effect
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    pricingCardBest: {
        borderWidth: 2,
        borderColor: '#38bdf8', // Aquamarine border for best value
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        transform: [{ scale: 1.05 }], // Slightly emphasized
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
    pricingSavings: {
        fontSize: 12,
        fontWeight: '700',
        color: '#4ade80', // Green-400
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
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignSelf: 'center',
        width: 200,
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
