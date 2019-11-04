/* eslint-disable react/prop-types */
import React, { useState } from 'react';

// NOTE: options object should be the following schema: [{ key, label } ]

const Dropdown = ({ currOption, options, onSelect }) => {

    const [showDropdown, setShowDropdown] = useState(false);

    const handleSelect = (option) => {
        onSelect(option);
        setShowDropdown(false);
    }

    const renderOptions = (option) => {
        return (
            <h6 
            key={option.key}
            style={{ color: currOption.key == option.key ? '#212034' : '#e5277B' }} 
            onClick={() => handleSelect({ key: option.key, label: option.label })}>
            {option.label}
            </h6>
        )
    }

    return (
        <div className="Dropdown">
            <div className="Dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
                <h2>{currOption.label}</h2>
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 8L0.937822 0.5L13.0622 0.500001L7 8Z" fill="#F78D91"/>
                </svg>
            </div>
            { showDropdown &&
                <div className="Dropdown-options">
                    {options.map(renderOptions)}
                    {/* <h6 style={{ color: currKey == 'energy' ? '#212034' : '#e5277B' }} onClick={() => handleSelect('energy')}>Energy</h6>
                    <h6 style={{ color: currKey == 'danceability' ? '#212034' : '#e5277B' }} onClick={() => handleSelect('danceability')}>Danceability</h6>
                    <h6 style={{ color: currKey == 'acousticness' ? '#212034' : '#e5277B' }} onClick={() => handleSelect('acousticness')}>Acousticness</h6>
                    <h6 style={{ color: currKey == 'speechiness' ? '#212034' : '#e5277B' }} onClick={() => handleSelect('speechiness')}>Speechiness</h6>
                    <h6 style={{ color: currKey == 'instrumentalness' ? '#212034' : '#e5277B' }} onClick={() => handleSelect('instrumentalness')}>Instrumentalness</h6>
                    <h6 style={{ color: currKey == 'liveness' ? '#212034' : '#e5277B' }} onClick={() => handleSelect('liveness')}>Liveness</h6>
                    <h6 style={{ color: currKey == 'mode' ? '#212034' : '#e5277B' }} onClick={() => handleSelect('mode')}>Mode</h6>
                    <h6 style={{ color: currKey == 'valence' ? '#212034' : '#e5277B' }} onClick={() => handleSelect('valence')}>Valence</h6> */}
                </div>
            }
        </div>
    )

}

export default Dropdown;