"use client";
import React, { useEffect, useState } from "react";

const TopFooter = () => {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 4500); // Just like Header

    const onScroll = () => {
      setVisible(window.scrollY < 100);
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

  const visibilityClass = visible
    ? "opacity-100 pointer-events-auto"
    : "opacity-0 pointer-events-none";

  // 👇 This delay is only useful for the initial animation (matches Header)
  const delay = (i: number) =>
    loaded ? { transitionDelay: `${i * 120}ms` } : {};

  const links = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/mahdi-beheshtian" },
    { name: "GitHub", href: "https://github.com/BeheshtianDev" },
    { name: "Instagram", href: "https://instagram.com/your-handle" },
    { name: "Gmail", href: "mailto:beheshtiandev@gmail.com" },
  ];

  return (
    <div
      className={`w-full h-[50px] absolute bottom-0 de:flex mo:hidden justify-between items-center pb-5 font-medium px-32 transition-opacity duration-300 ${visibilityClass}`}
    >
      <div className="flex gap-5">
        {links.map((item, index) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative group text-white/60 hover:text-white ${animationBase} ${animationClass}`}
            style={delay(index)}
          >
            {item.name}
            <span className="absolute left-0 -bottom-0.5 h-[1px] w-full origin-left scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left" />
          </a>
        ))}
      </div>
      <div className="flex opacity-80 items-center gap-2 text-white">
        <span className="animate-bounce text-xl mt-1">↓</span>
        <span className="">Scroll to Explore</span>
      </div>
      <div
        className={`${animationBase} ${animationClass} flex flex-col leading-5 pb-4 text-white/90`}
        style={delay(links.length)}
      >
        <span>© 2025, </span>
        <span className="font-normal opacity-80">All Rights Reserved</span>
      </div>
    </div>
  );
};

export default TopFooter;
