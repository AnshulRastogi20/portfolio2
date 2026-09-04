import { Link } from "react-router-dom";
import { ArrowRight, Check, Download } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/data";

/**
 * What Up N Running built - an archive, not a menu.
 *
 * This page used to sell: a stat strip led by "50K MRR", a "book a free
 * strategy call" button, and a banner reading "implementation slots open this
 * week". All three had to go. The revenue ended in June 2026 and the agency is
 * not taking new clients, so a page inviting bookings was advertising something
 * that is not on offer, and the slot count was never real in the first place.
 *
 * The systems themselves are still worth showing. They are evidence that he
 * ships, which is the whole reason anything on this site is believable, and
 * that is the job this page has now.
 */
const Services = () => (
  <>
    <section className="container py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-4">// Up N Running</p>
        <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[0.95] mb-6 max-w-4xl">
          Six systems I built <br />
          <span className="text-gradient">for real businesses.</span>
        </h1>
        <div className="max-w-2xl space-y-4 text-lg text-muted-foreground mb-10">
          <p>
            Up N Running was an AI automation agency I ran on my own. These are the things it
            actually delivered, between June 2025 and June 2026.
          </p>
          <p className="text-base">
            <strong className="text-foreground">It is not taking new clients right now</strong>,
            so this is here as a record of what was built rather than as a list of what you can
            buy. If you want to understand how any of it works, the course covers the
            fundamentals for free.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full gap-2 shadow-glow">
            <Link to="/workbook"><Download className="w-4 h-4" /> Get the free workbook</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full glass">
            <Link to="/contact">Say hello</Link>
          </Button>
        </div>
      </Reveal>
    </section>

    <section className="container py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">// What got built</p>
        <h2 className="font-display text-4xl md:text-6xl font-semibold mb-14 leading-[0.95]">
          The <span className="text-gradient">systems.</span>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-6">
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.06}>
            <div className="glass rounded-3xl p-8 h-full hover-lift hover:border-primary/40 transition-colors flex flex-col">
              <div className="flex items-start justify-between mb-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand glass rounded-full px-3 py-1">
                  Built 2025-26
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">{s.name}</h3>
              <p className="font-mono text-xs text-brand mb-4">{s.tagline}</p>
              <p className="text-sm text-muted-foreground mb-6">{s.desc}</p>
              {s.videoUrl && (
                <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-black/20">
                  <iframe
                    src={s.videoUrl}
                    title={s.name + " demo"}
                    loading="lazy"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              <ul className="space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="container py-20">
      <Reveal>
        <div className="glass-strong rounded-[2rem] p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4">
              Want to build one of these yourself?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              That is what the course is. Fifteen lectures on YouTube, free, plus a workbook
              with every prompt and command in it. No agency retainer required, which is
              lucky, because there is not one available.
            </p>
            <Button asChild size="lg" className="rounded-full h-12 px-7 gap-2 shadow-glow">
              <Link to="/workbook"><Download className="w-4 h-4" /> Get the workbook</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  </>
);

export default Services;
