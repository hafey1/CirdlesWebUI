import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  CHANGE_MAP_FILE,
  CHANGE_SOURCE_FILE,
  INITIALIZE_SAMPLES,
  UPLOAD_REQUEST,
  UPLOAD_FAILURE,
  UPLOAD_SUCCESS
} from "actions";

export default function(state = {}, action) {
  switch (action.type) {
    case AUTHENTICATED:
      console.log(state);
      return {
        ...state,
        authenticated: true,
        username: action.username,
        usercode: action.usercode,
        password: action.password
      };
    case UNAUTHENTICATED:
      console.log(state);
      return {
        ...state,
        authenticated: false,
        samples: null,
        sourceFiles: null,
        username: null,
        password: null,
        usercode: null
      };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    case CHANGE_SOURCE_FILE:
      return { ...state, sourceFiles: action.sourceFiles };
    case CHANGE_MAP_FILE:
      return { ...state, mapFile: action.mapFile };
    case INITIALIZE_SAMPLES:
      console.log("<==== Samples Ready ====>");
      return { ...state, samples: action.sampleArray, loading: false };
    case UPLOAD_REQUEST:
      console.log("<==== Upload Requested ====>");
      return { ...state, loading: true };
    case UPLOAD_SUCCESS:
      let results = action.results;
      let samples = state.samples;
      let selectedSamples = action.selectedSamples;

      //Add the IGSNs to each sample
      for (let i = 0; i < results.length; i++) {
        let index = selectedSamples[i];
        let igsn = {
          originalKey: "igsn",
          originalValue: results[i].igsn,
          key: "igsn",
          value: results[i].igsn
        };
        /*IGSN for each sample
        for each sample, the sample is equal to its
        previous version with IGSN added to the end*/
        samples[index][0] = igsn;
      }
      console.log("<==== Upload Succcessful ====>");
      return { ...state, samples: samples, loading: false };
    case UPLOAD_FAILURE:
      console.log("<==== Upload Failure ====>");
      return { ...state, loading: false };
    default:
      return state;
  }
}
