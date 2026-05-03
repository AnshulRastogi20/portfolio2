import { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}=+*^?#________";

export const TextScramble = ({ phrases, interval = 2800 }: { phrases: string[]; interval?: number }) => {
  const [text, setText] = useState(phrases[0]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % phrases.length), interval);
    return () => clearInterval(timer);
  }, [phrases.length, interval]);

  useEffect(() => {
    const target = phrases[idx];
    const oldText = text;
    const length = Math.max(oldText.length, target.length);
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = target[i] || "";
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      queue.push({ from, to, start, end });
    }
    let frame = 0;
    let raf: number;
    const update = () => {
      let output = "";
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        let { char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) char = CHARS[Math.floor(Math.random() * CHARS.length)];
          queue[i].char = char;
          output += `<span class="text-primary/60">${char}</span>`;
        } else {
          output += from;
        }
      }
      setText(output);
      if (complete < queue.length) {
        raf = requestAnimationFrame(update);
        frame++;
      }
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return <span dangerouslySetInnerHTML={{ __html: text }} />;
};
