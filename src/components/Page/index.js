import React from 'react';
import { string, number, node } from 'prop-types';

const Page = ({ background, children }) => {
    // const returnBarColor = (pageNum, i) => {
    //     if(pageNum == 0) {
    //         if(pageNum == i) {
    //             return('#E5277B');
    //         } else {
    //             return('#212034'); // dark blue
    //         }
    //     }
    //     if (pageNum == i){
    //         if(pageNum == 3) {
    //             return('#E5277B'); // pink
    //         } else if (pageNum == 2 || pageNum == 4) {
    //             return('#9BD6DC'); // light blue
    //         } else {
    //             return('#212034'); // dark blue
    //         } 
    //     } else {
    //         return('#ffffff'); // white
    //     }
    // }

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
