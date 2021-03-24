import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { signOutAction } from "../../actions/mars";

// Components
import Header from "./components/Header";
import Landing from "./components/Landing";
import SignIn from "./components/SignIn";
import MySamples from "./components/MySamples";
import Mapping from "./components/mapping";
import Upload from "./components/upload";
import requireAuth from "./components/authentication/require_auth";

//Might not need norequireAuth
//import noRequireAuth from "./components/authentication/no_require_auth";

class MarsPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          <Route exact path="/mars" component={Landing} />
          <Route exact path="/mars/signin" component={SignIn} />
          <Route exact path="/mars/mysamples" component={requireAuth(MySamples)}/>
          <Route exact path="/mars/mapping" component={requireAuth(Mapping)} />
        </main>
        <Route exact path="/mars/upload" component={requireAuth(Upload)} />
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
