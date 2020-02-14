/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../Page';
import { fetchUser1, fetchUser2 } from '../../../actions';
import { addGroup, search } from '../../../utils/backendUtils';
import { func } from 'prop-types';

const Compare = ({ history }) => {

    const dispatch = useDispatch();
    const { user_1 } = useSelector((state) => state.users);
    const [showPopup, setShowPopup] = useState(false);

    const [users, setUsers] = useState([]);

    const [topBarIsSearching, setTopBarIsSearching] = useState(false);
    const [topUser, setTopUser] = useState('Me');
    const [topQueryVal, setTopQueryVal] = useState('Me');

    const [bottomBarIsSearching, setBottomBarIsSearching] = useState(false);
    const [bottomUser, setBottomUser] = useState('');
    const [bottomQueryVal, setBottomQueryVal] = useState('');

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
        history.push('/stories')
    }

    return (
        <Page background={'lightblue'}>
            <div id="background"/>
            <div id="content">
                <h3>compare...</h3>
                <div>
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
                <h3>to...</h3>
                <div>
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
                <button onClick={handleGoClick}>go!</button>
                <button id="smallLink" onClick={() => setShowPopup(!showPopup)}>or create a group</button>
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