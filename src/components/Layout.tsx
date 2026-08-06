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

export const Layout = () => {
  const loc = useLocation();
  const isAdmin = loc.pathname.startsWith("/admin");
  return (
    <SmoothScroll>
      <div className="min-h-screen grain relative overflow-x-hidden">
        <CustomCursor />
        <ScrollProgress />
        <Nav />
        <AnimatePresence mode="wait">
          <PageTransition key={loc.pathname}>
            <main className="pt-24">
              <Suspense fallback={<PageFallback />}>
                <Outlet />
              </Suspense>
            </main>
          </PageTransition>
        </AnimatePresence>
        {!isAdmin && <Footer />}
        <BackToTop />
      </div>
    </SmoothScroll>
  );
};
