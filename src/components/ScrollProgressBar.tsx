"use client";
import { useEffect, useState, useRef } from "react";

export default function ScrollProgressBar() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(scrolled);

      // Show while scrolling
      setVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(false), 500);
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Scroll percentage number on the left */}
      <div
        className={`fixed left-5 top-1/2 text-white/90 text-sm font-medium  z-50 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {Math.round(scrollPercent)}%
      </div>

      {/* Vertical scroll bar on the right */}
      <div
        className={`fixed right-5 top-1/3 h-[400px] w-[3px] z-50 bg-white/30 flex justify-start items-start transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span
          className="w-full bg-white/80"
          style={{ height: `${scrollPercent}%` }}
        />
      </div>
    </>
  );
}
