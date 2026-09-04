import { Link } from "react-router-dom";
import { Reveal } from "@/components/PageTransition";

const NotFound = () => (
  <section className="container min-h-[70vh] flex items-center justify-center text-center py-20">
    <Reveal>
      <p className="font-mono text-xs uppercase tracking-widest text-brand mb-4">// 404</p>
      <h1 className="font-display text-7xl md:text-9xl font-bold leading-[0.9] mb-6">
        This page <br />
        <span className="text-gradient">wandered off.</span>
      </h1>
      <p className="text-muted-foreground mb-8">It happens to the best of us.</p>
      <Link to="/" className="inline-flex bg-primary text-primary-foreground rounded-full px-7 h-12 items-center font-medium hover:opacity-90 transition">
        Take me home
      </Link>
    </Reveal>
  </section>
);

export default NotFound;
