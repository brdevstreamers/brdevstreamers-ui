import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import MainPage from "./page/mainPage/MainPage";
import StatsPage from "./page/stats/StatsPage";
import AboutPage from "./page/about/AboutPage";
import ProfilePage from "./page/profile/ProfilePage";
import SupportersPage from "./page/supporters/SupportersPage";
import LoginPage from "./page/login/LoginPage";
import RedirectPage from "./page/redirect/RedirectPage";

import Home from "./pages/Home";
import About from "./pages/About";
import Stats from "./pages/Stats";
import Supporters from "./pages/Supporters";

import ReactGA from "react-ga";

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/agradecimentos" element={<Supporters />} />
      {/* <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/to/:username" element={<RedirectPage />} /> */}
    </Routes>
  );
}

export default App;
