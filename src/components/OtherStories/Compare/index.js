/* eslint-disable react/prop-types */
import React, { useState, /*useEffect*/ } from 'react';
import { useDispatch } from 'react-redux';
import * as types from '../../../constants/actionTypes';
import Page from '../../Page';
import FilterResults from 'react-filter-search';
// import { queryUsers } from '../../../actions';
import { addGroup, search } from '../../../utils/backendUtils';


const Compare = (user_1, {jumpToPage}) => {

    const [showPopup, setShowPopup] = useState(false);

    const [users, setUsers] = useState([]);

    const dispatch = useDispatch();

    const [topBarIsSearching, setTopBarIsSearching] = useState(false);
    const [topUser, setTopUser] = useState('Me');
    const [topQueryVal, setTopQueryVal] = useState('Me');

    const [bottomBarIsSearching, setBottomBarIsSearching] = useState(false);
    const [bottomUser, setBottomUser] = useState('');
    const [bottomQueryVal, setBottomQueryVal] = useState('');

    const [groupNameVal, setGroupNameVal] = useState('');

    // useEffect(() => {
    //     fetch('https://cs98-duet.herokuapp.com/getall')
    //       .then(response => response.json())
    //       .then(json => setUsers(json));
    //   }, []);

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
        addGroup(groupNameVal, user_1.display_name)
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
        search(value).then(setUsers)
    };

    const handleTopUserSelect = (user) => {
        setTopUser(user);
        setTopBarIsSearching(false);
        setTopQueryVal(user.display_name);
    }

    const handleBottomChange = (e) => {
        const { value } = e.target;
        setBottomBarIsSearching(true)
        setBottomQueryVal(value)
        search(value).then(setUsers)
    };

    const handleBottomUserSelect = (user) => {
        setBottomUser(user);
        setBottomBarIsSearching(false);
        setBottomQueryVal(user.display_name);
    }

    const handleGoClick = () => {
        jumpToPage(3);
        if ( topUser != 'Me' ) {
            dispatch({ type: types.FETCH_USER_1, user: topUser })
        }
        dispatch({ type: types.FETCH_USER_2, user: bottomUser })
    }

    return (
        <Page background={'lightblue'}>
            <div id="background"/>
            <div id="content">
                <h3>compare...</h3>
                <div>
                    <input type="text" value={topQueryVal} onClick={() => setTopQueryVal('')} onChange={handleTopChange} />
                    {topBarIsSearching && 
                        <FilterResults
                            value={topQueryVal}
                            data={users}
                            renderResults={results => (
                                <div>
                                <span onClick={() => handleTopUserSelect({ display_name: 'Me'})}>Me</span>
                                {results.map(user => (
                                    <div key={user.id}>
                                    <span onClick={() => handleTopUserSelect(user)}>{user.display_name}</span>
                                    </div>
                                ))}
                                </div>
                            )}
                        />
                    }
                </div>
                <h3>to...</h3>
                <div>
                    <input type="text" value={bottomQueryVal} onClick={() => setBottomQueryVal('')} onChange={handleBottomChange} />
                    {bottomBarIsSearching && 
                        <FilterResults
                            value={bottomQueryVal}
                            data={users}
                            renderResults={results => (
                                <div>
                                {results.map(user => (
                                    <div key={user.id}>
                                    <span onClick={() => handleBottomUserSelect(user)}>{user.display_name}</span>
                                    </div>
                                ))}
                                </div>
                            )}
                        />
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

export default Compare;