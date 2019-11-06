/* eslint-disable react/prop-types */
import React from 'react';


const Trendex = ({ trendex, friend }) => {
    const name = friend ? `${friend}'s` : 'your';
    return (
        <div className="Trendex">
            <h2>How trendy is {name} taste?</h2>
            <div className="Trendex-info">
            <h3 className="Trendex-number">{`${trendex}`}</h3>
            <p className="TrendDescript">Your trendex is calculated based on the popularity of your music 
                with 100 being the most popular. The popularity of tracks are calculated 
                by algorithm and is based, in the most part, on the total number 
                of plays the track has had and how recent those plays are. Generally speaking, songs that are 
                being played a lot now will have a higher popularity 
                than songs that were played a lot in the past.
            </p>
            </div>
        </div>
    );
};

export default Trendex;