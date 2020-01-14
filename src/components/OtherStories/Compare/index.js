/* eslint-disable react/prop-types */
import React from 'react';
import Page from '../../Page';

const Compare = ({jumpToPage}) => {
    return (
        <Page background={'lightblue'}>
            Compare
            <button onClick={() => jumpToPage(3)}>go!</button>
        </Page>
    )
}

export default Compare;