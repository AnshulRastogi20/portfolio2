import { motion } from "framer-motion";
import { ReactNode } from "react";

// AnimatePresence mode="wait" plays exit fully before enter starts, so these
// two durations are additive on every navigation. At 0.5s each that was a
// full second of blank screen before the new page appeared - most of the
// "loading is slow" feeling was this, not the network.
export const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const Reveal = ({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);
