// @flow
import React, { Component } from "react";

const styles = {
  extentsField: {
    width: "6em"
  }
};

type Props = {
  axis: "x" | "y",
  axisMin: number,
  axisMax: number,
  onSetExtents: Function
};

class AxisExtents extends Component<Props> {
  constructor(props) {
    super(props);

    this.minField = React.createRef();
    this.maxField = React.createRef();

    this.handleSetExtents = this.handleSetExtents.bind(this);
  }

  componentDidUpdate() {
    // Set the value in the fields if the plot is panned/zoomed
    this.minField.current.value = this.minField.current.defaultValue;
    this.maxField.current.value = this.maxField.current.defaultValue;
  }

  handleSetExtents() {
    this.props.onSetExtents(
      +this.minField.current.value,
      +this.maxField.current.value
    );
  }

  render() {
    const {
      axis,
      axisMin,
      axisMax
    } = this.props;

    return (
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-row justify-content-center my-2">
          <input
            ref={this.minField}
            id={`${axis}AxisMinInput`}
            type="text"
            className="form-control d-inline-block"
            style={styles.extentsField}
            defaultValue={axisMin.toFixed(4)}
          />
          <span className="mx-1 my-auto">to</span>
          <input
            ref={this.maxField}
            id={`${axis}AxisMaxInput`}
            type="text"
            className="form-control d-inline-block"
            style={styles.extentsField}
            defaultValue={axisMax.toFixed(4)}
          />
        </div>

        <button 
          className="btn btn-sm btn-outline-topsoil rounded-pill mx-auto"
          onClick={this.handleSetExtents}
        >
          Set Extents
        </button>
      </div>
    );
  }
}

export default AxisExtents;
