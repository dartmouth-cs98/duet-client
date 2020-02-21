import React, { useEffect } from 'react';
import Loading from '../Loading';
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
    
    useEffect(() => {
        const params = getHashParams();
        const spotify_token = params.access_token;
        storeToken(spotify_token);
        history.push('/');
    }, [])
 
    return (
        <Loading>logging you in...</Loading>
    );
};

LoadingLoginPage.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
}

export default LoadingLoginPage;
