import { Mail, Sparkles, BookOpen, Zap, Users } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { SignupForm } from "@/components/SignupForm";
import { Counter } from "@/components/Counter";
import { TESTIMONIALS, BLOG_POSTS } from "@/lib/data";

const Newsletter = () => (
  <>
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="container relative text-center max-w-3xl">
        <Reveal>
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 font-mono text-xs">
            <Mail className="w-3 h-3 text-primary" /> The Sunday Letter
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
            One letter. <br />
            <span className="text-gradient">Every Sunday.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Notes on AI, building products, and the messy reality of shipping.
            Plus exactly one thing I'm building, reading, or learning each week.
          </p>
          <div className="max-w-md mx-auto">
            <SignupForm variant="hero" ctaLabel="Get the kit" />
          </div>
          <p className="font-mono text-xs text-muted-foreground mt-4">
            Free <span className="text-gold">AI Builder's Starter Kit</span> when you join.
          </p>
        </Reveal>
      </div>
    </section>

    {/* SOCIAL PROOF */}
    <section className="container py-20">
      <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
        <div className="glass rounded-2xl p-6 text-center">
          <div className="font-display text-4xl font-bold text-gradient">
            <Counter to={1240} suffix="+" />
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">Subscribers</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <div className="font-display text-4xl font-bold text-gradient">
            <Counter to={48} />
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">Issues</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <div className="font-display text-4xl font-bold text-gradient">
            <Counter to={62} suffix="%" />
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">Open rate</div>
        </div>
      </div>
    </section>

    {/* WHAT YOU GET */}
    <section className="container py-20">
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-center mb-14 leading-[0.95]">
          What's <span className="text-gradient">inside.</span>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {[
          { icon: Sparkles, title: "AI dispatch", desc: "One model, tool, or prompt actually worth your attention." },
          { icon: BookOpen, title: "Builder's note", desc: "What I'm shipping, breaking, and learning this week." },
          { icon: Zap, title: "Quick wins", desc: "A 5-minute idea you can apply today." },
        ].map((b, i) => (
          <Reveal key={b.title} delay={i * 0.08}>
            <div className="glass rounded-3xl p-7 h-full hover-lift hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* PAST ISSUES */}
    <section className="container py-20">
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-14 leading-[0.95]">
          Past <span className="text-gradient">issues.</span>
        </h2>
      </Reveal>
      <div className="space-y-3 max-w-3xl">
        {BLOG_POSTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.04}>
            <a href={`/blog/${p.slug}`} className="group block glass rounded-2xl p-5 hover:border-primary/40 transition-all">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-1">#{(48 - i).toString().padStart(3, "0")} · {p.date}</div>
                  <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">{p.title}</h3>
                </div>
                <span className="font-mono text-xs text-primary">Read →</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section className="container py-20">
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-center mb-14 leading-[0.95]">
          What readers <span className="text-gradient">say.</span>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {TESTIMONIALS.slice(0, 4).map((t, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="glass rounded-3xl p-7">
              <p className="text-base mb-5">"{t.quote}"</p>
              <div className="font-mono text-xs">
                <div className="font-semibold">{t.author}</div>
                <div className="text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="container py-20">
      <Reveal>
        <div className="glass-strong rounded-[2rem] p-10 md:p-16 text-center">
          <Users className="w-10 h-10 mx-auto mb-5 text-primary" />
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Join 1,240+ builders.</h2>
          <p className="text-muted-foreground mb-8">Free forever. Unsubscribe anytime.</p>
          <div className="max-w-md mx-auto"><SignupForm variant="hero" /></div>
        </div>
      </Reveal>
    </section>
  </>
);

export default Newsletter;
