"use client";

import React, { useEffect, useRef } from "react";

const BackgroundVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let scrollTimeout: NodeJS.Timeout | null = null;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay failed:", error);
        });
      }
    };

    const handleScroll = () => {
      if (window.scrollY === 0) {
        tryPlay();
        if (scrollTimeout) clearTimeout(scrollTimeout);
        return;
      }

      tryPlay();

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        video.pause();
      }, 500);
    };

    if (window.scrollY === 0) {
      tryPlay();
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  // 👇 Mouse-based drag effect
  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;

      const offsetX = (e.clientX - centerX) / 20; // sensitivity
      const offsetY = (e.clientY - centerY) / 20;

      targetX = offsetX;
      targetY = offsetY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-screen scale-110 -z-10 overflow-y-hidden transition-transform"
    >
      <video
        ref={videoRef}
        src="/3d2.mp4"
        loop
        muted
        playsInline
        className="w-full h-full  object-cover brightness-50 grayscale"
      />
    </div>
  );
};

export default BackgroundVideo;
