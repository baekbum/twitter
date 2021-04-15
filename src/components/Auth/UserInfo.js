import { authService, dbService } from 'Database';
import defaultImage from '../../image/default.png';
import * as actions from '../../action/Action';

export const setUserDB = async () => {
    const curUser = authService.currentUser;
    const userData = curUser.providerData[0];
    const user = {
        uid : curUser.uid,
        displayName : userData.displayName,
        email : userData.email,
        phoneNumber : userData.phoneNumber,
        photoURL : userData.photoURL||defaultImage,
        tagId : `@${curUser.uid}`
    };
    
    await dbService.collection('userInfo').add(user);
};

export const getUserDB =  async (userId) => {
    const userInfo = await dbService.collection('userInfo').where('uid','==',userId).get();
    let userObject = {};
    userInfo.forEach((document) => {
        userObject = {
            ...document.data(),
            id: document.id,
        };
    });

    return userObject;
};

export const setUserObject = (type, userObj) => {
    const actionType = actions.saveUser();
    
    let action = {};

    if (type ==='INIT') {
      action = { type: actionType, data: initUserObj(null)};
    } else if (type === 'ADD') {
      action = { type: actionType, data: initUserObj(userObj)};
    }

    return action;
};

const initUserObj = (user) => {
    let userObj = {
        uid : '',
        displayName : '',
        email : '',
        phoneNumber : '',
        photoURL : '',
        id : '',
        tagId : ''
    };

    if (user) {
        userObj = user;
    } 
    
    return userObj;
};

export const refreshUserObj = async (userId) => {
    return setUserObject('ADD', await getUserDB(userId));
};