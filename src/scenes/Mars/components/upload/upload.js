import React, { Component } from "react";
import "../../../../styles/mars.scss";

import * as localForage from "localforage";
import _ from "lodash";
import SampleTable from "../sampleTable";

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
    console.log(mapFile);
    if (selectedSamples.length > 0) {
      this.props.onUpload(
        mapFile,
        this.props.samples,
        this.props.user,
        selectedSamples
      );
    }
  }

  async componentDidMount() {
    const mapFile = await this.getMapFile();
    this.setState({ mapFile: mapFile });
  }

  renderTable() {
    let mapFile = this.state.mapFile;
    console.log(mapFile);

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
    return <div>{this.renderTable()}</div>;
  }
}

export default Upload;

/*
 <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {this.props.originalKeys.map((keyHeader) => (
                        <TableCell key={keyHeader}>{keyHeader}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.originalValues.map((row, index) => (
                      <TableRow key={index}>
                        {Object.entries(row).map(([key, value]) => (
                          <TableCell key={key}>{value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              */

/* <TableRow
             hover
             onClick={(event) => handleClick(event, row.name)}
             role="checkbox"
             aria-checked={isItemSelected}
             tabIndex={-1}
             key={index}
             selected={isItemSelected}
           >
             <TableCell padding="checkbox">
               <Checkbox
                 checked={isItemSelected}
                 inputProps={{ "aria-labelledby": labelId }}
               />
             </TableCell>
             <TableCell
               component="th"
               id={labelId}
               scope="row"
               padding="none"
             >
               {row.name}
             </TableCell>
             <TableCell align="right">{row.calories}</TableCell>
             <TableCell align="right">{row.fat}</TableCell>
             <TableCell align="right">{row.carbs}</TableCell>
             <TableCell align="right">{row.protein}</TableCell>
           </TableRow>*/
