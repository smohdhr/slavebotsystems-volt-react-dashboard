import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from '../routes';

// pages
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";
import LoginError from "./examples/LoginError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";

import "../scss/volt.scss"

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }
  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      rest.login &&
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
      || <Redirect to={Routes.Signin.path} />
    )}
    />
  );
};

export default function (options) {
  const [isLoggedIn, setLoggedIn] = useState(null);
  //const [counter, setCounter] = useState(0);

  const loginErrorComponent = Signin;

  fetch("/db/user-token")
  .then((response) => {
    let promisejson = response.json();
    return promisejson;
  })
  .then((data) => {
    console.log(`data = ${data.userToken}`);
    const token = localStorage.getItem('user-token');
    setLoggedIn(token === data.userToken);
  });

  return (
    <Switch>
      <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} />
      <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
      <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
      <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
      <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
      <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
      <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
      <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />
      <RouteWithLoader exact path={Routes.LoginError.path} component={LoginError} />

      {/* pages */}
      <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} login={isLoggedIn} />

      {/* components */}
      <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} login={isLoggedIn} />

      {/* documentation */}
      <RouteWithSidebar exact path={Routes.DocsOverview.path} component={DocsOverview} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.DocsDownload.path} component={DocsDownload} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.DocsQuickStart.path} component={DocsQuickStart} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.DocsLicense.path} component={DocsLicense} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.DocsFolderStructure.path} component={DocsFolderStructure} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.DocsBuild.path} component={DocsBuild} login={isLoggedIn} />
      <RouteWithSidebar exact path={Routes.DocsChangelog.path} component={DocsChangelog} login={isLoggedIn} />

      <Redirect to={Routes.NotFound.path} />
    </Switch>
  );
}
