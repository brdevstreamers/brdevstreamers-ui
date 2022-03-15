import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import ReactGA from "react-ga";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";

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
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

reportWebVitals();
