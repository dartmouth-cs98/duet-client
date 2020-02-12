import React, { useEffect, useState } from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';
import useResizeAware from 'react-resize-aware';
import PropTypes from 'prop-types';
import { User } from '../../../types';

const { number, string } = PropTypes;

const Slider = ({ width: sliderWidth, height: sliderHeight, label, color, val1, val2, name1, name2 }) => {
    
    // val2 must be greater than val1
    if (val2 < val1) {
        [name1, name2] = [name2, name1];
        [val1, val2] = [val2, val1]
    }

    const pattyWidth = sliderWidth * .04;
    const nameWidth = sliderWidth * .2;
    const sliderDifference = val2 - val1;
    const labelAlignment = val2 > .5 ? 'left' : 'right';
    const topNameOffsetX = (val2 * sliderWidth) - .15 * nameWidth;
    const bottomNameOffsetX = (val1 * sliderWidth) - .35 * nameWidth;

    return (
        <div className="Slider" style={{ width: sliderWidth, height: sliderHeight }}>
            <h1 className="Slider-Label" style={{ color: color, textAlign: labelAlignment }}>{label}</h1>
            <h2 className="Slider-Name" style={{ width: nameWidth, transform: `translate(${topNameOffsetX}px, -20%)`}}>{name2}</h2>
            <div className="Slider-Base">
                <div className="Slider-InvisibleStarter" style={{ width: val1 * sliderWidth }}/> 
                <div className="Slider-Patty" style={{ backgroundColor: color, width: pattyWidth}}/>
                <div className="Slider-StripedMiddle" style={{ width: sliderDifference * sliderWidth }}/>  
                <div className="Slider-Patty" style={{ backgroundColor: color, width: pattyWidth }}/>
            </div>
            <div className="Slider-Axis">
                <h1>0</h1>
                <h1>100</h1>
            </div>
            <h2 className="Slider-Name" style={{ width: nameWidth, transform: `translate(${bottomNameOffsetX}px, -40%)`}}>{name1}</h2>
        </div>
    )
};

Slider.propTypes = { 
    width: number,
    height: number,
    label: string,
    color: string,
    val1: number,
    val2: number,
    name1: string,
    name2: string
}

const MusicalAttr = ({ user_1, user_2, my_id }) => {
    
    const { taste: user1Taste } = user_1;
    const { taste: user2Taste } = user_2;

    var user1Name = user_1.display_name
    var user2Name = user_2.display_name

    if(user_1.id == my_id){
        user1Name = 'You';
    }
    else if(user_2.id == my_id){
        user2Name = 'You'
    }

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

    const attributes = [
        {
            label: 'Happiness',
            color: '#E5277B',
            val1: user1Taste.valence,
            val2: user2Taste.valence,
        },
        {
            label: 'Acousticness',
            color: '#F78D91',
            val1: user1Taste.acousticness,
            val2: user2Taste.acousticness,
        },
        {
            label: 'Danceability',
            color: '#FEEBDB',
            val1: user1Taste.danceability,
            val2: user2Taste.danceability,
        },
        {
            label: 'Energy',
            color: '#171724',
            val1: user1Taste.energy,
            val2: user2Taste.energy,
        },
    ]

    const SLIDER_HEIGHT_PERCENTAGE = .06;
    const SLIDER_WIDTH_PERCENTAGE = .8;

    const [resizeListener, pageSize] = useResizeAware();
    const [sliderWidth, setSliderWidth] = useState(SLIDER_WIDTH_PERCENTAGE * pageSize.width);
    const [sliderHeight, setSliderHeight] = useState(SLIDER_HEIGHT_PERCENTAGE * pageSize.height);

    useEffect(() => {
        const { height, width } = pageSize;
        setSliderHeight(SLIDER_HEIGHT_PERCENTAGE * height)
        setSliderWidth(SLIDER_WIDTH_PERCENTAGE * width)
    }, [pageSize])

    return (
        
        <Page background={'#9BD6DC'} numPages={5} pageNum={3}>
            {resizeListener}
            <button id="share" onClick={() => saveScreen()}>...</button>

            <div id="popup-background">
                <div id="popup" onClick={() => handleClick()}>
                </div>
            </div>
            <div className="MusicalAttr-Page">
                <div>
                    <h1 className="MusicalAttr-Title-TextShadow">Taste :P</h1>
                    <h2 className="MusicalAttr-subtitle">how happy, acoustic, danceable, and energetic is your music?</h2>
                </div>
                <div className="Sliders">
                    {attributes.map((attribute) => {
                        const { label, color, val1, val2 } = attribute
                        return (
                            <Slider 
                                key={label} 
                                width={sliderWidth} 
                                height={sliderHeight} 
                                label={label} 
                                color={color} 
                                val1={val1} 
                                val2={val2}
                                name1={user1Name}
                                name2={user2Name}
                            />
                        );
                    })}
                </div>
            </div>
        </Page>
    )
}

MusicalAttr.propTypes = {
    user_1: User,
    user_2: User
}

export default MusicalAttr;