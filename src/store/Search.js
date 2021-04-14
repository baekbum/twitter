import * as types from '../action/ActionTypes';

const searchReducer = (state = { isSearch: false }, action) => {
    switch(action.type) {
        case types.SEARCH_SHOW:
            return { isSearch: true }
        case types.SEARCH_HIDE:
            return { isSearch: false }
        default:
            return state;
    }
}

export default searchReducer;