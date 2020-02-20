import * as types from '../constants/actionTypes';
import SpotifyWebApi from 'spotify-web-api-js';
import { getCurrentUserProfile, getTrackInfos, getAvgTaste, getGenreCount } from '../utils/spotifyUtils';
import { getBackendToken, postUser, getUser, joinGroup } from '../utils/backendUtils';

const EVERYONE_ID = "Everyone";

export const fetchMeData = (spotifyToken, time_range) => {
    return (dispatch) => {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(spotifyToken);

        const userProfilePromise = getCurrentUserProfile(spotifyToken)
        const topTracksPromise = spotifyApi.getMyTopTracks({limit: 50, time_range}) 
        const topArtistsPromise = spotifyApi.getMyTopArtists({limit: 50, time_range})
   
        Promise.all([userProfilePromise, topTracksPromise, topArtistsPromise]).then(function([userProfile, topTracks, topArtists]) {   
            let user = {};
            const { display_name, id } = userProfile.data;
            const { trackObjects, popularity, decadeCounts } = getTrackInfos(topTracks.items);
            const trackIds = trackObjects.map((track) => track.id);
            const audioFeaturesPromise = spotifyApi.getAudioFeaturesForTracks(trackIds);
            const artistNamesAndIds = topArtists.items.map((artist) => ({ name: artist.name, id: artist.id }))
       
            getGenreCount(spotifyToken, topTracks.items).then((genreCounts) => {
                audioFeaturesPromise.then((tracks) => {
                    const taste = getAvgTaste(tracks.audio_features);
                    user = { display_name, id, decadeCounts, trendex: popularity, topTracks: trackObjects, topArtists:artistNamesAndIds, genreCounts, taste};
                    dispatch({ type: types.FETCH_MY_ID, my_id: id })
                    getBackendToken(spotifyToken).then((response) => {
                      const { token } = response;
                      dispatch({ type: types.STORE_TOKEN, token })
                      postUser(user, token);
                      joinGroup(EVERYONE_ID, id);
                    })
                    dispatch({ type: types.FETCH_USER_1, user: user });
                })  
            })
        });
    }
}

export const setCompare = (entity) => {
    return (dispatch) => {
        dispatch({ type: types.SET_COMPARE, compare: entity });
    }
}

export const fetchUser1 = (id) => {
  return (dispatch) => {
    getUser(id).then((user) => {
      dispatch({ type: types.FETCH_USER_1, user })
    })
  }
}


export const fetchUser2 = (id) => {
  return (dispatch) => {
    getUser(id).then((user) => {
      dispatch({ type: types.FETCH_USER_2, user })
    })
  }
}

