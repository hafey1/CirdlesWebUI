// @flow
import React, { Component } from 'react';
import { UID } from "react-uid";

type Props = {
  label: string,
  selected: boolean,
  group: string,
  onSelected: Function,
  style?: {}
}

export class RadioButton extends Component<Props> {
  render() { 
    const {
      label,
      selected,
      group,
      onSelected,
      style
    } = this.props;
    return (
      <UID name={id => `RadioButton_${id}`}>
        {id => 
          <div style={style}>
            <input
              id={id}
              type="radio"
              name={group}
              checked={selected}
              onChange={onSelected}
            />
            <label htmlFor={id}>{label}</label>
          </div>
        }
      </UID>
    );
  }
}
