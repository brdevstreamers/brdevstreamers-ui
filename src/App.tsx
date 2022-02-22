import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainPage from "./page/mainPage/MainPage";
import ReactGA from "react-ga";
import React, { useEffect } from "react";
import StatsPage from "./page/stats/StatsPage";
import AboutPage from "./page/about/AboutPage";
import SupportersPage from "./page/supporters/SupportersPage";
import Footer from "./component/footer/Footer";

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
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
