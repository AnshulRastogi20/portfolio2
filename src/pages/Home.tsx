import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Quote, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/PageTransition";
import { TextScramble } from "@/components/TextScramble";
import { Counter } from "@/components/Counter";
import { Marquee } from "@/components/Marquee";
import { SignupForm } from "@/components/SignupForm";
import { STATS, BLOG_POSTS, PROJECT_CATEGORIES, TESTIMONIALS } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Home = () => {
  const [dbTestimonials, setDbTestimonials] = useState<{ quote: string; author: string; role: string | null; link: string | null; photo_url: string | null; video_url: string | null }[]>([]);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("quote, author, role, link, photo_url, video_url")
      .order("display_order")
      .then(({ data }) => {
        if (data && data.length > 0) setDbTestimonials(data);
      });
  }, []);

  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : TESTIMONIALS.map(t => ({ ...t, link: null, photo_url: null, video_url: null }));

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 font-mono text-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Available for one project this quarter
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-tighter mb-6">
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
                <TextScramble phrases={["build AI products.", "ship Up N Running.", "scale Socioverse.", "tell stories."]} />
              </span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Founder of <a href="https://www.upnrunning.in" className="text-foreground underline decoration-primary/50 underline-offset-4 hover:text-primary">Up N Running</a>, builder of <a href="https://www.socioverse.io" className="text-foreground underline decoration-primary/50 underline-offset-4 hover:text-primary">Socioverse</a>, and co-founder of <a href="https://www.bunktobrains.com" className="text-foreground underline decoration-primary/50 underline-offset-4 hover:text-primary">BunkToBrains</a>. I build AI products, automate the work nobody wants to do, and write about the craft of shipping.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-14"
          >
            <Button asChild size="lg" className="rounded-full h-12 px-7 gap-2 shadow-glow">
              <Link to="/skills">View my work <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-7 gap-2 glass">
              <Link to="/newsletter"><Sparkles className="w-4 h-4" /> Join the newsletter</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {STATS.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5">
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient">
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
          {["TypeScript", "React", "Next.js", "OpenAI", "Tailwind", "Supabase", "LangChain", "Premiere Pro", "After Effects", "Figma", "Photoshop", "Illustrator"].map((t) => (
            <span key={t} className="font-display text-3xl md:text-5xl font-bold text-muted-foreground/50 hover:text-primary transition-colors">
              {t} <span className="text-primary/60">·</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* PROJECTS */}
      <section className="container py-32">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// 01 - Selected Work</p>
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]">
                Things I've <span className="text-gradient">built.</span>
              </h2>
            </div>
            <Link to="/skills" className="group inline-flex items-center gap-2 font-mono text-sm hover:text-primary transition-colors">
              All work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECT_CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.1}>
              <Link to="/skills" className="group block">
                <div className="glass rounded-3xl p-8 h-full hover-lift hover:border-primary/40 transition-all relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
                  <div className="font-display text-6xl text-primary/40 mb-6 group-hover:text-primary transition-colors">{c.icon}</div>
                  <h3 className="font-display text-2xl font-bold mb-2">{c.title}</h3>
                  <p className="text-muted-foreground mb-6">{c.desc}</p>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-muted-foreground">{c.count} projects</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VENTURES HIGHLIGHT */}
      <section className="container py-32">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="font-mono text-xs uppercase tracking-widest text-gold mb-3">// 02 - Ventures</p>
            <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
              What I'm <span className="text-gradient-gold">building.</span>
            </h2>
            <p className="text-muted-foreground text-lg">Three ventures, one mission: ship products people actually use.</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Up N Running", desc: "AI software company, automation products for businesses.", url: "https://www.upnrunning.in", tag: "Studio" },
            { name: "Socioverse", desc: "AI-powered Instagram growth engine for creators.", url: "https://www.socioverse.io", tag: "SaaS" },
            { name: "BunkToBrains", desc: "EdTech platform with 7000+ students.", url: "https://www.bunktobrains.com", tag: "EdTech" },
          ].map((v, i) => (
            <Reveal key={v.name} delay={i * 0.1}>
              <a href={v.url} className="block group">
                <div className="glass rounded-3xl p-8 h-full hover-lift hover:border-gold/50 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-wider text-gold">{v.tag}</span>
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3">{v.name}</h3>
                  <p className="text-muted-foreground text-sm">{v.desc}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LATEST WRITING */}
      <section className="container py-32">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// 03 - From the journal</p>
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]">Latest writing.</h2>
            </div>
            <Link to="/blog" className="group inline-flex items-center gap-2 font-mono text-sm hover:text-primary transition-colors">
              All posts <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link to={`/blog/${p.slug}`} className="group block">
                <article className="glass rounded-3xl p-8 h-full hover-lift hover:border-primary/40 transition-all">
                  <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground mb-5">
                    <span className="text-primary">{p.category}</span>
                    <span>·</span>
                    <span>{p.readTime}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-6">{p.excerpt}</p>
                  <span className="font-mono text-xs inline-flex items-center gap-1.5 text-primary group-hover:gap-2 transition-all">
                    <ExternalLink className="w-3 h-3" /> Read post <ArrowRight className="w-3 h-3" />
                  </span>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container py-32">
        <Reveal>
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// 04 - Kind words</p>
            <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]">
              People I've <span className="text-gradient">helped.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => {
            const CardWrapper = t.link ? 'a' : 'div';
            const cardProps = t.link ? { href: t.link } : {};
            return (
              <Reveal key={i} delay={i * 0.08}>
                <CardWrapper {...cardProps} className={`glass rounded-3xl p-8 h-full relative block hover-lift transition-all ${t.link ? "cursor-pointer hover:border-primary/40" : ""}`}>
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed mb-6">"{t.quote}"</p>
                  <div className="font-mono text-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {t.photo_url && (
                        <img src={t.photo_url} alt={t.author} className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" />
                      )}
                      <div>
                        <div className="font-semibold">{t.author}</div>
                        <div className="text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {t.video_url && (
                        <span
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = t.video_url!; }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/15 text-gold hover:bg-gold/25 transition-colors cursor-pointer text-[11px] font-semibold"
                        >
                          <Play className="w-3.5 h-3.5 fill-gold" /> Watch Video
                        </span>
                      )}
                      {t.link && (
                        <span className="inline-flex items-center gap-1 text-primary text-[11px]">
                          <ExternalLink className="w-3 h-3" /> View
                        </span>
                      )}
                    </div>
                  </div>
                </CardWrapper>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FINAL NEWSLETTER CTA */}
      <section className="container pb-32">
        <Reveal>
          <div className="relative rounded-[2rem] overflow-hidden p-12 md:p-20 text-center glass-strong">
            <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative">
              <Sparkles className="w-10 h-10 mx-auto mb-6 text-gold" />
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-6">
                One letter. <br />
                <span className="text-gradient">Every Sunday.</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
                Notes on AI, building products, and thinking clearly. No fluff, no spam. Unsubscribe anytime.
              </p>
              <SignupForm variant="hero" />
              <p className="font-mono text-xs text-muted-foreground mt-5">Join 1,240+ builders. Free forever.</p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
};

export default Home;
