import { combineReducers, createStore } from 'redux';
import userReducer from './User';
import searchReducer from './Search';

const reducers = combineReducers({
    userReducer,
    searchReducer
});

const store = createStore(reducers);

export default store;