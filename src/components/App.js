import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import Stories from '../components/Stories';
import AuthRedirect from '../components/AuthRedirect';
import Login from '../components/Login';
import InfoAndCompare from "./InfoAndCompare";
import { useSelector } from 'react-redux';
import Fullscreen from "react-full-screen";


const App = () => {
  
  const { loggedIn } = useSelector((state) => state.auth);

  const [isFull, setIsFull] = useState(false);

  const authOnly = (Component) => {
    return loggedIn ? Component : Login;
  }

  const goFull = () => {
    setIsFull(true);
  }

  return (
    <div>
      <button style={{ color: 'white'}}onClick={goFull}>
          Go Fullscreen
      </button>
      <Fullscreen
          enabled={isFull}
          onChange={isFull => setIsFull(isFull)}
        >
          <div style={{ width: '100%', height: '100%', background: 'green'}}></div>
      </Fullscreen>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/info-compare" component={authOnly(InfoAndCompare)}/>
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
