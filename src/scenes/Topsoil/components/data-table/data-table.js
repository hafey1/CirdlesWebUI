// @flow
import React, { Component } from 'react';
import Tabulator from "tabulator-tables";
import isEqual from "lodash.isequal";
import { NumberEditor, BooleanEditor, cellIsEditable } from './editors';

const labelColumn = {
  title: "Label",
  field: "title",
  width: 150,
  frozen: true
};

const selectedColumn = {
  title: "Selected",
  field: "selected",
  editor: BooleanEditor,
  formatter: "tickCross",
  align: "center",
  frozen: true
};

type DataRow = { label: string; selected: boolean; _children?: DataRow[]; }
type DataColumn = { name: string; field: string; columns?: DataColumn[]; }

type Props = {
  rows: DataRow[], 
  columns: DataColumn[],

  onCellEdited: Function
}

/**
 * A component that wraps an instance of Tabulator, for displaying and editing table data.
 */
export class DataTable extends Component<Props> {

  constructor(props) {
    super(props);

    this.tabulatorRef = React.createRef();

    this.state = {
      rows: [],
      columns: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const columns = [...nextProps.columns],
          rows = nextProps.rows;
    addEditorToLeafColumns(columns, rows);
    columns.unshift(labelColumn, selectedColumn);

    return {
      rows,
      columns
    }
  }

  componentDidMount() {
    this.tabulator = new Tabulator(this.tabulatorRef.current, {
      layout: "fitDataFill",
      height: "100%",
      dataTree: true,
      data: this.state.rows,
      columns: this.state.columns,
      placeholder: "No data loaded.",
      reactiveData: true,
      cellEdited: this.props.onCellEdited
    });
  }
  
  componentDidUpdate() {
    const { rows, columns } = this.state;

    // Only reload the tabulator if necessary
    if (! isEqual(columns, this.tabulator.getColumnDefinitions())) {
      this.tabulator.setColumns(columns);
    }
    // Only reload the tabulator if necessary
    if (! isEqual(rows, this.tabulator.getData())) {
      this.tabulator.setData(rows)
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() { 
    return (
      <div ref={this.tabulatorRef} className="data-table" />
    );
  }

}

/**
 * Recursively adds an editor to each leaf column in the provided column array. If all of the leaf row values
 * for a given column are numbers, then that column's editor is set to NumberEditor. Otherwise, a default text
 * input is used.
 * 
 * @param {DataColumn[]} columns 
 * @param {DataRow[]} rows 
 */
function addEditorToLeafColumns(columns, rows) {
  columns.forEach(col => {
    if (col.columns) {
      addEditorToLeafColumns(col.columns, rows);
      return;
    }
    col.editor = isNumberColumn(col.field, rows) ? NumberEditor : "input";
    col.editable = cellIsEditable;
  });
}

/**
 * Recursively checks the value for the provided column name in each leaf row. Returns true if all values are 
 * numbers, returns false if a non-number value is found.
 * 
 * @param {string} colName 
 * @param {DataRow[]} rows 
 */
function isNumberColumn(colName, rows) {
  let rtnval = true;
  for (let row of rows) {
    if (row._children) {
      if (!isNumberColumn(colName, row._children)) {
        rtnval = false;
        break;
      }
    } else if (typeof row[colName] !== "number") {
      rtnval = false;
      break;
    }
  }
  return rtnval;
}