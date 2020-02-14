/* eslint-disable no-unused-vars */
import React from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';
import { User } from '../../../types';
import { string } from 'prop-types';

const TopArtists = ({ user_1, user_2, my_id }) => {
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
        <Page background={'white'} numPages={5} pageNum={0}>
            <div className="TopArtists-Page">
                <div className="TopArtists-Title">
                    {user_1.id == my_id && user_2.id != my_id &&
                        <h1>you and {user_2.display_name} share</h1>}
                    {user_2.id == my_id && user_1.id != my_id &&
                        <h1>{user_1.display_name} and you share</h1>}
                    {user_2.id == my_id && user_1.id == my_id &&
                        <h1>you and you share</h1>}
                    {user_2.id != my_id && user_1.id != my_id &&
                        <h1>{user_1.display_name} and {user_2.display_name} share</h1>}
                    <h2 className="TopArtists-TextShadow">top artists</h2>
                </div>
                <div className="TopArtists-List">
                    {user_1.id == my_id &&
                        <h1 className="right-align">you</h1>}
                    {user_1.id != my_id &&
                        <h1 className="right-align">{user_1.display_name}</h1>}
                    {user1TruncatedArtists.map((artist) => {
                        if (shared.indexOf(artist) < 0) {
                            return <h2 className="right-align" key={artist}>{artist}</h2>;
                        } else {
                            return <h2 className="right-align" key={artist}><mark>{artist}</mark></h2>;
                        }   
                    })}
                </div>
                <div className="TopArtists-List">
                    {user_2.id == my_id &&
                        <h1 className="left-align">you</h1>}
                    {user_2.id != my_id &&
                        <h1 className="left-align">{user_2.display_name}</h1>}
                    {user2TruncatedArtists.map((artist) => {
                         if (shared.indexOf(artist) < 0) {
                            return <h2 className="left-align" key={artist}>{artist}</h2>;
                        } else {
                            return <h2 className="left-align" key={artist}><mark>{artist}</mark></h2>;
                        }  
                    })}
                </div>
                {/* <div id="arrow"/> */}
            </div>

                    <div id="popup-background">
                        <div id="popup" onClick={() => handleClick()}>
                        </div>
                    </div>
            </Page>
    )
}

TopArtists.propTypes = {
    user_1: User,
    user_2: User,
    my_id: string,
}

export default TopArtists;