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
  UPLOAD_SUCCESS,
  FETCH_USER,
  FETCH_SAMPLES,
} from "./types";
import { actionTypes } from "redux-form";

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
        password: password,
      });

      history.push("/mars/mysamples");
    } catch (error) {
      console.log(error);
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: "Invalid email or password",
      });
    }
  };
}

export function signOutAction() {
  localStorage.clear();
  return {
    type: UNAUTHENTICATED,
  };
}

//Mapping Actions
export function onChangeSourceFileAction(sourceFiles) {
  return {
    type: CHANGE_SOURCE_FILE,
    sourceFiles: sourceFiles,
  };
}

export function onChangeMapFileAction(mapFile) {
  return {
    type: CHANGE_MAP_FILE,
    mapFile: mapFile,
  };
}

//Upload Actions
export function initializeSamples(sampleArray) {
  console.log(sampleArray);
  return {
    type: INITIALIZE_SAMPLES,
    sampleArray: sampleArray,
  };
}

export function uploadRequest() {
  return {
    type: UPLOAD_REQUEST,
  };
}

// All samples uploaded correctly
export function uploadSuccess(results, selectedSamples) {
  return {
    type: UPLOAD_SUCCESS,
    results,
    selectedSamples,
  };
}

// Not all samples uploaded correctly
export function uploadFailure(error) {
  return {
    type: UPLOAD_FAILURE,
    error,
  };
}

export function upload(username, password, usercode, samples, selectedSamples) {
  return async (dispatch) => {
    try {
      //Start upload request
      dispatch(uploadRequest());

      let samplesToUpload = [];
      for (let i = 0; i < selectedSamples.length; i++) {
        let index = selectedSamples[i];
        samplesToUpload[i] = samples[index];
      }

      let sampleNames = [];
      //for (let i = 0; i < selectedSamples)
      console.log(samplesToUpload[0]);

      for (var i = 0; i < samplesToUpload.length; i++) {
        for (var j = 0; j < samplesToUpload[i].length; j++) {
          if (
            samplesToUpload[i][j].key != undefined &&
            samplesToUpload[i][j].key == "name"
          ) {
            let name = samplesToUpload[i][j].value;
            sampleNames.push(name);
          }
        }
      }

      let alreadyUploadedSamples = [];
      for (var i = 0; i < sampleNames.length; i++) {
        let url = `https://sesardev.geosamples.org/samples/user_code/${usercode}?sample_name=${sampleNames[i]}`;

        try {
          const response = await axios.get(url);

          if (response.data.igsn_list.length != 0) {
            var removeIndex = samplesToUpload
              .map(function(item) {
                return item.name;
              })
              .indexOf(sampleNames[i]);

            samplesToUpload.splice(removeIndex, 1);
          }
        } catch (error) {
          console.log(error);
        }
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
      convert.xmlDataToJSON(res.data, { explicitArray: true }).then((json) => {
        dispatch(uploadSuccess(json.results.sample, selectedSamples));
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: UPLOAD_FAILURE, error });
    }
  };
}

export const fetchUsercodeAndSamples = (usercode) => async (
  dispatch,
  getState
) => {
  await dispatch(fetchUsercode(usercode));

  let igsn_list = getState().mars.igsnResponseList.igsn_list;

  igsn_list.forEach((element) => {
    dispatch(fetchSamples(element));
  });
};

export const fetchUsercode = (usercode) => async (dispatch) => {
  const response = await axios.get(
    `https://sesardev.geosamples.org/samples/user_code/${usercode}`
  );

  dispatch({ type: FETCH_USER, payload: response.data });
};

export const fetchSamples = (igsn) => async (dispatch) => {
  const response = await axios.get(
    `https://sesardev.geosamples.org/webservices/display.php?igsn=${igsn}`
  );

  dispatch({ type: FETCH_SAMPLES, payload: response });
};
