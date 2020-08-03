import React, { Component } from "react";
import { reduxForm, Field, Form } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { signInAction } from "../../../actions";
import "../../../styles/mars.scss";

//This component allows the user to sign into MARS
class SignIn extends Component {
  //This function dispatches the signInAction() function to allow the user to sign in
  onSubmit = (formProps) => {
    this.props.signInAction(formProps, () => {
      this.props.history.push("/mars/mysamples");
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signin">
        <Form className="signin-form" onSubmit={handleSubmit(this.onSubmit)}>
          <h2>GeoPass Sign In</h2>
          <fieldset>
            <label className="signin-label">Username</label>
            <br></br>
            <Field
              className="signin-input"
              name="username"
              type="text"
              component="input"
              autoComplete="none"
            />
          </fieldset>
          <br></br>
          <fieldset>
            <label className="signin-label">Password</label>
            <br></br>
            <Field
              className="signin-input"
              name="password"
              type="password"
              component="input"
              autoComplete="none"
            />
          </fieldset>
          <div>{this.props.errorMessage}</div>
          <br></br>
          <button className="btn btn-primary signin-button">Sign In</button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.mars.error };
}

export default compose(
  connect(
    mapStateToProps,
    { signInAction }
  ),
  reduxForm({ form: "signin" })
)(SignIn);
