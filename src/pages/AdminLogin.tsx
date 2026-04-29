import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Reveal } from "@/components/PageTransition";

const schema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(8, "Min 8 characters").max(72),
});

const AdminLogin = () => {
  const { user, loading, isAdmin, refreshRoles } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  if (loading) {
    return <div className="container py-32 text-center text-muted-foreground">Loading...</div>;
  }

  if (user && isAdmin) return <Navigate to="/admin" replace />;

  // User is signed in but not admin: offer to claim admin if no admins exist
  if (user && !isAdmin) {
    return (
      <section className="container max-w-md py-32">
        <div className="glass-strong rounded-3xl p-10 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Almost there</h1>
          <p className="text-muted-foreground mb-6">
            You're signed in as <span className="font-mono text-sm">{user.email}</span> but you're not an admin yet.
          </p>
          <Button
            className="rounded-full w-full mb-3"
            onClick={async () => {
              setBusy(true);
              const { error } = await supabase
                .from("user_roles")
                .insert({ user_id: user.id, role: "admin" });
              setBusy(false);
              if (error) {
                toast.error("An admin already exists. Ask them to grant you access.");
              } else {
                toast.success("You're now an admin.");
                await refreshRoles();
                nav("/admin");
              }
            }}
            disabled={busy}
          >
            Claim admin (first user only)
          </Button>
          <Button
            variant="ghost"
            className="rounded-full w-full"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.reload();
            }}
          >
            Sign out
          </Button>
        </div>
      </section>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);

    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Signed in.");
    } else {
      const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: { emailRedirectTo: `${window.location.origin}/admin/login` },
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Account created — check your email if confirmation is required.");
    }
  };

  return (
    <section className="container max-w-md py-24">
      <Reveal>
        <div className="glass-strong rounded-3xl p-10">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// Admin</p>
          <h1 className="font-display text-4xl font-bold mb-2">
            {mode === "signin" ? "Welcome back" : "Create admin"}
          </h1>
          <p className="text-muted-foreground mb-8 text-sm">
            {mode === "signin"
              ? "Sign in to manage subscribers, posts, and messages."
              : "First time? Create an account, then claim admin access."}
          </p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label className="font-mono text-xs uppercase tracking-wider mb-2 block">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-2xl bg-card/60"
                autoComplete="email"
              />
            </div>
            <div>
              <Label className="font-mono text-xs uppercase tracking-wider mb-2 block">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-2xl bg-card/60"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
            </div>
            <Button type="submit" disabled={busy} className="w-full rounded-full h-12">
              {busy ? "..." : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {mode === "signin" ? "Need an account? Create one" : "Have an account? Sign in"}
          </button>
        </div>
      </Reveal>
    </section>
  );
};

export default AdminLogin;
