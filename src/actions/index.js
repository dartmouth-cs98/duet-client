import * as types from '../constants/actionTypes';
import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';

export const fetchUserData = (token, time_range) => {
    return (dispatch) => {
        // set token in redux state
        dispatch({ type: types.FETCH_TOKEN, token })

        // initialize spotifyApi object w/ token
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token);

        // get user profile
        axios({
            method: 'get', 
            url: 'https://api.spotify.com/v1/me',
            headers: {
              Authorization: 'Bearer ' + token,
            }
        })
        .then((response) => {
            dispatch({ type: types.FETCH_USER_PROFILE, profile: response.data })
        })
        
        // get top tracks
        spotifyApi.getMyTopTracks({limit: 50, time_range})
        .then((response) => {
            dispatch({ type: types.FETCH_USER_TOP_TRACKS, tracks: response.items });
        })

        // get top artists
        spotifyApi.getMyTopArtists({limit: 50, time_range})
        .then((response) => {
            dispatch({ type: types.FETCH_USER_TOP_ARTISTS, artists: response.items });
        })
    }
}