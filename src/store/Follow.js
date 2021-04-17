import * as types from '../action/ActionTypes';

const followReducer = (state = { isFollow: false }, action) => {
    switch(action.type) {
        case types.FOLLOW_SHOW:
            return { isFollow: true }
        case types.FOLLOW_HIDE:
            return { isFollow: false }
        default:
            return state;
    }
}

export default followReducer;