import { connect } from "react-redux";
import React, { Component, useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { signOutAction } from "../../actions/mars";
import HomePage from "./components/homepage";
import SimpleMenu from "./components/simpleMenu";

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

//CSS
//import "./index.css";
/*function simpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}*/

class MarsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };

    //this.simpleMenu = this.simpleMenu.bind(this);
  }
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
              style={{
                background: "#f8f9fa",
                color: "#007bff",
                borderColor: "#f8f9fa"
              }}
              className="btn btn-primary btn-md nav-link"
              onClick={() => this.props.signOutAction()}
            >
              Log Out
            </button>
          </li>
          <li className="nav-item">
            <SimpleMenu />
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
              to="/mars/login"
            >
              Log In
            </Link>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <SimpleMenu />
            </div>
          </li>
        </ul>
      );
    }
    //Default links to show if the user is not authenticated
  }

  /**  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }; */

  /*simpleMenu() {
    const handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };

    return (
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }*/
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
