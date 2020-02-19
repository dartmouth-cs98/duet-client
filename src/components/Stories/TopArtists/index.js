/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';
import { User } from '../../../types';
import { string } from 'prop-types';
import Collapsible from 'react-collapsible';


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

    const [showPopup, setShowPopup] = useState(false);

    const renderPopup = () => {

        return (
            <div id="PopupBackground">
                <button onClick={() => setShowPopup(!showPopup)}>X</button>                
                <Collapsible className="topHeader" openedClassName="topHeader" trigger="About Top Artists" open="true">
                    <h2> What am I looking at?</h2>
                    <p>This all has to get filled in- maybe other questions headers too idk- doesn’t always have to be “what am i looking at?</p>
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
                        <p>To keep Duet ad free, we have been paying for hosting out of pocket :((  consider donating to my venmo: @nicBerg... jk.... unless?</p>
                    </Collapsible>
                </Collapsible>
            </div>
        )
    }

    const handleInfoClick = () => {
        if (showPopup) {
            setShowPopup(!showPopup);
        } 
    }

    return (
        <Page background={'#212034'} numPages={5} pageNum={0}>
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
                            return <h2 className="right-align-t" key={artist}>{artist}</h2>;
                        } else {
                            return <h2 className="right-align-t" key={artist}><mark className="blue">{artist}</mark></h2>;
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
                            return <h2 className="left-align-t" key={artist}>{artist}</h2>;
                        } else {
                            return <h2 className="left-align-t" key={artist}><mark className="pink">{artist}</mark></h2>;
                        }  
                    })}
                </div>
                
                <div className="btnDiv">
                    <button onClick={() => setShowPopup(!showPopup)}>?</button>
                </div>

                {showPopup &&
                    <div className="popupInfo">
                        {renderPopup()}
                    </div>
                }
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