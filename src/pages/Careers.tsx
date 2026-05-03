import { Reveal } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Palette, Code } from "lucide-react";

const ROLES = [
  {
    title: "The Growth Lead",
    subtitle: "Marketing & Sales Intern",
    icon: Briefcase,
    location: "Remote · Commission-Based",
    tallyId: "9q9DeX",
    desc: "This is not a 'post and pray' marketing role. This is a Hunter role. You will learn the exact Cold Outreach Systems used by top B2B agencies. Your goal: Identify high-ticket creators, engage them, and set up the sale.",
    requirements: [
      "Prospecting: Find 20+ 'High-Intent' leads daily on Instagram & LinkedIn",
      "Outreach: Execute personalized DMs and emails using proven scripts",
      "Pipeline Management: Maintain a clean CRM of warm leads",
      "Market Intelligence: Report on which hooks/angles get the best replies",
      "Excellent written English. No chat-speak.",
      "Ability to commit to 1 hour of focused deep work daily",
    ],
    benefits: [
      "20% revenue share for every deal you close, for 1 year straight",
      "Sales mentorship from the Founder: B2B prospecting, objection handling, closing",
      "Official Internship Certificate & Performance-Based LOR",
      "Founding Member Status with a real SaaS product launch",
    ],
  },
  {
    title: "The Brand Lead",
    subtitle: "Design & Editing Intern",
    icon: Palette,
    location: "Remote · Portfolio-Building",
    tallyId: "Y50WAz",
    desc: "You are the visual voice of Socioverse. We don't want 'corporate' designs; we want scroll-stopping content. Your job: take technical features and turn them into memes, carousels, or Reels that make people say, 'I need this.'",
    requirements: [
      "Design high-quality LinkedIn Carousels and Instagram Posts",
      "Turn raw screen recordings into fast-paced, high-retention Reels/Shorts",
      "Ensure visual identity remains consistent across all channels",
      "Create click-worthy thumbnails and covers",
      "Fast with Canva, CapCut, and AI Image Generators",
      "Autonomous, no micromanaging on font choices or alignment",
    ],
    benefits: [
      "Free access to Canva Pro, CapCut Pro, and AI Image Generators",
      "Real software brand portfolio, not a mock project",
      "Mentorship on branding psychology and marketing hooks",
      "Official Internship Certificate & Performance-Based LOR",
      "20% passive income for referred users",
    ],
  },
  {
    title: "The Tech Lead",
    subtitle: "Developer & QA Intern",
    icon: Code,
    location: "Remote · Production Experience",
    tallyId: "44J4gr",
    desc: "You are the Guardian of the Codebase. We ship fast. Your job: catch what we miss. This requires high integrity and a hacker mindset, trying to break the app before our users do.",
    requirements: [
      "End-to-End Testing: daily 'Happy Path' testing",
      "Bug Smashing: identify, document, and fix UI/UX bugs",
      "Edge Case Hunting: stress-test AI prompts and file uploads",
      "Suggest front-end optimizations",
      "Familiarity with React, Next.js, and Git",
      "Must be willing to sign an NDA",
    ],
    benefits: [
      "Code reviews by the Founder. Learn clean architecture patterns",
      "Write code that ships to real users",
      "Real-world debugging: LLM hallucinations & API limits",
      "Official Internship Certificate & Performance-Based LOR",
      "20% commission for referrals",
    ],
  },
];

const Careers = () => (
  <>
    <section className="container py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">// Careers</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6 max-w-4xl">
          Join the <span className="text-gradient">team.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          We're building Socioverse & Up N Running. These are not mock internships. You ship real code, close real deals, and build real brands.
        </p>
      </Reveal>
    </section>

    <section className="container pb-24">
      <div className="grid gap-8">
        {ROLES.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.1}>
            <div className="glass-strong rounded-3xl p-8 md:p-10 hover:border-primary/40 transition-all">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <r.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold">{r.title}</h2>
                    <p className="text-sm text-muted-foreground">{r.subtitle} · {r.location}</p>
                  </div>
                </div>
                <Button asChild className="rounded-full gap-2 shrink-0">
                  <a href={`https://tally.so/r/${r.tallyId}`}>
                    Apply now <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>

              <p className="text-muted-foreground mb-6">{r.desc}</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-3">What you'll do</h3>
                  <ul className="space-y-2">
                    {r.requirements.map((req, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">→</span> {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-gold mb-3">What you get</h3>
                  <ul className="space-y-2">
                    {r.benefits.map((b, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-gold mt-1">✦</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  </>
);

export default Careers;
