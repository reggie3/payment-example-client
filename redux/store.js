import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers/rootReducer";
import createPromiseMiddleware from "redux-promise-middleware";

export let defaultState = {
  inventory: [
    {
      ID: 1,
      name: "tooth brushes",
      description: "dental",
      price: "1.99"
    },
    {
      ID: 2,
      name: "dental floss",
      description: "dental",
      price: "3.99"
    },
    {
      ID: 3,
      name: "baby oil",
      description: "childcare",
      price: "3.50"
    },
    {
      ID: 4,
      name: "marshmallows",
      description: "snacks",
      price: "1.99"
    }
  ],

  cart: {
    totalPrice: 0.0,
    items: []
  },

  nav: {
    currentScreen: "Home",
    screenStack: ["Home"]
  }
};

const logger = createLogger();
const promiseMiddleware = createPromiseMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(promiseMiddleware, logger))
);
