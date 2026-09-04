import { Link } from "react-router-dom";
import { Mail, Calendar, FileText, Download } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { SignupForm } from "@/components/SignupForm";
import { EyeMark } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { COURSE, BLOG_POSTS } from "@/lib/data";

/**
 * The newsletter page.
 *
 * Everything that used to be on it was invented: 1,240 subscribers, 48 issues,
 * a 62% open rate, "Join 1,240+ builders", issue numbers counted down from #048
 * against blog posts that were never issues, and a "Free AI Builder's Starter
 * Kit" that does not exist. None of it was ever true and all of it is gone.
 *
 * What is true: this list is new, it has not sent an issue yet, and its first
 * job is delivering the AI Sight workbook. Saying so is not a weaker page than
 * a fake number - a stranger who is "suspicious of anyone who sounds like a
 * guru" reads a round subscriber count as a claim to check, and reads "this
 * just started" as somebody not bothering to lie about it.
 *
 * The real signup is at /workbook, because that is what people actually want.
 * This page exists for the ones who want the email without the PDF.
 */
const Newsletter = () => (
  <>
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="container relative text-center max-w-3xl">
        <Reveal>
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 font-mono text-xs">
            <EyeMark className="h-3.5 w-auto" /> One email, Fridays
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[0.95] mb-6">
            What I'm building, <br />
            <span className="text-gradient">and what broke.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4">
            One email a week, on Friday. During the AI Sight run it covers that week's two
            lectures and the workbook sections that go with them. After that it becomes
            whatever I am actually working on.
          </p>
          <p className="text-muted-foreground mb-8">
            Being straight with you: this list is new and I have not sent an issue yet.
            You would be early rather than joining a crowd.
          </p>
          <div className="max-w-md mx-auto">
            <SignupForm variant="hero" ctaLabel="Sign me up" />
          </div>
          <p className="font-mono text-xs text-muted-foreground mt-4">
            Unsubscribe any time, one click, no questions.
          </p>
        </Reveal>
      </div>
    </section>

    {/* The workbook is the better front door and it should say so. */}
    <section className="container py-16">
      <Reveal>
        <div className="glass-strong rounded-[2rem] p-10 md:p-14 max-w-3xl mx-auto text-center">
          <Download className="w-9 h-9 mx-auto mb-5 text-brand" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Actually, you probably want the workbook.
          </h2>
          <p className="text-muted-foreground mb-8">
            All {COURSE.lectures} sections of the AI Sight workbook, free, delivered on the
            spot. The weekly email is a separate, optional box on that page - and it is off
            by default.
          </p>
          <Button asChild size="lg" className="rounded-full h-12 px-7 gap-2 shadow-glow">
            <Link to="/workbook"><Download className="w-4 h-4" /> Get the workbook</Link>
          </Button>
        </div>
      </Reveal>
    </section>

    {/* WHAT IS IN IT */}
    <section className="container py-20">
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-semibold text-center mb-14 leading-[0.95]">
          What's <span className="text-gradient">in it.</span>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {[
          {
            icon: Calendar,
            title: "The week's lectures",
            desc: "Which two went up, and who each one is actually for. Two paragraphs, not an essay.",
          },
          {
            icon: FileText,
            title: "The workbook sections",
            desc: "Which sections go with them, and the links, so you are not hunting for the right page.",
          },
          {
            icon: Mail,
            title: "What broke",
            desc: "When something I built falls over, that goes in too. It is usually the more useful half.",
          },
        ].map((b, i) => (
          <Reveal key={b.title} delay={i * 0.08}>
            <div className="glass rounded-3xl p-7 h-full hover-lift hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mb-5">
                <b.icon className="w-5 h-5 text-brand" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* WRITING - the blog, labelled as the blog. These were never issues. */}
    <section className="container py-20">
      <Reveal>
        <h2 className="font-display text-4xl md:text-6xl font-semibold mb-4 leading-[0.95]">
          Until then, <span className="text-gradient">the blog.</span>
        </h2>
        <p className="text-muted-foreground mb-14 max-w-2xl">
          These are posts, not back issues - there are no back issues yet. They are the
          closest thing to a sample of how I write.
        </p>
      </Reveal>
      <div className="space-y-3 max-w-3xl">
        {BLOG_POSTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.04}>
            <Link to={`/blog/${p.slug}`} className="group block glass rounded-2xl p-5 hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-1">{p.date} · {p.readTime}</div>
                  <h3 className="font-display text-lg font-semibold group-hover:text-brand transition-colors">{p.title}</h3>
                </div>
                <span className="font-mono text-xs text-brand shrink-0">Read →</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="container py-20">
      <Reveal>
        <div className="glass-strong rounded-[2rem] p-10 md:p-16 text-center">
          <EyeMark className="h-10 w-auto mx-auto mb-5" />
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">Want the Friday email?</h2>
          <p className="text-muted-foreground mb-8">
            Free, one a week, and you can stop it in one click.
          </p>
          <div className="max-w-md mx-auto"><SignupForm variant="hero" ctaLabel="Sign me up" /></div>
          <p className="font-mono text-xs text-muted-foreground mt-5">
            <Link to="/privacy" className="hover:text-brand transition-colors">What I do with your email</Link>
          </p>
        </div>
      </Reveal>
    </section>
  </>
);

export default Newsletter;
