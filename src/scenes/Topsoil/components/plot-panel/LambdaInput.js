// @flow
import React, { Component } from 'react';
import { LeftLabelledInput } from 'components/bootstrap';

type Props = {
  id?: string,
  label: string,
  defaultValue: number,
  onSetValue: Function,
}

class LambdaInput extends Component<Props> {

  constructor(props) {
    super(props);

    this.field = React.createRef();

    this.handleSetValue = this.handleSetValue.bind(this);
  }

  componentDidUpdate() {
    // Set the value of the field if the lambda value is changed elsewhere
    this.field.current.value = this.field.current.defaultValue;
  }

  handleSetValue() {
    this.props.onSetValue(+this.field.current.value);
  }

  render() { 
    const { id, label, defaultValue } = this.props;
    return (
      <div className="d-flex flex-row align-items-center">
        <LeftLabelledInput
          ref={this.field}
          id={id}
          label={label}
          type="text"
          defaultValue={defaultValue}
        />
        <button 
          className="btn btn-sm btn-outline-topsoil rounded-pill ml-1 mb-1"
          onClick={this.handleSetValue}
        >
          Set
        </button>
      </div>
    );
  }
}
 
export default LambdaInput;