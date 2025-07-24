"use client";

import { useEffect, useState } from "react";

const EyeBlink = () => {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [showPupils, setShowPupils] = useState(false);
  const [blinkClassLeft, setBlinkClassLeft] = useState("");
  const [blinkClassRight, setBlinkClassRight] = useState("");

  useEffect(() => {
    // Opening sequence
    const timer1 = setTimeout(() => setLeftOpen(true), 7500);
    const timer2 = setTimeout(() => setRightOpen(true), 7500);
    const timer3 = setTimeout(() => setShowPupils(true), 7700);

    // Initial triple blink after opening
    const timer4 = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        setBlinkClassLeft("blink");
        setBlinkClassRight("blink");
        setTimeout(() => {
          setBlinkClassLeft("");
          setBlinkClassRight("");
        }, 150);
        count++;
        if (count === 3) clearInterval(interval);
      }, 600);
    }, 7700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  // Continuous blinking every 2s with delay between left and right
  useEffect(() => {
    const startBlinking = setTimeout(() => {
      const interval = setInterval(() => {
        setBlinkClassLeft("blink");
        setTimeout(() => {
          setBlinkClassLeft("");
          setBlinkClassRight("blink");
          setTimeout(() => setBlinkClassRight(""), 100);
        }, 100);
      }, 4000);
  
      // Store the interval ID for cleanup
      return () => clearInterval(interval);
    }, 4500); // wait for open + triple blink
  
    return () => clearTimeout(startBlinking);
  }, []);

  useEffect(() => {
    const pupilRadius = 10;
    const highlightRadius = 3;
    const highlightOffset = pupilRadius - highlightRadius - 1;

    const updateEyes = (e: MouseEvent) => {
      const eyes = document.getElementById("eyes");
      if (!eyes) return;

      const rect = eyes.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx);

      const pupilOffsetX = Math.cos(angle) * pupilRadius;
      const pupilOffsetY = Math.sin(angle) * pupilRadius;

      const highlightOffsetX = Math.cos(angle) * highlightOffset;
      const highlightOffsetY = Math.sin(angle) * highlightOffset;

      const pupilLeft = document.getElementById("pupil-left");
      const pupilRight = document.getElementById("pupil-right");
      const highlightLeft = document.getElementById("highlight-left");
      const highlightRight = document.getElementById("highlight-right");

      pupilLeft?.setAttribute(
        "transform",
        `translate(${pupilOffsetX}, ${pupilOffsetY})`
      );
      pupilRight?.setAttribute(
        "transform",
        `translate(${pupilOffsetX}, ${pupilOffsetY})`
      );

      highlightLeft?.setAttribute(
        "transform",
        `translate(${pupilOffsetX + highlightOffsetX}, ${
          pupilOffsetY + highlightOffsetY
        })`
      );
      highlightRight?.setAttribute(
        "transform",
        `translate(${pupilOffsetX + highlightOffsetX}, ${
          pupilOffsetY + highlightOffsetY
        })`
      );
    };

    window.addEventListener("mousemove", updateEyes);
    return () => window.removeEventListener("mousemove", updateEyes);
  }, []);

  return (
    <div className="flex justify-center items-center w-full blur-[0.5px] h-full pt-[3vw] z-10 opacity-90 relative">
      <style>
        {`
          @keyframes eyeOpen {
            from { ry: 1; }
            to { ry: 40; }
          }

          @keyframes eyeBlink {
            0% { ry: 40; }
            50% { ry: 1; }
            100% { ry: 40; }
          }

          .open {
            animation: eyeOpen 0.2s ease-out forwards;
          }

          .blink {
            animation: eyeBlink 0.5s ease-in-out forwards;
          }
        `}
      </style>

      <svg viewBox="0 0 200 120" className="w-[300px] h-[180px]" id="eyes">
        {/* Eyeballs */}
        <ellipse
          className={`${leftOpen ? "open" : ""} ${blinkClassLeft}`}
          cx="80"
          cy="60"
          rx="30"
          ry="1"
          fill="#fff"
          stroke="#000"
          strokeWidth="3"
        />
        <ellipse
          className={`${rightOpen ? "open" : ""} ${blinkClassRight}`}
          cx="140"
          cy="60"
          rx="30"
          ry="1"
          fill="#fff"
          stroke="#000"
          strokeWidth="3"
        />

        {/* Pupils */}
        {showPupils && (
          <>
            <circle id="pupil-left" cx="80" cy="60" r="10" fill="#000" />
            <circle id="pupil-right" cx="140" cy="60" r="10" fill="#000" />
            <circle
              id="highlight-left"
              cx="80"
              cy="60"
              r="3"
              fill="#fff"
              opacity="0.9"
            />
            <circle
              id="highlight-right"
              cx="140"
              cy="60"
              r="3"
              fill="#fff"
              opacity="0.9"
            />
          </>
        )}
      </svg>
    </div>
  );
};

export default EyeBlink;
