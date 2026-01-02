import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BackgroundShapesProps {
    width: number;
    height: number;
}

export const BackgroundShapes = ({ width, height }: BackgroundShapesProps) => {
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
    );
};

const styles = StyleSheet.create({
    bgShape: {
        position: 'absolute',
    }
});
