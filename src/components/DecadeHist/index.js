/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
    Histogram, BarSeries, XAxis 
  } from '@data-ui/histogram';

const DecHistogram = ({ decades }) => {

    const [currAttribute, setAttribute] = useState({ key: "decades", label: "decades" });

    return (
        <div className="Histogram">
            <div className="Key">
                <div className="Box" id="youBox"></div>
                <p>You</p>
            </div>
            <div className="Histogram-graph"> 
                <Histogram
                    //ariaLabel={currAttribute.label}
                    width={500}
                    height={400}
                >
                <BarSeries
                    stroke="#F78D91"
                    strokeWidth={3}
                    fillOpacity={0.80}
                    fill="#F78D91"
                    //rawData={taste[currAttribute.key]}
                />
                <XAxis/>
                </Histogram>
            </div>
        </div>
    );

}

export default DecHistogram;