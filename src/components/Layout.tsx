import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";
import { SmoothScroll } from "./SmoothScroll";
import { PageTransition } from "./PageTransition";

export const Layout = () => {
  const loc = useLocation();
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
        <Footer />
      </div>
    </SmoothScroll>
  );
};
