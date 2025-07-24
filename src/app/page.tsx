"use client";
import { useEffect, useRef, useState } from "react";
import BackgroundVideo from "@/components/BackgroundVideo";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import TopFooter from "@/components/TopFooter";
import EyeTracker from "@/components/EyeTracker";
import ShowCase from "@/components/ShowCase";
import ServicesList from "@/components/ServicesList";
import Footer from "@/components/Footer";
import Circuls from "@/components/Circuls";
import RandomFadeTextOnce from "@/components/RandomFadeTextOnce";
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const firstSectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setLoaded(true);
  }, []);

  const animationBase = "transition-all duration-700 ease-out transform";
  const animationClass = loaded
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6";
  const delay = (i: number) => ({ transitionDelay: `${4000 + i * 150}ms` });
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // speed of animation
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth + springy
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let lastScrollY = 0;
    let initialScrollBlocked = true;

    // ⏳ Prevent scroll for first 1 second
    setTimeout(() => {
      initialScrollBlocked = false;
    }, 1000);

    const onScroll = () => {
      if (!firstSectionRef.current) return;
      const rect = firstSectionRef.current.getBoundingClientRect();

      const inHero =
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        !initialScrollBlocked;

      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY;

      if (initialScrollBlocked) {
        // do nothing
      } else if (inHero && !scrollingUp) {
        (lenis as any).options.duration = 3; // smooth slow scroll down
      } else {
        (lenis as any).options.duration = 1.5; // normal elsewhere
      }
      lastScrollY = currentScrollY;
    };

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    window.addEventListener("scroll", onScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="h-auto w-full hide-scrollbar ">
      <svg className="hidden ">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
          />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="darken" />
        </filter>
      </svg>
      ;
      <BackgroundVideo />
      <div
        ref={firstSectionRef}
        className="h-screen w-full bg-transparent justify-between de:items-start mo:items-center text-white flex de:flex-row mo:flex-col"
      >
        {/* overlays */}
        <div
          className="h-screen w-full absolute top-0 left-0 opacity-9"
          style={{ filter: "url(#grain)" }}
        ></div>
        <div className="w-full h-full bg-gradient-to-b top-0 from-transparent via-transparent absolute to-black"></div>

        <TopFooter />

        <div className="de:pt-32 de:pl-32 mo:p-0 mo:pt-32 flex flex-col justify-start items-start de:leading-[6vw] mo:leading-[11vw]">
          <span
            className={`${animationBase} ${animationClass} de:text-[8vw] mo:text-[14vw] font-bold blur-[0.4px]`}
            style={delay(8)}
          >
            BEHESHTIAN.
          </span>
          <RandomFadeTextOnce text="Front-end Developer" />
          <div
            className={`${animationBase} ${animationClass} w-3/4`}
            style={delay(20)}
          >
            <EyeTracker />
          </div>
        </div>

        <div
          className={`de:h-screen mo:h-auto de:w-1/2 mo:w-full  transition-all duration-700 ease-out transform ${
            loaded ? "opacity-90 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "8000ms" }}
        >
          <div className="flex de:pl-[2vw] mo:pl-0 de:pt-64 mo:pt-0 de:h-screen mo:h-[80vw] justify-around flex-col text-lg">
            <div className="text-2xl group z-10 h-full de:justify-center mo:justify-start flex flex-col font-bold mo:p-20 de:p-0 de:leading-0 mo:leading-7 hover:leading-7 transition-all duration-300">
              <span className="de:opacity-0 mo:opacity-100 group-hover:opacity-100 transition-all duration-500">
                Only.
              </span>
              <span className="de:opacity-0 mo:opacity-100 group-hover:opacity-100 transition-all duration-500">
                From Me To You
              </span>
              <span className="relative group">
                Always Responsive .
                <span className="absolute left-0 -bottom-3 h-[1px] de:w-[20vw] mo:w-full origin-left de:scale-x-0 mo:scale-x-100 bg-white transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left group-hover:transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Other sections below – untouched */}
      <div className="w-full h-auto bg-transparent backdrop-blur-sm">
        <Circuls />
        <ShowCase />
        <ServicesList />
        <Footer />
      </div>
    </div>
  );
}
