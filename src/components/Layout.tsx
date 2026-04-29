import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";
import { SmoothScroll } from "./SmoothScroll";
import { PageTransition } from "./PageTransition";
import { BackToTop } from "./BackToTop";

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
              <Outlet />
            </main>
          </PageTransition>
        </AnimatePresence>
        {!isAdmin && <Footer />}
        <BackToTop />
      </div>
    </SmoothScroll>
  );
};

