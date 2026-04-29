import { ReactNode } from "react";

export const Marquee = ({ children, reverse = false }: { children: ReactNode; reverse?: boolean }) => (
  <div className="relative overflow-hidden py-6">
    <div className="flex gap-12 marquee whitespace-nowrap" style={{ animationDirection: reverse ? "reverse" : "normal" }}>
      <div className="flex gap-12 items-center shrink-0">{children}</div>
      <div className="flex gap-12 items-center shrink-0" aria-hidden>{children}</div>
    </div>
    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
  </div>
);
