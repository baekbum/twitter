import * as types from '../action/ActionTypes';

const followReducer = (state = { isFriend: false }, action) => {
    switch(action.type) {
        case types.FOLLOW_SHOW:
            return { isFriend: true }
        case types.FOLLOW_HIDE:
            return { isFriend: false }
        default:
            return state;
    }
}

export default followReducer;