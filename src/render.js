import React from 'react';
import ReactDOMServer from 'react-dom/server';

import HtmlWithBody from './html'
import { ReactProvider } from './context';
import App from './app';

/* 
 * The app needs to generate the entire page html and hence
 * give control of the initial page to the jsx engine
 */
function AppContainer(props) {
  return (
    <HtmlWithBody global={{hydrate: false, ...props}}>
      <div id="root">
        <ReactProvider>
          <App hydrate={false}/>
        </ReactProvider>
      </div>
    </HtmlWithBody>
  );
}

export default function Render(props) {
  const content = ReactDOMServer.renderToString(
    <AppContainer {...props} />
  );
  if (content == null) {
    return null;
  }
  return '<!DOCTYPE html>' + content.replace(/%PUBLIC_URL%/g, '/webmachine/public');
}
