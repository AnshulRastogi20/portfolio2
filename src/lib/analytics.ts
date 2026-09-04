import { supabase } from "@/integrations/supabase/client";

/**
 * Funnel tracking for /workbook.
 *
 * The spec asks for page views, form views and submits counted SEPARATELY,
 * because the ratio between them is the number that says whether the release
 * plan is working, and without it the November post-mortem is guesswork.
 *
 * Events go to `workbook_events` in Supabase rather than to an analytics
 * vendor. Two reasons: the vendor has not been chosen yet and the announcement
 * video ships before it will be, and a self-owned table survives that choice.
 * If Plausible or GA is added later, `track` forwards to whichever is on the
 * page too, so nothing here needs revisiting.
 *
 * Nothing identifying is stored. `visitor_id` is a random uuid in
 * sessionStorage: enough to tell one person's page_view from their own
 * form_view, gone when the tab closes, never joined to the signup record.
 */

export type WorkbookEvent =
  | "page_view"
  | "form_view"
  | "submit"
  | "download"
  | "submit_error";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void;
    gtag?: (command: string, event: string, params?: Record<string, unknown>) => void;
  }
}

const VISITOR_KEY = "soa_visitor";

const visitorId = (): string | null => {
  try {
    const existing = sessionStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    sessionStorage.setItem(VISITOR_KEY, id);
    return id;
  } catch {
    // Private mode, blocked storage, an embedded webview. The event is still
    // worth counting without it.
    return null;
  }
};

/** utm_* from the current URL, so a signup can be traced back to its video. */
export const utmParams = (): Record<string, string> => {
  const out: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const value = params.get(key);
      if (value) out[key] = value.slice(0, 120);
    }
  } catch {
    // Nothing to read. An empty object is a fine answer.
  }
  return out;
};

/**
 * Fire and forget. An analytics write must never be able to block a signup or
 * surface an error to somebody who just wanted a PDF, so every failure here is
 * swallowed on purpose.
 */
export const track = (event: WorkbookEvent, extra: Record<string, unknown> = {}) => {
  try {
    window.plausible?.(`workbook:${event}`, { props: extra });
    window.gtag?.("event", `workbook_${event}`, extra);
  } catch {
    // A vendor script that throws is not this function's problem.
  }

  void supabase
    .from("workbook_events")
    .insert({
      event,
      visitor_id: visitorId(),
      path: typeof window !== "undefined" ? window.location.pathname : null,
      referrer: typeof document !== "undefined" ? document.referrer.slice(0, 500) || null : null,
      utm: utmParams(),
    })
    .then(({ error }) => {
      if (error) console.warn("workbook event not recorded", error.message);
    });
};
