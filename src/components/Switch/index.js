/* eslint-disable react/prop-types */
import React from 'react';
import './style.scss';

const Switch = ({ id, isOn, handleToggle }) => {
  return (
    <div className="Switch-Wrapper">
       <input
        className="react-switch-checkbox"
        checked={isOn}
        onChange={handleToggle}
        id={id}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? '#E5277B' : '#212034', border: '2px solid #E5277B' }}
        className="react-switch-label"
        htmlFor={id}
      >
        <span className={`react-switch-button`} />
      </label>
    </div>
  );
};

export default Switch;