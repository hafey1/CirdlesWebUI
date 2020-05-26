import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  CHANGE_MAP_FILE,
  CHANGE_SOURCE_FILE,
  INITIALIZE_SAMPLES,
  UPLOAD_REQUEST,
  UPLOAD_FAILURE,
  UPLOAD_SUCCESS,
  FETCH_USER,
  FETCH_SAMPLES,
} from "actions";

export default function(state = {}, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        authenticated: true,
        username: action.username,
        usercode: action.usercode,
        password: action.password,
        error: "",
        sampleLoading: true,
      };
    case UNAUTHENTICATED:
      return {
        authenticated: false,
        usercode: "",
        username: "",
        error: "",
        sampleLoading: true,
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
          value: results[i].igsn,
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
    case FETCH_USER:
      console.log(state);
      return { ...state, igsnResponseList: action.payload, mySamplesList: [] };
    case FETCH_SAMPLES:
      const igsn = action.payload.data.sample.igsn;
      const sampleName = action.payload.data.sample.name;
      const latitudes = action.payload.data.sample.latitude;
      const longitudes = action.payload.data.sample.longitude;
      const elevations = action.payload.data.sample.elevation;
      return {
        ...state,
        mySamplesList: [
          ...state.mySamplesList,
          [igsn, sampleName, latitudes, longitudes, elevations],
        ],
        sampleLoading: false,
      };
    default:
      return state;
  }
}
