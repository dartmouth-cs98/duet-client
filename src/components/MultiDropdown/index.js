import React from 'react';
import { Dropdown } from 'semantic-ui-react';


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


const MultiSelectDropdown = ({}) => {
    return (
  <Dropdown placeholder='select hobbies...' fluid multiple selection options={hobbies} />
    );
}
    
export default MultiSelectDropdown;
