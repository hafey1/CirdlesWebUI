import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../../../styles/mars.scss";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MUIDataTable from "mui-datatables";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import * as localForage from "localforage";

const styles = theme => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",

    overflowX: "auto"
  },
  table: {
    minWidth: "100%",
    height: "2rem"
  },
  column: {
    whiteSpace: "normal",
    wordWrap: "break-word",
    width: "25%"
  }
});

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
      columnDefs: [],
      originalKeys: [],
      originalValues: [],
      uploadSamples: [],
      mapFile: ""
    };

    this.handleOnUpload = this.handleOnUpload.bind(this);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
    this.getMapFile = this.getMapFile.bind(this);
  }

  getMapFile() {
    return localForage.getItem("mapFile");
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
        this.props.uploadSamples,
        this.props.user,
        selectedSamples
      );
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.uploadSamples !== state.uploadSamples) {
      return {
        uploadSamples: props.uploadSamples
      };
    } else {
      return null;
    }
  }

  shouldComponentRender() {
    if (this.props.loading === false) return false;
    return true;
  }

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "#FFF",
            width: "50000000px"
          }
        },
        MUIDataTableSelectCell: {
          root: {
            backgroundColor: "#FFFF"
          }
        }
      }
    });

  render() {
    if (!this.props.uploadSamples) {
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
    if (this.state.uploadSamples) {
      var seasarKeys = new Set();
      var originalValues = [];
      var originalKeys = [];
      var uploadSamples = this.state.uploadSamples;

      for (let i = 0; i < uploadSamples.length; i++) {
        for (let j = 0; j < uploadSamples[i].length; j++) {
          let sampleData = uploadSamples[i];
          let dataRow = uploadSamples[i][j];
          if (dataRow.key !== undefined) {
            seasarKeys.add(dataRow.key);
          }
          originalKeys = [
            ...new Set(
              sampleData.map(data => {
                return data.originalKey;
              })
            )
          ];
        }
      }
      seasarKeys = [...seasarKeys];

      for (let i = 0; i < uploadSamples.length; i++) {
        var keyValue = {};
        for (let j = 0; j < originalKeys.length; j++) {
          var keyData = originalKeys[j];
          var data = uploadSamples[i]
            .filter(x => {
              return x.originalKey === originalKeys[j];
            })
            .map(x => {
              return x.originalValue;
            });
          keyValue[keyData] = data[0];
        }
        originalValues = [...originalValues, keyValue];
      }
      const { classes } = this.props;
      var rows = this.props.uploadSamples;

      let theme = createMuiTheme({
        overrides: {
          MUIDataTableSelectCell: {
            root: {
              backgroundColor: "#FFFF"
            }
          },
          MUIDataTableBodyCell: {
            root: {
              backgroundColor: "#FFF"
            }
          }
        }
      });

      const options = {
        filter: true,
        filterType: "dropdown",
        responsive: "scroll",
        expandableRows: true,
        expandableRowsOnClick: true,
        //only allow rows with no igsn to be selected
        isRowSelectable: dataIndex => {
          return originalValues[dataIndex].igsn === "";
        },
        customToolbarSelect: selectedRows => (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleOnUpload(selectedRows)}
            >
              Upload
            </Button>
          </div>
        ),
        renderExpandableRow: (rowData, rowMeta) => {
          const colSpan = rowData.length;
          const index = rowMeta.rowIndex;
          return (
            <TableRow>
              <TableCell colSpan={4}>
                <Paper className={classes.root}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Original Field</TableCell>
                        <TableCell align="left">Original Value</TableCell>
                        <TableCell align="left">SESAR Field</TableCell>
                        <TableCell align="left">SEASAR Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows[index].map(row => (
                        <TableRow key={row.originalKey}>
                          <TableCell className={classes.column}>
                            {row.originalKey}
                          </TableCell>
                          <TableCell className={classes.column} align="left">
                            {row.originalValue}
                          </TableCell>
                          <TableCell className={classes.column} align="left">
                            {row.key}
                          </TableCell>
                          <TableCell className={classes.column} align="left">
                            {row.value}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </TableCell>
            </TableRow>
          );
        }
      };

      return (
        <div style={{ width: "100%", height: "90%" }}>
          <div className="centercontainer">
            <div className="left"></div>
            <div className="center">
              <div className="center">
                <MuiThemeProvider theme={theme}>
                  <MUIDataTable
                    title={"Sample Data"}
                    data={originalValues}
                    columns={originalKeys}
                    options={options}
                  />
                </MuiThemeProvider>
              </div>
            </div>
            <div className="right"></div>
          </div>
        </div>
      );
    }
  }
}
Upload.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Upload);