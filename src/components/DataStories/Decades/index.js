import React from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';
import DecHistogram from '../../DecadeHist';

const Decades = () => {
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

    return (
        <Page background={'#212034'} numPages={6} pageNum={4}>
            <button id="share" onClick={() => saveScreen()}>...</button>

            <div id="popup-background">
                <div id="popup" onClick={() => handleClick()}>
                </div>
            </div>

            <div className="decadesPage">
                <div className="dectitle">
                    <div id="decades"></div>
                    <h1>your music spans the decades</h1>
                    <h2>\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\</h2>
                </div>
                <div className="youGraph">
                    <h1>You</h1>
                    <div className="underline"></div>
                    <div className="timeLine">
                        <div className="line"></div>
                        <h4>60s 70s 80s 90s 00s 10s 20s</h4>
                    </div>
                </div>
                <div className="theirGraph">
                    <h1>Sig Ep</h1>
                    <div className="underline"></div>
                    <div className="timeLine">
                        <div className="line"></div>
                        <h4>60s 70s 80s 90s 00s 10s 20s</h4>
                    </div>
                </div>
                <h3>\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\</h3>
                <div id = "arrow"></div>
            </div>
        </Page>
    )
}

export default Decades;