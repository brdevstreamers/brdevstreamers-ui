import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import ReactGA from "react-ga";
import { Auth0Provider } from "@auth0/auth0-react";

// 2. Call `extendTheme` and pass your custom values
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
      600: '#33374D',
      700: '#1F2A3D',
      800: '#0E1724',
    }
  }
});

ReactGA.initialize(process.env.REACT_APP_GA_ID || "");
console.log(process.env.REACT_APP_GA_ID);



ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="zapperson.us.auth0.com"
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ""}
      redirectUri={process.env.REACT_APP_REDIRECT_URL + '/login'}
      audience="BrStreamersApi"
      
    >
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
