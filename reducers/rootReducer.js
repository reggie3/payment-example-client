import { combineReducers } from "redux";

import nav from "./nav";
import cart from "./cart";
import inventory from "./inventory";

import { reducer as formReducer } from "redux-form";

let rootReducer = combineReducers({
  nav,
  cart,
  inventory
});

export default rootReducer;