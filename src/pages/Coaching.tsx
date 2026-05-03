import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";

const Coaching = () => (
  <>
    <section className="container py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">// 1:1 Coaching</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6 max-w-4xl">
          Coaching is <br />
          <span className="text-gradient">coming soon.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-10">
          1:1 coaching and mentorship programs are being designed. Stay tuned for structured sessions on AI automation, building products, and scaling startups.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full gap-2">
            <Link to="/newsletter"><Sparkles className="w-4 h-4" /> Get notified when it launches</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full gap-2">
            <Link to="/contact">Book a strategy call instead <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </Reveal>
    </section>
  </>
);

export default Coaching;
