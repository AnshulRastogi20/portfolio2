import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Reveal } from "@/components/PageTransition";
import { SITE } from "@/lib/data";
import { MARKETING_CONSENT_WORDING } from "./Workbook";

/**
 * Required by the /workbook acceptance list, and it has to be true rather than
 * boilerplate - that page records an IP and a consent event before the visitor
 * has typed an email anywhere, and a privacy policy that does not mention that
 * is worse than none.
 *
 * Everything below describes what the code in supabase/functions/workbook-signup
 * and src/lib/analytics.ts actually does today. If either changes, this changes.
 */
const Privacy = () => {
  useEffect(() => {
    document.title = "Privacy · Sight of Anshul";
  }, []);

  const updated = "4 September 2026";

  return (
    <section className="container py-20 max-w-2xl">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-4">// Privacy</p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[0.95] mb-4">
          What I collect, <br />
          <span className="text-gradient">and why.</span>
        </h1>
        <p className="font-mono text-xs text-muted-foreground mb-12">Last updated · {updated}</p>
      </Reveal>

      <div className="space-y-10 text-muted-foreground leading-relaxed">
        <Section title="The short version">
          <p>
            I run this site myself. There is no ad network on it, nothing is sold to
            anyone, and the only reason I hold an email address is to send the thing that
            address was given to me for. If you want your record deleted, email me at{" "}
            <a href={`mailto:${SITE.email}`} className="text-brand underline underline-offset-2">
              {SITE.email}
            </a>{" "}
            and I will do it.
          </p>
        </Section>

        <Section title="When you ask for the workbook">
          <p className="mb-4">
            There are two steps at{" "}
            <Link to="/workbook" className="text-brand underline underline-offset-2">/workbook</Link>,
            and they store different things.
          </p>
          <p className="mb-3">
            <strong className="text-foreground">Step one, the consent box.</strong> When you press
            Continue, before you have typed an email anywhere, I record:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Whether you ticked the marketing box, and the exact wording that was on screen next to it.</li>
            <li>The time, in UTC.</li>
            <li>Your IP address and browser user-agent, as seen by the server.</li>
            <li>Where you came from - the referring page and any utm tags, so I can tell which video sent you.</li>
            <li>A random one-time reference, so this can be matched to the download you then request.</li>
          </ul>
          <p className="mt-3 mb-3">
            No email address, because at that point I do not have one. The IP, the time and
            the wording exist together for one reason: they are the record of what you
            actually agreed to. If you ever ask me to prove I had permission to email you,
            that record is the answer, and it is not used for anything else.
          </p>
          <p>
            <strong className="text-foreground">Step two, the download.</strong> The checkout
            that appears is Socioverse, which is a product I built and run myself. It takes
            your email so it can send you the workbook, and that is where your address is
            stored. It is not passed to anyone else.
          </p>
        </Section>

        <Section title="The two things are separate">
          <p className="mb-4">
            Sending you the workbook is the thing you asked for, so there is no checkbox
            for it. Marketing email is a different question, and it is its own unticked
            box that reads:
          </p>
          <blockquote className="border-l-2 border-primary/60 pl-4 italic text-foreground/90">
            {MARKETING_CONSENT_WORDING}
          </blockquote>
          <p className="mt-4">
            If you leave it unticked you get one email - the one with the workbook link -
            and nothing after it, ever. Ticking it is never a condition of getting the
            workbook.
          </p>
        </Section>

        <Section title="Unsubscribing">
          <p>
            Every marketing email carries an unsubscribe link at the bottom, and most mail
            clients show an unsubscribe button at the top as well. Either works on its own,
            immediately, without logging in to anything. There is also an{" "}
            <Link to="/unsubscribe" className="text-brand underline underline-offset-2">
              unsubscribe page
            </Link>{" "}
            if you have lost the email. Unsubscribing stops the list; it does not delete the
            consent record, because a record that disappears when withdrawn is not much of a
            record. Ask me and I will delete that too.
          </p>
        </Section>

        <Section title="Analytics">
          <p>
            I count page views, form views and submissions on the workbook page so I can
            tell whether the page works. Those counts carry a random id kept in your
            browser tab for the length of the visit, plus the path, the referrer and any
            utm tags. The id is discarded when you close the tab, is never joined to your
            email, and there is no cross-site tracking on this site.
          </p>
        </Section>

        <Section title="When you use the contact form">
          <p>
            Your name, email and message are stored so I can reply. That is all they are
            used for.
          </p>
        </Section>

        <Section title="Where it lives">
          <p>
            The site is hosted on Vercel. The consent records sit in Supabase and your
            email address sits in Socioverse - all three under my own account, and
            Socioverse is a product I built. Nobody else has access to any of it, and none
            of it is sold, rented or shared.
          </p>
        </Section>

        <Section title="Asking for your data back, or gone">
          <p>
            Email{" "}
            <a href={`mailto:${SITE.email}`} className="text-brand underline underline-offset-2">
              {SITE.email}
            </a>{" "}
            and say what you want - a copy of what I hold, a correction, or deletion. I
            will do it and confirm when it is done.
          </p>
        </Section>
      </div>
    </section>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Reveal>
    <div>
      <h2 className="font-display text-2xl font-semibold text-foreground mb-3">{title}</h2>
      {children}
    </div>
  </Reveal>
);

export default Privacy;
