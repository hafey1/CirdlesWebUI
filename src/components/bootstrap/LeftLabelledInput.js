import React, { Component } from 'react';

const styles = {
  color: {
    width: "2.4em",
    padding: "0.2em"
  }
}

type Props = {
  id?: string,
  label: string,
  type: string,
  defaultValue?: string,
  value?: string,
  checked?: boolean,
  onChange?: Function
}

const LeftLabelledInput = React.forwardRef((props, ref) => {
  const { id, label, type, ...rest } = props;
    return (
      <div className="form-group d-flex flex-row align-items-center mb-1">
        <label htmlFor={id} className="my-auto mr-1">{label}</label>
        <div className="d-inline-block">
          <input
            ref={ref}
            className="form-control"
            id={id}
            type={type}
            style={styles[type]}
            {...rest}
          />
        </div>
      </div>
    );
});
 
export default LeftLabelledInput;