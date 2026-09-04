import { Link } from "react-router-dom";
import { ArrowRight, Check, Download, ExternalLink, Youtube } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { COURSE } from "@/lib/data";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLiveFetch } from "@/hooks/useLiveFetch";

type Course = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  level: string | null;
  category: string | null;
  external_link: string | null;
  price: string | null;
  bullets: string[];
  active: boolean;
  display_order: number;
};

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useLiveFetch(async (isActive) => {
    const { data } = await supabase
      .from("courses")
      .select("*")
      .eq("active", true)
      .order("display_order");
    if (!isActive()) return;
    setCourses((data as Course[]) ?? []);
    setLoading(false);
  });

  return (
    <>
      <section className="container py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-brand mb-4">// Courses</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[0.95] mb-6 max-w-4xl">
            Skill <span className="text-gradient-gold">courses.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            There is one course, it is called AI Sight, and it is going out free on YouTube
            two lectures a week. The workbook that goes with it is the only thing behind an
            email box.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button asChild size="lg" className="rounded-full gap-2 shadow-glow">
              <Link to="/workbook"><Download className="w-4 h-4" /> Get the workbook</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full gap-2 glass">
              <a href={COURSE.playlist}><Youtube className="w-4 h-4" /> Watch the lectures</a>
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="container py-12">
        {loading ? (
          <div className="text-center text-muted-foreground py-20">Loading courses...</div>
        ) : courses.length === 0 ? (
          <Reveal>
            {/* BunkToBrains used to be pitched here as "our full catalog".
                It was postponed because not enough students were interested,
                so pointing people at it as a catalogue is not true any more. */}
            <div className="glass rounded-3xl p-12 text-center max-w-2xl mx-auto">
              <h3 className="font-display text-2xl font-semibold mb-3">AI Sight is the course</h3>
              <p className="text-muted-foreground mb-6">
                {COURSE.lectures} lectures, {COURSE.runtime}, {COURSE.cadence.toLowerCase()},
                from {COURSE.window}. Free on YouTube, and there is nothing behind it that
                costs money.
              </p>
              <Link to="/workbook" className="inline-flex items-center gap-2 text-brand hover:underline font-mono text-sm">
                Get the workbook <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.08}>
                {c.external_link ? (
                  <a href={c.external_link} className="group block">
                    <CourseCard course={c} />
                  </a>
                ) : (
                  <div className="group block">
                    <CourseCard course={c} />
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

const CourseCard = ({ course: c }: { course: Course }) => (
  <div className="glass rounded-3xl p-8 h-full hover-lift hover:border-gold/50 transition-colors">
    <div className="flex items-center justify-between mb-6">
      {c.category && (
        <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-gold">
          {c.category}
        </span>
      )}
      {c.level && <span className="text-xs glass rounded-full px-3 py-1">{c.level}</span>}
    </div>
    <h3 className="font-display text-2xl font-semibold mb-3">{c.title}</h3>
    {c.summary && <p className="text-sm text-muted-foreground mb-6">{c.summary}</p>}
    {c.bullets.length > 0 && (
      <ul className="space-y-2 mb-6">
        {c.bullets.slice(0, 3).map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-brand shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{b}</span>
          </li>
        ))}
      </ul>
    )}
    <div className="flex items-center justify-between font-mono text-xs pt-6 border-t border-border/50">
      {c.price && <span className="text-gold">{c.price}</span>}
      {c.external_link && (
        <span className="text-brand inline-flex items-center gap-1 group-hover:gap-2 transition-colors">
          View course <ExternalLink className="w-3 h-3" />
        </span>
      )}
    </div>
  </div>
);

export default Courses;
