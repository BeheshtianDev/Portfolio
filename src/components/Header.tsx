"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Menu from "./Menu";

const Header = () => {
  const [loaded, setLoaded] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Wait 4 seconds before setting loaded = true
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 4500);

    const onScroll = () => {
      setShowLogo(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const animationBase = "transition-all duration-500 ease-out transform";
  const animationClass = loaded
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6";

  const logoAnimation = showLogo
    ? "opacity-100 translate-y-0"
    : "opacity-0 -translate-y-4";

  const delay = (i: number) => ({ transitionDelay: `${i * 120}ms` });

  return (
    <div className="w-full flex justify-end font-medium gap-[350px] sticky top-0 p-5 z-20">
      <Link
        href="/"
        className={`text-2xl text-white absolute font-bold left-10 ${animationBase} ${logoAnimation}`}
        style={delay(2)}
      >
        <span className="font-semibold text-[50px] opacity-50 ">
          B
        </span>

        <span className="ml-[-17px] opacity-98">EHESHTIAN</span>
      </Link>

      {/* Tehran Text with Loaded Animation */}
      <div
        className={`text-white/60 hover:text-white group mo:hidden de:flex justify-center items-center gap-2 ${animationBase} ${animationClass}`}
        style={delay(1)}
      >
        Tehran, Iran
        <span className="w-2 h-2 bg-white/60 group-hover:bg-white mt-0.5 rounded-full transition-all duration-500"></span>
      </div>

      {/* Nav Links */}
      <div className="gap-5 mo:hidden de:flex">
        {["Work", "Services", "About", "Contact"].map((item, index) => (
          <Link
            key={item}
            href="/work"
            className={`relative group inline-block text-white/60 hover:text-white transition-all duration-200 ${animationBase} ${animationClass}`}
            style={delay(index)}
          >
            {item}
            <span className="absolute left-0 -bottom-0.5 h-[1px] w-full origin-left scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left" />
          </Link>
        ))}
      </div>

      <Menu />
    </div>
  );
};

export default Header;
