/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../Page';
import DuetLogo from '../DuetLogo';
import Button from '../Button';
import Switch from '../Switch';
import Search from '../Search';
import ModalWrapper from '../Modal';
import ShareModal from '../ShareModal';
import ReactLoading from 'react-loading';
import * as types from '../../constants/actionTypes';
import { fetchUser1, fetchUser2 } from '../../actions';
import { addGroup } from '../../utils/backendUtils';
import { func } from 'prop-types';


const LOGO_HEIGHT = 130;
const LOGO_WIDTH = 210;
const EVERYONE_ID = "Everyone";

const CreateGroupModal = ({ toggleModal, setIsSharing, setShareRoute, my_id, my_groups, token }) => {

    const NAMING_GROUP = 'NAMING_GROUP';
    const CREATING_GROUP = 'CREATING_GROUP';
    const GROUP_CREATED = 'GROUP_CREATED';
    const GROUP_FAILED = 'GROUP_FAILED';

    const dispatch = useDispatch();

    const [groupName, setGroupName] = useState('');
    const [status, setStatus] = useState(NAMING_GROUP)
    const [error, setError] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const handleAddGroupClick = () => {
        setStatus(CREATING_GROUP);
        addGroup(groupName, my_id, isPrivate, token).then(() => {
            const newGroup = { display_name: groupName, id: groupName, private: isPrivate };
            dispatch({ type: types.FETCH_MY_GROUPS, groups: [...my_groups, newGroup ]})
            setStatus(GROUP_CREATED)
        }, (response) => {
            setStatus(GROUP_FAILED);
            setError(response['ERROR GROUP EXISTS']);
        });
    }

    const handleInviteClick = () => {
        setIsSharing(true);
        setShareRoute(`/joingroup/${encodeURI(groupName)}`);
    }

    return (
        <div className="Compare-CreateGroup-Modal">
            <div className="Compare-CreateGroup-Modal-Close">
                <button onClick={toggleModal}>
                    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16.5 16.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M16.5 1L0.999999 16.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>  
                </button>  
            </div>
            { status === NAMING_GROUP &&
                <>  
                    <h1>Name your group</h1>
                    <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)}></input>
                    <div className="checkbox">
                        <input name="isPrivate" type="checkbox" checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)}/>
                        <span>make this group private</span>
                    </div>
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
                    <Button onClick={handleInviteClick}> invite friends </Button>
                </>
            }
            { status === GROUP_FAILED && 
                <>
                    <h1>group creation failed!</h1>
                    <h2>{error}</h2>
                </>
            }
        </div>
    )
}

const Compare = ({ history }) => {

    const dispatch = useDispatch();
    const { my_groups, my_id } = useSelector((state) => state.users);
    const { token } = useSelector((state) => state.auth);

    const [showModal, setShowModal] = useState(false);

    const [topIsSearching, setTopIsSearching] = useState(false);
    const [topUser, setTopUser] = useState({ name: 'Me', id: my_id, isGroup: false });

    const [bottomIsSearching, setBottomIsSearching] = useState(false);
    const [bottomUser, setBottomUser] = useState({ name: 'Everyone', id: EVERYONE_ID, isGroup: true });

    const [isComparing, setIsComparing] = useState(true);
    const [isMixing, setIsMixing] = useState(true);

    const [shareRoute, setShareRoute] = useState('');
    const [isSharing, setIsSharing] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
        if (isSharing) setIsSharing(false);
    }

    const handleShareClick = () => {
        setIsSharing(true);
        setShareRoute(`/join/${my_id}`);
        toggleModal();
    }

    const handleGoClick = () => {
        localStorage.removeItem("referrer");
        dispatch(fetchUser1(topUser.id, token))
        dispatch(fetchUser2(bottomUser.id, token));
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
            { isSharing ?  
                <ShareModal toggleModal={toggleModal} shareRoute={shareRoute} />
            :
                <CreateGroupModal 
                    toggleModal={toggleModal} 
                    setIsSharing={setIsSharing} 
                    setShareRoute={setShareRoute}
                    my_id={my_id} 
                    my_groups={my_groups} 
                    token={token} 
                />
             }
            <Page background={'#212034'}>
                <Search 
                    my_groups={my_groups}
                    my_id={my_id}
                    enabled={topIsSearching || bottomIsSearching} 
                    setIsSearching={topIsSearching ? setTopIsSearching : setBottomIsSearching}
                    setUser={topIsSearching ? setTopUser : setBottomUser}
                />
                { !topIsSearching && !bottomIsSearching &&
                    <div className="Compare-Page">
                        <DuetLogo width={LOGO_WIDTH} height={LOGO_HEIGHT}/>
                        <div className="Compare-Inputs">
                            <div className="Compare-Input">
                                <button onClick={() => setTopIsSearching(true)}>
                                    <div className="iconGroup">
                                    {topUser.isGroup ? 
                                        <svg width="31" height="22" viewBox="0 0 31 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.8324 4.20955C10.5152 4.84489 10.3366 5.56179 10.3366 6.32045C10.3366 7.77352 10.9915 9.07344 12.0219 9.94043C9.66525 10.7167 8.05435 12.4965 8.05435 15.3057L8.00248 20.4057H22.1112L22.163 15.3057C22.163 12.4908 20.4917 10.7095 18.0973 9.93579C19.1245 9.0688 19.777 7.77093 19.777 6.32045C19.777 5.56179 19.5985 4.84489 19.2812 4.20955M10.8324 4.20955C11.6068 2.65889 13.2076 1.59412 15.0568 1.59412C16.906 1.59412 18.5069 2.65889 19.2812 4.20955M10.8324 4.20955C10.0439 3.6172 9.06412 3.26626 8.00248 3.26626C5.39559 3.26626 3.28229 5.38231 3.28229 7.99259C3.28229 9.44566 3.93717 10.7456 4.96751 11.6126C2.61091 12.3888 1 14.1686 1 16.9778V20.4057H15.1087H29.2174V16.9778C29.2174 14.163 27.546 12.3817 25.1516 11.6079C26.1788 10.7409 26.8314 9.44307 26.8314 7.99259C26.8314 5.38231 24.7181 3.26626 22.1112 3.26626C21.0495 3.26626 20.0698 3.6172 19.2812 4.20955" stroke="#E5277B" strokeWidth="2"/>
                                        </svg>                                    
                                        :
                                        <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.2319 19.8116V16.0493C17.2319 12.9598 15.4086 11.0047 12.7965 10.1555C13.9171 9.20392 14.6289 7.77943 14.6289 6.18744C14.6289 3.3225 12.3235 1 9.47964 1C6.63577 1 4.33035 3.3225 4.33035 6.18744C4.33035 7.78227 5.04476 9.20901 6.16877 10.1606C3.59793 11.0125 1.84058 12.966 1.84058 16.0493V19.8116H17.2319Z" stroke="#E5277B" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                        }
                                    {topUser.name}
                                    </div>
                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.42857 0.195312C9.39875 0.195313 11.2882 0.977963 12.6814 2.37109C14.0745 3.76422 14.8571 5.6537 14.8571 7.62388C14.8571 9.46388 14.1829 11.1553 13.0743 12.4582L13.3829 12.7667H14.2857L20 18.481L18.2857 20.1953L12.5714 14.481V13.5782L12.2629 13.2696C10.96 14.3782 9.26857 15.0525 7.42857 15.0525C5.45839 15.0525 3.56891 14.2698 2.17578 12.8767C0.782651 11.4836 0 9.59406 0 7.62388C0 5.6537 0.782651 3.76422 2.17578 2.37109C3.56891 0.977963 5.45839 0.195313 7.42857 0.195312ZM7.42857 2.48103C4.57143 2.48103 2.28571 4.76674 2.28571 7.62388C2.28571 10.481 4.57143 12.7667 7.42857 12.7667C10.2857 12.7667 12.5714 10.481 12.5714 7.62388C12.5714 4.76674 10.2857 2.48103 7.42857 2.48103Z" fill="#413F66"/>
                                    </svg>
                                </button>
                            </div>
                            <h1>+</h1>
                            <div className="Compare-Input">
                                <button onClick={() => setBottomIsSearching(true)}>
                                    <div className="iconGroup">
                                    {bottomUser.isGroup ? 
                                        <svg width="31" height="22" viewBox="0 0 31 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.8324 4.20955C10.5152 4.84489 10.3366 5.56179 10.3366 6.32045C10.3366 7.77352 10.9915 9.07344 12.0219 9.94043C9.66525 10.7167 8.05435 12.4965 8.05435 15.3057L8.00248 20.4057H22.1112L22.163 15.3057C22.163 12.4908 20.4917 10.7095 18.0973 9.93579C19.1245 9.0688 19.777 7.77093 19.777 6.32045C19.777 5.56179 19.5985 4.84489 19.2812 4.20955M10.8324 4.20955C11.6068 2.65889 13.2076 1.59412 15.0568 1.59412C16.906 1.59412 18.5069 2.65889 19.2812 4.20955M10.8324 4.20955C10.0439 3.6172 9.06412 3.26626 8.00248 3.26626C5.39559 3.26626 3.28229 5.38231 3.28229 7.99259C3.28229 9.44566 3.93717 10.7456 4.96751 11.6126C2.61091 12.3888 1 14.1686 1 16.9778V20.4057H15.1087H29.2174V16.9778C29.2174 14.163 27.546 12.3817 25.1516 11.6079C26.1788 10.7409 26.8314 9.44307 26.8314 7.99259C26.8314 5.38231 24.7181 3.26626 22.1112 3.26626C21.0495 3.26626 20.0698 3.6172 19.2812 4.20955" stroke="#9BD6DC" strokeWidth="2"/>
                                        </svg>                                    
                                        :
                                        <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.2319 19.8116V16.0493C17.2319 12.9598 15.4086 11.0047 12.7965 10.1555C13.9171 9.20392 14.6289 7.77943 14.6289 6.18744C14.6289 3.3225 12.3235 1 9.47964 1C6.63577 1 4.33035 3.3225 4.33035 6.18744C4.33035 7.78227 5.04476 9.20901 6.16877 10.1606C3.59793 11.0125 1.84058 12.966 1.84058 16.0493V19.8116H17.2319Z" stroke="#9BD6DC" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                        }
                                    {bottomUser.name}
                                    </div>
                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.42857 0.195312C9.39875 0.195313 11.2882 0.977963 12.6814 2.37109C14.0745 3.76422 14.8571 5.6537 14.8571 7.62388C14.8571 9.46388 14.1829 11.1553 13.0743 12.4582L13.3829 12.7667H14.2857L20 18.481L18.2857 20.1953L12.5714 14.481V13.5782L12.2629 13.2696C10.96 14.3782 9.26857 15.0525 7.42857 15.0525C5.45839 15.0525 3.56891 14.2698 2.17578 12.8767C0.782651 11.4836 0 9.59406 0 7.62388C0 5.6537 0.782651 3.76422 2.17578 2.37109C3.56891 0.977963 5.45839 0.195313 7.42857 0.195312ZM7.42857 2.48103C4.57143 2.48103 2.28571 4.76674 2.28571 7.62388C2.28571 10.481 4.57143 12.7667 7.42857 12.7667C10.2857 12.7667 12.5714 10.481 12.5714 7.62388C12.5714 4.76674 10.2857 2.48103 7.42857 2.48103Z" fill="#413F66"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="Compare-ShareDuet" onClick={handleShareClick}>
                                can&apos;t find your friend? <u>share duet!</u>
                            </div>
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