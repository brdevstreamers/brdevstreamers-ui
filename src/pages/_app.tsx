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
import theme from "../styles/theme";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  

  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID || "");
  console.log(process.env.NEXT_PUBLIC_GA_ID);
  
  return (
    <Auth0Provider
      domain="zapperson.us.auth0.com"
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ""}
      redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URL + "/login"}
      audience="BrStreamersApi"
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Auth0Provider>
  );
}
