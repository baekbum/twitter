import { combineReducers, createStore } from 'redux';
import userReducer from './User';
import searchReducer from './Search';
import followReducer from './Follow';
import followDataReducer from './FollowData';

const reducers = combineReducers({
    userReducer,
    searchReducer,
    followReducer,
    followDataReducer
});

const store = createStore(reducers);

export default store;