"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const viewProjectRef = useRef<HTMLDivElement>(null);
  const serviceHoverRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const blinkTimeline = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // === Check elements under cursor ===
      const target = e.target as HTMLElement;
      const isTextInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("input") !== null ||
        target.closest("textarea") !== null;
      const isCursorPointer =
        target.closest("a, button, [role='button'], .cursor-pointer") !== null;
      const isPic = target.closest(".pic") !== null;

      const serviceEl = target.closest("[class*=service]");
      const isService = serviceEl !== null;

      // === Handle .pic View Project Hover ===
      if (isPic) {
        gsap.to(viewProjectRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(3)",
        });
        gsap.to([outerRef.current, innerRef.current, serviceHoverRef.current], {
          opacity: 0,
          duration: 0.1,
        });
        killBlink();
        return;
      } else {
        gsap.to(viewProjectRef.current, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // === Handle .serviceX Hover ===
      if (isService) {
        const index = serviceEl.className.match(/service(\d+)/)?.[1];
        const imagePath = `/hover-service-${index}.jpg`;
        if (serviceHoverRef.current) {
          (
            serviceHoverRef.current.querySelector("img") as HTMLImageElement
          ).src = imagePath;
        }

        gsap.to(serviceHoverRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to([outerRef.current, innerRef.current, viewProjectRef.current], {
          opacity: 0,
          duration: 0.1,
        });
        killBlink();
        return;
      } else {
        gsap.to(serviceHoverRef.current, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // === Handle normal pointer ===
      gsap.to(outerRef.current, {
        width: 40,
        height: 40,
        opacity: 0.6,
        duration: 0.6,
      });

      if (isTextInput) {
        gsap.to(innerRef.current, {
          width: 2,
          height: 19,
          borderRadius: 1,
          duration: 0.2,
        });
        if (!blinkTimeline.current) {
          blinkTimeline.current = gsap.to(innerRef.current, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
          });
        }
      } else if (isCursorPointer) {
        gsap.to(innerRef.current, {
          width: 10,
          height: 10,
          borderRadius: 9999,
          opacity: 1,
          duration: 0.2,
        });
        killBlink();
      } else {
        gsap.to(outerRef.current, {
          width: 70,
          height: 70,
          opacity: 0.2,
          duration: 0.6,
        });
        gsap.to(innerRef.current, {
          width: 20,
          height: 20,
          borderRadius: 9999,
          opacity: 1,
          duration: 0.25,
        });
        killBlink();
      }
    };

    const handleClick = () => {
      gsap.to(innerRef.current, { scale: 1.5, duration: 0.2 });
      gsap.to(outerRef.current, {
        scale: 0.7,
        duration: 0.2,
        onComplete: () => {
          gsap.to([innerRef.current, outerRef.current], {
            scale: 1,
            duration: 0.3,
          });
        },
      });
    };

    const killBlink = () => {
      if (blinkTimeline.current) {
        blinkTimeline.current.kill();
        blinkTimeline.current = null;
        gsap.set(innerRef.current, { opacity: 1 });
      }
    };

    const render = () => {
      const { x, y } = mouse.current;

      gsap.to(outerRef.current, {
        x,
        y,
        duration: 0.2,
      });

      gsap.to(innerRef.current, {
        x,
        y,
        duration: 0.5,
      });

      gsap.to(viewProjectRef.current, {
        x,
        y,
        duration: 0.5,
      });

      gsap.to(serviceHoverRef.current, {
        x,
        y,
        duration: 0.4,
      });

      requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", handleClick);
    render();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", handleClick);
      if (blinkTimeline.current) {
        blinkTimeline.current.kill();
      }
    };
  }, []);

  return (
    <>
      {/* Outer Cursor */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed top-0 left-0 mix-blend-difference w-[70px] h-[70px] border-2 border-white rounded-full z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Inner Cursor */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed top-0 left-0 mix-blend-difference w-4 h-4 bg-white rounded-full z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* View Project Cursor */}
      <div
        ref={viewProjectRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-32 w-32 scale-50 opacity-0 rounded-full flex justify-center text-center items-center text-white text-sm font-light backdrop-blur-md backdrop-brightness-75"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        View <br />
        Project
      </div>

      {/* Hover Image for Service */}
      <div
        ref={serviceHoverRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-[250px] h-[250px] scale-50 opacity-0 overflow-hidden  shadow-xl"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <img
          src="/hover-service-1.jpg"
          alt="hover"
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>
    </>
  );
}
