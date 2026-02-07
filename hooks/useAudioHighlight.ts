import { useState, useEffect, useRef } from 'react';
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';

// Import silent audio file for iOS silent mode fix
const SILENCE_AUDIO = require('../assets/audio/silence.mp3');

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

    // Ref for the silent sound instance (keeps audio session alive)
    const silentSoundRef = useRef<Audio.Sound | null>(null);

    useEffect(() => {
        // Enforce Playback mode locally to ensure expo-speech doesn't revert to Ambient
        const setupAudio = async () => {
            try {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                    staysActiveInBackground: true,
                    playsInSilentModeIOS: true,
                    interruptionModeIOS: InterruptionModeIOS.DoNotMix,
                    interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
                    shouldDuckAndroid: true,
                    playThroughEarpieceAndroid: false,
                });

                // Pre-load the silent sound on iOS to have it ready
                if (Platform.OS === 'ios') {
                    const { sound } = await Audio.Sound.createAsync(SILENCE_AUDIO, { shouldPlay: false });
                    silentSoundRef.current = sound;
                    console.log('[Audio] Silent sound pre-loaded for iOS silent mode fix');
                }
            } catch (e) {
                console.warn("Failed to set local audio mode", e);
            }
        };
        setupAudio();

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
            // Cleanup silent sound
            if (silentSoundRef.current) {
                silentSoundRef.current.unloadAsync().catch(() => { });
                silentSoundRef.current = null;
            }
        };
    }, []);

    /**
     * iOS Silent Mode Fix:
     * Before speaking, we play a silent audio file using expo-av.
     * This forces iOS to activate OUR audio session with Playback category,
     * which ignores the silent switch. AVSpeechSynthesizer then inherits
     * this active session instead of creating its own AmbientSound session.
     */
    const activatePlaybackSession = async (): Promise<void> => {
        if (Platform.OS !== 'ios') return;

        try {
            // Ensure audio mode is set correctly
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                staysActiveInBackground: true,
                playsInSilentModeIOS: true,
                interruptionModeIOS: InterruptionModeIOS.DoNotMix,
                interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
            });

            // Play the silent sound to activate the Playback session
            if (silentSoundRef.current) {
                await silentSoundRef.current.setPositionAsync(0);
                await silentSoundRef.current.playAsync();
                console.log('[Audio] Silent sound played - Playback session should now be active');
            } else {
                // Fallback: create and play on the fly
                const { sound } = await Audio.Sound.createAsync(SILENCE_AUDIO, { shouldPlay: true });
                silentSoundRef.current = sound;
                console.log('[Audio] Silent sound created and played on demand');
            }
        } catch (e) {
            console.warn('[Audio] Failed to activate playback session:', e);
        }
    };

    const speakNext = async () => {
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

        // On Android, we don't support word highlighting, so we use -1 to trigger block highlighting
        if (Platform.OS === 'android') {
            setCurrentCharIndex(-1);
        } else {
            setCurrentCharIndex(0);
        }

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
        }

        // iOS Silent Mode Fix: Activate Playback session BEFORE speaking
        // This is the critical fix - we force expo-av's Playback category
        // to be active, which iOS's AVSpeechSynthesizer will then use
        await activatePlaybackSession();

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

