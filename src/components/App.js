import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import Stories from '../components/Stories';
import AuthRedirect from '../components/AuthRedirect';
import Login from '../components/Login';
import Compare from "./Compare";
import { useSelector } from 'react-redux';
import Search from './Search';

const App = () => {
  
  const { loggedIn } = useSelector((state) => state.auth);

  const authOnly = (Component) => {
    return loggedIn ? Component : Login;
  }

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/search" component={Search}/>
        <Route path="/compare" component={authOnly(Compare)}/>
        <Route path="/stories" component={authOnly(Stories)} />
        <Route path="/login" component={AuthRedirect} />
      </Switch>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
