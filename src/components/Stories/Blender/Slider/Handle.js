/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'

const Handle = ({
    domain: [min, max],
    handle: { id, value, percent },
    getHandleProps,
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
            width: 75,
            height: 40,
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
            width: 75,
            height: 40,
          }}
        >
          <svg width="74" height="38" viewBox="0 0 74 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="72" height="36" rx="2" fill="#212034" stroke="#E5277B" strokeWidth="2"/>
          <rect x="12" y="6.14288" width="50" height="25.7143" rx="2" fill="#212034" stroke="#E5277B" strokeWidth="2"/>
          <path d="M12 6.14285L1.5 2.02856V35.9714L12 31.8571V6.14285Z" stroke="#E5277B" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M62 31.8571L72.5 35.9714L72.5 2.02858L62 6.14287L62 31.8571Z" stroke="#E5277B" strokeWidth="2" strokeLinejoin="round"/>
          <line x1="37" y1="6.14288" x2="37" y2="30.8286" stroke="#E5277B" strokeWidth="2"/>
          </svg>
        </div>
      </Fragment>
    )
  }
  
  export default Handle;