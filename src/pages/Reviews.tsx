import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Quote, Play, Link2, Check, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { TESTIMONIALS } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";
import { useLiveFetch } from "@/hooks/useLiveFetch";
import { toast } from "sonner";

type Review = {
  id: string;
  quote: string;
  author: string;
  role: string | null;
  link: string | null;
  photo_url: string | null;
  video_url: string | null;
  featured?: boolean;
};

const staticAsReviews = (): Review[] =>
  TESTIMONIALS.map((t) => ({
    id: t.slug,
    quote: t.quote,
    author: t.author,
    role: t.role,
    link: null,
    photo_url: null,
    video_url: null,
    featured: false,
  }));

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>(staticAsReviews());
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Reviews · Anshul";
  }, []);

  useLiveFetch(async (isActive) => {
    const { data } = await supabase
      .from("testimonials")
      .select("id, quote, author, role, link, photo_url, video_url, featured")
      .order("display_order");
    if (isActive() && data && data.length > 0) setReviews(data as Review[]);
  });

  const visible = filter === "featured" ? reviews.filter((r) => r.featured) : reviews;

  const copy = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/reviews/${id}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("Link copied");
    setTimeout(() => setCopiedId(null), 1600);
  };

  return (
    <>
      <section className="container pt-10 pb-16">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">// Kind words</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
              People I've <span className="text-gradient">helped.</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Every review here has its own page. Click any card to open it, or copy the share link.
            </p>
          </div>
        </Reveal>

        <div className="flex justify-center gap-2 mt-10">
          {(["all", "featured"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "glass hover:bg-secondary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="container pb-32">
        <div className="grid md:grid-cols-2 gap-6">
          {visible.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.06}>
              <Link
                to={`/reviews/${r.id}`}
                className="glass rounded-3xl p-8 h-full relative block hover-lift hover:border-primary/40 transition-colors cursor-pointer"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
                {/* No star row. Nobody ever gave a rating, so drawing five of
                    them is inventing social proof - the exact thing a
                    fabricated "4.8/5 from 150 reviews" had to be removed for. */}
                <p className="text-lg leading-relaxed mb-6 line-clamp-5">"{r.quote}"</p>
                <div className="font-mono text-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {r.photo_url && (
                      <img loading="lazy" decoding="async" src={r.photo_url} alt={r.author} className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" />
                    )}
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{r.author}</div>
                      <div className="text-muted-foreground truncate">{r.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {r.video_url && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gold/15 text-gold text-[11px] font-semibold">
                        <Play className="w-3 h-3" /> Video
                      </span>
                    )}
                    <button
                      onClick={(e) => copy(e, r.id)}
                      aria-label="Copy share link"
                      className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                    >
                      {copiedId === r.id ? <Check className="w-3.5 h-3.5 text-brand" /> : <Link2 className="w-3.5 h-3.5" />}
                    </button>
                    <span className="inline-flex items-center gap-1 text-brand text-[11px]">
                      Open <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="text-center text-muted-foreground py-20">No reviews yet.</div>
        )}
      </section>
    </>
  );
};

export default Reviews;
