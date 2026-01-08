import React from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const iconStyles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    glowOuter: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: 'rgba(255, 215, 0, 0.1)', // Gold glow
    },
    glowInner: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
    },
    crownShadow: {
        textShadowColor: 'rgba(255, 215, 0, 0.6)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 25,
    },
    star: {
        position: 'absolute',
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
    }
});

export const PremiumIcon = () => (
    <View style={iconStyles.container}>
        {/* Glow BGs */}
        <View style={iconStyles.glowOuter} />
        <View style={iconStyles.glowInner} />

        {/* Crown - Using a lock or crown icon */}
        <FontAwesome name="drivers-license" size={90} color="#FFD700" style={[iconStyles.crownShadow, { opacity: 0.3, position: 'absolute', transform: [{ scale: 1.2 }] }]} />
        <FontAwesome name="check-circle" size={100} color="#FFD700" style={iconStyles.crownShadow} />

        {/* Decorative Stars */}
        <View style={[iconStyles.star, { top: 10, right: 30 }]}>
            <FontAwesome name="star" size={24} color="#fff" />
        </View>
        <View style={[iconStyles.star, { top: 50, left: 10 }]}>
            <FontAwesome name="star" size={16} color="#fff" />
        </View>
        <View style={[iconStyles.star, { bottom: 30, right: 20 }]}>
            <FontAwesome name="star" size={12} color="#fff" />
        </View>
    </View>
);
