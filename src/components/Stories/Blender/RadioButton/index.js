/* eslint-disable react/prop-types */
import React from 'react';

const RadioButton = ({ label, enabled, onClick, color }) => {

    return (
        <div className="RadioButton-Container">
            <div onClick={onClick} className="RadioButton">
            { enabled && <div className="RadioButton-Enabled"/> }
            </div>
            <h1 className="RadioButton-Label" style={{ color }}>{label}</h1>
        </div>
    )

}

export default RadioButton;