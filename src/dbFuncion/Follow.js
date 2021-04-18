import { dbService } from 'Database';

export const isFollow = async (ownerId, followId) => {
    const userInfo = await dbService.collection('followInfo').where('targetId','==',followId).where('followerId','==',ownerId).get();

    if (userInfo.size > 0) {
        return false;
    } else {
        return true;
    }
};

export const addFollow = async (ownerId, followId) => {
    
    const followInfo = {
        targetId : followId,
        followerId : ownerId
    };

    await dbService.collection('followInfo').add(followInfo);
};

export const deleteFollow = async (ownerId, followId) => {
    const info = await dbService.collection('followInfo').where('targetId','==',followId).where('followerId','==',ownerId).get();

    const docId = info.docs.map((doc) => (doc.id));

    await dbService.doc(`followInfo/${docId}`).delete();
};

export const getFollowing = async (ownerId) => {
    const followList = await dbService.collection('followInfo').where('followerId','==',ownerId).get();
    let followArray = [];

    if (followList.size > 0) {
        followArray = followList.docs.map((doc) => (
            doc._delegate._document.data.partialValue.mapValue.fields.targetId['stringValue']
        ));

        return await getFollowList(followArray);
    } else {
        return followArray;
    }
};

export const getFollower = async (ownerId) => {
    const followList = await dbService.collection('followInfo').where('targetId','==',ownerId).get();
    let followArray = [];
    
    if (followList.size > 0) {
        followArray = followList.docs.map((doc) => (
            doc._delegate._document.data.partialValue.mapValue.fields.followerId['stringValue']
        ));

        return await getFollowList(followArray);
    } else {
        return followArray;
    }
};

const getFollowList = async (paramArray) => {
    const followList = await dbService.collection('userInfo').where('uid','in',paramArray).get();

    const followArray = followList.docs.map((doc) => ({
        ...doc.data(),
        id : doc.id
    }));

    return followArray;
}

