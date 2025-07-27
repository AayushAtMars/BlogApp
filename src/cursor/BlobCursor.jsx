"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

export default function BlobCursor({
  blobType = "circle",
  fillColor = "#5227FF",
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = "rgba(255,255,255,0.8)",
  opacities = [0.3, 0.2, 0.15], // Reduced opacity values
  shadowColor = "rgba(0,0,0,0.3)", // Reduced shadow opacity
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = "blob",
  filterStdDeviation = 30,
  filterColorMatrixValues = "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10",
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = "power3.out",
  slowEase = "power1.out",
  zIndex = 9999,
}) {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);

  const handleMove = useCallback((e) => {
    const x = e.clientX;
    const y = e.clientY;

    blobsRef.current.forEach((el, i) => {
      if (!el) return;
      const isLead = i === 0;
      gsap.to(el, {
        x: x,
        y: y,
        duration: isLead ? fastDuration : slowDuration,
        ease: isLead ? fastEase : slowEase,
      });
    });
  }, [fastDuration, slowDuration, fastEase, slowEase]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
    };
  }, [handleMove]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
      style={{ zIndex }}
    >
      {useFilter && (
        <svg className="absolute w-0 h-0">
          <filter id={filterId}>
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation={filterStdDeviation}
            />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ 
          filter: useFilter ? `url(#${filterId})` : undefined,
          opacity: 0.7 // Added overall opacity to the container
        }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (blobsRef.current[i] = el)}
            className="absolute will-change-transform transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === "circle" ? "50%" : "0",
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`,
              mixBlendMode: "screen", // Added blend mode for better interaction with background
            }}
          >
            <div
              className="absolute"
              style={{
                width: innerSizes[i],
                height: innerSizes[i],
                top: (sizes[i] - innerSizes[i]) / 2,
                left: (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === "circle" ? "50%" : "0",
                opacity: 0.6, // Reduced inner circle opacity
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
