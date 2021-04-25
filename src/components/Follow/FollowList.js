import React, { useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Card, Image } from 'react-bootstrap';
import { addFollow, deleteFollow, getFollowing, getFollower } from '../../dbFuncion/Follow'
import { connect } from 'react-redux';
import * as actions from '../../action/Action';

const FollowList = ({type, obj, state, dispatch}) => {
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
        <Card style={{ width: '100%' }}>
            <Card.Body style={{ display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div>
                        <Image src={obj.photoURL} style={{height: '4vw', width: '4vw'}} roundedCircle />            
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignSelf: 'center', paddingLeft: '1vw'}}>
                        <div>{obj.displayName}</div>
                        <div style={{ fontSize: '0.9em' }}>{obj.tagId}</div>
                    </div>
                </div>
                <div>
                    { type === 'following' ? ( 
                        <FontAwesomeIcon icon={faUserTimes} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={unFollow.bind(this, obj)} />
                    ) : (
                        <FontAwesomeIcon icon={faUserPlus} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={addFriend.bind(this, obj)} />   
                    )}
                </div>
            </Card.Body>
        </Card>
    )
};

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