/* eslint-disable no-unused-vars */
// // MainForm.jsx
import React, { useState } from 'react';
import Dropdown from '../Dropdown';
import { useSelector } from 'react-redux';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


const Survey = () => {
    const [month, setMonth] = useState({key: 'select month...', label: 'select month...'});
    const [day, setDay] = useState({key: 'select day...', label: 'select day...'});
    const [year, setYear] = useState({key: 'select year...', label: 'select year...'});
    const [gender, setGender] = useState({key: 'select...', label: 'select...'});
    const [raceethnicity, setRe] = useState({key: 'select...', label: 'select...'});
    const [country, setCountry] = useState({key: 'select...', label: 'select...'});
    const [region, setRegion] = useState({key: 'select...', label: 'select...'});
    const [hobbieslist, setHobbies] = useState({key: 'select...', label: 'select...'});
    const [pa, setPa] = useState({key: 'select...', label: 'select...'});
    const [myersbriggs, setMb] = useState({key: 'select...', label: 'select...'});
    const [art, setArt] = useState({key: 'select...', label: 'select...'});
    const [intExt, setIe] = useState({key: 'select...', label: 'select...'});

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
        console.log('You selected ', option);
        setMonth(option);
        console.log(month);
    }

    const _onSelectDay = (option) => {
        console.log(option);
        setDay(option);
        console.log(day);
    }

    const _onSelectYear = (option) => {
        console.log(option);
        setYear(option);
        console.log(year);
    }

    const _onSelectGender = (option) => {
        console.log('You selected ', option);
        setGender(option);
        console.log(gender);
    }

    const _onSelectRe = (option) => {
        console.log('You selected ', option);
        setRe(option);
        console.log(raceethnicity);
    }

    const _onSelectHobbies= (option) => {
        console.log('You selected ', option);
        setHobbies(option);
        console.log(hobbies);
    }

    const _onSelectPa = (option) => {
        console.log('You selected ', option);
        setPa(option);
        console.log(pa);
    }

    const _onSelectMb = (option) => {
        console.log('You selected ', option);
        setMb(option);
        console.log(myersbriggs);
    }

    const _onSelectArt = (option) => {
        console.log('You selected ', option);
        setArt(option);
        console.log(art);
    }

    const _onSelectIe = (option) => {
        console.log('You selected ', option);
        setIe(option);
        console.log(intExt);
    }

    /* React.useEffect((option) => {
        if (raceethnicity != ''){
            _onSelectRe(option);
        }
    }, [raceethnicity])
     */
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

    var optRe;

    return (
        <div>
            <div className="SurveyPage">
                <div className="Main">
                    <h1>Tell Us About Yourself</h1>
                    <div className='age'>
                    <p>D.O.B:</p>
                            <Dropdown 
                                options={months} 
                                onSelect={_onSelectMonth} 
                                currOption={month}
                            />
                            <Dropdown 
                                options={days} 
                                onSelect={_onSelectDay} 
                                currOption={day}  
                            />
                            <Dropdown 
                                options={years} 
                                onSelect={_onSelectYear} 
                                currOption={year}  
                            />
                    </div>
                    <div className= "gender">
                        <p>Gender:</p>
                        <Dropdown 
                            options={genders} 
                            onSelect={_onSelectGender} 
                            currOption={gender} /></div>
                    <div className="race-ethnicity">
                        <p>Race/Ethnicity:</p>
                        <Dropdown 
                            options={re} 
                            currOption = {raceethnicity}
                            onSelect={_onSelectRe}
                        />
                    </div>
                    <div className = "country-region">
                        <div className="country">
                        <p>Country:</p>
                        <CountryDropdown className = "country-dropdown"
                            value={country}
                            onChange={(val) => setCountry(val)} />
                            </div>
                     <div className="region">
                            <p>Region:</p>
                            <RegionDropdown className="region-dropdown"
                                country={country}
                                value={region}
                                onChange={(val) => setRegion(val)} />
                     </div>
                     </div>
                     <div className="hobbies">
                        <p>Hobbies:</p>
                        <Dropdown 
                            options={hobbies} 
                            onSelect={_onSelectHobbies} 
                            currOption={hobbieslist}
                        />
                    </div>
                    <div className="political-affiliation">
                        <p>Political Affiliation:</p>
                        <Dropdown 
                            options={pol} 
                            onSelect={_onSelectPa} 
                            currOption={pa}
                        />
                    </div>
                    <div className="myers-briggs">
                        <p>Myers Briggs (if youve taken it):</p>
                        <Dropdown 
                            options={mb} 
                            onSelect={_onSelectMb} 
                            currOption={myersbriggs}
                        />
                    </div>
                    <div className="artistic-scale">
                        <p>Artistic Scale:</p>
                        <Dropdown 
                            options={as} 
                            onSelect={_onSelectArt} 
                            currOption={art}
                        />
                    </div>
                    <div className="introversion-scale">
                        <p>Introversion Scale:</p>
                        <Dropdown 
                            options={intr} 
                            onSelect={_onSelectIe} 
                            currOption={intExt}
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


