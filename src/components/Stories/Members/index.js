import React, { useState, useEffect } from 'react';
import Page from '../../Page';
import { func } from 'prop-types';
import { joinGroup, getGroupMembers } from '../../../utils/backendUtils';
import { useSelector } from 'react-redux';



const Members = () => {
    const { user_1, user_2 } = useSelector((state) => state.users);
    const [members, setMembers] = useState([]);
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        getGroupMembers(user_2.id).then((members) => 
            setMembers(members.users)
        );
    }, [])

    const handleJoinGroupClick = () => {
        joinGroup(user_2.id, user_1.id)
        setJoined(true)
    }

    return (
        <Page background={'#212034'}>
            <div id="Members">
                <h1>These are the members of {user_2.id}</h1>
                <div id="memberlist">
                    <ul>
                    {
                        Object.values(members).map((member) => (
                            <li key={member}><span>{member}</span></li>
                        )
                        
                    )}
                    </ul>
                </div>
                <h4>Are you a member of {user_2.id}?</h4>
                { joined ? 
                    <button disabled>you&apos;re a member!</button> :
                    <button onClick={handleJoinGroupClick}>join the group</button>
                }
            </div>
        </Page>
    )
}

Members.propTypes = {
    jumpToPage: func
}

export default Members;