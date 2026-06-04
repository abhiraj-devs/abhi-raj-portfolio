"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { twMerge } from "tailwind-merge";

export const FlipWords = ({ words, duration = 3000, className, style }) => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(timer);
  }, [words, duration]);

  const currentWord = words[wordIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentWord}
        className="z-10 inline-block relative text-left"
        style={style}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
      >
        {currentWord.split("").map((letter, i) => {
          // Random-looking but deterministic scatter values per letter
          const seed = (i * 137.508 + wordIndex * 31) % 360;
          const seedRad = (seed * Math.PI) / 180;
          const particleScale = 0.04 + (i % 5) * 0.015; // tiny final scale

          return (
            <motion.span
              key={`${currentWord}-${i}`}
              initial={{
                opacity: 0,
                scale: particleScale,
                filter: "blur(14px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: particleScale,
                filter: "blur(16px)",
                transition: {
                  duration: 0.38,
                  ease: "easeIn",
                  delay: i * 0.018,
                },
              }}
              transition={{
                opacity: { duration: 0.4, ease: "easeOut", delay: i * 0.022 },
                scale: { duration: 0.45, ease: "easeOut", delay: i * 0.022 },
                filter: { duration: 0.4, ease: "easeOut", delay: i * 0.022 },
              }}
              className={twMerge("inline-block", className)}
              style={{ display: "inline-block", transformOrigin: "center", ...style }}
            >
              {letter === " " ? "\u00a0" : letter}
            </motion.span>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
