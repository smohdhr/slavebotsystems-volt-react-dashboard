import React from 'react';
import ReactDOM from 'react-dom';

import HtmlWithBody from './html.js'
import App from './app.js';

function hydrate(loc) {
  let elem = document.getElementById("root");
  console.log("hydrate called");
  ReactDOM.hydrate(elem, <App location={loc} />);
}

/* 
 * The app needs to generate the entire page html and hence
 * give control of the initial page to the jsx engine
 */
export default function Main(props) {
  return (
    <HtmlWithBody> 
      <div id="root">
        <App location={props.location} />
      </div>
    </HtmlWithBody>
  );
}
