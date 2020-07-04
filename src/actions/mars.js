// @flow
import axios from "axios";
import * as jsCON from "xml-js";
import toXML from "../scenes/Mars/components/toXML";
import FormData from "form-data";
import convert from "xml-to-json-promise";
import { SESAR_LOGIN } from "../constants/api";
import _, { sample } from "lodash";
import { csvParse } from "d3-dsv";

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
  FETCH_SAMPLES_SUCCESS,
} from "./types";
import { actionTypes } from "redux-form";

// ==============================================================================
// SIGN IN AND SIGNOUT ACTIONS
// ==============================================================================
export const signInAction = (formProps, callback) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("username", formProps.username);
    formData.append("password", formProps.password);
    const response = await axios.post(
      "https://sesardev.geosamples.org/webservices/credentials_service_v2.php",
      formData
    );
    let options = { ignoreComment: true, alwaysChildren: true };
    let resJSON = await jsCON.xml2js(response.data, options);
    let usercode = resJSON.elements[0].elements[1].elements[0].elements[0].text;
    dispatch({
      type: AUTHENTICATED,
      username: formProps.username,
      usercode: usercode,
      password: formProps.password,
    });
    callback();
  } catch (e) {
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: "Invalid email or password",
    });
  }
};

export function signOutAction() {
  localStorage.clear();
  return {
    type: UNAUTHENTICATED,
  };
}

// ==============================================================================
// MAPPING ACTIONS
// ==============================================================================
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
export const initializeSamples = (sampleArray) => async (dispatch) => {
  var seasarKeys = new Set();
  var originalValues = [];
  var originalKeys = [];
  var uploadSamples = sampleArray;

  for (let i = 0; i < uploadSamples.length; i++) {
    for (let j = 0; j < uploadSamples[i].length; j++) {
      let sampleData = uploadSamples[i];
      let dataRow = uploadSamples[i][j];
      if (dataRow.key !== undefined) {
        seasarKeys.add(dataRow.key);
      }
      originalKeys = [
        ...new Set(
          sampleData.map((data) => {
            return data.originalKey;
          })
        ),
      ];
    }
  }
  seasarKeys = [...seasarKeys];

  for (let i = 0; i < uploadSamples.length; i++) {
    var keyValue = {};
    for (let j = 0; j < originalKeys.length; j++) {
      var keyData = originalKeys[j];
      var data = uploadSamples[i]
        .filter((x) => {
          return x.originalKey === originalKeys[j];
        })
        .map((x) => {
          return x.originalValue;
        });
      keyValue[keyData] = data[0];
    }
    originalValues = [...originalValues, keyValue];
  }

  await dispatch({
    type: INITIALIZE_SAMPLES,
    sampleArray: sampleArray,
    originalKeys: originalKeys,
    originalValues: originalValues,
    seasarKeys: seasarKeys,
  });
};

// ==============================================================================
// UPLOAD ACTIONS
// ==============================================================================
export function uploadRequest() {
  return {
    type: UPLOAD_REQUEST,
  };
}

// All samples uploaded correctly
export const uploadSuccess = (results, selectedSamples) => async (
  dispatch,
  getState
) => {
  let samples = getState().mars.samples;

  for (let i = 0; i < results.length; i++) {
    let index = selectedSamples[i];

    /*IGSN for each sample
    for each sample, the sample is equal to its
    previous version with IGSN added to the end*/

    samples[index][0] = {
      ...samples[index][0],
      originalValue: results[i].igsn[0],
      value: results[i].igsn[0],
    };
  }

  var seasarKeys = new Set();
  var originalValues = [];
  var originalKeys = [];

  for (let i = 0; i < samples.length; i++) {
    for (let j = 0; j < samples[i].length; j++) {
      let sampleData = samples[i];
      let row = samples[i][j];
      if (row.key !== undefined) {
        seasarKeys.add(row.key);
      }
      originalKeys = [
        ...new Set(
          sampleData.map((item) => {
            return item.originalKey;
          })
        ),
      ];
    }
  }

  for (let i = 0; i < samples.length; i++) {
    var keyValue = {};
    for (let j = 0; j < originalKeys.length; j++) {
      var keyData = originalKeys[j];
      var data = samples[i]
        .filter((x) => {
          return x.originalKey === originalKeys[j];
        })
        .map((x) => {
          return x.originalValue;
        });
      keyValue[keyData] = data[0];
    }
    originalValues = [...originalValues, keyValue];
  }

  //await dispatch(initializeSamples(samples));
  dispatch({
    type: UPLOAD_SUCCESS,
    results,
    selectedSamples,
    samples,
    originalKeys,
    originalValues,
  });
};

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
      for (let i = 0; i < samplesToUpload.length; i++) {
        for (let j = 0; j < samplesToUpload[i].length; j++) {
          if (samplesToUpload[i][j].key == "name") {
            sampleNames[i] = samplesToUpload[i][j].value;
          }
        }
      }

      let duplicateSamples = [];
      let filteredSamples = [];
      let filteredIndex = [];
      for (let i = 0; i < samplesToUpload.length; i++) {
        let sampleToCheck = sampleNames[i];

        try {
          const response = await axios.get(
            `https://sesardev.geosamples.org/samples/user_code/${usercode}?sample_name=${sampleToCheck}`
          );
          if (response.data.total_counts == 0) {
            filteredSamples.push(samplesToUpload[i]);
            filteredIndex.push(selectedSamples[i]);
          } else {
            duplicateSamples.push(sampleToCheck);
          }
        } catch (err) {
          console.log("Error Response: ");
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          if (err.response.status == 404) {
            filteredSamples.push(samplesToUpload[i]);
            filteredIndex.push(selectedSamples[i]);
          }
        }
      }

      if (duplicateSamples.length !== 0) {
        alert(
          `The following sample(s) have the SAME NAME as samples already registered to your usercode and WILL NOT be uploaded: \n ${duplicateSamples}`
        );
      }

      if (filteredIndex.length === 0) {
        dispatch({ type: UPLOAD_FAILURE, error });
      }

      //convert samples to xml scheme
      let xmlSample = toXML(filteredSamples, usercode);
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
        dispatch(uploadSuccess(json.results.sample, filteredIndex));
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: UPLOAD_FAILURE, error });
    }
  };
}

// ==============================================================================
// MYSAMPLES ACTIONS
// ==============================================================================
export const fetchUsercodeAndSamples = (usercode) => async (
  dispatch,
  getState
) => {
  await dispatch(fetchUsercode(usercode));

  var igsn_list = getState().mars.igsnResponseList.igsn_list;

  var count = 0;
  igsn_list.forEach(async (element) => {
    await dispatch(fetchSamples(element));
    count++;
    if (count == igsn_list.length) {
      dispatch(fetchSamplesSuccessful());
    }
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

  const sampleIgsn = response.data.sample.igsn;
  const sampleName = response.data.sample.name;
  const latitudes = response.data.sample.latitude;
  const longitudes = response.data.sample.longitude;
  const elevations = response.data.sample.elevation;

  dispatch({
    type: FETCH_SAMPLES,
    payload: [sampleIgsn, sampleName, latitudes, longitudes, elevations],
  });
};

export const fetchSamplesSuccessful = () => {
  return { type: FETCH_SAMPLES_SUCCESS, payload: "Success" };
};

// ==============================================================================
// READ & MERGE CSVs ACTIONS
// ==============================================================================
export const onProceedMapping = (sourceMap, sourceFiles, callback) => async (
  dispatch
) => {
  let sourceFormat = ".csv";

  readSourceMap(sourceMap, (err, map, logic) => {
    readSourceData(sourceFormat, sourceFiles, map, logic, (err, samples) => {
      dispatch(initializeSamples(samples));
    });
  });
  callback();
};

const readSourceMap = (mapFile, callback) => {
  let reader = new FileReader();
  reader.onload = (e) => {
    let fileContents = Function(e.target.result)();

    return callback(
      null,
      fileContents.map,
      fileContents.logic,
      fileContents.combinations
    );
  };

  reader.readAsText(mapFile);
};

const readSourceData = (format, files, map, logic, callback) => {
  switch (format) {
    case ".csv":
      return loadCSV(files, map, logic, callback);
    default:
      return callback("ERROR");
  }
};

const createField = (key, originalValue, originalKey, logic) => {
  if (!key) {
    return {
      originalKey,
      originalValue,
    };
  }
  return {
    originalKey,
    originalValue,
    key,
    value: logic[key] ? logic[key](originalValue, originalKey) : originalValue,
  };
};

const metaField = (key, logic) => {
  let value = logic[key]();
  return {
    originalKey: key,
    originalValue: value,
    key,
    value,
  };
};
// Load CSV files by merging them
const loadCSV = (files, map, logic, callback) => {
  let samples = [];
  let counter = 0;

  for (let i = 0; i < files.length; i++) {
    // closure reads each file and fires callback when completed
    ((file) => {
      // create a fileReader for each file
      let reader = new FileReader();

      // Because FileReader is asynchronous, there is no guaranteed order in
      // which each file will fire the onloadend event
      reader.onloadend = (e) => {
        // csvParse is a D3 function that loads a csv string. It takes a function
        // which handles the logic for mapping each individual sample
        csvParse(e.target.result, (d, i) => {
          if (!samples[i]) {
            samples[i] = [];
          }
          for (let key in map) {
            if (Array.isArray(map[key])) {
              for (let j = 0; j < map[key].length; j++) {
                if (d[map[key][j]] != undefined) {
                  if (d[map[key][j]] == "") {
                    samples[i].push(
                      createField(key, "Not Provided", map[key][j], logic)
                    );
                  } else {
                    samples[i].push(
                      createField(key, d[map[key][j]], map[key][j], logic)
                    );
                  }

                  delete d[map[key][i]];
                }
              }
            } else if (d[map[key]]) {
              samples[i].push(createField(key, d[map[key]], map[key], logic));
              delete d[map[key]];
            }
          }
          // Get the unmapped samples
          for (let key in d) {
            if (d[key]) {
              samples[i].push(createField(undefined, d[key], key, logic));
            }
          }

          for (let key in map) {
            if (map[key] === "<METADATA>") {
              let data = metaField(key, logic);
              samples[i] = [...samples[i], data];
              // samples[i].push(createField(key, d[map[key]], undefined, logic));
            }
          }
        });

        // the counter helps us know when all the files have been loaded by counting
        // the number of loadend events that are fired
        counter++;
        if (counter == files.length) {
          // filter repeats with hash tables
          for (let i = 0; i < samples.length; i++) {
            let seen = {};
            samples[i] = samples[i].filter((field) =>
              seen.hasOwnProperty(field.originalKey)
                ? false
                : (seen[field.originalKey] = true)
            );
          }
          for (let i = 0; i < samples.length; i++) {
            let igsn = [
              {
                originalKey: "igsn",
                originalValue: "",
                key: "igsn",
                value: "",
              },
            ]; //IGSN for each sample
            samples[i] = igsn.concat(samples[i]);
          }
          callback(null, samples);
        }
      };
      reader.readAsText(file);
    })(files[i]); // end closure
  }
};

// ==============================================================================
//
// ==============================================================================

export const onUploadProceed = (
  sourceMap,
  uploadSamples,
  user,
  selectedSamples
) => async (dispatch) => {
  readSourceMap(sourceMap, (err, map, logic, combinations) => {
    let sampleCopy = [...uploadSamples];
    let combinedSamples = combineFields(combinations, map, sampleCopy);
    dispatch(
      upload(
        user.username,
        user.password,
        user.usercode,
        combinedSamples,
        selectedSamples
      )
    );
  });
};

const combineFields = (combinations, map, uploadSamples) => {
  for (let i = 0; i < uploadSamples.length; i++) {
    for (let key in map) {
      if (Array.isArray(map[key])) {
        let filter = uploadSamples[i].filter((value) =>
          map[key].includes(value.originalKey)
        );

        let inverse = uploadSamples[i].filter(
          (value) => !map[key].includes(value.originalKey)
        );

        if (filter.length > 1) {
          let reduction = filter.reduce(
            (acc, field) => acc.concat([field.value]),
            []
          );

          if (combinations[key]) {
            let newField = { key, value: combinations[key](reduction) };

            inverse.push(newField);
            uploadSamples[i] = inverse;
          }
        } else if (filter.length == 1) {
          inverse.concat(filter);
          uploadSamples[i] = inverse;
        }
      }
    }
  }
  return uploadSamples;
};
