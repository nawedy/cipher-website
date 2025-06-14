// src/components/ui/animations.tsx
// Animation components for smooth transitions and micro-interactions using Framer Motion

"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  BlurFadeProps, 
  TypingAnimationProps, 
  NumberTickerProps, 
  MarqueeProps 
} from "@/types";

// Purpose: Fade in animation with blur effect for section entrances
export const BlurFade: React.FC<BlurFadeProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  inView = false,
  blur = "6px",
  yOffset = 6,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const shouldAnimate = inView ? isInView : true;

  return (
    <motion.div
      ref={ref}
      initial={{
        y: yOffset,
        opacity: 0,
        filter: `blur(${blur})`,
      }}
      animate={shouldAnimate ? {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
      } : {}}
      transition={{
        delay,
        duration,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Purpose: Typing animation effect for headlines and text
export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  duration = 50,
  startDelay = 0,
  className,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, startDelay + currentIndex * duration);

    return () => clearTimeout(timer);
  }, [currentIndex, text, duration, startDelay]);

  return (
    <span className={cn("inline-block", className)} {...props}>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

// Purpose: Number counter animation for metrics and statistics
export const NumberTicker: React.FC<NumberTickerProps> = ({
  value,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  className,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(direction === "down" ? value : 0);

  useEffect(() => {
    if (isInView) {
      const startValue = direction === "down" ? value : 0;
      const endValue = direction === "down" ? 0 : value;
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 frames
      const increment = (endValue - startValue) / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const newValue = startValue + (increment * currentStep);
        
        if (currentStep >= steps) {
          setDisplayValue(endValue);
          clearInterval(timer);
        } else {
          setDisplayValue(newValue);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value, direction]);

  const formattedValue = displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay, duration: 0.5 }}
      className={cn("tabular-nums", className)}
      {...props}
    >
      {formattedValue}
    </motion.span>
  );
};

// Purpose: Marquee scrolling animation for logos and testimonials
export const Marquee: React.FC<MarqueeProps> = ({
  children,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  speed = 40,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
      style={{
        "--duration": `${speed}s`,
      } as React.CSSProperties}
      {...props}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            }
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

// Purpose: Border beam animation for highlighted cards
export const BorderBeam: React.FC<{ className?: string; size?: number; duration?: number; delay?: number }> = ({
  className,
  size = 200,
  duration = 15,
  delay = 9,
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width,1px)+1px)_solid_transparent]",
        "[background:linear-gradient(var(--angle,0deg),transparent_20%,theme(colors.slate.400/.4)_50%,transparent_80%)_border-box]",
        "[mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)]",
        "[mask-composite:xor] [--angle:0deg]",
        className
      )}
      style={{
        "--border-width": "1px",
        "--duration": `${duration}s`,
        "--delay": `-${delay}s`,
        "--size": `${size}px`,
        animation: `border-beam var(--duration) infinite linear var(--delay)`,
      } as React.CSSProperties}
    />
  );
};

// Purpose: Animated beam connection between elements
export const AnimatedBeam: React.FC<{
  className?: string;
  containerRef: React.RefObject<HTMLElement>;
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
}> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 2,
  delay = 0,
}) => {
  const [pathD, setPathD] = useState("");

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const fromRect = fromRef.current.getBoundingClientRect();
        const toRect = toRef.current.getBoundingClientRect();

        const fromX = fromRect.left - containerRect.left + fromRect.width / 2;
        const fromY = fromRect.top - containerRect.top + fromRect.height / 2;
        const toX = toRect.left - containerRect.left + toRect.width / 2;
        const toY = toRect.top - containerRect.top + toRect.height / 2;

        const midX = (fromX + toX) / 2;
        const midY = (fromY + toY) / 2 + curvature;

        const path = `M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`;
        setPathD(path);
      }
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, [containerRef, fromRef, toRef, curvature]);

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      width="100%"
      height="100%"
      viewBox={`0 0 ${containerRef.current?.offsetWidth || 0} ${containerRef.current?.offsetHeight || 0}`}
    >
      <path
        d={pathD}
        stroke="url(#beam-gradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="5,5"
      >
        <animate
          attributeName="stroke-dashoffset"
          values={reverse ? "0;-10" : "0;10"}
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </path>
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
          <stop offset="50%" stopColor="rgba(59, 130, 246, 1)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Purpose: Staggered container for child animations
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className, staggerDelay = 0.1 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Purpose: Individual stagger item
export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.div>
  );
};

// Purpose: Hover lift effect for interactive elements
export const HoverLift: React.FC<{
  children: React.ReactNode;
  className?: string;
  scale?: number;
  rotation?: number;
}> = ({ children, className, scale = 1.05, rotation = 0 }) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        rotate: rotation,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
};

// Purpose: Pulse animation for attention-grabbing elements
export const PulseGlow: React.FC<{
  children: React.ReactNode;
  className?: string;
  color?: string;
}> = ({ children, className, color = "rgba(59, 130, 246, 0.4)" }) => {
  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          `0 0 0 0 ${color}`,
          `0 0 0 10px rgba(59, 130, 246, 0)`,
          `0 0 0 0 ${color}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Purpose: Page transition wrapper
export const PageTransition: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};