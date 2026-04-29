import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { ArrowRight, Sparkles } from "lucide-react";

interface Props {
  variant?: "default" | "compact" | "hero";
  context?: string; // e.g. "course:ai-builder", "product:ebook", "newsletter"
  ctaLabel?: string;
}

export const SignupForm = ({ variant = "default", context = "newsletter", ctaLabel }: Props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Please enter a valid email");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast.success(
      context === "newsletter" ? "Welcome! Check your inbox." : "You're on the waitlist. We'll be in touch.",
      { description: context !== "newsletter" ? `Saved to: ${context}` : undefined }
    );
    setEmail("");
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
          {ctaLabel || "Subscribe"}
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
        {ctaLabel || "Join"} <ArrowRight className="w-4 h-4" />
      </Button>
    </form>
  );
};
