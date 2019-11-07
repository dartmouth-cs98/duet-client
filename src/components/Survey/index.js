/* eslint-disable no-unused-vars */
// // MainForm.jsx
import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


const Survey = () => {
    const [attribute, setAttribute, state] = useState(null);
    const country = useState('');
    const region = useState('');

    const createMonths = () => {
        const mths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var months = [];
        var start = 0;
        for(start; start<=11; start = start+1){
            const i = mths[start];
            months[start] = i;
        }
        return months;
      };

    const months = createMonths();

    const createDays = () => {
        var days = [];
        var start = 31;
        for (start; start>=1; start=start-1){
            days[start] = start;
        }

        return days;
      };

    const days = createDays();

    const createYears = () => {
        var years = [];
        var start = 2019;
        for (start; start>=1909; start=start-1){
            years[start] = start;
        }

        return years;
      };

    const years = createYears();

    const genders = [
        {value: 'male', label: 'male'},
        {value: 'female', label: 'female'},
        {value: 'other', label: 'other'},
    ];

    const re = [
        {value: 'white', label: 'white'},
        {value: 'black or african american', label: 'black or african american'},
        {value: 'american indian or alaskan native', label: 'american indian or alaskan native'},
        {value: 'asian', label: 'asian'},
        {value: 'native hawaiian or pacific islander', label: 'native hawaiian or pacific islander'},
        {value: 'hispanic or latino', label: 'hispanic or latino'},
        {value: 'two or more', label: 'two or more'},
        {value: 'other', label: 'other'},
    ];

    const hobbies = [];

    const mb = [
        {value: 'ENTJ', label: 'ENTJ'},
        {value: 'ENTP', label: 'ENTP'},
        {value: 'ENFP', label: 'ENFP'},
        {value: 'ENFJ', label: 'ENFJ'},
        {value: 'ESTP', label: 'ESTP'},
        {value: 'ESTJ', label: 'ESTJ'},
        {value: 'ESFP', label: 'ESFP'},
        {value: 'ESFJ', label: 'ESFJ'},
        {value: 'INTJ', label: 'INTJ'},
        {value: 'INTP', label: 'INTP'},
        {value: 'INFP', label: 'INFP'},
        {value: 'INFJ', label: 'INFJ'},
        {value: 'ISTP', label: 'ISTP'},
        {value: 'ISTJ', label: 'ISTJ'},
        {value: 'ISFP', label: 'ISFP'},
        {value: 'ISFJ', label: 'ISFJ'},
    ];

    const pol = [
        {value: 'conservative', label: 'conservative'},
        {value: 'liberal', label: 'liberal'},
        {value: 'other', label: 'other'},
    ];

    return (
        <div>
            <div className="SurveyPage">
                <div className="Main">
                    <h1>Tell Us About Yourself</h1>
                    <div className="scrolling-wrapper">
                        <div className="card">
                            <p>Birth Month</p>
                            <Dropdown 
                                options={months} 
                                onChange={(e) => setAttribute(months.value)} 
                                value={months[0]} 
                                placeholder="Select an option" 
                            />
                        </div>
                        <div className="card">
                            <p>Birth Day</p>
                            <Dropdown 
                                options={days} 
                                onChange={(f) => setAttribute(days.value)} 
                                value={days[0]} 
                                placeholder="Select an option" 
                            />
                        </div>
                        <div className="card">
                            <p>Birth Year</p>
                            <Dropdown 
                                options={years} 
                                onChange={(g) => setAttribute(years.value)} 
                                value={years[0]} 
                                placeholder="Select an option" 
                            />
                        </div>
                    </div>
                    <p>Gender</p>
                    <Dropdown 
                        options={genders} 
                        onChange={(h) => setAttribute(genders.value)} 
                        value={genders[0]} 
                        placeholder="Select an option" 
                    />
                    <p>Race/Ethnicity</p>
                    <Dropdown 
                        options={re} 
                        onChange={(i) => setAttribute(re.value)} 
                        value={re[0]} 
                        placeholder="Select an option" 
                    />
                    <p>Country</p>
                    <CountryDropdown
                        value={country}
                        onChange={(val) => setAttribute(this.setState({ country: val }))} />
                    <p>Region</p>
                    <RegionDropdown
                        value={region}
                        onChange={(val) => setAttribute(this.setState({ state: val}))} />
                    <p>Hobbies</p>
                    <Dropdown 
                        options={hobbies} 
                        onChange={(j) => setAttribute(hobbies.value)} 
                        value={hobbies[0]} 
                        placeholder="Select an option" 
                    />
                    <p>Political Affiliation</p>
                    <Dropdown 
                        options={pol} 
                        onChange={(k) => setAttribute(pol.value)} 
                        value={pol[0]} 
                        placeholder="Select an option" 
                    />
                    <p>Myers Briggs (if you&aposve taken it)</p>
                    <Dropdown 
                        options={mb} 
                        onChange={(l) => setAttribute(mb.value)} 
                        value={mb[0]} 
                        placeholder="Select an option" 
                    />
                </div>
            </div>
        </div>
    );
}

export default Survey;


