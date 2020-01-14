import React from 'react';
import Page from '../../Page';

const TopArtists = () => {
    const yourTopArtists = [
        { key: 'Ariana Grande', label: 'Ariana Grande' },
        { key: 'Billie Eilish', label: 'Billie Eilish' },
        { key: 'Michael Jackson', label: 'Michael Jackson' },
        { key: 'Post Malone', label: 'Post Malone' },
        { key: 'The Beatles', label: 'The Beatles' },
        { key: 'The Eagles', label: 'The Eagles' },
        { key: 'Elvis Presley', label: 'Elvis Presley' },
        { key: 'Paul Simon', label: 'Paul Simon' }
    ];

    const theirTopArtists = [
        { key: 'Taylor Swift', label: 'Taylor Swift' },
        { key: 'Billie Eilish', label: 'Billie Eilish' },
        { key: 'Drake', label: 'Drake' },
        { key: 'Post Malone', label: 'Post Malone' },
        { key: 'Justin Beiber', label: 'Justin Beatles' },
        { key: 'The Jonas Brothers', label: 'The Jonas Brothers' },
        { key: 'The Eagles', label: 'The Eagles' },
        { key: 'Dan + Shay', label: 'Dan + Shay' }
    ];

    const renderArtists = (topArtists) => {
        const items = topArtists.map((item, key) =>
        <li key={item.key}>{item.label}</li>);
    };
    return (
        <Page background={'white'} numPages={6} pageNum={0}>
            <div className="TopPage">
                <div className="title">
                    <h1>You and Sig Ep share top artists</h1>
                    <h3>top artists</h3>
                </div>
                <div className="yourArtists">
                    <h2>you</h2>
                    <h1>{artists => renderArtists(yourTopArtists)}</h1>
                </div>
            </div>
        </Page>
    )
}

export default TopArtists;