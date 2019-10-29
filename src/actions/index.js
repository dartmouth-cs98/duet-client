import * as types from '../constants/actionTypes';
import SpotifyWebApi from 'spotify-web-api-js';

export const fetchUserData = (token, time_range) => {
    return (dispatch) => {
        // set token in redux state
        dispatch({ type: types.FETCH_TOKEN, token })

        // initialize spotifyApi object w/ token
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token);

        // TODO: get user profile
        
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