/* eslint-disable react/prop-types */
import React from 'react';

const Button = ({ onClick, children }) => {

    return (
        <button className="Generic-Button" onClick={onClick}>{children}</button>
    )

}

export default Button;