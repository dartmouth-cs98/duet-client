/* eslint-disable react/jsx-key */
import React from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';
import { Genre, User } from '../../../types';
import { arrayOf, string } from 'prop-types';


function randRange(min, max) {return Math.random() * (max - min) + min}
function randRangeInt(min, max) {return Math.floor(Math.random() * (max - min + 1) ) + min}
function toRadians(degrees) {return degrees * (Math.PI / 180)}
function toDegrees(radians) {return radians * (180 / Math.PI)}


const Bubbles = ({ topGenres, name, bubbleColor, width, height }) => {
    const totalGenres = 48;
    const R = 400;  
    const pi = Math.PI;
    const t = 2 * pi;
    var bubbles = [];

    topGenres.forEach((genre) => {
        const { label, count } = genre
        const percentage = (count / totalGenres);
        bubbles = [...bubbles, {genre: label, r: R*percentage, x: 0, y: 0, c: [], a: [], pa: 0}];
    });
    
    bubbles.sort(function(a, b) {return b.r - a.r})
    
    //bubbles = [bubbles[0], bubbles[1], bubbles[2]];
    bubbles[0].a.push([-t / 6, t / 6], [t / 3, t * 2 / 3]);

    for (var i = 1; i < bubbles.length; i++){
        var b1 = bubbles[i];
        var b0 = bubbles[randRangeInt(0, Math.floor(i/3))];
        const angle_range = randRangeInt(0, b0.a.length - 1)
        const a = randRange(b0.a[angle_range][0], b0.a[angle_range][1]);
        //console.log(toDegrees(a));
        const d = b0.r + b1.r * .6;
        b1.a.push([a - toRadians(90), a + toRadians(90)]);
        //var a = Math.random()*t;
        b1.x = b0.x + d * Math.cos(a);
        b1.y = b0.y + d * Math.sin(a);
    }

    for (var i = 0; i < bubbles.length; i++){
        var b = bubbles[i];
        b.x -= b.r;
        b.y -= b.r;
    }

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

    //const RenderBubble({ })

    return (
        <div className="Bubbles">
            {bubbles.map((bubble) => {
                const { genre, r, x, y } = bubble;
                return (
                    <div className="Bubble" style={{ width: r*2, height: r*2, transform: `translate(${x}px, ${y}px)` }} >
                        <h1 className="Bubble-Label" style={{ fontSize: 10 }}>{genre}</h1>
                        {/* {$("h1").textfit('bestfit')} */}
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
        <Page background={'#212034'} numPages={6} pageNum={2}>
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
                <Bubbles topGenres={user_1.genre_counts}
                         name={user_1.display_name} 
                         bubbleColor={"/assets/bubblePink.png"}
                         width={375}
                         height={381}
                />
                <Bubbles topGenres={user_2.genre_counts}
                         name={user_1.display_name} 
                         bubbleColor={"/assets/bubbleBlue.png"}
                         width={375}
                         height={381}
                />
            </div>
        </Page>
    )
}

TopGenres.propTypes = {
    user_1: User,
    user_2: User
};

export default TopGenres;





