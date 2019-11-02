import { getAvgObjectInArray } from './arrayUtils';
import axios from 'axios';

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

export const getGenreCount = (artists) => {
    let genreToCount = new Map();
    artists.forEach((artist) => {
        const genres = artist.genres;

        genres.forEach((genre) => {
            if (genreToCount.has(genre)) {
                genreToCount.set(genre, genreToCount.get(genre) + 1);
            }
            else {
                genreToCount.set(genre, 1);
            }
        })
    })
    const topNumber = 6;

    let genreCounts = [];
    genreToCount.forEach((count, genre) =>  {
        genreCounts = [...genreCounts, { label: genre, count } ]
    })

    genreCounts.sort((a, b) => b.count - a.count);

    return genreCounts.slice(0, topNumber);
}