/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Dropdown from '../Dropdown';
import {
    Histogram, BarSeries, XAxis 
  } from '@data-ui/histogram';

const TasteHistogram = ({ taste, friendTaste, friendName }) => {

    const [currAttribute, setAttribute] = useState({ key: "energy", label: "energetic" });

    const dropdownOptions = [
        { key: 'danceability', label: 'danceable' },
        { key: 'energy', label: 'energetic' },
        { key: 'speechiness', label: 'speechy' },
        { key: 'acousticness', label: 'acoustic' },
        { key: 'instrumentalness', label: 'instrumental' },
        // { key: 'liveness', label: 'Live' },
        { key: 'valence', label: 'happy' },
        // { key: 'mode', label: 'Mode' },
    ];

    return (
        <div className="Histogram">
            <div className="Histogram-questionHeader">
                <h2>How</h2>
                <Dropdown 
                    currOption={currAttribute}
                    options={dropdownOptions}
                    onSelect={(attribute) => setAttribute(attribute)}
                />
                <h2> is your music?</h2>
            </div>
            <div className="Key">
                <div className="Box" id="youBox"></div>
                <p>You</p>
                <div className="Box" id="friendBox"></div>
                <p>{friendName}</p>
            </div>
            <div className="Histogram-graph"> 
                <Histogram
                    ariaLabel={currAttribute.label}
                    width={500}
                    height={400}
                >
                <BarSeries
                    stroke="#F78D91"
                    strokeWidth={3}
                    fillOpacity={0.80}
                    fill="#F78D91"
                    rawData={taste[currAttribute.key]}
                />
                { friendTaste &&
                <BarSeries
                    stroke="#E5277B"
                    strokeWidth={3}
                    fillOpacity={0.30}
                    fill="#E5277B"
                    rawData={friendTaste[currAttribute.key]}
                />
                }
                <XAxis/>
                </Histogram>
            </div>
        </div>
    );

}

export default TasteHistogram;