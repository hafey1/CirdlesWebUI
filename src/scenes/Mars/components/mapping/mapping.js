import React, { Component } from "react";
import Panel from "../panel";
import Modal from "../modal";
import "../../../../styles/mars.scss";
import * as localForage from "localforage";

class Mapping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: false
    };

    this.onChangeSourceFiles = this.onChangeSourceFiles.bind(this);
    this.onChangeSourceMap = this.onChangeSourceMap.bind(this);
    this.handleProceed = this.handleProceed.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
  }

  onChangeSourceMap(e) {
    localForage.setItem("mapFile", e.target.files[0]);
    this.props.onChangeMapFileAction(e.target.files[0]);
  }

  onChangeSourceFiles(e) {
    let fileList = e.target.files;
    let sourceFiles = [];
    for (var i = 0; i < fileList.length; i++) {
      sourceFiles[i] = fileList[i];
    }
    this.setState({ samples: false });
    this.props.onChangeSourceFileAction(sourceFiles);
  }

  handleProceed(e) {
    e.preventDefault();
    this.setState({ samples: true });
    this.props.onProceed(this.props.mapFile, this.props.sourceFiles);
    this.props.history.push("upload");
  }

  handleContinue(e) {
    e.preventDefault();
    this.setState({ samples: true });
    this.props.onProceed(this.props.mapFile, this.props.sourceFiles);
    this.props.onChangeMapFileAction(localStorage.getItem("mapFile"));
    this.props.history.push("upload");
  }

  getLocalStoarage() {
    return localForage.getItem("mapFile");
  }

  render() {
    let mapFile = this.getLocalStoarage();

    const displayProceed = () => {
      if (
        this.props.mapFile &&
        this.props.sourceFiles &&
        !this.props.uploadSamples
      ) {
        return (
          <div>
            <button
              type="button"
              className="submitButton"
              onClick={this.handleProceed}
            >
              Proceed to Data Mapping
            </button>
          </div>
        );
      }
      if (mapFile && this.props.sourceFiles && this.props.uploadSamples) {
        return (
          <div>
            <button
              type="button"
              onClick={this.handleContinue}
              className="btn btn-danger"
            >
              Continue with Data Mapping
            </button>
          </div>
        );
      }
    };

    return (
      <div className="upload">
        <Panel name="Mapping Setup">
          <div className="text">Select your Mapping File</div>
          <input
            className="inputs"
            type="file"
            name="file"
            accept=".js"
            onChange={e => this.onChangeSourceMap(e)}
          />
          <div className="text">Select your Sample Files</div>
          <input
            className="inputs"
            type="file"
            name="file"
            accept=".csv"
            multiple
            onChange={e => this.onChangeSourceFiles(e)}
          />
          {displayProceed()}
        </Panel>
      </div>
    );
  }
}

export default Mapping;
