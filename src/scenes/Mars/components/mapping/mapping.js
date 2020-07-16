import React, { Component } from "react";
import Panel from "../panel";
import Modal from "../modal";
import "../../../../styles/mars.scss";
import * as localForage from "localforage";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { instanceOf } from "prop-types";

class Mapping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: false,
      mapFile: null,
      open: true,
    };

    this.onChangeSourceFiles = this.onChangeSourceFiles.bind(this);
    this.handleProceed = this.handleProceed.bind(this);

    this.mapFile = React.createRef();
    this.sourceFiles = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleContinue = () => {
    this.props.history.push("upload");
  };

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
    if (this.props.uploadSamples) {
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
          <Dialog open={this.state.open}>
            <DialogTitle>{"Make New Mapping?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Would you like to make a new map? All previous mapping data will
                be lost.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Yes</Button>
              <Button onClick={this.handleContinue}>No</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
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
