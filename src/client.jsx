import React from 'react';
import ReactDOM from 'react-dom';
import { ReactProvider } from './context';
import App from './app';

var module = {
  exports: {}
};
global.module = module;

function hydrate() {
  const elem = document.getElementById("root");
  ReactDOM.hydrate(
      <ReactProvider>
        <App hydrate={true} />
      </ReactProvider> 
    , elem);
}
hydrate();
