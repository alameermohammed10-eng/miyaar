import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

export type MascotMood = 'idle' | 'happy' | 'curious' | 'surprised' | 'talking' | 'sleepy';

interface MascotContextType {
  mood: MascotMood;
  customSpeech: string | null;
  triggerReaction: (mood: MascotMood, speech?: string, durationMs?: number) => void;
  resetMood: () => void;
}

const MascotContext = createContext<MascotContextType>({
  mood: 'idle',
  customSpeech: null,
  triggerReaction: () => {},
  resetMood: () => {},
});

export const useMascot = () => useContext(MascotContext);

export const MascotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mood, setMood] = useState<MascotMood>('idle');
  const [customSpeech, setCustomSpeech] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const triggerReaction = useCallback((newMood: MascotMood, speech?: string, durationMs = 2800) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setMood(newMood);
    if (speech) {
      setCustomSpeech(speech);
    }

    timeoutRef.current = window.setTimeout(() => {
      setMood('idle');
      setCustomSpeech(null);
    }, durationMs);
  }, []);

  const resetMood = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setMood('idle');
    setCustomSpeech(null);
  }, []);

  return (
    <MascotContext.Provider value={{ mood, customSpeech, triggerReaction, resetMood }}>
      {children}
    </MascotContext.Provider>
  );
};
