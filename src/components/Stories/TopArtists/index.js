import React from 'react';
import Page from '../../Page';
import Popup from '../../Popup';
import { User } from '../../../types';
import { string } from 'prop-types';
import { TopArtistsDescription } from '../../../constants/helpInfo';

const { PAGE_INFO, PAGE_NAME } = TopArtistsDescription;
const NUM_ARTISTS_TO_DISPLAY = 8;

const TopArtists = ({ user_1, user_2, my_id }) => {


    const user1TruncatedArtists = user_1.topArtists.slice(0, NUM_ARTISTS_TO_DISPLAY).map((artist) => artist.name);
    const user2TruncatedArtists = user_2.topArtists.slice(0, NUM_ARTISTS_TO_DISPLAY).map((artist) => artist.name);

    let shared = [];

    user1TruncatedArtists.forEach((artist) => {
        if (user2TruncatedArtists.indexOf(artist) >= 0) {
            shared = [...shared, artist];
        }
    })

    var share = ""

    if (shared.length > 0) {
        share = " share "
    } else {
        share = " don't share "
    }

    return (
        <Page background={'#212034'} showOverlay>
            <div className="TopArtists-Page">
                <div className="TopArtists-Title">
                    {user_1.id == my_id && user_2.id != my_id &&
                        <h1>you and {user_2.display_name} {share}</h1>}
                    {user_2.id == my_id && user_1.id != my_id &&
                        <h1>{user_1.display_name} and you {share}</h1>}
                    {user_2.id == my_id && user_1.id == my_id &&
                        <h1>you and you {share}</h1>}
                    {user_2.id != my_id && user_1.id != my_id &&
                        <h1>{user_1.display_name} and {user_2.display_name} share</h1>}
                    <h2 className="TopArtists-TextShadow">Top Artists</h2>
                </div>
                <div className="TopArtists-List">
                    {user_1.id == my_id &&
                        <h1 className="right-align">You</h1>}
                    {user_1.id != my_id &&
                        <h1 className="right-align">{user_1.display_name}</h1>}
                    {user1TruncatedArtists.map((artist) => {
                        if (shared.indexOf(artist) < 0) {
                            return <h2 className="right-align-t" key={artist}>{artist}</h2>;
                        } else {
                            return <h2 className="right-align-t" key={artist}><mark className="pink">{artist}</mark></h2>;
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
                            return <h2 className="left-align-t" key={artist}><mark className="blue">{artist}</mark></h2>;
                        }  
                    })}
                </div>   
            </div>
            <Popup pageInfo={PAGE_INFO} pageName={PAGE_NAME}/>
        </Page>
    )
}

TopArtists.propTypes = {
    user_1: User,
    user_2: User,
    my_id: string,
}

export default React.memo(TopArtists);