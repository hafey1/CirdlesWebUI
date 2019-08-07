// @flow
import React, { Component } from 'react';
import { UID } from 'react-uid';
import { Button } from 'components';
import { colors } from 'constants';

type Props = {
  label: string,
  defaultValue: number,
  onSetValue: Function,
  style?: {}
}

class Lambda extends Component<Props> {

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
    const { label, defaultValue, style } = this.props;
    return (
      <UID name={id => `Lambda_${id}`}>
        {id => 
          <div style={style}>
            <label htmlFor={id}>{label}:</label>
            <input
              ref={this.field}
              id={id}
              type="text"
              defaultValue={defaultValue}
              style={{ margin: "0 0.5em", width: "10em" }}
            />
            <Button
              size={12}
              color={colors.topsoilDark}
              onClick={this.handleSetValue}
            >
              Set
            </Button>
          </div>
        }
      </UID>
    );
  }
}
 
export default Lambda;