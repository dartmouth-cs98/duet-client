import React from 'react';
import Page from '../../Page';

const Trendex = () => {
    return (
        <Page background={'#9BD6DC'} numPages={6} pageNum={1}>
            <div className="TrendexPage">
                <h1><mark>sig ep is trendier than u</mark></h1>
                <h2>78.0</h2>
                <h3>sig ep's trendex</h3>
                <div id="divider"></div>
                <div className="bottomSquare">
                    <h1>\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\</h1>
                    <h2>39.0</h2>
                    <h3>your trendex</h3>
                    <div id="arrow"></div>
                </div>
            </div>
        </Page>
    )
}

export default Trendex;