/* eslint-disable react/prop-types */
import React from 'react';
import Page from '../../Page';

const Share = ({jumpToPage}) => {
    return (
        <Page background={'#9BD6DC'}>
            <div id="Share">
                <div id="shareimage"></div>
                <button onClick={() => jumpToPage(2)}>save to share</button>
                <a href="sms:&body=Hey%20join%20duet!">invite your friends</a>
                <button onClick={() => jumpToPage(2)}>compare again</button>
            </div>
        </Page>
    )
}

export default Share;

