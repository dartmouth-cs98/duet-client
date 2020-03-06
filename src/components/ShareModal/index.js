/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '../Button';
import { isMobile } from "react-device-detect";

const SHARE_SUBJECT = "let's compare music taste on duetwith.me!"
const SHARE_MESSAGE = encodeURI("hey! let's compare and blend music tastes - join duet! ");

const BUTTON_WIDTH = 50;

const ShareModal = ({ toggleModal, shareRoute }) => {

    const shareLink = `${window.origin}${shareRoute}`;
    const messageLink = `sms:&body=${SHARE_MESSAGE}${shareLink}`;
    const emailLink = `mailto:?to=&body=${SHARE_MESSAGE}${shareLink}&subject=${SHARE_SUBJECT}`;

    const [copied, setCopied] = useState(false)

    const handleMessageClick = () => {
        window.open(messageLink, "_self");
    }

    const handleCopyClick = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
    }

    const handleEmailClick = () => {
        window.open(emailLink, "_self");
    }

    return (
        <div className="Share-Modal">
            <div className="Share-Modal-Close">
                <button onClick={toggleModal}>
                    <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16.5 16.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M16.5 1L0.999999 16.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>  
                </button>  
            </div>     
            <div className="Share-Modal-Buttons">
                { isMobile &&
                    <div className="Share-Modal-Button">
                        <Button width={BUTTON_WIDTH} onClick={handleMessageClick}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#E5277B" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM6 16L4 18V4H20V16H6ZM9 9H7V11H9V9ZM11 9H13V11H11V9ZM17 9H15V11H17V9Z" fill="9BD6DC" fillOpacity="1"/>
                            </svg>
                        </Button>
                        <h1>text</h1>
                    </div>
                }
                <div className="Share-Modal-Button" id={copied ? "copied" : ""}>
                    <Button width={BUTTON_WIDTH} onClick={handleCopyClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill={ copied ?  "#3D3C64" : "#E5277B" }
                            enableBackground="new 0 0 561 561"
                            version="1.1"
                            viewBox="0 0 561 561"
                            xmlSpace="preserve"
                            >
                            <path d="M395.25 0h-306c-28.05 0-51 22.95-51 51v357h51V51h306V0zm76.5 102h-280.5c-28.05 0-51 22.95-51 51v357c0 28.05 22.95 51 51 51h280.5c28.05 0 51-22.95 51-51V153c0-28.05-22.95-51-51-51zm0 408h-280.5V153h280.5v357z"></path>
                        </svg>
                    </Button>
                    <h1 style={{ color: copied ? "#3D3C64" : "#E5277B" }} >{ copied ?  "copied!" : "copy link" }</h1>
                </div>
                <div className="Share-Modal-Button">
                    <Button width={BUTTON_WIDTH} onClick={handleEmailClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" 
                            fill="#E5277B"
                            enableBackground="new 0 0 512 512"
                            version="1.1"
                            viewBox="0 0 512 512"
                            xmlSpace="preserve"
                            >
                            <path d="M467 61H45C20.218 61 0 81.196 0 106v300c0 24.72 20.128 45 45 45h422c24.72 0 45-20.128 45-45V106c0-24.72-20.128-45-45-45zm-6.214 30L256.954 294.833 51.359 91h409.427zM30 399.788V112.069l144.479 143.24L30 399.788zM51.213 421l144.57-144.57 50.657 50.222c5.864 5.814 15.327 5.795 21.167-.046L317 277.213 460.787 421H51.213zM482 399.787L338.213 256 482 112.212v287.575z"></path>
                        </svg>
                    </Button>
                    <h1>email</h1>
                </div>
            </div>
        </div>
    )
}

export default ShareModal;