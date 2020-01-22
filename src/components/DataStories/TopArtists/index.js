import React from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';

const TopArtists = () => {
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
        <Page background={'white'} numPages={6} pageNum={0}>
            <div className="TopPage">
                <div className="title"> 
                    <h1>You and Sig Ep share</h1>
                    {/* <img src="../images/topartists.svg"> </img> */}
                    <div id="topArtists"/>
                </div>
                <div className="yourArtists">
                    <h2>You</h2>
                    <h1>Ariana Grande</h1>
                    <h1><mark>Billie Eilish</mark></h1>
                    <h1>Michael Jackson</h1>
                    <h1><mark>Post Malone</mark></h1>
                    <h1>The Beatles</h1>
                    <h1><mark>The Eagles</mark></h1>
                    <h1>Elvis Presley</h1>
                    <h1>Paul Simon</h1>
                </div>
                <div className="theirArtists">
                    <h2>Sig Ep</h2>
                    <h1>Taylor Swift</h1>
                    <h1><mark>Billie Eilish</mark></h1>
                    <h1>Drake</h1>
                    <h1><mark>Post Malone</mark></h1>
                    <h1>Justin Beiber</h1>
                    <h1>The Jonas Brothers</h1>
                    <h1><mark>The Eagles</mark></h1>
                    <h1>Dan + Shay</h1>
                </div>
                <div id="arrow"/>
            </div>

            <button id="share" onClick={() => saveScreen()}>...</button>

            <div id="popup-background">
                <div id="popup" onClick={() => handleClick()}>
                </div>
            </div>
        </Page>
    )
}

export default TopArtists;