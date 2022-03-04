
import ReactGA from "react-ga";
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });


  return (
    <>
      
    </>
  );
}

export default App;
