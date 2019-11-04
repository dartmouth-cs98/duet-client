import React from 'react';
import Sidebar from '../Sidebar'
import GenreChart from './GenreChart';
import SpiderGraph from './SpiderGraph';
import { useSelector } from 'react-redux';

const Dashboard = () => { 

  const { trendex, decade } = useSelector((state) => state.user);
  const truncatedDecade = decade? decade.toString().slice(-2) : 10;
  return (
    <div className="Dashboard">
      <Sidebar/>
      <div className="Dashboard-content"> 
        <h1 className="YourMusic">Your Music</h1>
        <div className="TrendexAndEra">
          <div className="Trendex">
            <h2>How trendy is your taste</h2>
            <div className="Trendex-info">
              <h3 className="TrendexAndEra-number">{`${trendex}`}</h3>
              <p>Your trendex is calculated based on the popularity of your music 
                with 100 being the most popular. The popularity of tracks are calculated 
                by algorithm and is based, in the most part, on the total number 
                of plays the track has had and how recent those plays are. Generally speaking, songs that are 
                being played a lot now will have a higher popularity 
                than songs that were played a lot in the past.
              </p>
            </div>
          </div>
          <div className="Era">
            <h2>Born in the wrong era?</h2>
              <div className="Era-info">
                  <div className="Era-decade">
                  <h3 className="TrendexAndEra-number">{`${truncatedDecade}s`}</h3>
                  </div>
                  <p>According to your music taste, you were born in {decade}. Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                  eu fugiat nulla pariatur.
                  </p>
              </div>
          </div>
        </div>
        <GenreChart
            height={55} 
            width={1000} 
          />
        <div className="SpiderGraphAndHistogram">
          <div className="SpiderGraph">
            <h2>What does your music taste look like?</h2>
            <SpiderGraph/>
          </div>
          <div className="Histogram">
            <h2>How ________ is your music?</h2>
            <div className="HistogramPlaceholder">
              histogram placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
