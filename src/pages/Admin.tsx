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
import { Download, Trash2, Mail, Edit, Plus, X, LogOut, Eye, EyeOff } from "lucide-react";
import { Reveal } from "@/components/PageTransition";

type Subscriber = { id: string; email: string; source: string; created_at: string };
type Waitlist = { id: string; email: string; kind: string; slug: string | null; created_at: string };
type Contact = { id: string; name: string; email: string; topic: string | null; message: string; read_at: string | null; created_at: string };
type Post = {
  id: string; slug: string; title: string; excerpt: string | null; content: string;
  category: string | null; tags: string[]; cover_url: string | null; read_time: string | null;
  featured: boolean; published: boolean; published_at: string | null; updated_at: string; created_at: string;
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
            <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">// Dashboard</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">Mission control.</h1>
            <p className="text-muted-foreground mt-2 text-sm font-mono">{user.email}</p>
          </div>
          <Button variant="outline" className="rounded-full gap-2" onClick={signOut}>
            <LogOut className="w-4 h-4" /> Sign out
          </Button>
        </div>
      </Reveal>

      <Tabs defaultValue="subscribers" className="w-full">
        <TabsList className="rounded-full p-1 mb-8">
          <TabsTrigger value="subscribers" className="rounded-full">Subscribers</TabsTrigger>
          <TabsTrigger value="waitlist" className="rounded-full">Waitlists</TabsTrigger>
          <TabsTrigger value="contact" className="rounded-full">Contact</TabsTrigger>
          <TabsTrigger value="blog" className="rounded-full">Blog</TabsTrigger>
        </TabsList>

        <TabsContent value="subscribers"><SubscribersTab /></TabsContent>
        <TabsContent value="waitlist"><WaitlistTab /></TabsContent>
        <TabsContent value="contact"><ContactTab /></TabsContent>
        <TabsContent value="blog"><BlogTab /></TabsContent>
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
    const key = `${r.kind}:${r.slug ?? "—"}`;
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
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display text-lg font-bold">{r.name}</h3>
                {!r.read_at && <Badge className="text-[10px]">NEW</Badge>}
                {r.topic && <Badge variant="secondary" className="text-[10px]">{r.topic}</Badge>}
              </div>
              <a href={`mailto:${r.email}`} className="text-sm text-primary font-mono">{r.email}</a>
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

      {posts.length === 0 && <div className="glass-strong rounded-3xl p-10 text-center text-muted-foreground">No posts yet — write your first one.</div>}

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

export default Admin;
