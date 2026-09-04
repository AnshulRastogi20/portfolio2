import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Quote, Play, ExternalLink, Youtube, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/PageTransition";
import { TextScramble } from "@/components/TextScramble";
import { Counter } from "@/components/Counter";
import { Marquee } from "@/components/Marquee";
import { EyeMark } from "@/components/Brand";
import { COURSE, STATS, RECEIPTS, BLOG_POSTS, PROJECT_CATEGORIES, TESTIMONIALS, SITE } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";
import { useLiveFetch } from "@/hooks/useLiveFetch";
import { useState } from "react";

/**
 * The site sits in the middle of one funnel: YouTube -> the workbook -> here ->
 * the newsletter. Its single job is the newsletter, and the workbook is the
 * reason anyone arrives (BRAND-BRIEF §8). So the top of this page points at
 * /workbook and everything else is proof, arranged in the order the brief's
 * §9 table asks for: do not waste my time -> he is twenty? -> these are real ->
 * genuinely free -> obviously, I want the next one.
 */
const Home = () => {
  const [dbTestimonials, setDbTestimonials] = useState<{ id: string; quote: string; author: string; role: string | null; link: string | null; photo_url: string | null; video_url: string | null }[]>([]);

  useLiveFetch(async (isActive) => {
    const { data } = await supabase
      .from("testimonials")
      .select("id, quote, author, role, link, photo_url, video_url")
      .order("display_order");
    if (isActive() && data && data.length > 0) setDbTestimonials(data);
  });

  const testimonials = dbTestimonials.length > 0
    ? dbTestimonials
    : TESTIMONIALS.map(t => ({ id: t.slug, quote: t.quote, author: t.author, role: t.role, link: null, photo_url: null, video_url: null }));

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[86vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 font-mono text-xs"
          >
            <EyeMark className="h-3.5 w-auto" />
            Perspective is everything.
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,9vw,7.5rem)] font-semibold leading-[0.92] tracking-tighter mb-6">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="block"
            >
              Hi, I'm Anshul.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="block"
            >
              I <span className="text-gradient">
                <TextScramble phrases={["build AI systems.", "show how they work.", "ship, and break things.", "am twenty years old."]} />
              </span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            I build AI systems and then show people exactly how they work. I am 20,
            I am in Delhi, and my whole course is going out free on YouTube. If you
            have not started with AI yet, this is a fine place to start - you are not
            behind, and nothing here is written to make you feel like you are.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-14"
          >
            <Button asChild size="lg" className="rounded-full h-12 px-7 gap-2 shadow-glow">
              <Link to="/workbook"><Download className="w-4 h-4" /> Get the free workbook</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-7 gap-2 glass">
              <a href={COURSE.playlist}><Youtube className="w-4 h-4" /> Watch the course</a>
            </Button>
          </motion.div>

          {/* Countables only, and only checkable ones. See STATS in lib/data.ts. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {STATS.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5">
                <div className="font-display text-3xl md:text-4xl font-semibold text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-12 border-y border-border/50">
        <Marquee>
          {["React", "TypeScript", "Next.js", "n8n", "Supabase", "Claude", "Python", "Gemini", "Tailwind", "DaVinci Resolve", "Premiere Pro", "After Effects", "Figma", "Remotion"].map((t) => (
            <span key={t} className="font-display text-3xl md:text-5xl font-semibold text-muted-foreground/50 hover:text-brand transition-colors">
              {t} <span className="text-brand/60">·</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* THE COURSE - the reason most people are here */}
      <section className="container py-32">
        <Reveal>
          <div className="glass-strong rounded-[2rem] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
            <div className="relative grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">// 01 - The course</p>
                <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[0.95] mb-6">
                  {COURSE.lectures} lectures. <br />
                  <span className="text-gradient">Free, and I mean free.</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-4">{COURSE.blurb}</p>
                <p className="text-muted-foreground mb-8">
                  {COURSE.cadence}, from {COURSE.window}. There is a workbook that goes with it -
                  one PDF, one section per lecture, with every prompt and command in a form you
                  can copy instead of squinting at a video. That is what the email box is for,
                  and it is the only thing it is for.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="rounded-full gap-2">
                    <Link to="/workbook"><Download className="w-4 h-4" /> Get the workbook</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full gap-2 glass">
                    <a href={COURSE.playlist}><Youtube className="w-4 h-4" /> The playlist</a>
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-5">
                <ul className="space-y-3">
                  {[
                    `${COURSE.recorded} lectures recorded, ${COURSE.lectures} in the workbook`,
                    `${COURSE.runtime} of material, in plain language`,
                    "Real jobs as the examples, not abstractions",
                    "No paywall, no premium tier, no upsell",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3 glass rounded-2xl p-4">
                      <EyeMark className="h-4 w-auto mt-0.5 shrink-0" />
                      <span className="text-sm">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* RECEIPTS - dated, checkable, failures included */}
      <section className="container py-32">
        <Reveal>
          <div className="max-w-3xl mb-14">
            <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">// 02 - Receipts</p>
            <h2 className="font-display text-5xl md:text-7xl font-semibold leading-[0.95] mb-6">
              What I've actually <span className="text-gradient">done.</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Dated, and the ones that did not work are in here too. I think the wins only
              mean anything if the losses are on the same page.
            </p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5">
          {RECEIPTS.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06}>
              <div className="glass rounded-3xl p-7 h-full hover-lift hover:border-primary/40 transition-colors">
                <div className="font-mono text-xs uppercase tracking-wider text-brand mb-3">{r.date}</div>
                <h3 className="font-display text-xl font-semibold mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section className="container py-32">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">// 03 - Selected work</p>
              <h2 className="font-display text-5xl md:text-7xl font-semibold leading-[0.95]">
                Things I've <span className="text-gradient">built.</span>
              </h2>
            </div>
            <Link to="/skills" className="group inline-flex items-center gap-2 font-mono text-sm hover:text-brand transition-colors">
              All work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECT_CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.1}>
              <Link to="/skills" className="group block">
                <div className="glass rounded-3xl p-8 h-full hover-lift hover:border-primary/40 transition-colors relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
                  <div className="font-display text-6xl text-primary/50 mb-6 group-hover:text-brand transition-colors">{c.icon}</div>
                  <h3 className="font-display text-2xl font-semibold mb-2">{c.title}</h3>
                  <p className="text-muted-foreground mb-6">{c.desc}</p>
                  <div className="flex items-center justify-end font-mono text-xs">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LATEST WRITING */}
      <section className="container py-32">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">// 04 - Writing</p>
              <h2 className="font-display text-5xl md:text-7xl font-semibold leading-[0.95]">Latest writing.</h2>
            </div>
            <Link to="/blog" className="group inline-flex items-center gap-2 font-mono text-sm hover:text-brand transition-colors">
              All posts <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link to={`/blog/${p.slug}`} className="group block">
                <article className="glass rounded-3xl p-8 h-full hover-lift hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground mb-5">
                    <span className="text-brand">{p.category}</span>
                    <span>·</span>
                    <span>{p.readTime}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-brand transition-colors">{p.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-6">{p.excerpt}</p>
                  <span className="font-mono text-xs inline-flex items-center gap-1.5 text-brand group-hover:gap-2 transition-colors">
                    <ExternalLink className="w-3 h-3" /> Read post <ArrowRight className="w-3 h-3" />
                  </span>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT PEOPLE SAID - quotes only. No stars: nobody ever gave a rating. */}
      <section className="container py-32">
        <Reveal>
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">// 05 - What people said</p>
            <h2 className="font-display text-5xl md:text-7xl font-semibold leading-[0.95]">
              People I've <span className="text-gradient">worked with.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.id ?? i} delay={i * 0.08}>
              <Link
                to={`/reviews/${t.id}`}
                className="glass rounded-3xl p-8 h-full relative block hover-lift hover:border-primary/40 transition-colors cursor-pointer"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
                <p className="text-lg leading-relaxed mb-6">"{t.quote}"</p>
                <div className="font-mono text-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {t.photo_url && (
                      <img loading="lazy" decoding="async" src={t.photo_url} alt={t.author} className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" />
                    )}
                    <div>
                      <div className="font-semibold">{t.author}</div>
                      <div className="text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {t.video_url && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/15 text-brand text-[11px] font-semibold">
                        <Play className="w-3.5 h-3.5" /> Video
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-brand text-[11px]">
                      Open <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="rounded-full gap-2 glass">
            <Link to="/reviews">Read them all <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </section>

      {/* FINAL CTA - the site's single job */}
      <section className="container pb-32">
        <Reveal>
          <div className="relative rounded-[2rem] overflow-hidden p-12 md:p-20 text-center glass-strong">
            <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative">
              <EyeMark className="h-10 w-auto mx-auto mb-6" />
              <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[0.95] mb-6">
                Get the workbook. <br />
                <span className="text-gradient">Then decide.</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
                One PDF, all {COURSE.lectures} sections, free. If you also want an email from me
                once a week about what I am building and what broke, there is a box for that -
                separate, optional, and off by default.
              </p>
              <Button asChild size="lg" className="rounded-full h-12 px-8 gap-2 shadow-glow">
                <Link to="/workbook"><Download className="w-4 h-4" /> Get the workbook</Link>
              </Button>
              <p className="font-mono text-xs text-muted-foreground mt-5">
                {SITE.canonical.replace("https://", "")}/workbook
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
};

export default Home;
