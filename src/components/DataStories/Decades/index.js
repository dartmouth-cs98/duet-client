import React from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';

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
                </div>

            </div>
        </Page>
    )
}

export default Decades;