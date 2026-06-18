"use client";

import { useEffect, useRef } from "react";
import { useInView, motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";

export default function Counter({ value, direction = "up" }: { value: number; direction?: "up" | "down" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(direction === "down" ? value : 0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [count, inView, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}