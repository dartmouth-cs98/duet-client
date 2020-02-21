/* eslint-disable no-redeclare */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';
import useResizeAware from 'react-resize-aware';
import { Genre, User } from '../../../types';
import { arrayOf, string } from 'prop-types';


const PINK = "Pink";
const BLUE = "Blue";

function randRange(min, max) {return Math.random() * (max - min) + min}
function randRangeInt(min, max) {return Math.floor(Math.random() * (max - min + 1) ) + min}
function toRadians(degrees) {return degrees * (Math.PI / 180)}
function toDegrees(radians) {return radians * (180 / Math.PI)}

function splitRange(angle_range, radius, angle, s) {return [[angle_range[0], angle - s/radius], [angle + s/radius, angle_range[1]]]}


class Bubble {
    constructor(label, r, x, y, c) {
        this.label = label;
        this.r = r;
        this.x = x;
        this.y = y;
        this.c = c;
        
        this.angle_ranges;
        this.parent = [];
        this.children = [];
    }

    split_range(angle, s) {
        var range;
        for (var i = 0; i < this.angle_ranges.length; i++) if (this.angle_ranges[i][0] < angle < this.angle_ranges[i][1]) range = i;
        var split_range = this.angle_ranges.splice(range, 1);
        this.angle_ranges.push([split_range[0], angle - s/this.r], [angle + s/this.r, split_range[1]])
    }

    correct_center() {
        this.x -= this.r;
        this.y -= this.r;
    }

    


}




const Bubbles = ({ topGenres, name, bubbleColor, width, height }) => {
    const pi = Math.PI;
    const t = 2 * pi;
    const A = pi * Math.pow((height * .5), 2);
    var bubbles = [];

    var total_count = 0;
    topGenres.forEach((genre) => {total_count += genre.count;});

    topGenres.forEach((genre) => {
        const { label, count } = genre
        const percentage = (count / total_count);
        //bubbles = [...bubbles, {genre: label, r: Math.sqrt((A*percentage))/pi, x: 0, y: 0, c: [], a: [], pa: 0}];
        bubbles = [...bubbles, new Bubble(label, Math.sqrt((A*percentage))/pi, 0, 0)]; 
    });
    
    bubbles.sort(function(a, b) {return b.r - a.r})
    
    //bubbles = [bubbles[0], bubbles[1], bubbles[2], bubbles[3]];
    bubbles[0].a.push([-t / 6, t / 6], [t / 3, t * 2 / 3]);

    for (var i = 1; i < bubbles.length; i++){
        var b1 = bubbles[i];
        var b0 = bubbles[randRangeInt(0, Math.floor(i/4))];
        const angle_range_i = randRangeInt(0, b0.angle_range.length - 1)
        const a = randRange(b0.angle_range[angle_range_i][0], b0.angle_range[angle_range_i][1]);
        const d = b0.r + b1.r * .6;
        b1.a.push([a - toRadians(90), a + toRadians(90)]);
        b1.x = b0.x + d * Math.cos(a);
        b1.y = b0.y + d * Math.sin(a);
    }

    for (var i = 0; i < bubbles.length; i++) bubbles[i].correct_center();

    return (
        <div className="Bubbles">
            {bubbles.map((bubble) => {
                return (
                    <div key={name+bubble.label} className="Bubble" style={{ width: bubble.r*2, height: bubble.r*2, transform: `translate(${bubble.x}px, ${bubble.y}px)` }} >
                        <h1 className="Bubble-Label" style={{ fontSize: 10 }}>{bubble.label}</h1>
                        {/* {$("h1").textfit('bestfit')} */}
                        <div className={`Bubble-Image-${bubbleColor}`}></div>   
                          
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

    const BUBBLE_BOX_WIDTH_PERCENTAGE  = 1.0;
    const BUBBLE_BOX_HEIGHT_PERCENTAGE = 0.5;

    const [resizeListener, pageSize] = useResizeAware();
    const [bubbleBoxWidth, setBubbleBoxWidth] = useState(BUBBLE_BOX_WIDTH_PERCENTAGE * pageSize.width);
    const [bubbleBoxHeight, setBubbleBoxHeight] = useState(BUBBLE_BOX_HEIGHT_PERCENTAGE * pageSize.height);

    useEffect(() => {
        const { height, width } = pageSize;
        setBubbleBoxWidth(BUBBLE_BOX_WIDTH_PERCENTAGE * width)
        setBubbleBoxHeight(BUBBLE_BOX_HEIGHT_PERCENTAGE * height)     
    }, [pageSize])



    return (
        <Page background={'#212034'} numPages={5} pageNum={2}>
            {resizeListener}
            <button id="share" onClick={() => saveScreen()}>...</button>

            <div id="popup-background">
                <div id="popup" onClick={() => handleClick()}>
                </div>
            </div>
            <div className ="TopGenres-Page">
                <h1 className="TopGenres-Title">Top Genres</h1>
                <Bubbles topGenres={user_1.genreCounts}
                         name={user_1.display_name} 
                         bubbleColor={PINK}
                         width={bubbleBoxWidth}
                         height={bubbleBoxHeight}
                />
                <Bubbles topGenres={user_2.genreCounts}
                         name={user_2.display_name} 
                         bubbleColor={BLUE}
                         width={bubbleBoxWidth}
                         height={bubbleBoxHeight}
                />
            </div>
        </Page>
    )
}

TopGenres.propTypes = {
    user_1: User,
    user_2: User,
    my_id: string,
};

export default TopGenres;





