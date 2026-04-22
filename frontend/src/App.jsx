import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Scores from "./pages/Scores.jsx";
import Admin from "./pages/Admin.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scores" element={<Scores />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App; //hello