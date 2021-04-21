import { combineReducers, createStore } from 'redux';
import userReducer from './User';
import followReducer from './Follow';
import isShowReducer from './IsShow';

const reducers = combineReducers({
    userReducer,
    followReducer,
    isShowReducer
});

const store = createStore(reducers);

export default store;