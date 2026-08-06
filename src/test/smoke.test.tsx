import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, cleanup } from "@testing-library/react";
import { TextScramble } from "@/components/TextScramble";

// Supabase is unreachable in tests; every page is supposed to fall back to
// its static data rather than throw.
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: null, error: new Error("offline") }),
        eq: () => ({
          order: () => Promise.resolve({ data: null, error: new Error("offline") }),
          maybeSingle: () => Promise.resolve({ data: null, error: new Error("offline") }),
          neq: () => ({ limit: () => Promise.resolve({ data: null, error: null }) }),
        }),
      }),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  },
}));

describe("App boots", () => {
  it("renders the home route through the lazy-route table", async () => {
    const { default: App } = await import("@/App");
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByText(/Hi, I'm Anshul/)).toBeInTheDocument();
  });

  it("exposes a loader for every non-home route and prefetches without throwing", async () => {
    const { Page, prefetchRoute } = await import("@/lib/routes");
    expect(Object.keys(Page)).toContain("/blog/:slug");
    expect(Object.keys(Page)).toContain("/admin");
    expect(() => prefetchRoute("/about")).not.toThrow();
    expect(() => prefetchRoute("/does-not-exist")).not.toThrow();
    expect(() => prefetchRoute("/")).not.toThrow();
  });
});

describe("TextScramble stays bounded", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  const phrases = ["build AI products.", "ship Up N Running.", "scale Socioverse."];
  const longest = Math.max(...phrases.map((p) => p.length));

  it("never grows its rendered text beyond the longest phrase", async () => {
    // rAF is driven manually so cycles are forced to interrupt mid-scramble -
    // the condition that used to compound the state ~35x per cycle.
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      frames.push(cb);
      return frames.length;
    });
    vi.stubGlobal("cancelAnimationFrame", () => {});

    const { container } = render(<TextScramble phrases={phrases} interval={100} />);
    const live = () => container.querySelector('[aria-hidden="true"]')?.textContent ?? "";

    for (let cycle = 0; cycle < 60; cycle++) {
      await act(async () => {
        vi.advanceTimersByTime(120);
      });
      // Only two frames per cycle: the scramble never gets to finish.
      const pending = frames.splice(0, 2);
      await act(async () => {
        pending.forEach((cb) => cb(performance.now()));
      });
      expect(live().length).toBeLessThanOrEqual(longest);
    }

    vi.unstubAllGlobals();
  });

  it("keeps the accessible label on a real phrase", () => {
    const { container } = render(<TextScramble phrases={phrases} />);
    const label = container.querySelector(".sr-only")?.textContent ?? "";
    expect(phrases).toContain(label);
  });
});
