import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let rx = -100, ry = -100;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const animate = () => {
      rx += (pos.x - rx) * 0.18;
      ry += (pos.y - ry) * 0.18;
      setRingPos({ x: rx, y: ry });
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [role='button']"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [pos.x, pos.y]);

  return (
    <>
      <div className="cursor-dot" style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%,-50%) scale(${hovering ? 0 : 1})` }} />
      <div
        className="cursor-ring"
        style={{
          transform: `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%,-50%) scale(${hovering ? 1.6 : 1})`,
        }}
      />
    </>
  );
};
