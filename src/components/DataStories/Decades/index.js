import React, { useState, useEffect } from 'react';
import useResizeAware from 'react-resize-aware';
import Page from '../../Page';
import html2canvas from 'html2canvas';
import { User } from '../../../types';

const Decades = ({ user_1, user_2 }) => {

    const saveScreen = () => {
        html2canvas(document.body).then(function(canvas) {
            // var link = document.createElement('a');
            // link.download = 'DecadeStory.png';
            // link.href = canvas.toDataURL()
            // link.click();
            var canvasData = canvas.toDataURL();
            document.getElementById("popup-background").style.zIndex = "99";
            document.getElementById("popup").innerHTML = '<img src="' + canvasData + '">';
        })
    }

    const handleClick = () => {
        document.getElementById("popup-background").style.zIndex = "-1";
        document.getElementById("popup").innerHTML = "";
    }

    let { decadeCounts: user1DecadeCounts } = user_1;
    let { decadeCounts: user2DecadeCounts } = user_2;

    // grab max decade counts so we can control heights of graphs
    const user1MaxDecadeCount = Math.max.apply(null, user1DecadeCounts.map(d => d.count));
    const user2MaxDecadeCount = Math.max.apply(null, user2DecadeCounts.map(d => d.count));

    // grab earliest and lastest decade, and update decadeCounts such that their ranges are the same
    let earliestDecade = Math.min.apply(null, [...user1DecadeCounts, ...user2DecadeCounts].map(d => d.decade))
    let latestDecade = Math.max.apply(null, [...user1DecadeCounts, ...user2DecadeCounts].map(d => d.decade));
    
    while (earliestDecade < user1DecadeCounts[0].decade) {
        user1DecadeCounts = [{ decade: earliestDecade, count: 0}, ...user1DecadeCounts];
        earliestDecade += 10;
    }
    while (earliestDecade < user2DecadeCounts[0].decade) {
        user2DecadeCounts = [{ decade: earliestDecade, count: 0}, ...user2DecadeCounts];
        earliestDecade += 10;
    }
    while (latestDecade > user1DecadeCounts[user1DecadeCounts.length - 1].decade) {
        user1DecadeCounts = [ ...user1DecadeCounts, { decade: latestDecade, count: 0} ];
        latestDecade -= 10;
    }
    while (latestDecade > user2DecadeCounts[user2DecadeCounts.length - 1].decade) {
        user2DecadeCounts = [ ...user2DecadeCounts, { decade: latestDecade, count: 0} ];
        latestDecade -= 10;
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
            <button id="share" onClick={() => saveScreen()}>...</button>

            <div id="popup-background">
                <div id="popup" onClick={() => handleClick()}>
                </div>
            </div>

            <div className="Decades-Page">
                <div>
                    <h1 className="Decades-Title-TextShadow">A Blast from the Past</h1>
                    <h2 className="Decades-subtitle">your music spans the decades</h2>
                </div>
                <div className="Decades-BarChart-Container">
                    <div className="Decades-GraphOwner">
                        <h3>{user_1.display_name}</h3>
                        <div className="Decades-GraphOwner-Underline"></div>
                    </div>
                    <div className="Decades-BarChart" style={{ width: barChartWidth }}>
                        <div className="Decades-BarChart-Bars">
                            {user1DecadeCounts.map((decadeObject) => {
                                const { decade, count } = decadeObject;
                                return (
                                    <div className="Decades-BarChart-Bar" key={`user1${decade}`} style={{ width: barWidth }}>
                                        <div 
                                            className="Decades-BarChart-Bar-Bar"
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
                        <h3>{user_2.display_name}</h3>
                        <div className="Decades-GraphOwner-Underline"></div>
                    </div>
                    <div className="Decades-BarChart" style={{ width: barChartWidth }}>
                        <div className="Decades-BarChart-Bars">
                            {user2DecadeCounts.map((decadeObject) => {
                                const { decade, count } = decadeObject;
                                return (
                                    <div className="Decades-BarChart-Bar" key={`user2${decade}`} style={{ width: barWidth }}>
                                        <div 
                                            className="Decades-BarChart-Bar-Bar"
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
            </div>
        </Page>
    )
}

Decades.propTypes = {
    user_1: User,
    user_2: User,
}

export default Decades;