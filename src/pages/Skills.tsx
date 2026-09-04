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
          <p className="font-mono text-xs uppercase tracking-widest text-brand mb-4">// Skills and projects</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[0.95] mb-6 max-w-4xl">
            Three crafts. <br />
            <span className="text-gradient">One obsession with quality.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            I work across web, video, and design, usually all three at once. Pick a category to see real projects.
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
                className={`w-full text-left glass rounded-3xl p-7 transition-colors hover-lift ${active === c.slug ? "border-primary bg-primary/10" : "hover:border-primary/30"}`}
              >
                <div className="font-display text-5xl text-primary/50 mb-4">{c.icon}</div>
                <h3 className="font-display text-xl font-semibold mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Project list */}
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <a href={p.demoUrl || p.githubUrl || undefined} className="group glass rounded-3xl p-7 hover-lift hover:border-primary/40 transition-colors block cursor-pointer">
                <div className="aspect-[16/10] rounded-2xl bg-gradient-mesh mb-6 relative overflow-hidden">
                  {p.coverUrl ? (
                    <img src={p.coverUrl} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="absolute inset-0 grid-bg opacity-40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-7xl text-primary/30 font-semibold">{p.title[0]}</span>
                      </div>
                    </>
                  )}
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-5">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 glass rounded-full">{s}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {p.demoUrl && (
                      <span className="p-2 glass rounded-full hover:border-primary/60 transition" title="Live Demo">
                        <ExternalLink className="w-4 h-4" />
                      </span>
                    )}
                    {p.githubUrl && (
                      <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = p.githubUrl!; }} className="p-2 glass rounded-full hover:border-primary/60 transition cursor-pointer" title="GitHub">
                        <Github className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SKILL GRID */}
      <section className="container py-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">// Toolkit</p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold mb-14 leading-[0.95]">
            What I <span className="text-gradient">use.</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(SKILLS).map(([cat, items], i) => (
            <Reveal key={cat} delay={i * 0.05}>
              <div className="glass rounded-3xl p-8">
                <h3 className="font-display text-xl font-semibold mb-6">{cat}</h3>
                {/* A list, not a bar chart. The old version drew a progress
                    bar per tool at 95%, 92%, 88% and so on - nobody measured
                    any of those, which made them invented metrics on a public
                    page. Naming the tools says the same true thing. */}
                <div className="flex flex-wrap gap-2">
                  {items.map((tool) => (
                    <span key={tool} className="font-mono text-xs px-3 py-1.5 rounded-full bg-secondary/70 border border-border/60">
                      {tool}
                    </span>
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
            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4">Want to see how any of it works?</h2>
            <p className="text-muted-foreground mb-8">
              The whole AI Sight course is free on YouTube, and the workbook that goes
              with it is one email away. Up N Running is not taking new clients right now.
            </p>
            <Link to="/workbook" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-7 h-12 rounded-full hover:opacity-90 transition">
              Get the workbook <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
};

export default Skills;
