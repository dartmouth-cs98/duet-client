/* eslint-disable react/prop-types */
import React from 'react';
import Page from '../../Page';

const TopGenres = ({ topGenres }) => {
    const colors = ['#9BD6DC', '#212034', '#FFFFFF', '#E5277B'];
    const totalGenres = 48;  
    let percentages = [];
    let i = 0;
    topGenres.forEach((genre) => {
        const percentage = (genre[1] / totalGenres) * 100;
        percentages = [...percentages, {title: genre[0], value: percentage, color: colors[i % 4]}]
        i ++;
    });
    console.log(percentages);

    return( <Page background={'white'} numPages={6} pageNum={2}/> )
}

export default TopGenres;