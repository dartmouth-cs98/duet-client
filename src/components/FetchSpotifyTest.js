import React, { useState } from 'react';
import { getHashParams, getTopArtists, getTopTracks } from '../utils/spotifyApi';
import { AUTH_SERVER_URL } from '../constants/constants';

const FetchSpotifyTest = () => {
    const params = getHashParams();
    const token = params.access_token;
    const loggedIn = !!token;

    const [tracksAreLoaded, setTracksAreLoaded] = useState(false);
    const [artistsAreLoaded, setArtistsAreLoaded] = useState(false);
    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);

    if (!tracksAreLoaded && loggedIn) {
        getTopTracks(token, "long_term").then((tracks) => {
            setTopTracks(tracks);
            setTracksAreLoaded(true);
        })
    }
    if (!artistsAreLoaded && loggedIn) {
        getTopArtists(token, "long_term").then((artists) => {
            setTopArtists(artists);
            setArtistsAreLoaded(true);
        })
    }

    return (
        <div>
            {!loggedIn && 
                <div>
                    <a  href={AUTH_SERVER_URL}> Login to Spotify </a>
                </div>
            }
            {loggedIn &&
                <div>
                    <div>
                        <h1>Top Tracks</h1>
                        {topTracks.map(track => <div key={track.id}>{track.name}</div>)}
                    </div>
                    <div>
                        <h1>Top Artists</h1>
                        {topArtists.map(artist => <div key={artist.id}>{artist.name}</div>)}
                    </div>  
                </div>     
            }
        </div>
    );
};

export default FetchSpotifyTest;