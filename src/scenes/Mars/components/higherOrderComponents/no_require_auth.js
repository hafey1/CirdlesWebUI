import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/*This component redirects the user to Upload
  if they are authenticated*/
export default function(ComposedComponent) {
  class NotAuthentication extends Component {
    componentDidMount() {
      this.sendToSamples();
    }

    componentDidUpdate() {
      this.sendToSamples();
    }

    sendToSamples() {
      if (this.props.authenticated) {
        this.props.history.push("/mars/mysamples");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  NotAuthentication.PropTypes = {
    router: PropTypes.object,
  };

  function mapStateToProps(state) {
    return { authenticated: state.mars.authenticated };
  }

  return connect(mapStateToProps)(NotAuthentication);
}
