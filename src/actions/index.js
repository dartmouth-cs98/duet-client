/* eslint-disable no-console */
import * as types from '../constants/actionTypes';
import SpotifyWebApi from 'spotify-web-api-js';
import { getCurrentUserProfile, getTrackInfos, getTaste, getAvgTaste, getGenreCount } from '../utils/spotifyUtils';
import { getUser, addUser, addNewFriend } from '../utils/backendUtils';

export const fetchUserData = (token, time_range) => {
    return (dispatch) => {
        dispatch({ type: types.STORE_TOKEN, token })

        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token);

        const userProfilePromise = getCurrentUserProfile(token)
        const topTracksPromise = spotifyApi.getMyTopTracks({limit: 50, time_range}) 
        const topArtistsPromise = spotifyApi.getMyTopArtists({limit: 50, time_range})
   
        Promise.all([userProfilePromise, topTracksPromise, topArtistsPromise]).then(function([userProfile, topTracks, topArtists]) {
            
            // USER PROFILE STUFF
            dispatch({ type: types.FETCH_USER_SPOTIFY_PROFILE, profile: userProfile.data })

            const { country, display_name, email, id } = userProfile.data;

            // TOP TRACKS STUFF
            const { trackIds, popularity, decade } = getTrackInfos(topTracks.items) ;

            dispatch({ type: types.FETCH_DECADE, decade: decade});
            dispatch({ type: types.FETCH_TRENDEX, trendex: popularity });

            const audioFeaturesPromise = spotifyApi.getAudioFeaturesForTracks(trackIds);
        
            // TOP ARTISTS STUFF
            const genreCounts = getGenreCount(topArtists.items);
            dispatch({ type: types.FETCH_TOP_GENRES, genre_counts: genreCounts })

            // TODO: get rid of name once it's no longer required by backend
            audioFeaturesPromise.then((tracks) => {
                const taste =  getTaste(tracks.audio_features);
                const avg_taste = getAvgTaste(tracks.audio_features);
                dispatch({ type: types.FETCH_USER_TASTE, taste, avg_taste });
                addUser({ country, display_name, name: display_name, id, email, trendex: popularity, decade, taste, avg_taste, genre_counts: genreCounts })
            })   

            // check if user exists in database
            getUser(id).then((user) => {
                dispatch({ type: types.FETCH_USER_FRIENDS, friends: user.friends });
            })
        });
    }
}

export const addFriend = (userId, friend) => {
    return (dispatch) => {
        addNewFriend(userId, friend.id);
        dispatch({ type: types.ADD_FRIEND, friend })
    }
}

export const fetchFriend = (friendId) => {
    return (dispatch) => {
        getUser(friendId).then((friend) => {
            dispatch({ type: types.FETCH_FRIEND, friend})
        })
    } 
}

export const clearFriend = () => {
    return (dispatch) => {
        dispatch({ type: types.CLEAR_FRIEND })
    }
}

export const clearAuth = () => {
    return (dispatch) => {
        dispatch({ type: types.CLEAR_AUTH })
    }
}

export const clearUser = () => {
    return (dispatch) => {
        dispatch({ type: types.CLEAR_USER })
    }
}
