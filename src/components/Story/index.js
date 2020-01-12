/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const Login = ({ jumpToPage }) => {
    return (
        <Page background={'white'}>
            Login Page
            <button onClick={() => jumpToPage(1)}>login</button>
        </Page>
    )
}

const InfoPage = () => {
    return (
        <Page background={'white'}>
            Info Page
        </Page>
    )
}

const ComparePage = ({ jumpToPage }) => {
    return (
        <Page background={'white'}>
            Compare Page
            <button onClick={() => jumpToPage(3)}>go!</button>
        </Page>
    )
}

const DataStory1 = () => {
    return (
        <Page background={'lightblue'} numPages={6} pageNum={0}>
            Data Story 1
        </Page>
    )
}

const DataStory2 = () => {
    return (
        <Page background={'yellow'} numPages={6} pageNum={1}>
            Data Story 2
        </Page>
    )
}

const DataStory3 = () => {
    return (
        <Page background={'red'} numPages={6} pageNum={2}>
            Data Story 3
        </Page>
    )
}

const DataStory4 = () => {
    return (
        <Page background={'orange'} numPages={6} pageNum={3}>
            Data Story 4
        </Page>
    )
}

const DataStory5 = () => {
    return (
        <Page background={'pink'} numPages={6} pageNum={4}>
            Data Story 5
        </Page>
    )
}

const DataStory6 = () => {
    return (
        <Page background={'purple'} numPages={6} pageNum={5}>
            Data Story 6
        </Page>
    )
}

const MembersScreen = () => {
    return (
        <Page background={'white'}>
            Members Screen
        </Page>
    )
}

const SharePage = ({ jumpToPage }) => {
    return (
        <Page background={'white'}>
            Share Page
            <button onClick={() => jumpToPage(2)}>compare again!</button>
        </Page>
    )
}

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
            component: <InfoPage key="infopage"/>, 
            pagination: NEXT_ONLY,
        },
        {   // page 2
            component: <ComparePage key="comparepage" jumpToPage={(page) => jumpToPage(page)}/>, 
            pagination: NONE,
        },
        {   // page 3
            component: <DataStory1 key="datastory1"/>,
            pagination: NEXT_ONLY,
        },
        {   // page 4
            component: <DataStory2 key="datastory2"/>,
            pagination: ALL,
        },
        {   // page 5
            component: <DataStory3 key="datastory3"/>,
            pagination: ALL,
        },
        {   // page 6
            component: <DataStory4 key="datastory4"/>,
            pagination: ALL,
        },
        {   // page 7
            component: <DataStory5 key="datastory5"/>,
            pagination: ALL,
        },
        {   // page 8
            component: <DataStory6 key="datastory6"/>,
            pagination: ALL,
        },
        {   // page 9
            component: <MembersScreen key="membersscreen"/>,
            pagination: NEXT_ONLY,
        },
        {   // page 10
            component: <SharePage key="sharepage" jumpToPage={(page) => jumpToPage(page)}/>,
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