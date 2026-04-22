import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Scores from "./pages/Scores";
import Admin from "./pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scores" element={<Scores />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;