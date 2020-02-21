import SpotifyWebApi from 'spotify-web-api-js';

export const getRecommendations = (spotifyToken, seedArtists, targetTaste, limit) => {
    return new Promise((resolve, reject) => {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(spotifyToken);
        spotifyApi.getRecommendations({ ...targetTaste, seed_artists: seedArtists, limit }).then((response) => {
            resolve(response.tracks)
        }, (err) => reject(err));
    })
}

export const createPlaylist = (spotifyToken, user_id, name, description, uris) => {
    return new Promise((resolve, reject) => {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(spotifyToken);
        spotifyApi.createPlaylist(user_id, {name, description }).then((playlist) => {
            const { id } = playlist;
            spotifyApi.addTracksToPlaylist(id, uris)
            resolve();
        }, (err) => reject(err));
    });
}