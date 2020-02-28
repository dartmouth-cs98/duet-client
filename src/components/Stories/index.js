import React, { useState, useEffect } from 'react';
import TopArists from './TopArtists';
import Decades from './Decades';
import MusicalAttr from './MusicalAttr';
import TopGenres from './TopGenres';
import Trendex from './Trendex';
import Blender from './Blender';
import Members from './Members';
import Share from './Share';
import { useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import Loading from '../Loading';
import _ from 'lodash';

const swipableViewsStyle = {
    height: '100%',
}

const Stories = ({ history, location }) => {
    const { isComparing, isMixing } = location.state;

    const { user_1, user_2, my_id } = useSelector((state) => state.users);

    const [swipeDisabled, setSwipeDisable] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [numPages, setNumPages] = useState((isMixing ? 1 : 0) + (isComparing ? 5 : 0) + 1);

    const [currPage, setCurrPage] = useState(0);

    const PAGE_COLORS = ['#9BD6DC', '#E5277B']
    const returnBarColor = (currPage, i) => {
        if (currPage == i) {
            return PAGE_COLORS[i % 2]
        } else {
            return '#ffffff';
        }
    }

    useEffect(() => {
        if (user_2 && user_2.isGroup) {
            setNumPages(numPages + 1);
        }
        setTimeout(() => setLoaded(true), 2000);
    }, [user_2]);

    const renderSwipableViews = () => {
        if (isMixing && isComparing) {
            if (user_2.isGroup && user_1.id == my_id) {
                return (
                    <SwipeableViews style={swipableViewsStyle} onChangeIndex={(i) => setCurrPage(i)} disabled={swipeDisabled}>
                        <TopArists user_1={user_1} user_2={user_2} my_id={my_id} key="topartists"/>
                        <Trendex user_1={user_1} user_2={user_2} my_id={my_id} key="trendex"/>
                        <TopGenres user_1={user_1} user_2={user_2} key="topgenres"/>
                        <MusicalAttr user_1={user_1} user_2={user_2} my_id={my_id} key="musicalattr"/>
                        <Decades user_1={user_1} user_2={user_2} my_id={my_id} key="decades"/> 
                        <Blender key="blender" user_1={user_1} user_2={user_2} my_id={my_id} setSwipeDisable={setSwipeDisable}/>
                        <Members user_1={user_1} user_2={user_2} my_id={my_id} key="membersscreen"/>
                        <Share history={history} my_id={my_id} key="sharepage" />
                    </SwipeableViews>
                );
            } else {
                return (
                    <SwipeableViews style={swipableViewsStyle} onChangeIndex={(i) => setCurrPage(i)} disabled={swipeDisabled}>
                        <TopArists user_1={user_1} user_2={user_2} my_id={my_id} key="topartists"/>
                        <Trendex user_1={user_1} user_2={user_2} my_id={my_id} key="trendex"/>
                        <TopGenres user_1={user_1} user_2={user_2} key="topgenres"/>
                        <MusicalAttr user_1={user_1} user_2={user_2} my_id={my_id} key="musicalattr"/>
                        <Decades user_1={user_1} user_2={user_2} my_id={my_id} key="decades"/> 
                        <Blender key="blender" user_1={user_1} user_2={user_2} my_id={my_id} setSwipeDisable={setSwipeDisable}/>
                        <Share history={history} my_id={my_id} key="sharepage" />
                    </SwipeableViews>
                );
            }
        } else if (isMixing) {
            if (user_2.isGroup && user_1.id == my_id) {
                return (
                    <SwipeableViews style={swipableViewsStyle} onChangeIndex={(i) => setCurrPage(i)} disabled={swipeDisabled}>
                        <Members user_1={user_1} user_2={user_2} my_id={my_id} key="membersscreen"/>
                        <Blender key="blender" user_1={user_1} user_2={user_2} my_id={my_id} setSwipeDisable={setSwipeDisable}/>
                        <Share history={history} my_id={my_id} key="sharepage" />
                    </SwipeableViews>
                );
            } else {
                return (
                    <SwipeableViews style={swipableViewsStyle} onChangeIndex={(i) => setCurrPage(i)} disabled={swipeDisabled}>
                        <Blender key="blender" user_1={user_1} user_2={user_2} my_id={my_id} setSwipeDisable={setSwipeDisable}/>
                        <Share history={history} my_id={my_id} key="sharepage" />
                    </SwipeableViews>
                );
            }
        } else {
            if (user_2.isGroup && user_1.id == my_id) {
                return (
                    <SwipeableViews style={swipableViewsStyle} onChangeIndex={(i) => setCurrPage(i)} disabled={swipeDisabled}>
                        <TopArists user_1={user_1} user_2={user_2} my_id={my_id} key="topartists"/>
                        <Trendex user_1={user_1} user_2={user_2} my_id={my_id} key="trendex"/>
                        <TopGenres user_1={user_1} user_2={user_2} key="topgenres"/>
                        <MusicalAttr user_1={user_1} user_2={user_2} my_id={my_id} key="musicalattr"/>
                        <Decades user_1={user_1} user_2={user_2} my_id={my_id} key="decades"/> 
                        <Members user_1={user_1} user_2={user_2} my_id={my_id} key="membersscreen"/>
                        <Share history={history} my_id={my_id} key="sharepage" />
                    </SwipeableViews>
                );
            } else {
                return (
                    <SwipeableViews style={swipableViewsStyle} onChangeIndex={(i) => setCurrPage(i)} disabled={swipeDisabled}>
                        <TopArists user_1={user_1} user_2={user_2} my_id={my_id} key="topartists"/>
                        <Trendex user_1={user_1} user_2={user_2} my_id={my_id} key="trendex"/>
                        <TopGenres user_1={user_1} user_2={user_2} key="topgenres"/>
                        <MusicalAttr user_1={user_1} user_2={user_2} my_id={my_id} key="musicalattr"/>
                        <Decades user_1={user_1} user_2={user_2} my_id={my_id} key="decades"/> 
                        <Share history={history} my_id={my_id} key="sharepage" />
                    </SwipeableViews>
                );
            }
        }
        
    }

    if (loaded && user_1 && user_2) {
        return (
            <div className="Stories">
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
        return <Loading>loading...</Loading>
    }
}

export default Stories;