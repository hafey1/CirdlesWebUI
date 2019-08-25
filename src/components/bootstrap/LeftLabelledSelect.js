import React, { Component } from 'react';

type Props = {
  id?: string,
  label: string,
  children?: [],
  value?: string,
  onChange?: Function
}

class LeftLabelledSelect extends Component {
  render() { 
    const { id, label, children: options, ...rest } = this.props;
    return (
      <div className="form-group d-flex flex-row align-items-center mb-1">
        <label htmlFor={id} className="my-auto mr-1">{label}</label>
        <div className="d-inline-block">
          <select
            className="form-control"
            id={id}
            {...rest}
          >
            {options}
          </select>
        </div>
      </div>
    );
  }
}
 
export default LeftLabelledSelect;