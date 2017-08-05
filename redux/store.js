import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import createPromiseMiddleware from 'redux-promise-middleware';
import createSagaMiddleware from 'redux-saga';
import * as MySagas from './sagas';

export let defaultState = {
    appState:{

    },
    inventory:{

    },
    purchases:{

    }
}
