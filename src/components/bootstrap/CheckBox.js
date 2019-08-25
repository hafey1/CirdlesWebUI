import React, { Component } from 'react';

type Props = {
  id?: string,
  label: string,
  checked: boolean,
  onChange: Function
}

class CheckBox extends Component {
  render() { 
    const { id, label, ...rest } = this.props;
    return (
      <div className="custom-control custom-checkbox">
        <input 
          id={id} 
          className="custom-control-input" 
          type="checkbox" 
          {...rest}
        />
        <label className="custom-control-label" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }
}
 
export default CheckBox;