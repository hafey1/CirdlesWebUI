// @flow
import React, { Component } from 'react';

type Props = {
  isActive: boolean,
  label: string,
  onClick: Function
}

export class Tab extends Component<Props> {
  
  render() {
    const { label, onClick, isActive } = this.props;

    let className = "tab-label";
    if (isActive) {
      className += " active";
    }

    return (
      <li className={className} onClick={onClick}>
        {label}
      </li>
    );
  }
}
