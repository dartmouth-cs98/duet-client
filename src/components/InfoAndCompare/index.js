/* eslint-disable react/prop-types */
import React from 'react';
import Compare from './Compare';
import Info from './Info';
import SwipeableViews from 'react-swipeable-views';


const InfoAndCompare = ({ history }) => {

    return (
        <SwipeableViews>
            <Info key="infopage"/>
            <Compare history={history} key="comparepage"/>
        </SwipeableViews>
    );
        
}

export default InfoAndCompare;