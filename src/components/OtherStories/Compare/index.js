import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as types from '../../../constants/actionTypes';
import Page from '../../Page';
import FilterResults from 'react-filter-search';
import { queryUsers } from '../../../actions';
import { func } from 'prop-types';

const Compare = ({ jumpToPage }) => {

    const [showPopup, setShowPopup] = useState(false);

    const [users, setUsers] = useState([]);

    const dispatch = useDispatch();

    const [topBarIsSearching, setTopBarIsSearching] = useState(false);
    const [topUser, setTopUser] = useState('Me');
    const [topQueryVal, setTopQueryVal] = useState('Me');

    const [bottomBarIsSearching, setBottomBarIsSearching] = useState(false);
    const [bottomUser, setBottomUser] = useState('');
    const [bottomQueryVal, setBottomQueryVal] = useState('');

    // useEffect(() => {
    //     fetch('https://cs98-duet.herokuapp.com/getall')
    //       .then(response => response.json())
    //       .then(json => setUsers(json));
    //   }, []);

    const renderPopup = () => {
        return (
            <div id="PopupBackground">
                <button id="close" onClick={() => handleClick()}>x</button>
                <h3>name your group</h3>
                <input></input>
                <button onClick={() => handleClick()}>create</button>
            </div>
        )
    }

    const handleClick = () => {
        if (showPopup) {
            setShowPopup(!showPopup);
        } 
    }

    const handleTopChange = (e) => {
        const { value } = e.target;
        setTopBarIsSearching(true)
        setTopQueryVal(value)
        setUsers(queryUsers(value));
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
        setUsers(queryUsers(value));
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

Compare.propTypes = {
    jumpToPage: func
}

export default Compare;