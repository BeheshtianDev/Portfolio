"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const [loaded, setLoaded] = useState(false); // new state for animation after loader
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const links = ["LinkedIn", "GitHub", "Instagram", "Gmail"];
  const socialRefs = useRef<HTMLAnchorElement[]>([]);
  socialRefs.current = []; // reset on remount

  const addToSocialRefs = (el: HTMLAnchorElement) => {
    if (el && !socialRefs.current.includes(el)) {
      socialRefs.current.push(el);
    }
  };
  itemsRef.current = [];
  const addToRefs = (el: HTMLAnchorElement) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  // Animate menu open/close with GSAP timeline (unchanged)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      tl.current = gsap.timeline({
        onComplete: () => setIsFullyOpen(true),
      });
      tl.current.to(
        overlayRef.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          pointerEvents: "auto",
        },
        0
      );
      tl.current.to(
        menuRef.current,
        {
          x: "0%",
          y: "0%",
          duration: 0.7,
          ease: "power3.out",
        },
        ">"
      );
      tl.current.fromTo(
        itemsRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "power3.out",
        },
        ">"
      );
      tl.current.fromTo(
        socialRefs.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.8"
      );
    } else {
      document.body.style.overflow = "auto";
      if (tl.current) {
        tl.current.reverse().eventCallback("onReverseComplete", () => {
          setIsFullyOpen(false);
          gsap.set(overlayRef.current, { opacity: 0, pointerEvents: "none" });
          gsap.set(menuRef.current, { x: "100%", y: "-100%" });
          gsap.set(itemsRef.current, { y: -20, opacity: 0 });
        });
      }
    }
  }, [isOpen]);

  // New: set loaded true after 4s delay to trigger button animation
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Animation classes for button fade + slide up
  const animationBase = "transition-all duration-700 ease-out transform";
  const animationClass = loaded
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6";

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative group inline-block transition-all z-40 duration-500 ${
          isFullyOpen ? "text-black" : "text-white/70 hover:text-white/100"
        } ${animationBase} ${animationClass}`}
      >
        {isFullyOpen ? "Close" : "Menu"}
        <span
          className={`absolute left-0 -bottom-0.5 h-[1px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left group-hover:transition-transform ${
            isFullyOpen ? "bg-black" : "bg-white"
          }`}
        />
      </button>

      {/* Background overlay */}
      <div
        ref={overlayRef}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm  z-20 pointer-events-none opacity-0"
      />

      {/* Menu panel */}
      <div
        ref={menuRef}
        className="menu fixed top-0 de:pt-0 mo:pt-20 right-0 h-full flex flex-col justify-between  de:w-2/3 mo:w-full bg-white shadow-lg transition-none z-30"
        style={{ transform: "translate(100%, -100%)" }}
      >
        <Link
          href="/"
          className={`text-2xl text-black de:hidden mo:inline  absolute top-5 font-bold left-5 transition-all duration-500 ${
            isFullyOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="font-semibold text-[50px] opacity-50 ">B</span>

          <span className="ml-[-17px] opacity-98">EHESHTIAN</span>
        </Link>
        <ul className="p-6 de:pt-15 mo:pt-10  mo:text-[6vw] de:text-[4vw] flex flex-col">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <Link
              href="#"
              key={item}
              ref={addToRefs}
              className="group relative inline-block font-bold border-b overflow-hidden"
            >
              <span className="relative z-10 block px-2 py-1 transition-colors duration-500 group-hover:text-white">
                {item}
              </span>
              <span
                className="absolute inset-0 z-0 translate-y-full bg-black transition-transform duration-500 group-hover:translate-y-0"
                aria-hidden="true"
              />
            </Link>
          ))}
        </ul>

        <div className="flex  flex-col w-full items-end gap-5 p-6">
          {links.map((item, index) => (
            <a
              key={item}
              href=""
              ref={addToSocialRefs}
              className=" text-black/60 hover:text-black/85 border-b w-1/2 group flex  items-center justify-between transition-all duration-300 "
            >
              {item}
              <div className="w-7 h-7 backdrop-blur-md border-black/10 border-[0.5px] m-1 backdrop-brightness-90 group-hover:backdrop-brightness-[85%] flex justify-center items-center  transition-all duration-500  rounded-full">
                <Image
                  src="/right-arrow.svg"
                  width={15}
                  height={15}
                  alt="hero"
                  className="group-hover:-rotate-45 transition-all duration-300"
                />
              </div>
            </a>
          ))}
        </div>
        <div className="flex flex-col leading-5 p-6 font-bold text-black/90">
          <span>© 2025, </span>
          <span className="font-medium opacity-80 text-sm ">
            All Rights Reserved{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
