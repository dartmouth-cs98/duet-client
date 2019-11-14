import React from 'react';
import { Dropdown } from 'semantic-ui-react';




const MultiSelectDropdown = ({options}) => {
    return (
  <Dropdown placeholder='hobbies' fluid multiple selection options={options} />
    );
}
    
export default MultiSelectDropdown;
