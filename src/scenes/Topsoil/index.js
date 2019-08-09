// @flow
import React, { Component } from "react";
import { TOPSOIL_ENDPOINT } from "constants";
import axios from "axios";
import "tabulator-tables";
import Modal from "react-modal";
import Split from "react-split";
import { Variable, Option } from "topsoil-js";
import {
  UploadForm,
  DataTable,
  VariableChooser,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  TopsoilPlot,
  TopsoilPlotPanel
} from "./components";
import { DefaultOptions } from "./constants/defaults";
import { SampleRows, SampleColumns } from "./constants/sample-data";
import { colors } from "constants";

import "styles/topsoil.scss";

import verticalGrip from "img/vertical-grip.png";
import horizontalGrip from "img/horizontal-grip.png";

Modal.setAppElement("#root");

const styles = {
  modal: {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      maxWidth: "80%",
      maxHeight: "80%",
      transform: "translate(-50%, -50%)"
    }
  },
  loadContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    fontSize: "3em",
    backgroundColor: colors.lightGray + "cc",
    backgroundOpacity: 0.5
  },
  loadIndicator: {
    padding: "0.5em 0.75em"
  },
  pageContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%"
  },
  toolbarButton: {
    margin: "0.25em"
  },
  mainContainer: {
    flexGrow: 1,
    height: "calc(100% - 0.5em)",
    maxWidth: "calc(100% - 7.75em)",
    border: "0.25em solid " + colors.darkGray
  },
  mainSplit: {
    position: "relative"
  },
  rightSplit: {
    display: "inline-block",
    position: "absolute",
    top: 0,
    height: "100%"
  },
  tableContainer: {
    float: "left",
    height: "calc(100% - 2px)"
  },
  splitElement: (dimension, elementSize, gutterSize, index) => {
    const style = {};
    style[dimension] = `calc(${elementSize}% - ${gutterSize + 1}px)`;
    return style;
  },
  splitGutter: (dimension, gutterSize, index) => {
    const style = {
      backgroundRepeat: "no-repeat",
      backgroundColor: colors.topsoilLight,
      backgroundPosition: "center",
      border: "solid " + colors.topsoilDark,
    }
    style[dimension] = `${gutterSize}px`;
    if (dimension === "width") {
      style.display = "inline-block";
      style.height = "100%";
      style.borderWidth = "0 1px 0 1px";
      style.backgroundImage = `url(${verticalGrip})`
    } else {
      style.width = "100%"
      style.borderWidth = "1px 0 1px 0";
      style.backgroundImage = `url(${horizontalGrip})`
    }
    return style;
  }
};

const initialState = {
  selectedTableFile: null,
  template: "DEFAULT",
  table: {
    rows: [],
    columns: [],
    variables: {},
    unctFormat: "abs"
  },
  plot: {
    data: [],
    options: DefaultOptions
  },
  split: {
    horizontal: [40, 60],
    vertical: [70, 30]
  },
  varChooserIsOpen: false,
  uploadFormIsOpen: false,
  isLoading: false
};
type State = Readonly<typeof initialState>;

class TopsoilPage extends Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.plotComponent = React.createRef();
    this.dataTable = React.createRef();

    this.handleLoadSampleData = this.handleLoadSampleData.bind(this);

    this.handleOpenVarChooser = this.handleOpenVarChooser.bind(this);
    this.handleSubmitVarChooser = this.handleSubmitVarChooser.bind(this);
    this.handleCloseVarChooser = this.handleCloseVarChooser.bind(this);

    this.handleOpenUploadForm = this.handleOpenUploadForm.bind(this);
    this.handleSubmitUploadForm = this.handleSubmitUploadForm.bind(this);
    this.handleCloseUploadForm = this.handleCloseUploadForm.bind(this);
    this.handleClearTableData = this.handleClearTableData.bind(this);

    this.handleChangeTableFile = this.handleChangeTableFile.bind(this);
    this.handleChangeTemplate = this.handleChangeTemplate.bind(this);

    this.handleHorizontalSplitSizeChange = this.handleHorizontalSplitSizeChange.bind(
      this
    );
    this.handleVerticalSplitSizeChange = this.handleVerticalSplitSizeChange.bind(
      this
    );

    this.handleUpdatePlotState = this.handleUpdatePlotState.bind(this);
    this.handlePlotZoomed = this.handlePlotZoomed.bind(this);
    this.handleSetExtents = this.handleSetExtents.bind(this);
    this.handleSnapToConcordia = this.handleSnapToConcordia.bind(this);
    this.handlePlotOptionChange = this.handlePlotOptionChange.bind(this);
    this.handleClearPlot = this.handleClearPlot.bind(this);
  }

  componentDidMount() {
    const savedState = JSON.parse(localStorage.getItem("topsoil_state"));
    if (savedState) this.setState(savedState);
  }

  componentDidUpdate() {
    localStorage.setItem("topsoil_state", JSON.stringify(this.state));
  }

  handleLoadSampleData() {
    const table = { ...this.state.table };
    table.rows = SampleRows;
    table.columns = SampleColumns;
    table.variables = {
      "x": "207Pb*/235U",
      "sigma_x": "±2σ (%)",
      "y": "206Pb*/238U",
      "sigma_y": "±2σ (%)(1)",
      "rho": "corr coef"
    };
    table.unctFormat = "%";

    const plot = { ...this.state.plot };
    plot.data = calculatePlotData(table.rows, table.variables, table.unctFormat);

    this.setState({ table, plot });
  }

  handleChangeTableFile(event) {
    this.setState({
      selectedTableFile: event.target.files[0]
    });
  }

  handleChangeTemplate(event) {
    this.setState({
      template: event.target.value
    });
  }

  handleOpenUploadForm() {
    this.setState({ uploadFormIsOpen: true });
  }

  handleSubmitUploadForm() {
    this.setState({ loading: true });

    const data = new FormData(),
      { selectedTableFile, template } = this.state;
    if (selectedTableFile !== null && template !== null) {
      data.append("tableFile", selectedTableFile);
      data.append("template", template);

      const table = {...this.state.table};

      axios
        .post(TOPSOIL_ENDPOINT, data)
        .then(response => {
          table.rows = response.data.data;
          table.columns = response.data.columns;
          this.setState({ table }, this.setState({ loading: false }));
        })
        .catch(error => {
          console.error(error);
        });
    }
    this.handleCloseUploadForm();
  }

  handleCloseUploadForm() {
    this.setState({ uploadFormIsOpen: false });
  }

  handleClearTableData() {
    const table = { ...this.state.table };
    table.rows = [];
    table.columns = [];
    this.setState({ table });
  }

  handleOpenVarChooser() {
    this.setState({ varChooserIsOpen: true });
  }

  handleSubmitVarChooser(variables, unctFormat) {
    const table = { ...this.state.table };
    table.variables = variables;
    table.unctFormat = unctFormat;

    this.setState({ table }, () => {
      this.handleUpdatePlotState(true);
    });
    this.handleCloseVarChooser();
  }

  handleCloseVarChooser() {
    this.setState({ varChooserIsOpen: false });
  }

  handleClearPlot() {
    const table = {...this.state.table};
    table.variables = {};
    this.setState({ table }, this.handleUpdatePlotState);
  }

  handlePlotZoomed(xDomain, yDomain) {
    const plot = { ...this.state.plot };
    plot.options[Option.X_MIN] = xDomain[0];
    plot.options[Option.X_MAX] = xDomain[1];
    plot.options[Option.Y_MIN] = yDomain[0];
    plot.options[Option.Y_MAX] = yDomain[1];
    this.setState({ plot });
  }

  handleSetExtents(xMin, xMax, yMin, yMax) {
    const {
      current: { instance }
    } = this.plotComponent;
    if (instance) instance.changeAxisExtents(xMin, xMax, yMin, yMax, true);
  }

  handleSnapToConcordia() {
    const {
      current: { instance }
    } = this.plotComponent;
    if (instance) instance.snapToConcordia();
  }

  handleRefreshPlot() {
    if (!this.plotComponent.current) return;

    const {
      current: { instance }
    } = this.plotComponent;
    if (instance) instance.update();
  }

  handlePlotOptionChange(option, newValue) {
    const plot = { ...this.state.plot };
    plot.options[option] = newValue;
    this.setState({ plot });
  }

  handleHorizontalSplitSizeChange(sizes) {
    const split = { ...this.state.split };
    split.horizontal = sizes;
    this.setState({ split });
  }

  handleVerticalSplitSizeChange(sizes) {
    const split = { ...this.state.split };
    split.vertical = sizes;
    this.setState({ split });
  }

  handleUpdatePlotState(resetView) {
    const { rows, variables, unctFormat } = this.state.table,
          plot = { ...this.state.plot };
    if (Object.entries(variables).length > 0) {
      plot.data = calculatePlotData(rows, variables, unctFormat);
      plot.options[Option.X_AXIS] = variables[Variable.X];
      plot.options[Option.Y_AXIS] = variables[Variable.Y];
    } else {
      plot.data = [];
    }
    this.setState({ plot }, () => {
      if (resetView !== true) return;
      const instance = this.plotComponent.current.instance;
      if (instance) instance.resetView();
    });
  }

  render() {
    const { template, selectedTableFile, table, plot } = this.state;

    let loader;
    if (this.state.loading) {
      loader = <div style={styles.loadContainer}><span style={styles.loadIndicator}>Loading...</span></div>;
    }

    return (
      <React.Fragment>
        <div style={styles.pageContainer} className="topsoil-page">
          <Modal
            isOpen={this.state.varChooserIsOpen}
            onRequestClose={this.handleCloseVarChooser}
            style={styles.modal}
            contentLabel="Variable Chooser"
            aria={{
              labelledby: "var-chooser-heading",
              describedby: "var-chooser-desc"
            }}
          >
            <h2 id="var-chooser-heading">Variable Chooser</h2>
            <p id="var-chooser-desc">
              Use this form to select which data columns correspond to specific
              plotting variables.
            </p>
            <VariableChooser
              columns={table.columns}
              onSubmit={this.handleSubmitVarChooser}
              variables={this.state.table.variables}
              requiredVars={[Variable.X, Variable.Y]}
              unctFormat={this.state.table.unctFormat}
            />
          </Modal>

          <Modal
            isOpen={this.state.uploadFormIsOpen}
            onRequestClose={this.handleCloseUploadForm}
            style={styles.modal}
            contentLabel="Data Uploader"
            aria={{
              labelledby: "upload-form-heading",
              describedby: "upload-form-desc"
            }}
          >
            <h2 id="upload-form-heading">Data Uploader</h2>
            <p>Use this form to select a data file to upload.</p>
            <UploadForm
              tableFile={selectedTableFile}
              template={template}
              onSubmit={this.handleSubmitUploadForm}
              onChangeTableFile={this.handleChangeTableFile}
              onChangeTemplate={this.handleChangeTemplate}
            />
          </Modal>

          <Toolbar>
            <ToolbarButton 
              text="Load Sample Data"
              onClick={this.handleLoadSampleData}
              margin={styles.toolbarButton.margin}
            />
            <ToolbarButton
              text="Upload Data"
              onClick={this.handleOpenUploadForm}
              margin={styles.toolbarButton.margin}
            />
            <ToolbarButton
              text="Clear Data"
              onClick={this.handleClearTableData}
              disabled={table.rows.length === 0}
              margin={styles.toolbarButton.margin}
            />
            <ToolbarSeparator />
            <ToolbarButton
              text="Generate Plot"
              onClick={this.handleOpenVarChooser}
              disabled={table.rows.length === 0}
              margin={styles.toolbarButton.margin}
            />
            <ToolbarButton
              text="Clear Plot"
              onClick={this.handleClearPlot}
              disabled={Object.entries(table.variables).length === 0}
              margin={styles.toolbarButton.margin}
            />
          </Toolbar>

          <div style={styles.mainContainer}>
            <Split
              sizes={this.state.split.horizontal}
              direction="horizontal"
              onDrag={sizes => {
                this.handleRefreshPlot();
              }}
              onDragEnd={this.handleHorizontalSplitSizeChange}
              style={styles.mainSplit}
              elementStyle={styles.splitElement}
              gutterSize={10}
              gutterStyle={styles.splitGutter}
            >
              <div style={styles.tableContainer}>
                <DataTable
                  ref={this.dataTable}
                  rows={table.rows || []}
                  columns={table.columns || []}
                  onCellEdited={this.handleUpdatePlotState}
                />
              </div>

              <Split
                sizes={this.state.split.vertical}
                direction="vertical"
                onDrag={sizes => {
                  this.handleRefreshPlot();
                }}
                onDragEnd={this.handleVerticalSplitSizeChange}
                style={styles.rightSplit}
                elementStyle={styles.splitElement}
                gutterSize={10}
                gutterStyle={styles.splitGutter}
              >
                <TopsoilPlot
                  ref={this.plotComponent}
                  plot={plot}
                  onZoomEnd={this.handlePlotZoomed}
                />
                <TopsoilPlotPanel
                  plot={plot}
                  onOptionChanged={this.handlePlotOptionChange}
                  onSetExtents={this.handleSetExtents}
                  snapToWetherillConcordia={this.handleSnapToConcordia}
                />
              </Split>
            </Split>
          </div>
        </div>
        {loader}
      </React.Fragment>
    );
  }
}

export default TopsoilPage;

function calculatePlotData(rows, variables, unctFormat, rtnval) {
  rtnval = rtnval || [];
  rows.forEach(row => {
    if (row._children) {
      rtnval.concat(calculatePlotData(row._children, variables, unctFormat, rtnval));
    } else {
      const entry = {};
      let colName;
      for (let v in variables) {
        colName = variables[v];
        entry[v] = row[colName];
      }
      if (Variable.TITLE in row) {
        entry[Variable.TITLE] = row[Variable.TITLE];
      }
      if (Variable.SELECTED in row) {
        entry[Variable.SELECTED] = row[Variable.SELECTED];
      }
      if (Variable.VISIBLE in row) {
        entry[Variable.VISIBLE] = row[Variable.VISIBLE];
      }
      if (unctFormat === "%") {
        if (Variable.SIGMA_X in entry) {
          entry[Variable.SIGMA_X] =
            entry[Variable.X] * (entry[Variable.SIGMA_X] / 100);
        }
        if (Variable.SIGMA_Y in entry) {
          entry[Variable.SIGMA_Y] =
            entry[Variable.Y] * (entry[Variable.SIGMA_Y] / 100);
        }
      }
      rtnval.push(entry);
    }
  });
  return rtnval;
}
