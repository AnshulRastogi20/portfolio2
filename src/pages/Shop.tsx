import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { PRODUCTS } from "@/lib/data";

const Shop = () => {
  const [tab, setTab] = useState<"all" | "saas" | "service">("all");
  const filtered = tab === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.type === tab);

  return (
    <>
      <section className="container py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-gold mb-4">// What I've shipped</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[0.95] mb-6 max-w-4xl">
            Things I <br />
            <span className="text-gradient-gold">shipped.</span>
          </h1>
          {/* This used to promise "digital products, templates, and a few pieces
              of merch". None of those exist - the list underneath is the SaaS
              and the systems built at Up N Running, so that is what it says. */}
          <p className="text-lg text-muted-foreground max-w-2xl mb-10">
            One SaaS that is live, and the systems Up N Running built for clients between
            June 2025 and June 2026. There is no store here and nothing on this page is for
            sale - the agency is not taking new clients right now.
          </p>

          <div className="inline-flex glass rounded-full p-1.5 gap-1">
            {(["all", "saas", "service"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 h-10 rounded-full text-sm font-medium transition-colors capitalize ${tab === t ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link to={`/shop/${p.slug}`} className="group block">
                <div className="glass rounded-3xl overflow-hidden hover-lift hover:border-gold/50 transition-colors h-full flex flex-col">
                  <div className="aspect-square bg-gradient-mesh relative overflow-hidden">
                    <div className="absolute inset-0 grid-bg opacity-40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShoppingBag className="w-20 h-20 text-primary/30" />
                    </div>
                    <span className="absolute top-4 left-4 glass rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                      {p.type === "digital" ? "Digital" : "Merch"}
                    </span>
                    <span className="absolute top-4 right-4 glass rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-gold">Soon</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-display text-xl font-bold mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mb-5 flex-1">{p.desc}</p>
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-gold font-bold">{p.price}</span>
                      <span className="text-brand inline-flex items-center gap-1 group-hover:gap-2 transition-colors">
                        Notify me <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default Shop;
