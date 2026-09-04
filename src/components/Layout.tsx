import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";
import { SmoothScroll } from "./SmoothScroll";
import { PageTransition } from "./PageTransition";
import { BackToTop } from "./BackToTop";

// Sits inside the layout, so a lazy chunk loading never unmounts the nav or
// footer - only the page area is ever in a pending state.
const PageFallback = () => <div className="min-h-[60vh]" aria-busy="true" />;

/**
 * Routes that render their own chrome and get none of the site's.
 *
 * /workbook is the important one. Its spec is explicit: "No nav above the fold.
 * No portfolio pieces, no about, no project grid." A capture page whose top bar
 * offers eight other places to go is not a capture page, so the nav, the footer
 * and the page's top padding all come off, and /workbook supplies its own
 * minimal legal footer instead.
 *
 * /unsubscribe is here for a different reason: somebody who arrived to stop
 * getting email should not be shown a signup form on the way out.
 */
const BARE_ROUTES = new Set(["/workbook", "/unsubscribe"]);

export const Layout = () => {
  const loc = useLocation();
  const isAdmin = loc.pathname.startsWith("/admin");
  const isBare = BARE_ROUTES.has(loc.pathname);

  return (
    <SmoothScroll>
      <div className="min-h-screen grain relative overflow-x-hidden">
        <CustomCursor />
        <ScrollProgress />
        {!isBare && <Nav />}
        <AnimatePresence mode="wait">
          <PageTransition key={loc.pathname}>
            <main className={isBare ? "" : "pt-24"}>
              <Suspense fallback={<PageFallback />}>
                <Outlet />
              </Suspense>
            </main>
          </PageTransition>
        </AnimatePresence>
        {!isAdmin && !isBare && <Footer />}
        <BackToTop />
      </div>
    </SmoothScroll>
  );
};
