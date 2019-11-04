/* eslint-disable no-unused-vars */
// // MainForm.jsx
import React, { useState } from 'react';
import Dropdown from 'react-dropdown'

const Survey = () => {
    const [attribute, setAttribute] = useState(null);

    const options = [
        { value: 'one', label: 'One'},
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ]

    return (
        <div>
            <Dropdown 
                options={options} 
                onChange={(e) => setAttribute(e.value)} 
                value={options[0]} 
                placeholder="Select an option" 
            />
            <h1>Current selection: {attribute}</h1>
        </div>
    );
}

export default Survey;


