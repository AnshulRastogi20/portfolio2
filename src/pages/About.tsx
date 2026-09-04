import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import profilePhoto from "@/assets/profile.webp";
import { Reveal } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { VALUES, VENTURES, TIMELINE, SITE } from "@/lib/data";

const About = () => (
  <>
    {/* HERO */}
    <section className="container py-24">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <Reveal className="lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-widest text-brand mb-4">// Perspective is everything</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[0.95] mb-6">
            Systems <br />
            Architect. <br />
            <span className="text-gradient">Builder.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-8">
            I'm Anshul Rastogi, 20, based in {SITE.location}. I built <a href="https://www.socioverse.io" className="text-foreground underline decoration-primary/50 underline-offset-4 hover:text-brand">Socioverse</a> on
            my own and it is live with real users on it. I founded <a href="https://www.upnrunning.in" className="text-foreground underline decoration-primary/50 underline-offset-4 hover:text-brand">Up N Running</a>, which
            delivered client systems through to June 2026 and is not taking new clients right now. I
            co-founded <a href="https://www.bunktobrains.com" className="text-foreground underline decoration-primary/50 underline-offset-4 hover:text-brand">BunkToBrains</a>, which got postponed because not enough
            students were interested. I am doing B.Tech AIML at VIPS Delhi.
            What I am mostly trying to do is build things I would use, and then explain them
            plainly enough that somebody who has not touched AI yet does not feel stupid reading it.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full gap-2">
              <Link to="/workbook">Get the free workbook <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full glass">
              <Link to="/now">What I'm doing now</Link>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-5">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-gold/30 blur-3xl rounded-full" />
            <div className="relative aspect-square rounded-[2rem] glass-strong overflow-hidden">
              <img src={profilePhoto} alt="Anshul Rastogi" decoding="async" fetchPriority="high" width={800} height={800} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* VALUES */}
    <section className="container py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">// What I believe</p>
        <h2 className="font-display text-4xl md:text-6xl font-semibold mb-14 leading-[0.95]">
          Three things I try to <span className="text-gradient">hold to.</span>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-5">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.08}>
            <div className="glass rounded-3xl p-7 h-full hover-lift hover:border-primary/40 transition-colors">
              <div className="font-display text-5xl text-brand mb-5">{v.icon}</div>
              <h3 className="font-display text-xl font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* VENTURES */}
    <section className="container py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">// The ventures</p>
        <h2 className="font-display text-4xl md:text-6xl font-semibold mb-14 leading-[0.95]">
          What I've <span className="text-gradient">started.</span>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-6">
        {VENTURES.map((v, i) => {
          const external = /^https?:\/\//.test(v.url);
          const Comp: any = external ? "a" : "a";
          const linkProps = external ? { href: v.url } : { href: v.url };
          return (
            <Reveal key={v.name} delay={i * 0.1}>
              <Comp {...linkProps} className="group block glass rounded-3xl p-8 h-full hover-lift hover:border-gold/50 transition-colors">
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-gold glass rounded-full px-3 py-1">{v.tag}</span>
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2">{v.name}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </Comp>
            </Reveal>
          );
        })}
      </div>
    </section>

    {/* TIMELINE */}
    <section className="container py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">// The journey</p>
        <h2 className="font-display text-4xl md:text-6xl font-semibold mb-14 leading-[0.95]">
          How I got <span className="text-gradient">here.</span>
        </h2>
      </Reveal>
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-gold/50 -translate-x-1/2" />
        {TIMELINE.map((t, i) => (
          <Reveal key={t.year} delay={i * 0.05}>
            <div className={`relative pl-12 md:pl-0 mb-12 md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}>
              <div className={`md:text-right ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div className="absolute left-2.5 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                <div className="font-mono text-xs text-brand mb-1">{t.year}</div>
                <h3 className="font-display text-2xl font-semibold">{t.title}</h3>
              </div>
              <p className="text-muted-foreground md:pt-1">{t.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  </>
);

export default About;
