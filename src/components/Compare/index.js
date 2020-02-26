/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../Page';
import DuetLogo from '../DuetLogo';
import Button from '../Button';
import Switch from '../Switch';
import Search from '../Search';
import ModalWrapper from '../Modal';
import ReactLoading from 'react-loading';
import { fetchUser1, fetchUser2 } from '../../actions';
import { addGroup } from '../../utils/backendUtils';
import { func } from 'prop-types';


const LOGO_HEIGHT = 130;
const LOGO_WIDTH = 210;
const EVERYONE_ID = "Everyone";

const CreateGroupModal = ({ toggleModal, my_id }) => {

    const NAMING_GROUP = 'NAMING_GROUP';
    const CREATING_GROUP = 'CREATING_GROUP';
    const GROUP_CREATED = 'GROUP_CREATED';
    const GROUP_FAILED = 'GROUP_FAILED';

    const [groupName, setGroupName] = useState('');
    const [status, setStatus] = useState(NAMING_GROUP)

    const handleAddGroupClick = () => {
        setStatus(CREATING_GROUP);
        addGroup(groupName, my_id).then(() => setStatus(GROUP_CREATED), () => setStatus(GROUP_FAILED));
    }

    return (
        <div className="Compare-CreateGroup-Modal">
            <div className="Compare-CreateGroup-Modal-Close">
                <button onClick={toggleModal}>
                    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16.5 16.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M16.5 1L0.999999 16.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>  
                </button>  
            </div>
            { status === NAMING_GROUP &&
                <>  
                    <h1>Name your group</h1>
                    <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)}></input>
                    <Button onClick={handleAddGroupClick} width={200} >create</Button>
                </>
            }
            { status === CREATING_GROUP && 
                <>
                    <h1>{`creating ${groupName}...`}</h1>
                    <ReactLoading type={'bars'} color="#fff" />
                </>
            }
            { status === GROUP_CREATED && 
                <>
                    <h1>group created!</h1>
                </>
            }
            { status === GROUP_FAILED && 
                <>
                    <h1>group failed!</h1>
                </>
            }
        </div>
    )
}

const Compare = ({ history }) => {

    const dispatch = useDispatch();
    const { user_1, my_id } = useSelector((state) => state.users);
    const [showModal, setShowModal] = useState(false);

    const [topIsSearching, setTopIsSearching] = useState(false);
    const [topUser, setTopUser] = useState({ name: 'Me', id: my_id });

    const [bottomIsSearching, setBottomIsSearching] = useState(false);
    const [bottomUser, setBottomUser] = useState({ name: 'Everyone', id: EVERYONE_ID });

    const [isComparing, setIsComparing] = useState(true);
    const [isMixing, setIsMixing] = useState(true);

    // const [groupNameVal, setGroupNameVal] = useState('');

    // const handleClose = () => {
    //     if (showPopup) {
    //         setShowPopup(!showPopup);
    //     } 
    // }

    // const handleAddGroupClick = () => {
    //     addGroup(groupNameVal, user_1.id)
    //     if (showPopup) {
    //         setShowPopup(!showPopup);
    //     } 
    // }

    // const handleGroupNameChange = (e) => {
    //     const { value } = e.target;
    //     setGroupNameVal(value)
    // };

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const handleGoClick = () => {
        dispatch(fetchUser1(topUser.id))
        dispatch(fetchUser2(bottomUser.id));
        history.push('/stories', { isComparing, isMixing })
    }

    const handleToggleMixing = () => {
        if (isMixing) setIsComparing(true);
        setIsMixing(!isMixing);
    }

    const handleToggleComparing = () => {
        if (isComparing) setIsMixing(true);
        setIsComparing(!isComparing);
    }

    return (
        <ModalWrapper showModal={showModal}>
            <CreateGroupModal toggleModal={toggleModal} my_id={my_id} />
            <Page background={'#212034'}>
                <Search 
                    enabled={topIsSearching || bottomIsSearching} 
                    setIsSearching={topIsSearching ? setTopIsSearching : setBottomIsSearching}
                    setUser={topIsSearching ? setTopUser : setBottomUser}
                />
                { !topIsSearching && !bottomIsSearching &&
                    <div className="Compare-Page">
                        <DuetLogo width={LOGO_WIDTH} height={LOGO_HEIGHT}/>
                        <div className="Compare-Inputs">
                            <div className="Compare-Input">
                                <button onClick={() => setTopIsSearching(true)}>{topUser.name}</button>
                            </div>
                            <h1>+</h1>
                            <div className="Compare-Input">
                                <button onClick={() => setBottomIsSearching(true)}>{bottomUser.name}</button>
                            </div>
                            <div className="Compare-ShareDuet">can&apos;t find your friend? <u>share duet!</u></div>
                        </div>
                        <div className="Compare-Toggles">
                            <div className="Compare-Toggle">
                                <div className="Compare-Toggle-Description">
                                    <h1>taste comparisons</h1>
                                    <h2>includes a series of infographics comparing the two chosen in your Duet</h2>
                                </div>
                                <Switch
                                    isOn={isComparing}
                                    id={"comparing"}
                                    handleToggle={handleToggleComparing}
                                />
                            </div>
                            <div className="Compare-Toggle">
                                <div className="Compare-Toggle-Description">
                                    <h1>music taste mixer</h1>
                                    <h2>includes a tool that creates a Spotify playlist that is a mix of taste between the two chosen in your Duet</h2>
                                </div>
                                <Switch
                                    isOn={isMixing}
                                    id={"mixing"}
                                    handleToggle={handleToggleMixing}
                                />
                            </div>
                        </div>
                        <div className="Compare-Buttons">
                            <Button onClick={handleGoClick} width={178} >go!</Button>
                            <button className="Compare-CreateGroup" onClick={toggleModal}>or <u>create a group!</u></button>
                        </div>
                    </div>   
                }
            </Page>
        </ModalWrapper>
    )
}

Compare.propTypes = {
    jumpToPage: func
}

export default Compare;