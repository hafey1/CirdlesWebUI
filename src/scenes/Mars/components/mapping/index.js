import { connect } from "react-redux";
//import worker from "../sandbox.worker";
import Worker from "../sandbox.worker.js";
import * as actions from "../../../../actions/mars";
import Mapping from "./mapping";

const sourceFormat = ".csv";

//Properties from application state will be set as props in Mapping.jsx
function mapStateToProps(state) {
  return {
    mapFile: state.mars.mapFile,
    sourceFiles: state.mars.sourceFiles,
    user: state.mars,
    uploadSamples: state.mars.samples,
  };
}

//Actions from actions/index.js will be set as props in Mapping.jsx
function mapDistatchToProps(dispatch) {
  return {
    onProceed: (sourceMap, sourceFiles, callback) => {
      dispatch(actions.onProceedMapping(sourceMap, sourceFiles, callback));
    },

    onChangeMapFileAction: (file) => {
      dispatch(actions.onChangeMapFileAction(file));
    },

    onChangeSourceFileAction: (files) => {
      dispatch(actions.onChangeSourceFileAction(files));
    },
  };
}

const MappingContainer = connect(
  mapStateToProps,
  mapDistatchToProps
)(Mapping);
export default MappingContainer;
