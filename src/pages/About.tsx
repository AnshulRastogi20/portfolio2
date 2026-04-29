import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { VALUES, VENTURES, TIMELINE, SITE } from "@/lib/data";

const About = () => (
  <>
    {/* HERO */}
    <section className="container py-24">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <Reveal className="lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">// About me</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
            Founder. <br />
            Builder. <br />
            <span className="text-gradient">Storyteller.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-8">
            I'm Anshul Rastogi — based in {SITE.location}. I founded <a href="https://www.upnrunning.in" target="_blank" rel="noreferrer" className="text-foreground underline decoration-primary/50 underline-offset-4 hover:text-primary">Up N Running</a> to ship AI products that make Indian businesses more efficient, and I built <a href="https://www.socioverse.io" target="_blank" rel="noreferrer" className="text-foreground underline decoration-primary/50 underline-offset-4 hover:text-primary">Socioverse</a> — an Instagram growth engine used by 10K+ creators.
            My north star: do work I'm proud of, with people I respect, in service of an audience I genuinely care about.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full gap-2">
              <Link to="/contact">Work with me <ArrowRight className="w-4 h-4" /></Link>
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
              <div className="absolute inset-0 bg-gradient-mesh" />
              <div className="absolute inset-0 grid-bg opacity-50" />
              {/* Replace this letter block with your photo:
                  <img src={profilePhoto} alt="Anshul" className="absolute inset-0 w-full h-full object-cover" />
                  Place the file at src/assets/profile.jpg and: import profilePhoto from "@/assets/profile.jpg" */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-[8rem] md:text-[10rem] font-bold text-gradient leading-none">A</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* VALUES */}
    <section className="container py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// What I believe</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-14 leading-[0.95]">
          Four things I <span className="text-gradient">live by.</span>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.08}>
            <div className="glass rounded-3xl p-7 h-full hover-lift hover:border-primary/40 transition-all">
              <div className="font-display text-5xl text-primary mb-5">{v.icon}</div>
              <h3 className="font-display text-xl font-bold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* VENTURES */}
    <section className="container py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// Currently building</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-14 leading-[0.95]">
          My <span className="text-gradient">ventures.</span>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-6">
        {VENTURES.map((v, i) => {
          const external = /^https?:\/\//.test(v.url);
          const Comp: any = external ? "a" : "a";
          const linkProps = external ? { href: v.url, target: "_blank", rel: "noreferrer" } : { href: v.url };
          return (
            <Reveal key={v.name} delay={i * 0.1}>
              <Comp {...linkProps} className="group block glass rounded-3xl p-8 h-full hover-lift hover:border-gold/50 transition-all">
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-gold glass rounded-full px-3 py-1">{v.tag}</span>
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">{v.name}</h3>
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
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// The journey</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-14 leading-[0.95]">
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
                <div className="font-mono text-xs text-primary mb-1">{t.year}</div>
                <h3 className="font-display text-2xl font-bold">{t.title}</h3>
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
