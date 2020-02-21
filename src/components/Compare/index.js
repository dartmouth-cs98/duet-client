/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../Page';
import DuetLogo from '../DuetLogo';
import Button from '../Button';
import Switch from '../Switch';
import Search from '../Search';
import { fetchUser1, fetchUser2 } from '../../actions';
import { addGroup } from '../../utils/backendUtils';
import { func } from 'prop-types';

const LOGO_HEIGHT = 130;
const LOGO_WIDTH = 210;
const EVERYONE_ID = "Everyone";

const Compare = ({ history }) => {

    const dispatch = useDispatch();
    const { user_1, my_id } = useSelector((state) => state.users);
    const [showPopup, setShowPopup] = useState(false);

    const [topIsSearching, setTopIsSearching] = useState(false);
    const [topUser, setTopUser] = useState({ name: 'Me', id: my_id });

    const [bottomIsSearching, setBottomIsSearching] = useState(false);
    const [bottomUser, setBottomUser] = useState({ name: 'Everyone', id: EVERYONE_ID });

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
                        <button className="Compare-CreateGroup" onClick={() => setShowPopup(!showPopup)}>or <u>create a group!</u></button>
                    </div>
    
                    { showPopup &&
                        <div className="popup">
                            {renderPopup()}
                        </div>
                    }
                </div>   
            }
        </Page>
    )
}

Compare.propTypes = {
    jumpToPage: func
}

export default Compare;