import React from 'react';
import ReactDOMServer from 'react-dom/server';

import HtmlWithBody from './html'
import App from './app';

/* 
 * The app needs to generate the entire page html and hence
 * give control of the initial page to the jsx engine
 */
function AppContainer(props) {
  return (
    <HtmlWithBody> 
      <div id="root">
        <App location={props.location} />
      </div>
    </HtmlWithBody>
  );
}

export default function Render(props) {
  const content = ReactDOMServer.renderToString(
    <AppContainer location={props.location} />
  );
  if (content == null) {
    return null;
  }
  return '<!DOCTYPE html>' + content.replace(/%PUBLIC_URL%/g, '/public');
}
