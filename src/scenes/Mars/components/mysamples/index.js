import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import "../../../../styles/mars.scss";
import { fetchUsercodeAndSamples } from "../../../../actions/mars";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",

    overflowX: "auto",
  },
  table: {
    minWidth: "100%",
    height: "2rem",
  },
  column: {
    whiteSpace: "normal",
    wordWrap: "break-word",
    width: "25%",
  },
});

class MySamples extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchUsercodeAndSamples(this.props.usercode);
  }

  openWindow(selectedRows, displayData) {
    let rows = [];
    for (var i = 0; i < selectedRows.data.length; i++) {
      let index = selectedRows.data[i].index;
      rows.push(index);
    }

    let samples = [];
    for (i = 0; i < rows.length; i++) {
      let index = rows[i];
      let sample = displayData[index].data[0];
      samples.push(sample);
    }

    for (i = 0; i < samples.length; i++) {
      let igsn = samples[i];
      var randomnumber = Math.floor(Math.random() * 100 + 1);
      window.open(
        `https://sesardev.geosamples.org/sample/igsn/${igsn}`,
        "_blank",
        "PopUp",
        randomnumber,
        "scrollbars=1,menubar=0,resizable=1,width=850,height=500"
      );
    }
  }

  render() {
    console.log(this.props);
    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "scroll",
      customToolbarSelect: (selectedRows, displayData) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.openWindow(selectedRows, displayData)}
          >
            View Webpage for Selected Samples
          </Button>
        </div>
      ),
    };

    let theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      overrides: {
        MUIDataTableSelectCell: {
          root: {
            backgroundColor: "#FFFF",
          },
        },
      },
    });

    if (this.props.loading === true || this.props.loading == undefined) {
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
    } else if (this.props.loading === false) {
      var columns = ["IGSN", "Name", "Latitude", "Longitude", "Elevation"];

      return (
        <div style={{ width: "100%", height: "100%" }}>
          <div className="centercontainer">
            <div id="left"></div>
            <div className="center">
              <div className="center">
                <MuiThemeProvider theme={theme}>
                  <MUIDataTable
                    title={"My Samples from SESAR Development Server"}
                    data={this.props.mySamplesList}
                    columns={columns}
                    options={options}
                  />
                </MuiThemeProvider>
              </div>
            </div>
            <div id="right"></div>
          </div>
        </div>
      );
    } else if (this.props.loading === false && this.props.rowData === false) {
      return (
        <div className="wrapperDiv">
          <div className="wapperCenter">
            <h1 className="nosampleNotice">No Samples Yet</h1>
            <h1 className="nosampleNotice">
              Click on Mapping to Begin Sample Registration
            </h1>
          </div>
        </div>
      );
    }
  }
}

MySamples.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    usercode: state.mars.usercode,
    mySamplesList: state.mars.mySamplesList,
    loading: state.mars.loading,
  };
}

const MySamplesPage = connect(
  mapStateToProps,
  { fetchUsercodeAndSamples }
)(MySamples);
export default withStyles(styles)(MySamplesPage);
