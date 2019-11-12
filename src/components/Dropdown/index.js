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
        
               
            </div>
            { showDropdown &&
                <div className="Dropdown-options">
                    {options.map(renderOptions)}
                </div>
            }
        </div>
    )

}

export default Dropdown;