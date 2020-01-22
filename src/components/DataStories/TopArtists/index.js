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
        { key: 'Justin Beiber', label: 'Justin Beiber' },
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
                    <h1>You and Sig Ep share</h1>
                    <div id="topArtists"/>
                </div>
                <div className="yourArtists">
                    <h2>You</h2>
                    <h1>Ariana Grande</h1>
                    <h1><mark>Billie Eilish</mark></h1>
                    <h1>Michael Jackson</h1>
                    <h1><mark>Post Malone</mark></h1>
                    <h1>The Beatles</h1>
                    <h1><mark>The Eagles</mark></h1>
                    <h1>Elvis Presley</h1>
                    <h1>Paul Simon</h1>
                </div>
                <div className="theirArtists">
                    <h2>Sig Ep</h2>
                    <h1>Taylor Swift</h1>
                    <h1><mark>Billie Eilish</mark></h1>
                    <h1>Drake</h1>
                    <h1><mark>Post Malone</mark></h1>
                    <h1>Justin Beiber</h1>
                    <h1>The Jonas Brothers</h1>
                    <h1><mark>The Eagles</mark></h1>
                    <h1>Dan + Shay</h1>
                </div>
                <div id="arrow"/>
            </div>
        </Page>
    )
}

export default TopArtists;