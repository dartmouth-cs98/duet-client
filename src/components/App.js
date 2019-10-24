/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from "react-router-dom";
import Home from "./Home"
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import Zac from "./Zac";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="App-NavBar">
          <NavLink exact to="/" >Home</NavLink>
          <NavLink to="/zac" >Zac</NavLink>
          <NavLink to="/nic" >Nic</NavLink>
          {/* add a NavLink with your name: i.e. <NavLink exact to="/bob" >Bob</NavLink>*/}
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/zac" component={Zac} />
            {/* add a route with your name here */}
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
