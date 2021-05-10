import React, { memo, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Card, Image } from 'react-bootstrap';
import { addFollow, deleteFollow, getFollowing, getFollower } from '../../dbFuncion/Follow'
import { connect } from 'react-redux';
import * as actions from '../../action/Action';
import '../../css/Follow/FollowList.scss';

const FollowList = memo( ({type, obj, state, dispatch}) => {
    const unFollow = useCallback(async (obj) => {
        const check = window.confirm('정말 언팔로우 하시겠습니까?');
        
        if (check) {
            await deleteFollow(state.userObj.uid, obj.uid);
            await saveFollow(state.userObj.uid);
            alert('언팔로우 했습니다.');
        }
        // eslint-disable-next-line
    },[obj, state.userObj]);

    const addFriend = useCallback(async (obj) => {
        await addFollow(state.userObj.uid, obj.uid);
        await saveFollow(state.userObj.uid);
        alert('팔로우 했습니다.');
        // eslint-disable-next-line
    },[obj, state.userObj]);

    const saveFollow = useCallback(async (uid) => {
        await dispatch.saveFollow(await getFollowing(uid), await getFollower(uid));
    },[dispatch]);
   
    return (
        <Card className='div-card'>
            <Card.Body className='div-body'>
                <div className='div-box'>
                    <div>
                        <Image src={obj.photoURL} className='img-profile' roundedCircle />            
                    </div>
                    <div className='div-profile'>
                        <span>{obj.displayName}</span>
                        <span className='span-tag-id'>{obj.tagId}</span>
                    </div>
                </div>
                <div>
                    { type === 'following' ? ( 
                        <FontAwesomeIcon icon={faUserTimes} size='lg' className='icon' onClick={unFollow.bind(this, obj)} />
                    ) : (
                        <FontAwesomeIcon icon={faUserPlus} size='lg' className='icon' onClick={addFriend.bind(this, obj)} />   
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}, areEqual);

function areEqual(prevProps, nextProps) {
    return (
        prevProps.state.userObj === nextProps.state.userObj
        && prevProps.type === nextProps.type
        && prevProps.obj === nextProps.obj
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

export default connect(mapStateToProps, mapDispatchToProps) (FollowList);