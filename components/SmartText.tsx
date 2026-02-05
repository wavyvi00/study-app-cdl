import React, { useMemo } from 'react';
import { Text, TextStyle, TouchableOpacity, StyleSheet, View, Platform, Alert, StyleProp } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { findTerm, GLOSSARY } from '../data/glossary';

interface SmartTextProps {
    text: string;
    isPlaying?: boolean;
    currentCharIndex?: number;
    onKeywordPress?: (term: string) => void;
    style?: StyleProp<TextStyle>;
}

interface Token {
    text: string;
    start: number;
    end: number;
    type: 'word' | 'keyword' | 'whitespace';
    keywordKey?: string; // The glossary key if type is keyword
}

export const SmartText: React.FC<SmartTextProps> = ({
    text,
    isPlaying = false,
    currentCharIndex = -1,
    onKeywordPress,
    style
}) => {
    const { colors, typography } = useTheme();
    const flattenedStyle = useMemo(() => StyleSheet.flatten(style), [style]);

    /**
     * Parse text into tokens (Keywords vs Regular Words)
     * This is memoized to be expensive only when text changes.
     */
    const tokens = useMemo(() => {
        const result: Token[] = [];
        let index = 0;
        const lowerText = text.toLowerCase();

        // 1. Identify all keyword occurrences first?
        // Simple greedy approach: Iterate through string. At each point, check if it starts a keyword.
        // Optimization: Regex match all keywords?
        // Since glossary is small, we can just iterate.

        const glossaryKeys = Object.keys(GLOSSARY);
        // Sort keys by length (descending) to match "Air Brakes" before "Air"
        glossaryKeys.sort((a, b) => b.length - a.length);

        while (index < text.length) {
            let matchedKeyword: string | null = null;
            let matchedKey: string | null = null;

            // Check for keyword match at current index
            for (const key of glossaryKeys) {
                if (lowerText.startsWith(key, index)) {
                    // Start boundary check: Must correspond to word boundary?
                    // "Repair" shouldn't match "Air".
                    const precedingChar = index > 0 ? lowerText[index - 1] : ' ';
                    const followingChar = index + key.length < text.length ? lowerText[index + key.length] : ' ';

                    const isStartBoundary = /[^a-z0-9]/i.test(precedingChar);
                    const isEndBoundary = /[^a-z0-9]/i.test(followingChar);

                    if (isStartBoundary && isEndBoundary) {
                        matchedKeyword = text.substr(index, key.length);
                        matchedKey = key;
                        break;
                    }
                }
            }

            if (matchedKeyword && matchedKey) {
                result.push({
                    text: matchedKeyword,
                    start: index,
                    end: index + matchedKeyword.length,
                    type: 'keyword',
                    keywordKey: matchedKey
                });
                index += matchedKeyword.length;
            } else {
                // Consume until next whitespace or punctuation to form "Words" for audio highlighting?
                // Or just consume 1 char?
                // For audio highlighting, we typically want word-level.
                // Let's find the next "word" or "whitespace".

                // Find next whitespace or keyword start?
                // Simpler: Just split by spaces?
                // If we iterate char by char, it's slow.

                // Let's try to grab the next "word" (alphanumeric sequence)
                // OR non-alphanumeric sequence (punctuation/space)

                const isAlphaNumeric = /[a-z0-9]/i.test(text[index]);
                let end = index + 1;
                while (end < text.length) {
                    const charIsAlpha = /[a-z0-9]/i.test(text[end]);
                    if (charIsAlpha !== isAlphaNumeric) break;
                    // Also stop if we might overlook a keyword?
                    // Ideally we check keywords every char, but that's O(N*K).
                    // Given short questions, it's fine.
                    // But to simplify loop:
                    // If we didn't find a keyword at 'index', we just proceed to find tokens.
                    // Actually, if we missed a keyword check, we break logic.
                    // So we must advance minimally or strictly check keywords.

                    // Correct logic:
                    // If no keyword match at `index`, matchedKeyword is null.
                    // We treat text[index] as part of a "plain" run.
                    // We can accumulate "plain text" until we find a keyword start?
                    // No, because we want word-level highlighting for *all* text.

                    // Let's just create a token for the character, merge later? No.
                    // Let's create proper "Word" tokens.

                    // Find end of current word.
                    if (charIsAlpha && glossaryKeys.some(k => lowerText.startsWith(k, end))) {
                        // Potential keyword starts inside this word? Unlikely if we checked boundaries.
                        // But "repair" vs "air" check above handles it.
                    }
                    end++;
                }

                // If currently processing a "word" (isAlphaNumeric), add it.
                // If punctuation/space, add it too (needed for rendering spacing).
                result.push({
                    text: text.substring(index, end),
                    start: index,
                    end: end,
                    type: isAlphaNumeric ? 'word' : 'whitespace'
                });
                index = end;
            }
        }
        return result;
    }, [text]);

    const isBlockHighlight = isPlaying && currentCharIndex === -1;

    return (
        <Text style={[
            style,
            { lineHeight: (flattenedStyle?.fontSize || 16) * 1.5 },
            isBlockHighlight && {
                backgroundColor: colors.primary + '15',
                borderRadius: 6,
                paddingHorizontal: 4,
                overflow: 'hidden' // Ensure border radius clips background
            }
        ]}>
            {tokens.map((token, i) => {
                const isHighlighted = isPlaying &&
                    currentCharIndex >= token.start &&
                    currentCharIndex < token.end;

                const baseStyle: TextStyle = {
                    color: colors.text,
                    fontSize: flattenedStyle?.fontSize || 16,
                };

                if (token.type === 'whitespace') {
                    return <Text key={`${i}-ws`}>{token.text}</Text>;
                }

                if (token.type === 'keyword' && token.keywordKey) {
                    return (
                        <Text
                            key={`${i}-kw`}
                            onPress={() => onKeywordPress?.(token.keywordKey!)}
                            style={[
                                baseStyle,
                                styles.keywordBase,
                                {
                                    borderBottomColor: colors.primary,
                                    color: isHighlighted ? colors.highlight : colors.text // Highlight color overrides or complements?
                                },
                                isHighlighted && {
                                    backgroundColor: colors.primary + '30', // Light blue bg
                                    color: colors.primary
                                }
                            ]}
                        >
                            {token.text}
                        </Text>
                    );
                }

                // Regular word
                return (
                    <Text
                        key={`${i}-wd`}
                        style={[
                            baseStyle,
                            isHighlighted && {
                                color: colors.primary,
                                fontWeight: 'bold'
                            }
                        ]}
                    >
                        {token.text}
                    </Text>
                );
            })}
        </Text>
    );
};

const styles = StyleSheet.create({
    keywordBase: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted', // iOS only?
    }
});
