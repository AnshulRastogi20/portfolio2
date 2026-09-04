import { Reveal } from "@/components/PageTransition";
import { NOW } from "@/lib/data";

const Now = () => (
  <section className="container py-20 max-w-3xl">
    <Reveal>
      <p className="font-mono text-xs uppercase tracking-widest text-brand mb-4">// /now</p>
      <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-4">
        What I'm <span className="text-gradient">doing now.</span>
      </h1>
      <p className="font-mono text-xs text-muted-foreground mb-12">Last updated · {NOW.updated}</p>
    </Reveal>
    <div className="space-y-5">
      {NOW.items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.06}>
          <div className="glass rounded-3xl p-7">
            <div className="font-mono text-xs uppercase tracking-wider text-brand mb-3">{item.title}</div>
            <p className="text-lg leading-relaxed">{item.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
    <Reveal delay={0.3}>
      <p className="text-sm text-muted-foreground mt-12 italic">
        Inspired by <a href="https://nownownow.com" className="text-brand hover:underline">/now movement</a>.
      </p>
    </Reveal>
  </section>
);

export default Now;
