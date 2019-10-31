/* eslint-disable react/prop-types */
import React from 'react';

// genres = [{ label: String, percentage: Int}]
const GenreChart = ({ genres, height, width: chartWidth }) => {
    const colors = ["#FEEBDB", "#F78D91", "#E5277B"];
    const renderGenreBlock = (genre, i) => {
        const color = colors[i % colors.length];
        return (
            <div>
                <div 
                    className="GenreChart-Block" 
                    key={genre.label} 
                    style={{ backgroundColor: color, height, width: (chartWidth * genre.percentage) }}
                />
            <h2 style={{ color }}>{genre.label}</h2>
            </div>
        )
    }
    return (
        <div className="GenreChart">
            <h1>Your Top Genres</h1>
            <div className="GenreChart-Blocks">
                {genres.map((genre, i) => renderGenreBlock(genre, i))}
            </div>
        </div>
    )

}

export default GenreChart;