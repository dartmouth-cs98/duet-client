/* eslint-disable no-unused-vars */
// // MainForm.jsx
import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


const Survey = () => {
    const [attribute, setAttribute, state] = useState('');
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
        var start = 1909;
        for (start; start<2019; start=start+1){
            years[start] = start;
        }

        return years;
      };

    const years = createYears();

    const genders = [
        {key: 'male', label: 'male'},
        {key: 'female', label: 'female'},
        {key: 'other', label: 'other'},
    ];

    const re = [
        {key: 'white', label: 'white'},
        {key: 'black or african american', label: 'black or african american'},
        {key: 'american indian or alaskan native', label: 'american indian or alaskan native'},
        {key: 'asian', label: 'asian'},
        {key: 'native hawaiian or pacific islander', label: 'native hawaiian or pacific islander'},
        {key: 'hispanic or latino', label: 'hispanic or latino'},
        {key: 'two or more', label: 'two or more'},
        {key: 'other', label: 'other'},
    ];

    const countries = [
        {key: 'united states of america', label: 'united states of america'},
        {key: 'canada', label: 'canada'},
        {key: 'mexico', label: 'mexico'},
    ]

    const states = [
        {key: 'california', label: 'california'},
        {key: 'florida', label: 'florida'},
        {key: 'new hampshire', label: 'new hampshire'},
        {key: 'new york', label: 'new york'},
        {key: 'texas', label: 'texas'},
    ]

    const hobbies = [
        {key: 'reading', label: 'reading'},
        {key: 'writing', label: 'writing'},
        {key: 'television', label: 'television'},
        {key: 'sports', label: 'sports'},
    ];

    const mb = [
        {key: 'ENTJ', label: 'ENTJ'},
        {key: 'ENTP', label: 'ENTP'},
        {key: 'ENFP', label: 'ENFP'},
        {key: 'ENFJ', label: 'ENFJ'},
        {key: 'ESTP', label: 'ESTP'},
        {key: 'ESTJ', label: 'ESTJ'},
        {key: 'ESFP', label: 'ESFP'},
        {key: 'ESFJ', label: 'ESFJ'},
        {key: 'INTJ', label: 'INTJ'},
        {key: 'INTP', label: 'INTP'},
        {key: 'INFP', label: 'INFP'},
        {key: 'INFJ', label: 'INFJ'},
        {key: 'ISTP', label: 'ISTP'},
        {key: 'ISTJ', label: 'ISTJ'},
        {key: 'ISFP', label: 'ISFP'},
        {key: 'ISFJ', label: 'ISFJ'},
    ];

    const pol = [
        {key: 'conservative', label: 'conservative'},
        {key: 'liberal', label: 'liberal'},
        {key: 'other', label: 'other'},
    ];

    const createAS= () => {
        var as = [];
        var start= 0;
        for (start; start<30; start=start+1){
            as[start] = start;
        }

        return as;
      };
      const as = createAS();

      const createIS= () => {
        var intr = [];
        var start= 0;
        for (start; start<11; start=start+1){
            intr[start] = start;
        }

        return intr;
      };
      const intr = createIS();

    return (
        <div>
            <div className="SurveyPage">
                <div className="Main">
                    <h1>Tell Us About Yourself</h1>
                    <div className='age'>
                    <p>D.O.B:</p>
                    <div className="scrolling-wrapper">
                    
                        <div className="monthcard">
                            <Dropdown 
                                options={months} 
                                onSelect={(e) => setAttribute(months.key)} 
                                currOption={months[0]}  
                                placeholder= 'Month'
                            />
                            </div>
                        <div className="daycard">
                            <Dropdown 
                                options={days} 
                             onSelect={(f) => setAttribute(days.key)} 
                                currOption={days[0]}  
                                placeholder= 'Day'
                            />
                        </div>
                        <div className="yearcard">
                            <Dropdown 
                                options={years} 
                             onSelect={(g) => setAttribute(years.key)} 
                                currOption={years[0]}  
                                placeholder= 'Year'
                            />
                        </div>
                    </div>
                    </div>
                    <div className= "gender">
                        <p>Gender:</p>
                        <Dropdown 
                            options={genders} 
                         onSelect={(h) => setAttribute(genders.key)} 
                            currOption={genders[0]} /></div>
                    <div className="race-ethnicity">
                        <p>Race/Ethnicity:</p>
                        <Dropdown 
                            options={re} 
                            onSelect={(i) => setAttribute(re.key)} 
                            currOption={re[0]}
                        />
                    </div>
                    <div className = "country-region">
                    <div className="country-dropdown">
                        <p>Country:</p>
                        <Dropdown 
                            options={countries}
                            onSelect={(val) => setAttribute(countries.key)} />
                            
                            </div>
                     <div className="region-dropdown">
                            <p>Region:</p>
                            <Dropdown
                            options ={states}
                            onSelect={(val) => setAttribute(states.key)} />
                     </div>
                     </div>
                     <div className="hobbies">
                        <p>Hobbies:</p>
                        <Dropdown 
                            options={hobbies} 
                            onSelect={(j) => setAttribute(hobbies.key)} 
                            currOption={hobbies[0] }
                        />
                    </div>
                    <div className="political-affiliation">
                        <p>Political Affiliation:</p>
                        <Dropdown 
                            options={pol} 
                            onSelect={(k) => setAttribute(pol.key)} 
                            currOption={pol[0]}
                        />
                    </div>
                    <div className="myers-briggs">
                        <p>Myers Briggs (if youve taken it):</p>
                        <Dropdown 
                            options={mb} 
                            onSelect={(l) => setAttribute(mb.key)} 
                            currOption={mb[0]}
                        />
                    </div>
                    <div className="artistic-scale">
                        <p>Artistic Scale:</p>
                        <Dropdown 
                            options={as} 
                            onSelect={(l) => setAttribute(as.key)} 
                            currOption={as[0]}
                        />
                    </div>
                    <div className="introversion-scale">
                        <p>Introversion Scale:</p>
                        <Dropdown 
                            options={intr} 
                            onSelect={(l) => setAttribute(intr.key)} 
                            currOption={intr[0]}
                        />
                    </div>
                    <button className='finishSurvey'>
                        Finish Survey
                        </button>
                        
                    </div>
            </div>
        </div>
    );
}

export default Survey;


