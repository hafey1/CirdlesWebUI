import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOutAction } from "../../../actions/mars";
import NavModal from "./NavModal";
import "../../../styles/mars.scss";

class Header extends Component {
  //This function returns header links based on if the user is loged in or not
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/mars/mysamples">
              My Samples
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/mars/mapping">
              Mapping
            </Link>
          </li>

          <li className="nav-item">
            <button
              type="button"
              style={{
                background: "#f8f9fa",
                color: "#007bff",
                borderColor: "#f8f9fa",
              }}
              className="btn btn-primary btn-md nav-link"
              onClick={() => this.props.signOutAction()}
            >
              Sign Out
            </button>
          </li>
          <li className="nav-item">
            <NavModal />
          </li>
          <li className="nav-item">
            <a
              style={{ marginTop: "1px" }}
              className="nav-link"
              href="http://cirdles.org/projects/mars/"
              target="_blank"
            >
              Help
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="nav">
          <li className="nav-item">
            <Link
              style={{ marginTop: ".5rem" }}
              className="nav-link"
              to="/squidink/login"
            >
              Sign In
            </Link>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <NavModal />
            </div>
          </li>
          <li className="nav-item">
            <a
              style={{ marginTop: "8.5px" }}
              className="nav-link"
              href="http://cirdles.org/projects/mars/"
              target="_blank"
            >
              Help
            </a>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <header>
        <nav className="navbar top-nav fixed-top navbar-light bg-light">
          <Link className="navbar-brand" to="/mars">
            SQUIDINK BETA
          </Link>
          <div>{this.renderLinks()}</div>
        </nav>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.mars.authenticated };
}

export default connect(
  mapStateToProps,
  { signOutAction }
)(Header);
