/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Page from '../../Page';

const Members = ({jumpToPage}) => {

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
        <Page background={'#ffffff'}>
            <div id="Members">
                <h1>These are the members of BLANK</h1>
                <div id="memberlist">
                    <ul>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                    </ul>
                </div>
                <h4>Are you a member of BLANK?</h4>
                <button onClick={() => setShowPopup(!showPopup)}>join the group</button>
                <i className="arrow right" onClick={() => jumpToPage(10)}></i>

                { showPopup &&
                <div className="popup" onClick={handleClick}>
                    {renderPopup()}
                </div>
            }
            </div>
        </Page>
    )
}

export default Members;