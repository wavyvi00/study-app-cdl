import React, { useState } from 'react';
import { Pressable, ViewStyle, StyleProp, PressableStateCallbackType, PressableProps } from 'react-native';

interface HoverableState {
    hovered: boolean;
    pressed: boolean;
}

interface Props extends Omit<PressableProps, 'style' | 'children'> {
    children?: React.ReactNode | ((state: HoverableState) => React.ReactNode);
    style?: StyleProp<ViewStyle> | ((state: HoverableState) => StyleProp<ViewStyle>);
}

export default function Hoverable({ children, style, disabled, ...props }: Props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Pressable
            {...props}
            onHoverIn={(e) => {
                if (!disabled) setIsHovered(true);
                props.onHoverIn?.(e);
            }}
            onHoverOut={(e) => {
                setIsHovered(false);
                props.onHoverOut?.(e);
            }}
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
