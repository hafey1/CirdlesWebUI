import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
//import { signOutAction } from "../../actions/mars";

// Components
import Header from "./components/Header";
import Landing from "./components/landing";
import SignIn from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/Dashboard"
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
            <div className="ink">
                <Header />
                <main>
                    <Route exact path="/squidink" component={Landing} />
                    <Route exact path="/squidink/login" component={SignIn} />
                    <Route exact path="/squidink/register" component={Register} />
                    <Route exact path="/squidink/dashboard" component={Dashboard} />
                </main>
            </div>
        );
    }
}


export default connect()(SquidInkPage);
