


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
import ModulePage from "./components/seekho/ModulePage";

import AppLayout from "./components/layout/Layout";
import Mode from "./components/Mode";
import Seekho from "./pages/Seekho";
import { DailyQuiz } from "./components/seekho/DailyQuizPage";
import Seekhodash from "./components/seekho/Seekhodash";
import SeekhoLayout from "./components/layout/SeekhoLayout";


import Predictor from "./pages/Predictor";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <LanguageProvider>
    <BrowserRouter>

      
        

 <Routes>
<Route path="/seekho/module/:moduleId" element={<ModulePage />} />


        <Route path="/" element={<Front />} />
        <Route path="/daily-quiz" element={<DailyQuiz/>} />
        <Route path="/language" element={<Language />} />
        <Route path="/login" element={<Login />} />

       <Route path="/mode" element={<Mode />} />
        <Route path="/otp" element={<OTP/>} />
        <Route path="/signup" element={< Signup/>} />
        <Route path="/selection" element={< Selection/>} />
        <Route path="/seekho" element={< Seekho/>} />
        <Route path="/seekhoprofile" element={<Seekhodash/>}/>
        

        <Route path="/seekho" element={< Seekho/>} />
        <Route path="/predict" element={< Predictor />} />
              <Route path="/app" element={<AppLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="markets" element={<Markets />} />
                <Route path="hedge" element={<Hedge />} />
                <Route path="contracts" element={<Contracts />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="learn" element={<Learn />} />
                <Route path="profile" element={<Profile />} />

              </Route>
              <Route path="/seekho" element={<SeekhoLayout />}>
      <Route index element={<Seekho />} />
      {/* future: <Route path="module/:id" element={<ModulePage />} /> */}
  </Route>
              

             

              <Route path="*" element={<NotFound />} />
            </Routes>

            <Toaster />
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}



