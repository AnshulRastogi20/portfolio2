import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Sparkles, MessageSquare, BarChart3, Users, Check, Star, Quote, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { SignupForm } from "@/components/SignupForm";
import { Button } from "@/components/ui/button";
import { PRODUCTS, SOCIOVERSE_FAQ } from "@/lib/data";

const SOCIOVERSE_URL = "https://www.socioverse.io";

const SOCIOVERSE_PROBLEMS = [
  { tag: "Content Studio", title: "Creative Burnout", desc: "Spending hours brainstorming but still posting the same type of content?" },
  { tag: "Lead Bank", title: "Lead Leakage", desc: "Interested followers DM you, but you lose track and never follow up." },
  { tag: "DM Automation", title: "DM Overwhelm", desc: "Every comment is a potential customer, but who has time to reply to hundreds?" },
];

const SOCIOVERSE_MODULES = [
  { Icon: Sparkles, title: "AI Content Studio", desc: "Scrape competitor reels, analyze viral hooks, and generate ready-to-shoot scripts in your brand voice.", bullets: ["Competitor Tracking & Scraping", "AI-Powered Hook Analysis", "Script Generation in Your Voice", "Idea Pipeline Management"] },
  { Icon: MessageSquare, title: "DM Automation", desc: "Set up keyword triggers, follow gates, and smart sequences that auto-reply to comments and capture leads.", bullets: ["Comment & Story Triggers", "Follow Gate with Lead Capture", "Smart Multi-Step Sequences", "Schedule & Publish Reels"] },
  { Icon: BarChart3, title: "Analytics & Insights", desc: "Track follower growth, engagement, and automation ROI with beautiful dashboards.", bullets: ["Follower Growth Tracking", "Engagement Rate Analytics", "Automation ROI Dashboard", "Content Performance Insights"] },
  { Icon: Users, title: "Lead Bank CRM", desc: "Capture, nurture, and convert your Instagram audience with a built-in CRM, email capture, and DM sequences.", bullets: ["Lead Funnel Tracking", "Email Capture", "DM Sequences", "Conversion Analytics"] },
];

const SOCIOVERSE_STEPS = [
  { n: "01", t: "Connect", d: "Link your Instagram and add competitors to track." },
  { n: "02", t: "Analyze", d: "AI scrapes viral reels, extracts hooks, identifies patterns." },
  { n: "03", t: "Generate", d: "Get AI ideas and scripts matched to your brand voice." },
  { n: "04", t: "Automate", d: "Set up DM automations that turn commenters into leads." },
];

const SOCIOVERSE_STATS = [
  { value: "3×", label: "Faster Content" },
  { value: "50%", label: "Higher Engagement" },
  { value: "10×", label: "More Leads" },
  { value: "5hrs", label: "Saved Weekly" },
];

const SOCIOVERSE_AUDIENCE = [
  { title: "Content Creators & Influencers", desc: "Stop guessing what to post. Analyze viral content in your niche, generate scripts in your voice, and grow with automated DM funnels." },
  { title: "Social Media Agencies", desc: "Manage multiple client accounts from one dashboard. Scrape competitors, generate content at scale, automate DMs, and report results." },
  { title: "Small Businesses & D2C Brands", desc: "Turn Instagram into a lead generation machine. Capture customer emails via DM automations, nurture them with sequences, track conversions." },
  { title: "Coaches & Course Creators", desc: "Automate your Instagram sales funnel. Comment triggers deliver lead magnets, follow gates build your audience, smart sequences warm up prospects." },
];

const SOCIOVERSE_PRICING = [
  { name: "Free", price: "$0", per: "/mo", desc: "Get started with basic features", bullets: ["5 Automations", "10 Reel Analysis/mo", "1 Workspace", "Smart Follow Gate"] },
  { name: "Starter", price: "$18", per: "/mo", desc: "Perfect for getting started", bullets: ["30 Automations", "50 Reel Analysis/mo", "1 Workspace", "Smart Follow Gate"] },
  { name: "Creator", price: "$48", per: "/mo", desc: "For serious creators", bullets: ["Unlimited Automations", "200 Reel Analysis/mo", "2 Workspaces", "Smart Follow Gate"], popular: true },
  { name: "Agency", price: "$88", per: "/mo", desc: "For agencies and teams", bullets: ["Unlimited Automations", "600 Reel Analysis/mo", "10 Workspaces", "Smart Follow Gate"] },
];

const SocioverseShowcase = () => (
  <div className="space-y-32">
    {/* HERO */}
    <section>
      <Reveal>
        <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 font-mono text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Limited Launch Pack, 30 days free
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6 max-w-4xl">
          AI-Powered Instagram <br />
          <span className="text-gradient">Growth Engine.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          Socioverse analyzes viral content, generates scripts, automates your DMs, and captures leads, so you can focus on creating.
        </p>
        <div className="flex flex-wrap gap-3 mb-12">
          <Button asChild size="lg" className="rounded-full h-12 px-7 gap-2 shadow-glow">
            <a href={`${SOCIOVERSE_URL}/signup`} target="_blank" rel="noreferrer">Start free today <ArrowRight className="w-4 h-4" /></a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-7 glass">
            <a href={SOCIOVERSE_URL} target="_blank" rel="noreferrer">Visit Socioverse</a>
          </Button>
        </div>
        <p className="font-mono text-xs text-muted-foreground">No credit card required · Setup in 2 minutes · Cancel anytime</p>
      </Reveal>

      {/* Endorsements */}
      <div className="grid md:grid-cols-2 gap-4 mt-12">
        {[
          { quote: "Socioverse looks quite cool", author: "Ankur Warikoo", role: "Entrepreneur, Content Creator & Author · 3M+ followers" },
          { quote: "Socioverse is sick", author: "Mradul Sharma", role: "Founder, Akima Films" },
        ].map((t) => (
          <div key={t.author} className="glass rounded-2xl p-6 flex gap-4 items-start">
            <Quote className="w-6 h-6 text-primary/50 shrink-0" />
            <div>
              <p className="text-base mb-2">"{t.quote}"</p>
              <div className="font-mono text-xs">
                <div className="font-semibold">{t.author}</div>
                <div className="text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* PROBLEMS */}
    <section>
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// The pain</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 leading-[0.95]">
          Problems creators face <span className="text-gradient">every day.</span>
        </h2>
        <p className="text-muted-foreground mb-12">Sound familiar? These are the exact problems Socioverse solves.</p>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-5">
        {SOCIOVERSE_PROBLEMS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <div className="glass rounded-3xl p-7 h-full">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold glass rounded-full px-3 py-1 inline-block mb-4">{p.tag}</span>
              <h3 className="font-display text-2xl font-bold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* MODULES */}
    <section>
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// What's inside</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-14 leading-[0.95]">
          Everything you need to <span className="text-gradient">grow on Instagram.</span>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-6">
        {SOCIOVERSE_MODULES.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.06}>
            <div className="glass rounded-3xl p-8 h-full hover-lift hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <m.Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">{m.title}</h3>
              <p className="text-sm text-muted-foreground mb-5">{m.desc}</p>
              <ul className="space-y-2">
                {m.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section>
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// 4 simple steps</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-14 leading-[0.95]">
          How Socioverse <span className="text-gradient">works.</span>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-4 gap-5">
        {SOCIOVERSE_STEPS.map((s, i) => (
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

    {/* RESULTS */}
    <section>
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-12 leading-[0.95] text-center">
          Real <span className="text-gradient">growth.</span>
        </h2>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {SOCIOVERSE_STATS.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-6 text-center">
            <div className="font-display text-4xl md:text-5xl font-bold text-gradient">{s.value}</div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-2">{s.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* AUDIENCE */}
    <section>
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// Built for you</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-14 leading-[0.95]">
          Who is Socioverse <span className="text-gradient">for?</span>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-6">
        {SOCIOVERSE_AUDIENCE.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.05}>
            <div className="glass rounded-3xl p-8 h-full">
              <h3 className="font-display text-xl font-bold mb-3">{a.title}</h3>
              <p className="text-sm text-muted-foreground">{a.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* PRICING */}
    <section>
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3 text-center">// Simple pricing</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-3 leading-[0.95] text-center">
          Choose your <span className="text-gradient">plan.</span>
        </h2>
        <p className="text-muted-foreground text-center mb-14">Launch Pack: everything free for 30 days. No credit card needed.</p>
      </Reveal>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {SOCIOVERSE_PRICING.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.05}>
            <div className={`relative glass rounded-3xl p-7 h-full flex flex-col ${p.popular ? "border-primary bg-primary/5" : ""}`}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                  <Star className="w-3 h-3 fill-current" /> Most popular
                </div>
              )}
              <h3 className="font-display text-xl font-bold mb-1">{p.name}</h3>
              <p className="text-xs text-muted-foreground mb-5">{p.desc}</p>
              <div className="font-display text-4xl font-bold text-gradient mb-6">
                {p.price}<span className="font-mono text-sm text-muted-foreground font-normal">{p.per}</span>
              </div>
              <ul className="space-y-2 mb-8">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full rounded-full mt-auto" variant={p.popular ? "default" : "outline"}>
                <a href={`${SOCIOVERSE_URL}/signup`} target="_blank" rel="noreferrer">Get started</a>
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* FAQ */}
    <section className="max-w-3xl mx-auto">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// FAQ</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-12 leading-[0.95]">
          Frequently asked <span className="text-gradient">questions.</span>
        </h2>
      </Reveal>
      {SOCIOVERSE_FAQ.map((f, i) => (
        <Reveal key={f.q} delay={i * 0.03}>
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

    {/* CTA */}
    <section>
      <Reveal>
        <div className="glass-strong rounded-[2rem] p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Ready to stop leaving money <span className="text-gradient">on the table?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of creators using Socioverse to grow faster and smarter.
            </p>
            <Button asChild size="lg" className="rounded-full h-12 px-7 gap-2 shadow-glow">
              <a href={`${SOCIOVERSE_URL}/signup`} target="_blank" rel="noreferrer">Start free today <ArrowRight className="w-4 h-4" /></a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  </div>
);

const ProductDetail = () => {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return <section className="container py-32 text-center"><h1 className="font-display text-4xl">Not found</h1></section>;

  if (slug === "socioverse") {
    return (
      <section className="container py-16">
        <Link to="/shop" className="font-mono text-xs inline-flex items-center gap-2 mb-10 hover:text-primary transition">
          <ArrowLeft className="w-3 h-3" /> Back to shop
        </Link>
        <SocioverseShowcase />
      </section>
    );
  }

  return (
    <section className="container py-16">
      <Reveal>
        <Link to="/shop" className="font-mono text-xs inline-flex items-center gap-2 mb-10 hover:text-primary transition">
          <ArrowLeft className="w-3 h-3" /> Back to shop
        </Link>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-square rounded-3xl bg-gradient-mesh relative overflow-hidden glass-strong">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShoppingBag className="w-32 h-32 text-primary/30" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-wider text-gold mb-3">{product.type === "digital" ? "Digital Product" : product.type === "saas" ? "SaaS" : "Merch"}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-5">{product.title}</h1>
            <p className="text-lg text-muted-foreground mb-8">{product.desc}</p>
            <div className="font-display text-5xl font-bold text-gradient-gold mb-8">{product.price}</div>

            <div className="glass-strong rounded-3xl p-6">
              <div className="font-mono text-xs uppercase tracking-wider text-gold mb-3">Coming soon · Get notified</div>
              <SignupForm context={`product:${product.slug}`} ctaLabel="Notify me" />
              <p className="font-mono text-xs text-muted-foreground mt-3">Be first in line when it drops.</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default ProductDetail;
