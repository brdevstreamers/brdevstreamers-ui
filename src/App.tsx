import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./page/mainPage/MainPage";
import ReactGA from "react-ga";
import React, { useEffect } from "react";
import StatsPage from "./page/stats/StatsPage";
import AboutPage from "./page/about/AboutPage";
import ProfilePage from "./page/profile/ProfilePage";
import SupportersPage from "./page/supporters/SupportersPage";
import LoginPage from "./page/login/LoginPage";
import Footer from "./component/footer/Footer";
import RedirectPage from "./page/redirect/RedirectPage";

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="sobre" element={<AboutPage />} />
          <Route path="agradecimentos" element={<SupportersPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="to/:username" element={<RedirectPage />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
