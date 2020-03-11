/* eslint-disable react/prop-types */
import React from 'react';
import Popup from '../Popup';
import { string, number, node, bool } from 'prop-types';

const Page = ({ background, children, showPopup, history, pageInfo, pageName, disableRestart }) => {

    const showPopupRestart = !disableRestart

    return (
        <div className="Page-Container" style={{ background }}>
            <div className="Page" style={{ background }}>
                {children}
                { showPopup && <Popup history={history} pageInfo={pageInfo} pageName={pageName} showRestart={showPopupRestart}/> }
            </div>  
        </div>
    )
}

Page.propTypes = {
    background: string,
    numPages: number,
    pageNum: number,
    children: node,
    showPopup: bool,
    pageInfo: string,
    pageName: string,
};

export default React.memo(Page);
