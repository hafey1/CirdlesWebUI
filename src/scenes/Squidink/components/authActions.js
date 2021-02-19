import axios from "axios";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';



import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

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
export const startUp = (userName) => dispatch => {
    axios
        .post("http://localhost:8080/Services/squidinkstartup", userName)
        .then(res => openPage(res.data))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
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
        })
        //Invoke Container Startup and open endpoint
        .then(startUp(userData.email))
};
//@TODO Change input to Base_URL
export const openPage = (port) => {
    setTimeout(function () { window.open("http://192.168.99.100:" + port + "/squid_servlet/") }, 1000);
}
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



