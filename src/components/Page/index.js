/* eslint-disable react/prop-types */
import React from 'react';
import _ from 'lodash';

const Page = ({ background, numPages, pageNum, children }) => {
    return (
        <div className="Page" style={{ background }}>
            { typeof numPages  !== 'undefined' & typeof pageNum !== 'undefined' 
            ? ( <div className="Story-progress">
                {_.range(numPages).map((i) => 
                    <div 
                        className="Story-progress-bar" 
                        key={i}
                        style={{
                                width: `${100/numPages}%`,
                                background: pageNum == i ? 'orange' : 'white',
                            }} 
                    />
            )}
            </div>) : <div/> }
            
            {children}
        </div>  
    )
}

export default Page;
