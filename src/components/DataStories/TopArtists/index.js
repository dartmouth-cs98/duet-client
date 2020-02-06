/* eslint-disable react/prop-types */
import React from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';

const TopArtists = ({ user_1, user_2 }) => {
    const NUM_ARTISTS_TO_DISPLAY = 8;

    const user1TruncatedArtists = user_1.topArtists.slice(0, NUM_ARTISTS_TO_DISPLAY).map((artist) => artist.name);
    const user2TruncatedArtists = user_2.topArtists.slice(0, NUM_ARTISTS_TO_DISPLAY).map((artist) => artist.name);
    let shared = [];

    user1TruncatedArtists.forEach((artist) => {
        if (user2TruncatedArtists.indexOf(artist) >= 0) {
            shared = [...shared, artist];
        }
    })

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

    return (
        <Page background={'white'} numPages={6} pageNum={0}>
            <div className="TopPage">
                <div className="title"> 
                    <h1>You and Sig Ep share</h1>
                    <div id="topArtists"/>
                </div>
                <div className="yourArtists">
                    <h2>You</h2>
                    {user1TruncatedArtists.map((artist) => {
                        if (shared.indexOf(artist) < 0) {
                            return <h1 key={artist}>{artist}</h1>;
                        } else {
                            return <h1 key={artist}><mark>{artist}</mark></h1>;
                        }   
                    })}
                </div>
                <div className="theirArtists">
                    <h2>Sig Ep</h2>
                    {user2TruncatedArtists.map((artist) => {
                         if (shared.indexOf(artist) < 0) {
                            return <h1 key={artist}>{artist}</h1>;
                        } else {
                            return <h1 key={artist}><mark>{artist}</mark></h1>;
                        }  
                    })}
                </div>
                <div id="arrow"/>
            </div>

            <button id="share" onClick={() => saveScreen()}>...</button>

            <div id="popup-background">
                <div id="popup" onClick={() => handleClick()}>
                </div>
            </div>
        </Page>
    )
}

export default TopArtists;