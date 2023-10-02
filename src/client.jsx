import App from './app';

function hydrate() {
  let elem = document.getElementById("root");
  let loc = elem.getAttribute("location");
  let app = React.createElement("App", <App location={loc} hydrate={true} />);
  ReactDOM.hydrate(app, elem);
}
hydrate();
