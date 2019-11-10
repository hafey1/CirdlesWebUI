import React, { Component } from "react";
import { connect } from "react-redux";
import { signOutAction } from "../../../../actions/mars";
import marsbackground from "img/marsBackground.jpg";
import "../../../../styles/mars.scss";
//TODO: Fix CSS
class LogOut extends Component {
  signOut() {
    this.props.signOutAction();
  }

  render() {
    return (
      <div
        className="inoutform"
        style={{ backgroundImage: `url(${marsbackground})` }}
      >
        <button
          className="btn btn-danger btn-lg outbutton"
          onClick={() => this.signOut()}
        >
          Log Out
        </button>
      </div>
    );
  }
}
export default connect(
  null,
  { signOutAction }
)(LogOut);
