"use client";

import { useEffect, useState } from "react";

const TARGET_TEXT = "BEHESHTIAN.";
const CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Preloader() {
  const [displayText, setDisplayText] = useState("");
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let currentIndex = 0;
    let iterations = 0;
    let revealed = "";

    const glitchLetter = (targetChar: string, callback: () => void) => {
      iterations = 0;

      const glitchInterval = setInterval(() => {
        const randomChar =
          CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        setDisplayText(revealed + randomChar);
        iterations++;

        if (iterations > 4) {
          clearInterval(glitchInterval);
          revealed += targetChar;
          setDisplayText(revealed);
          setProgress(
            Math.round((revealed.length / TARGET_TEXT.length) * 100) // Rounded %
          );
          callback();
        }
      }, 60);
    };

    const revealNextChar = () => {
      if (currentIndex < TARGET_TEXT.length) {
        glitchLetter(TARGET_TEXT[currentIndex], () => {
          currentIndex++;
          revealNextChar();
        });
      } else {
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "auto";
        }, 800);
      }
    };

    revealNextChar();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Scroll to top exactly when loader fades away
  useEffect(() => {
    if (done) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [done]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex  items-center justify-center bg-black transition-opacity duration-300 text-white font-bold ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ minHeight: "100vh" }}
    >
      <span className="text-4xl  ">{displayText}</span>
      <span className=" text-base  opacity-90 absolute left-10">{progress}%</span>
    </div>
  );
}
