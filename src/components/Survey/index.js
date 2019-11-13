/* eslint-disable no-unused-vars */
// // MainForm.jsx
import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import { useSelector } from 'react-redux';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


const Survey = () => {
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [gender, setGender] = useState('');
    const [raceethnicity, setRe] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [hobbieslist, setHobbies] = useState([]);
    const [pa, setPa] = useState('');
    const [myersbriggs, setMb] = useState('');
    const [art, setArt] = useState('');
    const [intExt, setIe] = useState('');

    const months = [
        {key: 'jan', label: 'january'},
        {key: 'feb', label: 'february'},
        {key: 'mar', label: 'march'},
        {key: 'apr', label: 'april'},
        {key: 'may', label: 'may'},
        {key: 'june', label: 'june'},
        {key: 'july', label: 'july'},
        {key: 'aug', label: 'august'},
        {key: 'sept', label: 'september'},
        {key: 'oct', label: 'october'},
        {key: 'nov', label: 'november'},
        {key: 'dec', label: 'december'},
    ];

    const days = [
        {key: '1', label: 1},{key: '2', label: 2},{key: '3', label: 3},{key: '4', label: 4},{key: '5', label: 5},{key: '6', label: 6},
        {key: '7', label: 7},{key: '8', label: 8},{key: '9', label: 9},{key: '10', label: 10},{key: '11', label: 11},{key: '12', label: 12},
        {key: '13', label: 13},{key: '14', label: 14},{key: '15', label: 15},{key: '16', label: 16},{key: '17', label: 17},{key: '18', label: 18},
        {key: '19', label: 19},{key: '20', label: 20},{key: '21', label: 21},{key: '22', label: 22},{key: '23', label: 23},
        {key: '24', label: 24},{key: '25', label: 25},{key: '26', label: 26},{key: '27', label: 27},{key: '28', label: 28},
        {key: '29', label: 29},{key: '30', label: 30},{key: '31', label: 31}];

    const years = [
        {key: '2010', label: 2010},{key: '2009', label: 2009},{key: '2008', label: 2008},{key: '2007', label: 2007},{key: '2006', label: 2006},{key: '2005', label: 2005},
        {key: '2004', label: 2004},{key: '2003', label: 2003},{key: '2002', label: 2002},{key: '2001', label: 2001},{key: '2000', label: 2000},{key: '1999', label: 1999},
        {key: '1998', label: 1998},{key: '1997', label: 1997},{key: '1996', label: 1996},{key: '1995', label: 1995},{key: '1994', label: 1994},{key: '1993', label: 1993},
        {key: '1992', label: 1992},{key: '1991', label: 1991},{key: '1990', label: 1990},{key: '1980', label: 1980},{key: '1979', label: 1979},
        {key: '1978', label: 1978},{key: '1977', label: 1977},{key: '1976', label: 1976},{key: '1975', label: 1975},{key: '1974', label: 1974},
        {key: '1973', label: 1973},{key: '1972', label: 1972},{key: '1971', label: 1971}];

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

    const hobbies = [{key: 'writing',label: 'writing'},{name: 'reading',value: 'reading'},{key: 'soccer',label: 'soccer'},{key: 'baseball',label: 'baseball'},
        {key: 'basketball',label: 'basketball'}, {key: 'bowling',label: 'bowling'}, {key: 'boxing',label: 'boxing'},{key: 'cricket',label: 'cricket'}, {key: 'football',label: 'football'},
        {key: 'cycling',label: 'cycling'},{key: 'darts',label: 'darts'},{key: 'eSports',label: 'eSports'}, {key: 'golf',label: 'golf'}, {key: 'horse racing',label: 'horse racing'},
        {key: 'ice hockey',label: 'ice hockey'},{key: 'lacrosse',label: 'lacrosse'},{key: 'rugby',label: 'rugby'}, {key: 'handball',label: 'handball'},{key: 'tennis',label: 'tennis'},
        {key: 'bull riding',label: 'bull riding'}, {key: 'running',label: 'running'},{key: 'swimming',label: 'swimming'},
        {key: 'frisbee',label: 'frisbee'},{key: 'singing',label: 'singing'},{key: 'dancing',label: 'dancing'}, {key: 'guitar',label: 'guitar'},{key: 'cello',label: 'cello'},
        {key: 'clarinet',label: 'clarinet'}, {key: 'drum',label: 'drum'}, {key: 'flute',label: 'flute'}, {key: 'harp',label: 'harp'},
        {key: 'piano',label: 'piano'}, {key: 'saxophone',label: 'synthesizer'}, {key: 'tambourine',label: 'tambourine'}, {key: 'ukulele',label: 'ukulele'}, 
        {key: 'viola',label: 'viola'},{key: 'violin',label: 'violin'},{key: 'xylophone',label: 'xylophone'},
        {key: 'art',label: 'art'},{key: 'video games',label: 'video games'},{key: 'coding',label: 'coding'},
        {key: 'photography',label: 'photography'},{key: 'cooking',label: 'cooking'},{key: 'hiking',label: 'hiking'},{key: 'biking',label: 'biking'},
        {key: 'television',label: 'television'},{key: 'travelling',label: 'travelling'}];

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


      const as = [{key: '1', label: 1},{key: '2', label: 2},{key: '3', label: 3},{key: '4', label: 4},{key: '5', label: 5},{key: '6', label: 6},
        {key: '7', label: 7},{key: '8', label: 8},{key: '9', label: 9},{key: '10', label: 10}
      ];

      const intr = [{key: '1', label: 1},{key: '2', label: 2},{key: '3', label: 3},{key: '4', label: 4},{key: '5', label: 5},{key: '6', label: 6},
        {key: '7', label: 7},{key: '8', label: 8},{key: '9', label: 9},{key: '10', label: 10}
      ];

    //this._onSelect = this._onSelect.bind(this);
    const _onSelectMonth = (option) => {
        console.log('You selected ', option.label);
        setMonth({month: option.label});
        console.log(month);
    }

    const _onSelectDay = (option) => {
        console.log('You selected ', option.label);
        setDay({day: option.label});
        console.log(day);
    }

    const _onSelectYear = (option) => {
        console.log('You selected ', option.label);
        setYear({year: option.label});
        console.log(year);
    }

    const _onSelectGender = (option) => {
        console.log('You selected ', option.label);
        setGender({gender: option.label});
        console.log(gender);
    }

    const _onSelectRe = (option) => {
        console.log('You selected ', option.label);
        setRe({raceethnicity: option.label});
        console.log(raceethnicity);
    }

    const _onSelectCountry = (option) => {
        console.log('You selected ', option.label);
        setCountry({country: option.label});
        console.log(country);
    }

    const _onSelectRegion = (option) => {
        console.log('You selected ', option.label);
        setRegion({region: option.label});
        console.log(region);
    }

    const _onSelectHobbies= (option) => {
        console.log('You selected ', option.label);
        setHobbies({hobbies: option.label});
        console.log(hobbies);
    }

    const _onSelectPa = (option) => {
        console.log('You selected ', option.label);
        setPa({pa: option.label});
        console.log(pa);
    }

    const _onSelectMb = (option) => {
        console.log('You selected ', option.label);
        setMb({myersbriggs: option.label});
        console.log(myersbriggs);
    }

    const _onSelectArt = (option) => {
        console.log('You selected ', option.label);
        setArt({art: option.label});
        console.log(art);
    }

    const _onSelectIe = (option) => {
        console.log('You selected ', option.label);
        setIe({intExt: option.label});
        console.log(intExt);
    }
    
    const createUserMap= () =>{
        var userMap =  {
            'month': month,
            'day': day,
            'year': year,
            'gender': gender,
            're': raceethnicity,
            'country': country,
            'region': region,
            'hobbies': hobbieslist,
            'pa': pa,
            'myersbriggs': myersbriggs,
            'artistic': art,
            'intExt': intExt,
        };
        console.log(userMap);
        return userMap;
    }

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
                                onChange={_onSelectMonth} 
                                currOption={month}
                                placeholder= 'Month'
                            />
                            </div>
                        <div className="daycard">
                            <Dropdown 
                                options={days} 
                                onChange={_onSelectDay} 
                                currOption={day}  
                                placeholder= 'Day'
                            />
                        </div>
                        <div className="yearcard">
                            <Dropdown 
                                options={years} 
                                onChange={_onSelectYear} 
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
                         onChange={_onSelectGender} 
                            currOption={genders[0]} /></div>
                    <div className="race-ethnicity">
                        <p>Race/Ethnicity:</p>
                        <Dropdown 
                            options={re} 
                            onChange={_onSelectRe} 
                            currOption={re[0]}
                        />
                    </div>
                    <div className = "country-region">
                    <div className="country-dropdown">
                        <p>Country:</p>
                        <Dropdown 
                            options={countries}
                            onChange={_onSelectCountry} />
                            
                            </div>
                     <div className="region-dropdown">
                            <p>Region:</p>
                            <Dropdown
                            options ={states}
                            onChange={_onSelectRegion} />
                     </div>
                     </div>
                     <div className="hobbies">
                        <p>Hobbies:</p>
                        <Dropdown 
                            options={hobbies} 
                            onChange={_onSelectHobbies} 
                            currOption={hobbies[0] }
                        />
                    </div>
                    <div className="political-affiliation">
                        <p>Political Affiliation:</p>
                        <Dropdown 
                            options={pol} 
                            onChange={_onSelectPa} 
                            currOption={pol[0]}
                        />
                    </div>
                    <div className="myers-briggs">
                        <p>Myers Briggs (if youve taken it):</p>
                        <Dropdown 
                            options={mb} 
                            onChange={_onSelectMb} 
                            currOption={mb[0]}
                        />
                    </div>
                    <div className="artistic-scale">
                        <p>Artistic Scale:</p>
                        <Dropdown 
                            options={as} 
                            onChange={_onSelectArt} 
                            currOption={as[0]}
                        />
                    </div>
                    <div className="introversion-scale">
                        <p>Introversion Scale:</p>
                        <Dropdown 
                            options={intr} 
                            onChange={_onSelectIe} 
                            currOption={intr[0]}
                        />
                    </div>
                    <button className='finishSurvey'
                    onClick = {createUserMap}>
                        Finish Survey
                       
                        </button>
                        
                    </div>
            </div>
        </div>
    );
}

export default Survey;


