import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import ReactGA from "react-ga";
import theme from "./theme";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./hooks/useAuth";

ReactGA.initialize(process.env.REACT_APP_GA_ID || "");

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="zapperson.us.auth0.com"
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ""}
      redirectUri={process.env.REACT_APP_REDIRECT_URL}
      audience="BrStreamersApi"
    >
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ChakraProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

reportWebVitals();
