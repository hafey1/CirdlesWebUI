import { connect } from "react-redux";
import Worker from "../sandbox.worker.js";
import * as actions from "../../../../actions/mars";
import Upload from "./upload";

function mapStateToProps(state) {
  return {
    mapFile: state.mars.mapFile,
    sourceFiles: state.mars.sourceFiles,
    user: state.mars,
    uploadSamples: state.mars.samples,
    loading: state.mars.loading
  };
}

function mapDistatchToProps(dispatch) {
  return {
    onUpload: (sourceMap, uploadSamples, user, selectedSamples) => {
      let worker = new Worker();
      worker.postMessage({ type: "combine", sourceMap, uploadSamples });
      worker.onmessage = e => {
        dispatch(
          actions.upload(
            user.username,
            user.password,
            user.usercode,
            e.data,
            selectedSamples
          )
        );
      };
    }
  };
}

const UploadContainer = connect(
  mapStateToProps,
  mapDistatchToProps
)(Upload);
export default UploadContainer;
