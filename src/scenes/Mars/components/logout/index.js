import React, { Component } from "react";
import { connect } from "react-redux";
import { signOutAction } from "../../../../actions/mars";

//TODO: Fix CSS
class LogOut extends Component {
  signOut() {
    this.props.signOutAction();
  }

  render() {
    return (
      <div className="signout">
        <button
          className="btn btn-danger btn-lg logout"
          onClick={() => this.signOut()}
        >
          Sign Out
        </button>
      </div>
    );
  }
}
export default connect(
  null,
  { signOutAction }
)(LogOut);
