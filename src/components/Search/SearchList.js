import React, { memo, useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Card, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { isFollow, addFollow } from '../../dbFuncion/Follow';
import { getFollowing, getFollower } from '../../dbFuncion/Follow';
import * as actions from '../../action/Action';
import '../../css/Search/SearchList.scss';

const SearchList = memo( ({searchObj, state, dispatch}) => {
    const [ownerObj, setOwnerObj] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isFollowImg, setIsFollowImg] = useState(false);

    useEffect(() => {
        setOwnerObj(state.userObj);
        showFollowImg(state.userObj, searchObj);
        // eslint-disable-next-line
    },[state.userObj, searchObj]);

    const showFollowImg = useCallback(async (userObj, searchObj) => {
        const _isOwner = userObj.uid === searchObj.uid ? false : true;
        const _isFollow = await isFollow(userObj.uid, searchObj.uid);
        const result = (_isOwner) && (_isFollow) ? true : false;
        setIsOwner(!_isOwner);
        setIsFollowImg(result);
    },[]);

    const addFriend = useCallback(async (searchObj) => {
        await addFollow(ownerObj.uid, searchObj.uid);
        setIsOwner(false);
        setIsFollowImg(false);
        saveFollow(ownerObj.uid);
        alert('팔로우 했습니다.');
        // eslint-disable-next-line
    },[ownerObj]);

    const saveFollow = useCallback(async (uid) => {
        await dispatch.saveFollow(await getFollowing(uid), await getFollower(uid));
    },[dispatch]);

    return (
        <Card className='div-card'>
            <Card.Body className='div-body'>
                <div className='div-box'>
                    <div>
                        <Image src={searchObj.photoURL} className='img-profile' roundedCircle />            
                    </div>
                    <div className='div-profile'>
                        <span>{searchObj.displayName}</span>
                        <span className='span-tag-id'>{searchObj.tagId}</span>
                    </div>
                    { !isFollowImg ? ( 
                        <div className='div-info'>
                            { isOwner ? '사용자 본인입니다.' : '이미 팔로우 한 사용자입니다.' }
                        </div> 
                    ) : null }
                </div>
                <div>
                    { isFollowImg ? ( 
                        <FontAwesomeIcon icon={faUserPlus} size='lg' className='icon-add' onClick={addFriend.bind(this, searchObj)} />
                    ) : null }
                </div>
            </Card.Body>
        </Card>
    )
}, areEqual);

function areEqual(prevProps, nextProps) {
    return (
        prevProps.state.userObj === nextProps.state.userObj
        && prevProps.searchObj === nextProps.searchObj
    );
}

function mapStateToProps(state) {
    return {
        state : {
            userObj : state.userReducer.userObj
        }        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch : {
            saveFollow: (following, follower) => dispatch({ type: actions.saveFollow(), following: following, follower: follower})
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchList);