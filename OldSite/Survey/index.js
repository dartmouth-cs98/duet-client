import React, { useState } from 'react';
import Dropdown from '../Dropdown';
import Multiselect from 'multiselect-dropdown-react';
import * as options from "../../constants/surveyOptions";
import { useSelector } from 'react-redux';
import { storeSurveyData } from '../../utils/backendUtils';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import ReactRouterPropTypes from 'react-router-prop-types';

const Survey = ({ history }) => {
    const { id } = useSelector((state) => state.user);
    
    const [month, setMonth] = useState({key: 'select month...', label: 'select month...'});
    const [day, setDay] = useState({key: 'select day...', label: 'select day...'});
    const [year, setYear] = useState({key: 'select year...', label: 'select year...'});
    const [gender, setGender] = useState({key: 'select...', label: 'select...'});
    const [raceAndEthnicity, setRaceAndEthnicity] = useState({key: 'select...', label: 'select...'});
    const [country, setCountry] = useState('United States');
    const [region, setRegion] = useState({key: 'select...', label: 'select...'});
    const [politicalAffiliation, setPoliticalAffiliation] = useState({key: 'select...', label: 'select...'});
    const [myersBriggs, setMyersBriggs] = useState({key: 'select...', label: 'select...'});
    const [artisticScale, setArtisticScale] = useState({key: 'select...', label: 'select...'});
    const [introversionScale, setIntroversionScale] = useState({key: 'select...', label: 'select...'});
    const [hobbies, setHobbies] = useState({key: 'select...', label: 'select...'});

    const handleSubmit = () => {
        var userMap =  {
            'month': month.key,
            'day': day.key,
            'year': year.key,
            'gender': gender.key,
            'ethnicity': raceAndEthnicity.key,
            'country': country,
            'region': region,
            'hobbies': hobbies,
            'political_aff': politicalAffiliation.key,
            'myers_briggs': myersBriggs.key,
            'artistic_scale': artisticScale.key,
            'intro_extro_scale': introversionScale.key,
        };
        storeSurveyData(userMap, id);
        history.push('/dashboard/me');
    }

    const handleBack = () => {
        history.push('/dashboard/me');
    }

    return (
        <div>
            <div className="SurveyPage">
                <div className="Squigs">
                    <svg width="1676" height="1048" viewBox="0 0 1676 1048" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M342.152 286.333C323.995 298.799 304.613 308.848 287.208 322.556C253.949 348.747 229.071 391.251 234.93 435.111C242.985 495.406 299.599 523.664 343.597 556.167C364.467 571.584 400.563 597.362 393.097 628.333C390.782 637.934 384.665 646.46 378.985 654.333C370.232 666.469 360.297 677.709 350.374 688.889C331.695 709.935 316.415 728.937 317.374 758.556C319.808 833.72 403.102 862.382 466.374 866.111C510.768 868.728 555.117 868.325 599.43 872.944C644.165 877.608 688.873 883.873 733.43 890C754.338 892.875 775.798 896.121 795.93 902.667C816.25 909.273 835.078 919.516 852.652 931.556C870.428 943.733 887.219 957.393 906.041 968C923.811 978.014 943.407 985.235 963.374 989.333C1006.19 998.12 1049.76 986.045 1089.04 969.222C1114.4 958.363 1139.38 946.635 1165.04 936.5C1187.95 927.452 1211.09 919.011 1233.71 909.222C1253.26 900.757 1271.25 890.431 1287.93 877.111C1300.55 867.029 1312.48 856.329 1325.71 847C1339.81 837.051 1356.54 830.012 1368.49 817.333C1386.59 798.111 1402.79 776.195 1417.26 754.167C1433.42 729.569 1448.1 702.987 1436.54 673.556C1423.13 639.415 1401.42 608.571 1393.93 572.167C1387.79 542.322 1396.34 510.607 1407.93 483.111C1418.45 458.144 1433.59 436.928 1447.04 413.667C1458.45 393.94 1459.04 374.606 1447.04 355.111C1438.15 340.674 1425.96 328.959 1413.32 317.833C1395.77 302.387 1377.16 288.493 1357.71 275.556C1320.82 251.024 1281.53 232.055 1241.93 212.444C1218.03 200.608 1193.28 190.022 1167.43 183.278C1124.98 172.203 1081.61 164.451 1038.99 153.944C1007.73 146.24 975.813 136.576 943.819 132.5C905.108 127.569 865.966 127.906 827.041 126.722C757.309 124.602 681.93 123.035 616.597 95.3333C603.336 89.7107 592.325 84.0022 577.708 81.8889C552.132 78.1912 525.971 76.2896 500.152 75.3333" stroke="#212034" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M171.152 119.333C156.154 121.511 142.167 123.839 128.319 130.278C112.086 137.826 99.0797 148.639 85.7079 160.333C59.8973 182.907 30.8464 205.823 15.3745 237.222C-3.96987 276.48 -2.82533 323.916 13.0412 364.111C21.4201 385.338 34.2924 404.113 48.7634 421.611C61.6568 437.201 76.9456 450.875 89.0412 467.111C126.63 517.568 82.6712 580.751 84.3745 636.111C86.3761 701.162 128.794 765.62 183.708 798.722C228.226 825.558 279.013 838.9 325.541 861.5C333.974 865.596 345.302 870.472 350.263 879.111C353.123 884.091 352.034 890.832 352.263 896.278C353.435 924.094 367.284 943.686 392.041 956.333C417.547 969.363 446.019 977.441 473.597 984.667C509.861 994.168 546.842 1000.66 583.652 1007.61C672.591 1024.41 761.749 1038.39 852.208 1043.61C915.086 1047.24 978.145 1046.33 1041.1 1046.33C1083.2 1046.33 1125.45 1047.35 1167.54 1046.17C1189.11 1045.56 1211.07 1043.37 1231.6 1036.33C1258.1 1027.25 1284 1008 1310 992C1332.93 979.863 1358.31 971.456 1377.41 968.728C1396.5 966 1430.5 983 1471 980.5C1511.5 978 1536.83 971.17 1563.5 944.5C1580.01 927.986 1595 895 1591 878.5C1587 862 1564.73 837 1572.62 805.147C1576.99 787.515 1580.35 769.816 1586.9 752.798C1594.47 733.1 1604.43 714.417 1613.74 695.5C1632.52 657.337 1664.94 637.639 1671.89 595.897C1676.08 570.784 1674.83 551.301 1662.38 528.891C1654.33 514.411 1641.36 502.954 1632.58 488.725C1623.78 474.452 1614.09 457.594 1611.84 440.755C1608.84 418.349 1610.91 394.239 1611.07 371.655C1611.21 353.307 1611.71 334.01 1613.74 315.785C1617.5 281.904 1624.51 248.142 1612.79 214.99C1603.57 188.922 1590.1 163.422 1572.43 142.082C1553.55 119.284 1536 111.5 1503.81 104.106C1471.61 96.7116 1433.49 93.8216 1393 104.106C1373.21 109.132 1348 115.5 1330 125C1312 134.5 1295.44 137.058 1273.5 134.5C1208.33 120.836 1143.36 110.432 1077.93 98.1111C1034.91 90.0108 992.51 86.7159 948.93 84.5C914.487 82.7486 879.815 80.2598 845.819 74.2778C800.201 66.2505 755.478 51.5928 711.041 38.7778C620.149 12.5656 523.51 8.73626 429.708 1" stroke="#212034" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="Main">
                    <h1>Tell Us About Yourself</h1>

                    <div className="Question" id="age">
                    <p>D.O.B:</p>
                        <Dropdown options={options.months} onSelect={setMonth} currOption={month} />
                        <Dropdown options={options.days} onSelect={setDay} currOption={day} />
                        <Dropdown options={options.years} onSelect={setYear} currOption={year} />
                    </div>

                    <div className="Question" id="gender">
                        <p>Gender:</p>
                        <Dropdown options={options.genders} onSelect={setGender} currOption={gender} />
                    </div>

                    <div className="Question" id="race-ethnicity">
                        <p>Race/Ethnicity:</p>
                        <Dropdown options={options.raceAndEthnicities} currOption={raceAndEthnicity} onSelect={setRaceAndEthnicity} />
                    </div>

                    <div className="Question" id="c-region">
                        <div className="Question" id="country">
                            <p>Country:</p>
                            <CountryDropdown className = "country-dropdown" onChange={(val) => setCountry(val)} />
                        </div>
                        
                        <div className="Question" id="region">
                            <p>Region:</p>
                            <RegionDropdown className="region-dropdown" country={country} onChange={(val) => setRegion(val)} />
                        </div>
                    </div>

                    <div className="Question" id="hobbies">
                        <p>Hobbies:</p>
                        <Multiselect options={options.hobbies} onSelectOptions={setHobbies} />
                    </div>

                    <div className="Question" id="political-affiliation">
                        <p>Political Affiliation:</p>
                        <Dropdown options={options.politicalAffiliations} onSelect={setPoliticalAffiliation} currOption={politicalAffiliation} />
                    </div>
                    
                    <div className="Question" id="myers-briggs">
                        <p>Myers Briggs (if you&apos;ve taken it):</p>
                        <Dropdown options={options.myersBriggs} onSelect={setMyersBriggs} currOption={myersBriggs} />
                    </div>

                    <div className="Question" id="artistic-scale">
                        <p>Artistic Scale:</p>
                        <Dropdown options={options.artisticScale} onSelect={setArtisticScale} currOption={artisticScale} />
                    </div>

                    <div className="Question" id="introversion-scale">
                        <p>Introversion Scale:</p>
                        <Dropdown options={options.artisticScale} onSelect={setIntroversionScale} currOption={introversionScale} />
                    </div>

                    <div className="buttons">
                        <button className='finishSurvey' onClick = {handleBack}>Go Back</button>
                        <button className='finishSurvey' onClick = {handleSubmit}>Finish Survey</button>
                    </div>                        
                </div>
            </div>
        </div>
    );
}

Survey.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
}

export default Survey;