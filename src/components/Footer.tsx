import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Youtube, Mail, ArrowUpRight } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Enter a valid email");
    toast.success("You're on the list. Welcome aboard!");
    setEmail("");
  };

  return (
    <footer className="relative mt-32 border-t border-border/50">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
      <div className="container py-20 relative">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <h3 className="font-display text-4xl md:text-5xl font-bold leading-[0.95] mb-4">
              Build with me. <br />
              <span className="text-gradient">Get the newsletter.</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Weekly notes on AI, building products, and the messy reality of shipping. No fluff.
            </p>
            <form onSubmit={submit} className="flex gap-2 max-w-md">
              <Input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full bg-card/60 border-border/60 h-12 px-5"
              />
              <Button type="submit" className="rounded-full h-12 px-6">Join</Button>
            </form>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <FooterCol title="Site" links={[["/", "Home"], ["/about", "About"], ["/skills", "Work"], ["/achievements", "Awards"]]} />
            <FooterCol title="Audience" links={[["/blog", "Blog"], ["/newsletter", "Newsletter"], ["/now", "Now"], ["/uses", "Uses"]]} />
            <FooterCol title="Offers" links={[["/courses", "Courses"], ["/shop", "Shop"], ["/coaching", "Coaching"], ["/contact", "Contact"]]} />
            <FooterCol title="Connect" links={[["#", "Twitter / X"], ["#", "GitHub"], ["#", "LinkedIn"], ["#", "YouTube"]]} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-border/50">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-mono text-xs">© {new Date().getFullYear()} ANSHUL.</span>
            <span className="opacity-50">·</span>
            <span>Crafted with intention.</span>
          </div>
          <div className="flex gap-2">
            {[
              { icon: Twitter, href: "#" },
              { icon: Github, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Youtube, href: "#" },
              { icon: Mail, href: "/contact" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover-lift"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({ title, links }: { title: string; links: [string, string][] }) => (
  <div>
    <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">{title}</h4>
    <ul className="space-y-2.5">
      {links.map(([href, label]) => (
        <li key={label}>
          <Link to={href} className="group inline-flex items-center gap-1 text-sm hover:text-primary transition-colors">
            {label}
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
