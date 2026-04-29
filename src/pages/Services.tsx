import { Link } from "react-router-dom";
import { ArrowRight, Check, Calendar } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/Counter";
import { SERVICES, STATS, SITE } from "@/lib/data";

const Services = () => (
  <>
    {/* HERO */}
    <section className="container py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">// Up N Running · Products & Services</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6 max-w-4xl">
          Work less. Achieve more. <br />
          <span className="text-gradient">Stay Up N Running.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-10">
          Powerful SaaS tools and done-for-you services that automate outreach, content, ops and reporting — so your team focuses on high-impact work.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full gap-2 shadow-glow">
            <a href={SITE.calendly} target="_blank" rel="noreferrer">
              <Calendar className="w-4 h-4" /> Book a free strategy call
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full glass">
            <Link to="/contact">Send a brief</Link>
          </Button>
        </div>
      </Reveal>

      {/* Stat strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
        {STATS.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-5">
            <div className="font-display text-3xl md:text-4xl font-bold text-gradient">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* SERVICES GRID */}
    <section className="container py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// What we ship</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-14 leading-[0.95]">
          Six products. <span className="text-gradient">One mission.</span>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-6">
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.06}>
            <div className="glass rounded-3xl p-8 h-full hover-lift hover:border-primary/40 transition-all flex flex-col">
              <div className="flex items-start justify-between mb-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold glass rounded-full px-3 py-1">Service</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">{s.name}</h3>
              <p className="font-mono text-xs text-primary mb-4">{s.tagline}</p>
              <p className="text-sm text-muted-foreground mb-6">{s.desc}</p>
              <ul className="space-y-2 mb-8">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button asChild variant="outline" className="rounded-full gap-2 w-full">
                  <Link to={`/contact?service=${encodeURIComponent(s.name)}`}>
                    Book this <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="container py-20">
      <Reveal>
        <div className="glass-strong rounded-[2rem] p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-widest text-gold mb-4">// Implementation slots open this week</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Ready to transform your business?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Book a free 30-min strategy call. We'll map out the fastest 30-day automation wins across outreach, content, client delivery and reporting.
            </p>
            <Button asChild size="lg" className="rounded-full h-12 px-7 gap-2 shadow-glow">
              <a href={SITE.calendly} target="_blank" rel="noreferrer">
                <Calendar className="w-4 h-4" /> Book a call
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  </>
);

export default Services;
