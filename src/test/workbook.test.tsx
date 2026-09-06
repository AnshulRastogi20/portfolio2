import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

/**
 * The /workbook consent contract.
 *
 * These are not UI-detail tests. Each pins a rule from
 * Socials/ai-sight-free-release/02-website-endpoint.md that would be a legal
 * and a conversion problem if it silently regressed, and every one is the kind
 * of thing a well-meaning tidy-up breaks: defaulting the box to ticked "because
 * most people want it", gating Continue on it "to grow the list", or sending
 * the consent constant by reference so the stored wording stops matching what
 * was on screen.
 *
 * The page has no email field. Capture and delivery both live in Socioverse
 * Planets, and the billing email on that checkout is the lead - so what this
 * page owns, and all it owns, is taking consent before handing over.
 */

type Body = Record<string, unknown>;
type EventRow = { event: string };

const invoke =
  vi.fn<(name: string, opts: { body: Body }) => Promise<{ data: unknown; error: unknown }>>();
const insert = vi.fn<(row: EventRow) => Promise<{ error: null }>>(() =>
  Promise.resolve({ error: null }),
);

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: { invoke: (name: string, opts: { body: Body }) => invoke(name, opts) },
    from: () => ({ insert: (row: EventRow) => insert(row) }),
  },
}));

const planets = { url: "" };
vi.mock("@/lib/data", () => ({
  get WORKBOOK() {
    return {
      sections: 15,
      planetsUrl: planets.url,
      contents: ["One section per lecture, all 15"],
    };
  },
  COURSE: {
    lectures: 15,
    recorded: 14,
    runtime: "2 h 16 m",
    cadence: "Two a week, Tuesday and Friday",
    playlist: "https://youtube.com/@sightofanshul",
  },
  SITE: { fullName: "Anshul Rastogi", email: "anshulrastogi020@gmail.com" },
}));

const renderWorkbook = async () => {
  const { default: Workbook } = await import("@/pages/Workbook");
  return render(
    <MemoryRouter>
      <Workbook />
    </MemoryRouter>,
  );
};

const continueBtn = () => screen.getByRole("button", { name: /continue/i });

describe("the workbook consent gate", () => {
  beforeEach(() => {
    planets.url = "";
    invoke.mockReset();
    insert.mockClear();
    invoke.mockResolvedValue({ data: { ok: true }, error: null });
  });
  afterEach(cleanup);

  it("renders the marketing checkbox unticked", async () => {
    await renderWorkbook();
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-state", "unchecked");
  });

  it("never asks for an email - that is the Planets checkout's job", async () => {
    await renderWorkbook();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(document.querySelector('input[type="email"]')).toBeNull();
  });

  it("does not gate Continue on the marketing box", async () => {
    const user = userEvent.setup();
    await renderWorkbook();

    // Enabled from load: ticking is never a condition of getting the workbook.
    expect(continueBtn()).toBeEnabled();
    await user.click(continueBtn());

    await waitFor(() => expect(invoke).toHaveBeenCalledTimes(1));
    const [fn, opts] = invoke.mock.calls[0];
    expect(fn).toBe("workbook-signup");
    expect(opts.body.marketingConsent).toBe(false);
  });

  it("records consent with a token and the wording exactly as rendered", async () => {
    const user = userEvent.setup();
    const { MARKETING_CONSENT_WORDING } = await import("@/pages/Workbook");
    await renderWorkbook();

    // The label read and the string stored have to be the same characters,
    // otherwise the audit trail records a sentence nobody was shown.
    expect(screen.getByText(MARKETING_CONSENT_WORDING)).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox"));
    await user.click(continueBtn());

    await waitFor(() => expect(invoke).toHaveBeenCalledTimes(1));
    const [, opts] = invoke.mock.calls[0];
    expect(opts.body.marketingConsent).toBe(true);
    expect(opts.body.consentWording).toBe(MARKETING_CONSENT_WORDING);
    // The token is the handle that lets the Planets order be matched back to
    // this consent, since the email does not exist yet.
    expect(opts.body.consentToken).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(opts.body.email).toBeUndefined();
  });

  it("hands over to the Planets checkout after Continue", async () => {
    planets.url = "https://socioverse.io/anshulrastogi/workbook";
    const user = userEvent.setup();
    const { container } = await renderWorkbook();

    await user.click(continueBtn());

    const frame = await waitFor(() => {
      const el = container.querySelector("iframe");
      expect(el).not.toBeNull();
      return el!;
    });
    // ?embed=1 is not cosmetic. That route answers with `frame-ancestors *` and
    // posts its height back; the plain storefront route sends
    // `X-Frame-Options: SAMEORIGIN` and the browser refuses to render it here.
    expect(frame).toHaveAttribute(
      "src",
      "https://socioverse.io/anshulrastogi/workbook?embed=1",
    );
    // A frame can be blocked by the browser or by Planets' own frame policy, so
    // there is always a way through that does not depend on it rendering. That
    // link opens the real page, not the stripped embed.
    const escape = screen.getByRole("link", { name: /open it in a new tab/i });
    expect(escape).toBeInTheDocument();
    expect(escape).toHaveAttribute("href", "https://socioverse.io/anshulrastogi/workbook");
  });

  it("still hands over when recording the consent fails", async () => {
    // Bookkeeping must never stand between somebody and a free PDF.
    planets.url = "https://socioverse.io/anshulrastogi/workbook";
    invoke.mockRejectedValue(new Error("offline"));
    const user = userEvent.setup();
    const { container } = await renderWorkbook();

    await user.click(continueBtn());

    await waitFor(() => expect(container.querySelector("iframe")).not.toBeNull());
  });

  it("says so plainly when the Planets product is not configured", async () => {
    // Better than an empty frame on the one page the whole release funnels into.
    const user = userEvent.setup();
    const { container } = await renderWorkbook();

    await user.click(continueBtn());

    await waitFor(() =>
      expect(screen.getByText(/download is not switched on yet/i)).toBeInTheDocument(),
    );
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("counts page views separately from form views", async () => {
    await renderWorkbook();
    await waitFor(() => expect(insert).toHaveBeenCalled());
    const events = insert.mock.calls.map(([row]) => row.event);
    expect(events).toContain("page_view");
    // form_view rides an IntersectionObserver, which jsdom stubs out, so what
    // is worth pinning is that page_view is not doing double duty for both.
    expect(events.filter((e) => e === "page_view")).toHaveLength(1);
  });
});
