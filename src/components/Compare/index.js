/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../Page';
import DuetLogo from '../DuetLogo';
import Button from '../Button';
import Switch from '../Switch';
import { fetchUser1, fetchUser2 } from '../../actions';
import { addGroup, search } from '../../utils/backendUtils';
import { func } from 'prop-types';

const LOGO_HEIGHT = 130;
const LOGO_WIDTH = 210;

const Compare = ({ history }) => {

    const dispatch = useDispatch();
    const { user_1 } = useSelector((state) => state.users);
    const [showPopup, setShowPopup] = useState(false);

    const [users, setUsers] = useState([]);

    const [topBarIsSearching, setTopBarIsSearching] = useState(false);
    const [topUser, setTopUser] = useState('Me');
    const [topQueryVal, setTopQueryVal] = useState('Me');

    const [bottomBarIsSearching, setBottomBarIsSearching] = useState(false);
    const [bottomUser, setBottomUser] = useState('select user to compare');
    const [bottomQueryVal, setBottomQueryVal] = useState('select user to compare');

    const [isComparing, setIsComparing] = useState(true);
    const [isMixing, setIsMixing] = useState(true);

    const [groupNameVal, setGroupNameVal] = useState('');

    const renderPopup = () => {
        return (
            <div id="PopupBackground">
                <button id="close" onClick={() => handleClose()}>x</button>
                <h3>name your group</h3>
                <input type="text" value={groupNameVal} onChange={handleGroupNameChange}></input>
                <button onClick={() => handleAddGroupClick()}>create</button>
            </div>
        )
    }

    const handleClose = () => {
        if (showPopup) {
            setShowPopup(!showPopup);
        } 
    }

    const handleAddGroupClick = () => {
        addGroup(groupNameVal, user_1.id)
        if (showPopup) {
            setShowPopup(!showPopup);
        } 
    }

    const handleGroupNameChange = (e) => {
        const { value } = e.target;
        setGroupNameVal(value)
    };

    const handleTopChange = (e) => {
        const { value } = e.target;
        setTopBarIsSearching(true)
        setTopQueryVal(value)
        if(value.length > 0) {
            search(value).then(setUsers)
        } else {
            setUsers([])
            setTopBarIsSearching(false)
        }
    };

    const handleTopUserSelect = (user) => {
        if ( user.display_name != 'Me' ) {
            setTopUser(user.id);
            setTopQueryVal(user.display_name);
            setTopBarIsSearching(false);
        } else {
            setTopBarIsSearching(false);
            setTopUser('Me');
            setTopQueryVal('Me');
        }
    }

    const handleBottomChange = (e) => {
        const { value } = e.target;
        setBottomBarIsSearching(true)
        setBottomQueryVal(value)
        if(value.length > 0) {
            search(value).then(setUsers)
        } else {
            setUsers([])
            setBottomBarIsSearching(false)
        }
    };

    const handleBottomUserSelect = (user) => {
        setBottomUser(user.id);
        setBottomBarIsSearching(false);
        setBottomQueryVal(user.display_name);
    }

    const handleGoClick = () => {
        if ( topUser != 'Me' ) {
            dispatch(fetchUser1(topUser));
        }
        dispatch(fetchUser2(bottomUser));
        history.push('/stories', { isComparing, isMixing })
    }

    return (
        <Page background={'#212034'}>
            <div className="Compare-Page">
                <DuetLogo width={LOGO_WIDTH} height={LOGO_HEIGHT}/>
                <div className="Compare-Inputs">
                    <div className="Compare-Input">
                        <input type="text" value={topQueryVal} onClick={() => setTopQueryVal('')} onChange={handleTopChange} />
                        {topBarIsSearching && 
                            <div>
                            <span onClick={() => handleTopUserSelect({ display_name: 'Me'})}>Me</span>
                            {users.map(user => (
                                <div key={user.id}>
                                    <span onClick={() => handleTopUserSelect(user)}>{user.display_name}</span>
                                </div>
                            ))}
                            </div>
                        }
                    </div>
                    <h1>+</h1>
                    <div className="Compare-Input">
                        <input type="text" value={bottomQueryVal} onClick={() => setBottomQueryVal('')} onChange={handleBottomChange} />
                        {bottomBarIsSearching && 
                            <div>
                                {users.map(user => (
                                    <div key={user.id}>
                                    <span onClick={() => handleBottomUserSelect(user)}>{user.display_name}</span>
                                    </div>
                                ))}
                            </div> 
                        }
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
                            handleToggle={() => setIsComparing(!isComparing)}
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
                            handleToggle={() => setIsMixing(!isMixing)}
                        />
                    </div>
                </div>
                <div className="Compare-Buttons">
                    <Button onClick={handleGoClick} width={178} >go!</Button>
                    <button className="Compare-CreateGroup" onClick={() => setShowPopup(!showPopup)}>or <u>create a group!</u></button>
                </div>
            </div>
            
            { showPopup &&
                <div className="popup">
                    {renderPopup()}
                </div>
            }
        </Page>
    )
}

Compare.propTypes = {
    jumpToPage: func
}

export default Compare;