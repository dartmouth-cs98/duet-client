import React from 'react';
import TopArists from './TopArtists';
import Decades from './Decades';
import MusicalAttr from './MusicalAttr';
import TopGenres from './TopGenres';
import Trendex from './Trendex';
import Members from './Members';
import Share from './Share';
import { useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';


const Stories = ({ history }) => {
    const { user_1, user_2, my_id } = useSelector((state) => state.users);

    if (user_1 && user_2) {
        return (
            <SwipeableViews>
                <TopArists user_1={user_1} user_2={user_2} my_id={my_id} key="topartists"/>
                <Trendex user_1={user_1} user_2={user_2} my_id={my_id} key="trendex"/>
                <TopGenres user_1={user_1} user_2={user_2} key="topgenres"/>
                <MusicalAttr user_1={user_1} user_2={user_2} my_id={my_id} key="musicalattr"/>
                <Decades user_1={user_1} user_2={user_2} my_id={my_id} key="decades"/> 
                <Members key="membersscreen"/>
                <Share history={history} key="sharepage" />
            </SwipeableViews>
        );
    } 
    else {
        return <div/>
    }
}

export default Stories;