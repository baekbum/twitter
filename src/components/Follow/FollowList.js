import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Card, Image } from 'react-bootstrap';
import { addFollow, deleteFollow } from '../../dbFuncion/Follow'
import { connect } from 'react-redux';

const FollowList = ({userObj, type, obj}) => {
    const unFollow = async (obj) => {
        const check = window.confirm('정말 언팔로우 하시겠습니까?');
        
        if (check) {
            deleteFollow(userObj.uid, obj.uid);
            alert('언팔로우 했습니다.');
        }
    };
    const addFriend = async (obj) => {
        await addFollow(userObj.uid, obj.uid);
        alert('팔로우 했습니다.');
    };
    return (
        <Card style={{ width: '100%' }}>
            <Card.Body style={{ display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div>
                        <Image src={obj.photoURL} style={{height: '4vh', width: '4vh'}} roundedCircle />            
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
        userObj : state.userReducer.userObj
    };
}

export default connect(mapStateToProps, null) (FollowList);