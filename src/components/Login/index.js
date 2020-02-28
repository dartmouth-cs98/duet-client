/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Page from '../Page';
import DuetLogo from '../DuetLogo';
import Button from '../Button';
import Loading from '../Loading';
import * as types from '../../constants/actionTypes';
import { fetchMeData, fetchUser2 } from '../../actions';
import { getToken } from '../../utils/tokenUtils';
import { useDispatch } from 'react-redux';
import { func } from 'prop-types';
import { joinGroup } from '../../utils/backendUtils';

const LOGO_HEIGHT = 150;
const LOGO_WIDTH = 240;
const BUTTON_WIDTH = 250;

const Login = ({ history, match }) => {

    const dispatch = useDispatch();
    const spotify_token = getToken();
    const [loggingIn, setLoggingIn] = useState(!!spotify_token);
    
    useEffect(() => {
        const pathname = history.location.pathname;
        if (pathname.substring(0, 6) == '/join/') {
            dispatch(fetchUser2(match.params.id)).then((user) => {
                localStorage.setItem("referrer", JSON.stringify(user));
            })  
        } 
        else if (pathname.substring(0, 11) == '/joingroup/') {
            dispatch(fetchUser2(match.params.id)).then((user) => {
                localStorage.setItem("referrerGroup", JSON.stringify(user));
            })  
        } 

        if (loggingIn) {
            const referrer = JSON.parse(localStorage.getItem('referrer'));
            const referrerGroup = JSON.parse(localStorage.getItem('referrerGroup'));
            dispatch(fetchMeData(spotify_token, "medium_term")).then((user) => {  
                if (referrer || referrerGroup ) {
                    dispatch({ type: types.FETCH_USER_2, user: referrer ? referrer : referrerGroup });
                    localStorage.removeItem('referrer');
                    localStorage.removeItem('referrerGroup');
                    if (referrerGroup) joinGroup(referrerGroup.id, user.id);
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
    
    const [showPopup, setShowPopup] = useState(false);

    const renderPopup = () => {
        return (
            <div id="PopupBackground">
                <p>We are a group of college people doing stuff. We are not professionals so don&apos;t treat us as such. Thanks for clicking this teeny button.</p>
                <p id="close">click anywhere to close</p>
            </div>
        )
    }

    const handleClick = () => {
        if (showPopup) {
            setShowPopup(!showPopup);
        } 
    }

    return (
        <Page background={'#212034'}>
            
        { loggingIn ? <Loading>{`${spotify_token ? 'logging you in...' : 'connecting to spotify...'}`}</Loading> :
            
                <div className="Login-Page">
                    <div className="Login-Button-Logo-Info">
                        <DuetLogo width={LOGO_WIDTH} height={LOGO_HEIGHT} />
                        <Button onClick={handleLogin} width={BUTTON_WIDTH}>login with spotify</Button>
                        <h2 className="Login-description">what duet does: <br/> visually compares your music taste with others generates playlists to mix your taste with others</h2>
                    </div>
                    <button className="Login-LearnMore" onClick={() => setShowPopup(!showPopup)}>learn more</button>
                    { showPopup &&
                        <div className="popup" onClick={handleClick}>
                            {renderPopup()}
                        </div>
                    }
                </div> 
            }
        </Page>
    )
}

Login.propTypes = {
    jumpToPage: func
}

export default Login;