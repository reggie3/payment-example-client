import { combineReducers } from "redux";
import purchases from "./purchases";
import inventory from "./inventory";
import appState from "./appState";
import modals from "./modals";
import braintree from "./braintree";
import nav from "./nav";
import cart from "./cart";

import { reducer as formReducer } from "redux-form";

export default (rootReducer = combineReducers({
  purchases,
  inventory,
  appState,
  modals,
  braintree,
  nav,
  cart,
  form: formReducer
}));
