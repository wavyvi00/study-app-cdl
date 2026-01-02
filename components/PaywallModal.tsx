import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Alert,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalization } from '../context/LocalizationContext';
import { useTheme } from '../context/ThemeContext';
import { PRICING } from '../constants/appConfig';
import { useSubscription } from '../context/SubscriptionContext';
import { PremiumIcon } from './icons/PremiumIcon';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PaywallModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function PaywallModal({ visible, onClose }: PaywallModalProps) {
    const { t } = useLocalization();
    const { colors, spacing, typography } = useTheme();
    const { questionsRemaining, purchase, offerings, isPro, restore } = useSubscription();

    const handlePurchase = async (productId: string) => {
        try {
            if (!offerings?.availablePackages) {
                Alert.alert("Error", t('errorLoadingProducts'));
                return;
            }

            const packageToPurchase = offerings.availablePackages.find(
                (pkg) => pkg.product.identifier === productId
            );

            if (!packageToPurchase) {
                Alert.alert("Error", t('productNotFound'));
                return;
            }

            await purchase(packageToPurchase);
            // If successful (no error thrown), close modal
            onClose();
        } catch (error: any) {
            if (!error.userCancelled) {
                Alert.alert("Error", error.message || "Purchase failed");
            }
        }
    };

    const handleRestore = async () => {
        try {
            await restore();
            Alert.alert("Success", "Purchases restored successfully");
            if (isPro) onClose();
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to restore purchases. Please try again.");
        }
    }

    const features = [
        t('unlimitedPractice'),
        t('allStudyGuides'),
        t('allExamModes'),
        t('allLanguages'),
    ];

    // If user is already Pro, don't show paywall (or show success state, but usually close)
    React.useEffect(() => {
        if (isPro && visible) {
            onClose();
        }
    }, [isPro, visible]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                {/* Premium Gradient Background */}
                <LinearGradient
                    colors={['#0a0a23', '#000060']} // Darker version for modal
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.modalContent}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent}>

                        <View style={styles.header}>
                            {/* Premium Icon Scaled Down */}
                            <View style={{ transform: [{ scale: 0.8 }] }}>
                                <PremiumIcon />
                            </View>

                            <Text style={styles.title}>
                                {t('unlockCDLZeroPro')}
                            </Text>
                            <Text style={styles.subtitle}>
                                {t('trialQuestionsRemaining').replace('{count}', String(questionsRemaining))}
                            </Text>
                        </View>

                        {/* Features list */}
                        <View style={styles.featuresList}>
                            {features.map((feature, index) => (
                                <View key={index} style={styles.featureRow}>
                                    <View style={[styles.featureIcon]}>
                                        <FontAwesome name="check" size={12} color="#fff" />
                                    </View>
                                    <Text style={styles.featureText}>{feature}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Pricing options */}
                        <View style={styles.pricingContainer}>
                            {/* Yearly - Best Value */}
                            <TouchableOpacity
                                style={styles.pricingButton}
                                onPress={() => handlePurchase(PRICING.YEARLY.productId)}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#38bdf8', '#0067b3']} // Aquamarine to Blue Grotto
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.pricingGradient}
                                >
                                    <View>
                                        <Text style={styles.pricingButtonTitle}>{t('yearly')}</Text>
                                        <Text style={styles.pricingButtonPrice}>
                                            ${PRICING.YEARLY.price} / {t('yr')}
                                        </Text>
                                    </View>
                                    <View style={styles.saveBadge}>
                                        <Text style={styles.saveText}>
                                            {t('save')} {PRICING.YEARLY.savingsPercent}%
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            {/* Monthly */}
                            <TouchableOpacity
                                style={styles.secondaryPricingButton}
                                onPress={() => handlePurchase(PRICING.MONTHLY.productId)}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.secondaryPricingText}>
                                    {t('monthly')} - ${PRICING.MONTHLY.price}/{t('mo')}
                                </Text>
                            </TouchableOpacity>

                            {/* Lifetime */}
                            <TouchableOpacity
                                style={styles.secondaryPricingButton}
                                onPress={() => handlePurchase(PRICING.LIFETIME.productId)}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.secondaryPricingText}>
                                    {t('lifetime')} - ${PRICING.LIFETIME.price} ({t('oneTimePayment')})
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Footer */}
                        <TouchableOpacity onPress={handleRestore}>
                            <Text style={[styles.restoreText]}>
                                {t('restorePurchases')}
                            </Text>
                        </TouchableOpacity>

                        <Text style={[styles.termsText, { marginTop: 16 }]}>
                            {t('subscriptionTerms')}
                        </Text>

                        <TouchableOpacity onPress={onClose} style={[styles.closeButton, { marginTop: 24 }]}>
                            <Text style={styles.closeText}>{t('noThanks')}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </LinearGradient>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)', // Darker overlay
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        borderRadius: 24,
        overflow: 'hidden',
        maxHeight: '90%',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        width: '100%',
    },
    scrollContent: {
        padding: 24,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '800', // Extra bold
        color: '#FFFFFF',
        marginBottom: 8,
        textAlign: 'center',
        marginTop: -10, // Pull up closer to icon
    },
    subtitle: {
        fontSize: 16,
        color: '#94a3b8', // Slate-400
        textAlign: 'center',
        lineHeight: 22,
    },
    featuresList: {
        width: '100%',
        marginBottom: 32,
        backgroundColor: 'rgba(255,255,255,0.05)', // Subtle box
        padding: 16,
        borderRadius: 16,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#38bdf8', // Aquamarine
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    featureText: {
        fontSize: 15,
        color: '#e2e8f0', // Slate-200
        fontWeight: '500',
    },
    pricingContainer: {
        width: '100%',
        marginBottom: 20,
        gap: 12,
    },
    pricingButton: {
        width: '100%',
        height: 60,
        borderRadius: 16,
        marginBottom: 4,
        shadowColor: "#38bdf8",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    pricingGradient: {
        flex: 1,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    pricingButtonTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    pricingButtonPrice: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    saveBadge: {
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginLeft: 8,
    },
    saveText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#0067b3', // Blue Grotto
        textTransform: 'uppercase',
    },
    secondaryPricingButton: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
    },
    secondaryPricingText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#e2e8f0',
    },
    closeButton: {
        padding: 12,
        marginTop: 24,
    },
    closeText: {
        fontSize: 14,
        color: '#94a3b8',
        fontWeight: '500',
    },
    restoreText: {
        fontSize: 14,
        textDecorationLine: 'underline',
        marginBottom: 12,
        color: '#94a3b8',
    },
    termsText: {
        fontSize: 11,
        textAlign: 'center',
        lineHeight: 16,
        color: '#94a3b8',
        marginTop: 16,
    },
});
