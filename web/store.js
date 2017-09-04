import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import createPromiseMiddleware from "redux-promise-middleware";
import createSagaMiddleware from "redux-saga";

export let defaultState = {
  componentState: {
    paymentStatus: undefined,
    showActivityIndicator: false,
    testData: 'this is some test data'
  },
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


