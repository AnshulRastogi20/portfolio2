import { Link } from "react-router-dom";
import { Clock, ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { COURSES } from "@/lib/data";

const Courses = () => (
  <>
    <section className="container py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-gold mb-4">// Courses · Coming Soon</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6 max-w-4xl">
          Courses I'm <br />
          <span className="text-gradient-gold">cooking.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Hands-on programs built around real builds, not theory. Join the waitlist to get early-bird pricing and a heads-up before launch.
        </p>
      </Reveal>
    </section>

    <section className="container py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.08}>
            <Link to={`/courses/${c.slug}`} className="group block">
              <div className="glass rounded-3xl p-8 h-full hover-lift hover:border-gold/50 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-gold">
                    <Clock className="w-3 h-3" /> {c.launchEta}
                  </span>
                  <span className="text-xs glass rounded-full px-3 py-1">{c.level}</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{c.summary}</p>
                <ul className="space-y-2 mb-6">
                  {c.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between font-mono text-xs pt-6 border-t border-border/50">
                  <span>Early-bird <span className="text-gold">{c.earlyBird}</span></span>
                  <span className="text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Join waitlist <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  </>
);

export default Courses;
