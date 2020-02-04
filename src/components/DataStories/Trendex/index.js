import React from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';

const Trendex = ({ trendex, compareTrendex, compareName }) => {
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
                {trendex > compareTrendex && <h1><mark>you&apos;re trendier than {compareName}</mark></h1>}
                {trendex < compareTrendex && <h1><mark>{compareName} is trendier than u</mark></h1>}
                {trendex == compareTrendex && <h1><mark>u and {compareName} are equally trendy</mark></h1>}
                <h2>{compareTrendex}</h2>
                <h3>{compareName}&apos;s trendex</h3>
                <div className="bottomSquare">
                    <h1>\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\</h1>
                    <h2>{trendex}</h2>
                    <h3>your trendex</h3>
                    <div id="arrow"></div>
                </div>
            </div>
        </Page>
    )
}

export default Trendex;