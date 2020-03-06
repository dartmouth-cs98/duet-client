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
                        <svg width="31" height="22" viewBox="0 0 31 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8324 4.20955C10.5152 4.84489 10.3366 5.56179 10.3366 6.32045C10.3366 7.77352 10.9915 9.07344 12.0219 9.94043C9.66525 10.7167 8.05435 12.4965 8.05435 15.3057L8.00248 20.4057H22.1112L22.163 15.3057C22.163 12.4908 20.4917 10.7095 18.0973 9.93579C19.1245 9.0688 19.777 7.77093 19.777 6.32045C19.777 5.56179 19.5985 4.84489 19.2812 4.20955M10.8324 4.20955C11.6068 2.65889 13.2076 1.59412 15.0568 1.59412C16.906 1.59412 18.5069 2.65889 19.2812 4.20955M10.8324 4.20955C10.0439 3.6172 9.06412 3.26626 8.00248 3.26626C5.39559 3.26626 3.28229 5.38231 3.28229 7.99259C3.28229 9.44566 3.93717 10.7456 4.96751 11.6126C2.61091 12.3888 1 14.1686 1 16.9778V20.4057H15.1087H29.2174V16.9778C29.2174 14.163 27.546 12.3817 25.1516 11.6079C26.1788 10.7409 26.8314 9.44307 26.8314 7.99259C26.8314 5.38231 24.7181 3.26626 22.1112 3.26626C21.0495 3.26626 20.0698 3.6172 19.2812 4.20955" stroke="9BD6DC" strokeWidth="2"/>
                        </svg>   
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

