import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getFollowing, getFollower } from '../../dbFuncion/Follow'
import FollowList from './FollowList';

const Follow = ({userObj}) => {
    const [followList, setFollowList] = useState(false);
    const [following, setFollowing] = useState([]);
    const [follower, setFollower] = useState([]);

    const getfollowArray = async (userObj) => {
        setFollowing(await getFollowing(userObj.uid));
        setFollower(await getFollower(userObj.uid));
        setFollowList(true);
    };

    useEffect(() => {
        getfollowArray(userObj);
    }, [userObj]);
    return ( 
        <Tabs defaultActiveKey="following" id="followTab" style={{backgroundColor: '#d1d3e6'}}>
            <Tab eventKey="following" title="팔로잉">
                { followList ? (
                    following.map((o) => <FollowList key={o.uid} type={'following'} obj={o} />)
                ) : null }
            </Tab>
            <Tab eventKey="follower" title="팔로워">
                { followList ? (
                    follower.map((o) => <FollowList key={o.uid} type={'follower'} obj={o} />)
                ) : null }
            </Tab>
        </Tabs>
    );
};

function mapStateToProps(state) {
    return { 
        userObj : state.userReducer.userObj
    };
}

export default connect(mapStateToProps, null) (Follow);