import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Platform, useWindowDimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
    useAnimatedRef
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useLocalization } from '../context/LocalizationContext';

const ONBOARDING_KEY = 'onboarding_completed';

// --- Native Icon Components ---

const LicenseIcon = () => (
    <View style={iconStyles.container}>
        {/* Card Body */}
        <LinearGradient
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']}
            style={iconStyles.licenseCard}
        >
            {/* Header Strip */}
            <View style={iconStyles.licenseHeader}>
                <Text style={iconStyles.headerText}>COMMERCIAL DRIVER</Text>
            </View>

            <View style={iconStyles.licenseContent}>
                {/* Photo Placeholder */}
                <View style={iconStyles.photoPlaceholder}>
                    <FontAwesome name="user" size={30} color="rgba(255,255,255,0.5)" />
                </View>

                {/* Text Lines */}
                <View style={iconStyles.textLines}>
                    <View style={[iconStyles.line, { width: '80%' }]} />
                    <View style={[iconStyles.line, { width: '60%' }]} />
                    <View style={[iconStyles.line, { width: '90%' }]} />
                </View>
            </View>

            {/* Truck Overlay */}
            <View style={iconStyles.truckIcon}>
                <FontAwesome name="truck" size={32} color="#38bdf8" />
            </View>
        </LinearGradient>
    </View>
);

const StudyIcon = () => (
    <View style={iconStyles.container}>
        {/* Stacked Books Effect */}
        <View style={[iconStyles.book, iconStyles.bookBottom]} />
        <View style={[iconStyles.book, iconStyles.bookMiddle]} />
        <LinearGradient
            colors={['#38bdf8', '#0ea5e9']}
            style={[iconStyles.book, iconStyles.bookTop]}
        >
            <FontAwesome name="book" size={50} color="#fff" />
        </LinearGradient>
        {/* Floating Cap */}
        <View style={iconStyles.capFloat}>
            <FontAwesome name="graduation-cap" size={60} color="#fbbf24" style={{ textShadowColor: 'rgba(0,0,0,0.3)', textShadowRadius: 10 }} />
        </View>
    </View>
);

const TrophyIcon = () => (
    <View style={iconStyles.container}>
        {/* Glow BGs */}
        <View style={iconStyles.glowOuter} />
        <View style={iconStyles.glowInner} />

        {/* Trophy */}
        <FontAwesome name="trophy" size={100} color="#fbbf24" style={iconStyles.trophyShadow} />

        {/* Stars */}
        <View style={[iconStyles.star, { top: 0, right: 20 }]}>
            <FontAwesome name="star" size={24} color="#fff" />
        </View>
        <View style={[iconStyles.star, { top: 40, left: 10 }]}>
            <FontAwesome name="star" size={16} color="#fff" />
        </View>
    </View>
);

const iconStyles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // License Styles
    licenseCard: {
        width: 220,
        height: 140,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        overflow: 'hidden',
        transform: [{ rotate: '-5deg' }],
    },
    licenseHeader: {
        height: 30,
        backgroundColor: '#0067b3', // blueGrotto
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    licenseContent: {
        flex: 1,
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
    },
    photoPlaceholder: {
        width: 50,
        height: 60,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLines: {
        flex: 1,
        marginLeft: 12,
        gap: 8,
    },
    line: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 3,
    },
    truckIcon: {
        position: 'absolute',
        bottom: 10,
        right: 15,
        opacity: 0.8,
    },
    // Study Styles
    book: {
        width: 140,
        height: 160,
        borderRadius: 12,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookBottom: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        transform: [{ rotate: '-10deg' }, { translateX: -20 }],
    },
    bookMiddle: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        transform: [{ rotate: '5deg' }, { translateX: 10 }],
    },
    bookTop: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    capFloat: {
        position: 'absolute',
        top: -40,
        right: -20,
        transform: [{ rotate: '15deg' }],
    },
    // Trophy Styles
    glowOuter: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: 'rgba(255, 213, 61, 0.1)', // yellowAccent
    },
    glowInner: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 213, 61, 0.2)',
    },
    trophyShadow: {
        textShadowColor: 'rgba(255, 213, 61, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    star: {
        position: 'absolute',
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
    }
});


const slides = [
    {
        id: '1',
        component: <LicenseIcon />,
        titleKey: 'onboardingTitle1',
        descriptionKey: 'onboardingDesc1',
        defaultTitle: 'Welcome to CDL Zero',
        defaultDesc: 'Your journey starts here. Master the permit test.',
    },
    {
        id: '2',
        component: <StudyIcon />,
        titleKey: 'onboardingTitle2',
        descriptionKey: 'onboardingDesc2',
        defaultTitle: 'Learn & Practice',
        defaultDesc: 'Official study materials and realistic exam simulations.',
    },
    {
        id: '3',
        component: <TrophyIcon />,
        titleKey: 'onboardingTitle3',
        descriptionKey: 'onboardingDesc3',
        defaultTitle: 'Track Progress',
        defaultDesc: 'Monitor your improvement and pass with confidence.',
    },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// --- Sub-components ---

const Page = ({ item, index, x, width, t }: any) => {
    const rIconStyle = useAnimatedStyle(() => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

        const opacity = interpolate(x.value, inputRange, [0, 1, 0], Extrapolation.CLAMP);
        const translateX = interpolate(x.value, inputRange, [width * 0.5, 0, -width * 0.5], Extrapolation.CLAMP);
        const scale = interpolate(x.value, inputRange, [0.5, 1, 0.5], Extrapolation.CLAMP);

        return {
            opacity,
            transform: [{ translateX }, { scale }],
        };
    });

    const rTextStyle = useAnimatedStyle(() => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

        const opacity = interpolate(x.value, inputRange, [0, 1, 0], Extrapolation.CLAMP);
        const translateX = interpolate(x.value, inputRange, [width * 0.2, 0, -width * 0.2], Extrapolation.CLAMP);

        return {
            opacity,
            transform: [{ translateX }],
        };
    });

    const title = t(item.titleKey) === item.titleKey ? item.defaultTitle : t(item.titleKey);
    const desc = t(item.descriptionKey) === item.descriptionKey ? item.defaultDesc : t(item.descriptionKey);

    return (
        <View style={[styles.pageContainer, { width }]}>
            <Animated.View style={[styles.iconContainer, rIconStyle]}>
                {item.component}
            </Animated.View>
            <Animated.View style={[styles.textContainer, rTextStyle]}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{desc}</Text>
            </Animated.View>
        </View>
    );
};

const Pagination = ({ data, x, width }: any) => {
    return (
        <View style={styles.paginationContainer}>
            {data.map((_, index) => {
                const rDotStyle = useAnimatedStyle(() => {
                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                    const widthAnim = interpolate(x.value, inputRange, [8, 24, 8], Extrapolation.CLAMP);
                    const opacity = interpolate(x.value, inputRange, [0.4, 1, 0.4], Extrapolation.CLAMP);
                    return {
                        width: widthAnim,
                        opacity,
                    };
                });
                return <Animated.View key={index} style={[styles.dot, rDotStyle]} />;
            })}
        </View>
    );
};

const BackgroundShapes = ({ width, height }: any) => {
    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
            {/* Large soft glow top left */}
            <LinearGradient
                colors={['rgba(255,255,255,0.1)', 'transparent']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={[styles.bgShape, { width: width * 1.5, height: width * 1.5, borderRadius: width, top: -width * 0.6, left: -width * 0.4 }]}
            />
            {/* Soft glow bottom right */}
            <LinearGradient
                colors={['rgba(255,255,255,0.05)', 'transparent']}
                start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }}
                style={[styles.bgShape, { width: width * 1.2, height: width * 1.2, borderRadius: width, bottom: -width * 0.4, right: -width * 0.4 }]}
            />
        </View>
    )
}

// --- Main Component ---

export default function OnboardingScreen() {
    const router = useRouter();
    const { t, setLocale, locale } = useLocalization();
    const { width, height } = useWindowDimensions();
    const flatListRef = useAnimatedRef<FlatList>();
    const x = useSharedValue(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            x.value = event.contentOffset.x;
        },
    });

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== null) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const handleNext = async () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            await completeOnboarding();
        }
    };

    const getItemLayout = (_: any, index: number) => ({
        length: width,
        offset: width * index,
        index,
    });

    const completeOnboarding = async () => {
        try {
            await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
            router.replace('/tabs');
        } catch (error) {
            console.error('Error saving onboarding status:', error);
            router.replace('/tabs');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Deep premium background matching app theme */}
            <LinearGradient
                colors={['#0a0a23', '#1a1a3a', '#0000a3']} // Deep Midnight Blue to Primary
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            <BackgroundShapes width={width} height={height} />

            {/* Header / Language */}
            <View style={styles.header}>
                <View style={styles.langRow}>
                    {['en', 'es', 'ru'].map((lang) => (
                        <TouchableOpacity
                            key={lang}
                            onPress={() => setLocale(lang as any)}
                            style={[
                                styles.langPill,
                                locale === lang && styles.activeLangPill
                            ]}
                        >
                            <Text style={styles.langText}>
                                {lang === 'en' ? '🇺🇸' : lang === 'es' ? '🇪🇸' : '🇷🇺'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <AnimatedFlatList
                ref={flatListRef}
                data={slides}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item, index }: any) => <Page item={item} index={index} x={x} width={width} t={t} />}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                getItemLayout={getItemLayout}
            />

            {/* Footer */}
            <View style={styles.footer}>
                <Pagination data={slides} x={x} width={width} />

                <TouchableOpacity
                    style={styles.mainButton}
                    onPress={handleNext}
                    activeOpacity={0.9}
                >
                    <LinearGradient
                        colors={['#40b0df', '#0067b3']} // Aquamarine to Blue Grotto
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.mainButtonGradient}
                    >
                        <Text style={styles.mainButtonText}>
                            {currentIndex === slides.length - 1 ? t('getStarted') : t('next')}
                        </Text>
                        <FontAwesome
                            name={currentIndex === slides.length - 1 ? "check" : "arrow-right"}
                            size={18}
                            color="#fff"
                        />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a', // Fallback
    },
    header: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 40,
        right: 20,
        zIndex: 50,
    },
    langRow: {
        flexDirection: 'row',
        gap: 12,
    },
    langPill: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)', // Web glass effect
    },
    activeLangPill: {
        backgroundColor: 'rgba(56, 189, 248, 0.2)', // Light blue tint
        borderColor: '#38bdf8',
    },
    langText: {
        fontSize: 16,
    },
    pageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', // Keep center but shift visual weight
        paddingHorizontal: 40,
        paddingTop: 100, // Push content down
        paddingBottom: 20, // Reduce bottom pad to allow sinking
    },
    iconContainer: {
        width: 250,
        height: 250,
        marginBottom: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 16,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 18,
        color: '#94a3b8', // Slate-400
        textAlign: 'center',
        lineHeight: 28,
        maxWidth: 300,
    },
    footer: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    paginationContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        height: 10,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#38bdf8',
    },
    mainButton: {
        width: '100%',
        height: 64,
        borderRadius: 24, // ios-style squircle-ish
        shadowColor: "#38bdf8",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
    },
    mainButtonGradient: {
        flex: 1,
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    mainButtonText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: 0.5,
    },
    bgShape: {
        position: 'absolute',
    }
});
