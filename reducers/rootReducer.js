import { combineReducers } from 'redux';
import purchases from './purchases';
import inventory from './inventory';
import config from './config';

export default rootReducer = combineReducers({
    purchases,
    inventory,
    config
})