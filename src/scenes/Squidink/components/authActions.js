import axios from "axios";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';
var exec = require('child_process').exec;

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

let config = {
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
    }
}

// startup container 
export const startContainer = (history) => dispatch => {

    axios.post('http://localhost:8080/Services/squidinkstartup', config)
        .then(function (response) {
            console.log(response);
        })

}

// Register User
export const registerUser = (newUser, history) => dispatch => {
    axios
        .post("http://localhost:8080/Services/squidinkregister", newUser)
        .then(res => history.push("/squidink/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const sendRequest = (newUser, history) => dispatch => {
    axios
        .post("http://localhost:8080/Services/squidinktester", newUser)
        .then(res => console.log("done: " + JSON.stringify(res.data)))

};
// Login - get user token
export const loginUser = (userData, history) => dispatch => {
    axios
        .post("http://localhost:8080/Services/squidinklogin", userData)
        .then(res => {
            console.log(res.data)
            // Set token to localStorage
            localStorage.setItem("jwtToken", res.data);
            // Set token to Auth header
            setAuthToken(res.data);
            // Set current user to decoded token
            dispatch(setCurrentUser(jwt_decode(res.data)));
        }).then(push => history.push("/squidink/dashboard"))
    { /*
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
   */ }
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};


const LinkButton = (props) => {
    const {
        history,
        location,
        match,
        staticContext,
        to,
        onClick,
        // ⬆ filtering out props that `button` doesn’t know what to do with.
        ...rest
    } = props
    return (
        <button
            {...rest} // `children` is just another prop!
            onClick={(event) => {
                onClick && onClick(event)
                history.push(to)
            }}
        />
    )
}

LinkButton.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default withRouter(LinkButton)



