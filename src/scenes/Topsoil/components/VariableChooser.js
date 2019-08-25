// @flow
import React, { Component } from "react";
import { Variable } from "topsoil-js";
import { Collapse, LeftLabelledSelect } from "components/bootstrap";

const numberVariables = [
  Variable.X,
  Variable.SIGMA_X,
  Variable.Y,
  Variable.SIGMA_Y,
  Variable.RHO
]

type Props = {
  columns: [],
  /** An object in which each key is the name of a variable, and each value is the name of a column. */
  varMap: {},
  /** The INITIAL format of the error/uncertainty values provided (may be % or abs). */
  unctFormat: string,
  /** Variables that are required for the submission of the variable chooser. */
  requiredVars: [],
 
  onSubmit: Function
};

type State = {
  /** An object in which each key is the name of a column, and each value is the name of a variable. 
   *  Not to be confused with the prop varMap, which has variable-name keys and column-name values. */
  selections: [],
  /** An object in which each key is the name of a parent column, and each value is a boolean representing
   *  the collapsed state of the parent columns corresponding Collapse component. */
  collapse: {},
  /** The CURRENT format of the error/uncertainty values provided (may be % or abs). */
  unctFormat: string,
  /** An error message to be displayed next to the Submit button. */
  errorMessage: string
}

/**
 * Component responsible for the selection of variable/column associations. Leaf columns in the table data may be 
 * associated with plotting variables.
 */
class VariableChooser extends Component<Props, State> {
  constructor(props) {
    super(props);

    const { variables, columns, unctFormat } = this.props,
          selections = {};
    for (let key in variables) {
      if (variables.hasOwnProperty(key)) {
        selections[variables[key]] = key;
      }
    }

    this.state = {
      selections,
      collapse: getInitialCollapseState(columns),
      unctFormat,
      errorMessage: ""
    };

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleChangeUnctFormat = this.handleChangeUnctFormat.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Occurs when a user selects a variable to associate with a leaf column.
   * 
   * @param {string} colName 
   * @param {string} varName 
   */
  handleSelectionChange(colName, varName) {
    const selections = { ...this.state.selections };
    
    // If this variable is already selected for a different column, delete that selection
    for (let col in selections) {
      if (selections.hasOwnProperty(col) && selections[col] === varName) {
        delete selections[col];
      }
    }

    // If the new selection for this column is empty, remove it from selections
    if (varName === "") {
      delete selections[colName];
    } else {
      selections[colName] = varName;
    }

    this.setState({ selections });
  }

  /**
   * Occurs when the user changes the error/uncertainty format.
   * 
   * @param {React.SyntheticEvent} event 
   */
  handleChangeUnctFormat(event) {
    this.setState({ unctFormat: event.target.value });
  }

  /**
   * Occurs when the user submits the variable chooser form.
   */
  handleSubmit() {
    const { selections, unctFormat } = this.state,
          variables = {};
    for (let colName in selections) {
      if (selections.hasOwnProperty(colName)) {
        variables[selections[colName]] = colName;
      }
    }

    // Check that required variables are selected; otherwise display error message and return.
    const { requiredVars } = this.props;
    if (requiredVars) {
      for (let v of requiredVars) {
        if (!(v in variables)) {
          this.setState({ errorMessage: "Missing required variable: " + v })
          return;
        }
      }
    }

    this.props.onSubmit(variables, unctFormat);
  }

  /**
   * Occurs when the user toggles the collapse state for a parent column.
   * 
   * @param {string} colName 
   */
  handleToggleCollapse(colName) {
    const collapse = {...this.state.collapse};
    collapse[colName] = !collapse[colName];
    this.setState({ collapse });
  }

  render() {
    const { selections } = this.state,
          selectionItems = [];
    for (let column in selections) {
      if (selections.hasOwnProperty(column)) {
        const variable = selections[column];
        selectionItems.push(
          <li 
            key={`${variable}-selected-item`}
          >
            {`${variable} => ${column}`}
          </li>
        );
      }
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="m-2 overflow-auto col">
              {this.props.columns.map(column => {
                if (column.columns) {
                  return this.renderParentColumnItem(column);
                } else {
                  return this.renderLeafColumnItem(column);
                }
              })}
            </div>
            <ul className="col list-unstyled mx-0 mb-auto p-2 border border-dark overflow-auto rounded">
              {selectionItems.length === 0 ? "No selections." : selectionItems}
            </ul>
          </div>
          
        </div>
        <div className="row my-2">
          <div className="col">
            <LeftLabelledSelect
              id="errorFormatSelect"
              label="Error&nbsp;Format:"
              value={this.state.unctFormat}
              onChange={this.handleChangeUnctFormat}
            >
              <option value="abs">abs</option>
              <option value="%">%</option>
            </LeftLabelledSelect>
          </div>
        </div>
        
        <div className="row">
          <div className="col text-center">
            <button className="btn btn-outline-topsoil" onClick={this.handleSubmit}>Submit</button>
            <span className="text-danger ml-3">{this.state.errorMessage}</span>
          </div>
        </div>
        
      </div>
    );
  }

  /**
   * Renders a Collapse component for the provided parent column.
   * 
   * @param {*} column 
   */
  renderParentColumnItem(column) {
    const { title: colName } = column;
    return (
      <Collapse
        id={`${colName}-collapse`}
        key={`${colName}-collapse`}
        label={colName}
        collapsed={this.state.collapse[colName]}
        onClick={() => this.handleToggleCollapse(colName)}
      >
        {column.columns.map(child => {
          if (child.columns) {
            return this.renderParentColumnItem(child);
          } else {
            return this.renderLeafColumnItem(child);
          }
        })}
      </Collapse>
    );
  }

  /**
   * Renders a Select component for the provided leaf column.
   * 
   * @param {*} column 
   */
  renderLeafColumnItem(column) {
    const { title: colName } = column,
          { selections } = this.state;
    return (
      <LeftLabelledSelect
        id={`${colName}-select`}
        key={`${colName}-select`}
        label={colName + ":"}
        value={selections.hasOwnProperty(colName) ? selections[colName] : ""}
        onChange={event => this.handleSelectionChange(colName, event.target.value)}
      >
        <option key={`${colName}-option-default`} value=""></option>
        {numberVariables.map(v => <option key={`${colName}-option-${v}`} value={v}>{v}</option>)}
      </LeftLabelledSelect>
    );
  }

}

export default VariableChooser;

/**
 * Recursively generates an object representing the initial collapsed state for each parent column in the provided 
 * list of columns.
 * 
 * @param {*} columns
 * @param {*} rtnval 
 */
function getInitialCollapseState(columns, rtnval) {
  rtnval = rtnval || {};
  columns.forEach(col => {
    if (col.columns) {
      rtnval[col.title] = true;
      getInitialCollapseState(col.columns, rtnval);
    }
  });
  return rtnval;
}