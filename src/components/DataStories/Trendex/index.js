import React from 'react';
import Page from '../../Page';
import html2canvas from 'html2canvas';
import { User } from '../../../types';

const Trendex = ({ user_1, user_2 }) => {
    const { trendex: user1Trendex } = user_1;
    const { trendex: user2Trendex, display_name: user2Name } = user_2;

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
        <Page background={'#9BD6DC'} numPages={6} pageNum={1}>
            <div className="Trendex-Page">
                <button id="share" onClick={() => saveScreen()}>...</button>
                <div id="popup-background">
                    <div id="popup" onClick={() => handleClick()}></div>
                </div>
                <div className="Trendex-TopSquare">
                    {user1Trendex > user2Trendex && 
                        <h1 className="Trendex-Description"><mark>you&apos;re trendier than {user2Name}</mark></h1>}
                    {user1Trendex < user2Trendex && 
                        <h1 className="Trendex-Description"><mark>{user2Name} is trendier than u</mark></h1>}
                    {user1Trendex == user2Trendex &&
                         <h1 className="Trendex-Description"><mark>u and {user2Name} are equally trendy</mark></h1>}
                    <h2 className="Trendex-Score">{user1Trendex}</h2>
                    <h3 className="Trendex-Score-Label">your trendex</h3>
                </div>
                <div className="Trendex-Divider">\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\</div>
                <div className="Trendex-BottomSquare">
                    <h2 id="bottom" className="Trendex-Score">{user2Trendex}</h2>
                    <h3 className="Trendex-Score-Label">{user2Name}&apos;s trendex</h3>
                </div>
            </div>
        </Page>
    )
}

Trendex.propTypes = {
    user_1: User,
    user_2: User,
}

export default Trendex;