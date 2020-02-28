/* eslint-disable react/prop-types */
import React from 'react'
import { Slider, Rail, Handles } from 'react-compound-slider'
import SliderRail from './SliderRail';
import { USER_1, USER_2, MIX } from '../index';
import Knob from './Knob';
import Dot from './Dot';

const sliderStyle = {
  position: 'relative',
  width: '100%',
  touchAction: 'none',
}

const DOMAIN = [0, 100];

const CustomSlider = ({ leftLabel, rightLabel, setSwipeDisable, width, height, updateAttribute, val, dots, userSetting }) => {

  const onSlideStart = () => {
    setSwipeDisable(true);
  }

  const onSlideEnd = () => {
    setSwipeDisable(false);
  }

  const onChange = values => {
    updateAttribute(values[0])
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
        onChange={onChange}
        values={val}
      >
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              { dots && 
                <>
                  { dots.user1 && (userSetting == USER_1 || userSetting == MIX) &&
                    <Dot
                      key={'dot1'}
                      handle={{ id: 'dot1', value: dots.user1, percent: dots.user1 }}
                      domain={DOMAIN}
                      getHandleProps={getHandleProps}
                      color={'#E5277B'}
                    />
                  }
                  
                  { dots.user2 && (userSetting == USER_2 || userSetting == MIX) &&
                    <Dot
                      key={'dot2'}
                      handle={{ id: 'dot2', value: dots.user2, percent: dots.user2 }}
                      domain={DOMAIN}
                      getHandleProps={getHandleProps}
                      color={'#9BD6DC'}
                    />
                  }
                </>   
              }
               <Knob
                  key={handles[0].id}
                  handle={handles[0]}
                  domain={DOMAIN}
                  getHandleProps={getHandleProps}
                />
            </div>
          )}
        </Handles>
      </Slider>
    </div>
  )
}

export default CustomSlider;