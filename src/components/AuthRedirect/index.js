import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../actions';
import ReactRouterPropTypes from 'react-router-prop-types';
import { storeToken } from '../../utils/tokenUtils';

const getHashParams = () => {
    const hashParams = {};
    let e; const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
}

const LoadingLoginPage = ({ history }) => {
    const params = getHashParams();
    const token = params.access_token;
    const dispatch = useDispatch();
    storeToken(token);
    dispatch(fetchUserData(token, "short_term"))
    history.push(token ? '/' : '/');
    
    return (
        <h1>Logging you in...</h1>
    );
};

LoadingLoginPage.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
}

export default LoadingLoginPage;
