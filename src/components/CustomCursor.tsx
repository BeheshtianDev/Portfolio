"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const viewProjectRef = useRef<HTMLDivElement>(null);
  const serviceHoverRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const blinkTimeline = useRef<gsap.core.Tween | null>(null);

  // State to detect if is mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // threshold for mobile, adjust as needed
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      // On mobile: do nothing, no event listeners or animation
      return;
    }

    // === Your existing cursor logic below ===

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
        const allImages =
          serviceHoverRef.current?.querySelectorAll("img") || [];

        allImages.forEach((img) => {
          const i = img.getAttribute("data-index");
          if (i === index) {
            img.classList.remove("opacity-0");
            img.classList.add("opacity-100");
          } else {
            img.classList.remove("opacity-100");
            img.classList.add("opacity-0");
          }
        });

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
  }, [isMobile]);

  if (isMobile) {
    return null; // don't render anything on mobile
  }

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
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-[250px] h-[250px] scale-50 opacity-0 overflow-hidden shadow-xl"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <img
            key={i}
            src={`/hover-service-${i}.jpg`}
            alt={`hover ${i}`}
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 ${
              i === 1 ? "opacity-100" : "opacity-0"
            }`}
            data-index={i}
          />
        ))}
      </div>
    </>
  );
}
