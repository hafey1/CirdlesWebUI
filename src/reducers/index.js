// @flow
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import ambapoReducer from "./ambapo";
import marsReducer from "./mars";

const rootReducer = combineReducers({
  form: formReducer,
  ambapo: ambapoReducer,
  mars: marsReducer
});

export default rootReducer;
