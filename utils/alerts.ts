import { Alert, Platform } from 'react-native';

type Handler = () => void | Promise<void>;

interface ConfirmOptions {
    title: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    isDestructive?: boolean;
    onConfirm: Handler;
    onCancel?: Handler;
}

// Use these helpers instead of Alert.alert to keep web/native behavior consistent.
export function showAlert(title: string, message?: string) {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof window.alert === 'function') {
        window.alert(message ? `${title}\n\n${message}` : title);
        return;
    }

    Alert.alert(title, message);
}

export function showConfirm({
    title,
    message,
    confirmText = 'OK',
    cancelText = 'Cancel',
    isDestructive = false,
    onConfirm,
    onCancel,
}: ConfirmOptions) {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof window.confirm === 'function') {
        const confirmed = window.confirm(message ? `${title}\n\n${message}` : title);
        if (confirmed) {
            void onConfirm();
        } else if (onCancel) {
            void onCancel();
        }
        return;
    }

    Alert.alert(title, message, [
        {
            text: cancelText,
            style: 'cancel',
            onPress: () => {
                if (onCancel) {
                    void onCancel();
                }
            },
        },
        {
            text: confirmText,
            style: isDestructive ? 'destructive' : 'default',
            onPress: () => {
                void onConfirm();
            },
        },
    ]);
}
