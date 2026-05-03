import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Clock, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { SignupForm } from "@/components/SignupForm";
import { BLOG_POSTS } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";

type Post = {
  slug: string; title: string; excerpt: string;
  date: string; readTime: string; category: string;
  tags: string[]; featured: boolean; coverUrl?: string;
};

const Blog = () => {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>(BLOG_POSTS as Post[]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("slug,title,excerpt,published_at,read_time,category,tags,featured,cover_url")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (!error && data && data.length > 0) {
        setPosts(data.map((p: any) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt ?? "",
          date: p.published_at ? new Date(p.published_at).toISOString().slice(0, 10) : "",
          readTime: p.read_time ?? "",
          category: p.category ?? "",
          tags: p.tags ?? [],
          featured: !!p.featured,
          coverUrl: p.cover_url ?? undefined,
        })));
      }
    })();
  }, []);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => p !== featured);
  const filtered = rest.filter((p) =>
    (!tag || p.tags.includes(tag)) &&
    (q === "" || p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <section className="container py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">// The Journal</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6 max-w-4xl">
            Notes from <br />
            <span className="text-gradient">the workbench.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Essays on AI, building products, and thinking clearly. New posts every Sunday.
          </p>
        </Reveal>

        {/* Search */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[280px] max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pl-11 h-12 rounded-full glass border-border/60"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTag(null)}
                className={`px-4 h-10 rounded-full text-xs font-mono uppercase tracking-wider transition ${!tag ? "bg-primary text-primary-foreground" : "glass hover:border-primary/40"}`}
              >
                All
              </button>
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`px-4 h-10 rounded-full text-xs font-mono uppercase tracking-wider transition ${tag === t ? "bg-primary text-primary-foreground" : "glass hover:border-primary/40"}`}
                >
                  #{t}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* FEATURED */}
      {featured && (
        <section className="container py-12">
          <Reveal>
            <Link to={`/blog/${featured.slug}`} className="block group">
              <article className="glass-strong rounded-[2rem] overflow-hidden hover:border-primary/40 transition-all">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] md:aspect-auto bg-gradient-mesh relative overflow-hidden">
                    {featured.coverUrl ? (
                      <img src={featured.coverUrl} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="absolute inset-0 grid-bg opacity-40" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-display text-9xl font-bold text-gradient opacity-50">{featured.title[0]}</span>
                        </div>
                      </>
                    )}
                    <span className="absolute top-6 left-6 glass rounded-full px-3 py-1 font-mono text-xs uppercase tracking-wider text-gold z-10">Featured</span>
                  </div>
                  <div className="p-10 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground mb-5">
                      <span className="text-primary">{featured.category}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {featured.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {featured.readTime}</span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">{featured.title}</h2>
                    <p className="text-muted-foreground">{featured.excerpt}</p>
                  </div>
                </div>
              </article>
            </Link>
          </Reveal>
        </section>
      )}

      {/* GRID */}
      <section className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link to={`/blog/${p.slug}`} className="group block">
                <article className="glass rounded-3xl overflow-hidden h-full hover-lift hover:border-primary/40 transition-all">
                  {p.coverUrl && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={p.coverUrl} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-7">
                  <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground mb-5">
                    <span className="text-primary">{p.category}</span>
                    <span>·</span>
                    <span>{p.readTime}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">{p.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-5">{p.excerpt}</p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {p.tags.map((t) => (
                      <span key={t} className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">#{t}</span>
                    ))}
                   </div>
                   <span className="inline-flex items-center gap-1.5 text-xs text-primary mt-4 font-mono">
                     <ExternalLink className="w-3 h-3" /> Read post
                   </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INLINE NEWSLETTER CTA */}
      <section className="container py-20">
        <Reveal>
          <div className="glass-strong rounded-[2rem] p-10 md:p-14 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
              Get new posts <span className="text-gradient">in your inbox.</span>
            </h2>
            <p className="text-muted-foreground mb-8">Every Sunday. One short letter. No spam.</p>
            <SignupForm variant="hero" />
          </div>
        </Reveal>
      </section>
    </>
  );
};

export default Blog;
