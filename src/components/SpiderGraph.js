import React from 'react';
import RadarChart from 'react-svg-radar-chart';
import { useSelector } from 'react-redux';
import 'react-svg-radar-chart/build/css/index.css'
 
const SpiderGraph = () => {
    const { avg_taste } = useSelector((state) => state.user);

    const data= [
        {
            data: {
                danceability: avg_taste ? avg_taste.danceability : 0,
                energy: avg_taste ? avg_taste.energy : 0,
                speechiness: avg_taste ? avg_taste.speechiness : 0,
                acousticness: avg_taste ? avg_taste.acousticness : 0,
                instrumentalness: avg_taste ? avg_taste.instrumentalness: 0,
                liveness: avg_taste ? avg_taste.liveness: 0,
                valence: avg_taste ? avg_taste.valence: 0,
                mode: avg_taste ? avg_taste.mode: 0,
            },
            meta: { color: 'blue' },
        },
    ]

    const captions = {
        danceability: avg_taste ? "Danceability: " + avg_taste.danceability.toFixed(2):  "",
        energy: avg_taste ? "Energy: " + avg_taste.energy.toFixed(2):  "",
        speechiness: avg_taste ? "Speechiness: " + avg_taste.speechiness.toFixed(2):  "",
        acousticness: avg_taste ? "Danceability: " + avg_taste.acousticness.toFixed(2):  "",
        instrumentalness: avg_taste ? "Instrumentalness: " + avg_taste.instrumentalness.toFixed(2):  "",
        liveness: avg_taste ? "Liveness: " + avg_taste.liveness.toFixed(2):  "",
        valence: avg_taste ? "Valence: " + avg_taste.valence.toFixed(2):  "",
        mode: avg_taste ? "Mode: " + avg_taste.mode.toFixed(2):  "",
    };

    return (
        <div>
            <RadarChart
                captions={captions}
                data={data}
                size={300}
                scales={3}
            />
        </div>
    );
}
 
export default SpiderGraph;
 