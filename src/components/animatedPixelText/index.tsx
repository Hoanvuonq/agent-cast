"use client";
import React from "react";
import { useAnimatedText } from "../../../hooks/useAnimatedText";

interface IAnimatedPixel {
  text: string;
  className?: string;
  delayMultiplier?: number;
}

export const AnimatedPixelText: React.FC<IAnimatedPixel> = ({
  text,
  className = "",
  delayMultiplier = 0.1,
}) => {
  const chars = useAnimatedText(text, delayMultiplier);

  return (
    <span className={`pixel-text inline-block ${className}`}>{chars}</span>
  );
};
