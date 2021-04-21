import * as types from '../action/ActionTypes';

const followReducer = (state = { following : [], follower : [] }, action) => {
    switch(action.type) {
        case types.SAVE_FOLLOW:
            return { following : action.following, follower : action.follower }
        default:
            return state;
    }
}

export default followReducer;