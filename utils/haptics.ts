import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

// Safe wrapper for Haptics that only runs on supported platforms
const isInteractable = Platform.OS === 'ios' || Platform.OS === 'android';

export const selectionAsync = async () => {
    if (isInteractable) {
        try {
            await Haptics.selectionAsync();
        } catch (e) {
            console.warn('Haptics not available', e);
        }
    }
};

export const impactAsync = async (style: Haptics.ImpactFeedbackStyle) => {
    if (isInteractable) {
        try {
            await Haptics.impactAsync(style);
        } catch (e) {
            console.warn('Haptics not available', e);
        }
    }
};

export const notificationAsync = async (type: Haptics.NotificationFeedbackType) => {
    if (isInteractable) {
        try {
            await Haptics.notificationAsync(type);
        } catch (e) {
            console.warn('Haptics not available', e);
        }
    }
};

export const ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle;
export const NotificationFeedbackType = Haptics.NotificationFeedbackType;
