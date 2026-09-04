import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

/**
 * POST /functions/v1/workbook-signup
 *
 * Records a consent event. It does not send anything and it does not keep a
 * contact list, because neither of those is this site's job any more.
 *
 * Spec: Socials/ai-sight-free-release/02-website-endpoint.md, and the capture
 * vs send decision in 05-newsletter.md.
 *
 * WHERE THE LEAD ACTUALLY LIVES: Socioverse. The workbook is a zero-price
 * DOWNLOAD product in Planets; its checkout collects the billing email, creates
 * the order and sends the file. That email is the lead, and Socioverse `leads`
 * is the single contact database. Handoff 05 is blunt that capture and send
 * must not be split across two products - so this function deliberately keeps
 * no contacts table of its own. It only writes the evidence.
 *
 * TWO SHAPES OF REQUEST:
 *
 *   { consentToken, marketingConsent, consentWording }   - from /workbook. No
 *       email yet: consent is taken BEFORE the Planets checkout collects one.
 *       The token is the handle that lets the resulting order be matched back.
 *
 *   { email, marketingConsent, consentWording }          - from the newsletter
 *       box elsewhere on the site, where the address is typed directly and the
 *       act of typing it into a box marked "newsletter" is the opt-in.
 *
 * Why this is a function and not a PostgREST insert from the page: the IP and
 * the timestamp have to be observed rather than reported. An IP the browser
 * sends is whatever the browser felt like sending, and a client that can write
 * its own consent row can write consent it was never shown.
 */

const cors = {
  "Access-Control-Allow-Origin": Deno.env.get("WORKBOOK_ALLOWED_ORIGIN") ?? "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

const EMAIL_RE = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]{2,}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const clientIp = (req: Request): string | null => {
  // Supabase sits behind a proxy, so the socket address is the proxy. The
  // left-most entry of x-forwarded-for is the original client.
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("cf-connecting-ip") ?? req.headers.get("x-real-ip");
};

/**
 * Push a newsletter signup into Socioverse `leads`, which is the list.
 *
 * Only used by the newsletter box - the workbook path never comes through here,
 * because Planets creates that lead itself when the order is placed.
 *
 * Needs SOCIOVERSE_SUPABASE_URL, SOCIOVERSE_SERVICE_KEY and SOCIOVERSE_TENANT_ID
 * as function secrets. Unset, the consent is still recorded and the response
 * says the lead was not synced, rather than the whole request failing: losing
 * the evidence as well as the contact would be strictly worse.
 */
const upsertSocioverseLead = async (opts: {
  email: string;
  marketingConsent: boolean;
  source: string;
}): Promise<{ synced: boolean; reason?: string }> => {
  const url = Deno.env.get("SOCIOVERSE_SUPABASE_URL");
  const key = Deno.env.get("SOCIOVERSE_SERVICE_KEY");
  const tenant = Deno.env.get("SOCIOVERSE_TENANT_ID");
  if (!url || !key || !tenant) {
    return { synced: false, reason: "socioverse credentials not configured" };
  }

  try {
    const res = await fetch(`${url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        // Same address twice is one contact, not two. The newsletter box is on
        // several pages and people do re-submit.
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({
        tenant_id: tenant,
        email: opts.email,
        source_type: "manual",
        stage: "new",
        marketing_opt_in: opts.marketingConsent,
        tags: [opts.source],
      }),
    });
    if (!res.ok) {
      return { synced: false, reason: `socioverse returned ${res.status}: ${await res.text()}` };
    }
    return { synced: true };
  } catch (err) {
    return { synced: false, reason: `socioverse request failed: ${String(err)}` };
  }
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Expected a JSON body" }, 400);
  }

  const rawEmail = String(body.email ?? "").trim().toLowerCase();
  const email = rawEmail || null;
  const consentToken = String(body.consentToken ?? "").trim() || null;

  if (!email && !consentToken) {
    return json({ error: "Need either an email or a consent token." }, 400);
  }
  if (email && (email.length > 255 || !EMAIL_RE.test(email))) {
    return json({ error: "That email address does not look right." }, 400);
  }
  if (consentToken && !UUID_RE.test(consentToken)) {
    return json({ error: "Malformed consent token." }, 400);
  }

  // The exact string that was on screen next to the checkbox, sent by the page
  // so the record shows what that person actually read rather than what the
  // current build happens to say.
  const consentWording = String(body.consentWording ?? "").slice(0, 2000);
  if (!consentWording) return json({ error: "Missing consent wording." }, 400);

  const marketingConsent = body.marketingConsent === true;
  const consentVersion = String(body.consentVersion ?? "v1").slice(0, 32);
  const source = typeof body.source === "string" ? body.source.slice(0, 60) : "workbook";
  const rawName = typeof body.firstName === "string" ? body.firstName.trim() : "";

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const now = new Date().toISOString(); // UTC, per spec

  // The audit trail. Append-only: every submission is its own row, so a second
  // visit never overwrites what was agreed the first time.
  const { error: logError } = await supabase.from("workbook_signups").insert({
    email,
    consent_token: consentToken,
    first_name: rawName ? rawName.slice(0, 80) : null,
    marketing_consent: marketingConsent,
    consent_wording: consentWording,
    consent_version: consentVersion,
    ip: clientIp(req),
    user_agent: req.headers.get("user-agent")?.slice(0, 500) ?? null,
    referrer: typeof body.referrer === "string" ? body.referrer.slice(0, 500) : null,
    utm: body.utm && typeof body.utm === "object" ? body.utm : {},
    source,
    created_at: now,
  });

  if (logError) {
    console.error("workbook_signups insert failed", logError);
    return json({ error: "Could not record that. Try again in a moment." }, 500);
  }

  // Only the newsletter box creates a lead here. The workbook path has no email
  // to create one with - Planets does it when the order is placed.
  let lead: { synced: boolean; reason?: string } = { synced: false, reason: "no email yet" };
  if (email) {
    lead = await upsertSocioverseLead({ email, marketingConsent, source });
    if (!lead.synced) console.warn("socioverse lead not synced:", lead.reason);
  }

  return json({
    ok: true,
    consentToken,
    leadSynced: lead.synced,
    leadSkippedReason: lead.synced ? undefined : lead.reason,
  });
});
