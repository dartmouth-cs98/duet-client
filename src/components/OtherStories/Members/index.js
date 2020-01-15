/* eslint-disable react/prop-types */
import React from 'react';
import Page from '../../Page';

const Members = ({jumpToPage}) => {
    return (
        <Page background={'#ffffff'}>
            <div id="Members">
                <h1>These are the members of BLANK</h1>
                <div id="memberlist">
                    <ul>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                        <li><span>Nic Bergen</span></li>
                    </ul>
                </div>
                <h4>Are you a member of BLANK?</h4>
                <button onClick={() => jumpToPage(1)}>join the group</button>
            </div>
        </Page>
    )
}

export default Members;