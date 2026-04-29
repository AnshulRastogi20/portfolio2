import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { SignupForm } from "@/components/SignupForm";
import { BLOG_POSTS } from "@/lib/data";

const BlogPost = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <section className="container py-32 text-center">
        <h1 className="font-display text-4xl mb-4">Post not found</h1>
        <Link to="/blog" className="text-primary">← Back to blog</Link>
      </section>
    );
  }

  return (
    <>
      <article className="container max-w-3xl py-16">
        <Reveal>
          <Link to="/blog" className="font-mono text-xs inline-flex items-center gap-2 mb-10 hover:text-primary transition">
            <ArrowLeft className="w-3 h-3" /> All posts
          </Link>
          <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground mb-6">
            <span className="text-primary">{post.category}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.readTime}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1] mb-6">{post.title}</h1>
          <p className="text-xl text-muted-foreground mb-12">{post.excerpt}</p>

          <div className="aspect-[16/9] rounded-3xl bg-gradient-mesh relative overflow-hidden mb-12">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[10rem] font-bold text-gradient opacity-40">{post.title[0]}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="prose-content space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>This is where the full article lives. The header, metadata, and reader UI are all wired up — drop your real content in via the data file (or hook up Lovable Cloud later for a true CMS).</p>
            <p>I write about AI, products, and the discipline of shipping things you'd actually use yourself. Each essay is meant to leave you with one clear, actionable idea.</p>
            <h2 className="font-display text-3xl font-bold pt-4">A subhead, for rhythm</h2>
            <p>Long-form structure handled. Inline links, lists, blockquotes — all styled by the design system. Replace this placeholder with your draft when ready.</p>
            <blockquote className="border-l-2 border-primary pl-6 italic text-muted-foreground my-8">
              "The audience you build today is the leverage you'll have tomorrow."
            </blockquote>
            <p>Thanks for reading. If this resonated, the newsletter is the best place to keep up.</p>
          </div>
        </Reveal>

        {/* INLINE NEWSLETTER */}
        <Reveal delay={0.15}>
          <div className="glass-strong rounded-3xl p-8 md:p-10 my-16 text-center">
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
    </>
  );
};

export default BlogPost;
