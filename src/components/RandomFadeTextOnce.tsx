"use client";
import { useEffect, useState } from "react";

const RandomFadeTextOnce = ({ text }: { text: string }) => {
  const [visible, setVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);

  // Generate delays and start after 4s
  useEffect(() => {
    const randomDelays = text
      .split("")
      .map(() => Math.floor(Math.random() * 1500));
    setDelays(randomDelays);

    const timeout = setTimeout(() => setVisible(true), 6000); // 4s delay
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <div className="flex flex-wrap justify-center  de:text-[4vw] mo:text-[7vw]  blur-[0.4px] font-bold">
      {text.split("").map((char, i) => {
        const delay = delays[i] || 0;

        return (
          <span
            key={i}
            style={{
              opacity: visible ? 0.8 : 0,
              transition: "opacity 600ms ease-out, transform 600ms ease-out",
              transitionDelay: `${delay}ms`,
              display: "inline-block",
              whiteSpace: "pre", // preserve spaces
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
};

export default RandomFadeTextOnce;
