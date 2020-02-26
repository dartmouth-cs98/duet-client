/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Page from '../../Page';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import { User } from '../../../types';
import { string, func } from 'prop-types';
import Button from '../../Button';
import RadioButton from './RadioButton';
import { getRecommendations, createPlaylist } from '../../../utils/playlistGenerator';
import _ from 'lodash'; 
import Slider from './Slider';
import Popup from '../../Popup';
import { BlenderDescription } from '../../../constants/helpInfo';
import ModalWrapper from '../../Modal';

const CREATING_PLAYLIST = "CREATING_PLAYLIST";
const PLAYLIST_CREATED = "PLAYLIST_CREATED";
const PLAYLIST_FAILED = "PLAYLIST_FAILED";

const BlenderModal = ({ playlistStatus, toggleModal, playlistLink }) => {
    return (
        <div className="Blender-Modal">
            <div className="Blender-Modal-Close">
                <button onClick={toggleModal}>
                    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16.5 16.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M16.5 1L0.999999 16.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>  
                </button>  
            </div>
            { playlistStatus == CREATING_PLAYLIST && 
                <>  
                    <h1>mixing...</h1>
                    <ReactLoading type={'bars'} color="#fff" />
                </>
            }
            { playlistStatus == PLAYLIST_CREATED && 
                <>
                    <h1>Mixed!</h1>
                    <h2>your new playlist has succesfully been mixed and added to your spoitfy</h2>
                    <Button onClick={() => window.open(playlistLink, "_self")}>listen to mix</Button>
                </>
            }
            { playlistStatus == PLAYLIST_FAILED && 
                <>
                    <h1>playlist failed!</h1>
                    <h2>if the problem persists, email us at duetwastaken@gmail.com and we will investigate the problem!</h2>
                </>
            } 
        </div>
    )
}


const { PAGE_INFO, PAGE_NAME } = BlenderDescription;

const Blender = ({ user_1, user_2, my_id, setSwipeDisable }) => {

    const { spotify_token } = useSelector((state) => state.auth);

    const user1Name = user_1.id == my_id ? 'You': user_1.display_name;
    const user2Name = user_2.display_name;

    const { taste: user1Taste } = user_1;
    const { taste: user2Taste } = user_2;

    const PLAYLIST_LENGTH = 20;
    const ATTRIBUTE_DEFAULT = [50];
    const SLIDER_HEIGHT = 90;
    const SLIDER_WIDTH = '80%';
    
    // ARTIST SETTINGS
    const USER_1 = 'USER_1';
    const USER_2 = 'USER_2';
    const MIX = 'MIX';

    const [target_valence, setHappiness] = useState(ATTRIBUTE_DEFAULT);
    const [target_acousticness, setAcousticness] = useState(ATTRIBUTE_DEFAULT);
    const [target_danceability, setDanceability] = useState(ATTRIBUTE_DEFAULT);
    const [target_energy, setEnergy] = useState(ATTRIBUTE_DEFAULT);
    const [target_popularity, setTrendiness] = useState(ATTRIBUTE_DEFAULT);
    const [adventurousness, setAdventurousness] = useState(ATTRIBUTE_DEFAULT);
    const [showModal, setShowModal] = useState(false);
    const [playlistStatus, setPlaylistStatus] = useState(CREATING_PLAYLIST)
    const [playlistLink, setPlaylistLink] = useState('');
    const [userSetting, setUserSetting] = useState(MIX);

    const toggleModal = () => {
        setShowModal(!showModal);
        if (!showModal) {
            setPlaylistStatus(CREATING_PLAYLIST);
        }
    }

    const generatePlaylist = () => {
        toggleModal();

        const numTopSongs = Math.round((adventurousness[0] / 100) * PLAYLIST_LENGTH);
        const numRecommendedSongs = PLAYLIST_LENGTH - numTopSongs;
        const halfNumTopSongs = Math.round(numTopSongs / 2);

        const numUserTopSongs = (
            userSetting == USER_1 ? { user1: numTopSongs, user2: 0}:
            userSetting == MIX ? { user1: halfNumTopSongs, user2: halfNumTopSongs } :
            userSetting == USER_2 ? { user1: 0, user2: numTopSongs } :
            null
        );

        const numUserTopArtists = (
            userSetting == USER_1 ? { user1: 5, user2: 0 } :
            userSetting == MIX ? { user1: 2, user2: 2 } :
            userSetting == USER_2 ? { user1: 0, user2: 5 } :
            null
        );

        const a = Math.floor(Math.random() * 5);
        const b = Math.floor(Math.random() * 5);
        const user1TopArtists = user_1.topArtists.slice(a, a + numUserTopArtists.user1).map((artist) => artist.id);
        const user2TopArtists = user_2.topArtists.slice(b, b + numUserTopArtists.user2).map((artist) => artist.id);
        const seedArtists = [...user1TopArtists, ...user2TopArtists];


        const user1TopTrackUris = _.shuffle(user_1.topTracks).slice(0, numUserTopSongs.user1).map((track) => track.uri);
        const user2TopTrackUris = _.shuffle(user_2.topTracks).slice(0, numUserTopSongs.user2).map((track) => track.uri);

        const targetTaste = {
            target_valence, target_acousticness, target_danceability, target_energy, target_popularity
        }

        getRecommendations(spotify_token, seedArtists, targetTaste, numRecommendedSongs).then((recommendedTracks) => {
            const recommendedTrackUris = recommendedTracks.map((track) => track.uri);
            const trackUris = _.shuffle([ ...user1TopTrackUris, ...user2TopTrackUris, ...recommendedTrackUris ]);
            createPlaylist(spotify_token, my_id, `${user_1.display_name} & ${user_2.display_name} collab`, "playlist generated by Duet", trackUris)
                .then((href) => {
                    setPlaylistLink(href);
                    setPlaylistStatus(PLAYLIST_CREATED);
                }, () => setPlaylistStatus(PLAYLIST_FAILED));
        }, () => setPlaylistStatus(PLAYLIST_FAILED))
    }

    const sliderObjects = [
        {
            leftLabel: 'Unadventurous',
            rightLabel: 'Adventurous',
            defaultVal: adventurousness,
            updateAttribute: setAdventurousness,
        },
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

    return (
        <ModalWrapper showModal={showModal}>
            <BlenderModal playlistStatus={playlistStatus} toggleModal={toggleModal} playlistLink={playlistLink}/>
            <Page background={'#212034'}>
                <div className="Blender-Page">
                    <div>
                        <h1 className="Blender-Title-TextShadow">Music Taste Mixer</h1>
                        {/* <h2 className="Blender-subtitle">mix an optimal playlist to your liking!</h2> */}
                    </div>
                    <h2 className="Blender-SeedArtist-Label">generate playlist for</h2>
                    <div className="Blender-RadioButtons">
                        <RadioButton 
                            onClick={() => setUserSetting(USER_1)} 
                            enabled={userSetting == USER_1} 
                            label={user_1.display_name}
                        />
                        <RadioButton 
                            onClick={() => setUserSetting(MIX)} 
                            enabled={userSetting == MIX} 
                            label={'both'}
                        />
                        <RadioButton 
                            onClick={() => setUserSetting(USER_2)} 
                            enabled={userSetting == USER_2} 
                            label={user_2.display_name}
                        />
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
                </div>
            </Page>
        </ModalWrapper>
    )
}

export default Blender;

Blender.propTypes = {
    user_1: User,
    user_2: User,
    my_id: string,
    setSwipeDisable: func,
}