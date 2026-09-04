import { lazy, type ComponentType, type LazyExoticComponent } from "react";

/**
 * Every route except Home is split into its own chunk.
 *
 * Home stays eagerly imported: it is the landing page, so lazy-loading it
 * would just add a round trip before anything paints. Everything else -
 * Admin and the markdown renderer especially - is dead weight in the initial
 * bundle for a first-time visitor.
 */
const loaders = {
  "/about": () => import("@/pages/About"),
  "/skills": () => import("@/pages/Skills"),
  "/achievements": () => import("@/pages/Achievements"),
  "/blog": () => import("@/pages/Blog"),
  "/blog/:slug": () => import("@/pages/BlogPost"),
  "/newsletter": () => import("@/pages/Newsletter"),
  "/workbook": () => import("@/pages/Workbook"),
  "/privacy": () => import("@/pages/Privacy"),
  "/unsubscribe": () => import("@/pages/Unsubscribe"),
  "/courses": () => import("@/pages/Courses"),
  "/courses/:slug": () => import("@/pages/CourseDetail"),
  "/shop": () => import("@/pages/Shop"),
  "/shop/:slug": () => import("@/pages/ProductDetail"),
  "/coaching": () => import("@/pages/Coaching"),
  "/services": () => import("@/pages/Services"),
  "/now": () => import("@/pages/Now"),
  "/uses": () => import("@/pages/Uses"),
  "/contact": () => import("@/pages/Contact"),
  "/resume": () => import("@/pages/Resume"),
  "/careers": () => import("@/pages/Careers"),
  "/reviews": () => import("@/pages/Reviews"),
  "/reviews/:id": () => import("@/pages/ReviewDetail"),
  "/admin/login": () => import("@/pages/AdminLogin"),
  "/admin": () => import("@/pages/Admin"),
  "*": () => import("@/pages/NotFound"),
} as const;

export type RoutePath = keyof typeof loaders;

export const Page = Object.fromEntries(
  Object.entries(loaders).map(([path, load]) => [path, lazy(load)]),
) as unknown as Record<RoutePath, LazyExoticComponent<ComponentType>>;

/**
 * Warm a route's chunk before the click lands. Called on nav link hover and
 * focus, so by the time the user actually navigates the code is usually
 * already parsed and the transition is instant.
 */
const warmed = new Set<string>();
export const prefetchRoute = (path: string) => {
  if (warmed.has(path)) return;
  const load = loaders[path as RoutePath];
  if (!load) return;
  warmed.add(path);
  void load();
};
