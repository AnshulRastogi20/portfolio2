import { Link } from "react-router-dom";
import { ArrowRight, Check, Youtube } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { COACHING, COURSE } from "@/lib/data";

/**
 * The one thing on this site that costs money, and it says so after saying the
 * course is free - which is the order that makes it credible rather than
 * suspicious. Handoff 06 covers the full page at sightofai.space; this is the
 * pointer to it from the personal site.
 *
 * No cohort, no seat count, no start date, no testimonials, no outcome claims.
 * None of those exist and a fabricated set was already removed once.
 */
const Coaching = () => {
  const offer = COACHING[0];

  return (
    <section className="container py-20 max-w-3xl">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-4">// One to one</p>
        <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[0.95] mb-6">
          The lectures are free. <br />
          <span className="text-gradient">The hour isn't.</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-10">
          Every lecture of the course is on YouTube for nothing, and the workbook is one
          email away. Start there - most people will not need anything else. This is for
          when you already know the specific thing you want built and would rather build it
          with somebody than alone.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="glass-strong rounded-[2rem] p-8 md:p-10 mb-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
            <h2 className="font-display text-2xl font-semibold">{offer.name}</h2>
            <div className="text-right">
              <div className="font-display text-3xl font-semibold text-gradient">{offer.price}</div>
              <div className="font-mono text-xs text-muted-foreground">{offer.duration}</div>
            </div>
          </div>
          <p className="text-muted-foreground mb-7">{offer.desc}</p>
          <ul className="space-y-3 mb-8">
            {offer.includes.map((line) => (
              <li key={line} className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="rounded-full gap-2 w-full sm:w-auto">
            <a href={offer.url}>Book a session <ArrowRight className="w-4 h-4" /></a>
          </Button>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="glass rounded-3xl p-8">
          <h3 className="font-display text-xl font-semibold mb-3">Try the free thing first</h3>
          <p className="text-muted-foreground text-sm mb-6">
            {COURSE.lectures} lectures, {COURSE.cadence.toLowerCase()}, no paywall anywhere in
            it. If the fundamentals are what you are after, they are all in there.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="rounded-full gap-2 glass">
              <a href={COURSE.playlist}><Youtube className="w-4 h-4" /> The playlist</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full gap-2 glass">
              <Link to="/workbook">The workbook <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Coaching;
