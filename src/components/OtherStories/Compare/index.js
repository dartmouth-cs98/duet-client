/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Page from '../../Page';

const Compare = ({jumpToPage}) => {

    const [showPopup, setShowPopup] = useState(false);

    const renderPopup = () => {
        return (
            <div id="PopupBackground">
                <button id="close" onClick={() => handleClick()}>x</button>
                <h3>name your group</h3>
                <input></input>
                <button onClick={() => handleClick()}>create</button>
            </div>
        )
    }

    const handleClick = () => {
        if (showPopup) {
            setShowPopup(!showPopup);
        } 
    }

    return (
        <Page background={'lightblue'}>
            <div id="background"/>
            <div id="content">
                <h3>compare...</h3>
                <input></input>
                <h3>to...</h3>
                <input></input>
                <button onClick={() => jumpToPage(3)}>go!</button>
                <button id="smallLink" onClick={() => setShowPopup(!showPopup)}>or create a group</button>
            </div>
            
            { showPopup &&
                <div className="popup">
                    {renderPopup()}
                </div>
            }
        </Page>
    )
}

export default Compare;