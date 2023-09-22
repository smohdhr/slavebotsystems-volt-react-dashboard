function hydrate(loc) {
  let react = require('react');
  let reactDOM = require('react-dom');
  let app = react.createElement('App');
  app.setAttribute('location', loc);
  app.setAttribute('hydrate', true);
  reactDOM.hydrateRoot(document.getElementById("root"), app);
}
