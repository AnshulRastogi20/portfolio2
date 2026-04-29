import { Reveal } from "@/components/PageTransition";
import { USES } from "@/lib/data";

const Uses = () => (
  <section className="container py-20 max-w-4xl">
    <Reveal>
      <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">// /uses</p>
      <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
        Gear, software, <br />
        <span className="text-gradient">and setup.</span>
      </h1>
      <p className="text-lg text-muted-foreground mb-14 max-w-2xl">
        Everything I actually use, day in and day out. No affiliate fluff — just what's earned its place.
      </p>
    </Reveal>
    <div className="grid md:grid-cols-2 gap-6">
      {USES.map((u, i) => (
        <Reveal key={u.category} delay={i * 0.06}>
          <div className="glass rounded-3xl p-7 h-full">
            <h2 className="font-display text-2xl font-bold mb-5">{u.category}</h2>
            <ul className="space-y-2.5">
              {u.items.map((it) => (
                <li key={it} className="flex items-center gap-3 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Uses;
