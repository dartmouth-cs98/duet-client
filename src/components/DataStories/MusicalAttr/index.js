/* eslint-disable react/prop-types */
import React from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';

const PercentDifference = ({ comparePhrase, user1Attribute, user2Attribute, user2Name }) => {
    const difference = user2Attribute - user1Attribute;
    const average = (user1Attribute + user2Attribute) / 2;
    const percentageDifference = (Math.round((difference / average) * 100) / 100) * 100;
    const userIsGreater = percentageDifference > 0;

    const leftWidth = userIsGreater ? '100%' : `${50 * (Math.abs(percentageDifference) / 100)}%`;
    const rightWidth = !userIsGreater ? '100%' : `${50 * (Math.abs(percentageDifference) / 100)}%`;

    const leftOpacity = userIsGreater ? '0' : '1';
    const rightOpacity = !userIsGreater ? '0' : '1';

    const justifyContent = userIsGreater ? 'flex-start' : 'flex-end';

    return (
        <div className="MusicalAttr-PercentDifference" style={{justifyContent: justifyContent, paddingTop: '0px' }}>
            <div style={{ display: 'flex', flexDirection : 'column', alignItems: 'flex-end', width: '50vw', paddingRight: '20px', boxSizing: 'content-box'}}>
                <h1 className="MusicalAttr-Description" style={{ fontSize: '100%', color: '#212034', width: '100%', textAlign: 'right', opacity: leftOpacity}}>
                    your music is {-percentageDifference}% {comparePhrase} than {user2Name}&apos;s
                </h1>
                <div 
                className="MusicalAttr-Box-left"
                style={{ width: leftWidth, opacity: leftOpacity }}
                />
            </div>
            <div style={{ display: 'flex', flexDirection : 'column', alignItems: 'flex-start', width: '50vw', paddingLeft: '20px', boxSizing: 'content-box'}}>
                <h1 className="MusicalAttr-Description" style={{ fontSize: '100%', color: '#E5277B', width: '100%', textAlign: 'left', opacity: rightOpacity}}>
                    {user2Name}&apos;s music is {percentageDifference}% {comparePhrase} than yours
                </h1>
                <div 
                className="MusicalAttr-Box-right"
                style={{ width: rightWidth, opacity: rightOpacity }}
                />
            </div>
        </div>
    )
}

const MusicalAttr = ({ user_1, user_2 }) => {
    
    const { taste: user1Taste } = user_1;
    const { taste: user2Taste, display_name: user2Name } = user_2;

    const saveScreen = () => {
        html2canvas(document.body).then(function(canvas) {
            var canvasData = canvas.toDataURL();
            document.getElementById("popup-background").style.zIndex = "99";
            document.getElementById("popup").innerHTML = '<img src="' + canvasData + '">';
        })
    }

    const handleClick = () => {
        document.getElementById("popup-background").style.zIndex = "-1";
        document.getElementById("popup").innerHTML = "";
    }

    const attributes = [
        {
            name: 'valence',
            comparePhrase: 'happier',
        },
        {
            name: 'danceability',
            comparePhrase: 'more danceable',
        },
        {
            name: 'acousticness',
            comparePhrase: 'more acoustic',
        },
        {
            name: 'energy',
            comparePhrase: 'more energetic',
        },
        {
            name: 'speechiness',
            comparePhrase: 'speechier',
        },
    ]
  
    return (
        <Page background={'white'} numPages={6} pageNum={3}>
            <button id="share" onClick={() => saveScreen()}>...</button>

            <div id="popup-background">
                <div id="popup" onClick={() => handleClick()}>
                </div>
            </div>
            <div className="MusicalAttr-Boxes">
                <h1 className="MusicalAttr-Divider">
                \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
                </h1>
                {attributes.map(({name, comparePhrase}) => {
                    return ( 
                        <PercentDifference 
                            key={name} 
                            comparePhrase={comparePhrase} 
                            user1Attribute={user1Taste[name]} 
                            user2Attribute={user2Taste[name]} 
                            user2Name={user2Name}
                        />
                    )
                })}
            </div>
        </Page>
    )
}

export default MusicalAttr;