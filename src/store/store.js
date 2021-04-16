import { combineReducers, createStore } from 'redux';
import userReducer from './User';
import searchReducer from './Search';
import followReducer from './Follow';

const reducers = combineReducers({
    userReducer,
    searchReducer,
    followReducer
});

const store = createStore(reducers);

export default store;