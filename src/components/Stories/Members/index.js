import React, { useState, useEffect } from 'react';
import Page from '../../Page';
import { func } from 'prop-types';
import { joinGroup, getGroupMembers } from '../../../utils/backendUtils';
import { useSelector } from 'react-redux';
import ScrollArea from 'react-scrollbar';

const Members = () => {
    const { user_1, user_2, my_groups } = useSelector((state) => state.users);
    const { token } = useSelector((state) => state.auth);
    const [members, setMembers] = useState([]); 
    const [joined, setJoined] = useState(my_groups.some(e => e.id === user_2.id));

    useEffect(() => {
        getGroupMembers(user_2.id, token).then((members) => 
            setMembers(members.users)
        );
    }, [])

    const handleJoinGroupClick = () => {
        joinGroup(user_2.id, user_1.id, token);
        setJoined(true)
    }
    
    const handleShareGroupClick = () => {
        window.open(`sms:&body=hey!%20let's%20compare%20and%20blend%20music%20tastes%20-%20join%20duet!%20${window.origin}/joingroup/${user_2.id}`, "_self")
    }

    return (
        <Page background={'#212034'}>
            <div id="Members">
                <h1>These are the members of {user_2.id}</h1>
                <ScrollArea
                    speed={0.8}
                    className="area"
                    contentClassName="content"
                    horizontal={false}
                >
                <div id="memberlist">
                    <ul>
                    {
                        Object.values(members).map((member) => (
                            <li key={member}><span>{member}</span></li>
                        )
                        
                    )}
                    </ul>
                </div>
                </ScrollArea>
                <h4>Are you a member of {user_2.id}?</h4>
                { joined ? 
                    <button onClick={handleShareGroupClick}>invite your friends</button> :
                    <button onClick={handleJoinGroupClick}>join the group</button>
                }
            </div>
        </Page>
    )
}

Members.propTypes = {
    jumpToPage: func
}

export default React.memo(Members);