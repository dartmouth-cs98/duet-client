import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import AuthRedirect from './AuthRedirect';
import Story from './Story';

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
