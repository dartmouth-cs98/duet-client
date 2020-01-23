import React from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';

const MusicalAttr = () => {
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
        <Page background={'white'} numPages={6} pageNum={3}>
            <button id="share" onClick={() => saveScreen()}>...</button>

            <div id="popup-background">
                <div id="popup" onClick={() => handleClick()}>
                </div>
            </div>
            <div id="histoBackground"/>
            <div className="histo">
                <h1>\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\</h1>
                <div className="posBox"></div>
                <div className="negBox"></div>
                <div className="negBox2"></div>
                <div className="posBox2"></div>
                <div className="posBox3"></div>
            </div>
        </Page>
    )
}

export default MusicalAttr;