import React from 'react';
import Page from '../../Page';
import { useSelector } from 'react-redux';
import { User } from '../../../types';
import { string } from 'prop-types';
import { getRecommendations } from '../../../utils/playlistGenerator';

const PlaylistGenerator = ({ user_1, user_2, my_id }) => {

    const { spotify_token } = useSelector((state) => state.auth);

    const user1Name = user_1.id == my_id ? 'You': user_1.display_name;
    const user2Name = user_2.display_name;

    const { taste: user1Taste } = user_1;
    const { taste: user2Taste } = user_2;


    const generateOptimalPlaylist = () => {
        /* seedArtists: user_1's top 3 & user_2's top 2
           targetTaste: average of user_1 and user_2
        */
       const RECOMMENDED_SONGS_LENGTH = 20;
       
        const user1TopArtists = user_1.topArtists.slice(0, 3).map((artist) => artist.id);
        const user2TopArtists = user_2.topArtists.slice(0, 2).map((artist) => artist.id);

        const seedArtists = [...user1TopArtists, ...user2TopArtists];

        // we'll just average them
        const targetTaste = {
            target_danceability: (user1Taste.danceability + user2Taste.danceability) / 2,
            target_valence: (user1Taste.valence + user2Taste.valence) / 2,
            target_energy: (user1Taste.energy + user2Taste.energy) / 2,
            target_acousticness:(user1Taste.acousticness + user2Taste.acousticness) / 2,
        }

        getRecommendations(spotify_token, seedArtists, targetTaste, RECOMMENDED_SONGS_LENGTH).then((tracks) => {
            tracks.forEach((track) => console.log(track.name, track.artists[0].name));
        })

        // WE WILL GRAB 5 RANDOM SONGS FROM BOTH USER'S TOP SONGS
    }   

    return (
        <Page background={'#ffffff'}>
            <button style={{ width: 200, height: 200 }}onClick={generateOptimalPlaylist}>generate optimal playlist for {user1Name} and {user2Name}</button>
        </Page>
    )
}

export default PlaylistGenerator;

PlaylistGenerator.propTypes = {
    user_1: User,
    user_2: User,
    my_id: string,
}