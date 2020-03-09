import React, { useState, useEffect } from 'react';
import Page from '../Page';
import TopArists from './TopArtists';
import Decades from './Decades';
import MusicalAttr from './MusicalAttr';
import TopGenres from './TopGenres';
import Trendex from './Trendex';
import Blender from './Blender';
import Members from './Members';
import Instructions from './Instructions';
import Share from './Share';
import { useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Loading from '../Loading';
import _ from 'lodash';

const swipableViewsStyle = {
    height: '100%',
}

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const Stories = ({ history, location }) => {
    const { isComparing, isMixing } = location.state;

    const { user_1, user_2, my_id } = useSelector((state) => state.users);

    const [swipeDisabled, setSwipeDisable] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [numPages, setNumPages] = useState((isMixing ? 1 : 0) + (isComparing ? 5 : 0) + 2);

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
        if (user_1 && user_1.id == my_id && user_2 && user_2.isGroup) {
            setNumPages(numPages + 1);
        }
        setTimeout(() => setLoaded(true), 2000);
    }, [user_2]);

   
    const renderSwipableViews = () => {
        const props = { user_1, user_2, my_id, history };
        let views = [ <Instructions {...props} key="instructions"/> ];
        if (isComparing) {
            views = [
                ...views,
                <TopArists {...props} key="topartists"/>,
                <Trendex {...props} key="trendex"/>,
                <TopGenres {...props} key="topgenres"/>,
                <MusicalAttr {...props} key="musicalattr"/>,
                <Decades {...props} key="decades"/>,
            ]
        }
        if (isMixing) {
            views =  [ ...views, <Blender {...props} key="blender" setSwipeDisable={setSwipeDisable}/> ];
        }
        if (user_2.isGroup && user_1.id == my_id) {
            views = [ ...views, <Members {...props} key="membersscreen"/> ];
        }
        views = [ ...views, <Share {...props} key="sharepage" />];

        return (
            <BindKeyboardSwipeableViews 
                style={swipableViewsStyle} 
                onChangeIndex={(i) => setCurrPage(i)} 
                index={currPage}
                disabled={swipeDisabled}
            >
                {views}
            </BindKeyboardSwipeableViews>
        )
    }

    if (loaded && user_1 && user_2) {
        return (
            <div className="Stories">
                <div className="Stories-progress">
                    {_.range(numPages).map((i) => 
                        <div 
                            className="Stories-progress-bar"
                            onClick={() => setCurrPage(i)}
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
        
        return (
            <Page background={'#212034'}>
                 <Loading>loading...</Loading>
            </Page>
        )      
    }
}

export default React.memo(Stories);