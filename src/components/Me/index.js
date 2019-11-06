import React from 'react';
import Trendex from '../Trendex';
import Era from '../Era';
import GenreChart from '../GenreChart';
import SpiderGraph from '../SpiderGraph';
import Histogram from '../Histogram';
import { useSelector } from 'react-redux';

const Me = () => { 

  const { trendex, decade, avg_taste, taste } = useSelector((state) => state.user);
  
  return (
    <div className="Me">
      { taste && trendex && decade && avg_taste &&
        <div className="Me-content"> 
          <h1 className="YourMusic">Your Music</h1>
          <div className="TrendexAndEra">
            <Trendex trendex={trendex}/>
            <Era decade={decade}/>
          </div>
          <h2>Your Top Genres</h2>
          <GenreChart height={55} />
          <div className="SpiderGraphAndHistogram">
            <SpiderGraph avg_taste={avg_taste} />
            <Histogram taste={taste}/>
          </div>
          <div className="Footer">
            <div className="DividerLine"/>
            <div className="FooterText">duet©</div>
          </div>
        </div>
        }
      </div>
  );
};

export default Me;
