import { useEffect, useRef } from "react";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  // A ref, not state: hover used to be state, so every mouseover re-rendered
  // the tree and tore down + rebuilt the loop and both listeners.
  const hovering = useRef(false);

  useEffect(() => {
    // Touch / pen devices never render the cursor, so don't run a loop for it.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    const scale = { dot: 1, ring: 1 };

    const animate = () => {
      const dx = target.current.x - ring.current.x;
      const dy = target.current.y - ring.current.y;
      ring.current.x += dx * 0.18;
      ring.current.y += dy * 0.18;

      const wantDot = hovering.current ? 0 : 1;
      const wantRing = hovering.current ? 1.6 : 1;
      scale.dot += (wantDot - scale.dot) * 0.2;
      scale.ring += (wantRing - scale.ring) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%,-50%) scale(${scale.dot})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%,-50%) scale(${scale.ring})`;
      }

      // Park the loop once everything has settled. It used to run at 60fps
      // forever, even on an idle page with the cursor sitting still.
      const settled =
        Math.abs(dx) < 0.1 &&
        Math.abs(dy) < 0.1 &&
        Math.abs(wantDot - scale.dot) < 0.01 &&
        Math.abs(wantRing - scale.ring) < 0.01;
      raf = settled ? 0 : requestAnimationFrame(animate);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      wake();
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const next = !!t.closest("a, button, [role='button']");
      if (next !== hovering.current) {
        hovering.current = next;
        wake();
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};
