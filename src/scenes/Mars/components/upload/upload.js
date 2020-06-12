import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import "../../../../styles/mars.scss";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import * as localForage from "localforage";
import _ from "lodash";
import SampleTable from "../sampleTable/index";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: [],
    };

    this.renderTable = this.renderTable.bind(this);
    this.handleOnUpload = this.handleOnUpload.bind(this);
  }

  handleOnUpload(selectedRows) {
    //create an array of the indices of samples that were selected to be uploaded
    let selectedSamples = [];
    for (let i = 0; i < selectedRows.data.length; i++) {
      selectedSamples = [...selectedSamples, selectedRows.data[i].index];
    }
    let mapFile = this.props.mapFile;
    if (selectedSamples.length > 0) {
      this.props.onUpload(
        mapFile,
        this.props.samples,
        this.props.user,
        selectedSamples
      );
    }
  }

  renderTable() {
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
                valuesWithoutIgsn={this.props.valuesWithoutIgsn}
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
    console.log(this.props);
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
