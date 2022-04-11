import React, { useEffect } from "react";
import ReactGA from "react-ga";
import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import "./App.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Stats from "./pages/Estatisticas";
import Supporters from "./pages/Supporters";
import ToPage from "./pages/to/ToPage";

import LandingLayout from "./components/layouts/LandingLayout";
import ErrorFallback from "./components/sections/ErrorFallback";

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <LandingLayout>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/agradecimentos" element={<Supporters />} />
          {/* <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/to/:username" element={<ToPage />} />
        </Routes>
      </ErrorBoundary>
    </LandingLayout>
  );
}

export default App;
