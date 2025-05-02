import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignUp";
import SignUp from "./pages/SignIn";
import InputPage from "./pages/Input";
import OutputPage from "./pages/Output";
import Enhanced from "./pages/Enhanced";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route 
                path="/input" 
                element={
                  <ProtectedRoute>
                    <InputPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/output" 
                element={
                  <ProtectedRoute>
                    <OutputPage/>
                  </ProtectedRoute>
                } 
              />
              <Route path="/enhanced" element={<Enhanced />}/>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
