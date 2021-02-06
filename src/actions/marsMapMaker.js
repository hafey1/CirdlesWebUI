// initializes the redux store with the objArray from 'fields' in Cardlist.js
export const firstState = initalArray => {
  return {
    type: "MAPPED_VALUE",
    payload: initalArray
  };
};

// updates entries[id] in the redux store based on the option clicked
export const dropdownUpdate = dropObj => {
  return {
    type: "DROPDOWN_UPDATE",
    payload: dropObj
  };
};

// adds the date format selected to the redux store

export const formatDate = chosenObj => {
  return {
    type: "CHOOSE_FORMAT",
    payload: chosenObj
  };
};

export const century = obj => {
  return {
    type: "CENTURY",
    payload: obj
  };
};

export const removeContent = obj => {
  return {
    type: "REMOVE_SELECTION",
    payload: obj
  };
};

export const isDate = obj => {
  return {
    type: "IS_DATE",
    payload: obj
  };
};

export const addToSizeArray = obj => {
  return {
    type: "ADD_TO_SIZE_ARRAY",
    payload: obj
  };
};

export const clearSizeArray = obj => {
  return {
    type: "REMOVE_ITEM_SIZE_ARRAY",
    payload: obj
  };
};

export const clearSingleMeasureArray = obj => {
  return {
    type: "CLEAR_SINGLE_MEASURE",
    payload: obj
  };
};

export const addSingleMeasure = obj => {
  return {
    type: "ADD_SINGLE_MEASURE",
    payload: obj
  };
};

export const setSecondToSize = obj => {
  return {
    type: "SET_SECOND",
    payload: obj
  };
};

export const setSubstringDateFormat = obj => {
  return {
    type: "SET_SUB",
    payload: obj
  };
};

export const changeInit = obj => {
  return {
    type: "CHANGE_INIT"
  };
};

export const initToggle = obj => {
  return {
    type: "INIT_TOGGLE",
    payload: obj
  };
};

export const addToggleIndex = obj => {
  return {
    type: "ADD_TO_TOGGLE_INDEX",
    payload: obj
  };
};

export const toggleInUse = obj => {
  return {
    type: "TOGGLE_IN_USE",
    payload: obj
  };
};

export const totalMultiValueCount = obj => {
  return {
    type: "TOTAL_MULTI_COUNT",
    payload: obj
  };
};

export const forceEdit = obj => {
  return {
    type: "FORCE_EDIT",
    payload: obj
  };
};

export const persistingDataConcat = obj => {
  return {
    type: "PERSISTING_METADATA_CONCAT",
    payload: obj
  };
};

export const persistingDataUpdate = obj => {
  return {
    type: "PERSISTING_METADATA_UPDATE",
    payload: obj
  };
};

export const setForcedOldToNew = obj => {
  return {
    type: "CHANGE_FORCED_CARD_VALUE_TO_OLD",
    payload: obj
  };
};

export const setFileMetadata = obj => {
  return {
    type: "STORE_FILE_METADATA",
    payload: obj
  };
};

export const hideField = () => {
  return {
    type: "HIDE_FIELD"
  };
};
