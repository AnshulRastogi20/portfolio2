import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Youtube, Mail, ArrowUpRight } from "lucide-react";
import { SignupForm } from "./SignupForm";

const cols: { title: string; links: [string, string][] }[] = [
  { title: "Site", links: [["/", "Home"], ["/about", "About"], ["/skills", "Work"], ["/achievements", "Awards"]] },
  { title: "Audience", links: [["/blog", "Blog"], ["/newsletter", "Newsletter"], ["/now", "Now"], ["/resume", "Resume"]] },
  { title: "Offers", links: [["/services", "Services"], ["/courses", "Courses"], ["/careers", "Careers"], ["/coaching", "Coaching"]] },
  { title: "Ventures", links: [["https://www.upnrunning.in", "Up N Running"], ["https://www.socioverse.io", "Socioverse"], ["https://www.bunktobrains.com", "BunkToBrains"], ["/contact", "Contact"]] },
];

const socials = [
  { Icon: Twitter, href: "https://x.com/AnshulR20" },
  { Icon: Github, href: "https://github.com/AnshulRastogi20" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/anshulrastogi20" },
  { Icon: Youtube, href: "https://youtube.com/@sightofanshul" },
  { Icon: Mail, href: "/contact" },
];

export const Footer = () => {
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
            <div className="max-w-md">
              <SignupForm context="footer" ctaLabel="Join" />
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">{c.title}</h4>
                <ul className="space-y-2.5">
                  {c.links.map(([href, label]) => {
                    const external = /^https?:\/\//.test(href);
                    const className = "group inline-flex items-center gap-1 text-sm hover:text-primary transition-colors";
                    const inner = (
                      <>
                        {label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                      </>
                    );
                    return (
                      <li key={label}>
                        {external ? (
                          <a href={href} className={className}>{inner}</a>
                        ) : (
                          <Link to={href} className={className}>{inner}</Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-border/50">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-mono text-xs">© {new Date().getFullYear()} ANSHUL.</span>
            <span className="opacity-50">·</span>
            <span>Crafted with intention.</span>
          </div>
          <div className="flex gap-2">
            {socials.map((s, i) => {
              const isExternal = /^https?:\/\//.test(s.href);
              return isExternal ? (
                <a
                  key={i}
                  href={s.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover-lift"
                  aria-label={`Social link ${i}`}
                >
                  <s.Icon className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  key={i}
                  to={s.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover-lift"
                  aria-label={`Social link ${i}`}
                >
                  <s.Icon className="w-4 h-4" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
