import { useEffect } from "react";
import Lenis from "lenis";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Users who ask for reduced motion get the browser's own scrolling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // duration 1.2 is what made scrolling feel like it lagged behind the
    // wheel - the viewport was still easing ~1.2s after the input stopped.
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.1,
      touchMultiplier: 1.8,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    // Without the cancel, every remount left its own loop running forever -
    // driving a destroyed Lenis instance and stacking up over the session.
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
};
