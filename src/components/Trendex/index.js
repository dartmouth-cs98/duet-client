/* eslint-disable react/prop-types */
import React from 'react';


const Trendex = ({ trendex, friend }) => {
    const name = friend ? `${friend}'s` : 'your';
    return (
        <div className="Trendex">
            <h2>How trendy is {name} taste?</h2>
            <div className="Trendex-info">
            <h3 className="Trendex-number">{`${trendex}`}</h3>
            <p className="TrendDescript">Your trendex measures how popular your top songs are. A score of 100 means 
                you listen to exclusively top hits and zero means you only listen to that one 
                friend from your high school who is still trying to be a rapper. The popularity of your tracks 
                is calculated by Spotify&apos;s algorithm, but is mostly based on how many times the track is played and
                how recent those plays are.
            </p>
            </div>
        </div>
    );
};

export default Trendex;