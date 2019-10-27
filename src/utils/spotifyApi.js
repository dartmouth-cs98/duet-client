/* eslint-disable no-console */
import SpotifyWebApi from 'spotify-web-api-js';

// used to get token from url
export const getHashParams = () => {
    const hashParams = {};
    let e; const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
}

export const getTopTracks = (token, time_range) => {
    return new Promise((resolve) => {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token);
        
        spotifyApi.getMyTopTracks({limit: 50, time_range})
        .then((response) => {
            resolve(response.items);
        })
    })
}

export const getTopArtists = (token, time_range) => {
    return new Promise((resolve) => {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token);
        
        spotifyApi.getMyTopArtists({limit: 50, time_range})
        .then((response) => {
            resolve(response.items);
        })
    })
}