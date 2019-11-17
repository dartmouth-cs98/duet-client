import React from 'react';
import Sidebar from '../Sidebar';
import NotFoundPage from '../NotFoundPage';
import Me from '../Me';
import Compare from '../Compare';
import { Route, Switch } from "react-router-dom";
import ReactRouterPropTypes from 'react-router-prop-types';

const Dashboard = ({ history }) => { 

  return (
    <div className="Dashboard">
        <Sidebar history={history} />
        <Switch>
            <Route path="/dashboard/me" component={Me} />
            <Route path="/dashboard/compare" component={Compare} />
            <Route component={NotFoundPage} />
        </Switch>
    </div>
  );
};

Dashboard.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
}

export default Dashboard;
