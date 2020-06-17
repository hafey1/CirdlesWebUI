import React, { Component } from "react";
import { reduxForm, Field, Form } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { signInAction } from "../../../../actions/mars";
import marsbackground from "img/marsBackground.jpg";
import "../../../../styles/mars.scss";
import Button from "@material-ui/core/Button";

class LogIn extends Component {
  onSubmit = (formProps) => {
    this.props.signInAction(formProps, () => {
      this.props.history.push("/mars/mysamples");
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div
        style={{
          backgroundImage: `url(${marsbackground})`,
          height: "100%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          alignItems: "center",
          color: "white",
        }}
      >
        <Form
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            alignItems: "center",
          }}
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <h2>GeoPass Login</h2>
          <fieldset>
            <label style={{ fontWeight: "bold" }}>Username</label>
            <br></br>
            <Field
              name="username"
              type="text"
              component="input"
              autoComplete="none"
            />
          </fieldset>
          <br></br>
          <fieldset>
            <label style={{ fontWeight: "bold" }}>Password</label>
            <br></br>
            <Field
              name="password"
              type="password"
              component="input"
              autoComplete="none"
            />
          </fieldset>
          <div>{this.props.errorMessage}</div>
          <br></br>
          <button className="btn btn-primary">Log In</button>
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
)(LogIn);
