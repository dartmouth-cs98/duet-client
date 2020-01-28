/* eslint-disable react/prop-types */
import React from 'react';
import _ from 'lodash';

const Page = ({ background, numPages, pageNum, children }) => {
    const returnBarColor = (pageNum, i) => {
        if(pageNum == 0 || pageNum == 5) {
            if(pageNum == i) {
                return('#E5277B');
            } else {
                return('#212034'); // dark blue
            }
        }
        if (pageNum == i){
            if(pageNum == 3) {
                return('#E5277B'); // pink
            } else if (pageNum == 2 || pageNum == 4) {
                return('#9BD6DC'); // light blue
            } else {
                return('#212034'); // dark blue
            } 
        } else {
            return('#ffffff'); // white
        }
    }

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
                                background: returnBarColor(pageNum, i),
                            }} 
                    />
            )}
            </div>) : <div/> }
            
            {children}
        </div>  
    )
}

export default Page;
