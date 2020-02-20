import React, { useState } from 'react';
import TopArists from './TopArtists';
import Decades from './Decades';
import MusicalAttr from './MusicalAttr';
import TopGenres from './TopGenres';
import Trendex from './Trendex';
import Blender from './Blender';
// import Members from './Members';
import Share from './Share';
import { useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import _ from 'lodash';


const Stories = ({ history, location }) => {
    const { isComparing, isMixing } = location.state;

    const { user_1, user_2, my_id } = useSelector((state) => state.users);

    const [swipeDisabled, setSwipeDisable] = useState(false);

    const numPages = (isMixing ? 1 : 0) + (isComparing ? 5 : 0) + 1;
    const [currPage, setCurrPage] = useState(0);

    const PAGE_COLORS = ['#9BD6DC', '#E5277B']
    const returnBarColor = (currPage, i) => {
        if (currPage == i) {
            return PAGE_COLORS[i % 2]
        } else {
            return '#ffffff';
        }
        
    }

    const renderSwipableViews = () => {
        if (isMixing && isComparing) {
            return (
                <SwipeableViews onChangeIndex={(i) => setCurrPage(i)} disabled={swipeDisabled}>
                    <TopArists user_1={user_1} user_2={user_2} my_id={my_id} key="topartists"/>
                    <Trendex user_1={user_1} user_2={user_2} my_id={my_id} key="trendex"/>
                    <TopGenres user_1={user_1} user_2={user_2} key="topgenres"/>
                    <MusicalAttr user_1={user_1} user_2={user_2} my_id={my_id} key="musicalattr"/>
                    <Decades user_1={user_1} user_2={user_2} my_id={my_id} key="decades"/> 
                    {/* <Members key="membersscreen"/> */}
                    <Blender key="blender" user_1={user_1} user_2={user_2} my_id={my_id} setSwipeDisable={setSwipeDisable}/>
                    <Share history={history} key="sharepage" />
                </SwipeableViews>
            );
        } else if (isMixing) {
            return (
                <SwipeableViews onChangeIndex={(i) => setCurrPage(i)} disabled={swipeDisabled}>
                    <Blender key="blender" user_1={user_1} user_2={user_2} my_id={my_id} setSwipeDisable={setSwipeDisable}/>
                    <Share history={history} key="sharepage" />
                </SwipeableViews>
            );
        } else {
            return (
                <SwipeableViews onChangeIndex={(i) => setCurrPage(i)} disabled={swipeDisabled}>
                    <TopArists user_1={user_1} user_2={user_2} my_id={my_id} key="topartists"/>
                    <Trendex user_1={user_1} user_2={user_2} my_id={my_id} key="trendex"/>
                    <TopGenres user_1={user_1} user_2={user_2} key="topgenres"/>
                    <MusicalAttr user_1={user_1} user_2={user_2} my_id={my_id} key="musicalattr"/>
                    <Decades user_1={user_1} user_2={user_2} my_id={my_id} key="decades"/> 
                    {/* <Members key="membersscreen"/> */}
                    <Share history={history} key="sharepage" />
                </SwipeableViews>
            )
        }
        
    }

    if (user_1 && user_2) {
        return (
            <div>
                <div className="Stories-progress">
                    {_.range(numPages).map((i) => 
                        <div 
                            className="Stories-progress-bar"
                            key={i}
                            style={{ width: `${100 / numPages}%`, background: returnBarColor(currPage, i)}}
                        />
                    )}
                </div>
                {renderSwipableViews()}
            </div>
        );
    } 
    else {
        return <div/>
    }
}

export default Stories;