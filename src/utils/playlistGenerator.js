import SpotifyWebApi from 'spotify-web-api-js';

// 30 total songs
    // 5 random songs from user 1's top songs
    // 5 random songs from user 2's top songs
    // 10 songs from the recomemndation algorithm of 

// const targetTaste = {
//     target_danceability: .7,
//     target_valence: .9,
//     target_energy: .2,
//     target_acousticness: .6,
//     target_popularity: 100, 
// }

// const seed_tracks = ["3gjsECEyGpX3DXIFCO407o", "04jVEb76Kw5OrmGtlXlHxI", "39rHfrVqCX6A55GF7uOZSC", "4bavMWACFs1hFGWSOV2mNa", "5e0O7MjhNHq9G67qDFM8nR"];


export const getRecommendations = (spotifyToken, seedArtists, targetTaste, limit) => {
    return new Promise((resolve) => {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(spotifyToken);
        spotifyApi.getRecommendations({ ...targetTaste, seed_artists: seedArtists, limit }).then((response) => {
            resolve(response.tracks)
        });
    })

}