import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Reveal } from "@/components/PageTransition";
import { SignupForm } from "@/components/SignupForm";
import { PRODUCTS } from "@/lib/data";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return <section className="container py-32 text-center"><h1 className="font-display text-4xl">Not found</h1></section>;

  return (
    <section className="container py-16">
      <Reveal>
        <Link to="/shop" className="font-mono text-xs inline-flex items-center gap-2 mb-10 hover:text-primary transition">
          <ArrowLeft className="w-3 h-3" /> Back to shop
        </Link>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-square rounded-3xl bg-gradient-mesh relative overflow-hidden glass-strong">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShoppingBag className="w-32 h-32 text-primary/30" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-wider text-gold mb-3">{product.type === "digital" ? "Digital Product" : "Merch"}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-5">{product.title}</h1>
            <p className="text-lg text-muted-foreground mb-8">{product.desc}</p>
            <div className="font-display text-5xl font-bold text-gradient-gold mb-8">{product.price}</div>

            <div className="glass-strong rounded-3xl p-6">
              <div className="font-mono text-xs uppercase tracking-wider text-gold mb-3">Coming soon · Get notified</div>
              <SignupForm context={`product:${product.slug}`} ctaLabel="Notify me" />
              <p className="font-mono text-xs text-muted-foreground mt-3">Be first in line when it drops.</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default ProductDetail;
