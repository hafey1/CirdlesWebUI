// @flow
import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { createProject } from "actions";
import axios from "axios";

import "styles/squid.scss";

const endpoint = "http://cirdles.cs.cofc.edu/Services/squidReporting";
const FileDownload = require("downloadjs");
// checkout https://www.npmjs.com/package/rn-fetch-blob for soultion involving progress etc

class SquidPage extends Component {
  constructor(props) {
    super(props);
    this.handleselectedPrawnFile = this.handleselectedPrawnFile.bind(this);
    this.handleselectedTaskFile = this.handleselectedTaskFile.bind(this);
    this.handleRefMatFilterChange = this.handleRefMatFilterChange.bind(this);
    this.handleConcRefMatFilterChange = this.handleConcRefMatFilterChange.bind(
      this
    );
    this.handleUpload = this.handleUpload.bind(this);
    this.handleNormalizeSBMChange = this.handleNormalizeSBMChange.bind(this);
    this.handleRatioCalculationMethodChange = this.handleRatioCalculationMethodChange.bind(
      this
    );
    this.handlePreferredIndexIsotopeChange = this.handlePreferredIndexIsotopeChange.bind(
      this
    );

    this.state = {
      selectedPrawnFile: null,
      selectedTaskFile: null,
      refMatFilter: "",
      concRefMatFilter: "",
      normalizeSBM: true,
      ratioCalculationMethod: false,
      preferredIndexIsotope: "PB_204",
      loaded: 0
    };
  }

  handleselectedPrawnFile(event) {
    this.setState({
      selectedPrawnFile: event.target.files[0],
      loaded: 0
    });
  }

  handleselectedTaskFile(event) {
    this.setState({
      selectedTaskFile: event.target.files[0],
      loaded: 0
    });
  }

  handleRefMatFilterChange(event) {
    this.setState({ refMatFilter: event.target.value });
  }

  handleConcRefMatFilterChange(event) {
    this.setState({ concRefMatFilter: event.target.value });
  }

  handleNormalizeSBMChange(changeEvent) {
    this.setState({
      normalizeSBM: changeEvent.target.value
    });
  }

  handleRatioCalculationMethodChange(changeEvent) {
    this.setState({
      ratioCalculationMethod:
        changeEvent.target.id === "ratioCalcMethodRegression"
    });
  }

  handlePreferredIndexIsotopeChange(changeEvent) {
    this.setState({
      preferredIndexIsotope: changeEvent.target.value
    });
  }

  handleUpload() {
    const data = new FormData();
    if (
      this.state.selectedPrawnFile != null &&
      this.state.selectedTaskFile != null
    ) {
      data.append("prawnFile", this.state.selectedPrawnFile);
      data.append("taskFile", this.state.selectedTaskFile);
      data.append("useSBM", this.state.normalizeSBM);
      data.append("userLinFits", this.state.ratioCalculationMethod);
      data.append("refMatFilter", this.state.refMatFilter);
      data.append("concRefMatFilter", this.state.concRefMatFilter);
      data.append("prefIndexIso", this.state.preferredIndexIsotope);

      axios
        .post(endpoint, data, {
          responseType: "blob",
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
            });
          }
        })
        .then(response => {
          FileDownload(response.data, "squid-reports.zip", "application/zip"),
            {
              onDownloadProgress: ProgressEvent => {
                this.setState({
                  loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
                });
              }
            },
            this.setState({ loaded: 0 });
        });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="squid container my-3 p-3 d-flex flex-column justify-content-center border border-squid rounded">
          <div className="row m-3">
            <div className="col">
              <label className="my-auto">Zipped Prawn XML file:</label>
              <div className="custom-file">
                <input
                  className="custom-file-input my-auto"
                  type="file"
                  name="prawnFile"
                  id="prawnFileInput"
                  onChange={this.handleselectedPrawnFile}
                />
                <label htmlFor="prawnFileInput" className="custom-file-label">
                  {(this.state.selectedPrawnFile &&
                    shortenFileName(this.state.selectedPrawnFile.name)) ||
                    "Choose File"}
                </label>
              </div>
            </div>
            <div className="col">
              <label className="my-auto">Squid2.* Task XLS file:</label>
              <div className="custom-file">
                <input
                  className="custom-file-input my-auto"
                  type="file"
                  name="taskFile"
                  id="taskFileInput"
                  onChange={this.handleselectedTaskFile}
                />
                <label htmlFor="taskFileInput" className="custom-file-label">
                  {(this.state.selectedTaskFile &&
                    shortenFileName(this.state.selectedTaskFile.name)) ||
                    "Choose File"}
                </label>
              </div>
            </div>
          </div>

          <div className="row m-3">
            <label
              htmlFor="refMatFilterInput"
              className="col my-auto text-right"
            >
              Reference Material Sample Name Filter:
            </label>
            <input
              className="form-control col my-auto"
              type="text"
              name="refMatFilter"
              id="refMatFilterInput"
              value={this.state.refMatFilter}
              onChange={this.handleRefMatFilterChange}
            />
          </div>

          <div className="row m-3">
            <label
              htmlFor="concRefMatFilterInput"
              className="col my-auto text-right"
            >
              Concentration Reference Material Sample Name Filter:
            </label>
            <input
              className="form-control col my-auto"
              type="text"
              name="concRefMatFilter"
              id="concRefMatFilterInput"
              value={this.state.concRefMatFilter}
              onChange={this.handleConcRefMatFilterChange}
            />
          </div>

          <div className="row m-3">
            <label className="col my-auto text-right">
              Normalize Ion Counts for SBM?
            </label>
            <div className="col">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="normalizeSBM"
                  id="normalizeSBMYes"
                  checked={this.state.normalizeSBM}
                  onChange={this.handleNormalizeSBMChange}
                />
                <label className="form-check-label" htmlFor="normalizeSBMYes">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="normalizeSBM"
                  id="normalizeSBMNo"
                  checked={this.state.normalizeSBM}
                  onChange={this.handleNormalizeSBMChange}
                />
                <label className="form-check-label" htmlFor="normalizeSBMNo">
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="row m-3">
            <label className="col my-auto text-right">
              Ratio Calculation Method:
            </label>
            <div className="col">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ratioCalcMethod"
                  id="ratioCalcMethodRegression"
                  checked={this.state.ratioCalculationMethod}
                  onChange={this.handleRatioCalculationMethodChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="ratioCalcMethodRegression"
                >
                  Linear regression to burn mid-time
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ratioCalcMethod"
                  id="ratioCalcMethodAverage"
                  checked={!this.state.ratioCalculationMethod}
                  onChange={this.handleRatioCalculationMethodChange}
                />
                <label className="form-check-label" htmlFor="normalizeSBMNo">
                  Spot average (time-invariant)
                </label>
              </div>
            </div>
          </div>

          <div className="row m-3">
            <label className="col my-auto text-right">
              Preferred Index Isotope:
            </label>
            <div className="col">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="PB_204"
                  name="indexIsotope"
                  id="indexIsotope204"
                  checked={this.state.preferredIndexIsotope === "PB_204"}
                  onChange={this.handlePreferredIndexIsotopeChange}
                />
                <label htmlFor="indexIsotope204" className="form-check-label">
                  204Pb
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="PB_207"
                  name="indexIsotope"
                  id="indexIsotope207"
                  checked={this.state.preferredIndexIsotope === "PB_207"}
                  onChange={this.handlePreferredIndexIsotopeChange}
                />
                <label htmlFor="indexIsotope207" className="form-check-label">
                  207Pb
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="PB_208"
                  name="indexIsotope"
                  id="indexIsotope208"
                  checked={this.state.preferredIndexIsotope === "PB_208"}
                  onChange={this.handlePreferredIndexIsotopeChange}
                />
                <label htmlFor="indexIsotope204" className="form-check-label">
                  208Pb
                </label>
              </div>
            </div>
          </div>

          <div className="row justify-content-center text-center text-danger m-2">
            Note: parameter models are currently GA defaults (see Squid app).
          </div>
          <div className="row justify-content-center m-2">
            <button
              className="btn btn-outline-squid rounded-pill"
              onClick={this.handleUpload}
            >
              Click here to Upload data for processing ... wait for returned
              results
            </button>
          </div>

          <h4 className="mt-4"> Upload progress:</h4>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={this.state.loaded}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        <div className="mx-auto text-center">
          Visit us on&nbsp;
          <a href="https://github.com/CIRDLES/Squid" target="_blank">
            Github
          </a>
        </div>
      </Fragment>
    );
  }
}

function shortenFileName(fileName) {
  return (fileName && fileName.length > 50) ? (fileName.substring(0, 47) + "...") : fileName;
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    createProject: bindActionCreators(createProject, dispatch)
  };
}

export default SquidPage;
