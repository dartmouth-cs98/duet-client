import React from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';

const Trendex = () => {
    const saveScreen = () => {
        html2canvas(document.body).then(function(canvas) {
            var canvasData = canvas.toDataURL();
            document.getElementById("popup-background").style.zIndex = "99";
            document.getElementById("popup").innerHTML = '<img src="' + canvasData + '">';
        })
    }

    const handleClick = () => {
        document.getElementById("popup-background").style.zIndex = "-1";
        document.getElementById("popup").innerHTML = "";
    }

    return (
        <Page background={'#9BD6DC'} numPages={6} pageNum={1}>
            <div className="TrendexPage">
                <button id="share" onClick={() => saveScreen()}>...</button>
                <div id="popup-background">
                    <div id="popup" onClick={() => handleClick()}></div>
                </div>
                <h1><mark>sig ep is trendier than u</mark></h1>
                <h2>78.0</h2>
                <h3>sig ep&apos;s trendex</h3>
                <div className="bottomSquare">
                    <h1>\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\</h1>
                    <h2>39.0</h2>
                    <h3>your trendex</h3>
                    <div id="arrow"></div>
                </div>
            </div>
        </Page>
    )
}

export default Trendex;