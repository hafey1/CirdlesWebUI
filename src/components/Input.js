// @flow
import React, { Component } from "react";
import { UID } from "react-uid";

type Props = {
  label: string,
  type?: string,
  value: string,
  onChange: Function,
  style?: {}
};

export class Input extends Component<Props> {
  render() {
    const { label, type, value, onChange, style } = this.props;

    return (
      <UID name={id => `Input_${id}`}>
        {id =>
          <div style={style}>
            <label htmlFor={id}>{label}: </label>
            <input
              id={id}
              type={type || "text"}
              value={value}
              onChange={onChange}
            />
          </div>
        }
      </UID>
    );
  }
}
