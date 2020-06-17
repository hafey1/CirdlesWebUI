import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/*This component redirects the user to signIn
  if they are not authenticated*/
export default function(ComposedComponent) {
  class Authentication extends Component {
    componentDidMount() {
      this.sendToLogIn();
    }

    componentDidUpdate() {
      this.sendToLogIn();
    }

    sendToLogIn() {
      if (!this.props.authenticated) {
        this.props.history.push("/mars/login");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authentication.PropTypes = {
    router: PropTypes.object,
  };

  function mapStateToProps(state) {
    return { authenticated: state.mars.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
