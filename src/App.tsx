import { Routes, Route } from "react-router-dom";
import "./App.css";

import ToPage from "./pages/to/ToPage";

import Home from "./pages/Home";
import About from "./pages/About";
import Stats from "./pages/Estatisticas";
import Supporters from "./pages/Supporters";
import ReactGA from "react-ga4";


function App() {
  ReactGA.initialize("G-R9QL9W2YR4");
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.search,
  });
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/agradecimentos" element={<Supporters />} />
      {/* <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/to/:username" element={<ToPage />} />
    </Routes>
  );
}

export default App;
