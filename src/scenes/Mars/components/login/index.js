import { connect } from "react-redux";
import React, { Component } from "react";
import { signInAction } from "../../../../actions/mars";
import { Form, Field, reduxForm } from "redux-form";
import marsbackground from "img/marsBackground.jpg";
import "../../../../styles/mars.scss";
const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

class LogIn extends Component {
  //Send login info to redux actions

  submit = values => {
    console.log(this.props.history);
    this.props.signInAction(values, this.props.history);
  };

  errorMessage() {
    if (this.props.errorMessage) {
      return <div className="info-red">{this.props.errorMessage}</div>;
    }
  }

  renderPassword() {
    return (
      <div>
        <input />
        <input />
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div
        className="inoutform"
        style={{ backgroundImage: `url(${marsbackground})` }}
      >
        <div className="container">
          <h2>GeoPass Login</h2>
          <Form onSubmit={handleSubmit(this.submit)}>
            <Field
              name="username"
              component={renderField}
              type="text"
              placeholder="username"
            />
            <Field
              name="password"
              component={renderField}
              type="password"
              placeholder="password"
            />
            <button type="submit" className="btn btn-primary btn-md inbutton">
              Login
            </button>
          </Form>
          {this.errorMessage()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.mars.error };
}

const reduxFormSignIn = reduxForm({
  form: "signin"
})(LogIn);

export default connect(
  mapStateToProps,
  { signInAction }
)(reduxFormSignIn);
