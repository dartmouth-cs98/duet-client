/* eslint-disable react/prop-types */
import React from 'react';
import Page from '../../Page';

const Compare = ({jumpToPage}) => {
    return (
        <Page background={'lightblue'}>
            <div id="background"/>
            <div id="content">
                <h3>compare...</h3>
                <input></input>
                <h3>to...</h3>
                <input></input>
                <button onClick={() => jumpToPage(3)}>go!</button>
                <button id="smallLink">or create a group</button>
            </div>
        </Page>
    )
}

export default Compare;