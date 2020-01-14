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

    return (
        <Page background={'white'} numPages={6} pageNum={0}>
            <div className="TopPage">
                <h1>You and Sig Ep share top artists</h1>
                <h3>top artists</h3>
            </div>

        </Page>
    )
}

export default TopArtists;