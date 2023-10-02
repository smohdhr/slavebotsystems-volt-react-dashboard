import React from 'react';

import HomePage from "./pages/HomePage.js";
import ScrollToTop from "./components/ScrollToTop.js";
import { StaticRouter, BrowserRouter } from 'react-router-dom';

/* 
 * The app needs to generate the entire page html and hence
 * give control of the initial page to the jsx engine
 */
export default function App(options) {
  if (options.hydrate === true) {
    return (
      <BrowserRouter location={options.location}>
        <ScrollToTop />
        <HomePage hydrate={true} />
      </BrowserRouter>
    );
  }
  else {
    return (
      <StaticRouter location={options.location}>
        <ScrollToTop />
        <HomePage hydrate={false} />
      </StaticRouter>
    );
  }
}
