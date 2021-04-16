import { dbService } from 'Database';

export const isFollow = async (ownerId, followId) => {
    const userInfo = await dbService.collection('followInfo').where('ownerId','==',ownerId).where('followId','==',followId).get();

    if (userInfo.size > 0) {
        return false;
    } else {
        return true;
    }
};

export const setFollow = async (ownerId, followId) => {
    
    const followInfo = {
        ownerId : ownerId,
        followId : followId
    };

    await dbService.collection('followInfo').add(followInfo);
};