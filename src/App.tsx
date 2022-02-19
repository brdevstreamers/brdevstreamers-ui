import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouteLink,
} from "react-router-dom";
import MainPage from "./component/mainPage/MainPage";
import ReactGA from "react-ga";
import React, { useEffect } from "react";
import { Center, Link, Stack, Text, VStack } from "@chakra-ui/react";
import StatsPage from "./component/statsPage/StatsPage";

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
        </Routes>
        <VStack>
          <Center>
            <Text color="primary.500" fontWeight="semibold">
              feito com ♥ por{" "}
              <Link
                isExternal={true}
                href="https://twitch.tv/flaviojmendes"
                color="primary.400"
              >
                flaviojmendes
              </Link>
            </Text>
          </Center>
          <Center>
              <Text color="primary.500" fontWeight="semibold">
                <RouteLink to="/stats">Estatísticas</RouteLink>
              </Text>
            </Center>
        </VStack>
      </Router>
    </>
  );
}

export default App;
