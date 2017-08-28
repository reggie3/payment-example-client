import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers/rootReducer";
import createPromiseMiddleware from "redux-promise-middleware";
import createSagaMiddleware from "redux-saga";
import * as MySagas from "./sagas";

export let defaultState = {
  appState: {},
  inventory: [{
        ID: 1,
        name: "tooth brushes",
        description: 'dental',
        price: '1.99'
    },
    {
        ID: 2,
        name: "dental floss",
        description: 'dental',
        price: '3.99'
    },
    {
        ID: 3,
        name: "baby oil",
        description: 'childcare',
        price: '3.50'
    },
    {
        ID: 4,
        name: "marshmallows",
        description: 'snacks',
        price: '1.99'
    }],
  purchases: {},
  cart:{
    totalPrice: 0.00,
    items:[]
  },
  modals: {
    showErrorDialog: {
      open: false,
      title: "Error Dialog test title",
      message: "Error Dialog test message"
    },
    showSuccessDialog: {
      open: false,
      title: "Success Dialog test title",
      message: "Success Dialog test message"
    },
    showPendingDialog: {
      open: false,
      message: "initial text"
    },
    showPaymentModal: {
      open: false,
      item: {}
    }
  },
  nav: {
   currentScreen: "Home",
   screenStack: ["Home"]
  }
};

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const promiseMiddleware = createPromiseMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(promiseMiddleware, sagaMiddleware, logger))
);

sagaMiddleware.run(MySagas.sagaHandleFormSubmitSuccess);
sagaMiddleware.run(MySagas.sagaShowPendingDialog);
// sagaMiddleware.run(MySagas.sagaHidePendingDialog);
sagaMiddleware.run(MySagas.sagaShowErrorDialog);
sagaMiddleware.run(MySagas.sagaShowSuccessDialog);
// sagaMiddleware.run(MySagas.sagaShowPurchaseModal);

