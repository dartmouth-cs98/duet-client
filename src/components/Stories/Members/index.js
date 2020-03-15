import React, { useState, useEffect } from 'react';
import ModalWrapper from '../../Modal';
import ShareModal from '../../ShareModal';
import { func } from 'prop-types';
import { joinGroup, getGroupMembers } from '../../../utils/backendUtils';
import { useSelector } from 'react-redux';
import useResizeAware from 'react-resize-aware';
import ScrollArea from 'react-scrollbar';

const Members = () => {
    const { user_1, user_2, my_groups } = useSelector((state) => state.users);
    const { token } = useSelector((state) => state.auth);
    const [members, setMembers] = useState([]); 
    const [joined, setJoined] = useState(my_groups.some(e => e.id === user_2.id));
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getGroupMembers(user_2.id, token).then((members) => 
            setMembers(members.users.reverse())
        );
    }, [])

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const handleJoinGroupClick = () => {
        joinGroup(user_2.id, user_1.id, token);
        setJoined(true)
    }

    const [resizeListener, pageSize] = useResizeAware();

    return (
        <ModalWrapper showModal={showModal} showPopup>
            <ShareModal toggleModal={toggleModal} shareRoute={`/joingroup/${encodeURI(user_2.id)}`} />
            <div id="Members">
                {resizeListener}
                <h1>These are the members of {user_2.id}</h1>
                <div className="Members-Sroll-Container" style={{ height: pageSize.height * .5}}>
                    <ScrollArea
                        speed={0.8}
                        className="Members-Scroll-Area"
                        horizontal={false}
                    >
                        <div className="Members-Scroll-List">
                            <ul>
                            {
                                Object.values(members).map((member) => (
                                    <div key={member}>
                                        <li><span>{member}</span></li>
                                    </div>
                                )
                                
                            )}
                            </ul>
                        </div>
                    </ScrollArea>
                </div>
                <h4>Are you a member of {user_2.id}?</h4>
                { joined ? 
                    <button onClick={toggleModal}>invite your friends</button> :
                    <button onClick={handleJoinGroupClick}>join the group</button>
                }
            </div>
        </ModalWrapper>
    )
}

Members.propTypes = {
    jumpToPage: func
}

export default React.memo(Members);