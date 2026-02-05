import { useState, useEffect, useRef } from 'react';
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

interface UseAudioHighlightProps {
    onFinish?: () => void;
    onError?: (error: Error) => void;
}

export function useAudioHighlight({ onFinish }: UseAudioHighlightProps = {}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentCharIndex, setCurrentCharIndex] = useState(-1);
    const [currentText, setCurrentText] = useState('');
    const [selectedVoice, setSelectedVoice] = useState<string | undefined>(undefined);
    const [activeId, setActiveId] = useState<string | null>(null);

    // Refs to track state inside callbacks
    const isPlayingRef = useRef(false);
    const queueRef = useRef<{ id: string; text: string }[]>([]);
    const queueIndexRef = useRef(0);

    useEffect(() => {
        const loadVoice = async () => {
            try {
                const voices = await Speech.getAvailableVoicesAsync();
                if (voices && voices.length > 0) {
                    // Filter for English US/GB
                    const englishVoices = voices.filter(v => v.language.includes('en-') || v.language.includes('en_'));

                    // Priority 1: Enhanced Quality (iOS/Android high quality)
                    let best = englishVoices.find(v => v.quality === Speech.VoiceQuality.Enhanced);

                    // Priority 2: Known good voices (fallback heuristics)
                    if (!best) {
                        best = englishVoices.find(v =>
                            v.name.includes('Samantha') || // iOS Standard
                            v.name.includes('Google US English') // Android Standard
                        );
                    }

                    // Priority 3: Any English voice
                    if (!best && englishVoices.length > 0) {
                        best = englishVoices[0];
                    }

                    if (best) {
                        setSelectedVoice(best.identifier);
                    }
                }
            } catch (e) {
                console.warn("Failed to load voices", e);
            }
        };

        loadVoice();

        return () => {
            Speech.stop();
        };
    }, []);

    const speakNext = () => {
        if (!isPlayingRef.current) return;

        const index = queueIndexRef.current;
        if (index >= queueRef.current.length) {
            stop();
            if (onFinish) onFinish(); // Call onFinish when the entire queue is done
            return;
        }

        const item = queueRef.current[index];
        setActiveId(item.id);
        setCurrentText(item.text);
        setCurrentCharIndex(0);

        const options: Speech.SpeechOptions = {
            language: 'en-US',
            pitch: 1.0,
            rate: 0.9,
            voice: selectedVoice,
            onStart: () => {
                setIsPlaying(true);
            },
            onDone: () => {
                queueIndexRef.current += 1;
                speakNext();
            },
            onStopped: () => {
                setIsPlaying(false);
                isPlayingRef.current = false;
                setActiveId(null);
                setCurrentCharIndex(-1);
            },
            onError: (e) => {
                console.error("Speech error", e);
                setIsPlaying(false);
                isPlayingRef.current = false;
                setActiveId(null);
                setCurrentCharIndex(-1);
                // if (onError) onError(e); // Consider adding onError prop handling here
            }
        };

        // Add boundary listener for Web and iOS
        if (Platform.OS !== 'android') {
            (options as any).onBoundary = (event: any) => {
                // event.charIndex is reliable on iOS/Web
                if (typeof event.charIndex === 'number') {
                    setCurrentCharIndex(event.charIndex);
                }
            };
        } else {
            // Android doesn't support word boundary well.
            // We might just highlight the whole sentence or simulate it (too complex for V1).
            // For V1 Android: Just play audio, no word karaoke.
            // Or we could estimate based on time? No, unreliable.
        }

        Speech.speak(item.text, options);
    };

    const speak = (text: string) => {
        speakSequence([{ id: 'single', text }]);
    };

    const speakSequence = (items: { id: string; text: string }[]) => {
        stop();
        // Small delay to ensure previous stop finishes
        setTimeout(() => {
            queueRef.current = items;
            queueIndexRef.current = 0;
            isPlayingRef.current = true;
            setIsPlaying(true);
            speakNext();
        }, 50);
    };

    const stop = () => {
        Speech.stop();
        setIsPlaying(false);
        isPlayingRef.current = false;
        setCurrentCharIndex(-1);
    };

    return {
        speak,
        speakSequence,
        stop,
        isPlaying,
        currentCharIndex,
        currentText,
        activeId
    };
}
