/* eslint-disable react/prop-types */
import React from 'react';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'
 
const SpiderGraph = ( { avg_taste, friendTaste }) => {

    let data = [
        {
            data: {
                danceability: avg_taste ? avg_taste.danceability : 0,
                energy: avg_taste ? avg_taste.energy : 0,
                // speechiness: avg_taste ? avg_taste.speechiness : 0,
                acousticness: avg_taste ? avg_taste.acousticness : 0,
                // instrumentalness: avg_taste ? avg_taste.instrumentalness: 0,
                liveness: avg_taste ? avg_taste.liveness: 0,
                valence: avg_taste ? avg_taste.valence: 0,
                // mode: avg_taste ? avg_taste.mode: 0,
            },
            meta: { color: '#F78D91', stroke: '#F78D91' },
        },
    ]

    if (friendTaste) {
        const friendData = {   
            data: {
                danceability: friendTaste ? friendTaste.danceability : 0,
                energy: friendTaste ? friendTaste.energy : 0,
                // speechiness: friendTaste ? friendTaste.speechiness : 0,
                acousticness: friendTaste ? friendTaste.acousticness : 0,
                // instrumentalness: friendTaste ? friendTaste.instrumentalness: 0,
                liveness: friendTaste ? friendTaste.liveness: 0,
                valence: friendTaste ? friendTaste.valence: 0,
                // mode: friendTaste ? friendTaste.mode: 0,
            },
            meta: { color: '#E5277B', stroke: '#E5277B' },
        }
        data = [ ...data, friendData];
    }
    
    const captions = {
        danceability: avg_taste ? "Danceability: " + avg_taste.danceability.toFixed(2):  "",
        energy: avg_taste ? "Energy: " + avg_taste.energy.toFixed(2):  "",
        // speechiness: avg_taste ? "Speechiness: " + avg_taste.speechiness.toFixed(2):  "",
        acousticness: avg_taste ? "Acousticness: " + avg_taste.acousticness.toFixed(2):  "",
        // instrumentalness: avg_taste ? "Instrumentalness: " + avg_taste.instrumentalness.toFixed(2):  "",
        liveness: avg_taste ? "Liveness: " + avg_taste.liveness.toFixed(2):  "",
        valence: avg_taste ? "Happiness: " + avg_taste.valence.toFixed(2):  "",
        // mode: avg_taste ? "Mode: " + avg_taste.mode.toFixed(2):  "",
    };

    return (
        <div className="SpiderGraph">
            <h2>What is the shape of your music?</h2>
            <RadarChart
            captions={captions}
            data={data}
            size={450}
            scales={3}
            options={
                { 
                    setViewBox: (options) => `-${options.captionMargin} 0 ${options.size + options.captionMargin * 2} ${options.size + 100}`, 
                    captionProps: () => ({ className: 'SpiderGraph-label', fontSize: 20 }),
                    scaleProps: () => ({ className: 'SpiderGraph-scale', fill: '#212034', stroke: '#FEEBDB' }),
                    axisProps: () => ({ className: 'SpiderGraph-axis', stroke: '#FEEBDB' }),
                    shapeProps: () => ({ className: 'SpiderGraph-shape' }),
                }
            }
            />
        </div>
    );
}
 
export default SpiderGraph;
 