
import inventoryActions from './inventoryActions';
import purchasesActions from './purchasesActions';
import appState from './appState';

const actions ={
   inventoryActions,
   purchasesActions,
   appState
};

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const promiseMiddleware = createPromiseMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    defaultState, composeEnhancers(
        applyMiddleware(
            promiseMiddleware, sagaMiddleware,
            logger,
        ))
);
export default actions;