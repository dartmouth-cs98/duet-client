import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Dropdown from '../Dropdown';
import {
    Histogram, BarSeries, XAxis 
  } from '@data-ui/histogram';

const TasteHistogram = () => {

    const { taste } = useSelector((state) => state.user);
    const [currAttribute, setAttribute] = useState({ key: "energy", label: "energetic" });

    const dropdownOptions = [
        { key: 'danceability', label: 'Danceable' },
        { key: 'energy', label: 'Energetic' },
        { key: 'speechiness', label: 'Speechy' },
        { key: 'acousticness', label: 'Acoustic' },
        { key: 'instrumentalness', label: 'Instrumental' },
        { key: 'liveness', label: 'Live' },
        { key: 'valence', label: 'Valence' },
        { key: 'mode', label: 'Mode' },
    ];

    return (
        <div className="Histogram">
            <div style={{ display: 'flex', justifyContent: 'flex-start', zIndex: 10}} className="Histogram-questionHeader">
                <h2>How</h2>
                <Dropdown 
                    currOption={currAttribute}
                    options={dropdownOptions}
                    onSelect={(attribute) => setAttribute(attribute)}
                />
                <h2> is your music?</h2>
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
                    fillOpacity={0.60}
                    fill="#F78D91"
                    rawData={taste[currAttribute.key]}
                />
                <XAxis/>
                </Histogram>
            </div>
        </div>
    );

}

export default TasteHistogram;