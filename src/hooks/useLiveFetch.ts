import { useEffect, useRef } from "react";

/**
 * Runs `load` on mount, then again when the tab is brought back to the
 * foreground after being hidden for longer than `staleAfter`.
 *
 * A plain `useEffect(..., [])` fetch means a tab left open all day keeps
 * showing whatever was published when it was first opened - anything added
 * from /admin since then never appears until a manual reload.
 *
 * `load` is handed an `isActive()` guard: check it after every await before
 * calling setState, so a fetch that resolves after unmount (or after a newer
 * fetch started) is dropped instead of writing stale data into the page.
 */
export const useLiveFetch = (
  load: (isActive: () => boolean) => void | Promise<void>,
  deps: unknown[] = [],
  staleAfter = 60_000,
) => {
  const loadRef = useRef(load);
  useEffect(() => {
    loadRef.current = load;
  });

  useEffect(() => {
    let active = true;
    const isActive = () => active;
    let hiddenAt = 0;

    void loadRef.current(isActive);

    const onVisibility = () => {
      if (document.hidden) {
        hiddenAt = Date.now();
        return;
      }
      if (hiddenAt && Date.now() - hiddenAt >= staleAfter) void loadRef.current(isActive);
      hiddenAt = 0;
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      active = false;
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, staleAfter]);
};
