import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/data";

/**
 * This page used to unsubscribe you itself, against a contacts table on this
 * site. That table is gone: Socioverse owns the list now, and the emails it
 * sends carry their own one-click unsubscribe in the headers, which is the one
 * that actually works and the one Gmail and Yahoo require.
 *
 * So this page no longer pretends to do it. A button that looks like it
 * unsubscribes you and quietly does nothing is worse than a page that tells you
 * where the real one is. It stays because it is linked from the workbook footer
 * and the privacy policy, and because somebody who has lost the email needs a
 * route that ends in a person.
 */
const Unsubscribe = () => {
  useEffect(() => {
    document.title = "Unsubscribe · Sight of Anshul";
  }, []);

  return (
    <section className="container py-24 max-w-xl">
      <Reveal>
        <div className="glass-strong rounded-[2rem] p-10">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Getting off the list.
          </h1>
          <p className="text-muted-foreground mb-4">
            Every email I send has an unsubscribe link at the bottom, and most mail
            clients also show an unsubscribe button at the top. Either one works on its
            own, immediately, without you logging in to anything.
          </p>
          <p className="text-muted-foreground mb-8">
            If you cannot find the email, or the link does not work, mail me at{" "}
            <a href={`mailto:${SITE.email}`} className="text-brand underline underline-offset-2">
              {SITE.email}
            </a>{" "}
            and I will take you off by hand. You should not have to fight a website to
            stop getting email from it.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Worth saying: the course is free on YouTube and the workbook link keeps
            working. None of that needed an email address anyway.
          </p>
          <Button asChild variant="outline" className="rounded-full glass">
            <Link to="/">Back to the site</Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
};

export default Unsubscribe;
