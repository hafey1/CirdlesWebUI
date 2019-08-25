import React, { Component } from "react";

type Props = {
  id?: string,
  label: string,
  group: string,
  checked: boolean,
  onChecked: Function
};

class RadioButton extends Component {
  render() {

    const { id, label, group, checked, onChecked } = this.props;

    return (
      <div className="custom-control custom-radio">
        <input
          id={id}
          type="radio"
          name={group}
          className="custom-control-input"
          checked={checked}
          onChange={onChecked}
        />
        <label className="custom-control-label" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }
}

export default RadioButton;
