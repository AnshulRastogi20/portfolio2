import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { PROJECT_CATEGORIES, PROJECTS, SKILLS } from "@/lib/data";

const Skills = () => {
  const [active, setActive] = useState<string>("web");
  const filtered = PROJECTS.filter((p) => p.category === active);

  return (
    <>
      {/* HERO */}
      <section className="container py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">// Skills & Projects</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6 max-w-4xl">
            Three crafts. <br />
            <span className="text-gradient">One obsession with quality.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            I work across web, video, and design — usually all three at once. Pick a category to see real projects.
          </p>
        </Reveal>
      </section>

      {/* CATEGORY TABS */}
      <section className="container py-12">
        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {PROJECT_CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <button
                onClick={() => setActive(c.slug)}
                className={`w-full text-left glass rounded-3xl p-7 transition-all hover-lift ${active === c.slug ? "border-primary bg-primary/10" : "hover:border-primary/30"}`}
              >
                <div className="font-display text-5xl text-primary/50 mb-4">{c.icon}</div>
                <h3 className="font-display text-xl font-bold mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{c.desc}</p>
                <span className="font-mono text-xs text-primary">{c.count} projects</span>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Project list */}
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <div className="group glass rounded-3xl p-7 hover-lift hover:border-primary/40 transition-all">
                <div className="aspect-[16/10] rounded-2xl bg-gradient-mesh mb-6 relative overflow-hidden">
                  {p.coverUrl ? (
                    <img src={p.coverUrl} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="absolute inset-0 grid-bg opacity-40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-7xl text-primary/30 font-bold">{p.title[0]}</span>
                      </div>
                    </>
                  )}
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-5">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 glass rounded-full">{s}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {p.demoUrl && (
                      <a href={p.demoUrl} target="_blank" rel="noreferrer" className="p-2 glass rounded-full hover:border-primary/60 transition" title="Live Demo">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="p-2 glass rounded-full hover:border-primary/60 transition" title="GitHub">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SKILL GRID */}
      <section className="container py-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// Toolkit</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-14 leading-[0.95]">
            What I <span className="text-gradient">use.</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(SKILLS).map(([cat, items], i) => (
            <Reveal key={cat} delay={i * 0.05}>
              <div className="glass rounded-3xl p-8">
                <h3 className="font-display text-xl font-bold mb-6">{cat}</h3>
                <div className="space-y-4">
                  {items.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between mb-1.5 font-mono text-xs">
                        <span>{s.name}</span>
                        <span className="text-primary">{s.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-gold rounded-full transition-all duration-1000" style={{ width: `${s.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <Reveal>
          <div className="glass-strong rounded-[2rem] p-12 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Have a project in mind?</h2>
            <p className="text-muted-foreground mb-8">I take on one client engagement per quarter.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-7 h-12 rounded-full hover:opacity-90 transition">
              Start a conversation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
};

export default Skills;
