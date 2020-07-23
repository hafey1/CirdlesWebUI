import { connect } from "react-redux";
import Worker from "../sandbox.worker.js";
import * as actions from "../../../../actions/mars";
import Upload from "./upload";

function mapStateToProps(state) {
  return {
    mapFile: state.mars.mapFile,
    sourceFiles: state.mars.sourceFiles,
    samples: state.mars.samples,
    loading: state.mars.loading,
    originalKeys: state.mars.originalKeys,
    originalValues: state.mars.originalValues,
    pureSamples: state.mars.pureSamples,
    pureKeys: state.mars.pureKeys,
    pureValues: state.mars.pureValues,
    sesarKeys: state.mars.sesarKeys,
    user: state.mars,
    fileName: state.mars.fileName,
  };
}

function mapDistatchToProps(dispatch) {
  return {
    onUpload: (sourceMap, uploadSamples, user, selectedSamples) => {
      dispatch(
        actions.onUploadProceed(sourceMap, uploadSamples, user, selectedSamples)
      );
    },
  };
}

const UploadContainer = connect(
  mapStateToProps,
  mapDistatchToProps
)(Upload);
export default UploadContainer;
