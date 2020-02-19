/* eslint-disable no-console */
/* eslint-disable no-redeclare */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import Page from '../../Page';
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


const Bubbles = ({ topGenres, name, bubbleColor, width, height }) => {
    const pi = Math.PI;
    const t = 2 * pi;
    const A = pi * Math.pow((height * .5), 2);
    var bubbles = [];
    // console.log(topGenres);

    var total_count = 0;
    topGenres.forEach((genre) => {total_count += genre.count;});
    // console.log(total_count);

    topGenres.forEach((genre) => {
        const { label, count } = genre
        const percentage = (count / total_count);
        bubbles = [...bubbles, {genre: label, r: Math.sqrt((A*percentage))/pi, x: 0, y: 0, c: [], a: [], pa: 0}];
    });
    
    bubbles.sort(function(a, b) {return b.r - a.r})
    
    //bubbles = [bubbles[0], bubbles[1], bubbles[2], bubbles[3]];
    bubbles[0].a.push([-t / 6, t / 6], [t / 3, t * 2 / 3]);

    for (var i = 1; i < bubbles.length; i++){
        var b1 = bubbles[i];
        var b0 = bubbles[randRangeInt(0, Math.floor(i/4))];
        const angle_range_i = randRangeInt(0, b0.a.length - 1)
        const a = randRange(b0.a[angle_range_i][0], b0.a[angle_range_i][1]);
        //console.log(toDegrees(a));
        const d = b0.r + b1.r * .6;
        b1.a.push([a - toRadians(90), a + toRadians(90)]);
        //const new_range = splitRange(b0.a[angle_range_i]);
        //b0.a.push(new_range[0], new_range[1]);
        //b0.angle_range
        //var a = Math.random()*t;
        b1.x = b0.x + d * Math.cos(a);
        b1.y = b0.y + d * Math.sin(a);
    }

    for (var i = 0; i < bubbles.length; i++){
        var b = bubbles[i];
        b.x -= b.r;
        b.y -= b.r;
    }

    // var cx = 0;
    // var cy = 0;
    // bubbles.forEach((bubble) => {
    //     cx += bubble.x;
    //     cy += bubble.y;
    // });
    // cx /= bubbles.length;
    // cy /= bubbles.length;

    // bubbles.forEach((bubble) => {
    //     // bubble.x -= cx;
    //     // bubble.y -= cy;
    // });

    //const RenderBubble({ })

    return (
        <div className="Bubbles">
            {bubbles.map((bubble) => {
                const { genre, r, x, y } = bubble;
                return (
                    <div className="Bubble" style={{ width: r*2, height: r*2, transform: `translate(${x}px, ${y}px)` }} >
                        <h1 className="Bubble-Label" style={{ fontSize: 10 }}>{genre}</h1>
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





