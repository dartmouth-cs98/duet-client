/* eslint-disable react/prop-types */
import React from 'react';
import Page from '../../Page';
import DuetLogo from '../../DuetLogo';
import * as types from '../../../constants/actionTypes';
import { useDispatch } from 'react-redux';
import { func } from 'prop-types';

const LOGO_HEIGHT = 60;
const LOGO_WIDTH = 90;

const Share = ({ history }) => {

    const dispatch = useDispatch();

    const handleCompareAgain = () => {
        dispatch({ type: types.CLEAR_USERS })
        history.push('/compare');
    }

    return (
        <Page background={'#9BD6DC'}>
            <div id="Share">
                <div id="headline">
                    <h1>wanna</h1>
                    <DuetLogo width={LOGO_WIDTH} height={LOGO_HEIGHT} color="#212034"/>
                    <h1>again?</h1>
                </div>
                <a href="sms:&body=hey!%20let's%20compare%20and%20blend%20music%20tastes%20-%20join%20duet!%20http://cs98-duet.surge.sh/">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#9BD6DC" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM6 16L4 18V4H20V16H6ZM9 9H7V11H9V9ZM11 9H13V11H11V9ZM17 9H15V11H17V9Z" fill="9BD6DC" fillOpacity="1"/>
                    </svg>
                invite your friends</a>
                <button onClick={handleCompareAgain}>
                        <svg width="31" height="22" viewBox="0 0 31 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8324 4.20955C10.5152 4.84489 10.3366 5.56179 10.3366 6.32045C10.3366 7.77352 10.9915 9.07344 12.0219 9.94043C9.66525 10.7167 8.05435 12.4965 8.05435 15.3057L8.00248 20.4057H22.1112L22.163 15.3057C22.163 12.4908 20.4917 10.7095 18.0973 9.93579C19.1245 9.0688 19.777 7.77093 19.777 6.32045C19.777 5.56179 19.5985 4.84489 19.2812 4.20955M10.8324 4.20955C11.6068 2.65889 13.2076 1.59412 15.0568 1.59412C16.906 1.59412 18.5069 2.65889 19.2812 4.20955M10.8324 4.20955C10.0439 3.6172 9.06412 3.26626 8.00248 3.26626C5.39559 3.26626 3.28229 5.38231 3.28229 7.99259C3.28229 9.44566 3.93717 10.7456 4.96751 11.6126C2.61091 12.3888 1 14.1686 1 16.9778V20.4057H15.1087H29.2174V16.9778C29.2174 14.163 27.546 12.3817 25.1516 11.6079C26.1788 10.7409 26.8314 9.44307 26.8314 7.99259C26.8314 5.38231 24.7181 3.26626 22.1112 3.26626C21.0495 3.26626 20.0698 3.6172 19.2812 4.20955" stroke="9BD6DC" strokeWidth="2"/>
                        </svg>   
                    compare again
                </button>
            </div>
        </Page>
    )
}

Share.propTypes = {
    jumpToPage: func
}

export default Share;

