import React from 'react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getGlobal, setGlobal } from './context';

import HomePage from "./pages/HomePage.js";
import ScrollToTop from "./components/ScrollToTop.js";

function AppRoutes(options) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <HomePage />
    </QueryClientProvider>
  );
}

/* 
 * The app needs to generate the entire page html and hence
 * give control of the initial page to the jsx engine
 */
export default function App(options) {
  if (options.hydrate === true) {
    const location = getGlobal("location");
    const basename = getGlobal("basename");
    setGlobal("hydrate", true);
    return (
      <BrowserRouter basename={basename} location={location}>
        <AppRoutes />
      </BrowserRouter>
    );
  }
  else {
    return (
      <StaticRouter basename={options.basename} location={options.location}>
        <AppRoutes />
      </StaticRouter>
    );
  }
}
