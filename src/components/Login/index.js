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
import Collapsible from 'react-collapsible';

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
            <div id="PopupOuter">
                    <div id="blur"></div>
                    <div className="Popup">
                        <script defer src="https://use.fontawesome.com/releases/v5.12.0/js/all.js"></script>
                        <div className="Popup-Close-Button">
                            <button onClick={() => setShowPopup(!showPopup)}>
                                <svg width="10" height="10" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L16.5 16.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M16.5 1L0.999999 16.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                </svg>  
                            </button>        
                        </div>      
                        <h1>FAQ</h1>    
                        <Collapsible className="topHeader" openedClassName="topHeader" trigger={`What does Duet do?`} open="true">
                            <h2> What am I looking at?</h2>
                            <p>Duet leverages public Spotify API data, meaning your top 50 songs and top 50 artists - nothing else! It then allows you to visually compare your music with the music of other Duet users. Duet also offers a tool for you to mix your music tastes with your friends or with groups.</p>
                        </Collapsible>
                        <Collapsible className="topHeader" openedClassName="topHeader" trigger="About Duet" open="true">
                            <Collapsible className='innerCollapsible' openedClassName='innerCollapsible' trigger="What information does Duet have?">
                                <p>Duet only stores information given to us from Spotify: your username and your top artists/songs- that’s it! As much as we would like your credit card information or email and password- Spotify’s authentication process prevents us. Dang!</p>
                            </Collapsible>
                            <Collapsible className='innerCollapsible' openedClassName='innerCollapsible' trigger="How does Duet work?">
                                <p>Once you’ve logged in through Spotify’s website and selected a person or friend to compare with, Duet receives the top fifty artists/songs from the past six months of yourself and whoever you chose to compare with. From there, using Spotify’s public api, we look at all the metadata of your music to show how it contrasts! We can even generate playlists to blend your two music tastes like a tropical smoothie on a hot day. Neato!</p>
                            </Collapsible>
                            <Collapsible className='innerCollapsible' openedClassName='innerCollapsible' trigger="Who made Duet?">
                                <p>Duet was made by group of collegiate seniors as a capstone project. We would have been something that cures global warming (easy) or systemic racism and misogyny (child’s play), but unfortunately we were bound by an ancient form of magic known as onomancy, the arcane school of names, to Xolgoth- Daedric prince of the seventh layer of hell/Duet marketing lead. </p>
                            </Collapsible>
                            <Collapsible className='innerCollapsible' openedClassName='innerCollapsible' trigger="Why is it mobile only?">
                                <p>Listen here you little shit...</p>
                            </Collapsible>
                            <Collapsible className='innerCollapsible' openedClassName='innerCollapsible' trigger="Contact us">
                                <p>Have any more questions? You can send us emails at duetwastaken@gmail.com.</p>
                            </Collapsible>
                            <Collapsible className='innerCollapsible' openedClassName='innerCollapsible' trigger="Donate!">
                                <p>To keep Duet ad free, we have been paying for hosting out of pocket :((</p>
                            </Collapsible>
                        </Collapsible>
                    </div>
                </div>
        )
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
                    {showPopup &&
                        <div className="popup">
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