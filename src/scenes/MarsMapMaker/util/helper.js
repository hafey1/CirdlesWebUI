import { MULTI_VALUE_TITLES as MVT } from "./constants";
import moment from "moment";
import { element } from "prop-types";

//used in FieldCard
export const isMetaDataAddCard = cardID => {
  let totalAddedCards = 4;
  return cardID < totalAddedCards;
};

//used in FieldCard
export const lengthCheckedValue = fieldVal => {
  let value = fieldVal;
  if (value === "<METADATA_ADD>") {
    value = "";
  } else if (value.length > 25) {
    value = value.slice(0, 20);
    value = value + "...";
  }
  return value;
};

export const isSesarTitlePresent = (title, ent) => {
  let isPresent = false;
  for (let i = 0; i < ent.length; i++) {
    if (ent[i].sesarTitle === title) {
      isPresent = true;
      break;
    }
  }
  return isPresent;
};

//finds the last index in entries that contains an object with a key pair value of header:<METADATA_ADD>
//Used in CardList
export const lastMetaDataAdd = entries => {
  let lastPosition;
  try {
    for (let i = 0; i < entries.length; i++) {
      if (!entries.header.includes("<METADATA_ADD")) {
        lastPosition = i - 1;
        break;
      }
    }
    return lastPosition;
  } catch (error) {
    console.log(
      "In util/helper called from CardList this value must be greater than ---->: " +
        lastPosition
    );
    console.error();
  }
};

export const findFirstValueBySesarTitle = (entryStore, sesarTitle) => {
  let value = "defaultName";
  for (let i = 0; i < entryStore.length; i++) {
    if (entryStore[i].sesarTitle === sesarTitle) {
      value = entryStore[i].value;
      break;
    }
  }
  return value;
};

//gets default value for select and options in Dropdown from store
export const dropdownSet = (hasStoreLoaded, entryStore, idInStore) => {
  let defaultVal = "none";

  if (hasStoreLoaded && entryStore[idInStore].sesarTitle !== "") {
    defaultVal = entryStore[idInStore].sesarTitle;
  }
  return defaultVal;
};

//Used in PreviewModal
//filters entries for currently set mappings
export const dialogFilter = entries => {
  //filters to find all one to one mappings
  const singleVal = entries.filter(entry => {
    return (
      entry.sesarTitle !== "" &&
      entry.sesarTitle !== "none" &&
      !MVT.includes(entry.sesarTitle)
    );
  });
  //filters to find all multivalue mappings
  const multiVal = entries.filter(entry => {
    return MVT.includes(entry.sesarTitle);
  });

  const values = [];
  singleVal.forEach(element => {
    values.push([element.sesarTitle, [element.header]]);
  });

  //special formatting for multivalues to show organizational header
  //   and value
  MVT.forEach(title => {
    const eachVal = [];
    multiVal.forEach(element => {
      if (element.sesarTitle == title) {
        eachVal.push(element.header + " : " + element.value);
      }
    });
    if (eachVal.length > 0) {
      values.push([title, eachVal]);
    }
  });
  return values;
};

//Used in FieldCard to display date values in sesar's format
export const dateFormattedToSesar = (format, onScreenValue) => {
  let sesarDate = moment(onScreenValue, format).format("YYYY-MM-DD");
  let today = moment().format("YYYY-MM-DD");
  if (
    format.includes("YY") &&
    !format.includes("YYYY") &&
    moment(sesarDate).isAfter(today)
  ) {
    sesarDate = sesarDate.replace("20", "19");
  }
  return sesarDate + " T00:00:00Z";
};

// used in Mapoutput to create string that is multivalues mapped to sesar titles
// PRECONDITION: ent -> an array containing objects to track mappings
// POSTCONDITION: an array for possible values mapped to MVT's [sesarTitle, [sourceFields...]]
export const mapMultiOutputData = ent => {
  //create structure
  let multis = [];
  MVT.forEach(element => {
    multis.push([element, []]);
  });

  //fills structure
  multis.forEach(ele => {
    ele[1] = ent.filter(entEle => {
      if (ele[0] === entEle.sesarTitle) {
        return entEle;
      }
    });
  });

  return multis;
};

// used in Mapoutput to create string that is multivalues mapped to sesar titles
// PRECONDITION: an array for possible values mapped to MVT's [sesarTitle, [sourceFields...]]
// POSTCONDITION: a string that is formatted and joined from the nested array.
export const convertMultiData = mul => {
  // get sesarTitles headers from mul and format by enclosing in " "
  const multData = mul.map(ele => {
    return [
      ele[0],
      ele[1].map(sesarValues => {
        return `\"` + sesarValues.header + `"`;
      })
    ];
  });

  // formats each line
  let outputLines = [];
  multData.forEach(ele => {
    if (ele[1].length > 0) {
      let line = `  ${ele[0]}: [ ${ele[1].join(", ")} ]`;
      outputLines.push(line);
    }
  });

  return [outputLines.join(",\n")];
};

export const mapSinglesOutputData = ent => {
  const singleValues = ent.filter(ele => {
    return (
      ele.sesarTitle !== "none" &&
      ele.isGreen &&
      ele.sesarTitle !== "" &&
      ele.value !== "<METADATA_ADD>" &&
      !MVT.includes(ele.sesarTitle)
    );
  });
  return singleValues;
};

export const convertSinglesData = singles => {
  const singlesData = singles.map(ele => {
    return `  ${ele.sesarTitle}: "${ele.header}"`;
  });

  return [singlesData.join(",\n")];
};
