import * as types from '../action/ActionTypes';

const initObj = (display) => {
    if (display === 'WEB') {
        return null;
    } else if (display === 'MOBILE') {
        return { isTimeLine: false, isTweet: false, isSearch: false, isFollow: false };
    }    
};

const isShowReducer = (state = {isTimeLine: true, isTweet: false, isSearch: false, isFollow: false}, action) => {
    switch(action.type) {
        case types.TIMELINE_SHOW:
            action?.display === 'MOBILE' ? state = initObj('MOBILE') : initObj('WEB');
            state.isTimeLine = true;
            return Object.assign({}, state);
        case types.TIMELINE_HIDE:
            state.isTimeLine = false;
            return Object.assign({}, state);
        case types.TWEET_SHOW:
            action?.display === 'MOBILE' ? state = initObj('MOBILE') : initObj('WEB');
            state.isTweet = true;
            return Object.assign({}, state);
        case types.TWEET_HIDE:
            state.isTweet = false;
            return Object.assign({}, state);
        case types.SEARCH_SHOW:
            action?.display === 'MOBILE' ? state = initObj('MOBILE') : initObj('WEB');
            state.isSearch = true;
            return Object.assign({}, state);
        case types.SEARCH_HIDE:
            state.isSearch = false;
            return Object.assign({}, state);
        case types.FOLLOW_SHOW:
            action?.display === 'MOBILE' ? state = initObj('MOBILE') : initObj('WEB');
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