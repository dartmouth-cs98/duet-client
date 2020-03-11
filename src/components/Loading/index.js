/* eslint-disable react/prop-types */
import React from "react";
import DuetLogo from '../DuetLogo';
import ReactLoading from "react-loading";

const DUET_LOGO_HEIGHT = 150;
const DUET_LOGO_WIDTH = 200;

const LoadingPage = ({ children }) => (
    <div className="Loading-Page">
        <div className="Loading-Page-Content">
            <DuetLogo width={DUET_LOGO_WIDTH} height={DUET_LOGO_HEIGHT}/>
            <ReactLoading type={'bars'} color="#fff" />
            <h1>{children}</h1>
        </div>
    </div>
);

export default React.memo(LoadingPage);
