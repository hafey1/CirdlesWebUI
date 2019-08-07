// @flow
import React, { Component } from "react";
import { Button } from "../../../../components";
import { colors } from "../../../../constants";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  extentsGroup: {
    margin: "0.5em 0"
  },
  extentsField: {
    width: "5em"
  }
};

type Props = {
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
      axisMin,
      axisMax
    } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.extentsGroup}>
          <input
            name="minValue"
            ref={this.minField}
            style={styles.extentsField}
            type="text"
            defaultValue={axisMin}
          />
          <span> to </span>
          <input
            name="maxValue"
            ref={this.maxField}
            style={styles.extentsField}
            type="text"
            defaultValue={axisMax}
          />
        </div>
        <Button 
          size={12}
          color={colors.topsoilDark}
          onClick={this.handleSetExtents}
        >Set Extents</Button>
      </div>
    );
  }
}

export default AxisExtents;
