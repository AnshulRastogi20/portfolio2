import "@testing-library/jest-dom";

// jsdom ships neither of these; framer-motion's whileInView needs the first
// and the scramble/cursor loops need the second.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});
Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

class MockResizeObserver implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, "ResizeObserver", { writable: true, value: MockResizeObserver });
Object.defineProperty(globalThis, "ResizeObserver", { writable: true, value: MockResizeObserver });

if (!window.requestAnimationFrame) {
  Object.defineProperty(window, "requestAnimationFrame", {
    writable: true,
    value: (cb: FrameRequestCallback) => setTimeout(() => cb(performance.now()), 16) as unknown as number,
  });
  Object.defineProperty(window, "cancelAnimationFrame", {
    writable: true,
    value: (id: number) => clearTimeout(id),
  });
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
