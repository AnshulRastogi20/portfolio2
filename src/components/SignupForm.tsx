import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { ArrowRight, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

/**
 * The newsletter box, wherever it appears outside /workbook.
 *
 * It posts to the same `workbook-signup` edge function /workbook uses, for the
 * reason handoff 05 gives: capture and send have to be one system. The contact
 * itself ends up in Socioverse `leads`, which is the single list - this site
 * keeps only the consent evidence, never a second copy of the contacts.
 *
 * Typing an address into a box labelled "get the newsletter" and pressing the
 * button IS the opt-in, so `marketingConsent` is true here - but the wording
 * that made it an opt-in still gets recorded verbatim alongside it, the same as
 * the checkbox on the workbook page. A consent record without the sentence the
 * person actually read is not a record of anything.
 *
 * The waitlist path (course and product pages) is unchanged: that is a "tell me
 * when this exists" signal, not a marketing list, and it stays in its own table.
 */

interface Props {
  variant?: "default" | "compact" | "hero";
  /** "newsletter" / "footer" → the marketing list. Anything else → waitlist_entries, with kind:slug parsed from "kind:slug". */
  context?: string;
  ctaLabel?: string;
}

const emailSchema = z.string().trim().email().max(255);

export const NEWSLETTER_CONSENT_WORDING =
  "Email me weekly about what Anshul is building - AI systems, what worked, what broke. Unsubscribe any time.";

export const SignupForm = ({ variant = "default", context = "newsletter", ctaLabel }: Props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) return toast.error("That does not look like an email address.");

    setLoading(true);
    try {
      if (context === "newsletter" || context === "footer") {
        const { data, error } = await supabase.functions.invoke("workbook-signup", {
          body: {
            email: parsed.data,
            marketingConsent: true,
            consentWording: NEWSLETTER_CONSENT_WORDING,
            consentVersion: "v1",
            source: context,
            referrer: document.referrer || null,
          },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        toast.success("You're on the list.", {
          description: "One email a week, Fridays. Unsubscribe whenever you like.",
        });
      } else {
        const [kind, slug] = context.includes(":") ? context.split(":") : ["general", context];
        const validKind = ["course", "product", "general"].includes(kind) ? kind : "general";
        const { error } = await supabase
          .from("waitlist_entries")
          .insert({ email: parsed.data, kind: validKind, slug: slug ?? null });
        if (error && error.code !== "23505") throw error;
        toast.success("You're on the waitlist.", {
          description: "I'll email you when it's live.",
        });
      }
      setEmail("");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Try again?");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "hero") {
    return (
      <form onSubmit={submit} className="glass-strong rounded-3xl p-2 flex gap-2 shadow-elegant max-w-md mx-auto">
        <Input
          type="email"
          placeholder="you@work.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-0 bg-transparent h-12 px-4 text-base focus-visible:ring-0"
        />
        <Button type="submit" disabled={loading} className="rounded-2xl h-12 px-5 gap-2">
          <Mail className="w-4 h-4" />
          {loading ? "..." : ctaLabel || "Subscribe"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="flex gap-2 w-full">
      <Input
        type="email"
        placeholder="you@work.com"
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
