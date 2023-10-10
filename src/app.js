import React from 'react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

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
      <HomePage hydrate={options.hydrate} />
    </QueryClientProvider>
  );
}

/* 
 * The app needs to generate the entire page html and hence
 * give control of the initial page to the jsx engine
 */
export default function App(options) {
  const location = options.location;
  if (options.hydrate === true) {
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
