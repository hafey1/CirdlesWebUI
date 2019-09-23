import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

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

class MySamples extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: ["IGSN", "Name", "Latitude", "Longitude", "Elevation"],
      rowData: [{}],
      loading: true
    };

    this.sendRequest = this.sendRequest.bind(this);
  }

  componentDidMount() {
    this.sendRequest(0);
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

  sendRequest(num) {
    //Reset state everytime new information needs to be put into state
    this.setState({
      rowData: [],
      loading: true,
      page_no: this.state.page_no + num
    });

    //API Request: Get IGSNs
    axios
      .get(
        `https://sesardev.geosamples.org/samples/user_code/${this.props.usercode}`
      )
      .then(response => {
        const length = response.data.igsn_list.length;
        response.data.igsn_list.map((igsn, i) => {
          //API Request: Get other information for each IGSN
          axios
            .get(
              `https://sesardev.geosamples.org/webservices/display.php?igsn=${igsn}`
            )
            .then(response => {
              //Grabbing each piece of information needed and updating state as needed.
              const sampleName = response.data.sample.name;
              const latitudes = response.data.sample.latitude;
              const longitudes = response.data.sample.longitude;
              const elevations = response.data.sample.elevation;
              this.setState({
                rowData: [
                  ...this.state.rowData,
                  {
                    IGSN: igsn,
                    Name: sampleName,
                    Latitude: latitudes,
                    Longitude: longitudes,
                    Elevation: elevations
                  }
                ]
              });

              if (this.state.rowData.length === length) {
                //Allow the information to be rendered.
                this.setState({ loading: false });
              }
            });
        });
      })
      //Throw an error if the GET request don't come through
      .catch(error => {
        console.log(error);
        if (error.response.status === 404) {
          console.log("error 404");
          var pageBeforeError = this.state.page_no - 1;
          this.setState({ page_no: pageBeforeError });
          this.sendRequest(0);
        }
      });
  }

  render() {
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
      )
    };

    let theme = createMuiTheme({
      overrides: {
        MUIDataTableSelectCell: {
          root: {
            backgroundColor: "#FFFF"
          }
        }
      }
    });

    if (this.state.loading === true) {
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
    } else {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <div className="container">
            <div id="left"></div>
            <div className="center">
              <div className="center">
                <MuiThemeProvider theme={theme}>
                  <MUIDataTable
                    title={"My Samples"}
                    data={this.state.rowData}
                    columns={this.state.columnDefs}
                    options={options}
                  />
                </MuiThemeProvider>
              </div>
            </div>
            <div id="right"></div>
          </div>
        </div>
      );
    }
  }
}

MySamples.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    usercode: state.mars.usercode
  };
}

const MySamplesPage = connect(mapStateToProps)(MySamples);
export default withStyles(styles)(MySamplesPage);
