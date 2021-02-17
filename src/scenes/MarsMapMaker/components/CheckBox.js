///////////////////////////////////////////////////////////////////////////////////////
// CHECKBOX.JS ///////////////////////////////////////////////////////////////////////
// This component displays  a checkbox on the left of each fieldCard ////////////////
// Giving the user to decide if they want to use that fieldCard in the map or not //
///////////////////////////////////////////////////////////////////////////////////

import React, { Component } from "react";
import { connect } from "react-redux";
import { greenFlip } from "../../../actions/marsMapMaker";
import "../../../styles/marsMapMaker.scss";

/////////////////////////////////////////////////
////////////////////////////////////////////////

class CheckboxExample extends Component {
  // function that goes back to the fieldCard and changes the color of the fieldCard (previously the cards were green, hints the name)
  handleChange = () => {
    let obj = {
      id: this.props.id
    };
    this.props.greenFlip(obj);
  };

  render() {
    return (
      <div onClick={this.handleChange} className="inner--checkbox">
        <input
          type="radio"
          onChange={() => {}}
          checked={this.props.ent[this.props.id].isGreen}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ent: state.marsMapMaker.entries
  };
};

export default connect(
  mapStateToProps,
  { greenFlip }
)(CheckboxExample);
