import React, { useState, useEffect } from 'react';
import useResizeAware from 'react-resize-aware';
import Page from '../../Page';
import { User } from '../../../types';
import { string } from 'prop-types';

const Decades = ({ user_1, user_2, my_id }) => {

    const [showPopup, setShowPopup] = useState(false);

    const renderPopup = () => {

        return (
            <div id="PopupBackground">
                <button>X</button>                
                <h1>About Top Artists</h1>
                <h2> What am I looking at?</h2>
                <p>This all has to get filled in- maybe other questions headers too idk- doesn’t always have to be “what am i looking at?</p>
                <h1>About Duet</h1>
                <h2>What information does Duet have?</h2>
                <p>Duet only stores information given to us from Spotify: your username and your top artists/songs- that’s it! As much as we would like your credit card information or email and password- Spotify’s authentication process prevents us. Dang!</p>
                <h2>How does Duet work?</h2>
                <p>Once you’ve logged in through Spotify’s website and selected a person or friend to compare with, Duet receives the top fifty artists/songs from the past six months of yourself and whoever you chose to compare with. From there, using Spotify’s public api, we look at all the metadata of your music to show how it contrasts! We can even generate playlists to blend your two music tastes like a tropical smoothie on a hot day. Neato!</p>
                <h2>Who made Duet?</h2>
                <p>Duet was made by group of collegiate seniors as a capstone project. We would have been something that cures global warming (easy) or systemic racism and misogyny (child’s play), but unfortunately we were bound by an ancient form of magic known as onomancy, the arcane school of names, to Xolgoth- Daedric prince of the seventh layer of hell/Duet marketing lead. </p>
                <h2>Why is it mobile only?</h2>
                <p>Listen here you little shit...</p>
                <h2>Contact us</h2>
                <p>Have any more questions? You can send us emails at duetwastaken@gmail.com.</p>
                <h2>Donate!</h2>
                <p>To keep Duet ad free, we have been paying for hosting out of pocket :((  consider donating to my venmo: @nicBerg... jk.... unless?</p>
            </div>
        )
    }

    const handleInfoClick = () => {
        if (showPopup) {
            setShowPopup(!showPopup);
        } 
    }

    let { decadeCounts: user1DecadeCounts } = user_1;
    let { decadeCounts: user2DecadeCounts } = user_2;

    // grab max decade counts so we can control heights of graphs
    const user1MaxDecadeCount = Math.max.apply(null, user1DecadeCounts.map(d => d.count));
    const user2MaxDecadeCount = Math.max.apply(null, user2DecadeCounts.map(d => d.count));

    // grab earliest and lastest decade, and update decadeCounts such that their ranges are the same
    let earliestDecade = Math.min.apply(null, [...user1DecadeCounts, ...user2DecadeCounts].map(d => d.decade))
    let latestDecade = Math.max.apply(null, [...user1DecadeCounts, ...user2DecadeCounts].map(d => d.decade));

    const user1Earliest = user1DecadeCounts[0].decade
    if (earliestDecade < user1Earliest) {
        let decade = user1Earliest - 10;
        const count = 0;
        for (decade; decade >= earliestDecade; decade -= 10) {
            user1DecadeCounts = [ { decade, count }, ...user1DecadeCounts ]
        }
    }

    const user1Latest = user1DecadeCounts[user1DecadeCounts.length - 1].decade
    if (latestDecade > user1Latest) {
        let decade = user1Latest + 10;
        const count = 0;
        for (decade; decade <= latestDecade; decade += 10) {
            user1DecadeCounts = [ ...user1DecadeCounts, { decade, count } ]
        }
    }
    
    const user2Earliest = user2DecadeCounts[0].decade
    if (earliestDecade < user2Earliest) {
        let decade = user2Earliest - 10;
        const count = 0;
        for (decade; decade >= earliestDecade; decade -= 10) {
            user2DecadeCounts = [ { decade, count }, ...user2DecadeCounts ]
        }
    }
    const user2Latest = user2DecadeCounts[user2DecadeCounts.length - 1].decade

    if (latestDecade > user2Latest) {
        let decade = user2Latest + 10;
        const count = 0;
        for (decade; decade <= latestDecade; decade += 10) {
            user2DecadeCounts = [ ...user2DecadeCounts, { decade, count } ]
        }
    }


    const [resizeListener, pageSize] = useResizeAware();
    
    const BAR_CHART_WIDTH_PERCENTAGE = .9;
    const BAR_CHART_HEIGHT_PERCENTAGE = .22;

    useEffect(() => {
        const { height, width } = pageSize;
        setBarChartHeight(BAR_CHART_HEIGHT_PERCENTAGE * height)
        setBarChartWidth(BAR_CHART_WIDTH_PERCENTAGE * width)
    }, [pageSize])

    const [barChartWidth, setBarChartWidth] = useState(BAR_CHART_WIDTH_PERCENTAGE * pageSize.width);
    const [barChartHeight, setBarChartHeight] = useState(BAR_CHART_HEIGHT_PERCENTAGE * pageSize.height);

    const user1BarHeightMultiplier = barChartHeight / user1MaxDecadeCount;
    const user2BarHeightMultiplier = barChartHeight / user2MaxDecadeCount;
    const barWidth = barChartWidth / user1DecadeCounts.length;

    return (
        <Page background={'#212034'} numPages={5} pageNum={4}>
             {resizeListener}

            <div className="Decades-Page">
                <div>
                    <h1 className="Decades-Title-TextShadow">A Blast from the Past</h1>
                    <h2 className="Decades-subtitle">your music spans the decades</h2>
                    <div className="top">\\\\\\\\\\\\\\\\\</div>
                </div>
                <div className="Decades-BarChart-Container">
                    <div className="Decades-GraphOwner">
                        {user_1.id != my_id && 
                            <h3>{user_1.display_name}</h3>}
                        {user_1.id == my_id && 
                            <h3>You</h3>}
                        <div className="Decades-GraphOwner-Underline"></div>
                    </div>
                    <div className="Decades-BarChart" style={{ width: barChartWidth }}>
                        <div className="Decades-BarChart-Bars">
                            {user1DecadeCounts.map((decadeObject) => {
                                const { decade, count } = decadeObject;
                                return (
                                    <div className="Decades-BarChart-Bar" key={`user1${decade}`} style={{ width: barWidth }}>
                                        <div 
                                            className="Decades-BarChart-Bar-Bar-T"
                                            style={{ height: count * user1BarHeightMultiplier}}
                                        />
                                        <h1 className="Decades-BarChart-Bar-Label">{decade.toString().slice(-2)}s</h1>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="Decades-BarChart-Axis"></div>
                    </div>
                </div>
                
                <div className="Decades-BarChart-Container">
                    <div className="Decades-GraphOwner">
                        {user_2.id != my_id && 
                            <h4>{user_2.display_name}</h4>}
                        {user_2.id == my_id && 
                            <h4>You</h4>}
                        <div className="Decades-GraphOwner-Underline"></div>
                    </div>
                    <div className="Decades-BarChart" style={{ width: barChartWidth }}>
                        <div className="Decades-BarChart-Bars">
                            {user2DecadeCounts.map((decadeObject) => {
                                const { decade, count } = decadeObject;
                                return (
                                    <div className="Decades-BarChart-Bar" key={`user2${decade}`} style={{ width: barWidth }}>
                                        <div 
                                            className="Decades-BarChart-Bar-Bar-B"
                                            style={{ height: count * user2BarHeightMultiplier}}
                                        />
                                        <h1 className="Decades-BarChart-Bar-Label">{decade.toString().slice(-2)}s</h1>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="Decades-BarChart-Axis"></div>
                    </div>
                </div>
                <div className="bottomDiv">
                    <div className="bottom">\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\</div>

                    <button onClick={() => setShowPopup(!showPopup)}>?</button>

                    { showPopup &&
                        <div className="popupInfo" onClick={handleInfoClick}>
                            {renderPopup()}
                        </div>
                    }
                </div>
            </div>
        </Page>
    )
}

Decades.propTypes = {
    user_1: User,
    user_2: User,
    my_id: string,
}

export default Decades;