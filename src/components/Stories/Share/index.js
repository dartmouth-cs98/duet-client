/* eslint-disable react/prop-types */
import React from 'react';
import Page from '../../Page';
import { func } from 'prop-types';

const Share = ({ history }) => {
    return (
        <Page background={'#9BD6DC'}>
            <div id="Share">
                <div id="shareimage"></div>
                <button onClick={() => history.push('/info-compare')}>save to share</button>
                <a href="sms:&body=hey!%20let's%20compare%20and%20blend%20music%20tastes%20-%20join%20duet!%20http://cs98-duet.surge.sh/">invite your friends</a>
                <button onClick={() => history.push('/info-compare')}>compare again</button>
            </div>
        </Page>
    )
}

Share.propTypes = {
    jumpToPage: func
}

export default Share;

