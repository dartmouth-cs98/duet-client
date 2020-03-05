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

const PLAYLIST_LENGTH = 20;
const SLIDER_HEIGHT = 90;
const SLIDER_WIDTH = '80%';

export const USER_1 = 'USER_1';
export const USER_2 = 'USER_2';
export const MIX = 'MIX';

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

    //  TODO: make sure attributes are between 0 and 1 when being passed to spotify endpoint

    const getAttributeDefaults = (attributes, setting) => {
        let attributeDefaults = {};
        if (setting == USER_1) {
            attributes.forEach((attribute) => attributeDefaults = { ...attributeDefaults, [attribute]: user1Taste[attribute] * 100 });
        } else if (setting == USER_2) {
            attributes.forEach((attribute) => attributeDefaults = { ...attributeDefaults, [attribute]: user2Taste[attribute] * 100 });
        } else {
            attributes.forEach((attribute) => attributeDefaults = { ...attributeDefaults, [attribute]: ((user2Taste[attribute] + user1Taste[attribute]) / 2) * 100 });
        }
        return attributeDefaults;
    }

    const getTrendinessDefault = (setting) => {
        if (setting == USER_1) {
            return parseInt(user_1.trendex);
        } else if (setting == USER_2) {
            return parseInt(user_2.trendex);
        } else {
            return (parseInt(user_1.trendex) + parseInt(user_2.trendex)) / 2;
        }
    }

    const attributes = ['valence', 'acousticness', 'danceability', 'energy'];
    const initialDefaults = getAttributeDefaults(attributes, MIX);

    const [target_valence, setHappiness] = useState(initialDefaults.valence);
    const [target_acousticness, setAcousticness] = useState(initialDefaults.acousticness);
    const [target_danceability, setDanceability] = useState(initialDefaults.danceability);
    const [target_energy, setEnergy] = useState(initialDefaults.energy);
    const [target_popularity, setTrendiness] = useState((parseInt(user_1.trendex) + parseInt(user_2.trendex)) / 2);
    const [adventurousness, setAdventurousness] = useState(50);
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

    const handleRadioButtons = (setting) => {
        setUserSetting(setting);
        const updatedDefaults = getAttributeDefaults(attributes, setting);
        const { valence, acousticness, danceability, energy } = updatedDefaults;
        setTrendiness(getTrendinessDefault(setting));
        setHappiness(valence);
        setAcousticness(acousticness);
        setDanceability(danceability);
        setEnergy(energy);
    }

    const shuffleSliders = () => {
        setAdventurousness(Math.random()*100);
        setTrendiness(Math.random()*100);
        setHappiness(Math.random()*100);
        setAcousticness(Math.random()*100);
        setDanceability(Math.random()*100);
        setEnergy(Math.random()*100);
    }

    const generatePlaylist = () => {
        toggleModal();

        const numTopSongs = Math.round(((100 - adventurousness) / 100) * PLAYLIST_LENGTH);
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
            target_valence: target_valence / 100,
            target_acousticness: target_acousticness / 100,
            target_danceability: target_danceability / 100,
            target_energy: target_energy / 100,
            target_popularity: target_popularity,
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
            val: adventurousness,
            updateAttribute: setAdventurousness,
        },
        {
            leftLabel: 'Obscure',
            rightLabel: 'Trendy',
            val: target_popularity,
            updateAttribute: setTrendiness,
            dots: { user1: parseInt(user_1.trendex), user2: parseInt(user_2.trendex) }
        },
        {
            leftLabel: 'Sad',
            rightLabel: 'Happy',
            val: target_valence,
            updateAttribute: setHappiness,
            dots: { user1: user1Taste.valence * 100, user2: user2Taste.valence * 100 },
        },
        {
            leftLabel: 'Synthetic',
            rightLabel: 'Acoustic',
            val: target_acousticness,
            updateAttribute: setAcousticness,
            dots: { user1: user1Taste.acousticness * 100, user2: user2Taste.acousticness * 100 },
        },
        {
            leftLabel: 'Standy',
            rightLabel: 'Dancey',
            val: target_danceability,
            updateAttribute: setDanceability,
            dots: { user1: user1Taste.danceability * 100, user2: user2Taste.danceability * 100 },
        },
        {
            leftLabel: 'Relaxed',
            rightLabel: 'Energetic',
            val: target_energy,
            updateAttribute: setEnergy,
            dots: { user1: user1Taste.energy * 100, user2: user2Taste.energy * 100 },
        }
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
                    <h2 className="Blender-SeedArtist-Label">generate playlist from the tastes of</h2>
                    <div className="Blender-RadioButtons">
                        <RadioButton 
                            onClick={() => handleRadioButtons(USER_1)} 
                            enabled={userSetting == USER_1} 
                            label={user_1.display_name}
                        />
                        <RadioButton 
                            onClick={() => handleRadioButtons(MIX)} 
                            enabled={userSetting == MIX} 
                            label={'both'}
                        />
                        <RadioButton 
                            onClick={() => handleRadioButtons(USER_2)} 
                            enabled={userSetting == USER_2} 
                            label={user_2.display_name}
                        />
                    </div>
    
                    <div className="Blender-Sliders">
                        {sliderObjects.map((sliderObject) => {
                            const { leftLabel, rightLabel, updateAttribute, val, dots } = sliderObject;
                            return (
                                <Slider 
                                    key={leftLabel}
                                    leftLabel={leftLabel}
                                    rightLabel={rightLabel}
                                    setSwipeDisable={setSwipeDisable} 
                                    updateAttribute={updateAttribute} 
                                    dots={dots}
                                    userSetting={userSetting}
                                    val={[val]} 
                                    height={SLIDER_HEIGHT} 
                                    width={SLIDER_WIDTH}
                                />
                            )
                        })}
                    </div>
                    <div className="Blender-Buttons">
                        <button className="Shuffle-Button" onClick={shuffleSliders}></button>
                        <button className="Blender-Button" onClick={generatePlaylist}>generate mixed playlist</button>                        
                    </div>
                </div>
                <Popup pageInfo={PAGE_INFO} pageName={PAGE_NAME}/>
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