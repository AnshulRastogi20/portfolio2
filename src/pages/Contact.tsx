import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, MapPin, Clock, Send, Calendar } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { SITE } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  topic: z.string(),
  message: z.string().trim().min(10, "Tell me a bit more").max(2000),
});

const Contact = () => {
  const [params] = useSearchParams();
  const preset = params.get("service") || "";
  const [form, setForm] = useState({ name: "", email: "", topic: preset || "General", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      return toast.error(parsed.error.issues[0].message);
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        topic: parsed.data.topic,
        message: parsed.data.message,
      });
      if (error) throw error;
      setSent(true);
      toast.success("Message sent! I'll reply within 48 hours.");
      setForm({ name: "", email: "", topic: "General", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-20">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">// Get in touch</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
              Let's <span className="text-gradient">talk.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              Got a project, question, or just want to say hi? Drop a note, or skip the form and book a 30-min strategy call directly.
            </p>

            <a
              href={SITE.calendly}
              className="group flex items-center gap-4 glass-strong rounded-2xl p-5 mb-6 hover:border-primary/40 transition-colors hover-lift"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-display text-lg font-bold">Book a free strategy call</div>
                <div className="font-mono text-xs text-muted-foreground">30 min · Up N Running founder</div>
              </div>
              <span className="font-mono text-xs text-primary group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <div className="space-y-5">
              <InfoRow icon={Mail} label="Email" value={SITE.email} />
              <InfoRow icon={MapPin} label="Based in" value={SITE.location} />
              <InfoRow icon={Clock} label="Response time" value="Within 48 hours" />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <form onSubmit={submit} className="glass-strong rounded-3xl p-8 md:p-10 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label className="font-mono text-xs uppercase tracking-wider mb-2 block">Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="h-12 rounded-2xl bg-card/60"
                  />
                </div>
                <div>
                  <Label className="font-mono text-xs uppercase tracking-wider mb-2 block">Email</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    className="h-12 rounded-2xl bg-card/60"
                  />
                </div>
              </div>
              <div>
                <Label className="font-mono text-xs uppercase tracking-wider mb-2 block">What's this about?</Label>
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="w-full h-12 rounded-2xl bg-card/60 border border-input px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {["General", "Project / Hire", "Coaching / Services", "Speaking", "Press"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="font-mono text-xs uppercase tracking-wider mb-2 block">Message</Label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project, idea, or question..."
                  rows={6}
                  className="rounded-2xl bg-card/60 resize-none"
                />
              </div>
              <Button type="submit" disabled={loading || sent} size="lg" className="w-full rounded-full h-12 gap-2">
                {sent ? "✓ Sent. I'll reply soon" : loading ? "Sending..." : <>Send message <Send className="w-4 h-4" /></>}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-center gap-4 glass rounded-2xl p-4">
    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-primary" />
    </div>
    <div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  </div>
);

export default Contact;
