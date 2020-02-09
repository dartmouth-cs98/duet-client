import React from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';

const TopGenres = () => {
    // const colors = ['#9BD6DC', '#212034', '#FFFFFF', '#E5277B'];
    // const totalGenres = 48;  
    // let percentages = [];
    // let i = 0;
    // topGenres.forEach((genre) => {
    //     const percentage = (genre[1] / totalGenres) * 100;
    //     percentages = [...percentages, {title: genre[0], value: percentage, color: colors[i % 4]}]
    //     i ++;
    // });
    
    // // eslint-disable-next-line no-console
    // console.log(percentages);

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
        <Page background={'lightblue'} numPages={6} pageNum={2}>
            Top Genres
            <button id="share" onClick={() => saveScreen()}>...</button>

            <div id="popup-background">
                <div id="popup" onClick={() => handleClick()}>
                </div>
            </div>
        </Page>
    )
}

export default TopGenres;