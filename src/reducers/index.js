// @flow
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import ambapoReducer from "./ambapo";
import marsReducer from "./mars";
import marsMapMakerReducer from "./marsMapMaker";

const rootReducer = combineReducers({
  form: formReducer,
  ambapo: ambapoReducer,
  mars: marsReducer,
  marsMapMaker: marsMapMakerReducer
});

export default rootReducer;
