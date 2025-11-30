


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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
