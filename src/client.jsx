import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

function hydrate() {
  let elem = document.getElementById("root");
  let loc = elem.getAttribute("location");
  ReactDOM.hydrate(<App location={loc} hydrate={true} />, elem);
}
hydrate();
