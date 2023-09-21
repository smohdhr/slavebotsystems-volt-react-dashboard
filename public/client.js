function hydrate() {
  let react = require('react');
  let reactDOM = require('react-dom');
  let app = react.createElement('App');
  reactDOM.hydrateRoot(document.getElementById("root"), app);
}
