import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { ArrowRight, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

interface Props {
  variant?: "default" | "compact" | "hero";
  /** "newsletter" → subscribers table. Anything else → waitlist_entries with kind:slug parsed from "kind:slug" */
  context?: string;
  ctaLabel?: string;
}

const emailSchema = z.string().trim().email().max(255);

export const SignupForm = ({ variant = "default", context = "newsletter", ctaLabel }: Props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) return toast.error("Please enter a valid email");

    setLoading(true);
    try {
      if (context === "newsletter" || context === "footer") {
        const { error } = await supabase
          .from("subscribers")
          .insert({ email: parsed.data, source: context });
        if (error) {
          if (error.code === "23505") {
            toast.success("You're already subscribed — thanks!");
          } else {
            throw error;
          }
        } else {
          toast.success("Welcome! You're on the list.", {
            description: "Check your inbox soon for the lead magnet.",
          });
        }
      } else {
        const [kind, slug] = context.includes(":") ? context.split(":") : ["general", context];
        const validKind = ["course", "product", "general"].includes(kind) ? kind : "general";
        const { error } = await supabase
          .from("waitlist_entries")
          .insert({ email: parsed.data, kind: validKind, slug: slug ?? null });
        if (error && error.code !== "23505") throw error;
        toast.success("You're on the waitlist!", {
          description: "I'll email you the moment it's live.",
        });
      }
      setEmail("");
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "hero") {
    return (
      <form onSubmit={submit} className="glass-strong rounded-3xl p-2 flex gap-2 shadow-elegant max-w-md mx-auto">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-0 bg-transparent h-12 px-4 text-base focus-visible:ring-0"
        />
        <Button type="submit" disabled={loading} className="rounded-2xl h-12 px-5 gap-2">
          <Sparkles className="w-4 h-4" />
          {loading ? "..." : ctaLabel || "Subscribe"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="flex gap-2 w-full">
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-full bg-card/60 h-11"
      />
      <Button type="submit" disabled={loading} className="rounded-full h-11 px-5 gap-2 shrink-0">
        {loading ? "..." : ctaLabel || "Join"} <ArrowRight className="w-4 h-4" />
      </Button>
    </form>
  );
};
