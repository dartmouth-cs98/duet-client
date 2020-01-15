import React from 'react';
import Page from '../../Page';

const Trendex = () => {
    return (
        <Page background={'lightblue'} numPages={6} pageNum={1}>
            <div class="TrendexPage">
                <h1>sig ep is trendier than u</h1>
                <h2>78.0</h2>
                <h3>sig ep's trendex</h3>
                <div class="bottomSquare">
                    <h2>39.0</h2>
                    <h3>your trendex</h3>
                </div>
            </div>
        </Page>
    )
}

export default Trendex;