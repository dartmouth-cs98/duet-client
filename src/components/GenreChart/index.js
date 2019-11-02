/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';

// genres = [{ label: String, percentage: Int}]
const GenreChart = ({ height, width: chartWidth }) => {
    const { genre_counts } = useSelector((state) => state.user);
    const genres = genre_counts ? genre_counts : [];
    let genreTotal = 0;
    genres.forEach((genre) => genreTotal += genre.count);
    
    const colors = ["#FEEBDB", "#F78D91", "#E5277B"];
    const renderGenreBlock = (genre, i) => {
        const color = colors[i % colors.length];
        return (
            <div key={genre.label} >
                <div 
                    className="GenreChart-Block" 
                    style={{ backgroundColor: color, height, width: chartWidth * (genre.count / genreTotal) }}
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