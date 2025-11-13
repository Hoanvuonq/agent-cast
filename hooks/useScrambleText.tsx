"use client";

import { useState, useRef, useCallback, useMemo } from "react";

/**
 * @param originalText 
 * @param duration 
 */
const useScrambleText = (originalText: string, duration: number = 1000) => {
  const [text, setText] = useState(originalText);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const charSet = useMemo(() => {
    const uniqueChars = [...new Set(originalText.split(""))].filter(
      (char) => char !== " "
    );
    
    if (uniqueChars.length === 0) {
      return ["?", "*", "!"];
    }
    return uniqueChars;
  }, [originalText]);

  const scrambleIteration = useCallback(() => {
    let scrambled = "";
    for (let i = 0; i < originalText.length; i++) {
      if (originalText[i] === " ") {
        scrambled += " ";
      } else {
        scrambled += charSet[Math.floor(Math.random() * charSet.length)];
      }
    }
    setText(scrambled);
  }, [originalText, charSet]);

  const startScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    intervalRef.current = setInterval(scrambleIteration, 60);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setText(originalText);
    }, duration);
  }, [originalText, duration, scrambleIteration]);

  const resetToOriginal = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setText(originalText);
  }, [originalText]);

  return {
    text, 
    handlers: {
      onMouseEnter: startScramble,
      onMouseLeave: resetToOriginal,
    },
  };
};

export default useScrambleText;