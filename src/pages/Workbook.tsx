import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Download, ExternalLink, Loader2, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeMark, Wordmark } from "@/components/Brand";
import { supabase } from "@/integrations/supabase/client";
import { track, utmParams } from "@/lib/analytics";
import { COURSE, WORKBOOK, SITE } from "@/lib/data";

/**
 * sightofanshul.com/workbook - the one lead capture in the entire release plan.
 * Spec: Socials/ai-sight-free-release/02-website-endpoint.md
 *
 * ONE JOB: email in, workbook out. The link in 15 video descriptions points
 * here, so nothing on this page competes with that. No nav above the fold, no
 * portfolio pieces, no project grid - the "who made this" block is below, for
 * the people who scroll, and the people who came for the PDF never have to.
 *
 * THIS PAGE HAS NO FORM OF ITS OWN, DELIBERATELY. Capture and delivery both
 * live in Socioverse Planets: the workbook is a zero-price DOWNLOAD product
 * there, its checkout collects the billing email, and that email IS the lead.
 * A form here would mean a second contact database and a sync to own forever,
 * which is the thing handoff 05 says not to build. It would also make somebody
 * type their address twice, and the two copies could differ - consent recorded
 * against one address, the PDF sent to another.
 *
 * So the page does exactly one thing before handing over: it takes consent.
 *
 *  1. Sending the workbook IS the transaction. They asked, we send. There is no
 *     checkbox for it and there must never be one - Continue is enabled from
 *     the moment the page loads.
 *  2. Marketing email is separate, optional and UNTICKED. If the workbook were
 *     conditional on it the consent would not be freely given, which is shaky
 *     under GDPR, and it would cost the signups from people who only want
 *     the PDF.
 *
 * The consent event is recorded before the email exists, so it carries a
 * `consentToken` instead. That token goes to Planets with the checkout, and the
 * order it produces is matched back to this consent afterwards. See
 * `workbook_unreconciled_consent` for the queue that proves it is working.
 */

export const MARKETING_CONSENT_WORDING =
  "Also email me about what I'm building - AI systems, what worked, what broke. One email a week at most. Unsubscribe any time.";
const CONSENT_VERSION = "v2-planets";

const Workbook = () => {
  const [marketing, setMarketing] = useState(false); // UNTICKED. Leave it that way.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consentToken, setConsentToken] = useState<string | null>(null);
  const consentRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "The AI Sight workbook - free";
    track("page_view");
  }, []);

  // form_view is counted separately from page_view on purpose: the gap between
  // them is people who landed and never scrolled far enough to see the ask,
  // which is a different problem from people who saw it and did not continue.
  useEffect(() => {
    const node = consentRef.current;
    if (!node) return;
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!fired && entries.some((e) => e.isIntersecting)) {
          fired = true;
          track("form_view");
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Scroll the checkout into view once it exists, so on a phone the Continue
  // click visibly does something rather than changing a screenful below the fold.
  useEffect(() => {
    if (!consentToken) return;
    // Guarded rather than called straight: some embedded webviews do not
    // implement scrollIntoView, and a throw in this effect would take the
    // checkout panel down with it. A missed scroll is survivable, a blank
    // checkout on this page is not.
    const node = checkoutRef.current;
    if (typeof node?.scrollIntoView === "function") {
      node.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [consentToken]);

  const handoff = async () => {
    setError(null);
    setLoading(true);
    const token = crypto.randomUUID();

    try {
      // Recorded server-side so the IP and the timestamp are observed rather
      // than reported. A failure here must not block delivery: somebody who
      // came for a free PDF should not be stopped by our bookkeeping, so the
      // catch below still hands them to the checkout.
      const { error: fnError } = await supabase.functions.invoke("workbook-signup", {
        body: {
          consentToken: token,
          marketingConsent: marketing,
          consentWording: MARKETING_CONSENT_WORDING,
          consentVersion: CONSENT_VERSION,
          referrer: document.referrer || null,
          utm: utmParams(),
          source: "workbook",
        },
      });
      if (fnError) throw fnError;
      track("submit", { marketing });
    } catch (err) {
      track("submit_error");
      console.warn("consent not recorded", err);
      if (marketing) {
        // Only worth saying out loud when they asked for something we may now
        // fail to give them. The workbook itself is unaffected either way.
        setError("I could not save your email preference just now - the workbook below still works.");
      }
    } finally {
      setConsentToken(token);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* ABOVE THE FOLD. The mark, the offer, the consent, the handoff. */}
      <section className="relative min-h-screen flex items-center py-16">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-bg opacity-50" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* What it is */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6"
            >
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 font-mono text-xs">
                <EyeMark className="h-3.5 w-auto" />
                Free. No catch, and I mean that.
              </div>

              <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[0.95] tracking-tight mb-6">
                The AI Sight <br />
                <span className="text-gradient">workbook.</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8">
                One PDF, {WORKBOOK.sections} sections, one per lecture of the course.
                The lectures are free on YouTube; this is the thing you keep open next
                to them so you are not pausing every thirty seconds to retype a command.
              </p>

              <ul className="space-y-3 mb-8">
                {WORKBOOK.contents.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                      <Check className="w-3 h-3 text-brand" />
                    </span>
                    <span className="text-sm">{line}</span>
                  </li>
                ))}
              </ul>

              <p className="font-mono text-xs text-muted-foreground">
                {COURSE.recorded} lectures recorded · {COURSE.runtime} · {COURSE.cadence}
              </p>
            </motion.div>

            {/* Consent, then the handoff to Planets */}
            <motion.div
              ref={consentRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-6"
            >
              <div ref={checkoutRef}>
                {consentToken ? (
                  <Checkout />
                ) : (
                  <div className="glass-strong rounded-[2rem] p-8 md:p-10 shadow-elegant">
                    <h2 className="font-display text-2xl font-semibold mb-2">
                      Before I hand it over.
                    </h2>
                    <p className="text-sm text-muted-foreground mb-7">
                      One box, and it is optional. Then you put in an email on the next
                      step and the workbook lands in your inbox.
                    </p>

                    {/*
                      SEPARATE FROM DELIVERY, AND UNTICKED. Do not default this to
                      true, do not gate Continue on it, and do not reword the label
                      without changing MARKETING_CONSENT_WORDING with it - the string
                      that is stored has to be the string that was read.
                    */}
                    <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/40 p-4 mb-4">
                      <Checkbox
                        id="wb-marketing"
                        checked={marketing}
                        onCheckedChange={(v) => setMarketing(v === true)}
                        className="mt-0.5"
                      />
                      <label htmlFor="wb-marketing" className="text-sm leading-relaxed cursor-pointer">
                        {MARKETING_CONSENT_WORDING}
                      </label>
                    </div>

                    <p className="text-xs text-muted-foreground mb-6">
                      Leave it unticked and you still get the workbook - it is not a
                      condition of anything. You would just get the one email with your
                      download in it and nothing after that.
                    </p>

                    {error && <p role="alert" className="text-sm text-destructive mb-4">{error}</p>}

                    <Button
                      onClick={handoff}
                      size="lg"
                      disabled={loading}
                      className="w-full rounded-2xl h-12 gap-2 shadow-glow"
                    >
                      {loading
                        ? <><Loader2 className="w-4 h-4 animate-spin" /> One moment</>
                        : <>Continue <ArrowRight className="w-4 h-4" /></>}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      <Link to="/privacy" className="underline underline-offset-2 hover:text-brand">
                        What I do with your email
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BELOW THE FOLD. For the people who scroll, and only for them. */}
      <section className="border-t border-border/50">
        <div className="container py-20 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-brand mb-6">
            // Who made this
          </p>
          <div className="mb-8">
            <Wordmark className="max-w-[220px]" />
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              I'm Anshul Rastogi. I'm 20, I'm in Delhi, and I build AI systems - a SaaS
              called Socioverse that is live with real users on it, and an automation
              agency that delivered client systems through to June 2026 and is not taking
              new clients right now.
            </p>
            <p>
              I put a price of Rs 999 on this course and sold zero copies of it. So it is
              going out free instead, two lectures a week from 15 September. That is the
              whole story, and this workbook is the only thing I am asking for an email
              in exchange for.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button asChild variant="outline" className="rounded-full gap-2 glass">
              <Link to="/">More about me <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full gap-2 glass">
              <a href={COURSE.playlist}><Youtube className="w-4 h-4" /> The free playlist</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Minimal legal footer. The real site footer is suppressed on this route. */}
      <footer className="border-t border-border/50">
        <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} {SITE.fullName}</span>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-brand transition-colors">Privacy</Link>
            <Link to="/unsubscribe" className="hover:text-brand transition-colors">Unsubscribe</Link>
            <Link to="/contact" className="hover:text-brand transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

/**
 * The Socioverse Planets checkout for the zero-price workbook product.
 *
 * Embedded rather than linked so the visitor never leaves the page they were
 * sent to. A direct link sits underneath regardless: an iframe can be blocked
 * by the browser, by an extension, or by Planets' own frame policy, and a
 * silent empty box on the one page the whole release funnels into is the worst
 * possible failure. If the URL is not configured yet the panel says so plainly
 * instead of rendering a broken frame.
 */
const Checkout = () => {
  const url = WORKBOOK.planetsUrl;
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(720);

  /**
   * Planets posts its rendered height back so the frame is not a fixed box with
   * its own scrollbar. Two guards, both load-bearing: the origin has to be the
   * Socioverse one, and the message has to come from THIS frame - any page on
   * the site can postMessage at us, and without the source check one of them
   * could drive the height of the checkout.
   *
   * If the message never arrives the initial 720 stands, which is the height
   * Socioverse's own embed snippet ships as its default.
   */
  useEffect(() => {
    if (!url) return;
    let expected: string;
    try {
      expected = new URL(url).origin;
    } catch {
      return;
    }

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== expected) return;
      if (e.source !== frameRef.current?.contentWindow) return;
      const data = e.data as { type?: string; height?: unknown } | null;
      if (!data || data.type !== "socioverse:embed-height") return;
      const next = Number(data.height);
      if (Number.isFinite(next) && next > 200) setHeight(next);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [url]);

  if (!url) {
    return (
      <div className="glass-strong rounded-[2rem] p-8 md:p-10 shadow-elegant">
        <h2 className="font-display text-2xl font-semibold mb-3">Almost there.</h2>
        <p className="text-sm text-muted-foreground">
          The download is not switched on yet. Email{" "}
          <a href={`mailto:${SITE.email}`} className="text-brand underline underline-offset-2">
            {SITE.email}
          </a>{" "}
          and I will send you the workbook directly - that is on me, not you.
        </p>
      </div>
    );
  }

  // The storefront page is what the "new tab" link should open; only the frame
  // wants ?embed=1, which strips the site chrome and starts the height handshake.
  const embedUrl = url.includes("?") ? `${url}&embed=1` : `${url}?embed=1`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-strong rounded-[2rem] p-4 md:p-6 shadow-elegant"
    >
      <div className="flex items-center gap-2 px-2 pb-3 font-mono text-xs text-muted-foreground">
        <Download className="w-3.5 h-3.5 text-brand" />
        Put in an email and it is yours. Free, no card.
      </div>

      <div className="rounded-2xl overflow-hidden bg-background/60 border border-border/60">
        <iframe
          ref={frameRef}
          src={embedUrl}
          title="Get the AI Sight workbook"
          className="w-full border-0 block"
          style={{ height }}
          scrolling="no"
          loading="eager"
          allow="payment"
          onLoad={() => track("download")}
        />
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-brand transition-colors"
      >
        Not loading? Open it in a new tab <ExternalLink className="w-3 h-3" />
      </a>
    </motion.div>
  );
};

export default Workbook;
