import { connect } from "react-redux";
import React, { Component, useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { signOutAction } from "../../actions/mars";
import HomePage from "./components/homepage";
import SimpleMenu from "./components/simpleMenu";
import Header from "./components/header";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
//scenes
import LogIn from "./components/login";

import MySamples from "./components/mysamples";
import requireAuth from "./components/higherOrderComponents/require_auth";
import noRequireAuth from "./components/higherOrderComponents/no_require_auth";

//Containers
import Upload from "./components/upload";
import Mapping from "./components/mapping";
import { NativeSelect } from "@material-ui/core";

class MarsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <Route exact path="/mars" component={HomePage} />
          <Route exact path="/mars/login" component={LogIn} />
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
    mapFile: state.mars.mapFile,
  };
}

export default connect(
  mapStateToProps,
  { signOutAction }
)(MarsPage);
