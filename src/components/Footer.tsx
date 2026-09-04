import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin, Twitter, Youtube, Mail, ArrowUpRight } from "lucide-react";
import { SignupForm } from "./SignupForm";
import { Wordmark } from "./Brand";
import { SITE } from "@/lib/data";

const cols: { title: string; links: [string, string][] }[] = [
  { title: "The course", links: [["/workbook", "Free workbook"], [SITE.socials.youtube, "The lectures"], ["/coaching", "One to one"], ["/newsletter", "Newsletter"]] },
  { title: "Site", links: [["/", "Home"], ["/about", "About"], ["/skills", "Work"], ["/blog", "Blog"]] },
  { title: "More", links: [["/achievements", "Awards"], ["/reviews", "Reviews"], ["/now", "Now"], ["/resume", "Resume"]] },
  { title: "Built", links: [[SITE.socials.socioverse, "Socioverse"], [SITE.socials.upnrunning, "Up N Running"], ["/services", "The systems"], ["/contact", "Contact"]] },
];

const socials = [
  { Icon: Youtube, href: SITE.socials.youtube, label: "YouTube" },
  { Icon: Instagram, href: SITE.socials.instagram, label: "Instagram" },
  { Icon: Twitter, href: SITE.socials.twitter, label: "X" },
  { Icon: Github, href: SITE.socials.github, label: "GitHub" },
  { Icon: Linkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
  { Icon: Mail, href: "/contact", label: "Email" },
];

export const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-border/50">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
      <div className="container py-20 relative">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <div className="mb-6">
              <Wordmark className="max-w-[200px]" />
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-semibold leading-[0.95] mb-4">
              One email a week. <br />
              <span className="text-gradient">Fridays.</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              What I'm building and what broke. It's a new list, so you would be early.
              Unsubscribe in one click, any time.
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
                    const className = "group inline-flex items-center gap-1 text-sm hover:text-brand transition-colors";
                    const inner = (
                      <>
                        {label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-colors" />
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
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="font-mono text-xs">© {new Date().getFullYear()} {SITE.fullName}</span>
            <span className="opacity-50">·</span>
            <Link to="/privacy" className="text-sm hover:text-brand transition-colors">Privacy</Link>
            <span className="opacity-50">·</span>
            <Link to="/unsubscribe" className="text-sm hover:text-brand transition-colors">Unsubscribe</Link>
          </div>
          <div className="flex gap-2">
            {socials.map((s, i) => {
              const isExternal = /^https?:\/\//.test(s.href);
              return isExternal ? (
                <a
                  key={i}
                  href={s.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hover-lift"
                  aria-label={s.label}
                >
                  <s.Icon className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  key={i}
                  to={s.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hover-lift"
                  aria-label={s.label}
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
