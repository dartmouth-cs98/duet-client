/* eslint-disable import/no-named-as-default */
import { Route, Switch } from "react-router-dom";
// import Login from "./Login";
// import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import AuthRedirect from './AuthRedirect';
// import Survey from './Survey';
// import Dashboard from "./Dashboard";
import Story from './Story';
// import { useSelector } from "react-redux";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Story} />
        <Route path="/login" component={AuthRedirect} />
      </Switch>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
