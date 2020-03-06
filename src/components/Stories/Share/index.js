/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Page from '../../Page';
import DuetLogo from '../../DuetLogo';
import ModalWrapper from '../../Modal';
import ShareModal from '../../ShareModal';
import * as types from '../../../constants/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser1 } from '../../../actions';
import { func } from 'prop-types';

const LOGO_HEIGHT = 60;
const LOGO_WIDTH = 90;

const Share = ({ history, my_id }) => {

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const handleCompareAgain = () => {
        dispatch({ type: types.CLEAR_USERS })
        dispatch(fetchUser1(my_id, token))
        history.push('/compare');
    }


    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    return (
        <ModalWrapper showModal={showModal}>
            <ShareModal toggleModal={toggleModal} shareRoute={`/join/${my_id}`} />
            <Page background={'#212034'}>
                <div id="Share">
                    <div id="headline">
                        <h1>wanna</h1>
                        <DuetLogo width={LOGO_WIDTH} height={LOGO_HEIGHT}/>
                        <h1>again?</h1>
                    </div>
                    <div className="Share-Invite" onClick={toggleModal}>
                        invite your friends 
                    </div>
                    <button onClick={handleCompareAgain}> 
                    duet again
                    </button>
                </div>
            </Page>
        </ModalWrapper>   
    )
}

Share.propTypes = {
    jumpToPage: func
}

export default React.memo(Share);

