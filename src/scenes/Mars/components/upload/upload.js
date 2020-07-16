import React, { Component } from "react";
import _ from "lodash";
import * as localForage from "localforage";
import SampleTable from "../sampleTable";
import "../../../../styles/mars.scss";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: [],
      mapFile: null,
    };

    this.renderTable = this.renderTable.bind(this);
    this.handleOnUpload = this.handleOnUpload.bind(this);
    this.getMapFile = this.getMapFile.bind(this);
  }

  async getMapFile() {
    let file = await localForage.getItem("mapFile");
    return file;
  }

  async handleOnUpload(selectedRows) {
    //create an array of the indices of samples that were selected to be uploaded
    let selectedSamples = [];
    for (let i = 0; i < selectedRows.data.length; i++) {
      selectedSamples = [...selectedSamples, selectedRows.data[i].index];
    }
    let mapFile = await this.getMapFile();
    if (selectedSamples.length > 0) {
      this.props.onUpload(
        mapFile,
        this.props.samples,
        this.props.user,
        selectedSamples
      );
    }
  }

  /* This needs to be async because we need to await until local 
  forage promise is resolved in order to get the value for the map file */
  async componentDidMount() {
    const mapFile = await this.getMapFile();
    this.setState({ mapFile: mapFile });
  }

  renderTable() {
    let mapFile = this.state.mapFile;
    if (
      this.props.originalValues !== undefined &&
      this.props.originalKeys !== undefined &&
      this.props.loading == false
    ) {
      return (
        <div style={{ width: "100%", height: "90%" }}>
          <div className="centercontainer">
            <div className="left"></div>
            <div className="center">
              <SampleTable
                originalKeys={this.props.originalKeys}
                originalValues={this.props.originalValues}
                samples={this.props.samples}
                pureKeys={this.props.pureKeys}
                pureValues={this.props.pureValues}
                pureSamples={this.props.pureSamples}
                onUpload={this.props.onUpload}
                user={this.props.user}
                mapFile={mapFile}
              />
            </div>
          </div>
          <div className="right"></div>
        </div>
      );
    } else {
      return (
        <div className="outerDiv">
          <div className="d-flex justify-content-center">
            <div
              className="spinner-grow text-primary"
              style={{ width: "6rem", height: "6rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    console.log("Props", this.props);
    return <div>{this.renderTable()}</div>;
  }
}

export default Upload;
