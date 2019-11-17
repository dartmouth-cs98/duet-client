import _ from 'lodash';

export const months = [
    {key: 1, label: 'january'},
    {key: 2, label: 'february'},
    {key: 3, label: 'march'},
    {key: 4, label: 'april'},
    {key: 5, label: 'may'},
    {key: 6, label: 'june'},
    {key: 7, label: 'july'},
    {key: 8, label: 'august'},
    {key: 9, label: 'september'},
    {key: 10, label: 'october'},
    {key: 11, label: 'november'},
    {key: 12, label: 'december'},
];

export const days =  _.map([...Array(31).keys()], (n) => { return { key: n, label: n } });

export const years = _.map([...Array(100).keys()], (n) => { return { key: n + 1950, label: n + 1950 } });

export const genders = [
    {key: 'Male', label: 'male'},
    {key: 'Female', label: 'female'},
    {key: 'other', label: 'other'},
];

export const raceAndEthnicities = [
    {key: 'white', label: 'white'},
    {key: 'black or african american', label: 'black or african american'},
    {key: 'american indian or alaskan native', label: 'american indian or alaskan native'},
    {key: 'asian', label: 'asian'},
    {key: 'native hawaiian or pacific islander', label: 'native hawaiian or pacific islander'},
    {key: 'hispanic or latino', label: 'hispanic or latino'},
    {key: 'two or more', label: 'two or more'},
    {key: 'other', label: 'other'},
];

export const hobbies = [{name: 'writing',value: 'writing'},{name: 'reading',value: 'reading'},{name: 'soccer',value: 'soccer'},{name: 'baseball',value: 'baseball'},
    {name: 'basketball',value: 'basketball'}, {name: 'bowling',value: 'bowling'}, {name: 'boxing',value: 'boxing'},{name: 'cricket',value: 'cricket'}, {name: 'football',value: 'football'},
    {name: 'cycling',value: 'cycling'},{name: 'darts',value: 'darts'},{name: 'eSports',value: 'eSports'}, {name: 'golf',value: 'golf'}, {name: 'horse racing',value: 'horse racing'},
    {name: 'ice hockey',value: 'ice hockey'},{name: 'lacrosse',value: 'lacrosse'},{name: 'rugby',value: 'rugby'}, {name: 'handball',value: 'handball'},{name: 'tennis',value: 'tennis'},
    {name: 'bull riding',value: 'bull riding'}, {name: 'running',value: 'running'},{name: 'swimming',value: 'swimming'},
    {name: 'frisbee',value: 'frisbee'},{name: 'singing',value: 'singing'},{name: 'dancing',value: 'dancing'}, {name: 'guitar',value: 'guitar'},{name: 'cello',value: 'cello'},
    {name: 'clarinet',value: 'clarinet'}, {name: 'drum',value: 'drum'}, {name: 'flute',value: 'flute'}, {name: 'harp',value: 'harp'},
    {name: 'piano',value: 'piano'}, {name: 'saxophone',value: 'synthesizer'}, {name: 'tambourine',value: 'tambourine'}, {name: 'ukulele',value: 'ukulele'}, 
    {name: 'viola',value: 'viola'},{name: 'violin',value: 'violin'},{name: 'xylophone',value: 'xylophone'},
    {name: 'art',value: 'art'},{name: 'video games',value: 'video games'},{name: 'coding',value: 'coding'},
    {name: 'photography',value: 'photography'},{name: 'cooking',value: 'cooking'},{name: 'hiking',value: 'hiking'},{name: 'biking',value: 'biking'},
    {name: 'television',value: 'television'},{name: 'travelling',value: 'travelling'}];

export const myersBriggs = [
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

export const politicalAffiliations = [
    {key: 'conservative', label: 'conservative'},
    {key: 'liberal', label: 'liberal'},
    {key: 'other', label: 'other'},
];

export const artisticScale = [{key: '1', label: 1},{key: '2', label: 2},{key: '3', label: 3},{key: '4', label: 4},{key: '5', label: 5},{key: '6', label: 6},
{key: '7', label: 7},{key: '8', label: 8},{key: '9', label: 9},{key: '10', label: 10}
];

export const introversionScale = [{key: '1', label: 1},{key: '2', label: 2},{key: '3', label: 3},{key: '4', label: 4},{key: '5', label: 5},{key: '6', label: 6},
{key: '7', label: 7},{key: '8', label: 8},{key: '9', label: 9},{key: '10', label: 10}
];