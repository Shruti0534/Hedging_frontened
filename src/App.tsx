import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";

import Front from "./components/Front";
import Language from "./components/Language";
import Login from "./components/Login";
import OTP from "./components/verifyOtp";
import Signup from "./components/Signup";
import Selection from "./components/Selection";


import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import Hedge from "./pages/Hedge";
import Contracts from "./pages/Contracts";
import Alerts from "./pages/Alerts";
import Learn from "./pages/Learn";
import Profile from "./pages/Profile";
import NotFound from "./pages/not-found";
import AppLayout from "./components/layout/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/language" element={<Language />} />
        <Route path="/login" element={<Login />} />

              <Route path="/app" element={<AppLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="markets" element={<Markets />} />
                <Route path="hedge" element={<Hedge />} />
                <Route path="contracts" element={<Contracts />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="learn" element={<Learn />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>

            <Toaster />
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
