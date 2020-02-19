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

const Login = ({ history }) => {

    const dispatch = useDispatch();
    const token = getToken();

    const handleLogin = () => { 
        if (token)  {
            dispatch(fetchMeData(token, "medium_term"));
            history.push("/info-compare")
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

    return (
        <Page background={'#212034'}>
            <div className="Login-Page">
                <div className="Login-Button-Logo-Info">
                    <DuetLogo/>
                    <Button onClick={handleLogin}>login with spotify</Button>
                    <h2 className="Login-description">what duet does: <br/> visually compares your music taste with others generates playlists to mix your taste with others</h2>
                </div>
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