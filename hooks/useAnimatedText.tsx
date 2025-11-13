"use client";
import { useMemo } from "react";

export const useAnimatedText = (
  text: string,
  delayMultiplier: number = 0.1
) => {
  const animatedChars = useMemo(() => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="wave-char"
        style={{
          animationDelay: `${index * delayMultiplier}s`,
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [text, delayMultiplier]);

  return animatedChars;
};
