import { useState } from "react";
import { Award, Star, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { Counter } from "@/components/Counter";
import { ACHIEVEMENTS } from "@/lib/data";

const FILTERS = ["All", "Ventures", "Awards", "Certifications", "Recognition"];

const Achievements = () => {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? ACHIEVEMENTS : ACHIEVEMENTS.filter((a) => a.category === filter);
  const featured = ACHIEVEMENTS.filter((a) => a.featured);

  return (
    <>
      <section className="container py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">// Achievements</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6 max-w-4xl">
            Certificates, awards, <br />
            <span className="text-gradient">and proof of work.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Receipts of curiosity. Each one represents real hours of focus.
          </p>
        </Reveal>

        {/* Counters */}
        <div className="grid grid-cols-3 gap-4 mt-14 max-w-2xl">
          {[
            { v: ACHIEVEMENTS.filter(a => a.category === "Certifications").length, l: "Certifications" },
            { v: ACHIEVEMENTS.filter(a => a.category === "Awards").length, l: "Awards" },
            { v: ACHIEVEMENTS.filter(a => a.category === "Recognition").length, l: "Recognition" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-5">
              <div className="font-display text-4xl font-bold text-gradient">
                <Counter to={s.v} />
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED CAROUSEL */}
      <section className="container py-12">
        <Reveal>
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <Star className="w-5 h-5 text-gold fill-gold" /> Featured
          </h2>
        </Reveal>
        <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin">
          {featured.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <div className="snap-start shrink-0 w-[320px] md:w-[420px] glass-strong rounded-3xl p-8 hover-lift hover:border-gold/50 transition-all">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-gold/20 mb-6 flex items-center justify-center relative overflow-hidden">
                  {a.imageUrl ? (
                    <img src={a.imageUrl} alt={a.title} className="absolute inset-0 w-full h-full object-contain bg-white" />
                  ) : (
                    <>
                      <div className="absolute inset-0 grid-bg opacity-40" />
                      <Award className="w-20 h-20 text-gold relative" />
                    </>
                  )}
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-gold">{a.category}</span>
                <h3 className="font-display text-xl font-bold mt-2 mb-1">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.issuer} · {a.date}</p>
                {a.description && <p className="text-xs text-muted-foreground mt-2">{a.description}</p>}
                {a.link && (
                  <a href={a.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-primary mt-3 hover:underline">
                    <ExternalLink className="w-3 h-3" /> View
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FILTER + GRID */}
      <section className="container py-20">
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 h-10 rounded-full text-sm font-medium transition-all ${filter === f ? "bg-primary text-primary-foreground" : "glass hover:border-primary/40"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((a, i) => (
            <Reveal key={a.title + i} delay={i * 0.04}>
              <div className="glass rounded-3xl p-7 h-full hover-lift hover:border-primary/40 transition-all">
                <div className="flex items-start justify-between mb-5">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">{a.category}</span>
                  <span className="font-mono text-xs text-muted-foreground">{a.date}</span>
                </div>
                <h3 className="font-display text-lg font-bold mb-2 leading-tight">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.issuer}</p>
                {a.description && <p className="text-xs text-muted-foreground mt-2">{a.description}</p>}
                {a.link && (
                  <a href={a.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-primary mt-3 hover:underline">
                    <ExternalLink className="w-3 h-3" /> View
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default Achievements;
