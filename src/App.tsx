import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import ToPage from "./pages/to/ToPage";
import LoginPage from "./pages/login/LoginPage";

import ReactGA from "react-ga";
import Contributors from "./pages/Contributors";

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/contributors" element={<Contributors />} />
      <Route path="/to/:username" element={<ToPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
