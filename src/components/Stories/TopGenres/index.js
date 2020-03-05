/* eslint-disable no-console */
/* eslint-disable no-redeclare */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import Page from '../../Page';
import Popup from '../../Popup';
import useResizeAware from 'react-resize-aware';
import { Genre, User } from '../../../types';
import { arrayOf, string, func } from 'prop-types';
import { TopGenresDescription } from '../../../constants/helpInfo';


var ReactFitText = require('react-fittext');
var seedrandom = require('seedrandom');

const PINK = "Pink";
const BLUE = "Blue";
const { PAGE_INFO, PAGE_NAME } = TopGenresDescription;

const PI = Math.PI;
const OVERLAP = .6;
const EPSILON = toRadians(10);

function randRange(min, max) {return Math.random() * (max - min) + min}
function randRangeInt(min, max) {return Math.floor(Math.random() * (max - min + 1) ) + min}
function toRadians(degrees) {return degrees * (PI / 180)}
function toDegrees(radians) {return radians * (180 / PI)}
function psqrdist(x1, y1, x2, y2) {return Math.pow((x1 - x2), 2) +  Math.pow((y1 - y2), 2)}
function cleanAngle(a) {if (Math.abs(a) > 2*PI) a = a % (2*PI); if (a < 0) a += 2*PI; return a}

function log_angle_ranges(bubble) {
    console.log("------" + bubble.label + "------");
    for (var range of bubble.angle_ranges) {
        console.log(Math.floor(toDegrees(range[0])), Math.floor(toDegrees(range[1])));
    }
    console.log("------------");
}

function dist_to_line(bub, m) {
    const im = -1 / m;
    const b = bub.y - im*bub.x;
    const x2 = b / (m - im);
    const y2 = m*x2;
    
    return psqrdist(bub.x, bub.y, x2, y2);
}

function deviation(bubbles) {
    var sum = 0;
    for (var bubble of bubbles) sum += psqrdist(0, 0, bubble.x, bubble.y);
    return sum / bubbles.length;
}

function delta(bubble) {
    return psqrdist(0, 0, bubble.x, bubble.y);
}



class Bubble {
    constructor(label, r, x, y) {
        this.label = label;
        this.r = r;
        this.x = x;
        this.y = y;

        this.angle_ranges = [[0, 2*PI]];
        this.parent;
        this.children = [];
    }

    sqrdist(bubble) {
        return Math.pow((this.x - bubble.x), 2) +  Math.pow((this.y - bubble.y), 2);
    }

    distance(bubble) {
        return Math.sqrt(this.sqrdist);
    }

    points_to_angle(x1, y1, x2, y2) {
        const d = Math.sqrt(psqrdist(x1, y1, x2, y2));
        return 2 * Math.asin(d / (2 * this.r));
    }

    angle_to(bubble) {
        const d  = this.sqrdist(bubble);
        const x1 = this.x + d; 
        const y1 = this.y;
        const x2 = bubble.x;
        const y2 = bubble.y;
        const ang = Math.sign(y2 - y1) * this.points_to_angle(x1, y1, x2, y2);
        return cleanAngle(ang);
    }

    intersect(bubble) {
        const min =  Math.pow((this.r - bubble.r), 2);
        const max =  Math.pow((this.r + bubble.r), 2);
        return (min < this.sqrdist(bubble) < max);
    }

    std_d(bubble) {
        return bubble.r + this.r * OVERLAP;
    }

    intersect_angles(bubble) {
        const x1 = this.x;
        const y1 = this.y;
        const x2 = bubble.x;
        const y2 = bubble.y;

        const d  = Math.sqrt(psqrdist(x1, y1, x2, y2));
        const a = (this.r*this.r - bubble.r*bubble.r + d*d) / (2 * d);
        const h = Math.sqrt(this.r*this.r - a*a);

        const x3 = x1 + (a / d) * (x2 - x1);
        const y3 = y1 + (a / d) * (y2 - y1);

        const x41 = x3 + (h/d) * (y2 - y1);
        const y41 = y3 - (h/d) * (x2 - x1);
        const x42 = x3 - (h/d) * (y2 - y1);
        const y42 = y3 + (h/d) * (x2 - x1);
        
        const t = this.points_to_angle(x41, y41, x42, y42);
        const o = Math.sign(y41 - this.y) * this.points_to_angle(this.x + this.r, this.y, x41, y41);

        return [o, o+t];
    }

    split_range(range) {
        var a1 = cleanAngle(range[0]);
        var a2 = cleanAngle(range[1]);
        if (a1 == 2*PI) a1 = 0;
        if (a2 == 0) a2 = 2*PI;
        
        if (a1 < a2) {
            for (var i = 0; i < this.angle_ranges.length; i++) {
                const r1 = this.angle_ranges[i][0];
                const r2 = this.angle_ranges[i][1];
                
                if (a2 < r1 || a1 > r2) continue;

                const b1 = a1 > r1;
                const b2 = a2 < r2;

                if (b1 && b2) this.angle_ranges.splice(i, 1, [r1, a1], [a2, r2]);
                else if (b1)  this.angle_ranges[i] = [r1, a1];
                else if (b2)  this.angle_ranges[i] = [a2, r2];
                else          this.angle_ranges[i] = [r1, r1];
            }
        } else if (a1 > a2) {this.split_range([a1, 2*PI]); this.split_range([0, a2])}

        var tar = [];
        for (var vrange of this.angle_ranges) if (vrange[1] - vrange[0] > EPSILON) tar.push(vrange);
        this.angle_ranges = tar;
    }

    split_ranges(bubble) {
        bubble.split_range(bubble.intersect_angles(this));
        this.split_range(this.intersect_angles(bubble));
    }

    correct_center() {
        this.x -= this.r;
        this.y -= this.r;
    }

    translate_branch(x, y) {
        this.x -= x;
        this.y -= y;

        for (var child of this.children) child.translate_branch(x, y);
    }

    is_valid(bubbles) {
        for (var bubble of bubbles) if (this.sqrdist(bubble) < Math.pow(this.std_d(bubble), 2)) return false;
        return true;
    }

    get_angle() {
        const i = randRangeInt(0, this.angle_ranges.length - 1)
        return randRange(this.angle_ranges[i][0], this.angle_ranges[i][1]);
    }

    split_intersects(bubbles) {
        for (var bubble of bubbles) if (this.intersect(bubble)) {
            this.split_range(this.intersect_angles(bubble));
            bubble.split_range(this.intersect_angles(this));
        }
    }

    set_pos(bubble) {
        const d = this.std_d(bubble);
        const a = bubble.get_angle();
        this.x = bubble.x + d * Math.cos(a);
        this.y = bubble.y + d * Math.sin(a);  
    }

    add_to_parent(parent) {
        parent.children.push(this);
        this.set_pos(this.parent);
        this.split_ranges(this.parent);
    }
}

function layer_sort(a, b) {
    const ang = a.angle_to(b);
    if (toRadians(135) < a < toRadians(315)) return 1;
    else return -1;
}

function build_bubbles(bubbles) {
    const m = randRange(-.6, .6);

    bubbles.sort(function(a, b) {return b.r - a.r});
    for (var i = 1; i < bubbles.length; i++){
        var b1 = bubbles[i];
        var b0;
        var best = Infinity;
        var pos = [];
        for (var n = 0; n < 10; n++) {
            b0 = bubbles[randRangeInt(0, i-1)];
            b1.set_pos(b0);
            while (!b1.is_valid(bubbles.slice(0, i))) {
                b0 = bubbles[randRangeInt(0, i-1)];
                b1.set_pos(b0);
            }
             var score = dist_to_line(b1, m) + .4*delta(b1);
             if (score < best) {
                 pos = [b1.x, b1.y];
                 best = score;
             }
        }
        b1.x = pos[0];
        b1.y = pos[1];
        b0.split_range(b0.intersect_angles(b1));
        b1.split_range(b1.intersect_angles(b0));
    }
    //bubbles.sort(function(a, b) {return a.x - b.x})
    bubbles.sort(function(a, b) {return a.y - (-a.x + b.y + b.x)});
    
    for (var i = 0; i < bubbles.length; i++) bubbles[i].correct_center();
    return bubbles;
}



const Bubbles = ({ topGenres, name, bubbleColor, width, height }) => {
    seedrandom(name, { global: true }); 
    const A = PI * Math.pow((height * .5), 2) * 1;
    var bubbles = [];

    var total_count = 0;
    topGenres.forEach((genre) => {total_count += genre.count;});

    topGenres.forEach((genre) => {
        const { label, count } = genre
        const percentage = (count / total_count);
        bubbles = [...bubbles, new Bubble(label, Math.sqrt((A*percentage))/PI, 0, 0)]; 
    });
    
    bubbles = build_bubbles(bubbles);

    return (
        <div className="Bubbles">
            {bubbles.map((bubble) => {
                return (
                    <div key={name+bubble.label} className="Bubble" style={{ width: bubble.r*2, height: bubble.r*2, transform: `translate(${bubble.x}px, ${bubble.y}px)` }} >
                        <ReactFitText compressor={0.5}><h1 className="Bubble-Label">{bubble.label}</h1></ReactFitText>
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
        <Page background={'#212034'}>
            {resizeListener}

            <div className ="TopGenres-Page">
                <h1 className="TopGenres-Title">Top Genres</h1>
                <h1 className="Top-Name">{user_1.display_name}</h1>
                <Bubbles topGenres={user_1.genreCounts}
                         name={user_1.display_name} 
                         bubbleColor={PINK}
                         width={bubbleBoxWidth}
                         height={bubbleBoxHeight}
                />
                <h1 className="Bot-Name">{user_2.display_name}</h1>
                <Bubbles topGenres={user_2.genreCounts}
                         name={user_2.display_name} 
                         bubbleColor={BLUE}
                         width={bubbleBoxWidth}
                         height={bubbleBoxHeight}
                /> 
            </div>
            <Popup pageInfo={PAGE_INFO} pageName={PAGE_NAME}/>
        </Page>
    )
}

TopGenres.propTypes = {
    user_1: User,
    user_2: User,
    my_id: string,
};

export default React.memo(TopGenres);





