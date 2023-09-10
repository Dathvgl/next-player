"use client";

import { AnimatePresence } from "framer-motion";
import { MotionDiv } from "~/lib/motion";
import { ChildReact } from "~/types/type";

export default function PageTransition({ children }: ChildReact) {
  return (
    <AnimatePresence mode="wait">
      <MotionDiv
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        {children}
      </MotionDiv>
    </AnimatePresence>
  );
}
