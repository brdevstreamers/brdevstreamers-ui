import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"
import ReactGA from 'react-ga';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    primary: {
      500: "#C299FF",
      600: "#B685FF",
      700: "#A970FF",
      800: "#9D5CFF",
      900: "#6200F5"
      
    },
  },
})

ReactGA.initialize(process.env.REACT_APP_GA_ID || '');


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
