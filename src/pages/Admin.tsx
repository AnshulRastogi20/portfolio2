import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Download, Trash2, Mail, Edit, Plus, X, LogOut, Eye, EyeOff, ExternalLink, Star, GripVertical } from "lucide-react";
import { Reveal } from "@/components/PageTransition";

type Subscriber = { id: string; email: string; source: string; created_at: string };
type Waitlist = { id: string; email: string; kind: string; slug: string | null; created_at: string };
type Contact = { id: string; name: string; email: string; topic: string | null; message: string; read_at: string | null; created_at: string };
type Post = {
  id: string; slug: string; title: string; excerpt: string | null; content: string;
  category: string | null; tags: string[]; cover_url: string | null; read_time: string | null;
  featured: boolean; published: boolean; published_at: string | null; updated_at: string; created_at: string;
};
type Testimonial = {
  id: string; author: string; role: string | null; quote: string; link: string | null;
  photo_url: string | null; video_url: string | null; featured: boolean; display_order: number; created_at: string;
};
type Course = {
  id: string; title: string; slug: string; summary: string | null; level: string | null;
  category: string | null; external_link: string | null; price: string | null;
  bullets: string[]; active: boolean; display_order: number; created_at: string; updated_at: string;
};

function downloadCSV(rows: Record<string, any>[], filename: string) {
  if (!rows.length) return toast.error("Nothing to export");
  const headers = Object.keys(rows[0]);
  const escape = (v: any) => {
    if (v == null) return "";
    const s = String(v).replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  const csv = [headers.join(","), ...rows.map(r => headers.map(h => escape(r[h])).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();

  if (loading) return <div className="container py-32 text-center text-muted-foreground">Loading...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <section className="container py-24">
      <Reveal>
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brand mb-2">// Dashboard</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">Mission control.</h1>
            <p className="text-muted-foreground mt-2 text-sm font-mono">{user.email}</p>
          </div>
          <Button variant="outline" className="rounded-full gap-2" onClick={signOut}>
            <LogOut className="w-4 h-4" /> Sign out
          </Button>
        </div>
      </Reveal>

      <Tabs defaultValue="subscribers" className="w-full">
        <TabsList className="rounded-full p-1 mb-8 flex-wrap h-auto">
          <TabsTrigger value="subscribers" className="rounded-full">Subscribers</TabsTrigger>
          <TabsTrigger value="waitlist" className="rounded-full">Waitlists</TabsTrigger>
          <TabsTrigger value="contact" className="rounded-full">Contact</TabsTrigger>
          <TabsTrigger value="blog" className="rounded-full">Blog</TabsTrigger>
          <TabsTrigger value="testimonials" className="rounded-full">Testimonials</TabsTrigger>
          <TabsTrigger value="courses" className="rounded-full">Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="subscribers"><SubscribersTab /></TabsContent>
        <TabsContent value="waitlist"><WaitlistTab /></TabsContent>
        <TabsContent value="contact"><ContactTab /></TabsContent>
        <TabsContent value="blog"><BlogTab /></TabsContent>
        <TabsContent value="testimonials"><TestimonialsTab /></TabsContent>
        <TabsContent value="courses"><CoursesTab /></TabsContent>
      </Tabs>
    </section>
  );
};

/* ---------------- SUBSCRIBERS ---------------- */
const SubscribersTab = () => {
  const [rows, setRows] = useState<Subscriber[]>([]);
  const [q, setQ] = useState("");
  const load = async () => {
    const { data, error } = await supabase.from("subscribers").select("*").order("created_at", { ascending: false });
    if (error) return toast.error(error.message);
    setRows(data ?? []);
  };
  useEffect(() => { load(); }, []);
  const filtered = rows.filter(r => r.email.toLowerCase().includes(q.toLowerCase()));
  const remove = async (id: string) => {
    if (!confirm("Delete this subscriber?")) return;
    const { error } = await supabase.from("subscribers").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Removed");
    load();
  };

  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h2 className="font-display text-2xl font-bold mr-auto">{rows.length} subscribers</h2>
        <Input placeholder="Search email..." value={q} onChange={e => setQ(e.target.value)} className="h-10 rounded-full bg-card/60 max-w-xs" />
        <Button onClick={() => downloadCSV(rows, `subscribers-${Date.now()}.csv`)} className="rounded-full gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground font-mono text-xs uppercase tracking-wider">
            <tr><th className="py-3">Email</th><th>Source</th><th>Joined</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-t border-border/40">
                <td className="py-3 font-medium">{r.email}</td>
                <td className="text-muted-foreground">{r.source}</td>
                <td className="text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
                <td className="text-right">
                  <button onClick={() => remove(r.id)} className="text-muted-foreground hover:text-destructive p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={4} className="py-10 text-center text-muted-foreground">No subscribers yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ---------------- WAITLISTS ---------------- */
const WaitlistTab = () => {
  const [rows, setRows] = useState<Waitlist[]>([]);
  const load = async () => {
    const { data, error } = await supabase.from("waitlist_entries").select("*").order("created_at", { ascending: false });
    if (error) return toast.error(error.message);
    setRows(data ?? []);
  };
  useEffect(() => { load(); }, []);
  const grouped = rows.reduce<Record<string, Waitlist[]>>((acc, r) => {
    const key = `${r.kind}:${r.slug ?? "-"}`;
    (acc[key] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).length === 0 && (
        <div className="glass-strong rounded-3xl p-10 text-center text-muted-foreground">No waitlist signups yet.</div>
      )}
      {Object.entries(grouped).map(([key, items]) => (
        <div key={key} className="glass-strong rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <h3 className="font-display text-xl font-bold">{key}</h3>
              <p className="text-xs text-muted-foreground font-mono">{items.length} signups</p>
            </div>
            <Button onClick={() => downloadCSV(items, `waitlist-${key.replace(":", "-")}.csv`)} className="rounded-full gap-2" size="sm">
              <Download className="w-3 h-3" /> CSV
            </Button>
          </div>
          <div className="space-y-2">
            {items.map(i => (
              <div key={i.id} className="flex items-center justify-between text-sm py-2 border-t border-border/40">
                <span className="font-medium">{i.email}</span>
                <span className="text-muted-foreground text-xs">{new Date(i.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ---------------- CONTACT ---------------- */
const ContactTab = () => {
  const [rows, setRows] = useState<Contact[]>([]);
  const load = async () => {
    const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    if (error) return toast.error(error.message);
    setRows(data ?? []);
  };
  useEffect(() => { load(); }, []);
  const toggleRead = async (r: Contact) => {
    const { error } = await supabase.from("contact_submissions")
      .update({ read_at: r.read_at ? null : new Date().toISOString() })
      .eq("id", r.id);
    if (error) return toast.error(error.message);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await supabase.from("contact_submissions").delete().eq("id", id);
    load();
  };
  const unread = rows.filter(r => !r.read_at).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display text-2xl font-bold">{rows.length} messages <span className="text-sm text-muted-foreground font-normal font-mono">· {unread} unread</span></h2>
        <Button onClick={() => downloadCSV(rows, `contacts-${Date.now()}.csv`)} className="rounded-full gap-2" size="sm">
          <Download className="w-4 h-4" /> CSV
        </Button>
      </div>
      {rows.length === 0 && <div className="glass-strong rounded-3xl p-10 text-center text-muted-foreground">No messages yet.</div>}
      {rows.map(r => (
        <div key={r.id} className={`glass-strong rounded-3xl p-6 ${!r.read_at ? "border-primary/40" : ""}`}>
          <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-display text-lg font-bold">{r.name}</h3>
                {!r.read_at && <Badge className="text-[10px]">NEW</Badge>}
                {r.topic && <Badge variant="secondary" className="text-[10px]">{r.topic}</Badge>}
              </div>
              <a href={`mailto:${r.email}`} className="text-sm text-brand font-mono">{r.email}</a>
              <p className="text-xs text-muted-foreground font-mono mt-1">{new Date(r.created_at).toLocaleString()}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => toggleRead(r)} className="p-2 hover:bg-secondary rounded-full" aria-label="toggle read">
                {r.read_at ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <a href={`mailto:${r.email}?subject=Re: your message`} className="p-2 hover:bg-secondary rounded-full" aria-label="reply">
                <Mail className="w-4 h-4" />
              </a>
              <button onClick={() => remove(r.id)} className="p-2 hover:bg-secondary rounded-full text-destructive" aria-label="delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm whitespace-pre-wrap text-foreground/90">{r.message}</p>
        </div>
      ))}
    </div>
  );
};

/* ---------------- BLOG CMS ---------------- */
const emptyPost: Partial<Post> = {
  slug: "", title: "", excerpt: "", content: "", category: "",
  tags: [], cover_url: "", read_time: "", featured: false, published: false,
};

const BlogTab = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Partial<Post> | null>(null);
  const [tagsInput, setTagsInput] = useState("");

  const load = async () => {
    const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (error) return toast.error(error.message);
    setPosts(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.title || !editing?.slug) return toast.error("Title and slug required");
    const payload: any = {
      slug: editing.slug, title: editing.title, excerpt: editing.excerpt ?? "",
      content: editing.content ?? "", category: editing.category ?? null,
      tags: tagsInput.split(",").map(t => t.trim()).filter(Boolean),
      cover_url: editing.cover_url ?? null, read_time: editing.read_time ?? null,
      featured: !!editing.featured, published: !!editing.published,
      published_at: editing.published ? (editing.published_at ?? new Date().toISOString()) : null,
    };
    const { error } = editing.id
      ? await supabase.from("blog_posts").update(payload).eq("id", editing.id)
      : await supabase.from("blog_posts").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    load();
  };

  const startEdit = (p?: Post) => {
    if (p) {
      setEditing(p);
      setTagsInput(p.tags.join(", "));
    } else {
      setEditing({ ...emptyPost });
      setTagsInput("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display text-2xl font-bold">{posts.length} posts</h2>
        <Button onClick={() => startEdit()} className="rounded-full gap-2"><Plus className="w-4 h-4" /> New post</Button>
      </div>

      {posts.length === 0 && <div className="glass-strong rounded-3xl p-10 text-center text-muted-foreground">No posts yet - write your first one.</div>}

      {posts.map(p => (
        <div key={p.id} className="glass-strong rounded-3xl p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Badge variant={p.published ? "default" : "secondary"} className="text-[10px]">{p.published ? "PUBLISHED" : "DRAFT"}</Badge>
              {p.featured && <Badge className="text-[10px] bg-gold text-background">FEATURED</Badge>}
              {p.category && <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{p.category}</span>}
            </div>
            <h3 className="font-display text-lg font-bold truncate">{p.title}</h3>
            <p className="text-xs text-muted-foreground font-mono mt-1">/{p.slug}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full gap-1.5" onClick={() => startEdit(p)}><Edit className="w-3 h-3" /> Edit</Button>
            <Button variant="ghost" size="sm" className="rounded-full text-destructive" onClick={() => remove(p.id)}><Trash2 className="w-4 h-4" /></Button>
          </div>
        </div>
      ))}

      {editing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm overflow-y-auto p-4 md:p-10">
          <div className="glass-strong rounded-3xl p-8 max-w-3xl mx-auto relative">
            <button onClick={() => setEditing(null)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-secondary" aria-label="close">
              <X className="w-5 h-5" />
            </button>
            <h2 className="font-display text-2xl font-bold mb-6">{editing.id ? "Edit post" : "New post"}</h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Title</Label>
                  <Input value={editing.title ?? ""} onChange={e => setEditing({ ...editing, title: e.target.value })} className="h-11 rounded-2xl bg-card/60" />
                </div>
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Slug</Label>
                  <Input value={editing.slug ?? ""} onChange={e => setEditing({ ...editing, slug: e.target.value })} placeholder="my-post" className="h-11 rounded-2xl bg-card/60" />
                </div>
              </div>
              <div>
                <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Excerpt</Label>
                <Textarea value={editing.excerpt ?? ""} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} rows={2} className="rounded-2xl bg-card/60" />
              </div>
              <div>
                <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Content (markdown / plain)</Label>
                <Textarea value={editing.content ?? ""} onChange={e => setEditing({ ...editing, content: e.target.value })} rows={12} className="rounded-2xl bg-card/60 font-mono text-sm" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Category</Label>
                  <Input value={editing.category ?? ""} onChange={e => setEditing({ ...editing, category: e.target.value })} className="h-11 rounded-2xl bg-card/60" />
                </div>
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Read time</Label>
                  <Input value={editing.read_time ?? ""} onChange={e => setEditing({ ...editing, read_time: e.target.value })} placeholder="6 min" className="h-11 rounded-2xl bg-card/60" />
                </div>
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Cover URL</Label>
                  <Input value={editing.cover_url ?? ""} onChange={e => setEditing({ ...editing, cover_url: e.target.value })} className="h-11 rounded-2xl bg-card/60" />
                </div>
              </div>
              <div>
                <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Tags (comma-separated)</Label>
                <Input value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="AI, Indie" className="h-11 rounded-2xl bg-card/60" />
              </div>
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={!!editing.published} onChange={e => setEditing({ ...editing, published: e.target.checked })} className="w-4 h-4 accent-primary" />
                  Published
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={!!editing.featured} onChange={e => setEditing({ ...editing, featured: e.target.checked })} className="w-4 h-4 accent-primary" />
                  Featured
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={save} className="rounded-full flex-1">Save</Button>
                <Button onClick={() => setEditing(null)} variant="outline" className="rounded-full">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------- TESTIMONIALS ---------------- */
const emptyTestimonial: Partial<Testimonial> = {
  author: "", role: "", quote: "", link: "", photo_url: "", video_url: "", featured: true, display_order: 0,
};

const TestimonialsTab = () => {
  const [rows, setRows] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data, error } = await supabase.from("testimonials").select("*").order("display_order");
    if (error) return toast.error(error.message);
    setRows((data as Testimonial[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const uploadFile = async (file: File, field: "photo_url" | "video_url") => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("testimonial-media").upload(path, file);
    if (error) { setUploading(false); return toast.error(error.message); }
    const { data: urlData } = supabase.storage.from("testimonial-media").getPublicUrl(path);
    setEditing(prev => prev ? { ...prev, [field]: urlData.publicUrl } : prev);
    setUploading(false);
    toast.success("Uploaded");
  };

  const save = async () => {
    if (!editing?.author || !editing?.quote) return toast.error("Author and quote required");
    const payload = {
      author: editing.author,
      role: editing.role || null,
      quote: editing.quote,
      link: editing.link || null,
      photo_url: editing.photo_url || null,
      video_url: editing.video_url || null,
      featured: !!editing.featured,
      display_order: editing.display_order ?? 0,
    };
    const { error } = editing.id
      ? await supabase.from("testimonials").update(payload).eq("id", editing.id)
      : await supabase.from("testimonials").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display text-2xl font-bold">{rows.length} testimonials</h2>
        <Button onClick={() => setEditing({ ...emptyTestimonial, display_order: rows.length + 1 })} className="rounded-full gap-2">
          <Plus className="w-4 h-4" /> Add testimonial
        </Button>
      </div>

      {rows.length === 0 && <div className="glass-strong rounded-3xl p-10 text-center text-muted-foreground">No testimonials yet.</div>}

      {rows.map(t => (
        <div key={t.id} className="glass-strong rounded-3xl p-6 flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0 flex items-start gap-4">
            {t.photo_url && (
              <img src={t.photo_url} alt={t.author} className="w-12 h-12 rounded-full object-cover shrink-0" />
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-display text-lg font-bold">{t.author}</h3>
                {t.featured && <Star className="w-4 h-4 fill-gold text-gold" />}
                <span className="font-mono text-[10px] text-muted-foreground">#{t.display_order}</span>
              </div>
              {t.role && <p className="text-xs text-muted-foreground">{t.role}</p>}
              <p className="text-sm mt-2 line-clamp-2">"{t.quote}"</p>
              {t.link && <a href={t.link} target="_blank" rel="noreferrer" className="text-xs text-brand hover:underline mt-1 inline-flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Review link</a>}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" className="rounded-full gap-1.5" onClick={() => setEditing(t)}><Edit className="w-3 h-3" /> Edit</Button>
            <Button variant="ghost" size="sm" className="rounded-full text-destructive" onClick={() => remove(t.id)}><Trash2 className="w-4 h-4" /></Button>
          </div>
        </div>
      ))}

      {editing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm overflow-y-auto p-4 md:p-10">
          <div className="glass-strong rounded-3xl p-8 max-w-2xl mx-auto relative">
            <button onClick={() => setEditing(null)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-secondary" aria-label="close">
              <X className="w-5 h-5" />
            </button>
            <h2 className="font-display text-2xl font-bold mb-6">{editing.id ? "Edit testimonial" : "New testimonial"}</h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Author *</Label>
                  <Input value={editing.author ?? ""} onChange={e => setEditing({ ...editing, author: e.target.value })} className="h-11 rounded-2xl bg-card/60" />
                </div>
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Role / Company</Label>
                  <Input value={editing.role ?? ""} onChange={e => setEditing({ ...editing, role: e.target.value })} className="h-11 rounded-2xl bg-card/60" />
                </div>
              </div>
              <div>
                <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Quote *</Label>
                <Textarea value={editing.quote ?? ""} onChange={e => setEditing({ ...editing, quote: e.target.value })} rows={3} className="rounded-2xl bg-card/60" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Review Link (URL)</Label>
                  <Input value={editing.link ?? ""} onChange={e => setEditing({ ...editing, link: e.target.value })} placeholder="https://..." className="h-11 rounded-2xl bg-card/60" />
                </div>
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Order</Label>
                  <Input type="number" value={editing.display_order ?? 0} onChange={e => setEditing({ ...editing, display_order: Number(e.target.value) })} className="h-11 rounded-2xl bg-card/60" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Photo</Label>
                  {editing.photo_url && <img src={editing.photo_url} alt="preview" className="w-16 h-16 rounded-full object-cover mb-2" />}
                  <Input type="file" accept="image/*" onChange={e => e.target.files?.[0] && uploadFile(e.target.files[0], "photo_url")} className="h-11 rounded-2xl bg-card/60" disabled={uploading} />
                </div>
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Video</Label>
                  {editing.video_url && <a href={editing.video_url} target="_blank" rel="noreferrer" className="text-xs text-brand hover:underline mb-2 block">View video</a>}
                  <Input type="file" accept="video/*" onChange={e => e.target.files?.[0] && uploadFile(e.target.files[0], "video_url")} className="h-11 rounded-2xl bg-card/60" disabled={uploading} />
                </div>
              </div>
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={!!editing.featured} onChange={e => setEditing({ ...editing, featured: e.target.checked })} className="w-4 h-4 accent-primary" />
                  Featured
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={save} className="rounded-full flex-1" disabled={uploading}>Save</Button>
                <Button onClick={() => setEditing(null)} variant="outline" className="rounded-full">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------- COURSES ---------------- */
const emptyCourse: Partial<Course> = {
  title: "", slug: "", summary: "", level: "Beginner", category: "", external_link: "", price: "", bullets: [], active: true, display_order: 0,
};

const CoursesTab = () => {
  const [rows, setRows] = useState<Course[]>([]);
  const [editing, setEditing] = useState<Partial<Course> | null>(null);
  const [bulletsInput, setBulletsInput] = useState("");

  const load = async () => {
    // Admin can see all courses (active and inactive)
    const { data, error } = await supabase.from("courses").select("*").order("display_order");
    if (error) return toast.error(error.message);
    setRows((data as Course[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.title || !editing?.slug) return toast.error("Title and slug required");
    const payload = {
      title: editing.title,
      slug: editing.slug,
      summary: editing.summary || null,
      level: editing.level || null,
      category: editing.category || null,
      external_link: editing.external_link || null,
      price: editing.price || null,
      bullets: bulletsInput.split("\n").map(b => b.trim()).filter(Boolean),
      active: editing.active ?? true,
      display_order: editing.display_order ?? 0,
    };
    const { error } = editing.id
      ? await supabase.from("courses").update(payload).eq("id", editing.id)
      : await supabase.from("courses").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    await supabase.from("courses").delete().eq("id", id);
    load();
  };

  const startEdit = (c?: Course) => {
    if (c) {
      setEditing(c);
      setBulletsInput(c.bullets.join("\n"));
    } else {
      setEditing({ ...emptyCourse, display_order: rows.length + 1 });
      setBulletsInput("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display text-2xl font-bold">{rows.length} courses</h2>
        <Button onClick={() => startEdit()} className="rounded-full gap-2"><Plus className="w-4 h-4" /> Add course</Button>
      </div>

      {rows.length === 0 && <div className="glass-strong rounded-3xl p-10 text-center text-muted-foreground">No courses yet - add your first one.</div>}

      {rows.map(c => (
        <div key={c.id} className="glass-strong rounded-3xl p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Badge variant={c.active ? "default" : "secondary"} className="text-[10px]">{c.active ? "ACTIVE" : "HIDDEN"}</Badge>
              {c.category && <Badge variant="outline" className="text-[10px]">{c.category}</Badge>}
              {c.level && <span className="font-mono text-[10px] text-muted-foreground">{c.level}</span>}
            </div>
            <h3 className="font-display text-lg font-bold truncate">{c.title}</h3>
            <div className="flex items-center gap-3 mt-1">
              {c.price && <span className="text-xs text-gold font-mono">{c.price}</span>}
              {c.external_link && <a href={c.external_link} target="_blank" rel="noreferrer" className="text-xs text-brand hover:underline inline-flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Link</a>}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full gap-1.5" onClick={() => startEdit(c)}><Edit className="w-3 h-3" /> Edit</Button>
            <Button variant="ghost" size="sm" className="rounded-full text-destructive" onClick={() => remove(c.id)}><Trash2 className="w-4 h-4" /></Button>
          </div>
        </div>
      ))}

      {editing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm overflow-y-auto p-4 md:p-10">
          <div className="glass-strong rounded-3xl p-8 max-w-2xl mx-auto relative">
            <button onClick={() => setEditing(null)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-secondary" aria-label="close">
              <X className="w-5 h-5" />
            </button>
            <h2 className="font-display text-2xl font-bold mb-6">{editing.id ? "Edit course" : "New course"}</h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Title *</Label>
                  <Input value={editing.title ?? ""} onChange={e => setEditing({ ...editing, title: e.target.value })} className="h-11 rounded-2xl bg-card/60" />
                </div>
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Slug *</Label>
                  <Input value={editing.slug ?? ""} onChange={e => setEditing({ ...editing, slug: e.target.value })} placeholder="my-course" className="h-11 rounded-2xl bg-card/60" />
                </div>
              </div>
              <div>
                <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Summary</Label>
                <Textarea value={editing.summary ?? ""} onChange={e => setEditing({ ...editing, summary: e.target.value })} rows={2} className="rounded-2xl bg-card/60" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Category</Label>
                  <Input value={editing.category ?? ""} onChange={e => setEditing({ ...editing, category: e.target.value })} placeholder="e.g. BunkToBrains" className="h-11 rounded-2xl bg-card/60" />
                </div>
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Level</Label>
                  <Input value={editing.level ?? ""} onChange={e => setEditing({ ...editing, level: e.target.value })} placeholder="Beginner" className="h-11 rounded-2xl bg-card/60" />
                </div>
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Price</Label>
                  <Input value={editing.price ?? ""} onChange={e => setEditing({ ...editing, price: e.target.value })} placeholder="$29" className="h-11 rounded-2xl bg-card/60" />
                </div>
              </div>
              <div>
                <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">External Link</Label>
                <Input value={editing.external_link ?? ""} onChange={e => setEditing({ ...editing, external_link: e.target.value })} placeholder="https://bunktobrains.com/course/..." className="h-11 rounded-2xl bg-card/60" />
              </div>
              <div>
                <Label className="text-xs font-mono uppercase tracking-wider mb-2 block">Bullets (one per line)</Label>
                <Textarea value={bulletsInput} onChange={e => setBulletsInput(e.target.value)} rows={4} placeholder="6 weeks of content&#10;Build real projects&#10;Community access" className="rounded-2xl bg-card/60 font-mono text-sm" />
              </div>
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={editing.active ?? true} onChange={e => setEditing({ ...editing, active: e.target.checked })} className="w-4 h-4 accent-primary" />
                  Active (visible on site)
                </label>
                <div>
                  <Label className="text-xs font-mono uppercase tracking-wider mb-1 block">Order</Label>
                  <Input type="number" value={editing.display_order ?? 0} onChange={e => setEditing({ ...editing, display_order: Number(e.target.value) })} className="h-9 w-20 rounded-xl bg-card/60" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={save} className="rounded-full flex-1">Save</Button>
                <Button onClick={() => setEditing(null)} variant="outline" className="rounded-full">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
