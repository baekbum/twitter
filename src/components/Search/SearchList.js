import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Card, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { isFollow, addFollow } from '../../dbFuncion/Follow';
import { getFollowing, getFollower } from '../../dbFuncion/Follow';
import * as actions from '../../action/Action';

const SearchList = ({searchObj, userObj, saveFollow}) => {
    const [ownerObj, setOwnerObj] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isFollowImg, setIsFollowImg] = useState(false);

    useEffect(() => {
        setOwnerObj(userObj);
        showFollowImg(userObj, searchObj);
    }, [userObj, searchObj]);
    
    const showFollowImg = async (userObj, searchObj) => {
        const _isOwner = userObj.uid === searchObj.uid ? false : true;
        const _isFollow = await isFollow(userObj.uid, searchObj.uid);
        const result = (_isOwner) && (_isFollow) ? true : false;
        setIsOwner(!_isOwner);
        setIsFollowImg(result); 
    };

    const addFriend = async (searchObj) => {
        await addFollow(ownerObj.uid, searchObj.uid);
        setIsOwner(false);
        setIsFollowImg(false);
        initFollow(userObj.uid);
        alert('팔로우 했습니다.');
    };

    const initFollow = async (uid) => {
        await saveFollow(await getFollowing(uid), await getFollower(uid));
    };
    return (
        <Card style={{ width: '100%' }}>
            <Card.Body style={{ display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div>
                        <Image src={searchObj.photoURL} style={{height: '4vh', width: '4vh'}} roundedCircle />            
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignSelf: 'center', paddingLeft: '1vw'}}>
                        <div>{searchObj.displayName}</div>
                        <div style={{ fontSize: '0.9em' }}>{searchObj.tagId}</div>
                    </div>
                    { !isFollowImg ? ( 
                        <div style={{fontSize: '0.9em', marginLeft: '1.5vw', color: '#bdb49b'}}>
                            { isOwner ? '사용자 본인입니다.' : '이미 팔로우 한 사용자입니다.' }
                        </div> 
                    ) : null }
                </div>
                <div>
                    { isFollowImg ? ( 
                        <FontAwesomeIcon icon={faUserPlus} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={addFriend.bind(this, searchObj)} />
                    ) : null }
                </div>
            </Card.Body>
        </Card>
    )
};

function mapStateToProps(state) {
    return { 
        userObj : state.userReducer.userObj,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveFollow: (following, follower) => dispatch({ type: actions.saveFollow(), following: following, follower: follower})
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchList);