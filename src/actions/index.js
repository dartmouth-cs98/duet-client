import * as types from '../constants/actionTypes';
import SpotifyWebApi from 'spotify-web-api-js';
import { getCurrentUserProfile, getTrackInfos, getTaste, getAvgTaste, getGenreCount } from '../utils/spotifyUtils';

export const fetchUserData = (token, time_range) => {
    return (dispatch) => {
        dispatch({ type: types.FETCH_TOKEN, token })

        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token);

        getCurrentUserProfile(token)
        .then((response) => {
            dispatch({ type: types.FETCH_USER_PROFILE, profile: response.data })
        })
        
        spotifyApi.getMyTopTracks({limit: 50, time_range})
        .then((response) => {
            const { trackIds, popularity, decade } = getTrackInfos(response.items) ;

            dispatch({ type: types.FETCH_DECADE, decade: decade});
            dispatch({ type: types.FETCH_TRENDEX, trendex: popularity });

            spotifyApi.getAudioFeaturesForTracks(trackIds)
            .then((tracks) => {
                dispatch({ 
                    type: types.FETCH_USER_TASTE, 
                    taste: getTaste(tracks.audio_features), 
                    avg_taste: getAvgTaste(tracks.audio_features) 
                });
            })
        })

        spotifyApi.getMyTopArtists({limit: 50, time_range})
        .then((response) => {
            dispatch({ type: types.FETCH_TOP_GENRES, genre_counts: getGenreCount(response.items) })
        })
    }
}
