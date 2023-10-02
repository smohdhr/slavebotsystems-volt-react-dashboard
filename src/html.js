import React from 'react';

/* 
 * The app needs to generate the entire page html and hence
 * give control of the initial page to the jsx engine
 */
export default function HtmlWithBody(props) {

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://slavebotsystems.com/dashboard/volt-react" />
        <meta charSet="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="%PUBLIC_URL%/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16x16.png" />
        <link rel="stylesheet" type="text/css" href="/build/client.css" />
        <link rel="manifest" href="%PUBLIC_URL%/site.webmanifest" />
        <link rel="mask-icon" href="%PUBLIC_URL%/safari-pinned-tab.svg" color="#262b40" />
        <meta name="msapplication-TileColor" content="#ff0000" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Volt React Dashboard is a free and open source admin dashboard template powered by React.js and Bootstrap 5 featuring over 100 UI elements, plugins, and example pages." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://slavebotsystems.com/volt-react-dashboard" />
        <meta property="og:title" content="Volt React Dashboard" />
        <meta property="og:description" content="Volt React Dashboard is a free and open source admin dashboard template powered by React.js and Bootstrap 5 featuring over 100 UI elements, plugins, and example pages." />
        <meta property="og:image" content="/assets/img/thumbnail.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://slavebotsystems.com/volt-react-dashboard" />
        <meta property="twitter:title" content="Volt React Dashboard" />
        <meta property="twitter:description" content="Volt React Dashboard is a free and open source admin dashboard template powered by React.js and Bootstrap 5 featuring over 100 UI elements, plugins, and example pages." />
        <meta property="twitter:image" content="/assets/img/thumbnail.png" />

        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <title>Volt React Dashboard</title>
      </head>

      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        {props.children}
        <script src="/build/client.mjs" type="module" defer></script>
      </body>
    </html>
  );
}
