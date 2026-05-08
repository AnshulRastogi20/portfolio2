import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Achievements from "./pages/Achievements";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Newsletter from "./pages/Newsletter";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Coaching from "./pages/Coaching";
import Services from "./pages/Services";
import Now from "./pages/Now";
import Uses from "./pages/Uses";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import Careers from "./pages/Careers";
import Reviews from "./pages/Reviews";
import ReviewDetail from "./pages/ReviewDetail";

const queryClient = new QueryClient();

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
