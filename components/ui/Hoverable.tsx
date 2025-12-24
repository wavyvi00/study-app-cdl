import React, { useState } from 'react';
import { Pressable, ViewStyle, StyleProp, PressableStateCallbackType } from 'react-native';

interface HoverableState {
    hovered: boolean;
    pressed: boolean;
}

interface Props {
    children?: React.ReactNode | ((state: HoverableState) => React.ReactNode);
    style?: StyleProp<ViewStyle> | ((state: HoverableState) => StyleProp<ViewStyle>);
    onPress?: () => void;
    disabled?: boolean;
}

export default function Hoverable({ children, style, onPress, disabled }: Props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Pressable
            onHoverIn={() => !disabled && setIsHovered(true)}
            onHoverOut={() => setIsHovered(false)}
            onPress={onPress}
            disabled={disabled}
            style={(state: PressableStateCallbackType) => {
                const combinedState = { ...state, hovered: isHovered };
                if (typeof style === 'function') {
                    return style(combinedState);
                }
                return style as StyleProp<ViewStyle>;
            }}
        >
            {(state: PressableStateCallbackType) => {
                const combinedState = { ...state, hovered: isHovered };
                if (typeof children === 'function') {
                    return children(combinedState);
                }
                return children;
            }}
        </Pressable>
    );
}
