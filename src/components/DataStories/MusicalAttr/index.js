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
                <h2>sig ep’s music is happier than yours</h2>
                <div className="posBox"></div>
                <h3>your music is more danceable than sig ep’s</h3>
                <div className="negBox"></div>
                <h4>your music is more acoustic than sig ep’s</h4>
                <div className="negBox2"></div>
                <h5>sig ep’s music is more energetic than yours</h5>
                <div className="posBox2"></div>
                <h6>sig ep’s music is speechier than yours</h6>
                <div className="posBox3"></div>
                <div id="arrow"/>
            </div>
        </Page>
    )
}

export default MusicalAttr;