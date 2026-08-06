import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { Page } from "@/lib/routes";
import Home from "./pages/Home";

const {
  "/about": About,
  "/skills": Skills,
  "/achievements": Achievements,
  "/blog": Blog,
  "/blog/:slug": BlogPost,
  "/newsletter": Newsletter,
  "/courses": Courses,
  "/courses/:slug": CourseDetail,
  "/shop": Shop,
  "/shop/:slug": ProductDetail,
  "/coaching": Coaching,
  "/services": Services,
  "/now": Now,
  "/uses": Uses,
  "/contact": Contact,
  "/resume": Resume,
  "/careers": Careers,
  "/reviews": Reviews,
  "/reviews/:id": ReviewDetail,
  "/admin/login": AdminLogin,
  "/admin": Admin,
  "*": NotFound,
} = Page;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-center" />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/newsletter" element={<Newsletter />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:slug" element={<CourseDetail />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:slug" element={<ProductDetail />} />
                <Route path="/coaching" element={<Coaching />} />
                <Route path="/services" element={<Services />} />
                <Route path="/now" element={<Now />} />
                <Route path="/uses" element={<Uses />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/reviews/:id" element={<ReviewDetail />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
