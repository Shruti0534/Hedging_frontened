

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Buyer components
import BuyerLayout from "./components/buyer/BuyerLayout";
import Dash from "./components/buyer/Dash";
import Orders from "./components/buyer/Order";
import BuyerProfile from "./components/buyer/BuyerProfile";

// Seekho components
import SeekhoLayout from "./components/layout/SeekhoLayout";
import Seekho from "./pages/Seekho";
import ModulePage from "./components/seekho/ModulePage";
import {DailyQuiz} from "./components/seekho/DailyQuizPage";
import Seekhodash from "./components/seekho/Seekhodash";

// Other pages
import Front from "./components/Front";
import Language from "./components/Language";
import Login from "./components/Login";
import OTP from "./components/verifyOtp";
import Signup from "./components/Signup";
import Selection from "./components/Selection";

import Predictor from "./pages/Predictor";
import Crop_Predictor from "./components/hedge/crop_prediction";

import AppLayout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import Hedge from "./pages/Hedge";
import Contracts from "./pages/Contracts";
import Alerts from "./pages/Alerts";
import Learn from "./pages/Learn";
import Profile from "./pages/Profile";
import NotFound from "./pages/not-found";

import Mode from "./components/Mode";
import BuyerDash from "./components/buyer/Dash";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              
              {/* Public / Auth Routes */}
              <Route path="/" element={<Front />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/otp" element={<OTP />} />
              <Route path="/selection" element={<Selection />} />
              <Route path="/language" element={<Language />} />
              <Route path="/daily-quiz" element={<DailyQuiz />} />
              <Route path="/crop" element={<Crop_Predictor />} />
              <Route path="/mode" element={<Mode />} />

              {/* Buyer Routes */}
              <Route path="/buyer" element={<BuyerLayout />}>
                <Route index element={<Dash />} />           {/* /buyer */}
                <Route path="dash" element={<BuyerDash />} /> {/* /buyer/orders */}
                <Route path="orders" element={<Orders />} /> {/* /buyer/orders */}
                <Route path="profile" element={<BuyerProfile />} /> {/* /buyer/profile */}
              </Route>

              {/* Seekho Routes */}
              <Route path="/seekho" element={<SeekhoLayout />}>
                <Route index element={<Seekho />} />                  {/* /seekho */}
                <Route path="module/:moduleId" element={<ModulePage />} />
                <Route path="profile" element={<Seekhodash />} />    {/* /seekho/profile */}
              </Route>

              {/* App / Dashboard Routes */}
              <Route path="/app" element={<AppLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="markets" element={<Markets />} />
                <Route path="hedge" element={<Hedge />} />
                <Route path="contracts" element={<Contracts />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="learn" element={<Learn />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              {/* Predictor */}
              <Route path="/predict" element={<Predictor />} />

              {/* Redirect unknown paths to NotFound */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            <Toaster />
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
