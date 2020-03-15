/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser1 } from '../../actions';
import * as types from '../../constants/actionTypes';

const Restart = ({ history }) => {

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { my_id } = useSelector((state) => state.users);

    const handleClick = () => {
        dispatch({ type: types.CLEAR_USERS })
        dispatch(fetchUser1(my_id, token))
        history.push('/compare');
    }
    return (
        <div onClick={handleClick} className="Restart-Button">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 45 45"
            >
                <ellipse cx="25" cy="25.22" fill="#EEE" rx="20" ry="19.78"></ellipse>
                <ellipse
                cx="25"
                cy="25.22"
                fill="#212034"
                rx="17.5"
                ry="17.308"
                ></ellipse>
                <path
                fill="#212034"
                d="M0 0H13.366V16.917H0z"
                transform="rotate(-88.316 14.818 14.298) skewX(.037)"
                ></path>
                <path
                fill="#EEE"
                d="M6.352 17.695l2.982-13.97L20.335 14.15 6.352 17.695z"
                ></path>
            </svg>
        </div>
    );
  }
  

const Popup = ({ pageInfo, pageName, history, showRestart }) => {

    const [showPopup, setShowPopup] = useState(false);

    return (
        <>
            { showPopup ?  
                <div id="PopupOuter">
                    <div id="blur" onClick={() => setShowPopup(!showPopup)}></div>
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
                        <h1>Info</h1>   
                        { pageInfo && pageName && 
                            <Collapsible className="topHeader" openedClassName="topHeader" trigger={`About ${pageName}`} open="true">
                                <h2> What am I looking at?</h2>
                                <p>{pageInfo}</p>
                            </Collapsible>
                        } 
                        <Collapsible className="topHeader" openedClassName="topHeader" trigger="About Duet" open="true">
                            <Collapsible className='innerCollapsible' openedClassName='innerCollapsible' trigger="What information does Duet have?">
                                <p>Duet only stores information given to us from Spotify: your username and your top artists/songs- that’s it! As much as we would like your credit card information or email and password- Spotify’s authentication process prevents us. Dang!</p>
                            </Collapsible>
                            <Collapsible className='innerCollapsible' openedClassName='innerCollapsible' trigger="How does Duet work?">
                                <p>Once you’ve logged in through Spotify’s website and selected a person or friend to compare with, Duet receives the top fifty artists/songs from the past six months of yourself and whoever you chose to compare with. From there, using Spotify’s public api, we look at all the metadata of your music to show how it contrasts! We can even generate playlists to blend your two music tastes like a tropical smoothie on a hot day. Neato!</p>
                            </Collapsible>
                            <Collapsible className='innerCollapsible' openedClassName='innerCollapsible' trigger="Who made Duet?">
                                <p>Duet was made by a group of college seniors as a capstone project. We would have been something that cures global warming (easy) or systemic racism and misogyny (child’s play), but unfortunately we were bound by an ancient form of magic known as onomancy, the arcane school of names, to Xolgoth- Demon prince of the seventh layer of hell/Duet marketing lead. Group members: Ally Mahmoud, Emma Langfitt, Himadri Narasimhamurthy, Linford Zirangwa, Nic Bergen, and Zac Gottschall</p>
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
                :
                <div className="Popup-Button-Container">
                    {showRestart && <Restart history={history}/>}
                    <h1>duetwith.me</h1>
                    <div className="Popup-Button" onClick={() => setShowPopup(!showPopup)}><p>?</p></div>
                </div>
             }
        </>
    )
}

export default Popup;