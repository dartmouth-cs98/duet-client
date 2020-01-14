/* eslint-disable react/prop-types */
import React from 'react';
import Page from '../../Page';

const Members = ({jumpToPage}) => {
    return (
        <Page background={'lightblue'}>
            Members
            <button onClick={() => jumpToPage(1)}>Join</button>
        </Page>
    )
}

export default Members;