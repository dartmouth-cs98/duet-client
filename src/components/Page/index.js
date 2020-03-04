import React, { useState, useEffect } from 'react';
import { string, number, node, bool } from 'prop-types';
import { isMobile } from "react-device-detect";

const Page = ({ background, children, showOverlay }) => {
    const [showingOverlay, setShowingOverlay] = useState(!!showOverlay);

    setTimeout(() => setShowingOverlay(false), 3000);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    })

    const handleKeyDown = () => {
        setShowingOverlay(false);
    }

    const handleOverlayClick = () => {
        setShowingOverlay(false);
    }

    return (
        <div className="Page-Container"onKeyDown={handleKeyDown} style={{ background }}>
            <div id="Overlay" onClick={() => handleOverlayClick()} className={showingOverlay ? '' :'fadeOut'}  >
                <div id={isMobile ? (Math.floor( Math.random() * 10000 ) == 42 ? 'swipe2' : 'swipe') : 'arrowKeys'}></div>
            </div>
            <div className="Page" style={{ background }}>
                {children}
            </div>  
        </div>
    )
}

Page.propTypes = {
    background: string,
    numPages: number,
    pageNum: number,
    children: node,
    showOverlay: bool,
};

export default Page;
