import { combineReducers } from "redux";
import inventory from "./inventory";
import nav from "./nav";
import cart from "./cart";

export default (rootReducer = combineReducers({
  inventory,
  nav,
  cart,
}));
