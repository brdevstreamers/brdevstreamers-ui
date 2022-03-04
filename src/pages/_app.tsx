import "./profile/ProfilePage.css";
import "./mainPage/MainPage.css";
import "./App.css";
import "./StreamModal.css";
import "./StreamerCard.css";
import './VodCard.css';

import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ReactGA from "react-ga";

export default function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    colors: {
      primary: {
        400: "#D3C8FF",
        500: "#C299FF",
        600: "#B685FF",
        700: "#A970FF",
        800: "#9D5CFF",
        900: "#6200F5",
      },
      secondary: {
        400: "#ADAFB8",
        500: "#858794",
        600: "#33374D",
        700: "#1F2A3D",
        800: "#0E1724",
      },
    },
  });

  ReactGA.initialize(process.env.REACT_APP_GA_ID || "");
  console.log(process.env.REACT_APP_GA_ID);

  return (
    <Auth0Provider
      domain="zapperson.us.auth0.com"
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ""}
      redirectUri={process.env.REACT_APP_REDIRECT_URL + "/login"}
      audience="BrStreamersApi"
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Auth0Provider>
  );
}
