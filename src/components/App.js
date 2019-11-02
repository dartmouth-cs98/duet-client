/* eslint-disable import/no-named-as-default */
import { Route, Switch } from "react-router-dom";
import Home from "./Home"
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import LoadingLoginPage from './LoadingLoginPage';
import Dashboard from './Dashboard';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="App-NavBar">
          {/* <NavLink exact to="/" >Home</NavLink> */}
          {/* <NavLink to="/otherRoute" >Other Route</NavLink> */}
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoadingLoginPage} />
          <Route path="/dashboard" component={Dashboard} />
          {/* <Route path="/otherRoute" component={otherComponent} /> */}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
