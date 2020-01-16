/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import TopArists from '../DataStories/TopArtists';
import Decades from '../DataStories/Decades';
import HeatMap from '../DataStories/HeatMap';
import MusicalAttr from '../DataStories/MusicalAttr';
import TopGenres from '../DataStories/TopGenres';
import Trendex from '../DataStories/Trendex';
import Login from '../OtherStories/Login';
import Members from '../OtherStories/Members';
import Compare from '../OtherStories/Compare';
import Info from '../OtherStories/Info';
import Share from '../OtherStories/Share';

const Story = () => {

    /* pagination options:
        - NONE: can only exit this page using a button (see Login)
        - ALL: can pagination forwards or backwards
        - NEXT_ONLY: can only move forward
        - PREV_ONLY: can only move backward
    */
    const NONE = 'NONE';
    const ALL = 'ALL';
    const NEXT_ONLY = 'NEXT_ONLY';
    const PREV_ONLY = 'PREV_ONLY';

    const pages = [
        {   // page 0
            component: <Login key="login" jumpToPage={(page) => jumpToPage(page)}/>, 
            pagination: NONE,
        },
        {   // page 1
            component: <Info key="infopage"/>, 
            pagination: NEXT_ONLY,
        },
        {   // page 2
            component: <Compare key="comparepage" jumpToPage={(page) => jumpToPage(page)}/>, 
            pagination: NONE,
        },
        {   // page 3
            component: <TopArists key="topartists"/>,
            pagination: NEXT_ONLY,
        },
        {   // page 4
            component: <Trendex key="trendex"/>,
            pagination: ALL,
        },
        {   // page 5
            component: <TopGenres key="topgenres"/>,
            pagination: ALL,
        },
        {   // page 6
            component: <MusicalAttr key="musicalattr"/>,
            pagination: ALL,
        },
        {   // page 7
            component: <Decades key="decades"/>,
            pagination: ALL,
        },
        {   // page 8
            component: <HeatMap key="heatmap"/>,
            pagination: ALL,
        },
        {   // page 9
            component: <Members key="membersscreen" jumpToPage={(page) => jumpToPage(page)}/>,
            pagination: NONE,
        },
        {   // page 10
            component: <Share key="sharepage" jumpToPage={(page) => jumpToPage(page)}/>,
            pagination: NONE,
        },
    ];
    const numPages = pages.length;
    const [currPage, setCurrPage] = useState(0);
    
    const [width, setWidth] = useState(window.innerWidth);

      useEffect(() => {
        const handleResize = () => {
          setWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        return () => { window.removeEventListener("resize", handleResize) }
      }, [])

    const handleClick = (e) => {
        const pagination = pages[currPage].pagination;
        if (pagination != NONE) {
            if (pagination == ALL) {
                if (e.clientX > (width / 2)) {
                    if (currPage < numPages - 1) 
                        setCurrPage(currPage + 1)
                } else {
                    if (currPage > 0)
                        setCurrPage(currPage - 1);
                }
            }
            else if (pagination == NEXT_ONLY) {
                setCurrPage(currPage + 1)
            } else if (pagination == PREV_ONLY) {
                setCurrPage(currPage - 1)
            }
        }  
    }
    
    const jumpToPage = (page) => {
        setCurrPage(page);
    }

    return (
        <div onClick={handleClick} className="Story">
            {pages[currPage].component}
        </div>
    )
}

export default Story;