/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState } from 'react';
import Page from '../Page';
import DuetLogo from '../DuetLogo';
import Button from '../Button';
import { fetchMeData } from '../../actions';
import { getToken } from '../../utils/tokenUtils';
import { useDispatch } from 'react-redux';
import { func } from 'prop-types';

const LOGO_HEIGHT = 150;
const LOGO_WIDTH = 240;
const BUTTON_WIDTH = 250;

const Login = ({ history }) => {

    const dispatch = useDispatch();
    const token = getToken();

    const handleLogin = () => { 
        if (token)  {
            dispatch(fetchMeData(token, "medium_term"));
            history.push("/compare")
        }
        else {
            window.open(process.env.AUTH_SERVER_URL, "_self");
        }
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

   const toggleFullScreen = () => {
        console.log('line 49')
        var doc = window.document;
        var docEl = doc.documentElement;
        
        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            requestFullScreen.call(docEl);
            console.log('line 58');
        }
        else {
            console.log('line 61');
            cancelFullScreen.call(doc);
        }
    }

    return (
        <Page background={'#212034'}>
            <div className="Login-Page">
                <div className="Login-Button-Logo-Info">
                    <DuetLogo width={LOGO_WIDTH} height={LOGO_HEIGHT} />
                    <Button onClick={handleLogin} width={BUTTON_WIDTH}>login with spotify</Button>
                    <h2 className="Login-description">what duet does: <br/> visually compares your music taste with others generates playlists to mix your taste with others</h2>
                </div>
                <button className="Login-LearnMore" oncClick={toggleFullScreen}>Go fullscreen</button>
                <button className="Login-LearnMore" onClick={() => setShowPopup(!showPopup)}>learn more</button>
                { showPopup &&
                    <div className="popup" onClick={handleClick}>
                        {renderPopup()}
                    </div>
                }
            </div>
        </Page>
    )
}

Login.propTypes = {
    jumpToPage: func
}

export default Login;