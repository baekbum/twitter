import * as types from '../action/ActionTypes';

const userReducer = (state = {}, action) => {
    switch(action.type) {
        case types.SAVE_USER:
            return { userObj : action.data }
        default:
            return state;
    }
}

export default userReducer;