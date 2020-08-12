import React, { Component } from "react";
import Panel from "../Panel";
import "../../../../styles/mars.scss";
import * as localForage from "localforage";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class Mapping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      mapFile: null,
      sourceFiles: null,
      mapFileName: "Select File",
      sourceFileName: "Select File(s)",
    };

    this.mapFile = React.createRef();
    this.sourceFiles = React.createRef();

    this.handleProceed = this.handleProceed.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMappingInputChange = this.handleMappingInputChange.bind(this);
    this.handleSourceInputChange = this.handleSourceInputChange.bind(this);
    this.onChangeSourceFiles = this.onChangeSourceFiles.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.shouldRenderDialog = this.shouldRenderDialog.bind(this);
  }

  async componentDidMount() {
    try {
      const mapFile = await localForage.getItem("mapFile");
      // This code runs once the value has been loaded
      // from the offline store.

      if (mapFile != null) {
        this.setState({ mapFileName: mapFile.name });
        this.setState({ mapFile: mapFile });
      }
    } catch (err) {
      // This code runs if there were any errors.
      console.log("Error", err);
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleContinue = () => {
    this.props.history.push("upload");
  };

  getSourceFiles(fileList) {
    let sourceFiles = [];
    for (var i = 0; i < fileList.length; i++) {
      sourceFiles[i] = fileList[i];
    }
    return sourceFiles;
  }

  onChangeSourceFiles(fileList) {
    let sourceFiles = this.getSourceFiles(fileList);
    this.props.onChangeSourceFileAction(sourceFiles);
  }

  onChangeMapFile(mapFile) {
    localForage.setItem("mapFile", mapFile);
    this.props.onChangeMapFileAction(mapFile);
  }

  handleSubmit(event) {
    event.preventDefault();
    let mapFile = this.state.mapFile;
    let sourceFilesList = this.sourceFiles.current.files;

    if (mapFile === null || mapFile === undefined) {
      alert("Please Select a Mapfile to Continue");
    } else if (this.sourceFiles.current.files.length === 0) {
      alert("Please Select at least 1 Source File to Continue");
    } else {
      this.onChangeMapFile(mapFile);
      this.onChangeSourceFiles(sourceFilesList);
      this.handleProceed(mapFile, sourceFilesList);
    }
  }

  handleProceed(mapFile, fileList) {
    let sourceFiles = this.getSourceFiles(fileList);
    this.props.onProceed(mapFile, sourceFiles, () => {
      this.props.history.push("upload");
    });
  }

  handleMappingInputChange(event) {
    const mapFile = event.target.files[0];
    const mapFileName = mapFile.name;

    localForage.setItem("mapFile", mapFile);

    this.setState({ mapFile: mapFile });
    this.setState({ mapFileName: mapFileName });

    event.preventDefault();
  }

  handleSourceInputChange(event) {
    const sourceFiles = event.target.files;
    var fileStringName = "";
    if (sourceFiles.length > 0) {
      for (let i = 0; i < sourceFiles.length; i++) {
        fileStringName = fileStringName + sourceFiles[i].name + ", ";
      }

      fileStringName = fileStringName.slice(0, fileStringName.length - 2);
    }
    this.setState({ sourceFileName: fileStringName });
    event.preventDefault();
  }

  renderTable() {
    return (
      <div className="mapping-panel__container">
        <Panel className="mapping-panel" name="Mapping Setup">
          <form className="mapping-form" onSubmit={this.handleSubmit}>
            <div className="mapping-panel__tags">Select a Mapping File</div>

            <div className="mapping-input__container custom-file">
              <input
                type="file"
                className="mapping-input custom-file-input"
                id="inputGroupFile01"
                accept="text/javascript"
                ref={this.mapFile}
                onChange={this.handleMappingInputChange}
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {this.state.mapFileName}
              </label>
            </div>

            <div className="mapping-panel__tags">Select Source File(s)</div>

            <div className="mapping-input__container custom-file">
              <input
                type="file"
                className="mapping-input custom-file-input"
                id="inputGroupFile02"
                accept="text/csv"
                multiple
                ref={this.sourceFiles}
                onChange={this.handleSourceInputChange}
              />
              <label className="custom-file-label" htmlFor="inputGroupFile02">
                {this.state.sourceFileName}
              </label>
            </div>

            <div className="mapping-button__container">
              <button className="mapping-button btn btn-primary" type="submit">
                Proceed to Mapping
              </button>
            </div>
          </form>
        </Panel>
      </div>
    );
  }
  shouldRenderDialog() {
    if (this.props.uploadSamples) {
      return (
        <div className="mapping">
          {this.renderTable()}
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
    } else {
      return <div className="mapping">{this.renderTable()}</div>;
    }
  }
  render() {
    return this.shouldRenderDialog();
  }
}

export default Mapping;
