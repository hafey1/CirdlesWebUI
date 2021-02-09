////////////////////////////////////////////////////////////////////////////////
// APP.JS /////////////////////////////////////////////////////////////////////
// This component sets the stage for Mars Map Maker///////////////////////////
// It renders our two main components (FileIn.js and CardList.js)//
// Which handle the logic of the application ///////////////////////////////
///////////////////////////////////////////////////////////////////////////

import React from "react";

import classNames from "classnames";
// COMPONENTS
import CardList from "./components/CardList";
import FileIn from "./components/FileIn";
// REDUX
import { connect } from "react-redux";
import { initToggle } from "../../actions/marsMapMaker";

/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleValueLength: 0,
      emptyCards: [],
      toggleValuesArr: null,
      mapPreview: null,
      isOpened: false,
      jsFile: undefined,
      fieldNames: [],
      fieldValues: [],
      continue: false,
      forceTitles: [],
      forceValues: []
    };
  }

  // removes duplicates in an array
  findDuplicates = names => {
    let arr = [];
    let final;
    let i;
    let j;

    for (i = 0; i < names.length; i++) {
      for (j = 0; j < names.length; j++) {
        if (i !== j && !arr.includes(names[i])) {
          if (names[i] === names[j]) {
            arr = arr.concat(names[i]);
          }
        }
      }
    }
    final = arr;
    return final;
  };

  // removes duplicates from array
  removeDuplicates = (nameArr, valueArr) => {
    let names = nameArr;
    let values = valueArr;
    let i;
    let duplicateArr;
    let final;

    duplicateArr = this.findDuplicates(nameArr, valueArr);

    for (i = nameArr.length - 1; i >= 0; i--) {
      if (duplicateArr.includes(nameArr[i])) {
        duplicateArr.splice(duplicateArr.indexOf(nameArr[i]), 1);
        names.splice(i, 1);
        values.splice(i, 1);
      }
    }

    final = [names, values];

    return final;
  };

  // callback function that retrieves data from file, passed through FileIn.js
  // sets state of the the fieldNames, and fieldValues arrays used throughout program
  fileCallback = (
    datafromFile,
    totalSize,
    toggleValues,
    jsFile,
    numOfEmptyCards,
    forceTitles,
    forceValues
  ) => {
    let newCardObj = {};
    let tValues = toggleValues;

    for (let j = 0; j < numOfEmptyCards; j++) {
      newCardObj[j + "<METADATA_ADD>"] = "";
    }
    for (let i = 0; i < tValues.length; i++) {
      tValues[i] = { ...newCardObj, ...tValues[i] };
    }

    this.setState({
      emptyCards: Array(numOfEmptyCards).fill("<METADATA_ADD>")
    });
    let currentComponent = this;
    let newNames;
    let newValues;
    let processedValues;
    const toggleObj = {
      arr: tValues
    };
    const obj = {
      bool: true
    };

    this.setState({ jsFile: jsFile });

    this.props.initToggle(toggleObj);

    newNames = this.state.fieldNames.slice();
    newNames = newNames.concat(datafromFile[0]);

    newValues = this.state.fieldValues;
    newValues = newValues.concat(datafromFile[1]);

    processedValues = this.removeDuplicates(newNames, newValues);

    currentComponent.setState({
      toggleValueLength: tValues.length,
      fieldNames: processedValues[0],
      fieldValues: processedValues[1],
      continue: true,
      forceTitles: forceTitles,
      forceValues: forceValues
    });

    if (
      this.state.fieldNames.length -
        this.findDuplicates(newNames, newValues).length ===
      totalSize - this.findDuplicates(newNames, newValues).length
    ) {
    }
  };

  createSquiggleArray = () => {
    let arr = [];
    for (let i = 0; i < this.state.emptyCards.length; i++) {
      arr.push("_");
    }
    return arr;
  };

  render() {
    let readerClass = classNames({
      "mars-photo": this.state.continue === false,
      "mars-photo_hide": this.state.continue === true
    });

    return (
      <div className="pageBackground">
        <div className={readerClass}>
          <FileIn testID="FileIn" callbackFromParent={this.fileCallback} />
        </div>

        {this.state.continue ? (
          <CardList
            tValLength={this.state.toggleValueLength}
            jsFileValues={this.state.jsFile}
            fields={[...this.state.emptyCards, ...this.state.fieldNames]}
            toggleVals={this.state.toggleValuesArr}
            fieldVal={[
              ...this.createSquiggleArray(),
              ...this.state.fieldValues
            ]}
            forceTitles={this.state.forceTitles}
            forceValues={this.state.forceValues}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ent: state.entries,
    toggleArr: state.toggleArr
  };
};

export default connect(
  mapStateToProps,
  { initToggle }
)(App);
