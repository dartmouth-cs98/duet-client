import React from 'react';
import { string, number, node } from 'prop-types';

const Page = ({ background, children }) => {
    return (
        <div className="Page-Container" style={{ background }}>
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
};

export default Page;
