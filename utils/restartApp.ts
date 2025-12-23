import { DevSettings, Platform } from 'react-native';
import * as Updates from 'expo-updates';

export async function restartApp(): Promise<boolean> {
    if (Platform.OS === 'web') {
        window.location.reload();
        return true;
    }

    try {
        await Updates.reloadAsync();
        return true;
    } catch (error) {
        if (__DEV__ && DevSettings?.reload) {
            DevSettings.reload();
            return true;
        }
    }

    return false;
}
