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
  FETCH_SAMPLES_SUCCESS,
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
        mySamplesList: [],
      };
    case UNAUTHENTICATED:
      return {
        authenticated: false,
        usercode: "",
        username: "",
        error: "",
        sampleLoading: true,
        mySamplesList: [],
      };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload, mySamplesList: [] };
    case CHANGE_SOURCE_FILE:
      return { ...state, sourceFiles: action.sourceFiles };
    case CHANGE_MAP_FILE:
      return { ...state, mapFile: action.mapFile };
    case INITIALIZE_SAMPLES:
      console.log("<==== Samples Ready ====>");
      return {
        ...state,
        samples: action.sampleArray,
        loading: false,
        originalKeys: action.originalKeys,
        originalValues: action.originalValues,
        sesarKeys: action.sesarKeys,
      };
    case UPLOAD_REQUEST:
      console.log("<==== Upload Requested ====>");
      return { ...state, loading: true };
    case UPLOAD_SUCCESS:
      console.log("<==== Upload Succcessful ====>");
      return {
        ...state,
        loading: false,
        samples: action.samples,
        originalKeys: action.originalKeys,
        originalValues: action.originalValues,
      };
    case UPLOAD_FAILURE:
      console.log("<==== Upload Failure ====>");
      return { ...state, loading: false };
    case FETCH_USER:
      return {
        ...state,
        igsnResponseList: action.payload,
        mySamplesList: [],
        loading: true,
      };
    case FETCH_SAMPLES:
      return {
        ...state,
        mySamplesList: [...state.mySamplesList, action.payload],
        sampleLoading: false,
      };

    case FETCH_SAMPLES_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
}
