import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Quote, Star, Link2, Check, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Review = {
  id: string;
  quote: string;
  author: string;
  role: string | null;
  link: string | null;
  photo_url: string | null;
  video_url: string | null;
};

const toEmbed = (url: string): { type: "iframe" | "video"; src: string } => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      const id = u.hostname.includes("youtu.be") ? u.pathname.slice(1) : u.searchParams.get("v") || u.pathname.split("/").pop();
      return { type: "iframe", src: `https://www.youtube.com/embed/${id}` };
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return { type: "iframe", src: `https://player.vimeo.com/video/${id}` };
    }
  } catch {}
  return { type: "video", src: url };
};

const ReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      // try DB first (uuid)
      const isUuid = /^[0-9a-f]{8}-/i.test(id);
      if (isUuid) {
        const { data } = await supabase
          .from("testimonials")
          .select("id, quote, author, role, link, photo_url, video_url")
          .eq("id", id)
          .maybeSingle();
        if (!cancelled && data) {
          setReview(data as Review);
          setLoading(false);
          return;
        }
      }
      // fallback to static slug
      const t = TESTIMONIALS.find((x) => x.slug === id);
      if (!cancelled) {
        if (t) {
          setReview({ id: t.slug, quote: t.quote, author: t.author, role: t.role, link: null, photo_url: null, video_url: null });
        } else {
          navigate("/reviews", { replace: true });
        }
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, navigate]);

  useEffect(() => {
    if (review) document.title = `${review.author} on Anshul`;
  }, [review]);

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied");
    setTimeout(() => setCopied(false), 1600);
  };

  if (loading || !review) {
    return <div className="container py-32 text-center text-muted-foreground">Loading…</div>;
  }

  const embed = review.video_url ? toEmbed(review.video_url) : null;

  return (
    <section className="container py-16 max-w-3xl">
      <Link to="/reviews" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground mb-10 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> All reviews
      </Link>

      <Reveal>
        <article className="glass-strong rounded-3xl p-10 md:p-14 relative">
          <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/15" />

          <div className="flex gap-0.5 mb-6">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} className="w-5 h-5 fill-gold text-gold" />
            ))}
          </div>

          <blockquote className="font-display text-3xl md:text-4xl font-bold leading-tight mb-10">
            "{review.quote}"
          </blockquote>

          <div className="flex items-center gap-4 mb-8">
            {review.photo_url ? (
              <img src={review.photo_url} alt={review.author} className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/30" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center font-display text-xl font-bold text-primary">
                {review.author.charAt(0)}
              </div>
            )}
            <div>
              <div className="font-display text-xl font-bold">{review.author}</div>
              {review.role && <div className="font-mono text-xs text-muted-foreground">{review.role}</div>}
            </div>
          </div>

          {embed && (
            <div className="rounded-2xl overflow-hidden mb-8 aspect-video bg-black">
              {embed.type === "iframe" ? (
                <iframe
                  src={embed.src}
                  title={`${review.author} video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={embed.src} controls className="w-full h-full" />
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-border/50">
            <Button onClick={copy} variant="outline" size="sm" className="rounded-full gap-2">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy share link"}
            </Button>
            {review.link && (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <ExternalLink className="w-3.5 h-3.5" /> {review.link}
              </span>
            )}
          </div>
        </article>
      </Reveal>
    </section>
  );
};

export default ReviewDetail;
