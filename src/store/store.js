import { createStore } from 'redux';
import defaultImage from '../image/default.png';

const initUser = (user) => {
    let userObj = null;
    if (user) {
        const userData = user.providerData[0];
        userObj = {
            uid : user.uid,
            displayName : userData.displayName,
            email : userData.email,
            phoneNumber : userData.phoneNumber,
            photoURL : userData.photoURL||defaultImage,
            updateProfile : (args) => user.updateProfile(args)
        }
    } else {
        userObj = {
            uid : '',
            displayName : '',
            email : '',
            phoneNumber : '',
            photoURL : '',
            updateProfile : null
        }
    }    
    
    return {type: 'INIT', data: userObj};
};

const userReducer = (state = {}, action) => {
    return action.data;
}

const store = createStore(userReducer);

export const fnUser = {
    initUser
};

export default store;