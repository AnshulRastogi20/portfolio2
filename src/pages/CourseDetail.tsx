import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Clock } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { SignupForm } from "@/components/SignupForm";
import { COURSES } from "@/lib/data";

const CourseDetail = () => {
  const { slug } = useParams();
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) return <section className="container py-32 text-center"><h1 className="font-display text-4xl">Not found</h1></section>;

  return (
    <section className="container py-16">
      <Reveal>
        <Link to="/courses" className="font-mono text-xs inline-flex items-center gap-2 mb-10 hover:text-primary transition">
          <ArrowLeft className="w-3 h-3" /> All courses
        </Link>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-gold mb-5">
              <Clock className="w-3 h-3" /> Launching {course.launchEta} · {course.level}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-6">{course.title}</h1>
            <p className="text-lg text-muted-foreground mb-10">{course.summary}</p>

            <h2 className="font-display text-2xl font-bold mb-5">What you'll get</h2>
            <ul className="space-y-3 mb-10">
              {course.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold mb-2">Who this is for</h3>
              <p className="text-sm text-muted-foreground">
                Builders who can write a bit of code and want a structured, opinionated path from idea to shipped product.
                Not a survey course — every module ends in something you ship.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-32 glass-strong rounded-3xl p-8">
              <div className="font-mono text-xs uppercase tracking-wider text-gold mb-3">Waitlist · Early bird</div>
              <div className="font-display text-5xl font-bold text-gradient-gold mb-2">{course.earlyBird}</div>
              <div className="text-sm text-muted-foreground mb-6">Locked in for first 50 waitlist members.</div>
              <SignupForm context={`course:${course.slug}`} ctaLabel="Join waitlist" />
              <p className="font-mono text-xs text-muted-foreground mt-4 text-center">
                You'll get a heads-up 1 week before launch.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default CourseDetail;
