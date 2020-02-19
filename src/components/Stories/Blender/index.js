/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Page from '../../Page';
import { useSelector } from 'react-redux';
import { User } from '../../../types';
import { string, func } from 'prop-types';
import { getRecommendations, createPlaylist } from '../../../utils/playlistGenerator';
import _ from 'lodash';
import Slider from './Slider';
import Popup from '../../Popup';

const PAGE_NAME = "Music Taste Mixer";
const PAGE_INFO = "This is the information about Music Taste Mixer";

const Blender = ({ user_1, user_2, my_id, setSwipeDisable }) => {

    const { spotify_token } = useSelector((state) => state.auth);

    const user1Name = user_1.id == my_id ? 'You': user_1.display_name;
    const user2Name = user_2.display_name;

    const { taste: user1Taste } = user_1;
    const { taste: user2Taste } = user_2;

    const ATTRIBUTE_DEFAULT = [50];
    const SLIDER_HEIGHT = 90;
    const SLIDER_WIDTH = '80%';
    const [target_valence, setHappiness] = useState(ATTRIBUTE_DEFAULT);
    const [target_acousticness, setAcousticness] = useState(ATTRIBUTE_DEFAULT);
    const [target_danceability, setDanceability] = useState(ATTRIBUTE_DEFAULT);
    const [target_energy, setEnergy] = useState(ATTRIBUTE_DEFAULT);
    const [target_popularity, setTrendiness] = useState(ATTRIBUTE_DEFAULT);

    const sliderObjects = [
        {
            leftLabel: 'Obscure',
            rightLabel: 'Trendy',
            defaultVal: target_popularity,
            updateAttribute: setTrendiness,
        },
        {
            leftLabel: 'Sad',
            rightLabel: 'Happy',
            defaultVal: target_valence,
            updateAttribute: setHappiness,
        },
        {
            leftLabel: 'Synthetic',
            rightLabel: 'Acoustic',
            defaultVal: target_acousticness,
            updateAttribute: setAcousticness
        },
        {
            leftLabel: 'Standy',
            rightLabel: 'Dancey',
            defaultVal: target_danceability,
            updateAttribute: setDanceability,
        },
        {
            leftLabel: 'Relaxed',
            rightLabel: 'Energetic',
            defaultVal: target_energy,
            updateAttribute: setEnergy
        },
    ]

    const generatePlaylist = () => {
        /* seedArtists: user_1's top 3 & user_2's top 2
           targetTaste: average of user_1 and user_2
        */

        // we grab top songs from each + recommmended songs from spotify
        const NUM_RECOMMENDED_SONGS = 10;
        // const NUM_TOP_SONGS_EACH = 5;
        
        const a = Math.floor(Math.random() * 8);
        const b = Math.floor(Math.random() * 8);
        const user1TopArtists = user_1.topArtists.slice(a, a + 3).map((artist) => artist.id);
        const user2TopArtists = user_2.topArtists.slice(b, b + 2).map((artist) => artist.id);
        const seedArtists = [...user1TopArtists, ...user2TopArtists];

        const user1TopTrackUris = []; // _.shuffle(user_1.topTracks).slice(0, NUM_TOP_SONGS_EACH).map((track) => track.uri);
        const user2TopTrackUris = []; //_.shuffle(user_2.topTracks).slice(0, NUM_TOP_SONGS_EACH).map((track) => track.uri);

        const targetTaste = {
            target_valence, target_acousticness, target_danceability, target_energy, target_popularity
        }

        getRecommendations(spotify_token, seedArtists, targetTaste, NUM_RECOMMENDED_SONGS).then((recommendedTracks) => {
            const recommendedTrackUris = recommendedTracks.map((track) => track.uri);
            const trackUris = [ ...user1TopTrackUris, ...user2TopTrackUris, ...recommendedTrackUris ];
            createPlaylist(spotify_token, my_id, `${user_1.display_name} & ${user_2.display_name} collab`, "playlist generated by Duet", trackUris);
        })
    }

    return (
        <Page background={'#212034'}>
            <div>
                <h1 className="Blender-Title-TextShadow">Music Taste Mixer</h1>
                <h2 className="Blender-subtitle">generates and adds a playlist to your Spoitify account that mixes your and Bob’s musical taste to your specifications</h2>
            </div>
            <div className="Blender-Sliders">
                {sliderObjects.map((sliderObject) => {
                    const { leftLabel, rightLabel, updateAttribute, defaultVal } = sliderObject;
                    return (
                        <Slider 
                            key={leftLabel}
                            leftLabel={leftLabel}
                            rightLabel={rightLabel}
                            setSwipeDisable={setSwipeDisable} 
                            updateAttribute={updateAttribute} 
                            defaultVal={[defaultVal]} 
                            height={SLIDER_HEIGHT} 
                            width={SLIDER_WIDTH}
                        />
                    )
                })}
            </div>
            <button className="Blender-Button" onClick={generatePlaylist}>generate mixed playlist</button>
            <Popup pageInfo={PAGE_INFO} pageName={PAGE_NAME}/>
        </Page>
    )
}

export default Blender;

Blender.propTypes = {
    user_1: User,
    user_2: User,
    my_id: string,
    setSwipeDisable: func,
}