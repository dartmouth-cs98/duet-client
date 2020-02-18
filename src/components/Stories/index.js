import React from 'react';
import TopArists from './TopArtists';
import Decades from './Decades';
import MusicalAttr from './MusicalAttr';
import TopGenres from './TopGenres';
import Trendex from './Trendex';
import PlaylistGenerator from './PlaylistGenerator';
import Members from './Members';
import Share from './Share';
import { useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';


const Stories = ({ history }) => {
    const { user_1, user_2, my_id } = useSelector((state) => state.users);

    if (user_1 && user_2) {
        if (user_2.isGroup && user_1.id == my_id) {
            return (
                <SwipeableViews>
                    <TopArists user_1={user_1} user_2={user_2} my_id={my_id} key="topartists"/>
                    <Trendex user_1={user_1} user_2={user_2} my_id={my_id} key="trendex"/>
                    <TopGenres user_1={user_1} user_2={user_2} key="topgenres"/>
                    <MusicalAttr user_1={user_1} user_2={user_2} my_id={my_id} key="musicalattr"/>
                    <Decades user_1={user_1} user_2={user_2} my_id={my_id} key="decades"/> 
                    <PlaylistGenerator user_1={user_1} user_2={user_2} my_id={my_id} key="playlistgenerator"/>
                    <Members user_1={user_1} user_2={user_2} my_id={my_id} key="membersscreen"/>
                    <Share history={history} key="sharepage" />
                </SwipeableViews>
            );
        } else {
            return (
                <SwipeableViews>
                    <TopArists user_1={user_1} user_2={user_2} my_id={my_id} key="topartists"/>
                    <Trendex user_1={user_1} user_2={user_2} my_id={my_id} key="trendex"/>
                    <TopGenres user_1={user_1} user_2={user_2} key="topgenres"/>
                    <MusicalAttr user_1={user_1} user_2={user_2} my_id={my_id} key="musicalattr"/>
                    <Decades user_1={user_1} user_2={user_2} my_id={my_id} key="decades"/> 
                    <PlaylistGenerator user_1={user_1} user_2={user_2} my_id={my_id} key="playlistgenerator"/>
                    <Share history={history} key="sharepage" />
                </SwipeableViews>
            );
        }
    } else {
        return <div/>
    }
}

export default Stories;