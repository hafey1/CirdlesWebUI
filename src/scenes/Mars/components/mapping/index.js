import { connect } from "react-redux";
import * as actions from "../../../../actions/mars";
import Mapping from "./Mapping";

const sourceFormat = ".csv";

function mapStateToProps(state) {
  return {
    mapFile: state.mars.mapFile,
    sourceFiles: state.mars.sourceFiles,
    user: state.mars,
    uploadSamples: state.mars.samples,
  };
}

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
