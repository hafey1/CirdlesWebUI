import React, { Component } from "react";
import { reduxForm, Field, Form } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { signInAction } from "../../../../actions/mars";
import marsbackground from "img/marsBackground.jpg";
import "../../../../styles/mars.scss";

class LogIn extends Component {
  onSubmit = (formProps) => {
    this.props.signInAction(formProps, () => {
      this.props.history.push("/mars/mysamples");
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Username</label>
          <Field
            name="username"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button>Log In!</button>
      </Form>
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
)(LogIn);
