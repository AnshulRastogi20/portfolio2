import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, X, Share2 } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Reveal } from "@/components/PageTransition";
import { SignupForm } from "@/components/SignupForm";
import { BLOG_POSTS } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";

type Post = {
  slug: string; title: string; excerpt: string; content?: string;
  date: string; readTime: string; category: string; tags: string[];
  cover?: string | null; images?: string[];
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug!)
        .eq("published", true)
        .maybeSingle();
      if (data) {
        setPost({
          slug: data.slug, title: data.title, excerpt: data.excerpt ?? "",
          content: data.content, date: data.published_at?.slice(0, 10) ?? "",
          readTime: data.read_time ?? "", category: data.category ?? "",
          tags: data.tags ?? [], cover: (data as any).cover_url ?? null,
          images: (data as any).images ?? [],
        });
        const { data: more } = await supabase
          .from("blog_posts")
          .select("slug,title,excerpt,published_at,read_time,category,tags")
          .eq("published", true)
          .neq("slug", slug!)
          .limit(3);
        setRelated((more ?? []).map((p: any) => ({
          slug: p.slug, title: p.title, excerpt: p.excerpt ?? "",
          date: p.published_at?.slice(0, 10) ?? "", readTime: p.read_time ?? "",
          category: p.category ?? "", tags: p.tags ?? [],
        })));
      } else {
        const seed = BLOG_POSTS.find((p) => p.slug === slug);
        if (seed) setPost(seed as Post);
        setRelated(BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3) as Post[]);
      }
      setLoaded(true);
    })();
  }, [slug]);

  if (!loaded) return <section className="container py-32 text-center text-muted-foreground">Loading...</section>;

  if (!post) {
    return (
      <section className="container py-32 text-center">
        <h1 className="font-display text-4xl mb-4">Post not found</h1>
        <Link to="/blog" className="text-primary">← Back to blog</Link>
      </section>
    );
  }

  const gallery = (post.images ?? []).filter(Boolean);

  useEffect(() => {
    if (post?.title) document.title = `${post.title} - Anshul`;
  }, [post?.title]);

  const sharePost = async () => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    if (navigator.share) {
      try { await navigator.share({ title: post.title, text: post.excerpt, url }); return; } catch {}
    }
    try { await navigator.clipboard.writeText(url); toast.success("Link copied"); }
    catch { toast.error("Could not copy link"); }
  };

  return (
    <>
      <article className="container max-w-3xl py-16">
        <Reveal>
          <div className="flex items-center justify-between mb-10">
            <Link to="/blog" className="font-mono text-xs inline-flex items-center gap-2 hover:text-primary transition">
              <ArrowLeft className="w-3 h-3" /> All posts
            </Link>
            <button onClick={sharePost} className="font-mono text-xs inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 hover:border-primary/40 hover:text-primary transition">
              <Share2 className="w-3 h-3" /> Copy link
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground mb-6">
            <span className="text-primary">{post.category}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.readTime}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1] mb-6 break-words">{post.title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12">{post.excerpt}</p>

          <div className="aspect-[16/9] rounded-3xl bg-gradient-mesh relative overflow-hidden mb-12">
            {post.cover ? (
              <img src={post.cover} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[10rem] font-bold text-gradient opacity-40">{post.title[0]}</span>
                </div>
              </>
            )}
          </div>

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {post.tags.map((t) => (
                <span key={t} className="glass rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">#{t}</span>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="prose-content text-base md:text-lg leading-relaxed text-foreground/90
            [&_h2]:font-display [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4
            [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:my-5
            [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4
            [&_strong]:text-foreground
            [&_ul]:my-5 [&_ul]:pl-6 [&_ul]:list-disc [&_ul>li]:my-2
            [&_ol]:my-5 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol>li]:my-2
            [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-8
            [&_code]:font-mono [&_code]:text-sm [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
            [&_img]:rounded-2xl [&_img]:my-8">
            {post.content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            ) : (
              <>
                <p>This essay is still in the works. The title and metadata are live, but the body is on the way.</p>
                <blockquote>"The audience you build today is the leverage you'll have tomorrow."</blockquote>
              </>
            )}
          </div>
        </Reveal>

        {/* IMAGE GALLERY */}
        {gallery.length > 0 && (
          <Reveal delay={0.12}>
            <section className="my-16">
              <div className="flex items-end justify-between mb-6">
                <h2 className="font-display text-2xl md:text-3xl font-bold">Gallery</h2>
                <span className="font-mono text-xs text-muted-foreground">{gallery.length} {gallery.length === 1 ? "image" : "images"}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox(src)}
                    className="group relative aspect-square overflow-hidden rounded-2xl glass hover:border-primary/40 transition"
                  >
                    <img
                      src={src}
                      alt={`${post.title} - ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {/* INLINE NEWSLETTER */}
        <Reveal delay={0.15}>
          <div className="glass-strong rounded-3xl p-6 md:p-10 my-16 text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">Liked this?</h3>
            <p className="text-muted-foreground mb-6">Get the next one in your inbox.</p>
            <SignupForm variant="hero" />
          </div>
        </Reveal>
      </article>

      {/* RELATED */}
      <section className="container py-20 border-t border-border/50">
        <Reveal>
          <h2 className="font-display text-3xl font-bold mb-10">Keep reading</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link to={`/blog/${p.slug}`} className="group block glass rounded-3xl p-7 hover-lift hover:border-primary/40 transition-all h-full">
                <div className="font-mono text-xs text-primary mb-4">{p.category}</div>
                <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center hover:border-primary/40 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={lightbox}
            alt="Gallery"
            className="max-w-full max-h-full object-contain rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default BlogPost;
