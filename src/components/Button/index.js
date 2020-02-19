/* eslint-disable react/prop-types */
import React from 'react';

const Button = ({ onClick, children, width }) => {

    return (
        <button className="Generic-Button" onClick={onClick} style={{ width }}>{children}</button>
    )

}

export default Button;