import React from 'react';
import Page from '../../Page';
import { func } from 'prop-types';
import { joinGroup } from '../../../utils/backendUtils';
import { useSelector } from 'react-redux';


const Members = () => {
    const { user_1, user_2 } = useSelector((state) => state.users);

    const handleJoinGroupClick = () => {
        joinGroup(user_2.id, user_1.id)
    }

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
                <button onClick={handleJoinGroupClick}>join the group</button>
            </div>
        </Page>
    )
}

Members.propTypes = {
    jumpToPage: func
}

export default Members;