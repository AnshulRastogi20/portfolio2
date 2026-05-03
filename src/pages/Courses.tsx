import { Link } from "react-router-dom";
import { Clock, ArrowRight, Check, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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

  useEffect(() => {
    supabase
      .from("courses")
      .select("*")
      .eq("active", true)
      .order("display_order")
      .then(({ data }) => {
        setCourses((data as Course[]) ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="container py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-gold mb-4">// Courses</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6 max-w-4xl">
            Skill <span className="text-gradient-gold">courses.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Hands-on courses built around real builds. Browse below or check out <a href="https://www.bunktobrains.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">BunkToBrains</a> for our full catalog.
          </p>
        </Reveal>
      </section>

      <section className="container py-12">
        {loading ? (
          <div className="text-center text-muted-foreground py-20">Loading courses...</div>
        ) : courses.length === 0 ? (
          <Reveal>
            <div className="glass rounded-3xl p-12 text-center max-w-2xl mx-auto">
              <h3 className="font-display text-2xl font-bold mb-3">Courses coming soon</h3>
              <p className="text-muted-foreground mb-6">
                We're curating skill courses via BunkToBrains. Check back soon or visit our EdTech platform.
              </p>
              <a href="https://www.bunktobrains.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline font-mono text-sm">
                Visit BunkToBrains <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.08}>
                {c.external_link ? (
                  <a href={c.external_link} target="_blank" rel="noreferrer" className="group block">
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
  <div className="glass rounded-3xl p-8 h-full hover-lift hover:border-gold/50 transition-all">
    <div className="flex items-center justify-between mb-6">
      {c.category && (
        <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-gold">
          {c.category}
        </span>
      )}
      {c.level && <span className="text-xs glass rounded-full px-3 py-1">{c.level}</span>}
    </div>
    <h3 className="font-display text-2xl font-bold mb-3">{c.title}</h3>
    {c.summary && <p className="text-sm text-muted-foreground mb-6">{c.summary}</p>}
    {c.bullets.length > 0 && (
      <ul className="space-y-2 mb-6">
        {c.bullets.slice(0, 3).map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{b}</span>
          </li>
        ))}
      </ul>
    )}
    <div className="flex items-center justify-between font-mono text-xs pt-6 border-t border-border/50">
      {c.price && <span className="text-gold">{c.price}</span>}
      {c.external_link && (
        <span className="text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
          View course <ExternalLink className="w-3 h-3" />
        </span>
      )}
    </div>
  </div>
);

export default Courses;
