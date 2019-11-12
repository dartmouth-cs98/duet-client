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
        {key: 'jan', label: 'jan'},
        {key: 'feb', label: 'feb'},
        {key: 'mar', label: 'mar'},
    ];

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

    const hobbies = [{
        key: 'writing',
        label: 'writing'
      },
      {
          name: 'reading',
          value: 'reading'
        },
        {
          key: 'playing a sport',
          label: 'playing a sport'
        },
        {
          key: 'playing an instrument',
          label: 'playing an instrument'
        },
        {
          key: 'singing',
          label: 'singing'
        },
        {
          key: 'dancing',
          label: 'dancing'
        }, 
        {
            key: 'art',
            label: 'art'
          },
          {
            key: 'video games',
            label: 'video games'
          },
          {
            key: 'running',
            label: 'running'
          },
          {
            key: 'coding',
            label: 'coding'
          },
          {
            key: 'photography',
            label: 'photography'
          },
          {
            key: 'cooking',
            label: 'cooking'
          },
          {
            key: 'hiking',
            label: 'hiking'
          },
          {
            key: 'biking',
            label: 'biking'
          },
          {
            key: 'swimming',
            label: 'swimming'
          },
          {
            key: 'television',
            label: 'television'
          },
          {
            key: 'travelling',
            label: 'travelling'
          },];

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
                                value={months[0]}  
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


