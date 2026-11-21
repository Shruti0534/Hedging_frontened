import { BrowserRouter, Link, Navigate, Outlet, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CropProvider } from "@/contexts/CropContext";
import { MarketPriceProvider } from "@/contexts/MarketPriceContext";

// Buyer components
import BuyerLayout from "./features/buyer/BuyerLayout";
import Dash from "./features/buyer/Dash";
import Orders from "./features/buyer/Order";
import BuyerProfile from "./features/buyer/BuyerProfile";

// Seekho components
import SeekhoLayout from "./features/seekho/SeekhoLayout";
import Seekho from "./features/seekho/pages/Seekho";
import ModulePage from "./features/seekho/ModulePage";
import { DailyQuiz } from "./features/seekho/DailyQuizPage";
import Seekhodash from "./features/seekho/Seekhodash";

// Other pages
import Front from "./features/onboarding/Front";
import PhoneLogin from "./features/onboarding/PhoneLogin";
import OTP from "./features/onboarding/verifyOtp";
import Selection from "./features/onboarding/Selection";
import Signup from "./features/onboarding/Signup";
import Micc from "./components/common/Mic";

import Predictor from "./features/forecasting/pages/Predictor";
import Crop_Predictor from "./features/forecasting/pages/crop_prediction";
import TraderPredictor from "./features/forecasting/pages/Trade";

import AppLayout from "./components/layout/Layout";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Markets from "./features/markets/pages/Markets";
import Hedge from "./features/hedge/pages/Hedge";
import Contracts from "./features/contracts/pages/Contracts";
import Alerts from "./features/alerts/pages/Alerts";
import Learn from "./features/learn/pages/Learn";
import Profile from "./features/dashboard/pages/Profile";
import NotFound from "./pages/not-found";
import Mode from "./features/onboarding/Mode";

const isDemo = import.meta.env.VITE_DEMO_MODE === "true";

function DemoLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <nav aria-label="Demo" className="mx-auto flex max-w-7xl flex-wrap gap-5 px-5 py-4 text-sm font-semibold">
          <Link to="/seekho">Trade Seekho</Link>
          <Link to="/daily-quiz">Daily quiz</Link>
          <Link to="/app/markets">Simulated markets</Link>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <MarketPriceProvider>
            <CropProvider>
              <BrowserRouter>
                {/* Toaster should be inside providers but can be anywhere in Router */}
                <Toaster />
                {!isDemo && <Micc />}
                
                {isDemo ? (
                  <Routes>
                    <Route element={<DemoLayout />}>
                      <Route path="/seekho" element={<Seekho />} />
                      <Route path="/seekho/module/:moduleId" element={<ModulePage />} />
                      <Route path="/daily-quiz" element={<DailyQuiz />} />
                      <Route path="/app/markets" element={<Markets />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/seekho" replace />} />
                  </Routes>
                ) : (
                <Routes>
                  {/* ==========================
                      Public / Auth Routes 
                     ========================== */}
                  <Route path="/" element={<Front />} />
                  <Route path="/login" element={<PhoneLogin />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/phone-login" element={<PhoneLogin />} />
                  <Route path="/otp" element={<OTP />} />
                  <Route path="/selection" element={<Selection />} />
                  <Route path="/language" element={<Navigate to="/" replace />} />
                  <Route path="/mode" element={<Mode />} />

                  {/* ==========================
                      Standalone Tools 
                     ========================== */}
                  <Route path="/daily-quiz" element={<DailyQuiz />} />
                  <Route path="/crop" element={<Crop_Predictor />} />
                  <Route path="/trade" element={<TraderPredictor />} />
                  <Route path="/predict" element={<Predictor />} />

                  {/* ==========================
                      Buyer Section (Nested Layout)
                     ========================== */}
                  <Route path="/buyer" element={<BuyerLayout />}>
                    <Route index element={<Dash />} />        {/* /buyer */}
                    <Route path="orders" element={<Orders />} /> {/* /buyer/orders */}
                    <Route path="profile" element={<BuyerProfile />} /> {/* /buyer/profile */}
                  </Route>

                  {/* ==========================
                      Seekho Section (Nested Layout)
                     ========================== */}
                  <Route path="/seekho" element={<SeekhoLayout />}>
                    <Route index element={<Seekho />} />               {/* /seekho */}
                    <Route path="module/:moduleId" element={<ModulePage />} />
                    <Route path="profile" element={<Seekhodash />} />    {/* /seekho/profile */}
                  </Route>

                  {/* ==========================
                      Main App Section (Farmer/General)
                     ========================== */}
                  <Route path="/app" element={<AppLayout />}>
                    <Route path="dashboard" element={<Profile />} />
                    <Route path="markets" element={<Markets />} />
                    <Route path="hedge" element={<Hedge />} />
                    <Route path="contracts" element={<Contracts />} />
                    <Route path="alerts" element={<Alerts />} />
                    <Route path="learn" element={<Learn />} />
                    <Route path="profile" element={<Dashboard />} />
                  </Route>

                  {/* ==========================
                      Fallbacks
                     ========================== */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                )}
              </BrowserRouter>
            </CropProvider>
          </MarketPriceProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
