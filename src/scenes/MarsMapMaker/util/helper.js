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

//used in FieldCard
export const getOne2One = optionArray => {
  let arr = [];
  for (let i = 0; i < optionArray.length; i++) {
    if (optionArray[i].format === "one2one") arr.push(optionArray[i].title);
  }
  return arr;
};

export const typeField = (keyNum, totalMetaDataAdd) => {
  let type;

  if (keyNum > totalMetaDataAdd) type = "both";
  else {
    type = "added_card";
  }
  return type;
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

//gets defalut value for select and options in Dropdown from store
export const dropdownSet = (hasStoreLoaded, entryStore, idInStore) => {
  let defaultVal = "Sesar_Selection";

  if (hasStoreLoaded && entryStore[idInStore].sesarTitle !== "") {
    defaultVal = entryStore[idInStore].sesarTitle;
  }
  return defaultVal;
};
