// @flow
import React, { Component } from 'react';
import { UID } from 'react-uid';

type Props = {
  style?: {},
  sliderWidth?: string,
  label: string,
  min: number,
  max: number,
  value: number,
  step?: number,
  onChange: Function
}

class RangeSlider extends Component<Props> {

  render() { 
    const { style, sliderWidth, label, min, max, value, step, onChange } = this.props;

    return (
      <UID name={id => `RangeSlider_${id}`}>
        {id =>
          <div style={style}>
            <label htmlFor={id}>{label}: </label>
            <input
              id={id}
              style={{ width: sliderWidth }}
              type="range"
              min={min}
              max={max}
              value={value}
              step={step || 1}
              onChange={onChange}
            />
          </div>
        }
      </UID>
    );
  }

}
 
export default RangeSlider;