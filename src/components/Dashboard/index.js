import React from 'react';
import Sidebar from '../Sidebar'
import Trendex from '../Trendex';
import Era from '../Era';
import GenreChart from '../GenreChart';
import SpiderGraph from '../SpiderGraph';
import Histogram from '../Histogram';
import { useSelector } from 'react-redux';

const Dashboard = () => { 

  const { trendex, decade, avg_taste, taste } = useSelector((state) => state.user);
  
  return (
    <div className="Dashboard">
      <Sidebar/>
      { taste && trendex && decade && avg_taste &&
        <div className="Dashboard-content"> 
          <h1 className="YourMusic">Your Music</h1>
          <div className="TrendexAndEra">
            <Trendex trendex={trendex}/>
            <Era decade={decade}/>
          </div>
          <GenreChart height={55} width={1000} />
          <div className="SpiderGraphAndHistogram">
            <SpiderGraph avg_taste={avg_taste} />
            <Histogram taste={taste}/>
          </div>
        </div>
        }
      </div>
  );
};

export default Dashboard;
