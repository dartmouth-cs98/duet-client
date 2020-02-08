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
                <button>join the group</button>
                <i className="arrow right" onClick={() => jumpToPage(9)}></i>
            </div>
        </Page>
    )
}

export default Members;