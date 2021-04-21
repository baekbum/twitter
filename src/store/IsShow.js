import * as types from '../action/ActionTypes';

const initObj = {
    isTimeLine: true,
    isTweet: false,
    isSearch: false,
    isFollow: false
};

const isShowReducer = (state = initObj, action) => {
    switch(action.type) {
        case types.TIMELINE_SHOW:
            state.isTimeLine = true;
            return Object.assign({}, state);
        case types.TIMELINE_HIDE:
            state.isTimeLine = false;
            return Object.assign({}, state);
        case types.TWEET_SHOW:
            state.isTweet = true;
            return Object.assign({}, state);
        case types.TWEET_HIDE:
            state.isTweet = false;
            return Object.assign({}, state);
        case types.SEARCH_SHOW:
            state.isSearch = true;
            return Object.assign({}, state);
        case types.SEARCH_HIDE:
            state.isSearch = false;
            return Object.assign({}, state);
        case types.FOLLOW_SHOW:
            state.isFollow = true;
            return Object.assign({}, state);
        case types.FOLLOW_HIDE:
            state.isFollow = false;
            return Object.assign({}, state);
        default:
            return state;
    }
}

export default isShowReducer;