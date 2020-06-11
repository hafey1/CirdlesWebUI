import React, { Component } from "react";
import Panel from "../panel";
import Modal from "../modal";
import "../../../../styles/mars.scss";
import * as localForage from "localforage";

class Mapping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: false,
      mapFile: "",
    };

    this.onChangeSourceFiles = this.onChangeSourceFiles.bind(this);
    this.handleProceed = this.handleProceed.bind(this);

    this.mapFile = React.createRef();
    this.sourceFiles = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeSourceFiles(fileList) {
    let sourceFiles = [];
    for (var i = 0; i < fileList.length; i++) {
      sourceFiles[i] = fileList[i];
    }
    this.props.onChangeSourceFileAction(sourceFiles);
  }

  handleProceed(mapFile, sourceFilesList) {
    let sourceFiles = [];
    for (var i = 0; i < sourceFilesList.length; i++) {
      sourceFiles[i] = sourceFilesList[i];
    }

    localForage.setItem("mapFile", mapFile);
    this.props.onProceed(mapFile, sourceFiles, () => {
      this.props.history.push("upload");
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let mapFile = this.mapFile.current.files[0];
    let sourceFilesList = this.sourceFiles.current.files;

    if (this.mapFile.current.files.length === 0) {
      alert("Please Select a Mapfile to Continue");
    } else if (this.sourceFiles.current.files.length === 0) {
      alert("Please Select at least 1 Source File to Continue");
    } else {
      this.onChangeSourceFiles(sourceFilesList);
      this.props.onChangeMapFileAction(mapFile);
      this.handleProceed(mapFile, sourceFilesList);
    }
  }

  render() {
    return (
      <div className="upload">
        <Panel name="Mapping Setup">
          <form onSubmit={this.handleSubmit}>
            <label className="text">
              Select your Mapping File
              <input
                className="inputs"
                type="file"
                accept="text/javascript"
                ref={this.mapFile}
              />
            </label>

            <label className="text">
              Select your sourceFiles
              <input
                className="inputs"
                type="file"
                accept="text/csv"
                multiple
                ref={this.sourceFiles}
              />
            </label>
            <button className="btn btn-primary" type="submit">
              Proceed to Mapping
            </button>
          </form>
        </Panel>
      </div>
    );
  }
}

export default Mapping;
