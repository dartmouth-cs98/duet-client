import { getAvgObjectInArray } from './arrayUtils';
import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';
import { flattenedGenres } from '../constants/flattenedGenres';
import TopGenres from '../components/DataStories/TopGenres';

export const getCurrentUserProfile = (token) => {
    return new Promise((resolve) => {
        axios({
            method: 'get', 
            url: 'https://api.spotify.com/v1/me',
            headers: {
              Authorization: 'Bearer ' + token,
            }
        }).then((response) => resolve(response));
    })
}

export const getTrackInfos = (tracks) => {
    let trackIds = []; 
    let popularitySum = 0;
    let popularityCount = 0;
    let decadeToCount = new Map();

    tracks.forEach((track) => {
        trackIds = [...trackIds, track.id];

        popularitySum += track.popularity;
        popularityCount++;

        const year = parseInt(track.album.release_date.substring(0, 4));
        const decade = year - year % 10;

        if (decadeToCount.has(decade)) {
            decadeToCount.set(decade, decadeToCount.get(decade) + 1);
        }
        else {
            decadeToCount.set(decade, 1);
        }      
    })

    let decadeCounts = [];
    decadeToCount.forEach((count, decade) =>  decadeCounts = [...decadeCounts, { decade, count }]);
    decadeCounts.sort((a, b) => b.count - a.count);
    const { decade } = decadeCounts[0];
    const popularity = (popularitySum / popularityCount).toFixed(1);

    return { trackIds, popularity, decade }
}

export const getTaste = (audioFeatures) => {
    let danceability = [];
    let energy = [];
    let key = [];
    let loudness = [];
    let mode = [];
    let speechiness = [];
    let acousticness = [];
    let instrumentalness = [];
    let liveness = [];
    let valence = [];
    let temp = [];
    let duration_ms = [];    
    let time_signature = [];
    
    audioFeatures.forEach((track) => {
        danceability = [...danceability, track.danceability];
        energy = [...energy, track.energy];
        key = [...key, track.key];
        loudness = [...loudness, track.loudness];
        mode = [...mode, track.mode];
        speechiness = [...speechiness, track.speechiness];
        acousticness = [...acousticness, track.acousticness];
        instrumentalness = [...instrumentalness, track.instrumentalness];
        liveness = [...liveness, track.liveness];
        valence = [...valence, track.valence];
        temp = [...temp, track.temp];
        duration_ms = [...duration_ms, track.duration_ms];
        time_signature = [...time_signature, track.time_signature];
    })

    return { 
        danceability, 
        energy, 
        key, 
        loudness,
        mode,
        speechiness,
        acousticness, 
        instrumentalness, 
        liveness, 
        valence,
        temp, 
        duration_ms, 
        time_signature
    };
}

export const getAvgTaste = (audioFeatures) => {
    const avg = getAvgObjectInArray(audioFeatures);
    let avgTaste = {};
    avg.forEach((feature) => {
        avgTaste = { ...avgTaste, [feature.attribute]: feature.average };
    })
    return avgTaste;
}

export const getGenreCount = (token, tracks) => {
    
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);

    let promises1 = tracks.map((track) => 
        new Promise((resolve) => {
            let promises2 = track.artists.map((artist) => 
                new Promise((resolve) => {
                    spotifyApi.getArtist(artist.id).then((response) => resolve(response.genres))
                })
            )
            Promise.all(promises2).then((genreLists) => {
                let genres = new Set();
                genreLists.forEach((genreList) => {
                    genreList.forEach((genre) => genres.add(genre))
                })
                resolve({genres, artist: track.artists[0], track: track.name});
            })
        })
    )

    return Promise.all(promises1).then((genreObjects) => {
        let topGenres = new Map();
        genreObjects.forEach((genreObject) => {
            const { genres } = genreObject;
        
            let flattenedCount = new Map();
            genres.forEach((genre) => {
                const flattened = flattenedGenres[genre];
                if (flattenedCount.has(genre)) {
                    flattenedCount.set(flattened, flattenedCount.get(genre) + 1);
                } else {
                    flattenedCount.set(flattened, 1);
                }
            })

            let topGenre = '';
            const topCount = 0;
            flattenedCount.forEach((count, genre) => {
                // if (count == topCount) {
                //     console.log('we have a tie',genre, topGenre);
                // }
                if (count > topCount) {
                    topGenre = genre;
                }
            })
            if (topGenre !== undefined && topGenre !== "") {
                if (topGenres.has(topGenre)) {
                    topGenres.set(topGenre, topGenres.get(topGenre) + 1);
                } else {
                    topGenres.set(topGenre, 1)
                }
            } 
        })
        return [...topGenres];
    })
}