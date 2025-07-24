"use client";

import React, { useEffect, useRef, useState } from "react";
import BackToTop from "./BackToTop";

function useInViewAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  const style = {
    transition: "opacity 1s ease-out, transform 1s ease-out",
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(10px)",
  };

  return { ref, style };
}

const Footer = () => {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(true);
  const [linesVisible, setLinesVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  // Animations for sections
  const marqueeAnim = useInViewAnimation(0.1);
  const emailAnim = useInViewAnimation(0.1);
  const socialsAnim = useInViewAnimation(0.1);
  const bottomBarAnim = useInViewAnimation(0.1);

  useEffect(() => {
    setLoaded(true);

    const onScroll = () => {
      setVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setLinesVisible(entry.isIntersecting);
      },
      { threshold: 0.9 }
    );

    const el = footerRef.current;
    if (el) observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const animationBase = "transition-all duration-[2000] ease-out transform";
  const animationClass = loaded
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6";

  const delay = (i: number) => ({ transitionDelay: `${i * 120}ms` });
  const links = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/mahdi-beheshtian",
    },
    { name: "GitHub", href: "https://github.com/BeheshtianDev" },
    { name: "Instagram", href: "https://instagram.com/your-handle" },
    { name: "Gmail", href: "mailto:beheshtiandev@gmail.com" },
  ];

  return (
    <div
      ref={footerRef}
      className="h-screen w-full bg-gradient-to-b from-black via-black/50 to-transparent relative overflow-hidden text-white flex flex-col justify-center items-center"
    >
      {/* Marquee */}
      <div
        ref={marqueeAnim.ref}
        style={{ ...marqueeAnim.style, transitionDelay: "3000ms" }}
        className="overflow-hidden whitespace-nowrap w-full  justify-center items-start de:pt-[11vh] font-bold mo:pt-[10vh] py-2 z-20"
      >
        <div className="animate-marquee inline-block">
          {Array.from({ length: 15 }).map((_, i) => (
            <span
              key={i}
              className="px-8 hover:text-7xl de:text-[3vw] mo:text-6xl transition-all duration-700 text-white/20"
            >
              BEHESHTIAN .
            </span>
          ))}
        </div>
      </div>

      {/* Email Subscribe Section */}
      <div
        ref={emailAnim.ref}
        style={{ ...emailAnim.style, transitionDelay: "2000ms" }}
        className="h-1/3 z-10 gap-5 w-3/4 flex justify-center flex-col group items-start transition-all "
      >
        <div className="flex flex-col pl-5 w-full leading-5">
          <span className="font-medium">Be the first to know</span>
          <span className="opacity-50 font-normal text-[15px]">
            We’ll send you only what matters — no noise, no spam.
          </span>
        </div>
        <div className="flex gap-5 w-full">
          <input
            type="text"
            placeholder="Enter e-mail address"
            className="border border-white/50 rounded-full px-5 py-4 de:w-[400px] w-full outline-0 hover:bg-white/80 hover:text-black focus:bg-white/80 focus:text-black font-medium transition-all duration-500"
          />
          <button className="p-4 border border-white/50 rounded-full rotate-90 group-hover:rotate-0 transition-all hover:bg-white/80 hover:text-black duration-500">
            OK
          </button>
        </div>
      </div>

      {/* Social Links */}
      <div
        ref={socialsAnim.ref}
        style={{ ...socialsAnim.style, transitionDelay: "2500ms" }}
        className="flex h-1/3 flex-col justify-center w-full items-start   text-xl text-left font-medium text-white/90 z-10 pl-[15vw] gap-5"
      >
        Socials
        {links.map((item, index) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative group text-white/60 hover:text-white text-base font-normal ${animationBase} ${animationClass}`}
            style={delay(index)}
          >
            {item.name}
            <span className="absolute left-0 -bottom-0.5 h-[1px] w-full origin-left scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left" />
          </a>
        ))}
      </div>

      {/* Bottom Bar */}
      <div
        ref={bottomBarAnim.ref}
        style={{ ...bottomBarAnim.style, transitionDelay: "3000ms" }}
        className="flex p-13 h-1/3 justify-between z-10 flex-wrap items-end w-full"
      >
        <div className="flex flex-col leading-5 pl-3 font-bold text-white/90">
          <span>© 2025, </span>
          <span className="font-medium opacity-80 text-sm">
            All Rights Reserved
          </span>
        </div>
        <BackToTop />
        <p className="font-bold text-sm text-white/90 flex justify-end gap-3">
          <span>35.6892° N</span>
          <span>51.3890° E</span>
        </p>
      </div>

      {/* Animated Lines */}
      <span
        className={`w-full h-px bg-white/20 absolute bottom-10 origin-left transform transition-transform duration-[2000ms] delay-500 ${
          linesVisible ? "scale-x-100" : "scale-x-0"
        }`}
      />
      <span
        className={`w-px h-[82.5%] bg-white/20 absolute bottom-0 left-10 origin-bottom transform transition-transform duration-[2000ms] ${
          linesVisible ? "scale-y-100" : "scale-y-0"
        }`}
      />

      {/* Grainy Giant Text */}
      <div
        className="opacity-10 h-3/4 bottom-0 overflow-hidden text-[53vw] absolute flex justify-center items-end font-extrabold grainy-text leading-[35vw]"
        style={{ filter: "url(#grain)" }}
      >
        <span>Beh.</span>
      </div>
    </div>
  );
};

export default Footer;
