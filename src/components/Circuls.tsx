import React, { useEffect, useRef, useState } from 'react'
import RandomFadeText from './RandomFadeText';

const Circuls = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [rotateForward, setRotateForward] = useState(false);
    const lastScrollY = useRef(0);
    const hasEntered = useRef(false);

    useEffect(() => {
      const handleScroll = () => {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const triggerStart = window.innerHeight * 0.8;
        const triggerEnd = window.innerHeight * 0.1;

        const inView = rect.top < triggerStart && rect.bottom > triggerEnd;

        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY.current;
        const scrollingUp = currentScrollY < lastScrollY.current;
        lastScrollY.current = currentScrollY;

        // Scroll Down + Section Entered
        if (inView && scrollingDown && !hasEntered.current) {
          setRotateForward(true);
          hasEntered.current = true;
        }

        // Scroll Up into Section
        if (inView && scrollingUp && hasEntered.current) {
          setRotateForward(false);
          hasEntered.current = false;
        }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  return (
    <div
      ref={sectionRef}
      className="de:h-screen mo:h-[80vh] w-full flex justify-center items-center bg-black mt-[-100px]"
    >
      <RandomFadeText text="TAKE CONTROL AND GROW" />

      {[0, 6, 12, 20].map((deg, i) => {
        const rotation = rotateForward ? -deg : deg;
        return (
          <span
            key={i}
            className="w-[80vw] h-[25vw] border-[0.05px] rounded-[50%] absolute border-white/50 transition-all duration-[2000ms]"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDelay: `${i * 200}ms`,
            }}
          />
        );
      })}
    </div>
  );
}

export default Circuls
