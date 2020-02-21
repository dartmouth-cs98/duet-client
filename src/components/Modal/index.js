/* eslint-disable react/prop-types */
import React from 'react';

const ModalWrapper = ({ children, showModal }) => {
    // first element is the modal
    const Modal = children[0];
    // everything else is Content
    const Content = children.slice(1, children.length);

    return (
        <div className="Modal-Container">
            <div className="Modal-Blur" style={{ filter: showModal ? 'blur(4px)' : 'none' }}>
                {Content}
            </div>
            { showModal && Modal }
        </div>
    );
}

export default ModalWrapper;