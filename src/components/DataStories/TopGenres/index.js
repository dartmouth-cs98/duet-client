/* eslint-disable react/jsx-key */
import React from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';
import { Genre, User } from '../../../types';
import { arrayOf, string } from 'prop-types';

const Bubbles = ({ topGenres, bubbleColor }) => {
    const totalGenres = 48;
    const R = 400;  
    const t = 6.28318;
    var bubbles = [];

    topGenres.forEach((genre) => {
        const { label, count } = genre
        const percentage = (count / totalGenres);
        bubbles = [...bubbles, {genre: label, r: R*percentage, x: -R*percentage, y: -R*percentage}];
    });
    
    bubbles.sort(function(a, b) {return b.r - a.r})
    // console.log(bubbles);

    for (var i = 1; i < bubbles.length; i++){
        var b1 = bubbles[i];
        var b0 = bubbles[i-1];
        //var a = Math.random()*t/3-(t/6);
        var a = Math.random()*t;
        b1.x = b0.x + (b0.r+b1.r*.8)*Math.cos(a);
        b1.y = b0.y + (b0.r+b1.r*.8)*Math.sin(a);
    }

    // bubbles[0].x = -bubbles[0].r;
    // bubbles[0].y = -bubbles[0].r;

    var cx = 0;
    var cy = 0;
    bubbles.forEach((bubble) => {
        cx += bubble.x;
        cy += bubble.y;
    });
    cx /= bubbles.length;
    cy /= bubbles.length;

    bubbles.forEach((bubble) => {
        // bubble.x -= cx;
        // bubble.y -= cy;
        
    });

    return (
        <div className="Bubbles">
            {bubbles.map((bubble) => {
                const { genre, r, x, y } = bubble;
                return (
                    <div className="Bubble" style={{ width: r*2, height: r*2, transform: `translate(${x}px, ${y}px)` }} >
                        <h1 className="Bubble-Label" >{}</h1>
                        <img src={bubbleColor} className="Bubble-Image"></img>    
                    </div>
                );
            })}
        </div>
    )
}

Bubbles.propTypes = {
    topGenres: arrayOf(Genre),
    bubbleColor: string
}



const TopGenres = ({ user_1, user_2 }) => {

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
        <Page background={'#212034'} numPages={5} pageNum={2}>
            Top Genres
            <button id="share" onClick={() => saveScreen()}>...</button>

            <div id="popup-background">
                <div id="popup" onClick={() => handleClick()}>
                </div>
            </div>
            <div className ="TopGenres-Page">
                <div>
                    <h1 className="TopGenres-Title">Top Genres</h1>
                </div>
                <Bubbles topGenres={user_1.genre_counts} bubbleColor={"/assets/bubblePink.png"}></Bubbles>
                <Bubbles topGenres={user_2.genre_counts} bubbleColor={"/assets/bubbleBlue.png"}></Bubbles>
            </div>
        </Page>
    )
}

TopGenres.propTypes = {
    user_1: User,
    user_2: User
};

export default TopGenres;





