import React from 'react';

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import { StaticRouter } from 'react-router-dom';

/* 
 * The app needs to generate the entire page html and hence
 * give control of the initial page to the jsx engine
 */
export default function App(options) {
  return (
    <StaticRouter location={options.location}>
      <ScrollToTop />
      <HomePage />
    </StaticRouter>
  );
}
