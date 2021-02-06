///////////////////////////////////////////////////////////////////////////////////
// CARDLIST.JS ///////////////////////////////////////////////////////////////////
// This component takes data from App.js and creates the cards displayed in UI //
// Renders and creates the toolbar and the fieldCards displayed in UI //////////
///////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// COMPONENTS

import FieldCard from "./FieldCard";

import HeaderFieldCard from "./cardListMenu/HeaderFieldCard";

import CardListMenu from "./cardListMenu/CardListMenu";
// CSS & Style
import "../../../styles/marsMapMaker.scss";

// REDUX
import { firstState, toggleInUse } from "../../../actions/marsMapMaker";

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

const CardList = props => {
  // global variables for the Object Array the Redux Store is built on along with the id accumulator

  const objArray = [];
  const useOnce = [];
  let newKey = -1;

  const [lastMetaDataAdd, incrementMetaDataAdd] = useState(3);
  const [fieldsState, addAFieldCardHead] = useState(props.fields);

  const [fieldValState, addAFieldCardVal] = useState(props.fieldVal);

  // used to toggle between the tuples of the csv loaded in
  const [toggleIndex, addToToggleIndex] = useState(1);

  // maps through fields and creates unique field card entry for each
  // hiding: value to hide entry or not
  // fieldTitle: column attribute of an entry
  // fieldType: defines if content is number or text
  // fieldValue: the content of an column attribute
  // hasContent: for initial filtering of checked cards
  // goes to the next row of content in the csv

  const downArrowToggle = () => {
    if (toggleIndex < props.tValLength) {
      addToToggleIndex((toggleIndex + 1) % props.tValLength);
      let obj = {
        bool: true
      };
      props.toggleInUse(obj);
    }
  };

  // goes to the previous row of content in the csv
  const upArrowToggle = () => {
    if (toggleIndex > 1) {
      addToToggleIndex((toggleIndex - 1) % props.toggleArr.length);
      let obj = {
        bool: true
      };
      props.toggleInUse(obj);
    }
    console.log(props.jsFileValues);
  };

  // returns to the first row of content in the csv
  const refreshButton = () => {
    addToToggleIndex(1);
    let obj = {
      bool: true
    };
    props.toggleInUse(obj);
  };

  // if a map (js) file is passed in, it searches for previous selections made to update the Redux store accordingly
  const findSesarPassIn = field => {
    let sesarPassIn = "";
    if (props.jsFileValues !== undefined) {
      for (let i = 0; i < props.jsFileValues.length; i++) {
        if (
          props.jsFileValues[i][1] !== undefined &&
          field === props.jsFileValues[i][1].replace(" ", "")
        ) {
          sesarPassIn = props.jsFileValues[i][0];
        }
      }
    }
    return sesarPassIn;
  };

  const valueIsInJsMappingFile = field => {
    let valid = false;
    if (props.jsFileValues !== undefined) {
      for (let i = 0; i < props.jsFileValues.length; i++) {
        if (props.jsFileValues[i][1] === field) valid = true;
      }
    }
    return valid;
  };

  const storeLoad = (ents, toggles) => {
    return ents.length > 0 && toggles.length > 0;
  };

  // maps content to separate fieldcards on the screen
  const fields = fieldsState.map(field => {
    newKey += 1;
    let storedValue = {};
    let sesarFind = findSesarPassIn(field);
    let fieldContentValue;
    let forcedIndex = -1;

    //hardcoded <METADATA_ADD> number 4
    //if metadata add else find where metadata index is
    if (newKey < 4 && props.jsFileValues !== undefined) {
      sesarFind = props.forceValues[newKey];
      forcedIndex = newKey;
    } else {
      forcedIndex = props.forceTitles.indexOf(field);
    }

    //if not metadata or metadata add
    if (forcedIndex === -1) {
      storedValue = {
        id: newKey,
        sesarTitle: sesarFind,
        oldValue: fieldValState[newKey],
        value: fieldValState[newKey],
        // this used to be id
        header: field,
        isDate: false,
        isMeasurement: false,
        isGreen: fieldValState[newKey] !== "" || valueIsInJsMappingFile(field)
      };
      fieldContentValue = fieldValState[newKey];
    } else {
      //if metadata
      if (newKey > lastMetaDataAdd) {
        storedValue = {
          id: newKey,
          sesarTitle: sesarFind,
          oldValue: fieldValState[newKey],
          value: props.forceValues[forcedIndex],
          // this used to be id
          header: "<METADATA>",
          isDate: false,
          isMeasurement: false,
          isGreen: fieldValState[newKey] !== "" || valueIsInJsMappingFile(field)
        };
        fieldContentValue = props.forceValues[forcedIndex];
      } else {
        if (
          newKey < props.persist.length &&
          props.persist[newKey].isMetaDataAdd
        ) {
          storedValue = {
            id: newKey,
            sesarTitle: props.persist[newKey].sesar,
            oldValue: fieldValState[newKey],
            value: props.forceValues[forcedIndex],
            // this used to be id
            header: "<METADATA_ADD>",
            isDate: false,
            isMeasurement: false,
            isGreen:
              fieldValState[newKey] !== "" || valueIsInJsMappingFile(field)
          };
        } else {
          storedValue = {
            id: newKey,
            sesarTitle: "",
            oldValue: fieldValState[newKey],
            value: props.forceValues[forcedIndex],
            // this used to be id
            header: "<METADATA_ADD>",
            isDate: false,
            isMeasurement: false,
            isGreen:
              fieldValState[newKey] !== "" || valueIsInJsMappingFile(field)
          };
        }
        fieldContentValue = props.forceValues[forcedIndex];
      }
    }

    // after object is created, append it to the object array & add one to the ID
    useOnce.push("");
    objArray.push(storedValue);

    // create the FieldCard that you see in the UI
    // If toggleIndex is 0 then we're on the 1st row so give it raw input
    // Else give it the object.values..
    // Meaning refer to Sample Row array created in store
    if (storeLoad(props.ent, props.toggleArr)) {
      if (toggleIndex === 1) {
        return (
          <FieldCard
            jsFileValues={props.jsFileValues}
            hiding={props.hide}
            fieldTitle={field}
            id={newKey}
            fieldValue={Object.values(props.toggleArr[toggleIndex])[newKey]}
            hasContent={
              props.fieldVal[newKey] !== "" || valueIsInJsMappingFile(field)
            }
          />
        );
      } else
        return (
          <FieldCard
            jsFileValues={props.jsFileValues}
            hiding={props.hide}
            fieldTitle={Object.keys(props.toggleArr[toggleIndex])[newKey]}
            id={newKey}
            fieldValue={Object.values(props.toggleArr[toggleIndex])[newKey]}
            hasContent={
              props.fieldVal[newKey] !== "" ||
              valueIsInJsMappingFile(
                Object.keys(props.toggleArr[toggleIndex])[newKey]
              )
            }
          />
        );
    }
  });

  // uses the action "firstState" with the argument "objArray" to create the Redux Store ***ONE TIME***
  useEffect(() => {
    const initObj = {
      objArr: objArray,
      useOnce: useOnce
    };
    props.firstState(initObj);
  }, []);

  const hideOrShow = () => {
    let final = "";
    if (props.hide) {
      final = "Show Unused Fields";
    } else {
      final = "Hide Unused Fields";
    }
    return final;
  };

  return (
    /////////////////////////
    // TOOLBAR /////////////
    ///////////////////////
    // Field Cards ///////
    /////////////////////

    <div>
      <div className="label">
        <div className="container-fluid">
          <CardListMenu
            toggleIndex={toggleIndex}
            refreshButton={() => refreshButton()}
            upArrowToggle={() => upArrowToggle()}
            downArrowToggle={() => downArrowToggle()}
            hideOrShow={() => hideOrShow()}
          />

          <HeaderFieldCard />
        </div>

        <div class="container-fluid">{fields}</div>
      </div>
      <div>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    hide: state.marsMapMaker.hide,
    ent: state.marsMapMaker.entries,
    persist: state.marsMapMaker.persistingMetaData,
    toggleArr: state.marsMapMaker.toggleArr
  };
};

export default connect(
  mapStateToProps,
  { firstState, toggleInUse }
)(CardList);
