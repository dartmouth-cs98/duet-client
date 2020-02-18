/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Slider, Rail, Handles } from 'react-compound-slider'
import SliderRail from './SliderRail';
import Handle from './Handle';

const sliderStyle = {
  position: 'relative',
  width: '100%',
  touchAction: 'none',
}

const DOMAIN = [0, 100]

const CustomSlider = ({ leftLabel, rightLabel, setSwipeDisable, width, height, updateAttribute, defaultVal }) => {

  const [values, setValues] = useState(defaultVal.slice());

  const onSlideStart = () => {
    setSwipeDisable(true);
  }

  const onSlideEnd = () => {
    setSwipeDisable(false);
  }

  const onUpdate = update => {
    updateAttribute(update);
  }

  const onChange = values => {
    setValues(values);
  }

  return (
    <div style={{ height, width }}>
      <div className="Blender-Slider-Labels">
        <h1>{leftLabel}</h1>
        <h1>{rightLabel}</h1>
      </div>
      <Slider
        mode={1}
        step={1}
        domain={DOMAIN}
        rootStyle={sliderStyle}
        onSlideEnd={onSlideEnd}
        onSlideStart={onSlideStart}
        onUpdate={onUpdate}
        onChange={onChange}
        values={values}
      >
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={DOMAIN}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
      </Slider>
    </div>
  )
}

export default CustomSlider;