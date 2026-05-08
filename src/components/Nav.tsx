import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";

const mainLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Work" },
  { to: "/achievements", label: "Awards" },
  { to: "/reviews", label: "Reviews" },
  { to: "/blog", label: "Blog" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

const moreLinks = [
  { to: "/courses", label: "Courses" },
  { to: "/careers", label: "Careers" },
  { to: "/newsletter", label: "Newsletter" },
  { to: "/coaching", label: "Coaching" },
  { to: "/resume", label: "Resume" },
  { to: "/now", label: "Now" },
];

const allLinks = [...mainLinks, ...moreLinks];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const loc = useLocation();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setMoreOpen(false); }, [loc.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
      >
        <div className="container">
          <div className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all ${scrolled ? "glass-strong shadow-elegant" : "glass"}`}>
            <Link to="/" className="font-display text-xl font-bold tracking-tight">
              <span className="text-gradient">Anshul</span>
              <span className="text-foreground/70">.</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {mainLinks.map((l) => {
                const active = loc.pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${active ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </Link>
                );
              })}

              {/* More dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors flex items-center gap-1 ${moreLinks.some(l => loc.pathname === l.to) ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}
                >
                  More <ChevronDown className={`w-3 h-3 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-44 glass-strong rounded-2xl p-2 shadow-elegant"
                    >
                      {moreLinks.map((l) => {
                        const active = loc.pathname === l.to;
                        return (
                          <Link
                            key={l.to}
                            to={l.to}
                            className={`block px-4 py-2.5 text-sm rounded-xl transition-colors ${active ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"}`}
                          >
                            {l.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Button asChild size="sm" className="hidden sm:inline-flex rounded-full">
                <Link to="/contact">Let's talk</Link>
              </Button>
              <button
                onClick={() => setOpen(!open)}
                aria-label="Menu"
                className="lg:hidden p-2 rounded-full hover:bg-secondary"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-background/95 backdrop-blur-xl pt-24"
          >
            <nav className="container flex flex-col gap-1">
              {allLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={l.to}
                    className="block py-4 font-display text-3xl font-bold border-b border-border/50 hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
