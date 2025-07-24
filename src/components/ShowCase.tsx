"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ShowCase = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      const img = section.querySelector("img");
      const text = section.querySelector(".fade-text");

      if (!img || !text) return;

      // Set initial animation states
      gsap.set(img, { opacity: 0, y: 200 });
      gsap.set(text, {
        opacity: 0,
        y: -300,
        filter: "blur(20px)",
      });

      const tl = gsap.timeline({ paused: true });

      tl.to(img, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }).to(
        text,
        {
          opacity: 0.8,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power2.out",
        },
        "-=1"
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom top",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });

      ScrollTrigger.create({
        trigger: text,
        start: "top center",
        end: "bottom top",
        toggleClass: { targets: text, className: "opacity-100" },
      });

      // Cursor-based tilt effect
      const container = section.querySelector(
        ".tilt-container"
      ) as HTMLDivElement;
      const image = container?.querySelector("img") as HTMLElement;
      if (!container || !image) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(image, {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          transformOrigin: "center",
          ease: "power2.out",
          duration: 0.3,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(image, {
          rotateX: 0,
          rotateY: 0,
          ease: "power2.out",
          duration: 0.5,
        });
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  const setRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) sectionsRef.current[index] = el;
  };

  return (
    <div className="h-auto w-full bg-gradient-to-b from-black via-transparent">
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          ref={(el) => setRefs(el, index)}
          className="h-screen w-full flex"
        >
          {index % 2 === 0 ? (
            <>
              <div className="w-1/2 h-full fade-text text-white opacity-50 text-[6.5vw] leading-[6vw] font-bold pt-36 pl-20 transition-opacity duration-300 will-change-[filter,opacity,transform]">
                RES - <br />
                PONSIVE <br /> WEB DESIGN
              </div>
              <div className="w-1/2 h-full tilt-container grayscale-75 hover:grayscale-0 z-20 hover:scale-105 transition-all duration-500 flex items-center justify-center">
                <Image
                  src={`/ex-pic${index === 0 ? "" : `-${index + 1}`}.jpg`}
                  width={2000}
                  height={2000}
                  alt=""
                  className="w-[75%] h-[75%] pic object-cover object-left will-change-transform [transform-style:preserve-3d]"
                />
              </div>
            </>
          ) : (
            <>
              <div className="w-1/2 h-full tilt-container grayscale-75 z-20 flex-col text-white hover:grayscale-0 hover:scale-105 transition-all duration-500 flex items-center justify-center">
                <Image
                  src={`/ex-pic-${index + 1}.jpg`}
                  width={2000}
                  height={2000}
                  alt=""
                  className="w-[75%] h-[75%] pic object-cover object-left will-change-transform [transform-style:preserve-3d]"
                />
                wefwefwew
              </div>
              <div className="w-1/2 h-full fade-text text-white opacity-50 text-[6.5vw] leading-[6vw] font-bold pt-36 pl-20 transition-opacity duration-300 will-change-[filter,opacity,transform]">
                3D <br /> MOTION DESIGN
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowCase;
