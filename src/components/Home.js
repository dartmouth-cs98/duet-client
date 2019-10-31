import React from 'react';
import { AUTH_SERVER_URL } from '../constants/authServer';
import { useSelector } from 'react-redux';
import SpiderGraph from './SpiderGraph';
import GenreChart from './GenreChart';

const HomePage = () => {
  // const { topArtists, topTracks, display_name } = useSelector((state) => state.user);
  const { loggedIn } = useSelector((state) => state.auth);

  return (
    <div>
      {!loggedIn && 
          <div>
              <a href={AUTH_SERVER_URL}> Login to Spotify </a>
          </div>
      }
      {/* {loggedIn &&
        <div>
            <div> 
              <h1>User:</h1>
              <h2>{display_name}</h2>
            </div>
            <div>
                <h1>Top Tracks</h1>
                {topTracks.map(track => <div key={track.id}>{track.name}</div>)}
            </div>
            <div>
                <h1>Top Artists</h1>
                {topArtists.map(artist => <div key={artist.id}>{artist.name}</div>)}
            </div>  
        </div>     
      } */}
      {loggedIn && <SpiderGraph/>}
      {loggedIn && 
        <GenreChart
          height={55} 
          width={1082} 
          genres={[
            { label: "Pop Rock", percentage: .4 }, 
            { label: "Showtunes", percentage: .2 }, 
            { label: "Indie-Pop", percentage: .15 }, 
            { label: "Rock", percentage: .15 }, 
            { label: "Rap", percentage: .1 }
          ]}/>
      }
      
    </div>
  );
};

export default HomePage;
