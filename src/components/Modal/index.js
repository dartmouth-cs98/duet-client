/* eslint-disable react/prop-types */
import React from 'react';
import Page from '../Page';

const ModalWrapper = ({ children, showModal, history, pageInfo, pageName, disableRestart }) => {
    // first element is the modal
    const Modal = children[0];
    // everything else is Content
    const Content = children.slice(1, children.length);

    return (
        <div className="Modal-Container">
            <div className="Modal-Blur" style={{ filter: showModal ? 'blur(4px)' : 'none' }}>
            <Page 
                background={'#212034'} 
                showPopup 
                history={history} 
                pageInfo={pageInfo} 
                pageName={pageName}
                disableRestart={disableRestart}
            >
                {Content}
            </Page>
            </div>
            { showModal && Modal }
        </div>
    );
}

export default ModalWrapper;