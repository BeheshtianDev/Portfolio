import { useEffect, useRef, useState } from "react";

const RandomFadeText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);

  // Generate random delays once, stable for the letters
  useEffect(() => {
    const generated = text.split("").map(() => Math.floor(Math.random() * 1200));
    setDelays(generated);
  }, [text]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap justify-center text-white/75 text-[3vw] font-bold"
    >
      {text.split("").map((char, i) => {
        const delay = delays[i] || 0;

        return (
          <span
            key={i}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(0)",
              transitionProperty: "opacity, transform",
              transitionDuration: "1000ms",
              transitionTimingFunction: "ease-out",
              transitionDelay: `${delay}ms`,
              display: "inline-block",
              whiteSpace: "pre", // keep spaces
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
};

export default RandomFadeText;
