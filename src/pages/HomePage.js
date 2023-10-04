import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

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

const errorProtectionEnabled = true;

const RouteWithLoader = ({ component: Component, ...rest }) => {
  var [loaded, setLoaded] = [true, (value) => { }];

  if (errorProtectionEnabled || rest.hydrate) {
    [loaded, setLoaded] = useState(false);
    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 1000);
      return () => clearTimeout(timer);
    }, []);
  }

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  var [loaded, setLoaded] = [true, (value) => { }];

  var [showSettings, setShowSettings] = [false, (value) => { }];
  var toggleSettings = () => { };

  if (errorProtectionEnabled || rest.hydrate) {
    [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 1000);
      return () => clearTimeout(timer);
    }, []);
    const localStorageIsSettingsVisible = () => {
      return localStorage.getItem('settingsVisible') === 'false' ? false : true
    }
    [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

    toggleSettings = () => {
      setShowSettings(!showSettings);
      localStorage.setItem('settingsVisible', !showSettings);
    }
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    />
  );
};

export default (options) => (
  <Switch>
    <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} hydrate={options.hydrate} />
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} hydrate={options.hydrate} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} hydrate={options.hydrate} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} hydrate={options.hydrate} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} hydrate={options.hydrate} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} hydrate={options.hydrate} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} hydrate={options.hydrate} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} hydrate={options.hydrate} />
    <RouteWithLoader exact path={Routes.LoginError.path} component={LoginError} hydrate={options.hydrate} />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} hydrate={options.hydrate} />

    {/* components */}
    <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} hydrate={options.hydrate} />

    {/* documentation */}
    <RouteWithSidebar exact path={Routes.DocsOverview.path} component={DocsOverview} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.DocsDownload.path} component={DocsDownload} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.DocsQuickStart.path} component={DocsQuickStart} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.DocsLicense.path} component={DocsLicense} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.DocsFolderStructure.path} component={DocsFolderStructure} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.DocsBuild.path} component={DocsBuild} hydrate={options.hydrate} />
    <RouteWithSidebar exact path={Routes.DocsChangelog.path} component={DocsChangelog} hydrate={options.hydrate} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
