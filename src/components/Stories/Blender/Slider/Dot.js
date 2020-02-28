/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'

const Dot = ({
    domain: [min, max],
    handle: { id, value, percent },
    getHandleProps,
    color, 
  }) => {
    return (
      <Fragment>
        <div
          style={{
            left: `${percent}%`,
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            WebkitTapHighlightColor: 'rgba(0,0,0,0)',
            zIndex: 5,
            width: 12,
            height: 12,
            cursor: 'pointer',
            backgroundColor: 'none',
          }}
          {...getHandleProps(id)}
        />
        
        <div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          style={{
            left: `${percent}%`,
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            width: 20,
            height: 20,
          }}
        >
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="5" fill={color} stroke="white" strokeWidth="2"/>
            </svg>
        </div>
      </Fragment>
    )
  }
  
  export default Dot;