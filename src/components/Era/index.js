/* eslint-disable react/prop-types */
import React from 'react';


const Trendex = ({ decade }) => {
    const truncatedDecade = decade? decade.toString().slice(-2) : 10;
    
    return (
        <div className="Era">
            <h2>Born in the wrong era?</h2>
            <div className="Era-info">
                <div className="Era-decade">
                <h3 className="Era-number">{`${truncatedDecade}s`}</h3>
                </div>
                <p className="EraDescript">According to your music taste, you were born in {decade}. Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur.
                </p>
            </div>
        </div>
    );
};

export default Trendex;