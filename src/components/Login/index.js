/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Page from '../Page';
import DuetLogo from '../DuetLogo';
import Button from '../Button';
import Loading from '../Loading';
import { fetchMeData, fetchUser2 } from '../../actions';
import { getToken } from '../../utils/tokenUtils';
import { useDispatch } from 'react-redux';
import { func } from 'prop-types';
import { joinGroup, getNumUsers } from '../../utils/backendUtils';
import Popup from '../Popup';
import NumberFormat from 'react-number-format';

const LOGO_HEIGHT = 150;
const LOGO_WIDTH = 240;
const BUTTON_WIDTH = 250;

const Login = ({ history, match }) => {

    const dispatch = useDispatch();
    const spotify_token = getToken();
    const [loggingIn, setLoggingIn] = useState(!!spotify_token);
    const [stats, setStats] = useState(null);
    
    useEffect(() => {

        getNumUsers().then(setStats);
        const pathname = history.location.pathname;
        if (pathname.substring(0, 6) == '/join/') {
            localStorage.setItem("referrer", decodeURI(match.params.id));
        } 
        else if (pathname.substring(0, 11) == '/joingroup/') {
            localStorage.setItem("referrerGroup", decodeURI(match.params.id));
        } 

        if (loggingIn) {
            const referrer = localStorage.getItem('referrer');
            const referrerGroup = localStorage.getItem('referrerGroup');
            dispatch(fetchMeData(spotify_token, "medium_term")).then((response) => {  
                const { user, token } = response;
                if (referrer || referrerGroup ) {
                    dispatch(fetchUser2(referrer ? referrer : referrerGroup, token))
                    localStorage.removeItem('referrer');
                    localStorage.removeItem('referrerGroup');
                    if (referrerGroup) joinGroup(referrerGroup, user.id, token);
                    setTimeout(() => history.push('/stories', { isComparing: true, isMixing: true }), 2000)
                } 
                else if (pathname.substring(0, 5) == '/join') {
                    localStorage.removeItem('referrer');
                    localStorage.removeItem('referrerGroup');
                    setTimeout(() => history.push('/stories', { isComparing: true, isMixing: true }), 2000)
                } else {
                    setTimeout(() => history.push('/compare'), 2000);
                }
            })
        }
    }, [])

    const handleLogin = () => { 
        setLoggingIn(true);
        setTimeout(() => window.open(process.env.AUTH_SERVER_URL, "_self"), 2000);
    }

    return (
        <Page background={'#212034'}>
   
            { loggingIn ? <Loading>{`${spotify_token ? 'logging you in...' : 'connecting to spotify...'}`}</Loading> :
                <>
                    <div className="Login-Page">
                        <div className="Login-Button-Logo-Info">
                            <DuetLogo width={LOGO_WIDTH} height={LOGO_HEIGHT} />
                            <Button onClick={handleLogin} width={BUTTON_WIDTH}>login with spotify</Button>
                            <h2 className="Login-description">what duet does: <br/> visually compares your music taste with others generates playlists to mix your taste with others</h2>
                            { stats && 
                                <>
                                    <h3 className="Login-User-count">users of duet: <NumberFormat value={stats.users} displayType='text' thousandSeparator={true} /></h3>
                                    <h3 className="Login-User-count">groups of duet: <NumberFormat value={stats.groups} displayType='text' thousandSeparator={true} /></h3>
                                </>  
                            }
                        </div>
                    </div> 
                    <Popup/>
                </>  
            }         
        </Page>
    )
}

Login.propTypes = {
    jumpToPage: func
}

export default Login;