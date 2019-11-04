import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Dropdown from '../Dropdown';
import {
    Histogram, BarSeries, XAxis, YAxis,
  } from '@data-ui/histogram';

const TasteHistogram = () => {

    const { taste } = useSelector((state) => state.user);
    const [currAttribute, setAttribute] = useState('acousticness');

    const dropdownOptions = [
        { key: 'danceability', label: 'Danceability' },
        { key: 'energy', label: 'Energy' },
        { key: 'speechiness', label: 'Speechiness' },
        { key: 'acousticness', label: 'Acousticness' },
        { key: 'instrumentalness', label: 'Instrumentalness' },
        { key: 'liveness', label: 'Liveness' },
        { key: 'valence', label: 'Valence' },
        { key: 'mode', label: 'Mode' },
    ];

    return (
        <div className="Histogram">
            <div style={{ display: 'flex', justifyContent: 'flex-start', zIndex: 10}} className="Histogram-questionHeader">
                <h2>How</h2>
                <Dropdown 
                    currKey={currAttribute} 
                    options={dropdownOptions}
                    onSelect={(attribute) => setAttribute(attribute)}
                />
                <h2> is your music?</h2>
            </div>
            <div style={{ position: 'absolute' }}> 
                <Histogram
                    style={{ position: 'absolute'}}
                    ariaLabel={currAttribute}
                    width={500}
                    height={400}
                >
                <BarSeries
                    stroke="#e64980"
                    fillOpacity={0.15}
                    fill="url(#normal)"
                    rawData={taste[currAttribute]}
                />
                <XAxis label={currAttribute}/>
                <YAxis />
                </Histogram>
            </div>
        </div>
    );

}

export default TasteHistogram;