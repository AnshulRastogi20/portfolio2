import { Link } from "react-router-dom";
import { Check, Star, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { COACHING } from "@/lib/data";

const Coaching = () => (
  <>
    <section className="container py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">// 1:1 with the Up N Running founder</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6 max-w-4xl">
          Work with me, <br />
          <span className="text-gradient">one-on-one.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          High-leverage sessions for founders, indie makers, and operators who want to ship AI automations the way Up N Running does for clients.
          Three ways to work together — pick the one that fits your moment.
        </p>
      </Reveal>
    </section>

    <section className="container py-12">
      <div className="grid md:grid-cols-3 gap-6">
        {COACHING.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.08}>
            <div className={`relative glass rounded-3xl p-8 h-full hover-lift transition-all ${c.popular ? "border-primary bg-primary/5" : "hover:border-primary/40"}`}>
              {c.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                  <Star className="w-3 h-3 fill-current" /> Most picked
                </div>
              )}
              <h3 className="font-display text-2xl font-bold mb-1">{c.name}</h3>
              <div className="font-mono text-xs text-muted-foreground mb-5">{c.duration}</div>
              <div className="font-display text-4xl font-bold text-gradient mb-5">{c.price}</div>
              <p className="text-sm text-muted-foreground mb-6">{c.desc}</p>
              <ul className="space-y-2 mb-8">
                {c.includes.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full rounded-full gap-2" variant={c.popular ? "default" : "outline"}>
                <Link to={`/contact?service=${encodeURIComponent(c.name)}`}>Book now <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* PROCESS */}
    <section className="container py-20">
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-14 leading-[0.95]">How it <span className="text-gradient">works.</span></h2>
      </Reveal>
      <div className="grid md:grid-cols-4 gap-5">
        {[
          { n: "01", t: "Get in touch", d: "Send a short note about where you are and what you need." },
          { n: "02", t: "Quick-fit call", d: "15 min to make sure I'm the right person to help." },
          { n: "03", t: "Deep work", d: "We do the actual work together. No fluff." },
          { n: "04", t: "Follow-through", d: "You leave with a written plan + async support." },
        ].map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06}>
            <div className="glass rounded-3xl p-7 h-full">
              <div className="font-mono text-xs text-primary mb-4">{s.n}</div>
              <h3 className="font-display text-lg font-bold mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* FAQ */}
    <section className="container py-20 max-w-3xl">
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-14 leading-[0.95]">FAQ</h2>
      </Reveal>
      {[
        { q: "What kinds of projects do you take on?", a: "AI products, indie SaaS, developer tools, and creator businesses. If it's something I'd want to build, I'm in." },
        { q: "Do you offer refunds?", a: "Yes. If after our first call you don't feel it's a fit, I'll refund 100%." },
        { q: "Can we start with one call before committing?", a: "Absolutely — that's exactly what the 1:1 Strategy Call is for." },
      ].map((f, i) => (
        <Reveal key={i} delay={i * 0.05}>
          <details className="glass rounded-2xl p-6 mb-3 group">
            <summary className="font-display text-lg font-bold cursor-pointer list-none flex items-center justify-between">
              {f.q}
              <span className="text-primary text-2xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="text-sm text-muted-foreground mt-4">{f.a}</p>
          </details>
        </Reveal>
      ))}
    </section>
  </>
);

export default Coaching;
