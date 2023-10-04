import React, { useState, useEffect, useRef } from 'react';
import { Routes } from "./routes";

import HomePage from "./pages/HomePage.js";
import ScrollToTop from "./components/ScrollToTop.js";
import { StaticRouter, BrowserRouter } from 'react-router-dom';


function AppRoutes(options) {
  return (
    <React.Fragment>
      <ScrollToTop />
      <HomePage hydrate={options.hydrate} />
    </React.Fragment>
  );
}

/* 
 * The app needs to generate the entire page html and hence
 * give control of the initial page to the jsx engine
 */
export default function App(options) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem('user-token');
    setIsLoggedIn(userToken && userToken !== 'undefined');
  }
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  const location = isLoggedIn ? options.location : Routes.LoginError.path;
  if (isLoggedIn && options.hydrate === true) {
    return (
      <BrowserRouter location={location}>
        <AppRoutes hydrate={options.hydrate} />
      </BrowserRouter>
    );
  }
  else {
    return (
      <StaticRouter location={location}>
        <AppRoutes hydrate={options.hydrate} />
      </StaticRouter>
    );
  }
}
