import FormData from "form-data";
import convert from "xml-to-json-promise";
import { csvParse } from "d3-dsv";
import axios from "axios";
import * as jsCON from "xml-js";
import localForage from "localforage";
import toXML from "../scenes/Mars/components/toXML";
import JSAlert from "js-alert";
//TODO: import toXML file

// Action Types
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

import {
  SESAR_LOGIN,
  SESAR_SAMPLE_PROFILE,
  SESAR_USER_SAMPLES,
  SESAR_BASE_URL,
} from "../constants/api";

// ==============================================================================
// Sign in and SignOut actions
// ==============================================================================

export const signInAction = (formProps, callback) => async (dispatch) => {
  try {
    //Create new form data and append both username and password to the form data
    const formData = new FormData();
    formData.append("username", formProps.username);
    formData.append("password", formProps.password);

    //Wait for the api call to finish
    //const response = await axios.post(SESAR_LOGIN, formData);
    //let options = { ignoreComment: true, alwaysChildren: true };

    //let resJSON = jsCON.xml2js(response.data, options);
    //let usercode = resJSON.elements[0].elements[1].elements[0].elements[0].text;

    // let usercode = formProps.mapFile.getKeysAndValues.get("user_code");

    //var i;
    // var valid = new Boolean(false);
    //var myArray = resJSON.elements[0].elements[1];
    //for (i = 0; i < myArray.length; i++) {
    //  if (
    //    formProps.usercode.localeCompare(
    //      myArray.elements[i].elements[0].text
    //  ) == 0
    //  ) {
    //    valid = new Boolean(true);
    //  }
    // }

    // force check of username and poassword
    await axios.post(SESAR_LOGIN, formData);
    // force check of supplied user code
    await dispatch(fetchUsercode(formProps.usercode));

    // if (Boolean(valid)) {
    //Dispatch an action with type AUTHENTICATED if everything above was succesfull
    dispatch({
      type: AUTHENTICATED,
      username: formProps.username,
      usercode: formProps.usercode,
      password: formProps.password,
    });

    //Return callback
    callback();
  } catch (e) {
    //Dispatch an action with type AUTHENTICATION_ERROR if an error occured
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: "Invalid email (user name), password, or UserCode",
    });
  }
};

//This function is an async function that removes everything from localForage
async function removeStorage() {
  await localForage.clear();
}
export function signOutAction() {
  //Remove everything from localForage and dispatch an action with type UNAUTHENTICATED
  removeStorage();
  return {
    type: UNAUTHENTICATED,
  };
}

// ==============================================================================
// MySamples Actions
// ==============================================================================
export const fetchUsercodeAndSamples = (usercode, username, password) => async (
  dispatch,
  getState
) => {
  //Wait for fetchUserCode() to finish
  await dispatch(fetchUsercode(usercode));

  //Grab igsn_list from state
  var igsn_list = getState().mars.igsnResponseList.igsn_list;

  //For each igsn in igsn_list run fetchSamples()
  var count = 0;
  igsn_list.forEach(async (element) => {
    await dispatch(fetchSamples(element, username, password));
    count++;
    if (count == igsn_list.length) {
      dispatch(fetchSamplesSuccessful());
    }
  });
};

export const fetchUsercode = (usercode) => async (dispatch) => {
  const response = await axios.get(SESAR_USER_SAMPLES + `${usercode}`);

  dispatch({ type: FETCH_USER, payload: response.data });
};

export const fetchSamples = (igsn, username, password) => async (dispatch) => {
  /* Oct 2020 - JFB - need to handle missing data including case where
     release date is in future, which returns this:
    <results>
      <user_code>IEE3E</user_code>
      <igsn>IEE3E0001</igsn>
      <status>This is a valid IGSN. The metadata will be released on 2021-11-07.</status>
    </results>   
    */
  var notProvided = "<Not Released>";
  var response;

  var sampleIgsn = notProvided;
  var sampleName = notProvided;
  var latitudes = notProvided;
  var longitudes = notProvided;
  var sample_types = notProvided;

  try {
    response = await axios.get(
      SESAR_SAMPLE_PROFILE +
        `${igsn}` +
        "&username=" +
        `${username}` +
        "&password=" +
        `${password}`
    );
    sampleIgsn = response.data.sample.igsn;
    sampleName =
      typeof response.data.sample.name == "undefined"
        ? notProvided
        : response.data.sample.name;
    latitudes =
      typeof response.data.sample.latitude == "undefined"
        ? notProvided
        : response.data.sample.latitude;
    longitudes =
      typeof response.data.sample.longitude == "undefined"
        ? notProvided
        : response.data.sample.longitude;
    sample_types =
      typeof response.data.sample.sample_type == "undefined"
        ? notProvided
        : response.data.sample.sample_type;
  } catch (e) {
    sampleIgsn = `${igsn}`;
  }

  dispatch({
    type: FETCH_SAMPLES,
    payload: [sampleIgsn, sampleName, sample_types, latitudes, longitudes],
  });
};

export const fetchSamplesSuccessful = () => {
  return { type: FETCH_SAMPLES_SUCCESS, payload: "Success" };
};

// ==============================================================================
// Mapping Actions
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

export const initializeSamples = (sampleArray, pureSamples, fileName) => async (
  dispatch
) => {
  const sampleData = getKeysAndValues(sampleArray);
  const pureSampleData = getKeysAndValues(pureSamples);
  await dispatch({
    type: INITIALIZE_SAMPLES,
    sampleArray: sampleArray,
    originalKeys: sampleData.sampleKeys,
    originalValues: sampleData.sampleValues,
    seasarKeys: sampleData.seasarKeys,
    pureKeys: pureSampleData.sampleKeys,
    pureSesar: pureSampleData.seasarKeys,
    pureValues: pureSampleData.sampleValues,
    pureSamples: pureSamples,
    fileName,
  });
};

export const onProceedMapping = (sourceMap, sourceFiles, callback) => async (
  dispatch
) => {
  let sourceFormat = ".csv";

  readSourceMap(sourceMap, (err, map, logic) => {
    readSourceData(
      sourceFormat,
      sourceFiles,
      map,
      logic,
      (err, samples, pureSamples, fileName) => {
        dispatch(initializeSamples(samples, pureSamples, fileName));
      }
    );
  });
  callback();
};

// ==============================================================================
// Upload Actions
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

    // extract the usercode from the mapping
    var i;
    var mapsUserCode;
    for (i = 0; i < combinedSamples[0].length; i++) {
      if (combinedSamples[0][i].key == "user_code") {
        mapsUserCode = combinedSamples[0][i].value;
      }
    }

    dispatch(
      upload(
        user.username,
        user.password,
        mapsUserCode,
        //user.usercode,
        combinedSamples,
        selectedSamples
      )
    );
  });
};

export function uploadRequest() {
  return {
    type: UPLOAD_REQUEST,
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

      let duplicateWarnings = [];
      let duplicateSamples = [];
      let filteredSamples = [];
      let filteredIndex = [];
      let duplicateSamplesIndex = [];
      let duplicateIGSNList = [];
      for (let i = 0; i < samplesToUpload.length; i++) {
        let sampleToCheck = sampleNames[i];
        let duplicateIGSNS = [];

        try {
          const response = await axios.get(
            SESAR_BASE_URL +
              `/samples/user_code/${usercode}?sample_name=${sampleToCheck}`
          );
          if (response.data.total_counts == 0) {
            filteredSamples.push(samplesToUpload[i]);
            filteredIndex.push(selectedSamples[i]);
          } else {
            duplicateIGSNS = response.data.igsn_list;
            let duplicateString = `${sampleToCheck}: ${duplicateIGSNS}`;
            duplicateWarnings.push(duplicateString);
            if (response.data.total_counts == 1) {
              duplicateIGSNList.push(response.data.igsn_list[0]);
              duplicateSamplesIndex.push(selectedSamples[i]);
              duplicateSamples.push(samplesToUpload[i]);
            }
          }
        } catch (err) {
          console.log("Error Response: ");
          console.log(err);
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          if (err.response.status == 404) {
            filteredSamples.push(samplesToUpload[i]);
            filteredIndex.push(selectedSamples[i]);
          } else if (err.response.status == 400) {
            JSAlert.alert(
              "The User Code " + usercode + " is invalid.  Please correct your mapping file and reload it.");
            dispatch({ type: UPLOAD_FAILURE, error });
          }
        }
      }
      if (duplicateSamplesIndex.length != 0) {
        await dispatch(
          duplicateSuccess(duplicateIGSNList, duplicateSamplesIndex)
        );
      }
      if (duplicateWarnings.length !== 0) {
        JSAlert.alert(
          "The following samples share names will samples already registered and WILL NOT be uploaded",
          "Duplicate Samples!"
        );
        for (let i = 0; i < duplicateWarnings.length; i++) {
          JSAlert.alert(
            `Duplicate Sample ${i + 1} of ${duplicateWarnings.length}`,
            `${duplicateWarnings[i]}`
          );
        }
      }

      if (filteredIndex.length === 0) {
        dispatch({ type: UPLOAD_FAILURE, error });
      }

      //convert samples to xml scheme
      let xmlSample = toXML(filteredSamples, usercode);
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
        SESAR_BASE_URL + "/webservices/upload.php",
        formData
      );

      //convert the response data from xml to JSON
      convert.xmlDataToJSON(res.data, { explicitArray: true }).then((json) => {
        dispatch(uploadSuccess(json.results.sample, filteredIndex));
      });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: UPLOAD_FAILURE, error });
    }
  };
}

export const duplicateSuccess = (results, selectedSamples) => async (
  dispatch,
  getState
) => {
  let samples = getState().mars.samples;
  let pureSamples = getState().mars.pureSamples;
  setDuplicateIGSN(results, samples, selectedSamples);
  setDuplicateIGSN(results, pureSamples, selectedSamples);

  const sampleData = getKeysAndValues(samples);
  const pureSampleData = getKeysAndValues(pureSamples);

  await dispatch({
    type: UPLOAD_SUCCESS,
    results,
    selectedSamples,
    samples,
    pureSamples,
    originalKeys: sampleData.sampleKeys,
    originalValues: sampleData.sampleValues,
    seasarKeys: sampleData.seasarKeys,
    pureKeys: pureSampleData.sampleKeys,
    pureSesar: pureSampleData.seasarKeys,
    pureValues: pureSampleData.sampleValues,
  });
};
export const uploadSuccess = (results, selectedSamples) => async (
  dispatch,
  getState
) => {
  let samples = getState().mars.samples;
  let pureSamples = getState().mars.pureSamples;

  setIGSN(results, samples, selectedSamples);
  setIGSN(results, pureSamples, selectedSamples);

  const sampleData = getKeysAndValues(samples);
  const pureSampleData = getKeysAndValues(pureSamples);

  dispatch({
    type: UPLOAD_SUCCESS,
    results,
    selectedSamples,
    samples,
    pureSamples,
    originalKeys: sampleData.sampleKeys,
    originalValues: sampleData.sampleValues,
    seasarKeys: sampleData.seasarKeys,
    pureKeys: pureSampleData.sampleKeys,
    pureSesar: pureSampleData.seasarKeys,
    pureValues: pureSampleData.sampleValues,
  });
};

export function uploadFailure(error) {
  return {
    type: UPLOAD_FAILURE,
    error,
  };
}

// ==============================================================================
// Helper Actions
// ==============================================================================
function setDuplicateIGSN(results, samples, selectedSamples) {
  for (let i = 0; i < results.length; i++) {
    let index = selectedSamples[i];

    /*IGSN for each sample
    for each sample, the sample is equal to its
    previous version with IGSN added to the end*/

    for (let j = 0; j < samples[index].length; j++) {
      if (
        samples[index][j].originalKey == "IGSN" ||
        samples[index][j].originalKey == "igsn"
      ) {
        samples[index][j] = {
          ...samples[index][j],
          originalValue: results[i],
          value: results[i],
        };
      }
    }
  }

  return samples;
}
function setIGSN(results, samples, selectedSamples) {
  for (let i = 0; i < results.length; i++) {
    let index = selectedSamples[i];

    /*IGSN for each sample
    for each sample, the sample is equal to its
    previous version with IGSN added to the end*/

    for (let j = 0; j < samples[index].length; j++) {
      if (
        samples[index][j].originalKey == "IGSN" ||
        samples[index][j].originalKey == "igsn"
      ) {
        samples[index][j] = {
          ...samples[index][j],
          originalValue: results[i].igsn[0],
          value: results[i].igsn[0],
        };
      }
    }
  }

  return samples;
}

function getKeysAndValues(samples) {
  var seasarKeys = new Set();
  var sampleValues = [];
  var sampleKeys = [];

  for (let i = 0; i < samples.length; i++) {
    for (let j = 0; j < samples[i].length; j++) {
      let sampleData = samples[i];
      let dataRow = samples[i][j];
      if (dataRow.key !== undefined) {
        seasarKeys.add(dataRow.key);
      }
      sampleKeys = [
        ...new Set(
          sampleData.map((data) => {
            return data.originalKey;
          })
        ),
      ];
    }
  }

  seasarKeys = [...seasarKeys];

  for (let i = 0; i < samples.length; i++) {
    var keyValue = {};
    for (let j = 0; j < sampleKeys.length; j++) {
      var keyData = sampleKeys[j];
      var data = samples[i]
        .filter((x) => {
          return x.originalKey === sampleKeys[j];
        })
        .map((x) => {
          return x.originalValue;
        });
      keyValue[keyData] = data[0];
    }
    sampleValues = [...sampleValues, keyValue];
  }

  return {
    seasarKeys,
    sampleKeys,
    sampleValues,
  };
}

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
          var reduction = filter.reduce(function(acc, field) {
            if (field.value.includes("Not Provided")) {
              return acc;
            }
            return acc.concat([field.value]);
            //return acc;
          }, []);

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

const createField = (
  key,
  originalValue,
  originalKey,
  logic,
  pure,
  arrayCheck
) => {
  if (!key) {
    return {
      originalKey,
      originalValue,
    };
  }
  if (
    (originalValue == "Not Provided" || originalValue == "") &&
    key == "collection_end_date"
  ) {
    return {
      originalKey,
      originalValue,
      key,
      value: "",
    };
  }
  if (
    (originalValue == "Not Provided" || originalValue == "") &&
    key != "igsn" &&
    pure == false &&
    arrayCheck != true
  ) {
    return {
      originalKey,
      originalValue: "Not Provided",
      key,
      value: "",
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
  if (value == "" || value == undefined || value == null) {
    value = "Not Provided";
  }

  return {
    key,
    value,
  };
};

const metaAddField = (key, logic) => {
  let value = logic[key]();
  if (value == "" || value == undefined || value == null) {
    value = "Not Provided";
  }

  let dataString = "" + key + ":" + value + " ";

  return dataString;
};

const readUploadedFileAsText = (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem with input file"));
    };

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.readAsText(file);
  });
};

const loadCSV = async (files, map, logic, callback) => {
  let fileName = [];
  let samples = [];
  let count = 0;
  let union = [];

  let mappedSamples = [];
  let pureSamples = [];

  for (let i = 0; i < files.length; i++) {
    try {
      const fileContents = await readUploadedFileAsText(files[i]);
      const sampleCSV = csvParse(fileContents);
      samples = [...samples, sampleCSV];
      count++;
    } catch (e) {
      console.log(e.message);
    }
  }

  if (count == files.length) {
    for (let i = 0; i < samples.length; i++) {
      union = _.merge(samples[i], union);
    }
  }

  let unionKeys = _.keysIn(union[0]);
  let keyCopies = [...unionKeys];

  for (let i = 0; i < union.length; i++) {
    let row = union[i];

    if (!mappedSamples[i] && !pureSamples[i]) {
      mappedSamples[i] = [];
      pureSamples[i] = [];
      fileName[i] = [];
    }

    for (let key in map) {
      if (Array.isArray(map[key])) {
        for (let j = 0; j < map[key].length; j++) {
          if (row[map[key][j]] == "" || row[map[key][j]] == null) {
            mappedSamples[i].push(
              createField(key, "Not Provided", map[key][j], logic, false, true)
            );
            pureSamples[i].push(
              createField(key, "", map[key][j], logic, true, false)
            );
          } else {
            mappedSamples[i].push(
              createField(
                key,
                row[map[key][j]],
                map[key][j],
                logic,
                false,
                true
              )
            );
            pureSamples[i].push(
              createField(
                key,
                row[map[key][j]],
                map[key][j],
                logic,
                true,
                false
              )
            );
          }
          const index = keyCopies.indexOf(map[key][j]);
          if (index > -1) {
            keyCopies.splice(index, 1);
          }
        }
      } else if (row[map[key]] != undefined) {
        if (row[map[key]] == "" || row[map[key]] == null) {
          mappedSamples[i].push(
            createField(key, "", map[key], logic, false, false)
          );
          pureSamples[i].push(
            createField(key, "", map[key], logic, true, false)
          );
        } else {
          mappedSamples[i].push(
            createField(key, row[map[key]], map[key], logic, false, false)
          );
          pureSamples[i].push(
            createField(key, row[map[key]], map[key], logic, true, false)
          );
        }
        const index = keyCopies.indexOf(map[key]);
        if (index > -1) {
          keyCopies.splice(index, 1);
        }
      }
    }

    for (let key in map) {
      if (map[key] === "<METADATA>" || map[key] === "<METADATA_ADD>") {
        let data = metaField(key, logic);
        mappedSamples[i] = [...mappedSamples[i], data];
      }
    }

    for (let key in map) {
      if (map[key] === "<METADATA_ADD>") {
        let data = metaAddField(key, logic);
        fileName[i] = [...fileName[i], data];
      }
    }
  }

  for (let i = 0; i < union.length; i++) {
    let row = union[i];

    for (let j = 0; j < keyCopies.length; j++) {
      let key = keyCopies[j];
      if (row[key] == "" || row[key] == undefined || row[key] == null) {
        mappedSamples[i].push(
          createField(undefined, "Not Provided", key, logic, false)
        );
        pureSamples[i].push(createField(undefined, "", key, logic, true));
      } else {
        mappedSamples[i].push(
          createField(undefined, row[key], key, logic, false)
        );
        pureSamples[i].push(createField(undefined, row[key], key, logic, true));
      }
    }
  }
  callback(null, mappedSamples, pureSamples, fileName[0][0]);
};
