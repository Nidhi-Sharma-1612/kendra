"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin rose line under the header that fills as the reader scrolls through the post. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-[4.5rem] z-40 h-0.5 origin-left bg-blossom-500" />;
}
