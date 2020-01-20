// @flow
import axios from "axios";
import * as jsCON from "xml-js";
import toXML from "../scenes/Mars/components/toXML";
import FormData from "form-data";
import convert from "xml-to-json-promise";
import { SESAR_LOGIN } from "../constants/api";

import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  CHANGE_MAP_FILE,
  CHANGE_SOURCE_FILE,
  INITIALIZE_SAMPLES,
  UPLOAD_FAILURE,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS
} from "./types";

// Authentication actions
export function signInAction({ username, password }, history) {
  return async (dispatch: any) => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      const res = await axios.post(`${SESAR_LOGIN}`, formData);

      //Format the api response to JSON to get the usercode data
      let options = { ignoreComment: true, alwaysChildren: true };
      let resJSON = await jsCON.xml2js(res.data, options);
      let usercode =
        resJSON.elements[0].elements[1].elements[0].elements[0].text;

      dispatch({
        type: AUTHENTICATED,
        username: username,
        usercode: usercode,
        password: password
      });

      history.push("/mars/mysamples");
    } catch (error) {
      console.log(error);
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: "Invalid email or password"
      });
    }
  };
}

export function signOutAction() {
  localStorage.clear();
  return {
    type: UNAUTHENTICATED
  };
}

//Mapping Actions
export function onChangeSourceFileAction(sourceFiles) {
  return {
    type: CHANGE_SOURCE_FILE,
    sourceFiles: sourceFiles
  };
}

export function onChangeMapFileAction(mapFile) {
  return {
    type: CHANGE_MAP_FILE,
    mapFile: mapFile
  };
}

//Upload Actions
export function initializeSamples(sampleArray) {
  return {
    type: INITIALIZE_SAMPLES,
    sampleArray: sampleArray
  };
}

export function uploadRequest() {
  return {
    type: UPLOAD_REQUEST
  };
}

// All samples uploaded correctly
export function uploadSuccess(results, selectedSamples) {
  return {
    type: UPLOAD_SUCCESS,
    results,
    selectedSamples
  };
}

// Not all samples uploaded correctly
export function uploadFailure(error) {
  return {
    type: UPLOAD_FAILURE,
    error
  };
}

export function upload(username, password, usercode, samples, selectedSamples) {
  return async dispatch => {
    try {
      //Start upload request
      dispatch(uploadRequest());

      let samplesToUpload = [];
      for (let i = 0; i < selectedSamples.length; i++) {
        let index = selectedSamples[i];
        samplesToUpload[i] = samples[index];
      }
      //convert samples to xml scheme
      let xmlSample = toXML(samplesToUpload, usercode);

      //TODO: Validate each sample
      //create form data to use in the POST request
      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append(
        "content",
        new XMLSerializer().serializeToString(xmlSample)
      );

      //POST request
      const res = await axios.post(
        "https://sesardev.geosamples.org/webservices/upload.php",
        formData
      );

      //convert the response data from xml to JSON
      convert.xmlDataToJSON(res.data, { explicitArray: true }).then(json => {
        dispatch(uploadSuccess(json.results.sample, selectedSamples));
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: UPLOAD_FAILURE, error });
    }
  };
}
