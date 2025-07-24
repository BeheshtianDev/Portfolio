"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function BackToTop() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 1) * 10; // -5 to +5
      const y = (e.clientY / window.innerHeight - 1) * 10; // -5 to +5

      if (ref.current) {
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const resetTransform = () => {
      if (ref.current) {
        ref.current.style.transform = "translate(0, 0)";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", resetTransform);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", resetTransform);
    };
  }, []);

  return (
    <a
      ref={ref}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="  font-medium flex justify-center opacity-70 hover:opacity-90 transition-all duration-300 ease-out gap-2 group items-center"
    >
      <Image
        src="/arrow-up.svg"
        width={20}
        height={20}
        alt="hero"
        className="invert stroke-2 -rotate-90 group-hover:rotate-0 group-hover:mb-1 transition-all duration-500"
      />
      Back To Top
    </a>
  );
}
