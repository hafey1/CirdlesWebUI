import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
//import { signOutAction } from "../../actions/mars";

// Components
import Header from "./components/Header";
import Landing from "./components/landing";
import SignIn from "./components/login";
import Register from "./components/register"
//import SignIn from "./components/SignIn";
//import MySamples from "./components/MySamples";
//import Mapping from "./components/mapping";
//import Upload from "./components/upload";
//import requireAuth from "./components/authentication/require_auth";

//Might not need norequireAuth
//import noRequireAuth from "./components/authentication/no_require_auth";

class SquidInkPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <main>
                    <Route exact path="/squidink" component={Landing} />
                    <Route exact path="/squidink/login" component={SignIn} />
                    <Route exact path="/squidink/register" component={Register} />
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
    mapStateToProps
)(SquidInkPage);
