/* eslint-disable react/prop-types */
import React from 'react';

const RadioButton = ({ label, enabled, onClick }) => {

    return (
        <div className="RadioButton-Container">
            <div onClick={onClick} className="RadioButton">
            { enabled && <div className="RadioButton-Enabled"/> }
            </div>
            <h1 className="RadioButton-Label">{label}</h1>
        </div>
    )

}

export default RadioButton;