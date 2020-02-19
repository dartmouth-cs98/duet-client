import React, { useState } from 'react';
import Page from '../../Page';
import { User } from '../../../types';
import { string } from 'prop-types';
import Collapsible from 'react-collapsible';

const Trendex = ({ user_1, user_2, my_id }) => {
    const { trendex: user1Trendex, display_name: user1Name } = user_1;
    const { trendex: user2Trendex, display_name: user2Name } = user_2;

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
        <Page background={'#212034'} numPages={5} pageNum={1}>
            <div className="Trendex-Page">
                <div className="Trendex-TopSquare">
                    {user1Trendex > user2Trendex && user_1.id == my_id && user_2.id != my_id &&
                        <h1 className="Trendex-Description"><mark>u are trendier than {user2Name}</mark></h1>}
                    {user1Trendex > user2Trendex && user_1.id != my_id && user_2.id != my_id &&
                        <h1 className="Trendex-Description"><mark>{user1Name} is trendier than {user2Name}</mark></h1>}
                    {user1Trendex > user2Trendex && user_1.id != my_id && user_2.id == my_id &&
                        <h1 className="Trendex-Description"><mark>{user1Name} is trendier than u</mark></h1>}
                    {user1Trendex < user2Trendex && user_1.id != my_id && user_2.id != my_id &&
                        <h1 className="Trendex-Description"><mark>{user2Name} is trendier than {user1Name}</mark></h1>}
                    {user1Trendex < user2Trendex && user_1.id == my_id && user_2.id != my_id &&
                        <h1 className="Trendex-Description"><mark>{user2Name} is trendier than u</mark></h1>}
                    {user1Trendex < user2Trendex && user_1.id != my_id && user_2.id == my_id &&
                        <h1 className="Trendex-Description"><mark>u are trendier than {user1Name}</mark></h1>}
                    {user1Trendex == user2Trendex && user_1.id == my_id && user_2.id != my_id &&
                         <h1 className="Trendex-Description"><mark>u and {user2Name} are equally trendy</mark></h1>}
                    {user1Trendex == user2Trendex && user_1.id != my_id && user_2.id == my_id &&
                         <h1 className="Trendex-Description"><mark>{user1Name} and u are equally trendy</mark></h1>}
                    {user1Trendex == user2Trendex && user_1.id == my_id && user_2.id == my_id &&
                         <h1 className="Trendex-Description"><mark>{user1Name} and  are equally trendy</mark></h1>}
                    {user1Trendex == user2Trendex && user_1.id != my_id && user_2.id != my_id &&
                         <h1 className="Trendex-Description"><mark>{user1Name} and {user2Name} equally trendy</mark></h1>}
                    <h2 className="Trendex-Score-T">{user1Trendex}</h2>
                    {user_1.id != my_id && 
                        <h3 className="Trendex-Score-Label">{user1Name}&apos;s trendex</h3>}
                    {user_1.id == my_id && 
                        <h3 className="Trendex-Score-Label">ur trendex</h3>}
                </div>
                <div className="Trendex-Divider">\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\</div>
                <div className="Trendex-BottomSquare">
                    <h2 id="bottom" className="Trendex-Score-B">{user2Trendex}</h2>
                    {user_2.id != my_id && 
                        <h3 className="Trendex-Score-Label">{user2Name}&apos;s trendex</h3>}
                    {user_2.id == my_id && 
                        <h3 className="Trendex-Score-Label">ur trendex</h3>}

                </div>
                <div className="btnDiv">
                    <button onClick={() => setShowPopup(!showPopup)}>?</button>
                </div>

                { showPopup &&
                    <div className="popupInfo">
                        {renderPopup()}
                    </div>
                }
            </div>
        </Page>
    )
}

Trendex.propTypes = {
    user_1: User,
    user_2: User,
    my_id: string,
}

export default Trendex;