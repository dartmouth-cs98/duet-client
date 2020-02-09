import React from 'react';

// genres = [{ label: String, percentage: Int}]
const GenreChart = ({ height, genres}) => {
    let genreTotal = 0;
    genres.forEach((genre) => genreTotal += genre.count);
    
    const colors = ["#FEEBDB", "#F78D91", "#E5277B"];
    const renderGenreBlock = (genre, i) => {
        const color = colors[i % colors.length];
        return (
            <div key={genre.label} className="OuterDiv" style={{ flexGrow: (genre.count / genreTotal) }}>
                <div 
                    className="GenreChart-Block" 
                    style={{ backgroundColor: color, height }}
                />
            <h4 style={{ color }}>{genre.label}</h4>
            </div>
        )
    }
    return (
        <div className="GenreChart">
            <div className="GenreChart-Blocks">
                {genres.map((genre, i) => renderGenreBlock(genre, i))}
            </div>
        </div>
    )

}

export default GenreChart;