import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

var module = {
  exports: {}
};
global.module = module;

function hydrate() {
  let elem = document.getElementById("root");
  let loc = elem.getAttribute("location");
  ReactDOM.hydrate(<App location={loc} hydrate={true} />, elem);
}
hydrate();
