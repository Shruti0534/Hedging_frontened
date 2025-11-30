

//import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import NotFound from "./pages/not-found";
import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import Hedge from "./pages/Hedge";
import Contracts from "./pages/Contracts";
import Alerts from "./pages/Alerts";
import Learn from "./pages/Learn";
import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from "./components/Front";
import Language from "./components/Language";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/language" element={<Language />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" component={Dashboard} />
      <Route path="/markets" component={Markets} />
      <Route path="/hedge" component={Hedge} />
      <Route path="/contracts" component={Contracts} />
      <Route path="/alerts" component={Alerts} />
      <Route path="/learn" component={Learn} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
