/* eslint-disable react/prop-types */
import React from 'react';
import Page from '../../Page';

const Share = ({jumpToPage}) => {
    return (
        <Page background={'lightblue'}>
            Share
            <button onClick={() => jumpToPage(2)}>compare again</button>
        </Page>
    )
}

export default Share;