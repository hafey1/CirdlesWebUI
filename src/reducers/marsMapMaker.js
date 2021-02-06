import update from "immutability-helper";

const initialState = {
  totalMultiCount: [
    {
      title: "size",
      count: 0
    },
    {
      title: "description",
      count: 0
    },
    {
      title: "sample_comment",
      count: 0
    },
    {
      title: "geological_age",
      count: 0
    },
    {
      title: "field_name",
      count: 0
    }
  ],
  persistingMetaData: [],
  toggleIndex: -1,
  toggleInUse: false,
  toggleArr: [],
  hasInit: false,
  hide: false,
  jsFile: undefined,
  entries: [],
  useOnce: [],
  centuryChosen: false,
  century: "",
  numOfOneToOne: 0,
  chosenDateFormat: null,
  hasChosenDateFormat: false,
  hasChosenDropdownOption: false,
  hasTwoYs: false,
  substringDateFormat: "start",
  fileMetadata: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "HIDE_FIELD":
      return { ...state, hide: !state.hide };

    case "STORE_FILE_METADATA":
      return {
        ...state,
        fileMetadata: [...state.fileMetadata, action.payload.files]
      };

    case "CHANGE_FORCED_CARD_VALUE_TO_OLD":
      return update(state, {
        entries: {
          [action.payload.index]: {
            value: { $set: "hello" }
          }
        }
      });

    case "PERSISTING_METADATA_CONCAT":
      return {
        ...state,
        persistingMetaData: state.persistingMetaData.concat(action.payload)
      };

    case "PERSISTING_METADATA_UPDATE":
      return update(state, {
        persistingMetaData: {
          [action.payload.index]: {
            value: { $set: action.payload.value }
          }
        }
      });

    case "TOTAL_MULTI_COUNT":
      return update(state, {
        totalMultiCount: {
          [action.payload.findex]: {
            title: { $set: action.payload.ftitle },
            count: { $set: action.payload.num }
          }
        }
      });

    // MAPPED_VALUE should happen one time, it initializes the redux store array
    case "MAPPED_VALUE":
      return {
        ...state,
        entries: state.entries.concat(action.payload.objArr),
        useOnce: state.useOnce.concat(action.payload.useOnce),
        hasInit: true
      };

    case "CHANGE_INIT":
      return {
        ...state,
        hasInit: true
      };

    case "FORCE_EDIT":
      return update(state, {
        entries: {
          [action.payload.index]: {
            value: { $set: action.payload.value },
            header: { $set: action.payload.header }
          }
        }
      });

    // DROPDOWN_UPDATE updates a specific object in the store "entries[id[" when option is clicked
    case "DROPDOWN_UPDATE":
      let dateSelected = false;
      let index = action.payload.id;
      let check = false;

      for (let i = 0; i < state.entries.length; i++) {
        if (
          state.entries[i].sesarSelected === "collection_end_date" ||
          state.entries[i].sesarSelected === "collection_start_date"
        ) {
          dateSelected = true;
        }
      }
      if (
        dateSelected === true ||
        (action.payload.sesarSelected === "collection_end_date" ||
          action.payload.sesarSelected === "collection_start_date")
      )
        check = true;

      return {
        ...state,
        hasChosenDropdownOption: check,

        // replaces entries: with every object from original state, replaces specified entries[id] with new object
        entries: [
          ...state.entries.slice(0, index),
          {
            id: action.payload.id,
            sesarTitle: action.payload.sesarSelected,
            oldValue: action.payload.oldValue,
            value: action.payload.value,
            header: action.payload.header,
            isDate: false,
            isMeasurement: false,
            isGreen: true
          },
          ...state.entries.slice(index + 1)
        ],

        useOnce: [
          ...state.useOnce.slice(0, index),
          action.payload.sesarSelected,
          ...state.useOnce.slice(index + 1)
        ]
      };

    case "SHOW_METADATA_CARD":
      return update(state, {
        entries: {
          [action.payload.id]: {
            isGreen: { $set: true }
          }
        }
      });

    case "CHOOSE_FORMAT":
      return {
        ...state,
        hasChosenDateFormat: true,
        chosenDateFormat: action.payload.dateFormat,
        hasTwoYs: action.payload.hasTwoYs
      };

    case "CENTURY":
      return {
        ...state,
        hasTwoYs: true,
        centuryChosen: true,
        century: action.payload.chosenCentury
      };

    case "REMOVE_SELECTION":
      let i = action.payload.id;

      return {
        ...state,
        entries: [
          ...state.entries.slice(0, i),
          {
            id: action.payload.id,
            sesarTitle: "",
            oldValue: action.payload.oldValue,
            value: action.payload.value,
            header: action.payload.header,
            isDate: false,
            isMeasurement: false,
            isGreen: action.payload.isGreen
          },
          ...state.entries.slice(i + 1)
        ]
      };

    case "SET_SUB":
      return update(state, {
        substringDateFormat: { $set: action.payload.substringDateFormat }
      });

    case "INIT_TOGGLE":
      return update(state, {
        toggleArr: { $set: action.payload.arr }
      });

    case "ADD_TO_TOGGLE_INDEX":
      return update(state, {
        toggleIndex: { $set: action.payload.index }
      });

    case "TOGGLE_IN_USE":
      return update(state, {
        toggleInUse: { $set: action.payload.bool }
      });

    default:
      return state;
  }
}
