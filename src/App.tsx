


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from "./components/Front";
import Language from "./components/Language";
import Login from "./components/Login";
import OTP from "./components/verifyOtp";
import Signup from "./components/Signup";
import Selection from "./components/Selection";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/language" element={<Language />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/selection" element={<Selection/>} />
         

      </Routes>
    </BrowserRouter>
  );
}

export default App;
