import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface EntryScreenProps {
    onFinish?: () => void;
}

export default function EntryScreen({ onFinish }: EntryScreenProps) {
    const { isDark } = useTheme();
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity for logo
    const scaleAnim = useRef(new Animated.Value(0.8)).current; // Initial scale
    const containerOpacity = useRef(new Animated.Value(1)).current; // For fading out the whole screen

    useEffect(() => {
        // Sequence: Fade in logo + scale up -> Pulse -> Fade out screen
        Animated.sequence([
            // 1. Enter
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]),
            // 2. Wait a bit (simulate loading or just look nice)
            Animated.delay(1000),
            // 3. Fade out the container
            Animated.timing(containerOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(({ finished }) => {
            if (finished && onFinish) {
                onFinish();
            }
        });
    }, []);

    return (
        <Animated.View style={[
            styles.container,
            isDark ? styles.darkContainer : styles.lightContainer,
            { opacity: containerOpacity }
        ]}>
            <Animated.Image
                source={require('../assets/icon.png')} // Using app icon
                style={[
                    styles.logo,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }
                ]}
                resizeMode="contain"
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject, // Cover the whole screen
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Ensure it's on top
    },
    lightContainer: {
        backgroundColor: '#ffffff',
    },
    darkContainer: {
        backgroundColor: '#121212',
    },
    logo: {
        width: 150,
        height: 150,
    },
});
