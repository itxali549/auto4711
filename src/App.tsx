import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Website pages
import WebsiteLayout from "@/components/website/WebsiteLayout";
import Index from "@/pages/website/Index";
import About from "@/pages/website/About";
import Services from "@/pages/website/Services";
import Gallery from "@/pages/website/Gallery";
import Testimonials from "@/pages/website/Testimonials";
import Contact from "@/pages/website/Contact";
import WebsiteNotFound from "@/pages/website/NotFound";

// Admin pages
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public website routes with layout */}
            <Route element={<WebsiteLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<WebsiteNotFound />} />
            </Route>
            
            {/* Admin login route (hidden from public nav) */}
            <Route path="/login" element={<AdminLogin />} />
            
            {/* Protected dashboard at /tracker */}
            <Route 
              path="/tracker" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
