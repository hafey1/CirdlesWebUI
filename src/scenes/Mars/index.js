import { connect } from "react-redux";
import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { signOutAction } from "../../actions/mars";
import HomePage from "./components/homepage";
//scenes
import LogIn from "./components/login";

import MySamples from "./components/mysamples";
import requireAuth from "./components/higherOrderComponents/require_auth";
import noRequireAuth from "./components/higherOrderComponents/no_require_auth";

//Containers
import Upload from "./components/upload";
import Mapping from "./components/mapping";

//CSS
//import "./index.css";

class MarsPage extends Component {
  navbarLinks() {
    //Return these links if the user is authenticated
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
              className="nav-link"
              onClick={() => this.props.signOutAction()}
            >
              Log Out
            </button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/mars/login">
              Log In
            </Link>
          </li>
        </ul>
      );
    }

    //Default links to show if the user is not authenticated
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/mars">
              MARS BETA
            </Link>
            <div>{this.navbarLinks()}</div>
          </nav>
        </header>
        <main>
          <Route exact path="/mars" component={noRequireAuth(HomePage)} />
          <Route exact path="/mars/login" component={noRequireAuth(LogIn)} />
          <Route
            exact
            path="/mars/mysamples"
            component={requireAuth(MySamples)}
          />

          <Route exact path="/mars/mapping" component={requireAuth(Mapping)} />
          <Route exact path="/mars/upload" component={requireAuth(Upload)} />
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.mars.authenticated,
    mapFile: state.mars.mapFile
  };
}

export default connect(
  mapStateToProps,
  { signOutAction }
)(MarsPage);
