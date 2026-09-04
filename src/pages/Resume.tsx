import { Reveal } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

const Resume = () => {
  const resumeUrl = "/resume.pdf"; // Drop your PDF in /public/resume.pdf

  return (
    <section className="container py-20 max-w-4xl">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-4">// CV</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
          The <span className="text-gradient">resume.</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
          A one-page snapshot of the work, the wins, and the stack. Open it inline or grab the PDF.
        </p>
        <div className="flex flex-wrap gap-3 mb-10">
          <Button asChild size="lg" className="rounded-full gap-2">
            <a href={resumeUrl} download>
              <Download className="w-4 h-4" /> Download PDF
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full gap-2">
            <a href={resumeUrl}>
              <ExternalLink className="w-4 h-4" /> Open in new tab
            </a>
          </Button>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="glass-strong rounded-3xl overflow-hidden aspect-[1/1.4] bg-card/30">
          <iframe src={resumeUrl} className="w-full h-full border-0" title="Resume PDF">
            <div className="p-10 text-center text-muted-foreground">
              PDF preview unavailable.{" "}
              <a href={resumeUrl} className="text-brand underline">Download instead</a>.
            </div>
          </iframe>
        </div>
      </Reveal>
    </section>
  );
};

export default Resume;
