import * as types from '../action/ActionTypes';

const followDataReducer = (state = { following : [], follower : [] }, action) => {
    switch(action.type) {
        case types.SAVE_FOLLOW:
            return { following : action.following, follower : action.follower }
        default:
            return state;
    }
}

export default followDataReducer;