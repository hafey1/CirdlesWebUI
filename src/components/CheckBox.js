// @flow
import React, { Component } from 'react';
import { UID } from 'react-uid';

type Props = {
  label: String,
  checked: boolean,
  onChange: Function,
  style?: {}
}

export class CheckBox extends Component<Props> {

  render() {
    const { label, checked, onChange, style } = this.props;
    return (
      <UID>
        {id =>
          <div style={style}>
            <input 
              id={id}
              type="checkbox"
              checked={checked}
              onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
          </div>
        }
      </UID>
    );
  }
}
 